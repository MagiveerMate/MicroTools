export const subscriptionConfig = {
  pro: {
    name: 'MicroTools Pro',
    displayPrice: process.env.EXPO_PUBLIC_PRO_DISPLAY_PRICE ?? '€1.99',
    billingPeriod: process.env.EXPO_PUBLIC_PRO_BILLING_PERIOD ?? 'month',
    provider: 'PayPal',
    checkoutEnabled: process.env.EXPO_PUBLIC_PAYPAL_CHECKOUT_ENABLED === 'true',
  },
} as const;
