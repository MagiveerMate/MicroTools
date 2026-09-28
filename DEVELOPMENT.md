# MicroTools

Production-oriented foundation for a lightweight iOS/Android utility app backed by independently scalable APIs.

## Run
1. `npm install`
2. `npm run api`
3. In another terminal: `EXPO_PUBLIC_API_URL=http://YOUR-LAN-IP:3000 npm run mobile`

## Test
- `npm run typecheck`
- `npm --workspace services/api test`

## Android installable preview
With an Expo account and Android signing configured: `npx eas build --platform android --profile preview`.

## Architecture
Heavy file processing stays server-side to protect the <50 MB mobile download target. See `PRODUCTION.md` for the external production services and store credentials still required before public launch.
