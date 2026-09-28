import test from 'node:test';import assert from 'node:assert/strict';import {buildApp} from '../src/index.ts';
test('health',async()=>{process.env.NODE_ENV='test';const a=buildApp(),r=await a.inject({method:'GET',url:'/health'});assert.equal(r.statusCode,200);await a.close()});
test('vat',async()=>{process.env.NODE_ENV='test';const a=buildApp(),r=await a.inject({method:'POST',url:'/v1/tools/vat',payload:{amount:100,rate:15}});assert.equal(r.json().total,115);await a.close()});
