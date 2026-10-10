export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'pt' | 'it';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  voiceLang: string;
  greeting: string;
  samplePhrase: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    voiceLang: 'en-US',
    greeting: "Hello, little explorer! Welcome to the Great Forest with Big Bear Djugs!",
    samplePhrase: "Let's count berries and sing together!"
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    voiceLang: 'es-ES',
    greeting: "¡Hola, pequeño explorador! ¡Bienvenido al Gran Bosque con el Gran Oso Djugs!",
    samplePhrase: "¡Vamos a contar bayas y cantar juntos!"
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    voiceLang: 'fr-FR',
    greeting: "Bonjour, petit explorateur ! Bienvenue dans la Grande Forêt avec Grand Ours Djugs !",
    samplePhrase: "Comptons les baies et chantons ensemble !"
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    voiceLang: 'de-DE',
    greeting: "Hallo, kleiner Entdecker! Willkommen im Großen Wald mit dem Großen Bären Djugs!",
    samplePhrase: "Lass uns Beeren zählen und zusammen singen!"
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    voiceLang: 'ja-JP',
    greeting: "こんにちは、小さなたんけんたい！大きなクマのジュグスと一緒に森へようこそ！",
    samplePhrase: "木の実をかぞえて、いっしょにうたいましょう！"
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
    voiceLang: 'zh-CN',
    greeting: "你好，小小探险家！欢迎来到大森林，和大熊朱格斯一起探索！",
    samplePhrase: "让我们一起数浆果、唱友谊之歌吧！"
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    voiceLang: 'pt-BR',
    greeting: "Olá, pequeno explorador! Bem-vindo à Grande Floresta com o Grande Urso Djugs!",
    samplePhrase: "Vamos contar frutinhas e cantar juntos!"
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    voiceLang: 'it-IT',
    greeting: "Ciao, piccolo esploratore! Benvenuto nella Grande Foresta con il Grande Orso Djugs!",
    samplePhrase: "Contiamo i frutti di bosco e cantiamo insieme!"
  }
];

export interface SceneTranslation {
  title: string;
  description: string;
}

export interface Translations {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  badgeLearningAdventure: string;
  badgeAges: string;
  
  // Navigation / Top bar
  topBarLabel: string;
  translationSettingsBtn: string;
  bilingualBadge: string;
  currentLanguageBadge: string;

  // Story Outline
  storyOutlineTitle: string;
  theMissionTitle: string;
  theMissionDesc: string;
  educationalAdventureTitle: string;
  educationalAdventureDesc: string;
  forestMotto: string;

  // Sections
  friendshipSongTitle: string;
  friendshipSongDesc: string;
  educationalQuizTitle: string;
  educationalQuizDesc: string;
  kidsCoursesTitle: string;
  kidsCoursesDesc: string;
  badgesTitle: string;
  badgesDesc: string;
  forestJournalTitle: string;
  forestJournalDesc: string;
  exploreScenesTitle: string;

  // Video Player & Remix
  remixSceneBtn: string;
  closeBtn: string;
  backToScenesBtn: string;
  remixPageTitle: string;
  remixPageDesc: string;
  originalScenePreview: string;
  destinyQuote: string;
  promptLabel: string;
  generateVideoBtn: string;
  educationalSceneTag: string;

  // Settings Modal UI
  settingsModalTitle: string;
  settingsModalSubtitle: string;
  tabLanguage: string;
  tabBilingual: string;
  tabVoice: string;
  tabDisplay: string;
  tabAiTranslate: string;

  selectLanguageHeading: string;
  selectLanguageDesc: string;
  bilingualModeHeading: string;
  bilingualModeDesc: string;
  bilingualModeTip: string;
  bilingualEnabledStatus: string;
  bilingualDisabledStatus: string;

  voiceNarrationHeading: string;
  voiceNarrationDesc: string;
  testVoiceBtn: string;
  speechRateLabel: string;
  rateGentleBear: string;
  rateStandard: string;

  textScaleHeading: string;
  textScaleDesc: string;
  scaleStandard: string;
  scaleLarge: string;
  scaleExtraLarge: string;

  aiTranslateHeading: string;
  aiTranslateDesc: string;
  aiTranslateTip: string;

  resetDefaultsBtn: string;
  closeSettingsBtn: string;
  settingsSavedNotice: string;

  // Scene Translations
  scenes: {
    [sceneId: string]: SceneTranslation;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    appTitle: "Big Bear Djugs",
    appSubtitle: "Interactive Educational Adventure",
    badgeLearningAdventure: "Learning Adventure",
    badgeAges: "Ages 5-10",
    topBarLabel: "Language & Reading Settings",
    translationSettingsBtn: "Translation Settings",
    bilingualBadge: "Bilingual Mode ON",
    currentLanguageBadge: "English",

    storyOutlineTitle: "Big Bear Djugs: The Friendly Bear Learns & Teaches",
    theMissionTitle: "The Mission",
    theMissionDesc: "Join Big Bear Djugs, a gentle grizzly with a huge heart and even bigger curiosity. When he discovers the magic of learning, he realizes that knowledge is meant to be shared!",
    educationalAdventureTitle: "Educational Adventure",
    educationalAdventureDesc: "From counting berries in the meadow to reading maps by the river and exploring science in the lab, every scene is a lesson in teamwork, kindness, and bravery.",
    forestMotto: '"Learning is fun. Everyone can teach something. Be curious every day."',

    friendshipSongTitle: "The Forest Friendship Song",
    friendshipSongDesc: "Sing along with Djugs, Mila, and their forest friends to celebrate teamwork!",
    educationalQuizTitle: "Forest Explorer Quiz",
    educationalQuizDesc: "Test what you learned on the trail with Big Bear Djugs!",
    kidsCoursesTitle: "Kids Learning Academy",
    kidsCoursesDesc: "Interactive step-by-step nature courses in Math, Reading, Science & Life Skills.",
    badgesTitle: "Forest Badges & Treasure Chest",
    badgesDesc: "Earn badges, level up your knowledge, and equip magical explorer gear.",
    forestJournalTitle: "Forest Explorer Journal",
    forestJournalDesc: "Record your daily thoughts, favorite moments, and nature discoveries.",
    exploreScenesTitle: "Explore the Scenes",

    remixSceneBtn: "Remix Scene",
    closeBtn: "Close",
    backToScenesBtn: "Back to Scenes",
    remixPageTitle: "Remix this Scene",
    remixPageDesc: "Modify the story prompt to create your own unique version of this educational moment.",
    originalScenePreview: "Original Scene Preview",
    destinyQuote: '"Use your imagination to change the forest\'s destiny!"',
    promptLabel: "Describe your version of the scene:",
    generateVideoBtn: "Generate Video with Veo 3",
    educationalSceneTag: "Educational Scene",

    settingsModalTitle: "Translation & Language Settings",
    settingsModalSubtitle: "Personalize your language, voice narration, dual-language learning, and reading text comfort.",
    tabLanguage: "Language",
    tabBilingual: "Bilingual Mode",
    tabVoice: "Voice & Speech",
    tabDisplay: "Text Size",
    tabAiTranslate: "AI Translation",

    selectLanguageHeading: "Choose Your Adventure Language",
    selectLanguageDesc: "Select your preferred language. All story outlines, quizzes, courses, and badges adapt instantly.",
    bilingualModeHeading: "Dual-Language Learning (Bilingual Explorer)",
    bilingualModeDesc: "Display the translation alongside English subtitle hints. Wonderful for dual-language families and young English learners!",
    bilingualModeTip: "When enabled, you will see both languages side-by-side or stacked so kids can learn words in both tongues.",
    bilingualEnabledStatus: "Dual-Language Mode is currently ACTIVE",
    bilingualDisabledStatus: "Single-Language Mode is currently ACTIVE",

    voiceNarrationHeading: "Text-to-Speech & Narration Accent",
    voiceNarrationDesc: "Big Bear Djugs speaks to you using the speech synthesizer in your selected language.",
    testVoiceBtn: "Test Djugs Voice",
    speechRateLabel: "Bear Narration Pace",
    rateGentleBear: "Gentle Storyteller (0.85x)",
    rateStandard: "Normal Pace (1.0x)",

    textScaleHeading: "Reading Text Size & Comfort",
    textScaleDesc: "Adjust text size throughout the app to support early readers or comfortable distance reading.",
    scaleStandard: "Standard (100%)",
    scaleLarge: "Large (115%)",
    scaleExtraLarge: "Extra-Large (130%)",

    aiTranslateHeading: "AI Story Prompt Translation",
    aiTranslateDesc: "When remixing scenes, automatically translate foreign language story prompts to English before sending to Veo 3 AI video generation.",
    aiTranslateTip: "Ensures the highest video generation fidelity when you write prompts in your native language!",

    resetDefaultsBtn: "Reset to Defaults",
    closeSettingsBtn: "Save & Apply Settings",
    settingsSavedNotice: "Settings saved to explorer profile!",

    scenes: {
      '1': {
        title: "Scene 1: The Mysterious Glowing Book",
        description: "A peaceful forest morning. Big Bear Djugs stretches and yawns outside his cozy cave. As the sun peeks through the pine trees, he spots a mysterious glowing book titled 'The Book of Learning.' Curious and eager, Djugs begins his educational quest!"
      },
      '2': {
        title: "Scene 2: Math in the Meadow",
        description: "In a sunny, flowery meadow, Djugs and Mila help the forest bunnies count blackberries in groups of five. Djugs discovers that skip counting makes sorting berries fast and super fun!"
      },
      '3': {
        title: "Scene 3: Reading by the River",
        description: "Djugs and Tiko the squirrel follow wooden trail signs along the rushing blue river. Sounding out vowels letter by letter, Djugs unlocks the secret path to the ancient Forest Library."
      },
      '4': {
        title: "Scene 4: Science in the Forest Lab",
        description: "Inside Professor Pine's hollow oak tree laboratory, Djugs learns how sunlight, soil, and rain transform a tiny acorn into a mighty green sprout through photosynthesis."
      },
      '5': {
        title: "Scene 5: The Forest Storm Rescue",
        description: "When high winds shake a baby bird's nest during a sudden thunderstorm, Djugs uses quick math and steady courage to climb and safely protect the nest just in time."
      },
      '6': {
        title: "Scene 6: Starlight Astronomy & Polaris Navigation",
        description: "Under a sparkling twilight canopy, Djugs spots Ursa Major (The Great Bear constellation) and follows pointer stars to Polaris, the North Star that guides every night explorer."
      },
      '7': {
        title: "Scene 7: Pond Ecology & Tadpole Metamorphosis",
        description: "By the calm lily pond, Djugs gently observes swimming tadpoles as they sprout legs to become frogs, learning how clean freshwater sustains the entire woodland ecosystem."
      },
      '8': {
        title: "Scene 8: Forest Harmony & The Grand Celebration",
        description: "All the woodland creatures gather for a joyous celebration. Djugs wears his shining badges and sings the Friendship Song, realizing that sharing knowledge is the greatest adventure of all."
      }
    }
  },

