from pathlib import Path
S=(Path(__file__).parents[1]/'contracts'/'contract.py').read_text()
def test_surface():
 for name in ('open_board','publish_offer','request_patch','confirm_patch','cancel_patch','release_expired','close_board','get_board','get_offer','get_patch'):assert 'def '+name in S
def test_guards_and_consensus():
 assert "origin in (b.rules_origin,o.manifest_origin)" in S and "sorted(yes+no)!=list(range(count))" in S and "run()==leader.calldata" in S
def test_recovery():assert "now()<=int(p.deadline)" in S and "o.state='AVAILABLE'" in S
