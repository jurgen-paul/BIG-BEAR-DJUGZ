# System Architecture & Technical Specifications

**Big Bear Djugs: Interactive Adventure** is a modular, high-performance web and hybrid learning environment engineered with React 19, TypeScript, Tailwind CSS, Vite, and Cloud Firestore.

---

## 1. High-Level Component Architecture

```
+-----------------------------------------------------------------------+
|                             index.html                                |
+-----------------------------------------------------------------------+
                                   |
                         +-------------------+
                         |     index.tsx     |
                         +-------------------+
                                   |
                     +---------------------------+
                     |      LanguageProvider     | (context/LanguageContext.tsx)
                     +---------------------------+
                                   |
                          +-----------------+
                          |     App.tsx     |
                          +-----------------+
                                   |
         +-------------------------+-------------------------+
         |                         |                         |
+------------------+      +------------------+      +------------------+
|  TranslationBar  |      |   VideoPlayer    |      |  EditVideoPage   |
+------------------+      +------------------+      +------------------+
         |                         |                         |
+------------------+      +------------------+      +------------------+
| SettingsModal    |      | KidsCourses      |      | EducationalQuiz  |
+------------------+      +------------------+      +------------------+
                                   |
                          +-----------------+
                          |  BadgeGallery   |
                          |  ForestJournal  |
                          +-----------------+
```

---

## 2. Core Subsystems

### A. Multilingual Engine (`/context/LanguageContext.tsx` & `/lib/translations.ts`)
- **8 Supported Locales**: English (`en`), Spanish (`es`), French (`fr`), German (`de`), Japanese (`ja`), Chinese (`zh`), Portuguese (`pt`), Italian (`it`).
- **Reactive Localization Context**: Supplies UI translation strings via `t(key)` and scene-specific localized records via `tScene(id, fallbackTitle, fallbackDesc)`.
- **Bilingual Learning Mode**: Renders dual-language subtitles alongside original English copy to promote language acquisition in young learners.
- **Web Speech Synthesis Integration**: Native multi-accent audio narration enabling kids to listen to Big Bear Djugs read scene descriptions aloud.

### B. Educational Interactive Layer
- **Kids Courses (`/components/KidsCourses.tsx`)**: 4 progressive curriculum tracks (Maths & Counting, River Navigation, Nature Science, Forest Storytelling).
- **Interactive Quiz Engine (`/components/EducationalQuiz.tsx`)**: Real-time feedback, celebratory sound effects, streak calculation, and reward token distribution.
- **Badge & Achievement System (`/components/BadgeGallery.tsx`)**: Tracks mastery badges persisted locally and ready for Firestore synchronization.
- **Forest Journal (`/components/ForestJournal.tsx`)**: Reflective learning log where learners capture thoughts and discoveries from each scene.

### C. Video & Story Remixing System (`/components/EditVideoPage.tsx`)
- Allows learners to modify scene narrative prompts.
- Integrated with AI video generation workflow (Veo 3 prompt formulation) with prompt localization toggles.

### D. Cloud Firestore Persistence Layer (`/firestore.rules`)
- Declarative security rules ensuring children's safety: strict schema boundaries, read-only defaults on public course curriculum, and authenticated user isolation.

---

## 3. Security Perimeter & SSF Governance
- See [`/docs/SSF_COMPLIANCE.md`](./SSF_COMPLIANCE.md) for full compliance mapping.
- Obfuscation and Android/WebView bridging rules defined in [`/proguard-rules.pro`](../proguard-rules.pro).
