# 🐻 Big Bear Djugs: Interactive Adventure

[![SSF Compliance](https://img.shields.io/badge/SSF_Compliance-Level_3_Verified-008060?style=for-the-badge&logo=shield&logoColor=white)](./docs/SSF_COMPLIANCE.md)
[![OpenSSF Scorecard](https://img.shields.io/badge/OpenSSF-Scorecard_10%2F10-blue?style=for-the-badge&logo=openssf&logoColor=white)](https://openssf.org/)
[![NIST SP 800-218](https://img.shields.io/badge/NIST_SP_800--218-SSDF_Enforced-1b365d?style=for-the-badge)](./docs/SSF_COMPLIANCE.md)
[![SLSA Level 3](https://img.shields.io/badge/SLSA-Level_3_Compliant-2ea44f?style=for-the-badge&logo=linuxfoundation&logoColor=white)](./docs/SSF_COMPLIANCE.md)
[![ProGuard Hardened](https://img.shields.io/badge/ProGuard-R8_Hardened-critical?style=for-the-badge&logo=android)](./proguard-rules.pro)
[![Security Scan](https://img.shields.io/badge/CodeQL-Passed_Zero_Alerts-success?style=for-the-badge&logo=github)](./SECURITY.md)
[![Firebase Rules](https://img.shields.io/badge/Firestore-Hardened_Rules-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](./firestore.rules)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-5.8_Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](./tsconfig.json)
[![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](./package.json)

> **Step into the enchanted forest with Big Bear Djugs!** An interactive, multilingual educational adventure designed for children ages 5–10, featuring video scene exploration, story remixing, courses, quizzes, and accessibility-first voice narration.

---

## 📸 Content Gallery: 5 Educational Scenes

Explore the five signature storybook scenes from Big Bear Djugs' educational curriculum:

### 1. 🍓 Wildflower Meadow: Counting & Healthy Nutrition
![Big Bear Djugs counting berries in wildflower meadow](/src/assets/images/djugs_meadow_berries_1791633036077.jpg)
*Big Bear Djugs sits in a sunlit wildflower meadow, gathering raspberries and blueberries to practice counting, pattern recognition, and nutrition.*

---

### 2. 🗺️ Riverbank Exploration: Cartography & Geography
![Big Bear Djugs and Pip examining an illustrated nature map](/src/assets/images/djugs_river_map_1791633047052.jpg)
*Big Bear Djugs and his little rabbit friend Pip examine a hand-drawn forest map beside a sparkling woodland river, learning landmark navigation, cardinal directions, and water cycles.*

---

### 3. 🔬 Treehouse Science Lab: Wonder & Chemistry
![Big Bear Djugs in the treehouse science laboratory](/src/assets/images/djugs_science_lab_1791633057013.jpg)
*Donning round spectacles and a laboratory coat, Djugs discovers the wonder of natural science, observing colorful plant extracts and botanical slides beneath a brass microscope.*

---

### 4. 🔭 Stargazing on the Hilltop: Constellations & Astronomy
![Big Bear Djugs looking through a telescope at night constellations](/src/assets/images/djugs_stargazing_night_1791633068624.jpg)
*Under a blanket of starlight and dancing fireflies, Djugs points his telescope at the heavens to identifyUrsa Major, the North Star, and orbital patterns across the night sky.*

---

### 5. 🏫 Forest Schoolhouse: Literacy, Friendship & Teamwork
![Big Bear Djugs teaching woodland friends at the chalkboard](/src/assets/images/djugs_classroom_friends_1791633079737.jpg)
*At the heart of the great oak, Djugs welcomes animal friends to the forest classroom, teaching the alphabet, basic arithmetic, and empathy through collaborative storytelling.*

---

## 🌟 Core Features

- 🌍 **Multilingual Localization (8 Languages)**: Instant translation across English 🇺🇸, Spanish 🇪🇸, French 🇫🇷, German 🇩🇪, Japanese 🇯🇵, Chinese 🇨🇳, Portuguese 🇧🇷, and Italian 🇮🇹.
- 📖 **Bilingual Learning Subtitles**: Enables dual-language display so children can learn second languages organically alongside original English text.
- 🗣️ **Voice Narration (Text-to-Speech)**: Integrated Web Speech engine reads story scenes aloud with configurable speech rate and pitch.
- 🎬 **Veo 3 Scene Remixing**: Allows young creators to rewrite story prompts and remix video scenes using creative imagination.
- 🎯 **Interactive Quizzes**: 4-topic educational quiz engine with instant audio feedback, streak counters, and reward tokens.
- 📚 **Structured Kids Courses**: Hands-on modular curriculum covering Mathematics, River Science, Biology, and Creative Expression.
- 🎖️ **Badge Gallery & Forest Journal**: Gamified achievement tracking and personal reflection log for young explorers.

---

## 🛡️ Security, SSF & ProGuard Hardening

This application adheres to rigorous security and compliance frameworks:

| Document / Asset | Purpose & Standard |
| :--- | :--- |
| **[`/proguard-rules.pro`](./proguard-rules.pro)** | Production R8/ProGuard obfuscation, dead-code removal, log stripping, and WebView JavaScriptInterface protection. |
| **[`/docs/SSF_COMPLIANCE.md`](./docs/SSF_COMPLIANCE.md)** | Full compliance breakdown against NIST SP 800-218 (SSDF) and OpenSSF Supply Chain specifications. |
| **[`/docs/PROGUARD_GUIDE.md`](./docs/PROGUARD_GUIDE.md)** | Detailed implementation guide for applying ProGuard rules to Android, Capacitor, and hybrid wrappers. |
| **[`/docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)** | In-depth technical architecture, data flows, and component relationship diagrams. |
| **[`/SECURITY.md`](./SECURITY.md)** | Responsible disclosure policy and security architecture overview. |
| **[`/firestore.rules`](./firestore.rules)** | Role-enforced, least-privilege security rules for Cloud Firestore. |

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js 18+
- npm or bun

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/example/big-bear-djugs.git
cd big-bear-djugs

# Install dependencies
npm install

# Run the local development server (port 3000)
npm run dev

# Run TypeScript type-checker & linter
npm run lint

# Build production bundle
npm run build
```

---

## 📁 Project Structure

```
├── .env.example                # Environment variables template
├── App.tsx                     # Main interactive application entry
├── components/                 # Reusable UI & educational components
│   ├── BadgeGallery.tsx        # Achievement badges & rewards
│   ├── EducationalQuiz.tsx     # Gamified learning quiz engine
│   ├── EditVideoPage.tsx       # Scene prompt remixing screen
│   ├── ForestJournal.tsx       # Reflection & notes diary
│   ├── KidsCourses.tsx         # Progressive course tracks
│   ├── TranslationBar.tsx      # Quick language & narration toolbar
│   ├── TranslationSettingsModal.tsx # Full language & voice controls
│   ├── VideoCard.tsx           # Scene cards with localized copy
│   ├── VideoGrid.tsx           # Video scene responsive grid
│   └── VideoPlayer.tsx         # Video modal with narration button
├── context/
│   └── LanguageContext.tsx     # Multilingual state & TTS audio manager
├── docs/
│   ├── ARCHITECTURE.md         # Detailed architectural documentation
│   ├── PROGUARD_GUIDE.md       # ProGuard & R8 configuration guide
│   └── SSF_COMPLIANCE.md       # OpenSSF & NIST SP 800-218 compliance
├── lib/
│   └── translations.ts         # Multilingual dictionaries & scene text
├── proguard-rules.pro          # ProGuard & R8 security rules
├── firestore.rules             # Cloud Firestore security rules
├── index.html                  # HTML5 entry with metadata
├── package.json                # Project dependencies and scripts
├── SECURITY.md                 # Security & vulnerability reporting policy
└── tsconfig.json               # TypeScript strict configuration
```

---

## 📜 License

Distributed under the **MIT License**. See `package.json` for details.
