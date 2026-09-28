import {buildApp} from './index.js';
buildApp().listen({port:Number(process.env.PORT??3000),host:'0.0.0.0'}).catch(e=>{console.error(e);process.exit(1)});
