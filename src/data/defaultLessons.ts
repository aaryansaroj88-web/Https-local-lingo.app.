import { Lesson } from '../types';

export const DEFAULT_LESSONS: Lesson[] = [
  // =========================================================================
  // MARATHI LESSONS (मराठी)
  // =========================================================================
  {
    id: 'marathi_alphabets_vowels',
    language: 'marathi',
    category: 'alphabets',
    title: 'Marathi Vowels & Phonetics (स्वर आणि उच्चार)',
    description: 'Learn foundational vowels of Marathi with native pronunciations and vocabulary examples.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=kYorM1uO3iA',
    videoTitle: 'Marathi Barakhadi & Vowels Tutorial',
    content: [
      {
        nativeWord: 'अ',
        translatedWord: 'a',
        pronunciation: 'uh (like in "cup")',
        explanation: 'First vowel in Marathi. Example: अननस (Ananas - Pineapple).'
      },
      {
        nativeWord: 'आ',
        translatedWord: 'aa',
        pronunciation: 'aa (like in "father")',
        explanation: 'Long "a" sound. Example: आंबा (Aamba - Mango).'
      },
      {
        nativeWord: 'इ',
        translatedWord: 'i',
        pronunciation: 'ee (short like in "pin")',
        explanation: 'Short "i" sound. Example: इमारत (Imaarat - Building).'
      },
      {
        nativeWord: 'ई',
        translatedWord: 'ee',
        pronunciation: 'eee (long like in "meet")',
        explanation: 'Long "i" sound. Example: ईडलिंबू (Eedlimboo - Citron).'
      },
      {
        nativeWord: 'उ',
        translatedWord: 'u',
        pronunciation: 'oo (short like in "put")',
        explanation: 'Short "u" sound. Example: उखळ (Ukhal - Mortar).'
      },
      {
        nativeWord: 'ऊ',
        translatedWord: 'oo',
        pronunciation: 'ooo (long like in "boot")',
        explanation: 'Long "u" sound. Example: ऊस (Oos - Sugarcane).'
      }
    ],
    quiz: [
      {
        question: 'Which Marathi vowel represents the long "aa" sound like in "father"?',
        options: ['अ', 'आ', 'इ', 'उ'],
        correctOption: 1
      },
      {
        question: 'What is the first vowel of the Marathi alphabet?',
        options: ['इ', 'आ', 'अ', 'ई'],
        correctOption: 2
      },
      {
        question: 'What does "आंबा" (Aamba) mean in English?',
        options: ['Citron', 'Pineapple', 'Sugarcane', 'Mango'],
        correctOption: 3
      },
      {
        question: 'Which vowel sound is heard in the word "इमारत" (Imaarat)?',
        options: ['Short "i" (इ)', 'Long "ee" (ई)', 'Short "u" (उ)', 'Long "aa" (आ)'],
        correctOption: 0
      },
      {
        question: 'What does "ऊस" (Oos) translate to in English?',
        options: ['Building', 'Sugarcane', 'Mango', 'Mortar'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'marathi_vocab_greetings',
    language: 'marathi',
    category: 'vocabulary',
    title: 'Marathi Essential Greetings & Courtesy (शिष्टाचार)',
    description: 'Master polite expressions, common greetings, and everyday phrases in Marathi.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=KzXgXgC-Nco',
    videoTitle: 'Learn Basic Marathi Greetings & Conversations',
    content: [
      {
        nativeWord: 'नमस्कार',
        translatedWord: 'Hello / Respectful Greetings',
        pronunciation: 'Namaskar [Nuh-mus-kaar]',
        explanation: 'Universal formal greeting used to greet elders, friends, and strangers respectfully.'
      },
      {
        nativeWord: 'तुम्ही कसे आहात?',
        translatedWord: 'How are you? (Formal/Plural)',
        pronunciation: 'Tumhi kase aahat? [Toom-hee kuh-say aa-hut]',
        explanation: 'Used when speaking politely to elders, teachers, or respected individuals.'
      },
      {
        nativeWord: 'मी मजेत आहे',
        translatedWord: 'I am doing great',
        pronunciation: 'Mee majet aahe [Mee muh-jayt aa-hay]',
        explanation: 'Standard cheerful reply when someone asks how you are doing.'
      },
      {
        nativeWord: 'धन्यवाद',
        translatedWord: 'Thank you',
        pronunciation: 'Dhanyawaad [Dhun-yuh-vaad]',
        explanation: 'Expresses gratitude and polite thanks.'
      },
      {
        nativeWord: 'पुन्हा भेटू',
        translatedWord: 'See you again',
        pronunciation: 'Punha bhetu [Poon-huh bhay-too]',
        explanation: 'Warm farewell meaning "We will meet again".'
      }
    ],
    quiz: [
      {
        question: 'How do you say "Thank you" in Marathi?',
        options: ['नमस्कार', 'मजेत', 'धन्यवाद', 'पुन्हा भेटू'],
        correctOption: 2
      },
      {
        question: 'What does "तुम्ही कसे आहात?" (Tumhi kase aahat?) mean?',
        options: ['What is your name?', 'How are you?', 'Where are you going?', 'Goodbye'],
        correctOption: 1
      },
      {
        question: 'What is the polite Marathi reply for "I am doing great"?',
        options: ['मी मजेत आहे.', 'नमस्कार.', 'धन्यवाद.', 'पुन्हा भेटू.'],
        correctOption: 0
      },
      {
        question: 'How do you warmly say "See you again" when saying goodbye in Marathi?',
        options: ['पुन्हा भेटू', 'नमस्कार', 'तुम्ही कसे आहात', 'धन्यवाद'],
        correctOption: 0
      },
      {
        question: 'When should you use the greeting "नमस्कार" (Namaskar)?',
        options: ['Only at night', 'To greet anyone respectfully', 'Only when buying fruits', 'When asking for directions'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'marathi_grammar_pronouns',
    language: 'marathi',
    category: 'grammar',
    title: 'Marathi Subject Pronouns (सर्वनामे)',
    description: 'Understand core personal pronouns used to address people and build Marathi sentences.',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=FqNCOvI9_q8',
    videoTitle: 'Marathi Pronouns Grammar Lesson',
    content: [
      {
        nativeWord: 'मी',
        translatedWord: 'I',
        pronunciation: 'Mee',
        explanation: 'First-person singular pronoun. (e.g. मी विद्यार्थी आहे - I am a student).'
      },
      {
        nativeWord: 'तू',
        translatedWord: 'You (Informal)',
        pronunciation: 'Too',
        explanation: 'Used for close friends, children, or younger siblings.'
      },
      {
        nativeWord: 'तुम्ही',
        translatedWord: 'You (Formal/Plural)',
        pronunciation: 'Tumhi',
        explanation: 'Essential formal pronoun for elders, teachers, or groups.'
      },
      {
        nativeWord: 'तो / ती / ते',
        translatedWord: 'He / She / It',
        pronunciation: 'To / Tee / Te',
        explanation: 'Third person: "तो" is masculine, "ती" is feminine, "ते" is neuter/respectful.'
      },
      {
        nativeWord: 'आम्ही',
        translatedWord: 'We',
        pronunciation: 'Aamhi',
        explanation: 'First-person plural pronoun when speaking on behalf of a group.'
      }
    ],
    quiz: [
      {
        question: 'Which pronoun is the formal or respectful form of "You" in Marathi?',
        options: ['मी', 'तू', 'तुम्ही', 'आम्ही'],
        correctOption: 2
      },
      {
        question: 'What does the pronoun "मी" (Mee) mean?',
        options: ['He', 'I', 'You', 'We'],
        correctOption: 1
      },
      {
        question: 'Match the feminine third-person singular pronoun "She" in Marathi:',
        options: ['तो', 'ती', 'ते', 'तू'],
        correctOption: 1
      },
      {
        question: 'Which pronoun means "We" in Marathi when referring to your group?',
        options: ['आम्ही', 'तुम्ही', 'मी', 'ते'],
        correctOption: 0
      },
      {
        question: 'What is the masculine form of "He" in Marathi?',
        options: ['ती', 'ते', 'तो', 'तू'],
        correctOption: 2
      }
    ]
  },
  {
    id: 'marathi_grammar_tenses',
    language: 'marathi',
    category: 'grammar',
    title: 'Marathi Tenses & Sentence Structure (काळ आणि वाक्यरचना)',
    description: 'Master Present, Past, and Future tense verb endings in Marathi sentences.',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=FqNCOvI9_q8',
    videoTitle: 'Marathi Tenses and Verbs Tutorial',
    content: [
      {
        nativeWord: 'मी आंबा खातो / खाते',
        translatedWord: 'I eat a mango (Masc / Fem)',
        pronunciation: 'Mee aamba khaato / khaate',
        explanation: 'Present Tense (वर्तमानकाळ): Boys say "खातो" (khaato), girls say "खाते" (khaate).'
      },
      {
        nativeWord: 'मी आंबा खाल्ला',
        translatedWord: 'I ate a mango',
        pronunciation: 'Mee aamba khaalla',
        explanation: 'Past Tense (भूतकाळ): Action completed in the past.'
      },
      {
        nativeWord: 'मी आंबा खाईन',
        translatedWord: 'I will eat a mango',
        pronunciation: 'Mee aamba khaain',
        explanation: 'Future Tense (भविष्यकाळ): Future action expressed with "ईन" (in) suffix.'
      },
      {
        nativeWord: 'तो पाणी पितो',
        translatedWord: 'He drinks water',
        pronunciation: 'To paani pito',
        explanation: 'Third person masculine present tense verb form "पितो" (pito).'
      },
      {
        nativeWord: 'ती गाणे गाते',
        translatedWord: 'She sings a song',
        pronunciation: 'Tee gaane gaate',
        explanation: 'Third person feminine present tense verb form "गाते" (gaate).'
      }
    ],
    quiz: [
      {
        question: 'How does a male speaker say "I eat a mango" in Marathi present tense?',
        options: ['मी आंबा खाल्ला', 'मी आंबा खातो', 'मी आंबा खाईन', 'मी आंबा खा खाते'],
        correctOption: 1
      },
      {
        question: 'Which Marathi sentence represents Future Tense (I will eat a mango)?',
        options: ['मी आंबा खातो', 'मी आंबा खाल्ला', 'मी आंबा खाईन', 'मी आंबा खात आहे'],
        correctOption: 2
      },
      {
        question: 'What is the past tense form for "I ate a mango" in Marathi?',
        options: ['मी आंबा खाल्ला', 'मी आंबा खातो', 'मी आंबा खाईन', 'मी आंबा खाणार'],
        correctOption: 0
      },
      {
        question: 'How do you say "She sings a song" in Marathi?',
        options: ['तो गाणे गातो', 'ती गाणे गाते', 'मी गाणे गातो', 'आम्ही गाणे गातो'],
        correctOption: 1
      },
      {
        question: 'In Marathi, what verb suffix usually marks the first-person Future Tense (e.g., I will drink)?',
        options: ['-तो (-to)', '-ला (-la)', '-ईन (-in)', '-ते (-te)'],
        correctOption: 2
      }
    ]
  },
  {
    id: 'marathi_grammar_gender_plurals',
    language: 'marathi',
    category: 'grammar',
    title: 'Marathi Gender & Noun Plurals (लिंग आणि वचन)',
    description: 'Learn Masculine, Feminine, and Neuter nouns and their plural conversions in Marathi.',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'मुलगा -> मुलगे',
        translatedWord: 'Boy -> Boys (Masculine / पुल्लिंग)',
        pronunciation: 'Mulga -> Mulge',
        explanation: 'Masculine singular ending in "आ" becomes "ए" in plural.'
      },
      {
        nativeWord: 'मुलगी -> मुली',
        translatedWord: 'Girl -> Girls (Feminine / स्त्रीलिंग)',
        pronunciation: 'Mulgi -> Mulii',
        explanation: 'Feminine nouns ending in "ी" retain "ी" sound in plural.'
      },
      {
        nativeWord: 'पान -> पाने',
        translatedWord: 'Leaf -> Leaves (Neuter / नपुंसकलिंग)',
        pronunciation: 'Paan -> Paane',
        explanation: 'Neuter nouns take "ए" ending in plural form.'
      },
      {
        nativeWord: 'कुत्रा -> कुत्रे',
        translatedWord: 'Dog -> Dogs',
        pronunciation: 'Kutra -> Kutre',
        explanation: 'Masculine singular "कुत्रा" converts to "कुत्रे" in plural.'
      },
      {
        nativeWord: 'वही -> वह्या',
        translatedWord: 'Notebook -> Notebooks',
        pronunciation: 'Vahi -> Vahyaa',
        explanation: 'Feminine noun "वही" changes to "वह्या" in plural.'
      }
    ],
    quiz: [
      {
        question: 'What is the plural of "मुलगा" (Mulga - Boy) in Marathi?',
        options: ['मुली', 'मुलगे', 'मुले', 'मुलगा'],
        correctOption: 1
      },
      {
        question: 'What is the plural of "पान" (Paan - Leaf) in neuter gender?',
        options: ['पाने', 'पानी', 'पाना', 'पानेचा'],
        correctOption: 0
      },
      {
        question: 'Which gender classification is "मुलगी" (Girl) in Marathi?',
        options: ['पुल्लिंग (Masculine)', 'स्त्रीलिंग (Feminine)', 'नपुंसकलिंग (Neuter)', 'उभयलिंग'],
        correctOption: 1
      },
      {
        question: 'What is the correct plural form of "वही" (Vahi - Notebook)?',
        options: ['वह्या', 'वहिया', 'वही', 'वहे'],
        correctOption: 0
      },
      {
        question: 'How does "कुत्रा" (Kutra - Dog) change in plural?',
        options: ['कुत्री', 'कुत्रे', 'कुत्रा', 'कुत्र्या'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'marathi_vocab_daily_pronunciation',
    language: 'marathi',
    category: 'vocabulary',
    title: 'Marathi Essential Vocabulary & Pronunciation Guide (रोजचे शब्द व उच्चार)',
    description: 'Learn everyday words for food, home, and market with accurate phonetic pronunciation tips.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'पाणी',
        translatedWord: 'Water',
        pronunciation: 'Paani [Pah-nee with retroflex "ण"]',
        explanation: 'Essential word for water. Note the soft retroflex "ण" sound.'
      },
      {
        nativeWord: 'जेवण',
        translatedWord: 'Meal / Food',
        pronunciation: 'Jevan [Jay-vun]',
        explanation: 'Refers to lunch or dinner. Example: जेवण झाले का? (Have you eaten?).'
      },
      {
        nativeWord: 'घर',
        translatedWord: 'House / Home',
        pronunciation: 'Ghar [Ghur]',
        explanation: 'Common word for house. Example: माझे घर (My home).'
      },
      {
        nativeWord: 'वेळ',
        translatedWord: 'Time',
        pronunciation: 'Vel [Vehl - retroflex "ळ"]',
        explanation: 'Special Marathi consonant "ळ" pronounced by curling the tip of tongue back.'
      },
      {
        nativeWord: 'शाळा',
        translatedWord: 'School',
        pronunciation: 'Shaala [Shaa-laa - retroflex "ळ"]',
        explanation: 'Word for school. Features the unique Marathi "ळ" sound.'
      }
    ],
    quiz: [
      {
        question: 'What is the Marathi word for "Water"?',
        options: ['जेवण', 'पाणी', 'घर', 'शाळा'],
        correctOption: 1
      },
      {
        question: 'What does "जेवण" (Jevan) mean in English?',
        options: ['School', 'Water', 'Meal / Food', 'Time'],
        correctOption: 2
      },
      {
        question: 'Which unique Marathi consonant sound is present in "वेळ" (Vel - Time) and "शाळा" (Shaala)?',
        options: ['र (Ra)', 'ळ (Lla - Retroflex)', 'श (Sha)', 'न (Na)'],
        correctOption: 1
      },
      {
        question: 'What does "माझे घर" translate to in English?',
        options: ['My school', 'My home', 'My meal', 'My water'],
        correctOption: 1
      },
      {
        question: 'How do you ask "Have you eaten?" in Marathi daily vocabulary?',
        options: ['जेवण झाले का?', 'पाणी आहे का?', 'शाळा कुठे आहे?', 'काय वेळ झाली?'],
        correctOption: 0
      }
    ]
  },

  // =========================================================================
  // HINDI LESSONS (हिंदी)
  // =========================================================================
  {
    id: 'hindi_alphabets_vowels',
    language: 'hindi',
    category: 'alphabets',
    title: 'Hindi Vowels & Phonetics (स्वर एवं उच्चारण)',
    description: 'Learn Devanagari vowels in Hindi with precise phonetic sounds and example words.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=W0-YgV9025s',
    videoTitle: 'Hindi Vowels & Swar Pronunciation',
    content: [
      {
        nativeWord: 'अ',
        translatedWord: 'a',
        pronunciation: 'uh (short sound)',
        explanation: 'Short vowel sound. Example: अनार (Anaar - Pomegranate).'
      },
      {
        nativeWord: 'आ',
        translatedWord: 'aa',
        pronunciation: 'aa (elongated sound)',
        explanation: 'Long vowel sound. Example: आम (Aam - Mango).'
      },
      {
        nativeWord: 'इ',
        translatedWord: 'i',
        pronunciation: 'ee (short sound)',
        explanation: 'Short "i" vowel sound. Example: इमली (Imlee - Tamarind).'
      },
      {
        nativeWord: 'ई',
        translatedWord: 'ee',
        pronunciation: 'eee (long sound)',
        explanation: 'Long "i" vowel sound. Example: ईख (Eekh - Sugarcane).'
      },
      {
        nativeWord: 'उ',
        translatedWord: 'u',
        pronunciation: 'oo (short sound)',
        explanation: 'Short "u" vowel sound. Example: उल्लू (Ullu - Owl).'
      }
    ],
    quiz: [
      {
        question: 'Which Hindi vowel stands for the short "u" sound as in "Owl"?',
        options: ['अ', 'इ', 'उ', 'ई'],
        correctOption: 2
      },
      {
        question: 'What does "अनार" (Anaar) mean in English?',
        options: ['Mango', 'Tamarind', 'Pomegranate', 'Owl'],
        correctOption: 2
      },
      {
        question: 'Which Hindi letter represents the long "aa" sound like in "Mango" (आम)?',
        options: ['अ', 'आ', 'इ', 'ई'],
        correctOption: 1
      },
      {
        question: 'What is the English meaning of "इमली" (Imlee)?',
        options: ['Pomegranate', 'Sugarcane', 'Mango', 'Tamarind'],
        correctOption: 3
      },
      {
        question: 'Which letter corresponds to long "ee" sound in Hindi?',
        options: ['ई', 'इ', 'उ', 'अ'],
        correctOption: 0
      }
    ]
  },
  {
    id: 'hindi_vocab_common',
    language: 'hindi',
    category: 'vocabulary',
    title: 'Hindi Everyday Conversations (दैनिक संवाद)',
    description: 'Essential polite greetings, introductions, and courtesies in Hindi.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=GjYmIeU8T4Y',
    videoTitle: 'Everyday Hindi Phrases & Greetings',
    content: [
      {
        nativeWord: 'नमस्ते',
        translatedWord: 'Hello / Greetings',
        pronunciation: 'Namaste [Nuh-mus-tay]',
        explanation: 'Universal respectful greeting used anytime during the day.'
      },
      {
        nativeWord: 'आपका नाम क्या है?',
        translatedWord: 'What is your name? (Formal)',
        pronunciation: 'Aapka naam kya hai?',
        explanation: 'Polite question to ask someone their name.'
      },
      {
        nativeWord: 'मेरा नाम ... है',
        translatedWord: 'My name is ...',
        pronunciation: 'Mera naam ... hai',
        explanation: 'Standard sentence structure to introduce yourself.'
      },
      {
        nativeWord: 'जी हाँ',
        translatedWord: 'Yes (Polite)',
        pronunciation: 'Ji haan',
        explanation: 'Adding "Ji" before "haan" expresses respect and politeness.'
      },
      {
        nativeWord: 'धन्यवाद / शुक्रिया',
        translatedWord: 'Thank you',
        pronunciation: 'Dhanyavaad / Shukriya',
        explanation: 'Expresses sincere thanks and appreciation.'
      }
    ],
    quiz: [
      {
        question: 'How do you politely say "Yes" in Hindi?',
        options: ['जी नहीं', 'नमस्ते', 'जी हाँ', 'क्या'],
        correctOption: 2
      },
      {
        question: 'What does "आपका नाम क्या है?" translate to?',
        options: ['Where do you live?', 'How are you?', 'Who are you?', 'What is your name?'],
        correctOption: 3
      },
      {
        question: 'How do you introduce yourself by saying "My name is Raj" in Hindi?',
        options: ['मेरा नाम राज है', 'आपका नाम राज है', 'नमस्ते राज', 'धन्यवाद राज'],
        correctOption: 0
      },
      {
        question: 'What is the universal respectful greeting in Hindi?',
        options: ['जी नहीं', 'नमस्ते', 'शुक्रिया', 'क्या'],
        correctOption: 1
      },
      {
        question: 'What are two common words for "Thank you" in Hindi?',
        options: ['नमस्ते & जी हाँ', 'धन्यवाद & शुक्रिया', 'आपका नाम & मेरा नाम', 'हाँ & नहीं'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'hindi_action_verbs_grammar',
    language: 'hindi',
    category: 'grammar',
    title: 'Hindi Common Action Verbs (क्रियाएँ)',
    description: 'Learn core Hindi verbs and construct practical active sentences.',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=N4tL79qZcoA',
    videoTitle: 'Hindi Action Verbs & Sentences',
    content: [
      {
        nativeWord: 'खाना',
        translatedWord: 'To eat',
        pronunciation: 'Khaana',
        explanation: 'Verb meaning to eat or food. Example: आम खाना (To eat a mango).'
      },
      {
        nativeWord: 'पीना',
        translatedWord: 'To drink',
        pronunciation: 'Peena',
        explanation: 'Verb meaning to drink. Example: पानी पीना (To drink water).'
      },
      {
        nativeWord: 'पढ़ना',
        translatedWord: 'To read / study',
        pronunciation: 'Padhna',
        explanation: 'Verb meaning to read. Example: किताब पढ़ना (To read a book).'
      },
      {
        nativeWord: 'लिखना',
        translatedWord: 'To write',
        pronunciation: 'Likhna',
        explanation: 'Verb meaning to write. Example: पत्र लिखना (To write a letter).'
      },
      {
        nativeWord: 'जाना',
        translatedWord: 'To go',
        pronunciation: 'Jaana',
        explanation: 'Verb meaning to go. Example: घर जाना (To go home).'
      }
    ],
    quiz: [
      {
        question: 'What does the Hindi verb "पढ़ना" (Padhna) mean?',
        options: ['To eat', 'To write', 'To read / study', 'To go'],
        correctOption: 2
      },
      {
        question: 'How do you say "To drink" in Hindi?',
        options: ['खाना', 'पीना', 'लिखना', 'जाना'],
        correctOption: 1
      },
      {
        question: 'What does "किताब पढ़ना" mean in English?',
        options: ['To eat food', 'To read a book', 'To write a letter', 'To go home'],
        correctOption: 1
      },
      {
        question: 'Which Hindi verb means "To write"?',
        options: ['लिखना', 'जाना', 'खाना', 'पीना'],
        correctOption: 0
      },
      {
        question: 'Translate "To go home" into Hindi:',
        options: ['पानी पीना', 'घर जाना', 'पत्र लिखना', 'आम खाना'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'hindi_grammar_tenses_gender',
    language: 'hindi',
    category: 'grammar',
    title: 'Hindi Gender Agreement & Tenses (लिंग और काल)',
    description: 'Master masculine vs feminine verb endings (-ता है vs -ती है) and tense structures in Hindi.',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'मैं खाता हूँ / मैं खाती हूँ',
        translatedWord: 'I eat (Masc / Fem)',
        pronunciation: 'Main khaata hoon / Main khaati hoon',
        explanation: 'Present Habitual: Male speakers use "-ता हूँ" (-ta hoon), female speakers use "-ती हूँ" (-ti hoon).'
      },
      {
        nativeWord: 'वह जा रहा है / वह जा रही है',
        translatedWord: 'He is going / She is going',
        pronunciation: 'Vah jaa raha hai / Vah jaa rahi hai',
        explanation: 'Present Continuous: "रहा है" (raha hai) for male, "रही है" (rahi hai) for female.'
      },
      {
        nativeWord: 'मैंने काम किया',
        translatedWord: 'I worked (Past Tense)',
        pronunciation: 'Maine kaam kiya',
        explanation: 'Past transitive verbs use the postposition "ने" (ne) attached to subject.'
      },
      {
        nativeWord: 'हम कल जाएँगे',
        translatedWord: 'We will go tomorrow',
        pronunciation: 'Hum kal jaayenge',
        explanation: 'Future Tense plural verb ending "-एँगे" (-yenge).'
      },
      {
        nativeWord: 'लड़का पढ़ता है / लड़की पढ़ती है',
        translatedWord: 'The boy reads / The girl reads',
        pronunciation: 'Ladka padhta hai / Ladki padhti hai',
        explanation: 'Verb agreement in third person singular present tense.'
      }
    ],
    quiz: [
      {
        question: 'How does a female speaker say "I eat" in Hindi present tense?',
        options: ['मैं खाता हूँ', 'मैं खाती हूँ', 'मैं खाया', 'मैं खाऊँगा'],
        correctOption: 1
      },
      {
        question: 'Which phrase means "He is going" in Hindi present continuous?',
        options: ['वह जा रही है', 'वह जा रहा है', 'वह गया', 'वह जाएगा'],
        correctOption: 1
      },
      {
        question: 'How do you say "The girl reads" in Hindi?',
        options: ['लड़की पढ़ता है', 'लड़की पढ़ती है', 'लड़का पढ़ती है', 'लड़की पढ़ा'],
        correctOption: 1
      },
      {
        question: 'What does "हम कल जाएँगे" mean in English?',
        options: ['We went yesterday', 'We are going today', 'We will go tomorrow', 'We are eating'],
        correctOption: 2
      },
      {
        question: 'In past transitive sentences like "I worked", which postposition is added to "मैं"?',
        options: ['को (ko)', 'में (mein)', 'ने (ne)', 'पर (par)'],
        correctOption: 2
      }
    ]
  },
  {
    id: 'hindi_grammar_postpositions',
    language: 'hindi',
    category: 'grammar',
    title: 'Hindi Postpositions & Case Markers (परसर्ग - में, पर, से, को, का/के/की)',
    description: 'Learn postpositions in Hindi that correspond to English prepositions (in, on, from, to, of).',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'कमरे में',
        translatedWord: 'In the room',
        pronunciation: 'Kamre mein',
        explanation: 'Postposition "में" (mein) means "in" or "inside".'
      },
      {
        nativeWord: 'मेज पर',
        translatedWord: 'On the table',
        pronunciation: 'Mej par',
        explanation: 'Postposition "पर" (par) means "on" or "at".'
      },
      {
        nativeWord: 'दिल्ली से',
        translatedWord: 'From Delhi / By Delhi',
        pronunciation: 'Dilli se',
        explanation: 'Postposition "से" (se) means "from", "with", or "by".'
      },
      {
        nativeWord: 'उसको',
        translatedWord: 'To him / To her',
        pronunciation: 'Usko',
        explanation: 'Postposition "को" (ko) indicates direct/indirect object ("to").'
      },
      {
        nativeWord: 'भारत का इतिहास',
        translatedWord: 'History of India',
        pronunciation: 'Bharat ka itihaas',
        explanation: 'Genitive "का/के/की" (ka/ke/ki) means "of" or possessive (\'s).'
      }
    ],
    quiz: [
      {
        question: 'Which Hindi postposition corresponds to "in" or "inside"?',
        options: ['पर (par)', 'में (mein)', 'से (se)', 'को (ko)'],
        correctOption: 1
      },
      {
        question: 'What does "मेज पर" (Mej par) translate to in English?',
        options: ['Under the table', 'In the table', 'On the table', 'From the table'],
        correctOption: 2
      },
      {
        question: 'How do you say "From Delhi" using postpositions in Hindi?',
        options: ['दिल्ली में', 'दिल्ली से', 'दिल्ली पर', 'दिल्ली का'],
        correctOption: 1
      },
      {
        question: 'Which postposition is used to express possession or "of" in "History of India"?',
        options: ['का / के / की (ka/ke/ki)', 'से (se)', 'को (ko)', 'में (mein)'],
        correctOption: 0
      },
      {
        question: 'What does "को" (ko) signify in Hindi sentences?',
        options: ['From', 'To / Object marker', 'Inside', 'Above'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'hindi_vocab_pronunciation_guide',
    language: 'hindi',
    category: 'vocabulary',
    title: 'Hindi Daily Phonetics & Vocabulary (उच्चारण और उपयोगी शब्द)',
    description: 'Learn practical daily terms for family, food, market, and travel with phonetic guides.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'परिवार',
        translatedWord: 'Family',
        pronunciation: 'Parivaar [Puh-ree-vaar]',
        explanation: 'Word for family. Example: मेरा परिवार (My family).'
      },
      {
        nativeWord: 'मित्र / दोस्त',
        translatedWord: 'Friend',
        pronunciation: 'Mitr / Dost [Mit-ruh / Dohst]',
        explanation: 'Words for friend in Hindi.'
      },
      {
        nativeWord: 'बाज़ार',
        translatedWord: 'Market',
        pronunciation: 'Bazaar [Buh-zaar]',
        explanation: 'Word for marketplace or shopping center.'
      },
      {
        nativeWord: 'समय / वक्त',
        translatedWord: 'Time',
        pronunciation: 'Samay / Vakt [Suh-mue]',
        explanation: 'Terms referring to time or clock hours.'
      },
      {
        nativeWord: 'भोजन / खाना',
        translatedWord: 'Food / Meal',
        pronunciation: 'Bhojan / Khaana [Bho-jun]',
        explanation: 'Refers to food or dining.'
      }
    ],
    quiz: [
      {
        question: 'What is the Hindi word for "Family"?',
        options: ['मित्र', 'परिवार', 'बाज़ार', 'समय'],
        correctOption: 1
      },
      {
        question: 'What does "बाज़ार" (Bazaar) mean in English?',
        options: ['Hospital', 'Market', 'School', 'House'],
        correctOption: 1
      },
      {
        question: 'Which word means "Friend" in Hindi?',
        options: ['मित्र / दोस्त', 'परिवार', 'समय', 'खाना'],
        correctOption: 0
      },
      {
        question: 'How do you say "Time" in Hindi?',
        options: ['समय / वक्त', 'परिवार', 'बाज़ार', 'नमस्ते'],
        correctOption: 0
      },
      {
        question: 'What does "स्वादिष्ट भोजन" mean?',
        options: ['Delicious food', 'Big family', 'Good market', 'Free time'],
        correctOption: 0
      }
    ]
  },

  // =========================================================================
  // SANSKRIT LESSONS (संस्कृतम्)
  // =========================================================================
  {
    id: 'sanskrit_alphabets_basics',
    language: 'sanskrit',
    category: 'alphabets',
    title: 'Sanskrit Sound System & Phonetics (वर्णमाला)',
    description: 'Explore the phonetic purity of Sanskrit sounds, vowels, and ancient Devanagari script.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=Xsh8i7tK8_4',
    videoTitle: 'Sanskrit Sound System & Phonetics',
    content: [
      {
        nativeWord: 'अ',
        translatedWord: 'a',
        pronunciation: 'ah (short fundamental sound)',
        explanation: 'Primeval sound. Example: अश्वः (Ashvah - Horse).'
      },
      {
        nativeWord: 'आ',
        translatedWord: 'aa',
        pronunciation: 'aah (elongated sound)',
        explanation: 'Elongated vowel. Example: आम्रम् (Aamram - Mango).'
      },
      {
        nativeWord: 'इ',
        translatedWord: 'i',
        pronunciation: 'ee (short sound)',
        explanation: 'Short vowel. Example: इक्षुः (Ikshuh - Sugarcane).'
      },
      {
        nativeWord: 'ई',
        translatedWord: 'ee',
        pronunciation: 'eee (long sound)',
        explanation: 'Long vowel. Example: ईशः (Eeshah - Lord/Master).'
      },
      {
        nativeWord: 'उ',
        translatedWord: 'u',
        pronunciation: 'oo (short sound)',
        explanation: 'Short vowel. Example: उष्ट्रः (Ushtrah - Camel).'
      }
    ],
    quiz: [
      {
        question: 'What is the Sanskrit word for "Mango"?',
        options: ['अश्वः', 'आम्रम्', 'इक्षुः', 'ईशः'],
        correctOption: 1
      },
      {
        question: 'What does "अश्वः" (Ashvah) mean in English?',
        options: ['Sugarcane', 'Lord', 'Horse', 'Mango'],
        correctOption: 2
      },
      {
        question: 'Which Sanskrit word means "Sugarcane"?',
        options: ['इक्षुः', 'अश्वः', 'उष्ट्रः', 'आम्रम्'],
        correctOption: 0
      },
      {
        question: 'What is the English meaning of "उष्ट्रः" (Ushtrah)?',
        options: ['Horse', 'Camel', 'Mango', 'Sugarcane'],
        correctOption: 1
      },
      {
        question: 'What does "ईशः" (Eeshah) signify in Sanskrit?',
        options: ['Lord / Master', 'Horse', 'Tamarind', 'Camel'],
        correctOption: 0
      }
    ]
  },
  {
    id: 'sanskrit_vocab_greetings',
    language: 'sanskrit',
    category: 'vocabulary',
    title: 'Sanskrit Devotional Greetings & Conversation (संस्कृत सम्भाषणम्)',
    description: 'Learn classical respectful greetings, polite dialogue, and traditional terms in Sanskrit.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=CqHj_S61hZ8',
    videoTitle: 'Sanskrit Basic Conversation Practice',
    content: [
      {
        nativeWord: 'नमो नमः / नमस्ते',
        translatedWord: 'Greetings / Salutations',
        pronunciation: 'Namo Namah / Namaste',
        explanation: 'Reverent greeting acknowledging the divine spark in others.'
      },
      {
        nativeWord: 'कथमस्ति भवान्?',
        translatedWord: 'How are you? (To a male)',
        pronunciation: 'Kathamasti bhavan?',
        explanation: 'Polite inquiry used when addressing a man.'
      },
      {
        nativeWord: 'कथमस्ति भवती?',
        translatedWord: 'How are you? (To a female)',
        pronunciation: 'Kathamasti bhavatee?',
        explanation: 'Polite inquiry used when addressing a woman.'
      },
      {
        nativeWord: 'अहं कुशली अस्मि',
        translatedWord: 'I am doing well',
        pronunciation: 'Aham kushalee asmi',
        explanation: 'Classical answer meaning "I am fine / healthy".'
      },
      {
        nativeWord: 'धन्यवादः',
        translatedWord: 'Thank you',
        pronunciation: 'Dhanyavadah [Dhun-yuh-vaa-duh with Visarga]',
        explanation: 'Traditional expression of gratitude.'
      }
    ],
    quiz: [
      {
        question: 'How do you ask "How are you?" to a woman in Sanskrit?',
        options: ['कथमस्ति भवान्?', 'कथमस्ति भवती?', 'अहं कुशली अस्मि', 'धन्यवादः'],
        correctOption: 1
      },
      {
        question: 'What does "धन्यवादः" (Dhanyavadah) mean in Sanskrit?',
        options: ['Thank you', 'Greetings', 'I am doing well', 'Goodbye'],
        correctOption: 0
      },
      {
        question: 'How do you ask "How are you?" to a man in Sanskrit?',
        options: ['कथमस्ति भवान्?', 'कथमस्ति भवती?', 'नमो नमः', 'शुभरात्रिः'],
        correctOption: 0
      },
      {
        question: 'What is the meaning of "अहं कुशली अस्मि"?',
        options: ['I am doing well', 'Thank you', 'What is your name?', 'Where are you going?'],
        correctOption: 0
      },
      {
        question: 'What is the classical Sanskrit greeting meaning "Salutations to you"?',
        options: ['नमो नमः / नमस्ते', 'धन्यवादः', 'कुशली', 'कथमस्ति'],
        correctOption: 0
      }
    ]
  },
  {
    id: 'sanskrit_grammar_vibhakti',
    language: 'sanskrit',
    category: 'grammar',
    title: 'Sanskrit Noun Cases (विभक्ति - Vibhakti Basics)',
    description: 'Learn fundamental noun declension cases (Prathama, Dwitiya, Tritiya) in Sanskrit grammar.',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'रामः गच्छति',
        translatedWord: 'Rama goes (प्रथमा विभक्ति - Nominative Subject)',
        pronunciation: 'Raamah gacchati',
        explanation: 'Subject case (Prathama): "रामः" is the subject performing the action.'
      },
      {
        nativeWord: 'रामः फलम् खादति',
        translatedWord: 'Rama eats a fruit (द्वितीया विभक्ति - Accusative Object)',
        pronunciation: 'Raamah phalam khadati',
        explanation: 'Direct Object case (Dwitiya): "फलम्" (fruit) is the object being eaten.'
      },
      {
        nativeWord: 'रामः हस्तेन लिखति',
        translatedWord: 'Rama writes with a hand (तृतीया विभक्ति - Instrumental Means)',
        pronunciation: 'Raamah hastena likhati',
        explanation: 'Instrumental case (Tritiya): "हस्तेन" means "by/with a hand".'
      },
      {
        nativeWord: 'छात्राय पुस्तकम्',
        translatedWord: 'Book for the student (चतुर्थी विभक्ति - Dative Purpose)',
        pronunciation: 'Chaatraaya pustakam',
        explanation: 'Dative case (Chaturthi): "छात्राय" means "for the student".'
      },
      {
        nativeWord: 'वृक्षात् पर्णम् पतति',
        translatedWord: 'A leaf falls from the tree (पञ्चमी विभक्ति - Ablative Separation)',
        pronunciation: 'Vrikshaat parnam patati',
        explanation: 'Ablative case (Panchami): "वृक्षात्" means "from the tree".'
      }
    ],
    quiz: [
      {
        question: 'In "रामः फलम् खादति", which word is in the Accusative Object case (द्वितीया विभक्ति)?',
        options: ['रामः', 'फलम्', 'खादति', 'गच्छति'],
        correctOption: 1
      },
      {
        question: 'What does "हस्तेन" mean in the Instrumental case (तृतीया विभक्ति)?',
        options: ['To the hand', 'From the hand', 'With / By hand', 'Hand\'s'],
        correctOption: 2
      },
      {
        question: 'What does "वृक्षात्" mean in the Ablative case (पञ्चमी विभक्ति)?',
        options: ['To the tree', 'From the tree', 'On the tree', 'Tree\'s'],
        correctOption: 1
      },
      {
        question: 'Translate "रामः गच्छति" into English:',
        options: ['Rama eats', 'Rama goes', 'Rama writes', 'Rama sees'],
        correctOption: 1
      },
      {
        question: 'Which case is used to express "for the student" in "छात्राय पुस्तकम्"?',
        options: ['प्रथमा (Nominative)', 'द्वितीया (Accusative)', 'चतुर्थी (Dative)', 'सप्तमी (Locative)'],
        correctOption: 2
      }
    ]
  },
  {
    id: 'sanskrit_grammar_dhatu_roop',
    language: 'sanskrit',
    category: 'grammar',
    title: 'Sanskrit Verb Conjugations (धातुरूपाणि - Present Tense Lat Lakara)',
    description: 'Master present tense verb forms in singular, dual, and plural across 3 persons in Sanskrit.',
    difficulty: 'intermediate',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'सह पठति',
        translatedWord: 'He reads (Third Person Singular - प्रथमपुरुषः)',
        pronunciation: 'Sah pathati',
        explanation: 'Present tense singular suffix "-ति" (ti). "पठति" = reads.'
      },
      {
        nativeWord: 'तौ पठतः',
        translatedWord: 'They two read (Third Person Dual - द्विवचनम्)',
        pronunciation: 'Tau pathatah',
        explanation: 'Unique Sanskrit Dual number suffix "-तः" (tah).'
      },
      {
        nativeWord: 'ते पठन्ति',
        translatedWord: 'They all read (Third Person Plural - बहुवचनम्)',
        pronunciation: 'Te pathanti',
        explanation: 'Plural suffix "-न्ति" (nti).'
      },
      {
        nativeWord: 'त्वम् पठसि',
        translatedWord: 'You read (Second Person Singular - मध्यमपुरुषः)',
        pronunciation: 'Tvam pathasi',
        explanation: 'Second person singular suffix "-सि" (si).'
      },
      {
        nativeWord: 'अहम् पठामि',
        translatedWord: 'I read (First Person Singular - उत्तमपुरुषः)',
        pronunciation: 'Aham pathaami',
        explanation: 'First person singular suffix "-आमि" (aami).'
      }
    ],
    quiz: [
      {
        question: 'How do you say "I read" in Sanskrit present tense (उत्तमपुरुषः)?',
        options: ['अहम् पठामि', 'त्वम् पठसि', 'सह पठति', 'ते पठन्ति'],
        correctOption: 0
      },
      {
        question: 'What is the plural verb form for "They all read" in Sanskrit?',
        options: ['पठति', 'पठतः', 'पठन्ति', 'पठामि'],
        correctOption: 2
      },
      {
        question: 'What does "त्वम् पठसि" translate to?',
        options: ['He reads', 'You read', 'I read', 'They two read'],
        correctOption: 1
      },
      {
        question: 'Sanskrit has a unique number form between Singular and Plural. What is it called?',
        options: ['ए कवच नम् (Singular)', 'द्विवचनम् (Dual)', 'बहुवचनम् (Plural)', 'मध्यम'],
        correctOption: 1
      },
      {
        question: 'What verb suffix marks the Third Person Singular present tense (e.g., पठति)?',
        options: ['-ति (-ti)', '-सि (-si)', '-आमि (-aami)', '-न्ति (-nti)'],
        correctOption: 0
      }
    ]
  },
  {
    id: 'sanskrit_vocab_chanting_phonetics',
    language: 'sanskrit',
    category: 'vocabulary',
    title: 'Sanskrit Chanting Phonetics & Sacred Words (मन्त्रोच्चारणं पदकोशश्च)',
    description: 'Learn precise phonetic rules for Visarga (:), Anusvara (ं), and sacred Sanskrit vocabulary.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'ॐ',
        translatedWord: 'Om / AUM',
        pronunciation: 'AUM [A-U-M resonance]',
        explanation: 'Cosmic primordial sound composed of A, U, M sounds.'
      },
      {
        nativeWord: 'शान्तिः',
        translatedWord: 'Peace',
        pronunciation: 'Shaantih [Shaan-tih with soft unvoiced exhalation Visarga ":"]',
        explanation: 'The colon ":" represents Visarga, adding a gentle unvoiced breath sound.'
      },
      {
        nativeWord: 'सत्यम्',
        translatedWord: 'Truth',
        pronunciation: 'Satyam [Sat-yum with Anusvara nasal sound]',
        explanation: 'Key spiritual concept meaning eternal truth.'
      },
      {
        nativeWord: 'विद्या',
        translatedWord: 'Knowledge / Wisdom',
        pronunciation: 'Vidyaa [Vid-yaa]',
        explanation: 'Refers to sacred knowledge and learning.'
      },
      {
        nativeWord: 'गुरुः',
        translatedWord: 'Teacher / Spiritual Master',
        pronunciation: 'Guruh [Gu-ruh]',
        explanation: 'Dispeller of darkness and teacher.'
      }
    ],
    quiz: [
      {
        question: 'What is the phonetic symbol ":" called in Sanskrit terms like "शान्तिः"?',
        options: ['अनुस्वार (Anusvara)', 'विसर्ग (Visarga)', 'हलन्त (Halanta)', 'मात्रा'],
        correctOption: 1
      },
      {
        question: 'What does "सत्यम्" (Satyam) mean in Sanskrit?',
        options: ['Peace', 'Truth', 'Knowledge', 'Teacher'],
        correctOption: 1
      },
      {
        question: 'What is the Sanskrit word for "Knowledge / Wisdom"?',
        options: ['विद्या', 'गुरुः', 'शान्तिः', 'सत्यम्'],
        correctOption: 0
      },
      {
        question: 'What does "गुरुः" (Guruh) translate to in English?',
        options: ['Student', 'Teacher / Master', 'Peace', 'Truth'],
        correctOption: 1
      },
      {
        question: 'Which primordial sacred sound is composed of A, U, M resonances?',
        options: ['ॐ', 'शान्तिः', 'सत्यम्', 'विद्या'],
        correctOption: 0
      }
    ]
  },

  // =========================================================================
  // ENGLISH LESSONS
  // =========================================================================
  {
    id: 'english_alphabets_basics',
    language: 'english',
    category: 'alphabets',
    title: 'English Alphabets and Phonetics',
    description: 'Understand standard English vowels, consonants, and phonetic pronunciation rules.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=BELlZKpi1Zs',
    videoTitle: 'English Alphabets Phonics & Sounds',
    content: [
      {
        nativeWord: 'A',
        translatedWord: 'Apple sound /æ/',
        pronunciation: 'ae',
        explanation: 'Short "a" sound. Examples: Apple, Cat, Ant.'
      },
      {
        nativeWord: 'B',
        translatedWord: 'Bat sound /b/',
        pronunciation: 'buh',
        explanation: 'Voiced bilabial sound. Examples: Boy, Book, Baby.'
      },
      {
        nativeWord: 'C',
        translatedWord: 'Cat sound /k/ or City sound /s/',
        pronunciation: 'kuh or suh',
        explanation: 'Hard sound is "/k/" (Cat), soft sound is "/s/" (City).'
      },
      {
        nativeWord: 'D',
        translatedWord: 'Dog sound /d/',
        pronunciation: 'duh',
        explanation: 'Voiced sound. Examples: Door, Desk, Dream.'
      }
    ],
    quiz: [
      {
        question: 'What is the "hard" phonetic sound of the English letter C?',
        options: ['/s/ sound like City', '/k/ sound like Cat', '/sh/ sound like Shoe', '/ch/ sound like Chat'],
        correctOption: 1
      },
      {
        question: 'Which sound does the letter A make in the word "Apple"?',
        options: ['Short /æ/ sound', 'Long /e/ sound', 'Silent sound', 'O sound'],
        correctOption: 0
      },
      {
        question: 'Which word demonstrates the soft sound of letter C?',
        options: ['Cat', 'City', 'Car', 'Cup'],
        correctOption: 1
      },
      {
        question: 'How many vowels exist in standard English alphabet (A, E, I, O, U)?',
        options: ['3', '5', '7', '10'],
        correctOption: 1
      },
      {
        question: 'Which consonant sound starts the word "Dog"?',
        options: ['/b/', '/d/', '/g/', '/p/'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'english_travel_vocab',
    language: 'english',
    category: 'vocabulary',
    title: 'English Essential Travel & Conversation Phrases',
    description: 'Essential phrases for navigating airports, hotels, restaurants, and asking for directions.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=7uU8yK1g_aU',
    videoTitle: 'English Travel Phrases & Vocabulary',
    content: [
      {
        nativeWord: 'Where is the restroom?',
        translatedWord: 'restroom location inquiry',
        pronunciation: 'where is the restroom',
        explanation: 'Key polite question to locate washroom facilities.'
      },
      {
        nativeWord: 'How much does this cost?',
        translatedWord: 'price inquiry',
        pronunciation: 'how much does this cost',
        explanation: 'Essential phrase used when shopping or buying tickets.'
      },
      {
        nativeWord: 'Could you help me, please?',
        translatedWord: 'request for assistance',
        pronunciation: 'could you help me please',
        explanation: 'Polite and respectful way to ask a local for help.'
      },
      {
        nativeWord: 'I would like to order...',
        translatedWord: 'ordering food or drink',
        pronunciation: 'I would like to order',
        explanation: 'Standard polite phrase used in restaurants.'
      }
    ],
    quiz: [
      {
        question: 'Which phrase is used to ask for help politely in English?',
        options: ['How much does this cost?', 'Could you help me, please?', 'Where is the restroom?', 'I would like to order...'],
        correctOption: 1
      },
      {
        question: 'What does "How much does this cost?" inquire about?',
        options: ['Restroom location', 'Directions to airport', 'The price of an item', 'A food order'],
        correctOption: 2
      },
      {
        question: 'How do you politely order food at a restaurant in English?',
        options: ['Give me food now', 'I would like to order...', 'Where is the food?', 'How much is food?'],
        correctOption: 1
      },
      {
        question: 'What phrase do you use to ask for toilet facilities?',
        options: ['Where is the restroom?', 'How much does this cost?', 'Help me please', 'Goodbye'],
        correctOption: 0
      },
      {
        question: 'Which polite word should you always include when asking for assistance?',
        options: ['Now', 'Please', 'Quickly', 'Hey'],
        correctOption: 1
      }
    ]
  },
  {
    id: 'english_grammar_basics',
    language: 'english',
    category: 'grammar',
    title: 'English Basic Tenses & Sentence Structure',
    description: 'Learn simple present, past, and future tense sentence patterns in English.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      {
        nativeWord: 'I eat an apple',
        translatedWord: 'Simple Present Tense',
        pronunciation: 'I eat an apple',
        explanation: 'Habitual or present action.'
      },
      {
        nativeWord: 'She ate an apple',
        translatedWord: 'Simple Past Tense',
        pronunciation: 'She ate an apple',
        explanation: 'Action completed in the past.'
      },
      {
        nativeWord: 'They will eat apples',
        translatedWord: 'Simple Future Tense',
        pronunciation: 'They will eat apples',
        explanation: 'Action that will occur in the future.'
      }
    ],
    quiz: [
      {
        question: 'Which sentence represents the Simple Past tense?',
        options: ['I eat an apple', 'She ate an apple', 'They will eat apples', 'I am eating an apple'],
        correctOption: 1
      },
      {
        question: 'What word indicates the future tense in "They will eat apples"?',
        options: ['They', 'will', 'eat', 'apples'],
        correctOption: 1
      },
      {
        question: 'In English, what suffix is usually added to regular verbs to form past tense?',
        options: ['-ing', '-ed', '-s', '-est'],
        correctOption: 1
      },
      {
        question: 'What is the plural form of the word "apple"?',
        options: ['Apples', 'Appleses', 'Applin', 'Apply'],
        correctOption: 0
      },
      {
        question: 'Which article is used before vowel sounds like "apple"?',
        options: ['A', 'An', 'The', 'Some'],
        correctOption: 1
      }
    ]
  },

  // =========================================================================
  // GUJARATI LESSONS (ગુજરાતી)
  // =========================================================================
  {
    id: 'gujarati_alphabets_vowels',
    language: 'gujarati',
    category: 'alphabets',
    title: 'Gujarati Vowels & Sounds (ગુજરાતી સ્વર)',
    description: 'Learn foundational Gujarati vowels and their phonetic pronunciation with examples.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=O1S7k9M7Ums',
    videoTitle: 'Gujarati Alphabets (Barakhadi & Vowels)',
    content: [
      { nativeWord: 'અ', translatedWord: 'a', pronunciation: 'uh (as in "up")', explanation: 'First vowel. Example: અનાનસ (Ananas - Pineapple).' },
      { nativeWord: 'આ', translatedWord: 'aa', pronunciation: 'aa (as in "car")', explanation: 'Long "a". Example: કેરી (Keri - Mango) contains this sound.' },
      { nativeWord: 'ઇ', translatedWord: 'i', pronunciation: 'ee (short)', explanation: 'Short "i". Example: ઇમારત (Imaarat - Building).' },
      { nativeWord: 'ઉ', translatedWord: 'u', pronunciation: 'oo (short)', explanation: 'Short "u". Example: ઉપવન (Upavan - Garden).' }
    ],
    quiz: [
      { question: 'Which Gujarati vowel represents the short sound "uh" as in "up"?', options: ['આ', 'અ', 'ઇ', 'ઉ'], correctOption: 1 },
      { question: 'What is the Gujarati word for "Building"?', options: ['અનાનસ', 'ઇમારત', 'ઉપવન', 'કેરી'], correctOption: 1 },
      { question: 'What is the Gujarati word for "Garden"?', options: ['ઇમારત', 'ઉપવન', 'અનાનસ', 'કેરી'], correctOption: 1 },
      { question: 'Which vowel sound starts "અનાનસ" (Pineapple)?', options: ['અ', 'આ', 'ઇ', 'ઉ'], correctOption: 0 },
      { question: 'What fruit does "કેરી" (Keri) refer to in Gujarati?', options: ['Apple', 'Mango', 'Banana', 'Pineapple'], correctOption: 1 }
    ]
  },
  {
    id: 'gujarati_vocab_greetings',
    language: 'gujarati',
    category: 'vocabulary',
    title: 'Gujarati Common Greetings (શુભેચ્છાઓ)',
    description: 'Learn how to greet someone politely and engage in daily conversation in Gujarati.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=O1201h8hN5Q',
    videoTitle: 'Basic Gujarati Conversations & Greetings',
    content: [
      { nativeWord: 'નમસ્તે / કેમ છો', translatedWord: 'Hello / How are you', pronunciation: 'Namaste / Kem chho', explanation: '"Kem chho" is the iconic Gujarati way to ask "How are you?".' },
      { nativeWord: 'હું મજામાં છું', translatedWord: 'I am doing well', pronunciation: 'Hun majama chhun', explanation: 'Classic reply to "Kem chho".' },
      { nativeWord: 'આભાર', translatedWord: 'Thank you', pronunciation: 'Aabhar', explanation: 'Polite expression of gratitude.' },
      { nativeWord: 'આવજો', translatedWord: 'Goodbye', pronunciation: 'Aavjo', explanation: 'Literally means "Come again", used universally for goodbye.' }
    ],
    quiz: [
      { question: 'What is the most popular way to say "How are you" in Gujarati?', options: ['આભાર', 'આવજો', 'કેમ છો', 'હું મજામાં છું'], correctOption: 2 },
      { question: 'What does "આવજો" (Aavjo) literally translate to?', options: ['Goodbye / Come again', 'Thank you', 'How are you', 'Welcome'], correctOption: 0 },
      { question: 'How do you reply "I am doing well" in Gujarati?', options: ['હું મજામાં છું', 'આભાર', 'કેમ છો', 'નમસ્તે'], correctOption: 0 },
      { question: 'What is the word for "Thank you" in Gujarati?', options: ['આવજો', 'કેમ છો', 'આભાર', 'હું'], correctOption: 2 },
      { question: 'How do you say "Hello" in Gujarati?', options: ['કેમ છો', 'નમસ્તે', 'આવજો', 'આભાર'], correctOption: 1 }
    ]
  },
  {
    id: 'gujarati_grammar_verbs',
    language: 'gujarati',
    category: 'grammar',
    title: 'Gujarati Simple Sentences & Verbs (ગુજરાતી વાક્ય રચના)',
    description: 'Learn simple present and past sentence patterns in Gujarati.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'હું ખાઉં છું', translatedWord: 'I am eating', pronunciation: 'Hun khaun chhun', explanation: 'First person present continuous.' },
      { nativeWord: 'તે જાય છે', translatedWord: 'He / She goes', pronunciation: 'Te jaay chhe', explanation: 'Third person simple present.' },
      { nativeWord: 'તમે ક્યાં છો?', translatedWord: 'Where are you?', pronunciation: 'Tame kyaan chho?', explanation: 'Polite inquiry.' }
    ],
    quiz: [
      { question: 'What does "હું ખાઉં છું" mean in Gujarati?', options: ['I am eating', 'He is going', 'Where are you?', 'Thank you'], correctOption: 0 },
      { question: 'Which Gujarati word means "Where"?', options: ['ક્યાં (Kyaan)', 'કેમ (Kem)', 'હું (Hun)', 'તમે (Tame)'], correctOption: 0 },
      { question: 'How do you ask "Where are you?" in Gujarati?', options: ['તમે ક્યાં છો?', 'હું ખાઉં છું', 'કેમ છો', 'આવજો'], correctOption: 0 },
      { question: 'What verb ending marks "is / are" in Gujarati (e.g. જાય છે)?', options: ['છે (chhe)', 'છું (chhun)', 'છો (chho)', 'હતા'], correctOption: 0 },
      { question: 'What does "હું" mean in Gujarati?', options: ['I', 'You', 'He', 'They'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // MARWADI LESSONS (मारवाड़ी)
  // =========================================================================
  {
    id: 'marwadi_vocab_greetings',
    language: 'marwadi',
    category: 'vocabulary',
    title: 'Marwadi Traditional Greetings & Hospitality (राम राम सा)',
    description: 'Learn the warmth and respect of Rajasthan through local Marwadi greetings.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=x7E2pW2vA_U',
    videoTitle: 'Rajasthani Marwadi Phrases & Welcome Greetings',
    content: [
      { nativeWord: 'राम राम सा', translatedWord: 'Hello / Respectful Greetings', pronunciation: 'Ram Ram sa', explanation: 'The supreme formal greeting in Marwadi.' },
      { nativeWord: 'कैयां हो सा?', translatedWord: 'How are you? (Formal)', pronunciation: 'Kaiyaan ho sa?', explanation: 'Polite inquiry appended with "Sa" for respect.' },
      { nativeWord: 'मज्या में हूँ', translatedWord: 'I am doing great', pronunciation: 'Majya mein hoon', explanation: 'Friendly answer to "Kaiyaan ho sa?".' },
      { nativeWord: 'घणो कोड', translatedWord: 'Thank you very much', pronunciation: 'Ghano kod', explanation: 'Used to express deep gratitude.' },
      { nativeWord: 'पधारो सा', translatedWord: 'Please come / Welcome', pronunciation: 'Padharo sa', explanation: 'Signature Rajasthani welcome phrase.' }
    ],
    quiz: [
      { question: 'How do you say "Hello" respectfully in Marwadi?', options: ['घणो कोड', 'राम राम सा', 'मज्या में हूँ', 'पधारो सा'], correctOption: 1 },
      { question: 'What is the meaning of the warm Rajasthani welcome phrase "पधारो सा"?', options: ['Goodbye', 'Thank you', 'How are you', 'Welcome / Please come'], correctOption: 3 },
      { question: 'How do you ask "How are you?" in Marwadi?', options: ['कैयां हो सा?', 'राम राम सा', 'घणो कोड', 'पधारो सा'], correctOption: 0 },
      { question: 'What does "घणो कोड" mean in Marwadi?', options: ['Welcome', 'Thank you very much', 'How are you', 'Hello'], correctOption: 1 },
      { question: 'What suffix is added to words in Marwadi to show utmost respect?', options: ['जी', 'सा', 'जी नहीं', 'का'], correctOption: 1 }
    ]
  },
  {
    id: 'marwadi_numbers_1_to_5',
    language: 'marwadi',
    category: 'vocabulary',
    title: 'Marwadi Numbers 1 to 5 (गिनती)',
    description: 'Learn basic counting numbers in Marwadi for local bazaars.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'एक', translatedWord: 'One (1)', pronunciation: 'Ek', explanation: 'Number 1 in Marwadi.' },
      { nativeWord: 'दो', translatedWord: 'Two (2)', pronunciation: 'Do', explanation: 'Number 2 in Marwadi.' },
      { nativeWord: 'तीन', translatedWord: 'Three (3)', pronunciation: 'Teen', explanation: 'Number 3 in Marwadi.' },
      { nativeWord: 'चार', translatedWord: 'Four (4)', pronunciation: 'Chaar', explanation: 'Number 4 in Marwadi.' },
      { nativeWord: 'पांच', translatedWord: 'Five (5)', pronunciation: 'Paanch', explanation: 'Number 5 in Marwadi.' }
    ],
    quiz: [
      { question: 'What is "One" in Marwadi counting?', options: ['एक', 'दो', 'तीन', 'पांच'], correctOption: 0 },
      { question: 'What is "Two" in Marwadi?', options: ['एक', 'दो', 'चार', 'पांच'], correctOption: 1 },
      { question: 'What number is "पांच" (Paanch)?', options: ['1', '3', '5', '4'], correctOption: 2 },
      { question: 'What is "Three" in Marwadi?', options: ['तीन', 'दो', 'चार', 'पांच'], correctOption: 0 },
      { question: 'How do you say "Four" in Marwadi?', options: ['चार', 'पांच', 'एक', 'तीन'], correctOption: 0 }
    ]
  },
  {
    id: 'marwadi_market_vocab',
    language: 'marwadi',
    category: 'vocabulary',
    title: 'Marwadi Bazaar & Daily Conversation (बजार री बातां)',
    description: 'Essential phrases for shopping and interacting in Rajasthani markets.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'आं री के किमत है?', translatedWord: 'How much does this cost?', pronunciation: 'Aan ri ke kimat hai?', explanation: 'Inquiring about item cost.' },
      { nativeWord: 'घणो जोर रो', translatedWord: 'Very good / Excellent', pronunciation: 'Ghano jor ro', explanation: 'Praising quality or taste.' },
      { nativeWord: 'पाणी', translatedWord: 'Water', pronunciation: 'Paani', explanation: 'Essential word for drinking water.' }
    ],
    quiz: [
      { question: 'How do you ask "How much does this cost?" in Marwadi?', options: ['आं री के किमत है?', 'राम राम सा', 'घणो जोर रो', 'पधारो सा'], correctOption: 0 },
      { question: 'What does "घणो जोर रो" signify in Marwadi?', options: ['Very good / Excellent', 'Too expensive', 'Where is water?', 'Goodbye'], correctOption: 0 },
      { question: 'What is the Marwadi word for "Water"?', options: ['पाणी', 'दूध', 'रोटी', 'बजार'], correctOption: 0 },
      { question: 'Which word in Marwadi means "Price / Cost"?', options: ['किमत', 'पाणी', 'कोड', 'सा'], correctOption: 0 },
      { question: 'What does "घणो" mean in Marwadi expressions like "घणो कोड" or "घणो जोर"?', options: ['Much / Very', 'Little', 'No', 'Yesterday'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // TAMIL LESSONS (தமிழ்)
  // =========================================================================
  {
    id: 'tamil_alphabets_vowels',
    language: 'tamil',
    category: 'alphabets',
    title: 'Tamil Vowels & Sounds (உயிரெழுத்துக்கள்)',
    description: 'Learn basic phonetic sounds of Tamil letters that form the bedrock of words.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=0kby115Rof8',
    videoTitle: 'Tamil Alphabets Vowels (Uyireluthukkal)',
    content: [
      { nativeWord: 'அ', translatedWord: 'a', pronunciation: 'ah (short)', explanation: 'First Tamil vowel. Example: அம்மா (Amma - Mother).' },
      { nativeWord: 'ஆ', translatedWord: 'aa', pronunciation: 'aah (long)', explanation: 'Long vowel sound. Example: ஆடு (Aadu - Goat).' },
      { nativeWord: 'இ', translatedWord: 'i', pronunciation: 'ee (short)', explanation: 'Short "i". Example: இலை (Ilai - Leaf).' },
      { nativeWord: 'ஈ', translatedWord: 'ee', pronunciation: 'eee (long)', explanation: 'Long "i". Example: ஈட்டி (Eetti - Spear).' }
    ],
    quiz: [
      { question: 'Which Tamil vowel is used to write "அம்மா" (Amma - Mother)?', options: ['ஆ', 'அ', 'இ', 'ஈ'], correctOption: 1 },
      { question: 'What does "ஆடு" (Aadu) mean in English?', options: ['Leaf', 'Spear', 'Mother', 'Goat'], correctOption: 3 },
      { question: 'What is the Tamil word for "Leaf"?', options: ['இலை', 'ஆடு', 'அம்மா', 'ஈட்டி'], correctOption: 0 },
      { question: 'Which Tamil letter represents long "ee" sound as in "Spear" (ஈட்டி)?', options: ['அ', 'ஆ', 'இ', 'ஈ'], correctOption: 3 },
      { question: 'What does "அம்மா" mean in English?', options: ['Mother', 'Father', 'Sister', 'Friend'], correctOption: 0 }
    ]
  },
  {
    id: 'tamil_vocab_basics',
    language: 'tamil',
    category: 'vocabulary',
    title: 'Tamil Everyday Conversation (தமிழ் உரையாடல்)',
    description: 'Equip yourself with polite greetings and small talk in Tamil.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=i6lUsh394U4',
    videoTitle: 'Tamil Greeting & Everyday Vocabulary Basics',
    content: [
      { nativeWord: 'வணக்கம்', translatedWord: 'Hello / Respectful Greetings', pronunciation: 'Vanakkam', explanation: 'Universal respectful Tamil greeting.' },
      { nativeWord: 'எப்படி இருக்கிறீர்கள்?', translatedWord: 'How are you? (Formal)', pronunciation: 'Eppadi irukkireergal?', explanation: 'Polite way to ask how someone is doing.' },
      { nativeWord: 'நான் நலம்', translatedWord: 'I am fine', pronunciation: 'Naan nalam', explanation: 'Short response meaning "I am doing well".' },
      { nativeWord: 'நன்றி', translatedWord: 'Thank you', pronunciation: 'Nandri', explanation: 'Sincere expression of thanks.' },
      { nativeWord: 'போய் வருகிறேன்', translatedWord: 'Goodbye', pronunciation: 'Poi varugiren', explanation: 'Polite way to leave, meaning "I go and will return".' }
    ],
    quiz: [
      { question: 'How do you say "Thank you" in Tamil?', options: ['வணக்கம்', 'நன்றி', 'நான் நலம்', 'போய் வருகிறேன்'], correctOption: 1 },
      { question: 'What is the formal translation of "How are you" in Tamil?', options: ['எப்படி இருக்கிறீர்கள்?', 'நான் நலம்', 'நன்றி', 'வணக்கம்'], correctOption: 0 },
      { question: 'What is the universal Tamil greeting?', options: ['நன்றி', 'வணக்கம்', 'நலம்', 'போய்'], correctOption: 1 },
      { question: 'How do you reply "I am fine" in Tamil?', options: ['நான் நலம்', 'வணக்கம்', 'நன்றி', 'எப்படி'], correctOption: 0 },
      { question: 'What does "போய் வருகிறேன்" mean when taking leave?', options: ['Hello', 'Thank you', 'Goodbye', 'Welcome'], correctOption: 2 }
    ]
  },
  {
    id: 'tamil_grammar_verbs',
    language: 'tamil',
    category: 'grammar',
    title: 'Tamil Sentence Basics & Verbs (தமிழ் இலக்கணம்)',
    description: 'Learn basic subject-verb patterns in Tamil.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'நான் சாப்பிடுகிறேன்', translatedWord: 'I am eating', pronunciation: 'Naan saappidugiren', explanation: 'First person present tense.' },
      { nativeWord: 'அவன் போகிறான்', translatedWord: 'He is going', pronunciation: 'Avan pogiraan', explanation: 'Third person masculine.' },
      { nativeWord: 'எங்கே செல்கிறீர்கள்?', translatedWord: 'Where are you going?', pronunciation: 'Enge selgireergal?', explanation: 'Polite inquiry.' }
    ],
    quiz: [
      { question: 'What does "நான் சாப்பிடுகிறேன்" mean in Tamil?', options: ['I am eating', 'He is going', 'Where are you going?', 'Thank you'], correctOption: 0 },
      { question: 'What is the Tamil word for "Where"?', options: ['எங்கே (Enge)', 'யார் (Yaar)', 'என்ன (Enna)', 'ஏன் (Aen)'], correctOption: 0 },
      { question: 'What pronoun means "I" in Tamil?', options: ['நான் (Naan)', 'அவன் (Avan)', 'அவள் (Aval)', 'நீங்கள் (Neengal)'], correctOption: 0 },
      { question: 'How do you ask "Where are you going?" in Tamil?', options: ['எங்கே செல்கிறீர்கள்?', 'நான் சாப்பிடுகிறேன்', 'வணக்கம்', 'நன்றி'], correctOption: 0 },
      { question: 'What pronoun means "He" in Tamil?', options: ['அவன் (Avan)', 'நான் (Naan)', 'அவள் (Aval)', 'நாங்கள் (Naangal)'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // TELUGU LESSONS (తెలుగు)
  // =========================================================================
  {
    id: 'telugu_basics_greetings',
    language: 'telugu',
    category: 'vocabulary',
    title: 'Telugu Essential Greetings (తెలుగు వందనాలు)',
    description: 'Learn foundational greetings and everyday conversations in Telugu.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=0kYv9j0o2pE',
    videoTitle: 'Learn Telugu Basic Phrases & Conversation',
    content: [
      { nativeWord: 'నమస్కారం', translatedWord: 'Hello / Respectful Greetings', pronunciation: 'Namaskaram', explanation: 'Standard formal greeting in Telugu.' },
      { nativeWord: 'మీరు ఎలా ఉన్నారు?', translatedWord: 'How are you?', pronunciation: 'Meeru elaa unnaaru?', explanation: 'Polite inquiry about well-being.' },
      { nativeWord: 'నేను బాగున్నాను', translatedWord: 'I am doing well', pronunciation: 'Nenu baagunnaanu', explanation: 'Standard response meaning "I am fine / good".' },
      { nativeWord: 'ధన్యవాదాలు', translatedWord: 'Thank you', pronunciation: 'Dhanyavaadalu', explanation: 'Formal word for thanking someone.' }
    ],
    quiz: [
      { question: 'What does "నమస్కారం" (Namaskaram) mean in Telugu?', options: ['Goodbye', 'Hello / Greetings', 'Thank you', 'Yes'], correctOption: 1 },
      { question: 'How do you say "Thank you" in Telugu?', options: ['నమస్కారం', 'ధన్యవాదాలు', 'బాగున్నాను', 'శుభోదయం'], correctOption: 1 },
      { question: 'How do you ask "How are you?" in Telugu?', options: ['మీరు ఎలా ఉన్నారు?', 'నేను బాగున్నాను', 'ధన్యవాదాలు', 'నమస్కారం'], correctOption: 0 },
      { question: 'What is the Telugu reply for "I am doing well"?', options: ['నేను బాగున్నాను', 'నమస్కారం', 'ధన్యవాదాలు', 'ఎలా'], correctOption: 0 },
      { question: 'Which word expresses formal thanks in Telugu?', options: ['ధన్యవాదాలు', 'నమస్కారం', 'బాగున్నాను', 'మీరు'], correctOption: 0 }
    ]
  },
  {
    id: 'telugu_numbers_1_to_5',
    language: 'telugu',
    category: 'vocabulary',
    title: 'Telugu Numbers 1 to 5 (తెలుగు సంఖ్యలు)',
    description: 'Master basic counting numbers in Telugu for market shopping and travel.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'ఒకటి', translatedWord: 'One (1)', pronunciation: 'Okati', explanation: 'Number 1 in Telugu.' },
      { nativeWord: 'రెండు', translatedWord: 'Two (2)', pronunciation: 'Rendu', explanation: 'Number 2 in Telugu.' },
      { nativeWord: 'మూడు', translatedWord: 'Three (3)', pronunciation: 'Moodu', explanation: 'Number 3 in Telugu.' },
      { nativeWord: 'నాలుగు', translatedWord: 'Four (4)', pronunciation: 'Naalugu', explanation: 'Number 4 in Telugu.' },
      { nativeWord: 'ఐదు', translatedWord: 'Five (5)', pronunciation: 'Aidu', explanation: 'Number 5 in Telugu.' }
    ],
    quiz: [
      { question: 'What is the number "Two" in Telugu?', options: ['ఒకటి', 'రెండు', 'మూడు', 'ఐదు'], correctOption: 1 },
      { question: 'What is "One" in Telugu?', options: ['ఒకటి', 'రెండు', 'నాలుగు', 'ఐదు'], correctOption: 0 },
      { question: 'What number does "ఐదు" (Aidu) represent?', options: ['1', '3', '5', '4'], correctOption: 2 },
      { question: 'What is "Three" in Telugu?', options: ['మూడు', 'రెండు', 'నాలుగు', 'ఒకటి'], correctOption: 0 },
      { question: 'How do you say "Four" in Telugu?', options: ['నాలుగు', 'ఐదు', 'ఒకటి', 'మూడు'], correctOption: 0 }
    ]
  },
  {
    id: 'telugu_grammar_verbs',
    language: 'telugu',
    category: 'grammar',
    title: 'Telugu Verbs & Sentences (తెలుగు వాక్యాలు)',
    description: 'Learn fundamental sentence structures and verb usages in Telugu.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'నేను తింటున్నాను', translatedWord: 'I am eating', pronunciation: 'Nenu thintunnaanu', explanation: 'First person present continuous.' },
      { nativeWord: 'అతను వెళ్తున్నాడు', translatedWord: 'He is going', pronunciation: 'Atanu velthunnaadu', explanation: 'Third person masculine present continuous.' },
      { nativeWord: 'మీరు ఎక్కడికి వెళ్తున్నారు?', translatedWord: 'Where are you going?', pronunciation: 'Meeru ekkadiki velthunnaaru?', explanation: 'Polite inquiry.' }
    ],
    quiz: [
      { question: 'What does "నేను తింటున్నాను" mean in Telugu?', options: ['I am eating', 'He is going', 'Where are you going?', 'Thank you'], correctOption: 0 },
      { question: 'Which Telugu word means "Where"?', options: ['ఎక్కడికి (Ekkadiki)', 'ఎవరు (Evaru)', 'ఏమిటి (Emiti)', 'ఎప్పుడు (Eppudu)'], correctOption: 0 },
      { question: 'What pronoun means "I" in Telugu?', options: ['నేను (Nenu)', 'మీరు (Meeru)', 'అతను (Atanu)', 'ఆమె (Aame)'], correctOption: 0 },
      { question: 'How do you ask "Where are you going?" in Telugu?', options: ['మీరు ఎక్కడికి వెళ్తున్నారు?', 'నేను తింటున్నాను', 'నమస్కారం', 'ధన్యవాదాలు'], correctOption: 0 },
      { question: 'What pronoun means "You" (Polite / Plural) in Telugu?', options: ['మీరు (Meeru)', 'నేను (Nenu)', 'అతను (Atanu)', 'వాళ్ళు (Vaallu)'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // KANNADA LESSONS (ಕನ್ನಡ)
  // =========================================================================
  {
    id: 'kannada_basics_greetings',
    language: 'kannada',
    category: 'vocabulary',
    title: 'Kannada Core Expressions (ಕನ್ನಡ ಶುಭಾಶಯಗಳು)',
    description: 'Master polite Kannada phrases for everyday life and travel in Karnataka.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=0m48pC2cK-g',
    videoTitle: 'Learn Kannada Through English',
    content: [
      { nativeWord: 'ನಮಸ್ಕಾರ', translatedWord: 'Hello / Greetings', pronunciation: 'Namaskara', explanation: 'Universal respectful greeting in Kannada.' },
      { nativeWord: 'ನೀವು ಹೇಗಿದ್ದೀರ?', translatedWord: 'How are you?', pronunciation: 'Neevu hegiddeera?', explanation: 'Respectful way to ask how someone is doing.' },
      { nativeWord: 'ಚೆನ್ನಾಗಿದ್ದೇನೆ', translatedWord: 'I am fine', pronunciation: 'Chennaagiddeene', explanation: 'Common positive response.' },
      { nativeWord: 'ಧನ್ಯವಾದಗಳು', translatedWord: 'Thank you very much', pronunciation: 'Dhanyavaadagalu', explanation: 'Expressing gratitude in Kannada.' }
    ],
    quiz: [
      { question: 'Which Kannada phrase translates to "I am fine"?', options: ['ನಮಸ್ಕಾರ', 'ಚೆನ್ನಾಗಿದ್ದೇನೆ', 'ಧನ್ಯವಾದಗಳು', 'ಹೇಗಿದ್ದೀರ'], correctOption: 1 },
      { question: 'What is the Kannada word for "Thank you"?', options: ['ಧನ್ಯವಾದಗಳು', 'ನಮಸ್ಕಾರ', 'ಚೆನ್ನಾಗಿದ್ದೇನೆ', 'ನೀವು'], correctOption: 0 },
      { question: 'How do you greet someone with "Hello" in Kannada?', options: ['ನಮಸ್ಕಾರ', 'ಚೆನ್ನಾಗಿದ್ದೇನೆ', 'ಹೇಗಿದ್ದೀರ', 'ಧನ್ಯವಾದಗಳು'], correctOption: 0 },
      { question: 'How do you ask "How are you?" in Kannada?', options: ['ನೀವು ಹೇಗಿದ್ದೀರ?', 'ಚೆನ್ನಾಗಿದ್ದೇನೆ', 'ಧನ್ಯವಾದಗಳು', 'ನಮಸ್ಕಾರ'], correctOption: 0 },
      { question: 'What does "ಚೆನ್ನಾಗಿದ್ದೇನೆ" mean?', options: ['I am fine', 'Thank you', 'Hello', 'Goodbye'], correctOption: 0 }
    ]
  },
  {
    id: 'kannada_numbers_1_to_5',
    language: 'kannada',
    category: 'vocabulary',
    title: 'Kannada Counting 1 to 5 (ಕನ್ನಡ ಸಂಖ್ಯೆಗಳು)',
    description: 'Learn numbers 1-5 in Kannada for easy everyday transactions.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'ಒಂದು', translatedWord: 'One (1)', pronunciation: 'Ondu', explanation: 'Number 1 in Kannada.' },
      { nativeWord: 'ಎರಡು', translatedWord: 'Two (2)', pronunciation: 'Eradu', explanation: 'Number 2 in Kannada.' },
      { nativeWord: 'ಮೂರು', translatedWord: 'Three (3)', pronunciation: 'Mooru', explanation: 'Number 3 in Kannada.' },
      { nativeWord: 'ನಾಲ್ಕು', translatedWord: 'Four (4)', pronunciation: 'Naalku', explanation: 'Number 4 in Kannada.' },
      { nativeWord: 'ಐದು', translatedWord: 'Five (5)', pronunciation: 'Aidu', explanation: 'Number 5 in Kannada.' }
    ],
    quiz: [
      { question: 'What is "Ondu" in Kannada?', options: ['One (1)', 'Two (2)', 'Three (3)', 'Five (5)'], correctOption: 0 },
      { question: 'What is "Two" in Kannada?', options: ['ಒಂದು', 'ಎರಡು', 'ಮೂರು', 'ಐದು'], correctOption: 1 },
      { question: 'What number is "ಮೂರು" (Mooru)?', options: ['1', '2', '3', '4'], correctOption: 2 },
      { question: 'How do you say "Five" in Kannada?', options: ['ಐದು', 'ನಾಲ್ಕು', 'ಒಂದು', 'ಎರಡು'], correctOption: 0 },
      { question: 'What number is "ನಾಲ್ಕು" (Naalku)?', options: ['1', '4', '3', '5'], correctOption: 1 }
    ]
  },
  {
    id: 'kannada_grammar_basics',
    language: 'kannada',
    category: 'grammar',
    title: 'Kannada Sentence Structures (ಕನ್ನಡ ವ್ಯಾಕರಣ)',
    description: 'Master everyday sentence creation and present tense verbs in Kannada.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'nanu oota maaduttene', translatedWord: 'I am eating my meal', pronunciation: 'Naanu oota maaduttene', explanation: 'First person present tense.' },
      { nativeWord: 'neevu ellige hoguttira?', translatedWord: 'Where are you going?', pronunciation: 'Neevu ellige hoguttira?', explanation: 'Polite inquiry.' },
      { nativeWord: 'bega banni', translatedWord: 'Come quickly', pronunciation: 'Bega banni', explanation: 'Imperative request.' }
    ],
    quiz: [
      { question: 'What does "nanu oota maaduttene" mean in Kannada?', options: ['I am eating my meal', 'Where are you going?', 'Come quickly', 'Thank you'], correctOption: 0 },
      { question: 'What is the Kannada word for "Where"?', options: ['ellige', 'yaaru', 'yaake', 'yavaaga'], correctOption: 0 },
      { question: 'What pronoun means "I" in Kannada?', options: ['nanu', 'neevu', 'avanu', 'avalu'], correctOption: 0 },
      { question: 'How do you say "Come quickly" in Kannada?', options: ['bega banni', 'nanu oota', 'ellige hoguttira', 'namaskara'], correctOption: 0 },
      { question: 'What does "neevu" mean in Kannada?', options: ['You (polite)', 'I', 'He', 'They'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // BENGALI LESSONS (বাংলা)
  // =========================================================================
  {
    id: 'bengali_basics_greetings',
    language: 'bengali',
    category: 'vocabulary',
    title: 'Bengali Essentials (বাংলা বাক্যাংশ)',
    description: 'Learn friendly greetings and sweet expressions in Bengali.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=1uN3B20k5M0',
    videoTitle: 'Learn Bengali Greetings & Daily Phrases',
    content: [
      { nativeWord: 'নমস্কার / কাজাল্লা', translatedWord: 'Hello / Greetings', pronunciation: 'Nomoshkar', explanation: 'Polite and warm greeting used across Bengal.' },
      { nativeWord: 'আপনি কেমন আছেন?', translatedWord: 'How are you? (Formal)', pronunciation: 'Aapni kemon aachen?', explanation: 'Polite inquiry about health.' },
      { nativeWord: 'আমি ভালো আছি', translatedWord: 'I am good', pronunciation: 'Aami bhaalo aachi', explanation: 'Positive response meaning "I am fine".' },
      { nativeWord: 'ধন্যবাদ', translatedWord: 'Thank you', pronunciation: 'Dhonnobad', explanation: 'Word of thanks in Bengali.' }
    ],
    quiz: [
      { question: 'What is "Thank you" in Bengali?', options: ['নমস্কার', 'ধন্যবাদ', 'ভালো আছি', 'কেমন আছেন'], correctOption: 1 },
      { question: 'How do you ask "How are you?" in Bengali?', options: ['আপনি কেমন আছেন?', 'আমি ভালো আছি', 'ধন্যবাদ', 'নমস্কার'], correctOption: 0 },
      { question: 'How do you reply "I am good" in Bengali?', options: ['আমি ভালো আছি', 'নমস্কার', 'ধন্যবাদ', 'কেমন'], correctOption: 0 },
      { question: 'What is the standard Bengali greeting?', options: ['নমস্কার', 'ধন্যবাদ', 'ভালো', 'আছেন'], correctOption: 0 },
      { question: 'What does "ধন্যবাদ" mean?', options: ['Thank you', 'Hello', 'Goodbye', 'Yes'], correctOption: 0 }
    ]
  },
  {
    id: 'bengali_numbers_1_to_5',
    language: 'bengali',
    category: 'vocabulary',
    title: 'Bengali Numbers 1 to 5 (বাংলা সংখ্যা)',
    description: 'Learn Bengali numbers from 1 to 5 for counting items easily.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'এক', translatedWord: 'One (1)', pronunciation: 'Ek', explanation: 'Number 1 in Bengali.' },
      { nativeWord: 'দুই', translatedWord: 'Two (2)', pronunciation: 'Dui', explanation: 'Number 2 in Bengali.' },
      { nativeWord: 'তিন', translatedWord: 'Three (3)', pronunciation: 'Tin', explanation: 'Number 3 in Bengali.' },
      { nativeWord: 'চার', translatedWord: 'Four (4)', pronunciation: 'Chaar', explanation: 'Number 4 in Bengali.' },
      { nativeWord: 'পাঁচ', translatedWord: 'Five (5)', pronunciation: 'Paach', explanation: 'Number 5 in Bengali.' }
    ],
    quiz: [
      { question: 'What is "Two" in Bengali?', options: ['এক', 'দুই', 'তিন', 'পাঁচ'], correctOption: 1 },
      { question: 'What is "One" in Bengali?', options: ['এক', 'দুই', 'চার', 'পাঁচ'], correctOption: 0 },
      { question: 'What number is "তিন" (Tin)?', options: ['1', '2', '3', '5'], correctOption: 2 },
      { question: 'What number is "পাঁচ" (Paach)?', options: ['4', '5', '3', '1'], correctOption: 1 },
      { question: 'How do you write "Four" in Bengali?', options: ['চার', 'পাঁচ', 'তিন', 'এক'], correctOption: 0 }
    ]
  },
  {
    id: 'bengali_grammar_basics',
    language: 'bengali',
    category: 'grammar',
    title: 'Bengali Verbs & Daily Sentences (বাংলা ব্যাকরণ)',
    description: 'Learn simple verb conjugations and questions in Bengali.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'আমি খাচ্ছি', translatedWord: 'I am eating', pronunciation: 'Aami khaachhi', explanation: 'First person continuous.' },
      { nativeWord: 'সে যাচ্ছে', translatedWord: 'He / She is going', pronunciation: 'She jaachhe', explanation: 'Third person continuous.' },
      { nativeWord: 'আপনি কোথায় যাচ্ছেন?', translatedWord: 'Where are you going?', pronunciation: 'Aapni kothay jaachhen?', explanation: 'Polite inquiry.' }
    ],
    quiz: [
      { question: 'What does "আমি খাচ্ছি" mean in Bengali?', options: ['I am eating', 'He is going', 'Where are you going?', 'Thank you'], correctOption: 0 },
      { question: 'What is the Bengali word for "Where"?', options: ['কোথায় (Kothay)', 'কে (Ke)', 'কি (Ki)', 'কেন (Keno)'], correctOption: 0 },
      { question: 'What pronoun means "I" in Bengali?', options: ['আমি (Aami)', 'আপনি (Aapni)', 'সে (She)', 'আমরা (Aamra)'], correctOption: 0 },
      { question: 'How do you ask "Where are you going?" in Bengali?', options: ['আপনি কোথায় যাচ্ছেন?', 'আমি খাচ্ছি', 'নমস্কার', 'ধন্যবাদ'], correctOption: 0 },
      { question: 'What pronoun means "You" (Formal) in Bengali?', options: ['আপনি (Aapni)', 'আমি (Aami)', 'সে (She)', 'তুমি (Tumi)'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // PUNJABI LESSONS (ਪੰਜਾਬੀ)
  // =========================================================================
  {
    id: 'punjabi_basics_greetings',
    language: 'punjabi',
    category: 'vocabulary',
    title: 'Punjabi Culture & Greetings (ਪੰਜਾਬੀ ਬੋਲਚਾਲ)',
    description: 'Master energetic greetings and conversational phrases in Punjabi.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=4y5M3x2l9_I',
    videoTitle: 'Learn Basic Punjabi Language',
    content: [
      { nativeWord: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', translatedWord: 'Hello / God is Truth', pronunciation: 'Sat Shri Akaal', explanation: 'Traditional respectful Punjabi greeting.' },
      { nativeWord: 'ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?', translatedWord: 'How are you?', pronunciation: 'Tuhada ki haal hai?', explanation: 'Asking someone about their well-being.' },
      { nativeWord: 'ਮੈਂ ਠੀਕ ਹਾਂ', translatedWord: 'I am doing fine', pronunciation: 'Main theek haan', explanation: 'Replying that you are fine.' },
      { nativeWord: 'ਧੰਨਵਾਦ', translatedWord: 'Thank you', pronunciation: 'Dhanvaad', explanation: 'Word used to show appreciation.' }
    ],
    quiz: [
      { question: 'What is the standard respectful Punjabi greeting?', options: ['Sat Shri Akaal', 'Dhonnobad', 'Namaskaram', 'Chennaagiddeene'], correctOption: 0 },
      { question: 'How do you say "Thank you" in Punjabi?', options: ['ਧੰਨਵਾਦ (Dhanvaad)', 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', 'ਮੈਂ ਠੀਕ ਹਾਂ', 'ਕੀ ਹਾਲ'], correctOption: 0 },
      { question: 'How do you ask "How are you?" in Punjabi?', options: ['ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?', 'ਮੈਂ ਠੀਕ ਹਾਂ', 'ਧੰਨਵਾਦ', 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ'], correctOption: 0 },
      { question: 'What is the Punjabi reply for "I am doing fine"?', options: ['ਮੈਂ ਠੀਕ ਹਾਂ', 'ਧੰਨਵਾਦ', 'ਕੀ ਹਾਲ', 'ਅਕਾਲ'], correctOption: 0 },
      { question: 'What does "Sat Shri Akaal" literally mean?', options: ['God is Truth', 'Thank you', 'How are you', 'Welcome'], correctOption: 0 }
    ]
  },
  {
    id: 'punjabi_numbers_1_to_5',
    language: 'punjabi',
    category: 'vocabulary',
    title: 'Punjabi Numbers 1 to 5 (ਪੰਜਾਬੀ ਗਿਣਤੀ)',
    description: 'Master basic counting numbers in Punjabi.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'ਇੱਕ', translatedWord: 'One (1)', pronunciation: 'Ikk', explanation: 'Number 1 in Punjabi.' },
      { nativeWord: 'ਦੋ', translatedWord: 'Two (2)', pronunciation: 'Do', explanation: 'Number 2 in Punjabi.' },
      { nativeWord: 'ਤਿੰਨ', translatedWord: 'Three (3)', pronunciation: 'Tinn', explanation: 'Number 3 in Punjabi.' },
      { nativeWord: 'ਚਾਰ', translatedWord: 'Four (4)', pronunciation: 'Chaar', explanation: 'Number 4 in Punjabi.' },
      { nativeWord: 'ਪੰਜ', translatedWord: 'Five (5)', pronunciation: 'Panj', explanation: 'Number 5 in Punjabi.' }
    ],
    quiz: [
      { question: 'What is "Panj" (ਪੰਜ) in Punjabi?', options: ['One', 'Three', 'Five', 'Four'], correctOption: 2 },
      { question: 'What is "One" in Punjabi?', options: ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ', 'ਪੰਜ'], correctOption: 0 },
      { question: 'What number is "ਦੋ" (Do)?', options: ['1', '2', '3', '4'], correctOption: 1 },
      { question: 'What number is "ਤਿੰਨ" (Tinn)?', options: ['3', '2', '5', '4'], correctOption: 0 },
      { question: 'How do you say "Four" in Punjabi?', options: ['ਚਾਰ', 'ਪੰਜ', 'ਦੋ', 'ਇੱਕ'], correctOption: 0 }
    ]
  },
  {
    id: 'punjabi_grammar_basics',
    language: 'punjabi',
    category: 'grammar',
    title: 'Punjabi Sentence & Verb Patterns (ਪੰਜਾਬੀ ਵਾਕ)',
    description: 'Learn simple present and continuous sentence patterns in Punjabi.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'ਮੈਂ ਰੋਟੀ ਖਾ ਰਿਹਾ ਹਾਂ', translatedWord: 'I am eating food', pronunciation: 'Main roti khaa reha haan', explanation: 'First person continuous.' },
      { nativeWord: 'ਤੁਸੀਂ ਕਿੱਥੇ ਜਾ ਰਹੇ ਹੋ?', translatedWord: 'Where are you going?', pronunciation: 'Tusi kitthe jaa rahe ho?', explanation: 'Polite inquiry.' },
      { nativeWord: 'ਬਹੁਤ ਵਧੀਆ', translatedWord: 'Very good', pronunciation: 'Bahut vadhiya', explanation: 'Expressing praise.' }
    ],
    quiz: [
      { question: 'What does "ਮੈਂ ਰੋਟੀ ਖਾ ਰਿਹਾ ਹਾਂ" mean in Punjabi?', options: ['I am eating food', 'Where are you going?', 'Very good', 'Thank you'], correctOption: 0 },
      { question: 'What is the Punjabi word for "Where"?', options: ['ਕਿੱਥੇ (Kitthe)', 'ਕੌਣ (Kaun)', 'ਕੀ (Ki)', 'ਕਿਉਂ (Kyun)'], correctOption: 0 },
      { question: 'What phrase means "Very good" in Punjabi?', options: ['ਬਹੁਤ ਵਧੀਆ', 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', 'ਧੰਨਵਾਦ', 'ਮੈਂ ਠੀਕ ਹਾਂ'], correctOption: 0 },
      { question: 'How do you ask "Where are you going?" in Punjabi?', options: ['ਤੁਸੀਂ ਕਿੱਥੇ ਜਾ ਰਹੇ ਹੋ?', 'ਮੈਂ ਰੋਟੀ ਖਾ ਰਿਹਾ ਹਾਂ', 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', 'ਧੰਨਵਾਦ'], correctOption: 0 },
      { question: 'What pronoun means "You" (Respectful) in Punjabi?', options: ['ਤੁਸੀਂ (Tusi)', 'ਮੈਂ (Main)', 'ਓਹ (Oh)', 'ਅਸੀਂ (Asi)'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // MALAYALAM LESSONS (മലയാളം)
  // =========================================================================
  {
    id: 'malayalam_basics_greetings',
    language: 'malayalam',
    category: 'vocabulary',
    title: 'Malayalam Basics (മലയാളം അഭിവാദ്യങ്ങൾ)',
    description: 'Learn foundational greetings and common phrases in Malayalam.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=9jK8xM7v2_L',
    videoTitle: 'Learn Malayalam Language Basics',
    content: [
      { nativeWord: 'നമസ്കാരം', translatedWord: 'Hello / Respectful Greetings', pronunciation: 'Namaskaram', explanation: 'Standard greeting in Kerala.' },
      { nativeWord: 'സുഖമാണോ?', translatedWord: 'Are you fine / How are you?', pronunciation: 'Sukhamano?', explanation: 'Friendly way to ask "are you doing well?".' },
      { nativeWord: 'സുഖമാണ്', translatedWord: 'I am fine', pronunciation: 'Sukhamanu', explanation: 'Positive response to Sukhamano.' },
      { nativeWord: 'നന്ദി', translatedWord: 'Thank you', pronunciation: 'Nandi', explanation: 'Expressing thanks in Malayalam.' }
    ],
    quiz: [
      { question: 'What does "നന്ദി" (Nandi) mean in Malayalam?', options: ['Hello', 'Thank you', 'Goodbye', 'Yes'], correctOption: 1 },
      { question: 'What is the Malayalam greeting for "Hello"?', options: ['നമസ്കാരം', 'നന്ദി', 'സുഖമാണോ', 'സുഖമാണ്'], correctOption: 0 },
      { question: 'How do you ask "How are you?" in Malayalam?', options: ['സുഖമാണോ?', 'നന്ദി', 'നമസ്കാരം', 'സുഖമാണ്'], correctOption: 0 },
      { question: 'How do you reply "I am fine" in Malayalam?', options: ['സുഖമാണ്', 'നന്ദി', 'നമസ്കാരം', 'സുഖമാണോ'], correctOption: 0 },
      { question: 'Which word expresses gratitude in Malayalam?', options: ['നന്ദി', 'നമസ്കാരം', 'സുഖം', 'ആണ്'], correctOption: 0 }
    ]
  },
  {
    id: 'malayalam_numbers_1_to_5',
    language: 'malayalam',
    category: 'vocabulary',
    title: 'Malayalam Numbers 1 to 5 (മലയാളം അക്കങ്ങൾ)',
    description: 'Master basic counting numbers in Malayalam.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'ഒന്ന്', translatedWord: 'One (1)', pronunciation: 'Onnu', explanation: 'Number 1 in Malayalam.' },
      { nativeWord: 'രണ്ട്', translatedWord: 'Two (2)', pronunciation: 'Randu', explanation: 'Number 2 in Malayalam.' },
      { nativeWord: 'മൂന്ന്', translatedWord: 'Three (3)', pronunciation: 'Moonnu', explanation: 'Number 3 in Malayalam.' },
      { nativeWord: 'നാല്', translatedWord: 'Four (4)', pronunciation: 'Naalu', explanation: 'Number 4 in Malayalam.' },
      { nativeWord: 'അഞ്ച്', translatedWord: 'Five (5)', pronunciation: 'Anchu', explanation: 'Number 5 in Malayalam.' }
    ],
    quiz: [
      { question: 'What is "Onnu" (ഒന്ന്) in Malayalam?', options: ['One', 'Two', 'Three', 'Five'], correctOption: 0 },
      { question: 'What is "Two" in Malayalam?', options: ['ഒന്ന്', 'രണ്ട്', 'മൂന്ന്', 'അഞ്ച്'], correctOption: 1 },
      { question: 'What number is "മൂന്ന്" (Moonnu)?', options: ['1', '2', '3', '4'], correctOption: 2 },
      { question: 'What number is "അഞ്ച്" (Anchu)?', options: ['5', '4', '3', '2'], correctOption: 0 },
      { question: 'How do you say "Four" in Malayalam?', options: ['നാല്', 'അഞ്ച്', 'രണ്ട്', 'ഒന്ന്'], correctOption: 0 }
    ]
  },
  {
    id: 'malayalam_grammar_basics',
    language: 'malayalam',
    category: 'grammar',
    title: 'Malayalam Sentence Basics (മലയാളം വാചകങ്ങൾ)',
    description: 'Learn simple verb sentences and questions in Malayalam.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'ഞാൻ കഴിക്കുന്നു', translatedWord: 'I am eating', pronunciation: 'Njaan kazhikkunnu', explanation: 'First person present continuous.' },
      { nativeWord: 'നിങ്ങൾ എവിടെ പോകുന്നു?', translatedWord: 'Where are you going?', pronunciation: 'Ningal evide pokunnu?', explanation: 'Polite inquiry.' },
      { nativeWord: 'വളരെ നല്ലത്', translatedWord: 'Very good', pronunciation: 'Valare nallathu', explanation: 'Expressing praise.' }
    ],
    quiz: [
      { question: 'What does "ഞാൻ കഴിക്കുന്നു" mean in Malayalam?', options: ['I am eating', 'Where are you going?', 'Very good', 'Thank you'], correctOption: 0 },
      { question: 'What is the Malayalam word for "Where"?', options: ['എവിടെ (Evide)', 'ആര് (Aaru)', 'എന്ത് (Enthu)', 'എന്തുകൊണ്ട് (Enthukondu)'], correctOption: 0 },
      { question: 'What pronoun means "I" in Malayalam?', options: ['ഞാൻ (Njaan)', 'നിങ്ങൾ (Ningal)', 'അവൻ (Avan)', 'അവൾ (Aval)'], correctOption: 0 },
      { question: 'How do you ask "Where are you going?" in Malayalam?', options: ['നിങ്ങൾ എവിടെ പോകുന്നു?', 'ഞാൻ കഴിക്കുന്നു', 'നമസ്കാരം', 'നന്ദി'], correctOption: 0 },
      { question: 'What does "വളരെ നല്ലത്" mean?', options: ['Very good', 'Where is water?', 'Hello', 'Goodbye'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // SPANISH LESSONS (Español)
  // =========================================================================
  {
    id: 'spanish_basics_greetings',
    language: 'spanish',
    category: 'vocabulary',
    title: 'Spanish Fundamentals (Saludos Básicos)',
    description: 'Learn essential Spanish greetings, polite responses, and basic vocabulary.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=k8v2e3L4_kE',
    videoTitle: 'Spanish Greetings & Basic Phrases',
    content: [
      { nativeWord: '¡Hola!', translatedWord: 'Hello / Hi', pronunciation: 'oh-lah', explanation: 'Common informal and formal greeting.' },
      { nativeWord: '¿Cómo estás?', translatedWord: 'How are you?', pronunciation: 'koh-moh ehs-tahs', explanation: 'Asking a friend how they are.' },
      { nativeWord: 'Estoy bien, gracias', translatedWord: 'I am fine, thank you', pronunciation: 'ehs-toy byehn grah-syahs', explanation: 'Standard reply to how are you.' },
      { nativeWord: 'Muchas gracias', translatedWord: 'Thank you very much', pronunciation: 'moo-chas grah-syahs', explanation: 'Expression of gratitude.' },
      { nativeWord: 'Hasta luego', translatedWord: 'See you later / Goodbye', pronunciation: 'ahs-tah lweh-goh', explanation: 'Common friendly farewell.' }
    ],
    quiz: [
      { question: 'How do you say "Thank you very much" in Spanish?', options: ['¡Hola!', '¿Cómo estás?', 'Muchas gracias', 'Hasta luego'], correctOption: 2 },
      { question: 'What does "¡Hola!" mean in English?', options: ['Goodbye', 'Hello / Hi', 'Thank you', 'Please'], correctOption: 1 },
      { question: 'How do you ask "How are you?" in Spanish?', options: ['¿Cómo estás?', '¡Hola!', 'Muchas gracias', 'Hasta luego'], correctOption: 0 },
      { question: 'What does "Hasta luego" translate to?', options: ['Hello', 'See you later / Goodbye', 'Thank you', 'Yes'], correctOption: 1 },
      { question: 'How do you reply "I am fine, thank you" in Spanish?', options: ['Estoy bien, gracias', '¡Hola!', 'Hasta luego', 'Por favor'], correctOption: 0 }
    ]
  },
  {
    id: 'spanish_numbers_1_to_5',
    language: 'spanish',
    category: 'vocabulary',
    title: 'Spanish Numbers 1 to 5 (Números 1 al 5)',
    description: 'Learn Spanish numbers 1 through 5 for quick shopping and travel.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'Uno', translatedWord: 'One (1)', pronunciation: 'oo-noh', explanation: 'Number 1 in Spanish.' },
      { nativeWord: 'Dos', translatedWord: 'Two (2)', pronunciation: 'dohs', explanation: 'Number 2 in Spanish.' },
      { nativeWord: 'Tres', translatedWord: 'Three (3)', pronunciation: 'trehs', explanation: 'Number 3 in Spanish.' },
      { nativeWord: 'Cuatro', translatedWord: 'Four (4)', pronunciation: 'kwah-troh', explanation: 'Number 4 in Spanish.' },
      { nativeWord: 'Cinco', translatedWord: 'Five (5)', pronunciation: 'seen-koh', explanation: 'Number 5 in Spanish.' }
    ],
    quiz: [
      { question: 'What is the number 3 in Spanish?', options: ['Uno', 'Dos', 'Tres', 'Cinco'], correctOption: 2 },
      { question: 'What is the number 1 in Spanish?', options: ['Uno', 'Dos', 'Cuatro', 'Cinco'], correctOption: 0 },
      { question: 'What is "Five" in Spanish?', options: ['Cinco', 'Cuatro', 'Tres', 'Dos'], correctOption: 0 },
      { question: 'What number is "Dos"?', options: ['1', '2', '3', '4'], correctOption: 1 },
      { question: 'What number is "Cuatro"?', options: ['4', '5', '3', '2'], correctOption: 0 }
    ]
  },
  {
    id: 'spanish_grammar_basics',
    language: 'spanish',
    category: 'grammar',
    title: 'Spanish Verbs & Phrases (Gramática Básica)',
    description: 'Learn basic subject pronouns and common present tense verbs in Spanish.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'Yo como', translatedWord: 'I eat', pronunciation: 'yoh koh-moh', explanation: 'First person singular verb.' },
      { nativeWord: '¿Dónde está el baño?', translatedWord: 'Where is the bathroom?', pronunciation: 'dohn-deh ehs-tah el bah-nyoh', explanation: 'Essential travel question.' },
      { nativeWord: 'Me gusta la comida', translatedWord: 'I like the food', pronunciation: 'meh goos-tah lah koh-mee-dah', explanation: 'Expressing preference.' }
    ],
    quiz: [
      { question: 'What does "Yo como" mean in Spanish?', options: ['I eat', 'Where is the bathroom?', 'I like food', 'Thank you'], correctOption: 0 },
      { question: 'How do you ask "Where is the bathroom?" in Spanish?', options: ['¿Dónde está el baño?', '¿Cómo estás?', 'Me gusta la comida', 'Hasta luego'], correctOption: 0 },
      { question: 'What pronoun means "I" in Spanish?', options: ['Yo', 'Tú', 'Él', 'Nosotros'], correctOption: 0 },
      { question: 'How do you say "I like the food" in Spanish?', options: ['Me gusta la comida', 'Yo como', '¡Hola!', 'Gracias'], correctOption: 0 },
      { question: 'Which Spanish word means "Where"?', options: ['¿Dónde?', '¿Cómo?', '¿Qué?', '¿Quién?'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // FRENCH LESSONS (Français)
  // =========================================================================
  {
    id: 'french_basics_greetings',
    language: 'french',
    category: 'vocabulary',
    title: 'French Essentials (Salutations)',
    description: 'Master polite French greetings, manners, and everyday travel expressions.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=hdD_3C7u134',
    videoTitle: 'Basic French Greetings & Phrases',
    content: [
      { nativeWord: 'Bonjour', translatedWord: 'Hello / Good morning', pronunciation: 'bon-zhoor', explanation: 'Standard polite greeting.' },
      { nativeWord: 'Comment allez-vous?', translatedWord: 'How are you? (Formal)', pronunciation: 'koh-mahn tah-lay voo', explanation: 'Polite inquiry.' },
      { nativeWord: 'Je vais bien, merci', translatedWord: 'I am doing well, thank you', pronunciation: 'zhuh vay byan mair-see', explanation: 'Standard polite reply.' },
      { nativeWord: 'Merci beaucoup', translatedWord: 'Thank you very much', pronunciation: 'mair-see boh-koo', explanation: 'Gracious expression of thanks.' },
      { nativeWord: 'Au revoir', translatedWord: 'Goodbye', pronunciation: 'oh ruh-vwahr', explanation: 'Standard goodbye.' }
    ],
    quiz: [
      { question: 'What is the formal French phrase for "How are you?"', options: ['Bonjour', 'Comment allez-vous?', 'Merci beaucoup', 'Au revoir'], correctOption: 1 },
      { question: 'How do you say "Hello" in French?', options: ['Bonjour', 'Merci', 'Au revoir', 'Oui'], correctOption: 0 },
      { question: 'What does "Merci beaucoup" mean?', options: ['Hello', 'Thank you very much', 'Goodbye', 'Please'], correctOption: 1 },
      { question: 'How do you say "Goodbye" in French?', options: ['Au revoir', 'Bonjour', 'Merci', 'Oui'], correctOption: 0 },
      { question: 'How do you reply "I am doing well, thank you" in French?', options: ['Je vais bien, merci', 'Bonjour', 'Au revoir', 'Non'], correctOption: 0 }
    ]
  },
  {
    id: 'french_numbers_1_to_5',
    language: 'french',
    category: 'vocabulary',
    title: 'French Numbers 1 to 5 (Les Chiffres)',
    description: 'Master basic counting numbers in French.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'Un', translatedWord: 'One (1)', pronunciation: 'uhn', explanation: 'Number 1 in French.' },
      { nativeWord: 'Deux', translatedWord: 'Two (2)', pronunciation: 'duh', explanation: 'Number 2 in French.' },
      { nativeWord: 'Trois', translatedWord: 'Three (3)', pronunciation: 'twah', explanation: 'Number 3 in French.' },
      { nativeWord: 'Quatre', translatedWord: 'Four (4)', pronunciation: 'kat-ruh', explanation: 'Number 4 in French.' },
      { nativeWord: 'Cinq', translatedWord: 'Five (5)', pronunciation: 'sank', explanation: 'Number 5 in French.' }
    ],
    quiz: [
      { question: 'What does "Trois" mean in French?', options: ['One', 'Two', 'Three', 'Five'], correctOption: 2 },
      { question: 'What is "One" in French?', options: ['Un', 'Deux', 'Trois', 'Cinq'], correctOption: 0 },
      { question: 'What number is "Cinq"?', options: ['5', '4', '3', '2'], correctOption: 0 },
      { question: 'What number is "Deux"?', options: ['1', '2', '3', '4'], correctOption: 1 },
      { question: 'How do you write "Four" in French?', options: ['Quatre', 'Cinq', 'Trois', 'Deux'], correctOption: 0 }
    ]
  },
  {
    id: 'french_grammar_basics',
    language: 'french',
    category: 'grammar',
    title: 'French Verbs & Sentences (Grammaire De Base)',
    description: 'Learn basic subject pronouns and common present tense verbs in French.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'Je mange', translatedWord: 'I am eating', pronunciation: 'zhuh mahnzh', explanation: 'First person singular.' },
      { nativeWord: 'Où sont les toilettes?', translatedWord: 'Where are the restrooms?', pronunciation: 'oo son lay twah-let', explanation: 'Common travel question.' },
      { nativeWord: 'S\'il vous plaît', translatedWord: 'Please (Formal)', pronunciation: 'seel voo play', explanation: 'Polite expression.' }
    ],
    quiz: [
      { question: 'What does "Je mange" mean in French?', options: ['I am eating', 'Where are the restrooms?', 'Please', 'Thank you'], correctOption: 0 },
      { question: 'How do you ask "Where are the restrooms?" in French?', options: ['Où sont les toilettes?', 'Comment allez-vous?', 'S\'il vous plaît', 'Bonjour'], correctOption: 0 },
      { question: 'What pronoun means "I" in French?', options: ['Je', 'Tu', 'Il', 'Nous'], correctOption: 0 },
      { question: 'What does "S\'il vous plaît" mean?', options: ['Please', 'Thank you', 'Goodbye', 'Hello'], correctOption: 0 },
      { question: 'Which French word means "Where"?', options: ['Où', 'Quand', 'Pourquoi', 'Comment'], correctOption: 0 }
    ]
  },

  // =========================================================================
  // GERMAN LESSONS (Deutsch)
  // =========================================================================
  {
    id: 'german_basics_greetings',
    language: 'german',
    category: 'vocabulary',
    title: 'German Greetings (Grundlegende Begrüßungen)',
    description: 'Learn everyday German greetings, courtesies, and simple sentences.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    videoUrl: 'https://www.youtube.com/watch?v=m4Y3E1a6yC0',
    videoTitle: 'Learn German Greetings & Essentials',
    content: [
      { nativeWord: 'Guten Tag', translatedWord: 'Good day / Hello', pronunciation: 'goo-ten tahk', explanation: 'Standard daytime greeting.' },
      { nativeWord: 'Wie geht es Ihnen?', translatedWord: 'How are you? (Formal)', pronunciation: 'vee gayt es ee-nen', explanation: 'Polite question.' },
      { nativeWord: 'Mir geht es gut, danke', translatedWord: 'I am doing well, thank you', pronunciation: 'meer gayt es goot dahn-ke', explanation: 'Standard polite answer.' },
      { nativeWord: 'Vielen Dank', translatedWord: 'Thank you very much', pronunciation: 'fee-len dahnk', explanation: 'Formal expression of thanks.' },
      { nativeWord: 'Auf Wiedersehen', translatedWord: 'Goodbye', pronunciation: 'owf vee-der-zayn', explanation: 'Traditional polite farewell.' }
    ],
    quiz: [
      { question: 'What does "Vielen Dank" mean in German?', options: ['Good day', 'Goodbye', 'Thank you very much', 'How are you?'], correctOption: 2 },
      { question: 'How do you say "Hello / Good day" in German?', options: ['Guten Tag', 'Auf Wiedersehen', 'Vielen Dank', 'Nein'], correctOption: 0 },
      { question: 'What is the formal German question for "How are you?"', options: ['Wie geht es Ihnen?', 'Guten Tag', 'Vielen Dank', 'Auf Wiedersehen'], correctOption: 0 },
      { question: 'How do you say "Goodbye" in German?', options: ['Auf Wiedersehen', 'Guten Tag', 'Vielen Dank', 'Ja'], correctOption: 0 },
      { question: 'How do you reply "I am doing well, thank you" in German?', options: ['Mir geht es gut, danke', 'Guten Tag', 'Auf Wiedersehen', 'Danke'], correctOption: 0 }
    ]
  },
  {
    id: 'german_numbers_1_to_5',
    language: 'german',
    category: 'vocabulary',
    title: 'German Numbers 1 to 5 (Zahlen 1 bis 5)',
    description: 'Learn how to count from 1 to 5 in German.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'Eins', translatedWord: 'One (1)', pronunciation: 'eyens', explanation: 'Number 1 in German.' },
      { nativeWord: 'Zwei', translatedWord: 'Two (2)', pronunciation: 'tsvay', explanation: 'Number 2 in German.' },
      { nativeWord: 'Drei', translatedWord: 'Three (3)', pronunciation: 'dray', explanation: 'Number 3 in German.' },
      { nativeWord: 'Vier', translatedWord: 'Four (4)', pronunciation: 'feer', explanation: 'Number 4 in German.' },
      { nativeWord: 'Fünf', translatedWord: 'Five (5)', pronunciation: 'fuhnff', explanation: 'Number 5 in German.' }
    ],
    quiz: [
      { question: 'What is "Zwei" in German?', options: ['One', 'Two', 'Four', 'Five'], correctOption: 1 },
      { question: 'What is "One" in German?', options: ['Eins', 'Zwei', 'Drei', 'Fünf'], correctOption: 0 },
      { question: 'What number is "Fünf"?', options: ['5', '4', '3', '1'], correctOption: 0 },
      { question: 'What number is "Drei"?', options: ['3', '2', '1', '4'], correctOption: 0 },
      { question: 'How do you say "Four" in German?', options: ['Vier', 'Fünf', 'Zwei', 'Eins'], correctOption: 0 }
    ]
  },
  {
    id: 'german_grammar_basics',
    language: 'german',
    category: 'grammar',
    title: 'German Verbs & Sentence Basics (Grundgrammatik)',
    description: 'Learn subject pronouns and common present tense verbs in German.',
    difficulty: 'beginner',
    createdAt: new Date().toISOString(),
    content: [
      { nativeWord: 'Ich esse', translatedWord: 'I am eating', pronunciation: 'ikh es-se', explanation: 'First person singular.' },
      { nativeWord: 'Wo ist die Toilette?', translatedWord: 'Where is the restroom?', pronunciation: 'voh ist dee toy-let-te', explanation: 'Common travel phrase.' },
      { nativeWord: 'Bitte sehr', translatedWord: 'You are welcome / Please', pronunciation: 'bit-te zayr', explanation: 'Polite response.' }
    ],
    quiz: [
      { question: 'What does "Ich esse" mean in German?', options: ['I am eating', 'Where is the restroom?', 'You are welcome', 'Goodbye'], correctOption: 0 },
      { question: 'How do you ask "Where is the restroom?" in German?', options: ['Wo ist die Toilette?', 'Wie geht es Ihnen?', 'Guten Tag', 'Bitte sehr'], correctOption: 0 },
      { question: 'What pronoun means "I" in German?', options: ['Ich', 'Du', 'Er', 'Wir'], correctOption: 0 },
      { question: 'What phrase means "You are welcome" in German?', options: ['Bitte sehr', 'Vielen Dank', 'Guten Tag', 'Tschüss'], correctOption: 0 },
      { question: 'Which German word means "Where"?', options: ['Wo', 'Wann', 'Warum', 'Wie'], correctOption: 0 }
    ]
  }
];
