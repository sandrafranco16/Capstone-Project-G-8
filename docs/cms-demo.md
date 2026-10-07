# CMS Developer Quick Start

Decap edits Markdown in `src/content/blog` and media in `public/uploads`.

## Local development

Follow the [root README](../README.md) to install Node 24.x, pnpm and local demo
configuration. Open two terminals in the repository root:

```bash
pnpm dev
```

```bash
pnpm cms
```

Visit `http://localhost:3000/admin/`, choose the local login option, edit an article
and publish. Check `/blog` and its detail route. Changes are made only in the working
copy; use Git diff to inspect them.

Decap's local backend does not support the editorial workflow. Local publication
writes directly to disk, not GitHub PRs. Never expose this proxy publicly.

## Online CMS

Use the [platform setup guide](handover/platform-account-setup.md#2-github-repository-and-decap-cms)
for account access, OAuth App/callback, environment values and branch rules.
Use an existing target branch, normally `main`; do not reuse deleted demo branches.
Set the current repository owner explicitly, then redeploy.

Online saving uses the editorial workflow; publishing depends on GitHub review/bypass
permissions and hosting permissions. Verify client media uploads separately because
they may write to the target branch directly. No unconditional bypass or automatic
deployment is assumed.

## References

- [Client publishing guide](handover/client-user-guide.md)
- [Deployment/configuration and troubleshooting](handover/deployment-and-maintenance.md)
- [Implementation reference](features/cms-integration.md)
- [Acceptance tests](handover/acceptance-and-handover.md)

The client secret belongs only in server-side hosting settings or an ignored local
environment file. Never use `NEXT_PUBLIC_` for secrets or include them in CMS YAML.
