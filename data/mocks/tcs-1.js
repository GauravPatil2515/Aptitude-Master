/**
 * data/mocks/tcs-1.js — TCS Prime/Digital Mock Test 1
 */
export default {
  id: 'tcs-1',
  title: 'TCS Prime/Digital Mock Test 1',
  timeLimit: 5400, // 90 minutes
  sections: [
    {
      id: 'quant',
      title: 'Section A: Quantitative Aptitude',
      questions: [
        {
          id: 'q1',
          text: 'The price of a laptop is increased by 20% and then decreased by 10%. What is the net percentage change?',
          options: ['8% increase', '8% decrease', '10% increase', '12% increase'],
          answer: 0,
          explanation: 'Let initial price be 100. After a 20% increase: 100 * 1.2 = 120. After a 10% decrease: 120 * 0.9 = 108. Net change = 108 - 100 = 8% increase.'
        },
        {
          id: 'q2',
          text: 'The ratio of boys to girls in a class is 7:5. If there are 48 students, how many girls are there?',
          options: ['18', '20', '22', '24'],
          answer: 1,
          explanation: 'Total ratio parts = 7 + 5 = 12 parts. Since 12 parts = 48 students, 1 part = 4 students. Number of girls = 5 parts = 5 * 4 = 20 girls.'
        },
        {
          id: 'q3',
          text: 'The average of 8 numbers is 24. If one number 40 is removed, what is the new average?',
          options: ['21.71', '22.14', '24', '25'],
          answer: 0,
          explanation: 'Sum of 8 numbers = 8 * 24 = 192. Removing 40 leaves a new sum = 192 - 40 = 152. New average of remaining 7 numbers = 152 / 7 = 21.71.'
        },
        {
          id: 'q4',
          text: 'A shopkeeper marks an article 25% above cost price and gives a 10% discount. Find the profit percentage.',
          options: ['10%', '12.5%', '15%', '18%'],
          answer: 1,
          explanation: 'Let CP = 100. Marked Price (MP) = 125. Selling Price (SP) after 10% discount = 125 * 0.90 = 112.5. Profit percentage = 12.5%.'
        },
        {
          id: 'q5',
          text: 'Simple interest on ₹6000 at 8% p.a. for 3 years is:',
          options: ['₹1240', '₹1340', '₹1440', '₹1540'],
          answer: 2,
          explanation: 'Simple Interest (SI) = (P * R * T) / 100 = (6000 * 8 * 3) / 100 = 1440.'
        },
        {
          id: 'q6',
          text: 'A can do a work in 12 days and B in 18 days. In how many days can they complete it together?',
          options: ['6', '7.2', '8', '9'],
          answer: 1,
          explanation: 'Combined rate = 1/12 + 1/18 = (3 + 2)/36 = 5/36. Time taken together = 36 / 5 = 7.2 days.'
        },
        {
          id: 'q7',
          text: 'A train 180 m long crosses a pole in 12 seconds. Find the speed of the train.',
          options: ['15 m/s', '18 m/s', '20 m/s', '25 m/s'],
          answer: 0,
          explanation: 'Speed = Distance / Time = 180 m / 12 s = 15 m/s.'
        },
        {
          id: 'q8',
          text: 'The HCF of 72 and 120 is:',
          options: ['12', '18', '24', '36'],
          answer: 2,
          explanation: 'Factors of 72 = 24 * 3. Factors of 120 = 24 * 5. The Highest Common Factor (HCF) is 24.'
        },
        {
          id: 'q9',
          text: 'How many different 3-letter arrangements can be formed from the letters A, B, C, D? (Without repetition)',
          options: ['12', '18', '24', '36'],
          answer: 2,
          explanation: 'This is a permutation question. P(4, 3) = 4! / (4-3)! = 4 * 3 * 2 = 24 arrangements.'
        },
        {
          id: 'q10',
          text: 'A coin is tossed twice. What is the probability of getting exactly one head?',
          options: ['1/4', '1/2', '3/4', '1'],
          answer: 1,
          explanation: 'Sample space = {HH, HT, TH, TT}. Favorable outcomes for exactly one head = {HT, TH}. Probability = 2 / 4 = 1/2.'
        },
        {
          id: 'q11',
          text: 'A boat travels 30 km downstream in 2 hours. If the speed of the stream is 3 km/h, find the speed of the boat in still water.',
          options: ['12 km/h', '15 km/h', '18 km/h', '21 km/h'],
          answer: 0,
          explanation: 'Downstream speed = 30 km / 2 hours = 15 km/h. Downstream Speed = Boat Speed + Stream Speed => 15 = Boat Speed + 3 => Boat Speed = 12 km/h.'
        },
        {
          id: 'q12',
          text: 'Find the next number in the sequence: 3, 8, 15, 24, 35, ?',
          options: ['46', '48', '50', '52'],
          answer: 1,
          explanation: 'The differences between consecutive terms are odd numbers: 5, 7, 9, 11... The next difference is 13. So, 35 + 13 = 48. Alternatively, the sequence is n^2 - 1 starting from n = 2.'
        },
        {
          id: 'q13',
          text: 'If 40% of a number is 160, what is the number?',
          options: ['320', '360', '400', '420'],
          answer: 2,
          explanation: 'Let the number be x. 0.40 * x = 160 => x = 160 / 0.40 = 400.'
        },
        {
          id: 'q14',
          text: 'A sum of money becomes ₹6050 in 2 years at 10% compound interest per annum. Find the principal.',
          options: ['₹5000', '₹5040', '₹5200', '₹5500'],
          answer: 0,
          explanation: 'Amount (A) = P * (1 + R/100)^T => 6050 = P * (1.10)^2 => 6050 = P * 1.21 => P = 6050 / 1.21 = 5000.'
        },
        {
          id: 'q15',
          text: 'A person walks 8 m north and then 15 m east. How far is he from his starting point?',
          options: ['15 m', '17 m', '20 m', '23 m'],
          answer: 1,
          explanation: 'This forms a right-angled triangle. Distance = sqrt(8^2 + 15^2) = sqrt(64 + 225) = sqrt(289) = 17 m.'
        },
        {
          id: 'q16',
          text: 'The LCM of 15, 20 and 30 is:',
          options: ['30', '45', '60', '120'],
          answer: 2,
          explanation: '15 = 3 * 5, 20 = 2^2 * 5, 30 = 2 * 3 * 5. LCM = 2^2 * 3 * 5 = 60.'
        },
        {
          id: 'q17',
          text: 'The probability of drawing an Ace from a standard deck of 52 cards is:',
          options: ['1/4', '1/13', '4/13', '1/52'],
          answer: 1,
          explanation: 'There are 4 Aces in a deck of 52 cards. Probability = 4 / 52 = 1 / 13.'
        },
        {
          id: 'q18',
          text: 'The average age of 5 students is 18 years. If a teacher aged 40 joins the group, what is the new average age?',
          options: ['21.67 years', '22 years', '22.5 years', '23 years'],
          answer: 0,
          explanation: 'Sum of ages of 5 students = 5 * 18 = 90. Adding teacher: new sum = 90 + 40 = 130. New average of 6 people = 130 / 6 = 21.67 years.'
        },
        {
          id: 'q19',
          text: 'The difference between Cost Price (CP) and Selling Price (SP) is ₹80. If CP = ₹400 and SP > CP, the profit percentage is:',
          options: ['15%', '18%', '20%', '25%'],
          answer: 2,
          explanation: 'Profit = ₹80. Profit Percentage = (Profit / CP) * 100 = (80 / 400) * 100 = 20%.'
        },
        {
          id: 'q20',
          text: 'The sum of the first 10 natural numbers is:',
          options: ['45', '50', '55', '60'],
          answer: 2,
          explanation: 'Sum = n * (n + 1) / 2 = 10 * 11 / 2 = 55.'
        }
      ]
    },
    {
      id: 'logical',
      title: 'Section B: Logical Reasoning',
      questions: [
        {
          id: 'q21',
          text: 'Find the next number in the series: 2, 6, 18, 54, ?',
          options: ['108', '162', '216', '324'],
          answer: 1,
          explanation: 'Each term is multiplied by 3 to get the next term. 54 * 3 = 162.'
        },
        {
          id: 'q22',
          text: 'If CAT is coded as DBU, then DOG is coded as:',
          options: ['EPH', 'EPG', 'FQI', 'EOH'],
          answer: 0,
          explanation: 'Each letter is shifted by +1 in the alphabet: C->D, A->B, T->U. Thus, D->E, O->P, G->H. The code is EPH.'
        },
        {
          id: 'q23',
          text: 'If A is the father of B and B is the brother of C, what is A to C?',
          options: ['Uncle', 'Father', 'Brother', 'Grandfather'],
          answer: 1,
          explanation: 'Since B is C\'s brother, they share the same father. So A is C\'s father.'
        },
        {
          id: 'q24',
          text: 'A man faces North. He turns right, then right again, and then left. What direction is he facing now?',
          options: ['East', 'West', 'North', 'South'],
          answer: 0,
          explanation: 'Start facing North. Turn Right -> facing East. Turn Right -> facing South. Turn Left -> facing East.'
        },
        {
          id: 'q25',
          text: 'Statements: All doctors are humans. All humans are mammals. Conclusion: All doctors are mammals. Is the conclusion true or false?',
          options: ['True', 'False'],
          answer: 0,
          explanation: 'By transitive property of sets, doctors is a subset of humans, which is a subset of mammals. So all doctors are mammals.'
        },
        {
          id: 'q26',
          text: 'Find the odd one out from the following list: 49, 121, 169, 225',
          options: ['49', '121', '169', '225'],
          answer: 3,
          explanation: '49 (7^2), 121 (11^2), and 169 (13^2) are squares of prime numbers. 225 (15^2) is the square of a composite number.'
        },
        {
          id: 'q27',
          text: 'Are the words APPLE, BALL, CAT, DOG listed in correct dictionary order?',
          options: ['Yes', 'No'],
          answer: 0,
          explanation: 'A, B, C, D is correct alphabetical sorting.'
        },
        {
          id: 'q28',
          text: 'Statement: Some students are engineers. Conclusion: Some engineers are students. Is the conclusion valid?',
          options: ['Yes / True', 'No / False'],
          answer: 0,
          explanation: 'The relation "Some" is symmetric. If A overlaps B, then B overlaps A.'
        },
        {
          id: 'q29',
          text: 'A is older than B. B is older than C. Who is the youngest?',
          options: ['A', 'B', 'C', 'Cannot determine'],
          answer: 2,
          explanation: 'Age relation is A > B > C. Therefore, C is the youngest.'
        },
        {
          id: 'q30',
          text: 'Find the next term in the series: 1, 4, 9, 16, 25, ?',
          options: ['30', '35', '36', '49'],
          answer: 2,
          explanation: 'The terms are squares of consecutive integers: 1^2, 2^2, 3^2, 4^2, 5^2. The next is 6^2 = 36.'
        },
        {
          id: 'q31',
          text: 'P is positioned to the left of Q. Q is to the left of R. Who is the rightmost?',
          options: ['P', 'Q', 'R', 'Cannot determine'],
          answer: 2,
          explanation: 'The order from left to right is P - Q - R. R is the rightmost.'
        },
        {
          id: 'q32',
          text: 'Statement: No cat is a dog. Conclusion: No dog is a cat. Is the conclusion valid?',
          options: ['Yes / True', 'No / False'],
          answer: 0,
          explanation: 'The relation "No A is B" is symmetric. If no cats are dogs, then no dogs are cats.'
        },
        {
          id: 'q33',
          text: 'Find the next term in the series: 1, 1, 2, 3, 5, 8, ?',
          options: ['11', '12', '13', '15'],
          answer: 2,
          explanation: 'This is the Fibonacci sequence where each term is the sum of the previous two. 5 + 8 = 13.'
        },
        {
          id: 'q34',
          text: 'In a row, A sits immediately left of B, and B sits immediately left of C. Who is sitting in the middle?',
          options: ['A', 'B', 'C', 'Cannot determine'],
          answer: 1,
          explanation: 'The seating order is A - B - C. B is in the middle.'
        },
        {
          id: 'q35',
          text: 'If we assign alphabetical opposites (A->Z, B->Y, etc.), what is the code for the letter A?',
          options: ['Z', 'Y', 'X', 'Cannot determine'],
          answer: 0,
          explanation: 'A is the first letter from the start, and Z is the first letter from the end.'
        },
        {
          id: 'q36',
          text: 'Find the next number in the series: 5, 10, 20, 40, ?',
          options: ['60', '70', '80', '100'],
          answer: 2,
          explanation: 'The terms double each time: 5 * 2 = 10, 10 * 2 = 20, 20 * 2 = 40. The next is 40 * 2 = 80.'
        },
        {
          id: 'q37',
          text: 'If P + Q means P is the father of Q. What is the relation of P to R in the expression P + Q + R?',
          options: ['Brother', 'Grandfather', 'Uncle', 'Father'],
          answer: 1,
          explanation: 'P is the father of Q, and Q is the father of R. Therefore, P is the grandfather of R.'
        },
        {
          id: 'q38',
          text: 'A person walks 20 m North, and then turns and walks 20 m South. Where is he relative to his starting point?',
          options: ['North', 'South', 'At the start point', 'East'],
          answer: 2,
          explanation: 'Moving 20 m North and then 20 m South returns the person back to the exact starting position.'
        },
        {
          id: 'q39',
          text: 'Statements: Some A are B. Some B are C. Conclusion: Some A are C. Is this conclusion definitely true?',
          options: ['True', 'False', 'Cannot determine'],
          answer: 2,
          explanation: 'Some A are B and some B are C does not guarantee an overlap between A and C. It is possible but not definite.'
        },
        {
          id: 'q40',
          text: 'Find the next number in the sequence: 2, 5, 10, 17, 26, ?',
          options: ['35', '37', '39', '41'],
          answer: 1,
          explanation: 'The pattern is n^2 + 1: 1^2+1=2, 2^2+1=5, 3^2+1=10, 4^2+1=17, 5^2+1=26. The next is 6^2+1 = 37.'
        }
      ]
    },
    {
      id: 'verbal',
      title: 'Section C: Verbal Ability',
      questions: [
        {
          id: 'q41',
          text: 'Fill in the blank: "He ____ to office every day."',
          options: ['go', 'goes', 'going', 'gone'],
          answer: 1,
          explanation: 'Third-person singular "He" requires the singular verb "goes" in simple present tense.'
        },
        {
          id: 'q42',
          text: 'Choose the synonym of "Enhance":',
          options: ['Reduce', 'Improve', 'Destroy', 'Delay'],
          answer: 1,
          explanation: 'To enhance means to intensify, increase, or further improve the quality or value.'
        },
        {
          id: 'q43',
          text: 'Choose the antonym of "Scarce":',
          options: ['Rare', 'Limited', 'Abundant', 'Small'],
          answer: 2,
          explanation: 'Scarce means in short supply. The opposite is Abundant, meaning available in large quantities.'
        },
        {
          id: 'q44',
          text: 'Fill in the blank: "She is interested ____ classical music."',
          options: ['on', 'at', 'in', 'with'],
          answer: 2,
          explanation: 'The adjective "interested" takes the preposition "in".'
        },
        {
          id: 'q45',
          text: 'Find the error in the sentence: "They is playing football in the school playground."',
          options: ['They', 'is', 'playing', 'playground'],
          answer: 1,
          explanation: 'The plural subject "They" takes the plural verb "are", not "is".'
        },
        {
          id: 'q46',
          text: 'Choose the correct article to fill in the blank: "He is ____ honest man."',
          options: ['a', 'an', 'the', 'no article required'],
          answer: 1,
          explanation: 'Since "honest" starts with a silent "h" and a vowel sound /o/, we use the article "an".'
        },
        {
          id: 'q47',
          text: 'Read the passage and choose the main idea: "Artificial Intelligence helps organizations analyze massive datasets and improve operational efficiency. It is rapidly expanding in healthcare, finance, and manufacturing. However, concerns regarding data privacy and job displacement remain important challenges." What is the main idea?',
          options: ['The growth of the finance industry', 'AI benefits and its associated concerns', 'Healthcare applications of AI', 'Manufacturing automation'],
          answer: 1,
          explanation: 'The passage highlights both the advantages (analyzing data, efficiency) and worries (privacy, job displacement) of AI.'
        },
        {
          id: 'q48',
          text: 'Based on the passage in Q47, which specific concern is mentioned?',
          options: ['Inflation', 'Privacy', 'Tourism decline', 'Sports safety'],
          answer: 1,
          explanation: 'The passage explicitly lists "data privacy" and "job displacement" as concerns.'
        },
        {
          id: 'q49',
          text: 'Choose the grammatically correct sentence representing the present tense:',
          options: ['She have a car.', 'She has a car.', 'She having a car.', 'She had a car.'],
          answer: 1,
          explanation: '"She" is third-person singular and takes the verb "has" for possession in the present tense.'
        },
        {
          id: 'q50',
          text: 'Arrange the sentences in logical order to form a coherent paragraph:\nA. Consequently, productivity increased.\nB. Companies adopted automation tools.\nC. These tools reduced repetitive work.\nD. As a result, employees focused on complex tasks.',
          options: ['B-C-D-A', 'C-B-A-D', 'B-D-C-A', 'D-C-B-A'],
          answer: 0,
          explanation: 'B introduces the main subject (companies adopting tools). C explains what these tools did. D explains the immediate result of C. A concludes the paragraph with the final consequence (increased productivity).'
        }
      ]
    }
  ]
};
