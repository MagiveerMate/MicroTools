export type PayPalConfig = {
  environment: 'sandbox' | 'live';
  clientId?: string;
  clientSecret?: string;
  webhookId?: string;
  productId?: string;
  planId?: string;
};

export function getPayPalConfig(): PayPalConfig {
  const environment = process.env.PAYPAL_ENVIRONMENT === 'live' ? 'live' : 'sandbox';
  return {
    environment,
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    webhookId: process.env.PAYPAL_WEBHOOK_ID,
    productId: process.env.PAYPAL_PRODUCT_ID,
    planId: process.env.PAYPAL_PLAN_ID,
  };
}

export function isPayPalConfigured(c=getPayPalConfig()) {
  return Boolean(c.clientId && c.clientSecret && c.webhookId && c.productId && c.planId);
}
