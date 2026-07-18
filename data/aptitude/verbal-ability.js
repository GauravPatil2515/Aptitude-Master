/**
 * data/aptitude/verbal-ability.js — Verbal Ability Chapter
 */
export default {
  id: 'aptitude-verbal-ability',
  subject: 'aptitude',
  title: 'Verbal Ability',
  
  difficulty: 'medium',
  estimatedTime: 45,
  prerequisites: [],

  notes: `
## Reading Comprehension (RC)

**Strategy:**
1. Read the questions first (know what to look for).
2. Skim the passage for the main idea.
3. Locate specific details for each question.
4. Eliminate wrong options.

> Don't read the passage first — read questions first to save time.

---

## Placement Shortcut Table
| Signal Word | Meaning |
|---|---|
| Therefore | Conclusion |
| Thus | Conclusion |
| Hence | Conclusion |
| Consequently | Result |
| However | Contrast |
| Moreover | Addition |
| For example | Illustration |

## Quick Solving Strategy
- **Step 1:** Find the opening sentence (independent, introductory).
- **Step 2:** Find mandatory pairs (pronoun references, chronologies).
- **Step 3:** Find cause-effect links.
- **Step 4:** Find the conclusion sentence.
- **Step 5:** Check logical flow.

---

## Part 1: Synonyms
A synonym is a word that has the same or nearly the same meaning as another word.

### Common Placement Synonyms
| Word | Synonym |
|---|---|
| Abandon | Leave / Forsake |
| Ability | Skill |
| Accurate | Correct |
| Brave | Courageous |
| Calm | Peaceful |
| Danger | Risk |
| Easy | Simple |
| Famous | Renowned |
| Honest | Truthful |
| Improve | Enhance |
| Intelligent | Smart |
| Large | Huge |
| Quick | Rapid |
| Rich | Wealthy |
| Strong | Powerful |

---

## Part 2: Antonyms
An antonym is a word opposite in meaning to another.

### Common Placement Antonyms
| Word | Antonym |
|---|---|
| Accept | Reject |
| Ancient | Modern |
| Brave | Cowardly |
| Cheap | Expensive |
| Expand | Contract |
| Increase | Decrease |
| Honest | Dishonest |
| Optimistic | Pessimistic |
| Strong | Weak |
| Victory | Defeat |

---

## Part 3: One-Word Substitution
Replacing a phrase with a single word to make sentence structures simpler and clearer.

| Phrase | Word |
|---|---|
| One who writes books | Author |
| One who teaches | Teacher |
| One who flies aircraft | Pilot |
| One who paints | Artist |
| One who studies stars | Astronomer |
| One who cannot read | Illiterate |
| One who knows many languages | Linguist |

---

## Part 4: Idioms & Phrases
Phrases whose meaning cannot be directly understood from the literal words.

- **Break the ice:** Start a conversation.
- **Once in a blue moon:** Rarely.
- **Hit the nail on the head:** Exactly correct.
- **Under the weather:** Sick / Not feeling well.

---

## Part 5: Common Confusing Words
### Affect vs Effect
- **Affect (Verb):** To influence or produce a change.
  - *Example:* The rain affected the traffic.
- **Effect (Noun):** The result or outcome of a change.
  - *Example:* The new policy had a positive effect.

---

## Part 6: Connectors & Transition Words
| Type | Connectors |
|---|---|
| **Addition** | and, also, moreover, furthermore |
| **Contrast** | but, however, although, yet |
| **Reason** | because, since, as |
| **Result** | therefore, thus, hence, consequently |
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
      text: 'Choose the synonym of Brave:',
      options: ['Weak', 'Courageous', 'Lazy', 'Angry'],
      answer: 1,
      explanation: 'Brave and Courageous have the same meaning.',
      hint: 'Ready to face danger or pain.',
      difficulty: 'easy',
      tags: ['synonym'],
      timeLimit: 30,
    },
    {
      id: 'va-q2',
      text: 'Choose the synonym of Rapid:',
      options: ['Slow', 'Fast', 'Quiet', 'Small'],
      answer: 1,
      explanation: 'Rapid means moving or acting with great speed; Fast.',
      hint: 'Speedy.',
      difficulty: 'easy',
      tags: ['synonym'],
      timeLimit: 30,
    },
    {
      id: 'va-q3',
      text: 'Choose the antonym of Expand:',
      options: ['Grow', 'Extend', 'Contract', 'Increase'],
      answer: 2,
      explanation: 'Expand means to become larger. The opposite is Contract, which means to become smaller.',
      hint: 'Opposite of growing larger.',
      difficulty: 'easy',
      tags: ['antonym'],
      timeLimit: 30,
    },
    {
      id: 'va-q4',
      text: 'Choose the antonym of Optimistic:',
      options: ['Positive', 'Hopeful', 'Pessimistic', 'Confident'],
      answer: 2,
      explanation: 'Optimistic means hopeful and confident about the future. The opposite is Pessimistic.',
      hint: 'Seeing the worst aspect of things.',
      difficulty: 'easy',
      tags: ['antonym'],
      timeLimit: 30,
    },
    {
      id: 'va-q5',
      text: 'One who cannot read or write is called:',
      options: ['Literate', 'Illiterate', 'Linguist', 'Author'],
      answer: 1,
      explanation: 'An illiterate person is unable to read or write.',
      hint: 'Not literate.',
      difficulty: 'easy',
      tags: ['one-word'],
      timeLimit: 30,
    },
    {
      id: 'va-q6',
      text: 'One who knows many languages is called:',
      options: ['Translator', 'Bilingual', 'Linguist', 'Polyglot'],
      answer: 2,
      explanation: 'A linguist is a person skilled in foreign languages or linguistics.',
      hint: 'Think of language studies.',
      difficulty: 'medium',
      tags: ['one-word'],
      timeLimit: 45,
    },
    {
      id: 'va-q7',
      text: 'What is the meaning of the idiom "Once in a blue moon"?',
      options: ['Frequently', 'Rarely', 'Daily', 'Quickly'],
      answer: 1,
      explanation: '"Once in a blue moon" means something happens very rarely.',
      hint: 'Think about how often a blue moon occurs.',
      difficulty: 'easy',
      tags: ['idiom'],
      timeLimit: 30,
    },
    {
      id: 'va-q8',
      text: 'What is the meaning of the idiom "Hit the nail on the head"?',
      options: ['Exactly correct', 'Injure oneself', 'Make a mistake', 'Work hard'],
      answer: 0,
      explanation: '"Hit the nail on the head" means to describe exactly what is causing a situation or answer exactly right.',
      hint: 'Striking a target perfectly.',
      difficulty: 'easy',
      tags: ['idiom'],
      timeLimit: 30,
    },
    {
      id: 'va-q9',
      text: 'Fill in the blank: "She ____ to school every day."',
      options: ['go', 'goes', 'going', 'gone'],
      answer: 1,
      explanation: 'Singular third-person subject "She" takes the singular verb "goes" in the simple present tense.',
      hint: 'Simple present tense third-person.',
      difficulty: 'easy',
      tags: ['grammar', 'fill-blank'],
      timeLimit: 30,
    },
    {
      id: 'va-q10',
      text: 'Fill in the blank: "The weather was so ____ that we stayed indoors."',
      options: ['pleasant', 'severe', 'bright', 'smooth'],
      answer: 1,
      explanation: 'Since they stayed indoors, the weather must have been bad/severe.',
      hint: 'Bad or harsh weather.',
      difficulty: 'easy',
      tags: ['vocabulary', 'fill-blank'],
      timeLimit: 35,
    },
    {
      id: 'va-q11',
      text: 'Fill in the blank: "He worked hard ____ he could succeed."',
      options: ['because', 'so that', 'although', 'however'],
      answer: 1,
      explanation: '"so that" is the conjunction of purpose that fits the sentence logically.',
      hint: 'Indicating purpose.',
      difficulty: 'easy',
      tags: ['connectors', 'fill-blank'],
      timeLimit: 40,
    },
    {
      id: 'va-q12',
      text: 'Fill in the blank: "The new policy had a positive ____ on employee morale."',
      options: ['affect', 'effect', 'affects', 'effects'],
      answer: 1,
      explanation: 'Here we need a noun meaning "result or outcome", which is "effect".',
      hint: 'Noun representing a result.',
      difficulty: 'medium',
      tags: ['grammar', 'fill-blank'],
      timeLimit: 45,
    },
    {
      id: 'va-q13',
      text: 'Fill in the blank: "The manager was pleased ____ the team\'s performance."',
      options: ['with', 'on', 'for', 'by'],
      answer: 0,
      explanation: 'The adjective "pleased" is followed by the preposition "with" when referring to satisfaction with something.',
      hint: 'Satisfied ____ something.',
      difficulty: 'medium',
      tags: ['prepositions', 'fill-blank'],
      timeLimit: 45,
    },
    {
      id: 'va-q14',
      text: 'Fill in the blank: "Despite working hard, he failed ____ the examination."',
      options: ['in', 'at', 'on', 'with'],
      answer: 0,
      explanation: '"failed in the examination" is the idiomatic prepositional usage.',
      hint: 'Preposition indicating the area of failure.',
      difficulty: 'easy',
      tags: ['prepositions', 'fill-blank'],
      timeLimit: 30,
    },
    {
      id: 'va-q15',
      text: 'Choose the antonym of Scarce:',
      options: ['Rare', 'Limited', 'Abundant', 'Small'],
      answer: 2,
      explanation: 'Scarce means insufficient for the demand. The opposite is Abundant, meaning existing in large quantities.',
      hint: 'Existing in large quantities.',
      difficulty: 'easy',
      tags: ['antonym'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student prepare for Verbal Ability in placement exams. Focus on RC strategy, grammar rules (subject-verb agreement, parallelism, dangling modifiers), vocabulary roots, and para jumble techniques. Keep answers concise.',
};
