import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import QRCode from 'qrcode';
import sharp from 'sharp';
import {z} from 'zod';
import {getPayPalConfig,isPayPalConfigured} from './config/paypal.js';
export function buildApp(){const app=Fastify({logger:true,bodyLimit:30*1024*1024});app.register(cors,{origin:true});app.register(multipart,{limits:{fileSize:25*1024*1024,files:1}});
app.get('/health',async()=>({status:'ok',service:'microtools-api',version:'1.0.0'}));
app.get('/v1/billing/config',async()=>{const c=getPayPalConfig();return {provider:'paypal',configured:isPayPalConfigured(c),environment:c.environment,offer:{displayPrice:'€1.99',billingPeriod:'month'},checkoutEnabled:false}});
app.post('/v1/billing/paypal/checkout',async(_req,reply)=>{if(!isPayPalConfigured())return reply.code(503).send({code:'PAYPAL_NOT_CONFIGURED',message:'PayPal is a placeholder until server credentials and verified subscription handling are configured.'});return reply.code(501).send({code:'PAYPAL_CHECKOUT_NOT_ENABLED',message:'Enable only after server-side subscription creation and webhook verification are implemented.'})});
app.get('/v1/tools',async()=>({tools:[{id:'image-compress',status:'live'},{id:'image-convert',status:'live'},{id:'qr',status:'live'},{id:'vat',status:'live'},{id:'metadata',status:'live'},{id:'pdf-compress',status:'provider-required'},{id:'pdf-images',status:'provider-required'}]}));
app.post('/v1/tools/qr',async(req,reply)=>{const p=z.object({text:z.string().min(1).max(4000)}).safeParse(req.body);if(!p.success)return reply.code(400).send({code:'INVALID_INPUT'});return reply.type('image/png').send(await QRCode.toBuffer(p.data.text,{width:1024,margin:2}))});
app.post('/v1/tools/image-compress',async(req,reply)=>{const part=await req.file();if(!part)return reply.code(400).send({code:'FILE_REQUIRED'});const out=await sharp(await part.toBuffer()).rotate().jpeg({quality:72,mozjpeg:true}).toBuffer();return reply.type('image/jpeg').send(out)});
app.post('/v1/tools/vat',async(req,reply)=>{const p=z.object({amount:z.number().nonnegative(),rate:z.number().min(0).max(100)}).safeParse(req.body);if(!p.success)return reply.code(400).send({code:'INVALID_INPUT'});const tax=p.data.amount*p.data.rate/100;return {amount:p.data.amount,rate:p.data.rate,tax,total:p.data.amount+tax}});
app.post('/v1/tools/metadata',async(req,reply)=>{const p=z.object({url:z.string().url().max(2048)}).safeParse(req.body);if(!p.success)return reply.code(400).send({code:'INVALID_URL'});const u=new URL(p.data.url);if(!['http:','https:'].includes(u.protocol)||['localhost','127.0.0.1','::1'].includes(u.hostname))return reply.code(400).send({code:'URL_NOT_ALLOWED'});const c=new AbortController(),timer=setTimeout(()=>c.abort(),5000);try{const r=await fetch(u,{signal:c.signal,headers:{'user-agent':'MicroTools/1.0'}});const html=(await r.text()).slice(0,1000000);const title=html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]??null;return {url:r.url,title}}finally{clearTimeout(timer)}});
app.post('/v1/tools/:tool/process',async(req,reply)=>reply.code(501).send({code:'PROCESSOR_PROVIDER_REQUIRED',message:'This document tool requires a configured production processor.'}));return app}