  es: {
    appTitle: "Gran Oso Djugs",
    appSubtitle: "Aventura Educativa Interactiva",
    badgeLearningAdventure: "Aventura de Aprendizaje",
    badgeAges: "Edades 5-10",
    topBarLabel: "Ajustes de Idioma y Lectura",
    translationSettingsBtn: "Configuración de Traducción",
    bilingualBadge: "Modo Bilingüe ACTIVO",
    currentLanguageBadge: "Español",

    storyOutlineTitle: "Gran Oso Djugs: El Oso Amigable Aprende y Enseña",
    theMissionTitle: "La Misión",
    theMissionDesc: "Únete al Gran Oso Djugs, un oso bondadoso con un corazón enorme y una curiosidad infinita. Cuando descubre la magia de aprender, ¡comprende que el conocimiento se comparte con amigos!",
    educationalAdventureTitle: "Aventura Educativa",
    educationalAdventureDesc: "Desde contar bayas en el prado hasta leer mapas junto al río y explorar la ciencia en el laboratorio, cada escena es una lección de trabajo en equipo, amabilidad y valentía.",
    forestMotto: '"Aprender es divertido. Todos podemos enseñar algo. Sé curioso cada día."',

    friendshipSongTitle: "La Canción de la Amistad del Bosque",
    friendshipSongDesc: "¡Canta junto a Djugs, Mila y sus amigos del bosque para celebrar el trabajo en equipo!",
    educationalQuizTitle: "Cuestionario del Explorador del Bosque",
    educationalQuizDesc: "¡Pon a prueba lo que aprendiste en el sendero con el Gran Oso Djugs!",
    kidsCoursesTitle: "Academia de Aprendizaje Infantil",
    kidsCoursesDesc: "Cursos interactivos paso a paso sobre Naturaleza, Matemáticas, Lectura, Ciencia y Vida.",
    badgesTitle: "Insignias del Bosque y Cofre del Tesoro",
    badgesDesc: "Gana insignias, sube de nivel tu saber y equipa fabuloso equipo de explorador.",
    forestJournalTitle: "Diario del Explorador del Bosque",
    forestJournalDesc: "Anota tus reflexiones diarias, momentos favoritos y descubrimientos en la naturaleza.",
    exploreScenesTitle: "Explora las Escenas",

    remixSceneBtn: "Recrear Escena",
    closeBtn: "Cerrar",
    backToScenesBtn: "Volver a Escenas",
    remixPageTitle: "Recrear esta Escena con IA",
    remixPageDesc: "Modifica la historia para generar tu propia versión única con inteligencia artificial.",
    originalScenePreview: "Vista Previa de Escena Original",
    destinyQuote: '"¡Usa tu imaginación para transformar el destino del bosque!"',
    promptLabel: "Describe tu versión de la escena:",
    generateVideoBtn: "Generar Video con Veo 3",
    educationalSceneTag: "Escena Educativa",

    settingsModalTitle: "Configuración de Traducción e Idioma",
    settingsModalSubtitle: "Personaliza tu idioma, narración de voz, aprendizaje bilingüe y tamaño de lectura.",
    tabLanguage: "Idioma",
    tabBilingual: "Modo Bilingüe",
    tabVoice: "Voz y Audio",
    tabDisplay: "Tamaño de Texto",
    tabAiTranslate: "Traducción IA",

    selectLanguageHeading: "Elige el Idioma de tu Aventura",
    selectLanguageDesc: "Elige tu idioma preferido. Las historias, cuestionarios, cursos e insignias se adaptan al instante.",
    bilingualModeHeading: "Aprendizaje en Dos Idiomas (Modo Bilingüe)",
    bilingualModeDesc: "Muestra la traducción junto a pistas en inglés. ¡Ideal para familias bilingües y niños que aprenden inglés!",
    bilingualModeTip: "Al activarlo, verás ambos idiomas juntos para aprender nuevas palabras fácilmente.",
    bilingualEnabledStatus: "El Modo Bilingüe está actualmente ACTIVO",
    bilingualDisabledStatus: "El Modo Unilingüe está actualmente ACTIVO",

    voiceNarrationHeading: "Lectura por Voz y Acento de Narración",
    voiceNarrationDesc: "El Gran Oso Djugs te lee las lecciones en voz alta con el sintetizador en tu idioma.",
    testVoiceBtn: "Probar Voz de Djugs",
    speechRateLabel: "Ritmo de Narración del Oso",
    rateGentleBear: "Cuentacuentos Calmo (0.85x)",
    rateStandard: "Ritmo Normal (1.0x)",

    textScaleHeading: "Comodidad de Lectura y Tamaño de Letra",
    textScaleDesc: "Ajusta el tamaño del texto para que los pequeños lectores lean con total comodidad.",
    scaleStandard: "Estándar (100%)",
    scaleLarge: "Grande (115%)",
    scaleExtraLarge: "Muy Grande (130%)",

    aiTranslateHeading: "Traducción Automática de Ideas para Video",
    aiTranslateDesc: "Traduce automáticamente tus descripciones al inglés antes de enviarlas al generador de video Veo 3.",
    aiTranslateTip: "¡Garantiza la máxima calidad visual cuando escribes ideas en tu idioma nativo!",

    resetDefaultsBtn: "Restablecer Valores",
    closeSettingsBtn: "Guardar y Aplicar Ajustes",
    settingsSavedNotice: "¡Ajustes guardados en el perfil de explorador!",

    scenes: {
      '1': {
        title: "Escena 1: El Misterioso Libro Brillante",
        description: "Una mañana tranquila en el bosque. El Gran Oso Djugs se estira fuera de su cueva y descubre entre la hierba un libro mágico que brilla: 'El Libro del Aprendizaje'. ¡Empieza su gran viaje!"
      },
      '2': {
        title: "Escena 2: Matemáticas en el Prado",
        description: "En un prado florido, Djugs y Mila ayudan a los conejitos a agrupar moras silvestres de 5 en 5. ¡Djugs aprende que contar por grupos es rápido y divertido!"
      },
      '3': {
        title: "Escena 3: Lectura Junto al Río",
        description: "Djugs y la ardilla Tiko siguen las señales de madera junto al río. Deletreando vocales paso a paso, Djugs halla el camino a la legendaria Biblioteca del Bosque."
      },
      '4': {
        title: "Escena 4: Ciencia en el Laboratorio del Roble",
        description: "En el laboratorio del Profesor Pine, Djugs descubre cómo la luz solar, el agua y la tierra hacen germinar una pequeña bellota en un brote verde mediante la fotosíntesis."
      },
      '5': {
        title: "Escena 5: El Rescate en la Tormenta",
        description: "El viento azota el nido de unos pajaritos durante una tormenta. Djugs calcula la distancia y trepa valientemente para poner el nido a salvo justo a tiempo."
      },
      '6': {
        title: "Escena 6: Astronomía y la Estrella Polar",
        description: "Bajo un cielo estrellado, Djugs observa la constelación de la Osa Mayor y localiza la Estrella Polar, el faro que guía a todos los exploradores nocturnos."
      },
      '7': {
        title: "Escena 7: Ecología del Estanque y Metamorfosis",
        description: "Junto al estanque de nenúfares, Djugs contempla cómo los renacuajos desarrollan patitas hasta transformarse en ranas, entendiendo el ciclo de vida del agua."
      },
      '8': {
        title: "Escena 8: Fiesta y Armonía del Bosque",
        description: "Todos los animales celebran los nuevos conocimientos adquiridos. Djugs luce sus medallas y canta la Canción de la Amistad: ¡aprender juntos es la mayor aventura!"
      }
    }
  },

