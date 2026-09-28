# Build status

This repository is a production-oriented source build, not a signed store binary.

The current execution environment could not finish `npm install` within the available timeout, so a native APK/IPA was not produced or falsely claimed as verified. Before release, run dependency installation, typecheck/tests, connect the production API services, then create signed EAS builds.

A public production release still requires the owner's Apple Developer / Google Play accounts, signing, final identifiers/assets, privacy/terms, live backend infrastructure, subscription configuration (if enabled), and final store review.
