// Isolated contract check: no network, email, or database writes.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')
const originalResolve = Module._resolveFilename
Module._resolveFilename = function (name, ...args) {
  if (name.startsWith('@/')) name = path.join(process.cwd(), 'src', name.slice(2))
  return originalResolve.call(this, name, ...args)
}
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename)
process.env.RESEND_API_KEY = 're_local_contract_test'
process.env.LEAD_EMAIL = 'staff@example.invalid'
const sent = []
let reject = false
global.fetch = async (url, options) => {
  assert.equal(url, 'https://api.resend.com/emails')
  sent.push(JSON.parse(options.body))
  return new Response(JSON.stringify(reject ? { error: 'test rejection' } : { id: 'mock-only' }), { status: reject ? 500 : 200 })
}
const { NextRequest } = require('next/server')
const { POST } = require('../src/app/api/quote/route.ts')
let ip = 0
const request = body => new NextRequest('http://localhost/api/quote', {
  method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `192.0.2.${++ip}` }, body: JSON.stringify(body),
})
const valid = { firstName: 'Test', lastName: 'Person', businessName: '<Example & Co>', industry: 'Roofing', phone: '2025550101', email: 'test@example.invalid', services: ['Postcard Campaign'], consent: true, budget: '$1,000 – $2,500' }
;(async () => {
  assert.equal((await POST(request(valid))).status, 200)
  assert.equal(sent.length, 1)
  assert.equal(sent[0].reply_to, valid.email)
  assert.ok(sent[0].html.includes('&lt;Example &amp; Co&gt;'))
  assert.ok(!sent[0].text.includes('undefined'))
  assert.ok(sent[0].text.includes(valid.budget))
  assert.equal((await POST(request({ ...valid, email: 'bad' }))).status, 422)
  assert.equal((await POST(request({ ...valid, consent: false }))).status, 422)
  assert.equal((await POST(request({ ...valid, services: [] }))).status, 422)
  assert.equal(sent.length, 1)
  assert.equal((await POST(request({ website: 'bot' }))).status, 200)
  assert.equal(sent.length, 1)
  reject = true
  assert.equal((await POST(request(valid))).status, 502)
  delete process.env.RESEND_API_KEY
  assert.equal((await POST(request(valid))).status, 503)
  console.log('PASS: quote without address, escaped email content, reply-to and budget, invalid email/consent/services, honeypot, delivery failure and missing settings. All delivery mocked.')
})().catch(error => { console.error(error); process.exitCode = 1 })