  fr: {
    appTitle: "Grand Ours Djugs",
    appSubtitle: "Aventure Éducative Interactive",
    badgeLearningAdventure: "Aventure Éducative",
    badgeAges: "5-10 ans",
    topBarLabel: "Paramètres de Langue et Lecture",
    translationSettingsBtn: "Paramètres de Traduction",
    bilingualBadge: "Mode Bilingue ACTIF",
    currentLanguageBadge: "Français",

    storyOutlineTitle: "Grand Ours Djugs : L'Ours Bienveillant Apprend et Enseigne",
    theMissionTitle: "La Mission",
    theMissionDesc: "Rejoignez Grand Ours Djugs, un grizzly au grand cœur et à la curiosité insatiable. En découvrant la joie d'apprendre, il comprend que le savoir est fait pour être partagé !",
    educationalAdventureTitle: "Aventure Éducative",
    educationalAdventureDesc: "Du comptage des baies dans la clairière à la lecture des cartes près de la rivière, chaque scène célèbre l'entraide, la bonté et le courage.",
    forestMotto: '"Apprendre est un bonheur. Tout le monde peut enseigner. Soyez curieux chaque jour."',

    friendshipSongTitle: "La Chanson de l'Amitié de la Forêt",
    friendshipSongDesc: "Chantez avec Djugs, Mila et leurs amis pour fêter l'esprit d'équipe !",
    educationalQuizTitle: "Quiz de l'Explorateur",
    educationalQuizDesc: "Testez vos connaissances en forêt avec Grand Ours Djugs !",
    kidsCoursesTitle: "Académie d'Apprentissage",
    kidsCoursesDesc: "Leçons interactives en Mathématiques, Lecture, Sciences et Savoir-vivre.",
    badgesTitle: "Badges de la Forêt et Coffre aux Trésors",
    badgesDesc: "Gagnez des badges, progressez et équipez des objets magiques d'explorateur.",
    forestJournalTitle: "Journal de Bord de la Forêt",
    forestJournalDesc: "Notez vos réflexions quotidiennes, vos moments préférés et découvertes.",
    exploreScenesTitle: "Explorer les Scènes",

    remixSceneBtn: "Remixer la Scène",
    closeBtn: "Fermer",
    backToScenesBtn: "Retour aux Scènes",
    remixPageTitle: "Remixer cette Scène avec l'IA",
    remixPageDesc: "Modifiez l'histoire pour créer votre propre version unique en vidéo.",
    originalScenePreview: "Aperçu de la Scène Initiale",
    destinyQuote: '"Laissez votre imagination réécrire l\'histoire de la forêt !"',
    promptLabel: "Décrivez votre version de la scène :",
    generateVideoBtn: "Générer la Vidéo avec Veo 3",
    educationalSceneTag: "Scène Éducative",

    settingsModalTitle: "Paramètres de Traduction & Langue",
    settingsModalSubtitle: "Personnalisez votre langue, la lecture audio, l'apprentissage bilingue et la taille du texte.",
    tabLanguage: "Langue",
    tabBilingual: "Mode Bilingue",
    tabVoice: "Voix & Audio",
    tabDisplay: "Taille Texte",
    tabAiTranslate: "Traduction IA",

    selectLanguageHeading: "Choisissez Votre Langue d'Aventure",
    selectLanguageDesc: "Sélectionnez votre langue. Les histoires, quiz, cours et badges s'adaptent instantanément.",
    bilingualModeHeading: "Apprentissage Bilingue (Mode Bilingue)",
    bilingualModeDesc: "Affichez la traduction avec des sous-titres en anglais pour faciliter l'apprentissage !",
    bilingualModeTip: "Idéal pour enrichir son vocabulaire dans les deux langues en même temps.",
    bilingualEnabledStatus: "Le Mode Bilingue est ACTIF",
    bilingualDisabledStatus: "Le Mode Unilingue est ACTIF",

    voiceNarrationHeading: "Synthèse Vocale et Acent de Narration",
    voiceNarrationDesc: "Grand Ours Djugs lit les leçons avec la voix de synthèse dans votre langue.",
    testVoiceBtn: "Tester la Voix de Djugs",
    speechRateLabel: "Rythme de Narration",
    rateGentleBear: "Conteur Paisible (0.85x)",
    rateStandard: "Rythme Normal (1.0x)",

    textScaleHeading: "Confort de Lecture & Taille de Police",
    textScaleDesc: "Adaptez la taille de lecture pour les jeunes lecteurs débutants.",
    scaleStandard: "Standard (100%)",
    scaleLarge: "Grand (115%)",
    scaleExtraLarge: "Très Grand (130%)",

    aiTranslateHeading: "Traduction Automatique pour l'IA",
    aiTranslateDesc: "Traduit automatiquement vos requêtes en anglais pour le moteur vidéo Veo 3.",
    aiTranslateTip: "Garantit des rendus vidéo parfaits même si vous écrivez en français !",

    resetDefaultsBtn: "Réinitialiser",
    closeSettingsBtn: "Enregistrer & Appliquer",
    settingsSavedNotice: "Paramètres enregistrés dans votre profil !",

    scenes: {
      '1': {
        title: "Scène 1 : Le Livre Lumineux Mystérieux",
        description: "Un matin paisible dans les bois. Grand Ours Djugs s'étire devant sa grotte et aperçoit un livre doré étincelant : 'Le Livre du Savoir'. C'est le début d'une aventure inoubliable !"
      },
      '2': {
        title: "Scène 2 : Maths dans la Prairie",
        description: "Dans une prairie fleurie, Djugs et Mila aident les lapins à regrouper les mûres sauvages par paquets de 5. Djugs comprend que compter par groupes est amusant et rapide !"
      },
      '3': {
        title: "Scène 3 : Lecture au Bord de la Rivière",
        description: "Djugs et Tiko l'écureuil déchiffrent les panneaux de bois le long du torrent. En épelant les voyelles, Djugs découvre le chemin de la Grande Bibliothèque sylvestre."
      },
      '4': {
        title: "Scène 4 : Science dans le Grand Chêne",
        description: "Dans le tronc du vieux chêne, le Professeur Pine enseigne la photosynthèse à Djugs : comment le soleil, l'eau et le terreau font naître une belle pousse verte."
      },
      '5': {
        title: "Scène 5 : Sauvetage dans la Tempête",
        description: "Un violent orage menace le nid d'oisillons perché en haut d'un arbre. Djugs use de sang-froid et d'agilité pour sécuriser le nid juste à temps."
      },
      '6': {
        title: "Scène 6 : Astronomie et l'Étoile Polaire",
        description: "Sous la voûte étoilée, Djugs repère la Grande Ourse et trace la ligne vers l'Étoile Polaire, le repère immuable des voyageurs nocturnes."
      },
      '7': {
        title: "Scène 7 : Écologie de la Mare et Métamorphose",
        description: "Au bord des nénuphars, Djugs observe la transformation des têtards en grenouilles et apprend l'importance de l'eau pure pour tous les animaux de la forêt."
      },
      '8': {
        title: "Scène 8 : La Grande Fête de la Forêt",
        description: "Tous les animaux se réunissent pour célébrer leurs nouveaux apprentissages. Djugs entonne la Chanson de l'Amitié : apprendre ensemble est la plus belle des victoires !"
      }
    }
  },

