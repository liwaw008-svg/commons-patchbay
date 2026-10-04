# COMMONS PATCHBAY

`BUS ONLINE / NOTHING MOVES UNTIL BOTH SIDES AGREE`

## Signal path

A community board freezes a public exchange rulebook and two to eight plain-language compatibility criteria. Providers load public manifests. A requester selects an available jack and submits a separately hosted need record. GenLayer validators retrieve all three sources and place every criterion into exactly one channel: satisfied or blocked.

No model chooses the final lifecycle. Contract code opens `AWAITING_PROVIDER` only when every criterion is satisfied. The request itself records requester acknowledgement; the provider must confirm separately before the patch becomes `CONNECTED`. Either party may cancel while pending, and anyone may release an expired reservation.

## Controls

```text
open_board -> publish_offer -> request_patch -> confirm_patch
                                         \-> BLOCKED
                         cancel_patch / release_expired
```

The patchbay stores the rule, offer and request digests with the exact criterion partition. Different hosts in the demo prove source-slot behavior, not independent institutional control. The fixture exchange is operator-authored and moves no assets or money.

## Bench check

```text
genvm-lint contracts/contract.py
python -m pytest -q
cd frontend
npm install
npm run typecheck
npm run build
```
