# Production deployment checklist

## Implemented
- Expo/React Native TypeScript client with a small dependency surface.
- Searchable tool catalogue and tool workflows.
- Local VAT calculator.
- Fastify API with health endpoint, VAT, QR, URL metadata and image-compression processor.
- Multipart size limit and request validation.
- Docker deployment file and environment configuration.
- API smoke tests.
- EAS preview APK and production build profiles.

## Required before a public launch
- Configure a public HTTPS API URL.
- Add durable job storage/queue and object storage for large asynchronous processing.
- Connect PDF compression/rendering provider or isolated worker.
- Complete binary result download/share UX.
- Add authentication, entitlements and Apple/Google subscription receipt verification if paid plans are enabled.
- Add privacy policy, terms, deletion policy, telemetry/monitoring and abuse controls.
- Replace placeholder app identifiers and artwork with final brand assets.
- Create Apple/Google signing credentials and store records.
- Generate release builds and verify delivered store size is below 50 MB. Aim for 25–35 MB.

Never commit store signing keys or service secrets to this repository.

## PayPal placeholder and entitlement security

The mobile client displays MicroTools Pro at €1.99/month, but checkout is disabled by default. No PayPal secret is bundled in the app. `PAYPAL_CLIENT_SECRET` and related identifiers are server-only environment values. Never rename them with an `EXPO_PUBLIC_` prefix.

The placeholder must not grant an entitlement. Before enabling checkout, implement server-side PayPal subscription creation, authenticated account binding, verified webhook handling, idempotency/replay protection, persistent entitlement state, cancellation/refund handling, and authorization checks on every paid API route. The client must render entitlement state returned by the authenticated backend rather than trusting a local `isPro` flag.
