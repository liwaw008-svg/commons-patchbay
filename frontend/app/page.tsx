'use client';

import {useEffect, useState} from 'react';
import {connect, read, write} from '../lib/chain';
import './controls.css';

const LIVE_BOARD = 'PATCH-1791124809';
type Offer = {id:string; title:string; provider:string; state:string; active_patch:string};
type Patch = {id:string; offer_id:string; state:string; satisfied_indexes:number[]; blocker_indexes:number[]};

export default function Page(){
  const [offers,setOffers]=useState<Offer[]>([]);
  const [patches,setPatches]=useState<Patch[]>([]);
  const [wallet,setWallet]=useState('');
  const [note,setNote]=useState('READY');
  const [mode,setMode]=useState<'idle'|'offer'|'patch'>('idle');
  const [title,setTitle]=useState('Solar projector kit');
  const [url,setUrl]=useState('');
  const [offerId,setOfferId]=useState('');
  const [patchId,setPatchId]=useState('');

  const load=async()=>{
    try{
      const a:any=await read('get_offers_page',[0,20]);
      const b:any=await read('get_patches_page',[0,20]);
      setOffers(a.items||[]); setPatches(b.items||[]);
    }catch(e:any){setNote('READ FAULT · '+e.message)}
  };
  useEffect(()=>{load()},[]);

  const send=async(name:string,args:any[])=>{
    try{
      setNote('SUBMITTED · WAITING FOR FINALIZATION');
      const hash=await write(name,args);
      setNote('FINALIZED · '+hash);
      await load();
    }catch(e:any){setNote('FAULT · '+e.message)}
  };
  const selected=offers.find(x=>x.id===offerId)||offers.find(x=>x.state==='AVAILABLE');

  return <main>
    <header>
      <div className="mark"><i>◉</i><b>COMMONS<br/>PATCHBAY</b></div>
      <div className="status"><span className="pulse"/>STUDIO NET / {note}</div>
      <button onClick={async()=>setWallet(await connect())}>{wallet?wallet.slice(0,5)+'…'+wallet.slice(-4):'POWER WALLET'}</button>
    </header>
    <section className="scope">
      <p>COMMUNITY EXCHANGE BUS 04</p>
      <h1>Plug one useful thing<br/><em>into one honest need.</em></h1>
      <aside><button onClick={()=>setMode('offer')}>+ LOAD AN OFFER</button><button onClick={()=>setMode('patch')}>PATCH A NEED</button></aside>
    </section>
    <section className="rack">
      <div className="rail"><span>OFFER CHANNELS</span>
        {offers.length?offers.map((o,i)=><button className={'jack '+(selected?.id===o.id?'hot':'')} key={o.id} onClick={()=>setOfferId(o.id)}><i>{String(i+1).padStart(2,'0')}</i><b>{o.title}</b><small>{o.state}</small></button>):<p className="empty">No signal loaded. Publish the first offer from the drawer.</p>}
      </div>
      <div className="cables">
        <svg viewBox="0 0 600 420" aria-hidden="true"><path d="M20 80 C220 80 180 330 580 330"/><path d="M20 200 C250 200 300 60 580 80"/><circle cx="20" cy="80" r="9"/><circle cx="580" cy="330" r="9"/></svg>
        <div className="meter"><span>MATCH BUS</span><strong>{patches.at(-1)?.state||'UNPATCHED'}</strong><div>{Array.from({length:8}).map((_,i)=><i key={i} className={patches.at(-1)?.satisfied_indexes?.includes(i)?'on':''}/>)}</div></div>
      </div>
      <div className="receipt"><span>CONNECTION RECEIPTS</span>
        {patches.slice(-5).reverse().map(p=><article key={p.id}><b>{p.id}</b><strong>{p.state}</strong><small>{p.offer_id}</small>{p.state==='AWAITING_PROVIDER'&&<button className="receipt-action" onClick={()=>send('confirm_patch',[p.id])}>PROVIDER CONFIRM</button>}</article>)}
        {!patches.length&&<p>No patch has reached the jury.</p>}
      </div>
    </section>
    {mode!=='idle'&&<div className="drawer"><button className="close" onClick={()=>setMode('idle')}>×</button>{mode==='offer'?<>
      <small>LOAD SOURCE INTO THE LIVE OPEN BOARD</small><h2>Offer jack</h2>
      <label>BOARD ID<input defaultValue={LIVE_BOARD} id="board"/></label>
      <label>OFFER ID<input defaultValue={'OFFER-'+Date.now().toString().slice(-6)} id="oid"/></label>
      <label>WHAT IS AVAILABLE<input value={title} onChange={e=>setTitle(e.target.value)}/></label>
      <label>PUBLIC MANIFEST URL<input value={url} onChange={e=>setUrl(e.target.value)}/></label>
      <button disabled={!url} onClick={()=>send('publish_offer',[(document.getElementById('board')as HTMLInputElement).value,(document.getElementById('oid')as HTMLInputElement).value,title,url])}>LOAD CHANNEL</button>
    </>:<>
      <small>SELECT OFFER JACK · ADD AN INDEPENDENT REQUEST SOURCE</small><h2>Patch need</h2>
      <div className="choice">{offers.filter(x=>x.state==='AVAILABLE').map(x=><button key={x.id} onClick={()=>setOfferId(x.id)} className={offerId===x.id?'sel':''}>{x.title}</button>)}</div>
      <label>PATCH ID<input value={patchId} onChange={e=>setPatchId(e.target.value)} placeholder="PATCH-104"/></label>
      <label>PUBLIC NEED URL<input value={url} onChange={e=>setUrl(e.target.value)}/></label>
      <button disabled={!selected||!patchId||!url} onClick={()=>send('request_patch',[patchId,selected!.id,url])}>SEND THROUGH JURY</button>
    </>}</div>}
    <footer><span>NO CUSTODY</span><span>NO PAYMENT RAIL</span><span>SOURCE DIGESTS STORED</span><b>GENLAYER SEMANTIC MATCHING</b></footer>
  </main>;
}