  de: {
    appTitle: "Großer Bär Djugs",
    appSubtitle: "Interaktives Lernabenteuer",
    badgeLearningAdventure: "Lernabenteuer",
    badgeAges: "Alter 5-10",
    topBarLabel: "Sprach- und Leseeinstellungen",
    translationSettingsBtn: "Übersetzungseinstellungen",
    bilingualBadge: "Zweisprachig AKTIV",
    currentLanguageBadge: "Deutsch",

    storyOutlineTitle: "Großer Bär Djugs: Der freundliche Bär lernt und lehrt",
    theMissionTitle: "Die Mission",
    theMissionDesc: "Begleite den großen Bären Djugs, einen sanften Grizzly mit einem riesigen Herzen und unendlicher Neugier. Als er die Freude am Lernen entdeckt, teilt er sein Wissen mit allen Waldfreunden!",
    educationalAdventureTitle: "Lernabenteuer",
    educationalAdventureDesc: "Vom Beerenzählen auf der Waldwiese bis zum Kartenlesen am Fluss: Jede Szene vermittelt Teamgeist, Freundlichkeit und Mut.",
    forestMotto: '"Lernen macht Spaß. Jeder kann etwas beibringen. Sei jeden Tag neugierig."',

    friendshipSongTitle: "Das Wald-Freundschaftslied",
    friendshipSongDesc: "Singe mit Djugs, Mila und den Waldfreunden über Zusammenhalt!",
    educationalQuizTitle: "Wald-Entdecker-Quiz",
    educationalQuizDesc: "Teste dein Naturwissen mit dem Großen Bären Djugs!",
    kidsCoursesTitle: "Kinder-Lernakademie",
    kidsCoursesDesc: "Interaktive Kurse in Mathe, Lesen, Naturwissenschaften und Lebenskompetenzen.",
    badgesTitle: "Wald-Abzeichen & Schatzkiste",
    badgesDesc: "Sammle Abzeichen, meistere Themen und rüste magische Entdecker-Gegenstände aus.",
    forestJournalTitle: "Wald-Tagebuch",
    forestJournalDesc: "Halte deine täglichen Gedanken, Lieblingsmomente und Entdeckungen fest.",
    exploreScenesTitle: "Szenen erkunden",

    remixSceneBtn: "Szene remixen",
    closeBtn: "Schließen",
    backToScenesBtn: "Zurück zu Szenen",
    remixPageTitle: "Diese Szene mit KI remixen",
    remixPageDesc: "Verändere den Prompt, um deine eigene Version der Geschichte zu erschaffen.",
    originalScenePreview: "Vorschau der Originalszene",
    destinyQuote: '"Nutze deine Fantasie, um die Geschichte des Waldes neu zu schreiben!"',
    promptLabel: "Beschreibe deine Version der Szene:",
    generateVideoBtn: "Video mit Veo 3 generieren",
    educationalSceneTag: "Lernszene",

    settingsModalTitle: "Übersetzungs- & Spracheinstellungen",
    settingsModalSubtitle: "Passe deine Sprache, Sprachausgabe, zweisprachiges Lernen und Schriftgröße an.",
    tabLanguage: "Sprache",
    tabBilingual: "Zweisprachig",
    tabVoice: "Stimme & Audio",
    tabDisplay: "Textgröße",
    tabAiTranslate: "KI-Übersetzung",

    selectLanguageHeading: "Wähle deine Abenteuersprache",
    selectLanguageDesc: "Wähle deine bevorzugte Sprache. Geschichten, Quizze und Abzeichen passen sich sofort an.",
    bilingualModeHeading: "Zweisprachiges Lernen (Bilingual-Modus)",
    bilingualModeDesc: "Zeigt die Übersetzung zusammen mit englischen Hinweisen an – perfekt für zweisprachige Kinder!",
    bilingualModeTip: "Hilft Kindern dabei, Wörter in beiden Sprachen spielerisch zu vergleichen.",
    bilingualEnabledStatus: "Zweisprachiger Modus ist AKTIV",
    bilingualDisabledStatus: "Einsprachiger Modus ist AKTIV",

    voiceNarrationHeading: "Sprachsynthese & Vorlesen",
    voiceNarrationDesc: "Bär Djugs liest dir die Texte mit der Computerstimme in deiner Sprache vor.",
    testVoiceBtn: "Djugs Stimme testen",
    speechRateLabel: "Sprechtempo des Bären",
    rateGentleBear: "Gemächlicher Geschichtenerzähler (0.85x)",
    rateStandard: "Normales Tempo (1.0x)",

    textScaleHeading: "Lesekomfort & Textgröße",
    textScaleDesc: "Passe die Textgröße an, um Leseanfängern das Lesen zu erleichtern.",
    scaleStandard: "Standard (100%)",
    scaleLarge: "Groß (115%)",
    scaleExtraLarge: "Sehr Groß (130%)",

    aiTranslateHeading: "Automatische KI-Prompt-Übersetzung",
    aiTranslateDesc: "Übersetzt deine Textideen vor der Videoerstellung automatisch ins Englische für Veo 3.",
    aiTranslateTip: "Sorgt für erstklassige Videoergebnisse, wenn du in deiner Muttersprache schreibst!",

    resetDefaultsBtn: "Zurücksetzen",
    closeSettingsBtn: "Speichern & Anwenden",
    settingsSavedNotice: "Einstellungen im Entdecker-Profil gesichert!",

    scenes: {
      '1': {
        title: "Szene 1: Das geheimnisvolle leuchtende Buch",
        description: "Ein friedlicher Morgen im Nadelwald. Bär Djugs entdeckt vor seiner Höhle ein golden leuchtendes Buch: 'Das Buch des Wissens'. Neugierig beginnt sein großes Abenteuer!"
      },
      '2': {
        title: "Szene 2: Mathe auf der Blumenwiese",
        description: "Auf einer sonnigen Wiese helfen Djugs und Mila den Waldkaninchen, Brombeeren in 5er-Gruppen zu bündeln. Djugs stellt fest, wie einfach Bündelrechnen ist!"
      },
      '3': {
        title: "Szene 3: Lesen am wilden Fluss",
        description: "Djugs und Eichhörnchen Tiko folgen Holzschildern am rauschenden Wasser. Durch Buchstabieren der Vokale findet Djugs den geheimen Pfad zur Wald-Bibliothek."
      },
      '4': {
        title: "Szene 4: Naturwissenschaft im Eichenlabor",
        description: "Im hohlen Stamm einer uralten Eiche erklärt Professor Pine die Photosynthese: Wie Sonnenlicht, Wasser und Waldboden aus einer Eichel einen starken Trieb zaubern."
      },
      '5': {
        title: "Szene 5: Rettung im Waldsturm",
        description: "Ein heftiger Sturm rüttelt an einem Vogelnest hoch in den Wipfeln. Mit Ruhe, Mut und schnellem Denken klettert Djugs hinauf und bringt die Vogelbabys in Sicherheit."
      },
      '6': {
        title: "Szene 6: Sternenkunde & Polarstern-Navigation",
        description: "Unter dem funkelnden Abendhimmel entdeckt Djugs das Sternbild des Großen Bären und folgt den Zeigersternen direkt zum Polarstern, dem Wegweiser der Nacht."
      },
      '7': {
        title: "Szene 7: Teich-Ökologie & Kaulquappen-Wunder",
        description: "Am Seerosenteich beobachtet Djugs, wie Kaulquappen Beine wachsen und sie zu Fröschen werden, und versteht die Bedeutung sauberen Wassers für den ganzen Wald."
      },
      '8': {
        title: "Szene 8: Waldharmonie & das große Fest",
        description: "Alle Tiere versammeln sich zu einem fröhlichen Fest. Djugs trägt seine glänzenden Medaillen und singt das Freundschaftslied: Gemeinsam lernen ist das Schönste überhaupt!"
      }
    }
  },

