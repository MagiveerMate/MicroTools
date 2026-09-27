# 🛠️ MicroTools

**Small Tools. Big Possibilities.**

MicroTools is a standalone mobile utility application for Android and iOS that brings useful everyday tools together in one lightweight app.

> MicroTools is an independent application and is **not part of or connected to the Brandnamix Portal application**.

---

## 📱 Platforms

MicroTools is being developed for:

- Android
- iOS
- Google Play Store
- Apple App Store

The production mobile application has a target download size of **less than 50 MB**.

Heavy operations such as PDF and image processing should run server-side where appropriate to keep the mobile application lightweight.

---

## 🧰 Tools

### 💰 Budget Planner

Create and manage a personal monthly budget.

Features include:

- Monthly income
- Expense categories
- Custom expenses
- Savings
- Remaining balance
- Monthly spending totals
- Regional currency formatting
- Multiple budgets planned for Pro
- Budget history planned for Pro
- Export functionality planned for Pro

For example, a South African user sees:

```text
Income
R 35,000.00

Expenses
R 21,500.00

Remaining
R 13,500.00
```

---

### 🧮 Regional Tax Calculator

Calculate tax using the user's selected country and currency.

The intended flow is:

```text
Country
   ↓
Region / State / Province
   ↓
Tax Type
   ↓
Amount
   ↓
Calculation
```

Regional tax rates should ultimately come from a maintained backend tax-data service rather than being permanently hardcoded into the mobile application.

For South Africa, values are displayed in **ZAR (R)**.

---

### 📄 PDF Compressor

Reduce PDF file sizes while maintaining usable document quality.

Heavy PDF processing is intended to happen on the backend rather than inside the mobile binary.

---

### 📄 PDF → Images

Convert PDF pages into image files.

---

### 🖼️ Image Compressor

Reduce image file sizes for sharing, storage, and web use.

---

### 🔄 Image Converter

Convert between supported formats such as:

- JPG
- PNG
- WebP

---

### 🔳 QR Code Generator

Generate QR codes from:

- URLs
- Text
- Contact information
- Other supported structured data

---

### 🔗 URL Metadata Extractor

Retrieve information from a URL such as:

- Page title
- Description
- Preview image
- Domain
- Other supported metadata

---

## 🌍 Regional Experience

MicroTools is designed to adapt to the user's country.

The intended priority is:

```text
User-selected country
        ↓
Device region
        ↓
Country selection fallback
```

Users can manually change their country at any time.

Country selection can affect:

- Currency
- Number formatting
- Tax calculations
- Regional options
- Subscription price display

Examples:

| Country | Currency |
|---|---|
| South Africa | ZAR (R) |
| United States | USD ($) |
| United Kingdom | GBP (£) |
| Eurozone | EUR (€) |
| Australia | AUD (A$) |
| Japan | JPY (¥) |

---

## 👑 MicroTools Pro

Reference subscription price:

**€1.99/month**

For South Africa, the current product target is:

**R36.99/month**

The final amount charged should come from the applicable payment/store provider rather than trusting a client-side price.

Planned Pro benefits include:

- Higher usage limits
- Multiple budgets
- Extended budget history
- Advanced reports
- PDF/CSV exports
- Premium tools
- Priority processing
- Reduced or no advertising

---

## 💳 Payments

PayPal is currently represented as a **placeholder integration**.

The application must never grant Pro access simply because the mobile client reports that payment succeeded.

The intended architecture is:

```text
Mobile App
    ↓
Backend
    ↓
Payment Provider
    ↓
Verified Payment / Webhook
    ↓
Server-side Entitlement
    ↓
Pro Access
```

Payment providers may eventually include:

- PayPal
- Google Play Billing
- Apple App Store / StoreKit

depending on platform requirements and regional availability.

---

## 🔐 Security

Security is a core project requirement.

### Never commit

The repository must never contain:

- PayPal Client Secrets
- Production API keys
- Signing certificates
- Android keystores
- Apple signing credentials
- Database passwords
- Access tokens
- Private encryption keys

