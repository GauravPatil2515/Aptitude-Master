/**
 * data/aptitude/verbal-ability.js — Verbal Ability Chapter
 */
export default {
  id: 'aptitude-verbal-ability',
  subject: 'aptitude',
  title: 'Verbal Ability',
  icon: '🗣️',
  difficulty: 'medium',
  estimatedTime: 45,
  prerequisites: [],

  notes: `
## Reading Comprehension (RC)

**Strategy:**
1. Read the question first (know what to look for)
2. Skim the passage for main idea
3. Locate specific details for each question
4. Eliminate wrong options

> 💡 Don't read the passage first — read questions first to save time.

---

## Synonyms & Antonyms

**Commonly tested words:**

| Word | Synonym | Antonym |
|------|---------|---------|
| Abandon | Forsake | Retain |
| Benevolent | Kind | Malevolent |
| Candid | Honest | Deceitful |
| Diligent | Hardworking | Lazy |
| Eloquent | Articulate | Inarticulate |

---

## Sentence Correction

**Common errors:**
- **Subject-verb agreement:** "The list of items **is** long" (not "are")
- **Pronoun agreement:** "Everyone should bring **his or her** book"
- **Parallelism:** "She likes **swimming**, **running**, and **cycling**" (all -ing)
- **Dangling modifier:** "Walking to school, **the rain** started" → wrong!

---

## Fill in the Blanks

**Tips:**
1. Read the entire sentence first
2. Look for context clues
3. Check grammar (tense, preposition)
4. Eliminate obviously wrong options

> 💡 "The committee _____ divided in their opinion." → **was** (collective noun, singular)

---

## Para Jumbles

**Strategy:**
1. Find the **opening sentence** (introductory, no pronouns referring back)
2. Look for **mandatory pairs** (sentences that must be together)
3. Find the **closing sentence** (concluding remark)
4. Eliminate options

---

## Vocabulary Roots

**Common Latin/Greek roots:**

| Root | Meaning | Examples |
|------|---------|----------|
| bene | good | benefit, benevolent |
| mal | bad | malicious, malevolent |
| aqua | water | aquatic, aquarium |
| aud | hear | audience, audio |
| scrib | write | describe, manuscript |
| port | carry | transport, export |
| dict | say | predict, dictate |

> 💡 Knowing roots helps guess meanings of unfamiliar words!
  `,

  formulas: [
    { name: 'RC Strategy',      formula: 'Questions → Passage → Details',     example: 'Read Q first, then find answers' },
    { name: 'S-V Agreement',    formula: 'Singular subject → singular verb',  example: 'The list IS (not ARE)' },
    { name: 'Parallelism',      formula: 'Same grammatical form in lists',    example: 'swimming, running, cycling' },
    { name: 'Para jumble',      formula: 'Opening → Pairs → Closing',        example: 'Find first & last, then pairs' },
    { name: 'Root words',       formula: 'bene=good, mal=bad, aud=hear',     example: 'benevolent = kind' },
  ],

  shortcuts: [
    'RC: Read questions first, then scan passage for answers',
    'Sentence correction: check subject-verb agreement first',
    'Para jumbles: find the opener (no backward references) and closer',
    'Vocabulary: learn roots — bene, mal, aud, scrib, port, dict',
    'Elimination is faster than finding the right answer directly',
  ],

  questions: [
    {
      id: 'va-q1',
      text: 'Choose the synonym of BENEVOLENT:',
      options: ['Cruel', 'Kind', 'Indifferent', 'Hostile'],
      answer: 1,
      explanation: 'Benevolent means kind, generous, well-meaning.',
      hint: 'Think of "bene" = good',
      difficulty: 'easy',
      tags: ['synonym'],
      timeLimit: 30,
    },
    {
      id: 'va-q2',
      text: 'Choose the antonym of CANDID:',
      options: ['Honest', 'Frank', 'Deceitful', 'Open'],
      answer: 2,
      explanation: 'Candid means honest and open. The opposite is deceitful.',
      hint: 'Candid = honest, truthful. What\'s the opposite?',
      difficulty: 'easy',
      tags: ['antonym'],
      timeLimit: 30,
    },
    {
      id: 'va-q3',
      text: 'Select the correct option: "The team _____ celebrating their victory."',
      options: ['is', 'are', 'were', 'have'],
      answer: 0,
      explanation: 'Team is a collective noun and takes a singular verb: "is"',
      hint: 'Collective nouns (team, group, committee) usually take singular verbs',
      difficulty: 'easy',
      tags: ['grammar', 'sv-agreement'],
      timeLimit: 45,
    },
    {
      id: 'va-q4',
      text: 'Find the error: "Walking through the park, the flowers were beautiful."',
      options: ['Walking through', 'the park', 'the flowers were', 'No error'],
      answer: 0,
      explanation: 'Dangling modifier: "Walking through the park" should modify a person, not flowers. Who was walking?',
      hint: 'Who was walking? The modifier doesn\'t match the subject',
      difficulty: 'medium',
      tags: ['grammar', 'dangling'],
      timeLimit: 60,
    },
    {
      id: 'va-q5',
      text: 'Choose the word that best completes: "The speaker was so _____ that the audience listened in silence."',
      options: ['eloquent', 'silent', 'boring', 'confused'],
      answer: 0,
      explanation: 'Eloquent means fluent and persuasive in speaking — it would captivate an audience.',
      hint: 'What kind of speaker would make an audience listen in silence?',
      difficulty: 'easy',
      tags: ['fill-blank'],
      timeLimit: 45,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student prepare for Verbal Ability in placement exams. Focus on RC strategy, grammar rules (subject-verb agreement, parallelism, dangling modifiers), vocabulary roots, and para jumble techniques. Keep answers concise.',
};
