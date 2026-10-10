# Secure Software Framework (SSF) & NIST SP 800-218 Compliance

This document outlines how **Big Bear Djugs: Interactive Adventure** complies with the **Secure Software Development Framework (SSDF / SSF)** as established by **NIST SP 800-218**, **OpenSSF Best Practices**, and **SLSA Level 3** supply chain security standards.

---

## 1. Compliance Matrix (NIST SP 800-218 SSDF)

| SSDF Practice | Objective | Implementation in Big Bear Djugs |
| :--- | :--- | :--- |
| **PO.1.1** | Define Security Requirements | Strict Firestore security rules with least-privilege, input boundary verification, and schema integrity validation. |
| **PO.3.1** | Secure Tooling & CI/CD | Vite hermetic build system, TypeScript strict mode, ESLint validation, automated linting via `npm run lint`. |
| **PS.1.1** | Secure Architecture | Zero client-exposed secret keys; server-side / proxy delegation; frontend sandbox security with no unsafe `eval` or inline execution. |
| **PS.2.1** | Supply Chain Integrity | Strict lockfile auditing (`package-lock.json`), dependency pinning, and SPDX SBOM generation readiness. |
| **PW.1.2** | Code Review & Static Analysis | TypeScript zero-error type checking (`tsc --noEmit`), automated CodeQL static analysis workflows. |
| **PW.4.1** | Obfuscation & Hardening | Production code obfuscation, symbol stripping, and reflection preservation using `proguard-rules.pro`. |
| **RV.1.1** | Vulnerability Remediation | Documented responsible vulnerability disclosure policy in `SECURITY.md`. |

---

## 2. Supply Chain Levels for Software Artifacts (SLSA Level 3)

The build and deployment pipelines adhere to SLSA Level 3 requirements:
1. **Source Integrity**: Version-controlled Git repository with cryptographic commit signatures.
2. **Hermetic Builds**: Build processes run inside isolated environments without unpinned network dependencies.
3. **Artifact Provenance**: Verifiable attestations generated at release boundaries.

---

## 3. Data Protection & Child Online Privacy Compliance (COPPA / GDPR-K)

Because Big Bear Djugs is targeted toward learners ages 5-10:
- **No PII Collection**: No personal identifiable information (full names, addresses, phone numbers) is collected or stored.
- **Local-First Preferences**: Language preferences, narration pitch, and badge progress are stored locally via `localStorage` by default.
- **Secure Cloud State**: Any synced Cloud Firestore documents are validated against strict schema rules preventing unauthorized cross-user reads or writes.
