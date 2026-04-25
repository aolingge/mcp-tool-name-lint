import fs from 'node:fs'

const secretPattern = /(github_pat_|ghp_|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16})/g
const checks = [
  {
    "id": "has-tools",
    "pattern": "tools?|name|description|工具|名称",
    "message": "Contains tool names and descriptions."
  },
  {
    "id": "specific",
    "pattern": "read_|write_|list_|search_|create_|delete_|get_|update_",
    "message": "Uses action-oriented names."
  },
  {
    "id": "description",
    "pattern": "description|desc|说明|描述",
    "message": "Includes descriptions."
  },
  {
    "id": "risk",
    "pattern": "delete|write|exec|shell|run|danger|删除|执行",
    "message": "Makes risky tools visible."
  }
]

function testPattern(text, pattern) {
  if (pattern === 'REDACTION_SPECIAL') return !secretPattern.test(text)
  return new RegExp(pattern, 'i').test(text)
}

export function redactText(text) {
  return text.replace(secretPattern, '[REDACTED_SECRET]')
}

export function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8')
  const results = checks.map((check) => {
    const ok = testPattern(text, check.pattern)
    return {
      status: ok ? 'PASS' : 'FAIL',
      check: check.id,
      message: ok ? check.message : `Missing signal: ${check.message}`,
    }
  })
  const score = Math.round((results.filter((item) => item.status === 'PASS').length / results.length) * 100)
  return { file, score, results, redacted: redactText(text) }
}

export function formatText(report, title = "MCP Tool Name Lint") {
  const lines = [`${title} score: ${report.score}/100`, `File: ${report.file}`, '']
  for (const result of report.results) {
    lines.push(`${result.status.padEnd(5)} ${result.check.padEnd(18)} ${result.message}`)
  }
  return lines.join('\n')
}

export function formatMarkdown(report, title = "MCP Tool Name Lint") {
  const rows = report.results.map((result) => `| ${result.status} | ${result.check} | ${result.message} |`).join('\n')
  return `# ${title} Report

Score: **${report.score}/100**

File: \`${report.file}\`

| Status | Check | Message |
| --- | --- | --- |
${rows}
`
}
