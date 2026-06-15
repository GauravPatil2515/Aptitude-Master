/**
 * data/core-cs/oops.js — OOPs Concepts Chapter
 */
export default {
  id: 'core-cs-oops',
  subject: 'core-cs',
  title: 'OOPs Concepts',
  icon: '🔧',
  difficulty: 'medium',
  estimatedTime: 70,
  prerequisites: [],

  notes: `
## What is OOP?

Object-Oriented Programming organizes code around **objects** (data + behavior) rather than functions and logic.

**4 Pillars of OOP:**
1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism

---

## Encapsulation

Bundling data and methods that operate on that data within a single unit (class), and restricting direct access.

**Access Modifiers:**
- **Public:** Accessible everywhere
- **Private:** Accessible only within the class
- **Protected:** Accessible within class and subclasses

> 💡 Getters and setters provide controlled access to private fields.

---

## Abstraction

Hiding implementation details and showing only essential features.

**Abstract class:** Cannot be instantiated, may have abstract methods (no body).
**Interface:** Pure abstraction — all methods are abstract (in Java).

> 💡 A car's steering wheel is an abstraction — you don't need to know how the wheels turn.

---

## Inheritance

A class (child/subclass) inherits properties and methods from another class (parent/superclass).

**Types:**
- **Single:** A → B
- **Multilevel:** A → B → C
- **Hierarchical:** A → B, A → C
- **Multiple:** A + B → C (not supported in Java directly, use interfaces)
- **Hybrid:** Combination of above

> 💡 Java doesn't support multiple inheritance with classes to avoid the "diamond problem."

---

## Polymorphism

"One name, multiple forms."

**Compile-time (Static):** Method Overloading — same method name, different parameters.
**Run-time (Dynamic):** Method Overriding — subclass provides specific implementation.

\`\`\`java
// Overloading (compile-time)
int add(int a, int b)
double add(double a, double b)

// Overriding (run-time)
class Animal { void sound() { ... } }
class Dog extends Animal { void sound() { bark } }
\`\`\`

---

## Class vs Object

- **Class:** Blueprint/template (e.g., "Car" design)
- **Object:** Instance of a class (e.g., "my red Honda City")

---

## Constructor

Special method called when an object is created. Same name as class, no return type.

**Types:** Default, Parameterized, Copy constructor

**Constructor chaining:** Calling one constructor from another (this() or super())

---

## Static vs Final

| Keyword | Meaning |
|---------|---------|
| static | Belongs to class, not instance |
| final | Cannot be changed (constant) / overridden / extended |
| final variable | Must be initialized, cannot change |
| final method | Cannot be overridden |
| final class | Cannot be extended |

---

## Key Terms

- **this:** Reference to current object
- **super:** Reference to parent class
- **instanceof:** Checks if object is instance of a class
- **abstract:** Cannot be instantiated
- **interface:** 100% abstract (Java 8+ allows default methods)
- **overload:** Same name, different signature
- **override:** Same signature, different implementation in subclass
  `,

  formulas: [
    { name: 'Access levels',      formula: 'public > protected > default > private', example: 'Most to least accessible' },
    { name: 'Inheritance types',  formula: 'Single, Multilevel, Hierarchical, Multiple, Hybrid', example: 'A→B→C = multilevel' },
    { name: 'Polymorphism',       formula: 'Overload = compile-time, Override = run-time', example: 'Same name, different params vs same signature' },
    { name: 'Constructor',        formula: 'Same name as class, no return type',         example: 'ClassName() { ... }' },
    { name: 'Abstract class',     formula: 'Cannot instantiate, can have abstract methods', example: 'abstract class Shape { abstract void draw(); }' },
  ],

  shortcuts: [
    'EAPI: Encapsulation, Abstraction, Polymorphism, Inheritance',
    'Overloading = compile-time, Overriding = run-time',
    'Java: single inheritance (classes), multiple inheritance (interfaces)',
    'final = cannot change/override/extend',
    'static = belongs to class, shared by all instances',
    'super() must be first statement in child constructor',
    'Abstract class: partial abstraction. Interface: full abstraction.',
  ],

  questions: [
    {
      id: 'oops-q1',
      text: 'Which OOP concept is demonstrated by method overloading?',
      options: ['Encapsulation', 'Abstraction', 'Compile-time Polymorphism', 'Run-time Polymorphism'],
      answer: 2,
      explanation: 'Method overloading is compile-time (static) polymorphism — the method to call is decided at compile time based on parameters.',
      hint: 'When is the method resolved — at compile time or run time?',
      difficulty: 'easy',
      tags: ['polymorphism', 'overloading'],
      timeLimit: 30,
    },
    {
      id: 'oops-q2',
      text: 'Which access modifier allows access only within the same class?',
      options: ['public', 'protected', 'default', 'private'],
      answer: 3,
      explanation: 'Private members are accessible only within the class they are declared in.',
      hint: 'Which is the most restrictive access modifier?',
      difficulty: 'easy',
      tags: ['encapsulation', 'access'],
      timeLimit: 30,
    },
    {
      id: 'oops-q3',
      text: 'Can a Java class extend multiple classes?',
      options: ['Yes', 'No', 'Only with interfaces', 'Only abstract classes'],
      answer: 1,
      explanation: 'Java does not support multiple inheritance with classes to avoid the diamond problem. A class can implement multiple interfaces.',
      hint: 'What problem does multiple inheritance cause?',
      difficulty: 'easy',
      tags: ['inheritance'],
      timeLimit: 30,
    },
    {
      id: 'oops-q4',
      text: 'What keyword prevents a method from being overridden?',
      options: ['static', 'final', 'abstract', 'private'],
      answer: 1,
      explanation: 'A final method cannot be overridden by subclasses.',
      hint: 'Which keyword means "cannot be changed"?',
      difficulty: 'easy',
      tags: ['final'],
      timeLimit: 30,
    },
    {
      id: 'oops-q5',
      text: 'Which OOP concept hides implementation details?',
      options: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'],
      answer: 1,
      explanation: 'Abstraction hides implementation details and shows only essential features. Encapsulation bundles data and methods together.',
      hint: 'What do you see when you drive a car — the engine or the steering wheel?',
      difficulty: 'easy',
      tags: ['abstraction'],
      timeLimit: 30,
    },
    {
      id: 'oops-q6',
      text: 'A constructor:',
      options: ['Has a return type', 'Has different name than class', 'Is called when object is created', 'Can be inherited'],
      answer: 2,
      explanation: 'A constructor is called when an object is created. It has the same name as the class and no return type.',
      hint: 'When is a constructor invoked?',
      difficulty: 'easy',
      tags: ['constructor'],
      timeLimit: 30,
    },
    {
      id: 'oops-q7',
      text: 'Which is NOT a pillar of OOP?',
      options: ['Encapsulation', 'Abstraction', 'Compilation', 'Polymorphism'],
      answer: 2,
      explanation: 'The 4 pillars are: Encapsulation, Abstraction, Inheritance, and Polymorphism. Compilation is not an OOP concept.',
      hint: 'Remember EAPI — what\'s the 4th one?',
      difficulty: 'easy',
      tags: ['basics'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand OOPs concepts for placement exams. Focus on the 4 pillars (Encapsulation, Abstraction, Inheritance, Polymorphism), access modifiers, method overloading vs overriding, constructors, and the static/final keywords. Keep answers concise with code examples.',
};
