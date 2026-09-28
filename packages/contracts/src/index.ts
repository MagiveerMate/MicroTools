export type ToolId='pdf-compress'|'pdf-images'|'image-compress'|'image-convert'|'qr'|'vat'|'metadata';
export type JobStatus='queued'|'processing'|'completed'|'failed';
export interface ToolJob {id:string;tool:ToolId;status:JobStatus;createdAt:string;resultUrl?:string;error?:string}