Secrets belong in environment variables or an appropriate production secrets manager.

### Payment security

Payment credentials must remain server-side.

The mobile application should never contain a PayPal Client Secret.

Paid entitlements must be verified by the backend.

### File processing

Uploaded user files should follow a lifecycle similar to:

```text
Upload
   ↓
Secure temporary storage
   ↓
Processing
   ↓
Result
   ↓
Automatic deletion
```

Files should not be retained indefinitely unless the product explicitly requires it and the user understands the retention policy.

---

## 🏗️ Architecture

```text
                  MicroTools Mobile
                  Android + iOS
                        │
                        ▼
                    API Gateway
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
      Identity       Billing        Usage
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                    Tool Router
                        │
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
   Documents          Images           Data
       │                │                │
       ▼                ▼                ▼
   Processing       Processing      Tax / Utility
     Workers          Workers          Services
```

The mobile client should remain thin.

Computationally expensive operations should run on backend workers/services.

---

## 📦 Repository Structure

The intended structure is:

```text
MicroTools/
│
├── apps/
│   └── mobile/
│
├── services/
│   └── api/
│
├── packages/
│
├── infrastructure/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Technology

Current direction:

### Mobile

- React Native
- Expo
- TypeScript
- Expo Router

### Backend

- Node.js
- TypeScript
- Fastify

### Production services

The production architecture can add:

- PostgreSQL
- Object storage
- Redis
- Background workers/queues
- Monitoring
- Centralized logging
- Secrets management

as required by scale.

---

## 📏 Application Size

A major project requirement is:

> **Keep the production mobile download below 50 MB.**

The preferred target is approximately **25–35 MB** to leave room for future functionality.

To achieve this:

- Avoid unnecessary native dependencies
- Avoid bundling large ML models
- Avoid large videos/assets
- Use optimized/vector assets
- Process PDFs server-side
- Process expensive image operations server-side where appropriate
- Audit dependencies before release
- Measure production builds as part of the release pipeline

---

## 🚧 Current Status

MicroTools is currently under development.

Some functionality is implemented as an MVP while other services remain placeholders.

In particular:

- PayPal is **not live**
- Production payment verification is not connected
- Production tax data is not connected
- Production PDF processing still requires backend infrastructure
- Store subscriptions are not live
- Production cloud infrastructure still needs deployment
- Final signed Android/iOS builds have not yet been produced

These features should not be represented as production-ready until their external services and verification flows are configured.

---

## ▶️ Development

Install dependencies:

```bash
npm install
```

Start the mobile application:

```bash
npm run mobile
```

Start the API:

```bash
npm run api
```

For Android development through Expo:

```bash
npm run android
```

Exact commands may evolve as the project structure is finalized.

---

## 📲 Android Testing

During development, MicroTools can be tested using Expo Go.

Typical workflow:

```text
Development computer
       ↓
Expo development server
       ↓
QR code
       ↓
Expo Go
       ↓
Android phone
```

A standalone APK will be generated later for direct installation without requiring the development server.

---

## 🚀 Production Goals

Before public release, MicroTools should have:

- Production authentication
- Secure backend
- Persistent budgeting storage
- Regional tax-data integration
- File-processing infrastructure
- Usage metering
- Rate limiting
- Production payment verification
- Subscription entitlement management
- Monitoring
- Automated tests
- Privacy policy
- Terms of service
- Data deletion policies
- Google Play configuration
- Apple App Store configuration
- Signed production builds
- Production download-size verification

---

## 📌 Project Independence

MicroTools must remain a **standalone project**.

It must not be:

- Added to Brandnamix Portal
- Built inside the Brandnamix Portal repository
- Dependent on Brandnamix Portal services
- Coupled to Brandnamix Portal authentication
- Coupled to Brandnamix Portal infrastructure

Any future integration between the products would require an explicit architectural decision.

---

## License

Copyright © 2026.

All rights reserved unless a separate license is added to this repository.
