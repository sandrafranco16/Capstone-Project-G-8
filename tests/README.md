# Tests and Verification

From the repository root, install the pinned dependencies and run:

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

Tests are colocated with features under `src/`, not collected in this directory.
The latest executed baseline and its limits are in the
[verification record](../docs/handover/verification-record.md).

For real account, browser and customer acceptance checks, use
[acceptance and handover](../docs/handover/acceptance-and-handover.md).
Record the final release SHA, actual test results and evidence; do not copy old test
counts or treat local mock success as real email delivery.
