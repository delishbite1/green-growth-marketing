// Regression fixtures for the compatibility update. No requests or writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(name, ...args) {
  if (name.startsWith('@/')) name = path.join(process.cwd(), 'src', name.slice(2));
  return resolve.call(this, name, ...args);
};
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true},
}).outputText, filename);
const {quoteSchema} = require('../src/lib/validation/lead.ts');
const {metaLeadSchema} = require('../src/lib/validation/meta-lead.ts');
const {postcardRequestSchema} = require('../src/lib/validation/postcard-request.ts');
const person = {firstName:'Test',lastName:'Person',businessName:'Example',email:'test@example.invalid',phone:'2025550101'};
const quote = {...person,industry:'Roofing',services:['Postcard Campaign'],consent:true};
const parsed = quoteSchema.parse(quote);
for (const field of ['address','city','state','zip']) assert.equal(parsed[field], '');
assert.equal(quoteSchema.safeParse({...quote,consent:false}).success,false);
assert.equal(quoteSchema.safeParse({...quote,services:[]}).success,false);
assert.equal(quoteSchema.safeParse({...quote,email:'bad'}).success,false);
const meta = {...person,targetZip:'78205',attribution:{utm_source:'fixture'}};
assert.equal(metaLeadSchema.safeParse(meta).success,true);
assert.equal(metaLeadSchema.safeParse({...meta,targetZip:'bad'}).success,false);
const postcard = {idempotencyKey:'00000000-0000-4000-8000-000000000001',quantity:5000,businessName:'Example',contactName:'Test Person',email:'test@example.invalid',phone:'2025550101',industry:'Roofing',helpChooseArea:false,mailingList:'ggm_list',targetCities:'San Antonio',targetState:'TX',artworkChoice:'ggm_design',consent:true};
assert.equal(postcardRequestSchema.safeParse(postcard).success,true);
assert.equal(postcardRequestSchema.safeParse({...postcard,quantity:1}).success,false);
assert.equal(postcardRequestSchema.safeParse({...postcard,targetCities:''}).success,false);
assert.equal(postcardRequestSchema.safeParse({...postcard,helpChooseArea:true,targetCities:'',targetState:''}).success,true);
assert.equal(postcardRequestSchema.safeParse({...postcard,mailingList:'own_list',targetCities:'',targetState:''}).success,true);
assert.equal(postcardRequestSchema.safeParse({...postcard,consent:false}).success,false);
console.log('PASS: quote defaults and validation, ad ZIP validation, postcard quantity, consent and mailing-area rules; no external effects.');
