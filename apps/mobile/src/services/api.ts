const API=(process.env.EXPO_PUBLIC_API_URL||'http://localhost:3000').replace(/\/$/,'');
export async function postJson<T>(path:string,body:unknown):Promise<T>{const r=await fetch(API+path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});if(!r.ok)throw new Error((await r.json().catch(()=>null))?.message||`Request failed (${r.status})`);return r.json()}
