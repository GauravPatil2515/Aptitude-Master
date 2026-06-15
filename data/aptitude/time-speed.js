/**
 * data/aptitude/time-speed.js — Time, Speed & Distance Chapter
 */
export default {
  id: 'aptitude-time-speed',
  subject: 'aptitude',
  title: 'Time, Speed & Distance',
  icon: '🚀',
  difficulty: 'medium',
  estimatedTime: 55,
  prerequisites: ['ratio-proportion'],

  notes: `
## Basic Formula

**Distance = Speed × Time**

| Find | Formula |
|------|---------|
| Speed | Distance / Time |
| Time | Distance / Speed |

> 💡 A car travels 300 km in 5 hours → Speed = 300/5 = **60 km/h**

---

## Unit Conversions

- **km/h → m/s**: multiply by **5/18**
- **m/s → km/h**: multiply by **18/5**

> 💡 72 km/h = 72 × 5/18 = **20 m/s**

---

## Average Speed

**Average Speed = Total Distance / Total Time**

⚠️ NOT the average of speeds!

For equal distances d at speeds S₁ and S₂:

**Avg Speed = 2S₁S₂ / (S₁ + S₂)** (Harmonic Mean)

> 💡 Going at 60 km/h, returning at 40 km/h → Avg = 2(60)(40)/(60+40) = **48 km/h**

---

## Relative Speed

- **Same direction:** Relative speed = |S₁ − S₂|
- **Opposite direction:** Relative speed = S₁ + S₂

> 💡 Two trains at 50 and 70 km/h in same direction → Relative = 20 km/h

---

## Trains

- **Crossing a pole:** Time = Length of train / Speed
- **Crossing a platform:** Time = (Train length + Platform length) / Speed
- **Two trains crossing:** Time = (L₁ + L₂) / Relative Speed

> 💡 Train 150m long at 60 km/h crosses a pole: Time = 150/(60×5/18) = 150/16.67 = **9 sec**

---

## Boats & Streams

| | Formula |
|---|---------|
| Downstream speed | u + v (boat + stream) |
| Upstream speed | u − v (boat − stream) |
| Boat speed | (Down + Up) / 2 |
| Stream speed | (Down − Up) / 2 |

> 💡 Downstream 16 km/h, Upstream 10 km/h → Boat = 13 km/h, Stream = 3 km/h
  `,

  formulas: [
    { name: 'Basic',           formula: 'D = S × T',                          example: '60 km/h × 5h = 300 km' },
    { name: 'km/h → m/s',      formula: '× 5/18',                            example: '72 × 5/18 = 20 m/s' },
    { name: 'Avg (equal dist)',formula: '2S₁S₂/(S₁+S₂)',                    example: '2(60)(40)/100 = 48' },
    { name: 'Relative (same)', formula: '|S₁ − S₂|',                         example: '|70 − 50| = 20 km/h' },
    { name: 'Boat speed',      formula: '(Down + Up) / 2',                  example: '(16+10)/2 = 13 km/h' },
  ],

  shortcuts: [
    'km/h to m/s: ×5/18. m/s to km/h: ×18/5. Memorize!',
    'Average speed for equal distances = Harmonic mean, not arithmetic',
    'Train crossing pole: only train length matters',
    'Train crossing platform: add platform length',
    'Boat: downstream = boat+stream, upstream = boat−stream',
  ],

  questions: [
    {
      id: 'tsd-q1',
      text: 'A car travels at 72 km/h. What is its speed in m/s?',
      options: ['15 m/s', '20 m/s', '25 m/s', '30 m/s'],
      answer: 1,
      explanation: '72 × 5/18 = 20 m/s',
      hint: 'Multiply by 5/18 to convert km/h to m/s',
      difficulty: 'easy',
      tags: ['conversion'],
      timeLimit: 30,
    },
    {
      id: 'tsd-q2',
      text: 'A man goes from A to B at 40 km/h and returns at 60 km/h. What is his average speed?',
      options: ['50 km/h', '48 km/h', '52 km/h', '45 km/h'],
      answer: 1,
      explanation: 'Avg = 2(40)(60)/(40+60) = 4800/100 = 48 km/h',
      hint: 'Use harmonic mean: 2S₁S₂/(S₁+S₂) for equal distances',
      difficulty: 'easy',
      tags: ['average-speed'],
      timeLimit: 60,
    },
    {
      id: 'tsd-q3',
      text: 'A 200m long train crosses a pole in 10 seconds. What is its speed in km/h?',
      options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'],
      answer: 1,
      explanation: 'Speed = 200/10 = 20 m/s = 20 × 18/5 = 72 km/h',
      hint: 'Speed = Length/Time, then convert m/s to km/h',
      difficulty: 'easy',
      tags: ['trains', 'pole'],
      timeLimit: 60,
    },
    {
      id: 'tsd-q4',
      text: 'A boat goes 30 km downstream and 18 km upstream in 3 hours each. Find the speed of the stream.',
      options: ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
      answer: 1,
      explanation: 'Downstream speed = 30/3 = 10 km/h. Upstream = 18/3 = 6 km/h. Stream = (10−6)/2 = 2 km/h',
      hint: 'Stream speed = (Downstream − Upstream) / 2',
      difficulty: 'medium',
      tags: ['boats'],
      timeLimit: 75,
    },
    {
      id: 'tsd-q5',
      text: 'Two trains 150m and 200m long are moving in opposite directions at 54 km/h and 36 km/h. How long will they take to cross each other?',
      options: ['10 sec', '12 sec', '14 sec', '16 sec'],
      answer: 2,
      explanation: 'Relative speed = 54+36 = 90 km/h = 90×5/18 = 25 m/s. Total distance = 150+200 = 350m. Time = 350/25 = 14 sec',
      hint: 'Opposite direction: add speeds. Convert to m/s. Time = total length / relative speed',
      difficulty: 'medium',
      tags: ['trains', 'opposite'],
      timeLimit: 90,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Time, Speed & Distance for placement exams. Focus on unit conversions (5/18 rule), average speed traps, train problems, and boats & streams. Keep answers concise with step-by-step solutions.',
};