  ja: {
    appTitle: "大きなクマのジュグス",
    appSubtitle: "たいけんがくしゅうアドベンチャー",
    badgeLearningAdventure: "学びの冒険",
    badgeAges: "5〜10才向け",
    topBarLabel: "言語とよみやすさの設定",
    translationSettingsBtn: "ほんやく設定",
    bilingualBadge: "バイリンガルON",
    currentLanguageBadge: "日本語",

    storyOutlineTitle: "大きなクマのジュグス：やさしいクマの学びと教え",
    theMissionTitle: "ぼうけんの目的",
    theMissionDesc: "やさしくて好奇心いっぱいの大きなクマ、ジュグスと一緒に森へ出かけよう！学ぶよろこびを知ったジュグスは、みんなに知識をシェアすることの大切さに気づきます。",
    educationalAdventureTitle: "学びの冒険",
    educationalAdventureDesc: "草原での木の実かぞえから川沿いの地図読み、木の実験室でのサイエンスまで、どのシーンも思いやりと勇気にあふれています。",
    forestMotto: "「まなびは楽しい！みんなが先生になれる。まいにちワクワクしよう。」",

    friendshipSongTitle: "森のなかよしソング",
    friendshipSongDesc: "ジュグスやミラたち森の仲間といっしょに、チームワークを歌おう！",
    educationalQuizTitle: "森のたんけんたいクイズ",
    educationalQuizDesc: "ジュグスと一緒に森で学んだことをクイズでたしかめよう！",
    kidsCoursesTitle: "キッズ・フォレストアカデミー",
    kidsCoursesDesc: "算数、よみかき、理科、生活の知恵を楽しく学べるステップ授業。",
    badgesTitle: "森のバッジ＆宝箱",
    badgesDesc: "バッジをあつめてレベルアップ！かっこいい探検アイテムを装備しよう。",
    forestJournalTitle: "森のたんけん日誌",
    forestJournalDesc: "今日の発見や感じたこと、お気に入りのシーンをきろくしよう。",
    exploreScenesTitle: "シーンをたんけんする",

    remixSceneBtn: "シーンを作りかえる",
    closeBtn: "とじる",
    backToScenesBtn: "シーン一覧にもどる",
    remixPageTitle: "AIでこのシーンを作りかえよう",
    remixPageDesc: "ストーリーのプロンプトを変えて、自分だけの新しいシーンを生成できます。",
    originalScenePreview: "元のシーンのプレビュー",
    destinyQuote: "「きみの想像力で、森のあたらしい物語をつくろう！」",
    promptLabel: "きみが考えたシーンをかいてね：",
    generateVideoBtn: "Veo 3 で動画をつくる",
    educationalSceneTag: "まなびのシーン",

    settingsModalTitle: "翻訳と言語の設定",
    settingsModalSubtitle: "言語の選択、音声よみあげ、英語バイリンガル学習、文字の大きさを自由に調整できます。",
    tabLanguage: "言語",
    tabBilingual: "バイリンガル",
    tabVoice: "音声よみあげ",
    tabDisplay: "文字の大きさ",
    tabAiTranslate: "AI翻訳",

    selectLanguageHeading: "冒険の言語をえらぶ",
    selectLanguageDesc: "すきな言語を選んでください。物語、クイズ、コース、バッジの文字がすぐ切り替わります。",
    bilingualModeHeading: "バイリンガル学習モード（2言語表示）",
    bilingualModeDesc: "日本語の下に英語のヒントをならべて表示します。英語をたのしく覚えたいお子さまにぴったり！",
    bilingualModeTip: "英語と日本語をいっしょに見くらべながら、言葉の力をぐんぐん伸ばせます。",
    bilingualEnabledStatus: "バイリンガルモード：有効",
    bilingualDisabledStatus: "通常モード（1言語）：有効",

    voiceNarrationHeading: "音声よみあげと言語アクセント",
    voiceNarrationDesc: "大きなクマのジュグスが、選んだ言葉でやさしくテキストを読み上げてくれます。",
    testVoiceBtn: "ジュグスの声をきく",
    speechRateLabel: "ジュグスのお話しスピード",
    rateGentleBear: "ゆっくり・おだやか (0.85倍速)",
    rateStandard: "ふつう (1.0倍速)",

    textScaleHeading: "文字の大きさと読みやすさ",
    textScaleDesc: "小さなお子さまも読みやすいように、文字のサイズを大きくできます。",
    scaleStandard: "ひょうじゅん (100%)",
    scaleLarge: "おおきめ (115%)",
    scaleExtraLarge: "とく大 (130%)",

    aiTranslateHeading: "AIプロンプトの自動翻訳",
    aiTranslateDesc: "日本語で書いたシーンのアイデアを、Veo 3 AIが一番よく理解できる英語に自動翻訳して動画を作ります。",
    aiTranslateTip: "日本語のまま自由に入力しても、ハイクオリティな動画が生成されます！",

    resetDefaultsBtn: "初期設定にもどす",
    closeSettingsBtn: "保存して適用する",
    settingsSavedNotice: "たんけんたいプロフィールに設定を保存しました！",

    scenes: {
      '1': {
        title: "第1話：ひかるふしぎな本",
        description: "静かな森の朝。洞穴から出てあくびをした大きなクマのジュグスは、草むらで金色にひかる『まなびの本』をみつけます。ドキドキの冒険がスタート！"
      },
      '2': {
        title: "第2話：お花畑のさんすう",
        description: "お花いっぱいの草原で、ジュグスとミラはウサギたちの木の実あつめをお手伝い。5こずつのグループに分けると、あっという間に数えられることを学びます。"
      },
      '3': {
        title: "第3話：川のほとりのこくご",
        description: "ジュグスとリスのティコは川沿いの木製サインをよみときます。1文字ずつ音をあわせることで、古代の森の図書館へとつづく秘密の道を見つけました。"
      },
      '4': {
        title: "第4話：大木のりか実験室",
        description: "大きなカシの木の実験室で、パイン先生が光合成をおしえてくれます。太陽の光、お水、つちの力で、ちいさなドングリが力強い緑のめばえへと育ちます。"
      },
      '5': {
        title: "第5話：あらしの日のレスキュー",
        description: "とつぜんの雷雨で小鳥の巣があぶない！ジュグスは学んだことを活かして枝の強さをみきわめ、勇気を出して木をのぼり、無事に巣をすくい上げました。"
      },
      '6': {
        title: "第6話：星空の天文学と北極星",
        description: "夕暮れの星空を見あげて、ジュグスはおおぐま座（北斗七星）を発見！まっすぐのびる星をたどって、旅人の道しるべである北極星を見つけました。"
      },
      '7': {
        title: "第7話：池のいきものとおたまじゃくし",
        description: "すいれんの池で、おたまじゃくしに足が生えてカエルになる変態をかんさつ。きれいな水が森のすべての生きものをつなげていることを知ります。"
      },
      '8': {
        title: "第8話：森のハーモニーと大パーティー",
        description: "森のなかまたちが集まって学びのお祝いパーティー！ジュグスはピカピカのメダルを胸に友情の歌をうたい、「学ぶことは最高の大冒険だ」と笑顔になりました。"
      }
    }
  },

