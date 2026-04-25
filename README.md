<p align="center">
  <img src="assets/readme-banner.svg" alt="MCP Tool Name Lint banner" width="100%">
</p>

<h1 align="center">MCP Tool Name Lint</h1>

<p align="center">Detect vague or risky MCP tool names before agents see a confusing tool list.</p>

<p align="center"><a href="README.zh-CN.md">中文</a> · <a href="#quick-start">Quick Start</a> · <a href="#checks">Checks</a></p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/node-%3E%3D18-EC4899">
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-111827">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-2563EB">
</p>

<p align="center">
  <img src="assets/cli-preview.svg" alt="MCP Tool Name Lint CLI preview" width="88%">
</p>

## Why This Exists

AI agent tooling is growing quickly, but many repos still miss tiny checks that can run locally or in CI. This project stays zero-dependency, short-command, and easy to fork.

## Quick Start

```bash
npx github:aolingge/mcp-tool-name-lint --path tools.json
```

Generate Markdown:

```bash
npx github:aolingge/mcp-tool-name-lint --path tools.json --markdown > report.md
```

Use a score gate:

```bash
npx github:aolingge/mcp-tool-name-lint --path tools.json --min-score 80
```

## Checks

| Check | What it looks for |
| --- | --- |
| has-tools | Contains tool names and descriptions. |
| specific | Uses action-oriented names. |
| description | Includes descriptions. |
| risk | Makes risky tools visible. |

## Output

```text
MCP Tool Name Lint score: 100/100
PASS  example-check  Useful signal found
FAIL  missing-check  Add the missing guidance
```

## CI Usage

Use GitHub Actions annotations:

```bash
npx github:aolingge/mcp-tool-name-lint --path fixtures/good.txt --annotations
```

Generate SARIF:

```bash
npx github:aolingge/mcp-tool-name-lint --path fixtures/good.txt --sarif > results.sarif
```

See [docs/github-actions.md](docs/github-actions.md).

## Visual Identity

The banner and CLI preview are SVG assets committed in `assets/`, so the README renders cleanly on GitHub and Gitee without external image hosting.

## Mirrors

- GitHub: https://github.com/aolingge/mcp-tool-name-lint
- Gitee: https://gitee.com/aolingge/mcp-tool-name-lint

## Contributing

Good first PRs: add checks, add fixtures, improve docs, or add GitHub Actions examples.

## License

MIT
