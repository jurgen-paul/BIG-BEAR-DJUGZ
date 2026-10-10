# Security Policy

## Supported Versions

This project receives active maintenance and security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Architecture & Practices

### 1. Firestore Security Rules
- All client read and write operations are guarded by strict Firestore security rules (`firestore.rules`).
- Document IDs are strictly validated to prevent ID poisoning and invalid character injections.
- Schemas and payloads are validated for proper field constraints, boundaries, and typing.
- All unmapped paths default to `allow read, write: if false;`.

### 2. Environment Variables & Secrets
- Secrets, API keys, and private credentials must never be committed to git.
- `.env*` files are excluded in `.gitignore`.
- Template variables are documented in `.env.example` without sensitive values.

### 3. Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly by contacting the project maintainers.