  zh: {
    appTitle: "大熊朱格斯",
    appSubtitle: "互动教育探索之旅",
    badgeLearningAdventure: "探索学习之旅",
    badgeAges: "适合 5-10 岁",
    topBarLabel: "语言与阅读设置",
    translationSettingsBtn: "翻译设置",
    bilingualBadge: "双语学习已开启",
    currentLanguageBadge: "简体中文",

    storyOutlineTitle: "大熊朱格斯：温和友善的棕熊学习与教学记",
    theMissionTitle: "探险使命",
    theMissionDesc: "加入大熊朱格斯的行列！他是一只温和、拥有大心脏和极强好奇心的大棕熊。当他发现学习的魔力时，他意识到知识最棒的地方在于与朋友分享！",
    educationalAdventureTitle: "寓教于乐的探险",
    educationalAdventureDesc: "从草地数黑莓、河边读地图，到树洞实验室学科学，每一个场景都是关于团队合作、友善待人和勇敢成长的生动课程。",
    forestMotto: "“学习很有趣。每个人都可以教会别人新东西。保持每天的好奇心。”",

    friendshipSongTitle: "森林友谊之歌",
    friendshipSongDesc: "和朱格斯、米拉以及森林伙伴们一起欢唱，赞美团队合作！",
    educationalQuizTitle: "森林探险家问答",
    educationalQuizDesc: "测试你和大熊朱格斯在林间小径上学到的自然知识！",
    kidsCoursesTitle: "森林少儿学堂",
    kidsCoursesDesc: "互动式自然课程：数学、阅读、科学与生活技能步步进阶。",
    badgesTitle: "森林徽章与宝箱",
    badgesDesc: "赢取荣誉徽章，掌握学科知识，装备探险家神奇道具。",
    forestJournalTitle: "森林探险日记",
    forestJournalDesc: "记录你每日的思考、最喜爱的瞬间以及对大自然的观察心得。",
    exploreScenesTitle: "探索精彩故事场景",

    remixSceneBtn: "创意重构场景",
    closeBtn: "关闭",
    backToScenesBtn: "返回故事场景",
    remixPageTitle: "使用 AI 重塑这一场景",
    remixPageDesc: "修改故事提示词，用人工智能创造属于你自己的独特篇章。",
    originalScenePreview: "原场景预览",
    destinyQuote: "“用你的无穷想象力，改变大森林的传奇故事！”",
    promptLabel: "描述你心中的故事版本：",
    generateVideoBtn: "使用 Veo 3 生成专属视频",
    educationalSceneTag: "教育场景",

    settingsModalTitle: "翻译与语言个性化设置",
    settingsModalSubtitle: "自由调整目标语言、语音朗读发音、双语对照学习以及大字号舒适阅读。",
    tabLanguage: "语言",
    tabBilingual: "双语学习",
    tabVoice: "语音朗读",
    tabDisplay: "字号大小",
    tabAiTranslate: "AI智能翻译",

    selectLanguageHeading: "选择探险故事语言",
    selectLanguageDesc: "选择你最舒适的语言。全部故事脉络、问答挑战、课程与徽章将即时切换。",
    bilingualModeHeading: "中英双语对照探索模式",
    bilingualModeDesc: "在翻译内容下方同时显示英文提示，特别适合双语家庭和想学习英语的小朋友！",
    bilingualModeTip: "开启后，你可以边读母语边对照学习英语地道词汇，一举两得。",
    bilingualEnabledStatus: "双语学习模式：已开启",
    bilingualDisabledStatus: "单语言模式：已开启",

    voiceNarrationHeading: "文字转语音朗读与发音口音",
    voiceNarrationDesc: "大熊朱格斯会调用语音合成引擎，用您选中的语言朗读故事与要点。",
    testVoiceBtn: "试听朱格斯的声音",
    speechRateLabel: "大熊讲故事语速",
    rateGentleBear: "温和慢速 (0.85倍)",
    rateStandard: "标准语速 (1.0倍)",

    textScaleHeading: "阅读字号与视觉舒适度",
    textScaleDesc: "调整全站文字比例，让低龄小朋友和家长在大屏幕前舒适阅读无负担。",
    scaleStandard: "标准字号 (100%)",
    scaleLarge: "大字号 (115%)",
    scaleExtraLarge: "超大字号 (130%)",

    aiTranslateHeading: "AI 故事提示词自动翻译",
    aiTranslateDesc: "在重构视频场景时，系统会自动将中文创作构思翻译为英语，输入给 Veo 3 视频模型。",
    aiTranslateTip: "让你用中文肆意发挥创意，同时获得最高质量的视频生成效果！",

    resetDefaultsBtn: "恢复默认设置",
    closeSettingsBtn: "保存并应用设置",
    settingsSavedNotice: "设置已成功保存至您的探险家档案！",

    scenes: {
      '1': {
        title: "第1幕：神秘的发光天书",
        description: "宁静的松林早晨，大熊朱格斯在洞穴外伸懒腰，发现草丛中有一本泛着金色柔光的《学习之书》。怀着满满的好奇心，朱格斯开启了求知旅程！"
      },
      '2': {
        title: "第2幕：草地上的奇妙数学",
        description: "在阳光明媚的百花草地上，朱格斯和米拉帮助小兔用“五只一组”的方法分类野生黑莓。朱格斯掌握了跳数法，发现算数竟如此快捷有趣！"
      },
      '3': {
        title: "第3幕：清清河畔学认字",
        description: "朱格斯和松鼠蒂科沿着奔流的小溪解读木质路标。他拼读元音字母，顺利拼出了通往古代森林图书馆的神秘路径。"
      },
      '4': {
        title: "第4幕：橡树树洞科学实验室",
        description: "在古老的大橡树实验室里，松树教授为朱格斯讲解光合作用：阳光、水分与肥沃泥土如何让一颗小橡果破土发芽、茁壮成长。"
      },
      '5': {
        title: "第5幕：暴风雨中的勇敢营救",
        description: "狂风暴雨猛烈摇晃着大树高处的小鸟窝。朱格斯运用学到的力学与距离常识，沉着冷静爬上高枝，在关键时刻安全接住鸟巢！"
      },
      '6': {
        title: "第6幕：星空天文与北极星导航",
        description: "夜幕降临，朱格斯透过铜望远镜找到大熊座（北斗七星），并顺着指极星辨认出永恒指引北方的北极星，学会了夜晚辨别方向。"
      },
      '7': {
        title: "第7幕：池塘生态与蝌蚪变态发育",
        description: "坐在荷塘边，朱格斯观察小蝌蚪长出四肢变身为小青蛙的过程，懂得了清澈的水源对森林中所有鸟类、小鹿和动物的重要性。"
      },
      '8': {
        title: "第8幕：森林大和谐与庆祝盛宴",
        description: "风暴平息，森林动物们欢聚一堂举行知识庆典。朱格斯佩戴着闪耀的奖章唱响《友谊之歌》，明白求知与分享是世界上最伟大的冒险！"
      }
    }
  },

