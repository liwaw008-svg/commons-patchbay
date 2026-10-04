# COMMONS PATCHBAY

`BUS ONLINE / NOTHING MOVES UNTIL BOTH SIDES AGREE`

## Signal path

A community board freezes a public exchange rulebook and two to eight plain-language compatibility criteria. Providers load public manifests. A requester selects an available jack and submits a separately hosted need record. GenLayer validators retrieve all three sources and place every criterion into exactly one channel: satisfied or blocked.

No model chooses the final lifecycle. Contract code opens `AWAITING_PROVIDER` only when every criterion is satisfied. The request itself records requester acknowledgement; the provider must confirm separately before the patch becomes `CONNECTED`. Either party may cancel while pending, and anyone may release an expired reservation.

## Live patch panel

- App: https://commons-patchbay.pages.dev/
- StudioNet contract: `0x814E10796e2d1b1a17c9987D4b6389050Adeaf1C`
- Deployment transaction: `0xaec433b34ca4cc560cdeb0dad4709508ff93c4a2b4a73c24cc377bba273f3efd`
- Completed patch: `CINEMA-1791124809` on board `PATCH-1791124809`
- Final confirmation transaction: `0x65109a2eaa3969ce43453995310f0f38120a33db457c796336c2f3f9e523b42d`

The live interface reads contract state, publishes new offers into the open demo board, submits independently hosted need records, and exposes provider confirmation for pending matches. Every write is labelled submitted first and shown as finalized only after the finalized receipt returns.

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

The recorded deployment and full four-transaction lifecycle are preserved in `deployment.json` and `network-run.json`.
