from pathlib import Path
import json,re,subprocess,time
from genlayer_py import create_account,create_client
from genlayer_py.chains import studionet
from genlayer_py.contracts import actions as ca
R=Path(__file__).parents[1];ROOT=R.parents[3]
def env(name):
 text=(ROOT/'accounts.env').read_text();return re.search(r'^'+re.escape(name)+r'\s*=\s*"?([^"\r\n]+)',text,re.M).group(1).strip()
def calldata(method=None,args=None,kwargs=None):
 out={}
 if method is not None:out['method']=method
 if args:out['args']=args
 if kwargs:out['kwargs']=kwargs
 return out
ca.make_calldata_object=calldata
accounts={i:create_account(account_private_key=env('ACCOUNT_'+str(i)+'_GENLAYER_PRIVATE_KEY')) for i in (1,2,4)};clients={i:create_client(chain=studionet,account=a) for i,a in accounts.items()};address=json.loads((R/'deployment.json').read_text())['contractAddress'];sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip();stamp=str(int(time.time()));board='PATCH-'+stamp;offer='PROJECTOR-'+stamp;patch='CINEMA-'+stamp;raw='https://raw.githubusercontent.com/liwaw008-svg/commons-patchbay/'+sha+'/evidence/';cdn='https://cdn.jsdelivr.net/gh/liwaw008-svg/commons-patchbay@'+sha+'/evidence/'
def send(who,method,args):
 tx=clients[who].write_contract(address=address,function_name=method,args=args);clients[who].wait_for_transaction_receipt(transaction_hash=tx,wait_until='finalized',retries=180,interval=5000);full=clients[who].get_transaction(transaction_hash=tx);leader=(full.get('consensus_data',{}).get('leader_receipt')or[{}])[0];assert full.get('result_name')=='MAJORITY_AGREE' and leader.get('execution_result')=='SUCCESS',full;return str(tx)
txs={};txs['board']=send(4,'open_board',[board,'Neighborhood equipment exchange',raw+'exchange-rules.md',['Resource is operational','Availability covers the requested window','Requested use fits the resource','Pickup and return plan is concrete'],900]);txs['offer']=send(1,'publish_offer',[board,offer,'Solar projector kit',cdn+'projector-offer.md']);txs['request']=send(2,'request_patch',[patch,offer,raw+'cinema-request.md']);mid=clients[4].read_contract(address=address,function_name='get_patch',args=[patch]);assert mid['state']=='AWAITING_PROVIDER' and mid['blocker_indexes']==[],mid;txs['confirm']=send(1,'confirm_patch',[patch]);state=clients[4].read_contract(address=address,function_name='get_patch',args=[patch]);assert state['state']=='CONNECTED' and state['provider_ack'] and state['requester_ack'],state;out={'boardId':board,'offerId':offer,'patchId':patch,'transactions':txs,'state':state,'walletDisclosure':'All demo wallets and source fixtures are operator-controlled.'};(R/'network-run.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