  pt: {
    appTitle: "Grande Urso Djugs",
    appSubtitle: "Aventura Educativa Interativa",
    badgeLearningAdventure: "Aventura de Aprendizado",
    badgeAges: "Idades 5-10",
    topBarLabel: "Configurações de Idioma e Leitura",
    translationSettingsBtn: "Configurações de Tradução",
    bilingualBadge: "Modo Bilíngue ATIVO",
    currentLanguageBadge: "Português",

    storyOutlineTitle: "Grande Urso Djugs: O Urso Bondoso Aprende e Ensina",
    theMissionTitle: "A Missão",
    theMissionDesc: "Junte-se ao Grande Urso Djugs, um urso pardo afável com um coração gigante e muita curiosidade. Ao descobrir a magia do aprendizado, ele percebe que o saber deve ser compartilhado!",
    educationalAdventureTitle: "Aventura Educativa",
    educationalAdventureDesc: "De contar frutinhas no prado a ler mapas no rio e explorar ciências no laboratório, cada cena ensina cooperação, gentileza e coragem.",
    forestMotto: '"Aprender é divertido. Todos podem ensinar algo. Seja curioso todos os dias."',

    friendshipSongTitle: "A Canção da Amizade da Floresta",
    friendshipSongDesc: "Cante com Djugs, Mila e amigos da floresta para celebrar o trabalho em equipe!",
    educationalQuizTitle: "Quiz do Explorador da Floresta",
    educationalQuizDesc: "Teste seus conhecimentos aprendidos na trilha com o Grande Urso Djugs!",
    kidsCoursesTitle: "Academia de Aprendizagem Infantil",
    kidsCoursesDesc: "Cursos interativos passo a passo de Matemática, Leitura, Ciências e Vida.",
    badgesTitle: "Emblemas da Floresta e Baú do Tesouro",
    badgesDesc: "Ganhe medalhas, suba de nível e equipe itens mágicos de explorador.",
    forestJournalTitle: "Diário do Explorador da Floresta",
    forestJournalDesc: "Registre seus pensamentos diários, momentos favoritos e descobertas naturais.",
    exploreScenesTitle: "Explorar as Cenas",

    remixSceneBtn: "Recriar Cena",
    closeBtn: "Fechar",
    backToScenesBtn: "Voltar para as Cenas",
    remixPageTitle: "Recriar esta Cena com IA",
    remixPageDesc: "Modifique o texto da história para criar sua versão única em vídeo.",
    originalScenePreview: "Pré-visualização da Cena Original",
    destinyQuote: '"Use sua imaginação para transformar a história da floresta!"',
    promptLabel: "Descreva sua versão da cena:",
    generateVideoBtn: "Gerar Vídeo com Veo 3",
    educationalSceneTag: "Cena Educativa",

    settingsModalTitle: "Configurações de Tradução e Idioma",
    settingsModalSubtitle: "Personalize seu idioma, narração por voz, aprendizado bilíngue e tamanho de leitura.",
    tabLanguage: "Idioma",
    tabBilingual: "Modo Bilíngue",
    tabVoice: "Voz & Áudio",
    tabDisplay: "Tamanho da Fonte",
    tabAiTranslate: "Tradução IA",

    selectLanguageHeading: "Escolha o Idioma da sua Aventura",
    selectLanguageDesc: "Escolha seu idioma favorito. Histórias, testes, cursos e medalhas se ajustam instantaneamente.",
    bilingualModeHeading: "Aprendizado Duplo (Modo Bilíngue)",
    bilingualModeDesc: "Exibe a tradução junto com dicas em inglês. Ótimo para crianças aprendendo novas línguas!",
    bilingualModeTip: "Ajuda a expandir o vocabulário em ambos os idiomas simultaneamente.",
    bilingualEnabledStatus: "Modo Bilíngue está ATIVO",
    bilingualDisabledStatus: "Modo Unilíngue está ATIVO",

    voiceNarrationHeading: "Leitura em Voz Alta e Narração",
    voiceNarrationDesc: "O Grande Urso Djugs lê as lições com o sintetizador de voz no seu idioma.",
    testVoiceBtn: "Ouvir a Voz do Djugs",
    speechRateLabel: "Ritmo de Narração do Urso",
    rateGentleBear: "Contador Tranquilo (0.85x)",
    rateStandard: "Ritmo Padrão (1.0x)",

    textScaleHeading: "Conforto de Leitura e Tamanho do Texto",
    textScaleDesc: "Ajuste o tamanho da letra para ajudar leitores iniciantes a ler com facilidade.",
    scaleStandard: "Padrão (100%)",
    scaleLarge: "Grande (115%)",
    scaleExtraLarge: "Muito Grande (130%)",

    aiTranslateHeading: "Tradução Automática de Prompts de Vídeo",
    aiTranslateDesc: "Traduz suas ideias automaticamente para o inglês antes de enviar para a IA Veo 3.",
    aiTranslateTip: "Garante resultados cinematográficos incríveis ao escrever em português!",

    resetDefaultsBtn: "Restaurar Padrões",
    closeSettingsBtn: "Salvar & Aplicar",
    settingsSavedNotice: "Configurações salvas no perfil de explorador!",

    scenes: {
      '1': {
        title: "Cena 1: O Misterioso Livro Brilhante",
        description: "Uma manhã tranquila no bosque. O Grande Urso Djugs se espreguiça em frente à sua caverna e avista na grama um livro dourado cintilante: 'O Livro do Saber'. Começa a aventura!"
      },
      '2': {
        title: "Cena 2: Matemática no Prado das Flores",
        description: "Num prado ensolarado, Djugs e Mila ajudam os coelhinhos a juntar amoras em grupos de 5. Djugs percebe que agrupar torna a contagem rápida e muito divertida!"
      },
      '3': {
        title: "Cena 3: Leitura à Beira do Rio",
        description: "Djugs e o esquilo Tiko decifram placas de madeira ao longo do rio veloz. Ao juntar as vogais, Djugs encontra a rota secreta até a Biblioteca da Floresta."
      },
      '4': {
        title: "Cena 4: Ciência no Laboratório do Carvalho",
        description: "No laboratório do Professor Pine, Djugs aprende como a luz solar, a água e a terra fértil transformam uma sementinha em broto verde pela fotossíntese."
      },
      '5': {
        title: "Cena 5: Resgate na Tempestade",
        description: "Ventos fortes sacodem o ninho de passarinhos durante um temporal. Djugs usa coragem e agilidade para subir e proteger o ninho são e salvo a tempo."
      },
      '6': {
        title: "Cena 6: Astronomia e a Estrela Polar",
        description: "Sob o céu reluzente, Djugs avista a Ursa Maior e segue as estrelas guias até a Estrela Polar, farol imutável que orienta os viajantes da noite."
      },
      '7': {
        title: "Cena 7: Ecologia do Lago e Metamorfose",
        description: "Perto dos nenúfares, Djugs acompanha girinos ganhando patinhas e virando sapinhos, aprendendo sobre a importância das águas limpas para a vida selvagem."
      },
      '8': {
        title: "Cena 8: Harmonia da Floresta e Grande Festa",
        description: "Todos os animais celebram suas conquistas. Djugs ostenta suas medalhas e canta a Canção da Amizade: aprender juntos é a maior alegria de todas!"
      }
    }
  },

