export type Tool={id:string;name:string;description:string;category:string;icon:string;mode:'local'|'remote'|'text';status:'live'|'provider'};
export const tools:Tool[]=[
{id:'image-compress',name:'Image Compressor',description:'Shrink photos for sharing and upload.',category:'Images',icon:'contract-outline',mode:'remote',status:'live'},
{id:'image-convert',name:'Image Converter',description:'Convert common image formats.',category:'Images',icon:'images-outline',mode:'remote',status:'provider'},
{id:'qr',name:'QR Code Generator',description:'Turn text or a URL into a QR code.',category:'Utilities',icon:'qr-code-outline',mode:'text',status:'live'},
{id:'vat',name:'VAT Calculator',description:'Calculate VAT and totals instantly.',category:'Business',icon:'calculator-outline',mode:'local',status:'live'},
{id:'metadata',name:'URL Metadata',description:'Read title metadata from a URL.',category:'Web',icon:'link-outline',mode:'text',status:'live'},
{id:'pdf-compress',name:'PDF Compressor',description:'Reduce PDF file size.',category:'Documents',icon:'document-outline',mode:'remote',status:'provider'},
{id:'pdf-images',name:'PDF to Images',description:'Turn PDF pages into images.',category:'Documents',icon:'copy-outline',mode:'remote',status:'provider'}];
