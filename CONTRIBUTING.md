# Contributing to MIAN DAST

Thanks for helping improve the safe-by-default DAST UI skeleton.

## Ground rules

- Keep changes focused and small.
- Follow [`docs/ui/ui-spec.md`](docs/ui/ui-spec.md) for visuals (instrument-grade monochrome, no brand accent).
- Prefer stubs in `lib/` over inventing backend APIs.
- Be respectful — see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Branch workflow

`main` is protected (PR required; no direct pushes). Do not push to `main`.

1. Fork (or create a branch from latest `main`)
2. Create a feature branch: `git checkout -b feat/short-name`
3. Commit with a clear why-focused message
4. Open a pull request against `main`
5. Address review feedback

Repo admins can (re)apply protection with:

```bash
gh auth login   # once
npm run protect-main
```

## Pull requests

Use the PR template. Include:

- What changed and why
- Screenshots for UI work
- How you tested (`npm run build`, manual path checks)

## Reporting security issues

Do not open a public issue for vulnerabilities. See [SECURITY.md](SECURITY.md).

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE).