  it: {
    appTitle: "Grande Orso Djugs",
    appSubtitle: "Avventura Educativa Interattiva",
    badgeLearningAdventure: "Avventura d'Apprendimento",
    badgeAges: "Età 5-10",
    topBarLabel: "Impostazioni di Lingua e Lettura",
    translationSettingsBtn: "Impostazioni di Traduzione",
    bilingualBadge: "Modalità Bilingue ATTIVA",
    currentLanguageBadge: "Italiano",

    storyOutlineTitle: "Grande Orso Djugs: L'Orso Amichevole Impara e Insegna",
    theMissionTitle: "La Missione",
    theMissionDesc: "Unisciti al Grande Orso Djugs, un grizzly gentile dal cuore d'oro e un'infinita curiosità. Quando scopre la meraviglia dell'apprendimento, comprende che il sapere va condiviso!",
    educationalAdventureTitle: "Avventura Educativa",
    educationalAdventureDesc: "Dal contare more nel prato al leggere mappe lungo il fiume, ogni scena insegna la collaborazione, la gentilezza e il coraggio.",
    forestMotto: '"Imparare è divertente. Ognuno può insegnare qualcosa. Sii curioso ogni giorno."',

    friendshipSongTitle: "La Canzone dell'Amicizia del Bosco",
    friendshipSongDesc: "Canta con Djugs, Mila e gli amici del bosco per celebrare il lavoro di squadra!",
    educationalQuizTitle: "Quiz dell'Esploratore",
    educationalQuizDesc: "Metti alla prova ciò che hai imparato con il Grande Orso Djugs!",
    kidsCoursesTitle: "Accademia d'Apprendimento per Ragazzi",
    kidsCoursesDesc: "Corsi interattivi di Matematica, Lettura, Scienze e Abilità di Vita.",
    badgesTitle: "Distintivi del Bosco e Scrigno dei Tesori",
    badgesDesc: "Conquista distintivi, aumenta di livello ed equipaggia oggetti magici da esploratore.",
    forestJournalTitle: "Diario dell'Esploratore del Bosco",
    forestJournalDesc: "Registra i tuoi pensieri quotidiani, momenti preferiti e scoperte nella natura.",
    exploreScenesTitle: "Esplora le Scene",

    remixSceneBtn: "Remixa Scena",
    closeBtn: "Chiudi",
    backToScenesBtn: "Torna alle Scene",
    remixPageTitle: "Remixa questa Scena con l'IA",
    remixPageDesc: "Modifica la storia per creare la tua versione video unica con l'intelligenza artificiale.",
    originalScenePreview: "Anteprima Scena Originale",
    destinyQuote: '"Usa la tua immaginazione per riscrivere il destino del bosco!"',
    promptLabel: "Descrivi la tua versione della scena:",
    generateVideoBtn: "Genera Video con Veo 3",
    educationalSceneTag: "Scena Educativa",

    settingsModalTitle: "Impostazioni di Traduzione e Lingua",
    settingsModalSubtitle: "Personalizza lingua, lettura vocale, apprendimento bilingue e dimensione del testo.",
    tabLanguage: "Lingua",
    tabBilingual: "Modalità Bilingue",
    tabVoice: "Voce & Audio",
    tabDisplay: "Dimensione Testo",
    tabAiTranslate: "Traduzione IA",

    selectLanguageHeading: "Scegli la Lingua della tua Avventura",
    selectLanguageDesc: "Seleziona la tua lingua preferita. Storie, quiz, corsi e distintivi si aggiornano subito.",
    bilingualModeHeading: "Apprendimento a Due Lingue (Modalità Bilingue)",
    bilingualModeDesc: "Mostra la traduzione affiancata a suggerimenti in inglese: perfetto per i giovani studenti!",
    bilingualModeTip: "Confronta le parole in entrambe le lingue per imparare divertendoti.",
    bilingualEnabledStatus: "Modalità Bilingue ATTIVA",
    bilingualDisabledStatus: "Modalità Monolingue ATTIVA",

    voiceNarrationHeading: "Sintesi Vocale e Lettura ad Alta Voce",
    voiceNarrationDesc: "Il Grande Orso Djugs legge le lezioni con il sintetizzatore nella tua lingua.",
    testVoiceBtn: "Ascolta la Voce di Djugs",
    speechRateLabel: "Velocità di Narrazione dell'Orso",
    rateGentleBear: "Narratore Rilassato (0.85x)",
    rateStandard: "Velocità Normale (1.0x)",

    textScaleHeading: "Comfort di Lettura e Dimensione Carattere",
    textScaleDesc: "Regola la dimensione del testo per facilitare i giovani lettori.",
    scaleStandard: "Standard (100%)",
    scaleLarge: "Grande (115%)",
    scaleExtraLarge: "Molto Grande (130%)",

    aiTranslateHeading: "Traduzione Automatica per Video IA",
    aiTranslateDesc: "Traduce le tue idee in inglese prima di inviarle a Veo 3 per la creazione del video.",
    aiTranslateTip: "Assicura la massima qualità visiva quando scrivi nella tua lingua madre!",

    resetDefaultsBtn: "Ripristina Predefiniti",
    closeSettingsBtn: "Salva & Applica",
    settingsSavedNotice: "Impostazioni salvate nel profilo esploratore!",

    scenes: {
      '1': {
        title: "Scena 1: Il Misterioso Libro Brillante",
        description: "Un mattino sereno nel bosco. Il Grande Orso Djugs si stiracchia davanti alla tana e scorge nell'erba un libro dorato luccicante: 'Il Libro del Sapere'. Ha inizio la grande avventura!"
      },
      '2': {
        title: "Scena 2: Matematica nel Prato Fiorito",
        description: "In un prato fiorito, Djugs e Mila aiutano i coniglietti a raggruppare le more in mazzetti da 5. Djugs scopre quanto contare per gruppi sia rapido e divertente!"
      },
      '3': {
        title: "Scena 3: Lettura Lungo il Fiume",
        description: "Djugs e lo scoiattolo Tiko decifrano i cartelli lungo il torrente. Sillabando le vocali, Djugs trova il sentiero per l'antica Biblioteca del Bosco."
      },
      '4': {
        title: "Scena 4: Scienza nel Laboratorio della Quercia",
        description: "Nel tronco di una maestosa quercia, il Professor Pine spiega la fotosintesi: come sole, acqua e terra trasformano una ghianda in una rigogliosa piantina verde."
      },
      '5': {
        title: "Scena 5: Il Salvataggio nella Tempesta",
        description: "Un improvviso temporale minaccia il nido di uccellini in cima a un ramo. Djugs calcola le distanze e si arrampica coraggiosamente per mettere in salvo il nido."
      },
      '6': {
        title: "Scena 6: Astronomia e la Stella Polare",
        description: "Sotto un limpido cielo crepuscolare, Djugs scorge l'Orsa Maggiore e segue le stelle puntatrici verso la Stella Polare, guida fedele di ogni esploratore notturno."
      },
      '7': {
        title: "Scena 7: Ecologia dello Stagno e Metamorfosi",
        description: "Vicino allo stagno di ninfee, Djugs osserva i girini che mettono le zampette per diventare rane, capendo l'importanza dell'acqua limpida per tutto il bosco."
      },
      '8': {
        title: "Scena 8: Festa e Armonia del Bosco",
        description: "Tutti gli animali si radunano in festa. Djugs indossa i suoi lucenti distintivi e canta la Canzone dell'Amicizia: imparare insieme è l'avventura più bella!"
      }
    }
  }
};
