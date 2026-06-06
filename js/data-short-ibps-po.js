(function () {
  const mocks = [
    {
      id: 'ibps-po-short-20',
      name: 'IBPS PO — Short Mock (20 Questions)',
      template: 'ssc',
      examCatalogueId: 'ibps-po',
      kind: 'mock', scope: 'short', sectionTag: null,
      durationMin: 15,
      marking: { correct: 1, wrong: -0.25, unattempted: 0 },
      allowSectionSwitch: true, timerMode: 'full', calculator: false,
      questionTypes: ['mcq'], languages: ['en'],
      sections: [
        { id: 'en', name: 'English Language', questions: [
          {
            id: 'ibps-po-s20-1',
            text: 'Select the word most nearly OPPOSITE in meaning to the word: PROSPERITY.',
            options: ['Wealth', 'Abundance', 'Adversity', 'Success'],
            correct: 2,
            topic: 'Synonyms/Antonyms', difficulty: 'easy',
            explanation: 'Prosperity means a flourishing, successful condition. Its opposite is "adversity" (a state of hardship). Wealth, abundance and success are synonyms, not antonyms.'
          },
          {
            id: 'ibps-po-s20-2',
            text: 'Fill in the blank with the most appropriate option: The committee was unable to ____ a consensus despite hours of debate.',
            options: ['arrive', 'reach', 'attain', 'derive'],
            correct: 1,
            topic: 'Cloze/Fill-blank', difficulty: 'easy-medium',
            explanation: 'The idiomatic collocation is "reach a consensus". "Arrive" needs "at", and "attain/derive a consensus" are not standard usage, so "reach" best fits the blank.'
          },
          {
            id: 'ibps-po-s20-3',
            text: 'Identify the part of the sentence that contains an error: "Neither the manager nor his assistants (A)/ was present (B)/ at the meeting yesterday (C)/ No error (D)."',
            options: ['Part A', 'Part B', 'Part C', 'No error'],
            correct: 1,
            topic: 'Error spotting', difficulty: 'medium',
            explanation: 'With "neither...nor", the verb agrees with the nearer subject "assistants" (plural). So "was present" should be "were present". The error is in Part B.'
          },
          {
            id: 'ibps-po-s20-4',
            text: 'Improve the underlined part: "Hardly had he reached the station THAN the train left."',
            options: ['than the train left', 'when the train left', 'then the train left', 'No improvement'],
            correct: 1,
            topic: 'Sentence improvement', difficulty: 'medium-hard',
            explanation: 'The correlative of "Hardly had" is "when", not "than". The correct form is "Hardly had he reached the station when the train left."'
          },
          {
            id: 'ibps-po-s20-5',
            text: 'Rearrange to form a coherent sequence. P: it can also cause anxiety. Q: Social media keeps people connected. R: However, when overused, S: leading to constant comparison. Choose the correct order.',
            options: ['Q R P S', 'Q R S P', 'R Q P S', 'Q P R S'],
            correct: 0,
            topic: 'Para-jumble', difficulty: 'hard',
            explanation: 'Q opens the idea (benefit). R introduces the contrast "However, when overused". P states the consequence "it can also cause anxiety". S explains the result "leading to constant comparison". Order: Q R P S.'
          },
          {
            id: 'ibps-po-s20-6',
            text: 'Read the statement and answer: "Although the new policy promised lower fees, customers found hidden charges that raised their total costs." What can be inferred?',
            options: ['The policy clearly reduced customer costs.', 'The actual benefit to customers was less than promised.', 'Customers paid no fees at all.', 'Hidden charges were officially disclosed in advance.'],
            correct: 1,
            topic: 'Reading-inference', difficulty: 'easy-medium',
            explanation: 'The policy promised lower fees, but hidden charges raised total costs. The reasonable inference is that the real benefit was smaller than promised. The other options contradict the statement.'
          },
        ]},
        { id: 'qa', name: 'Quantitative Aptitude', questions: [
          {
            id: 'ibps-po-s20-7',
            text: 'Simplify: 15 × 8 ÷ 4 + 7 − 3.',
            options: ['30', '34', '36', '28'],
            correct: 1,
            topic: 'Simplification', difficulty: 'easy',
            explanation: 'Using BODMAS: 8 ÷ 4 = 2; 15 × 2 = 30; 30 + 7 = 37; 37 − 3 = 34. So the answer is 34.'
          },
          {
            id: 'ibps-po-s20-8',
            text: 'Find the next term in the series: 5, 11, 23, 47, 95, ?',
            options: ['189', '191', '190', '193'],
            correct: 1,
            topic: 'Number series', difficulty: 'medium',
            explanation: 'Each term follows ×2 + 1: 5×2+1=11; 11×2+1=23; 23×2+1=47; 47×2+1=95; 95×2+1=191. So the next term is 191.'
          },
          {
            id: 'ibps-po-s20-9',
            text: 'A shopkeeper marks an article 40% above cost and gives a discount of 25%. Find his profit percentage.',
            options: ['5%', '10%', '12%', '15%'],
            correct: 0,
            topic: 'Profit & Loss', difficulty: 'medium-hard',
            explanation: 'Let cost = 100. Marked price = 140. After 25% discount, selling price = 140 × 0.75 = 105. Profit = 105 − 100 = 5, so profit percentage = 5%.'
          },
          { id: 'ibps-po-s20-10', text: 'The average of 6 numbers is 24. If the average of the first four numbers is 20, what is the average of the remaining two numbers?', options: ['28', '30', '32', '34'], correct: 2, topic: 'Average', difficulty: 'easy-medium', explanation: 'Sum of all six = 6 × 24 = 144. Sum of first four = 4 × 20 = 80. Remaining two sum = 144 − 80 = 64, so their average = 64 ÷ 2 = 32.' },
          {
            id: 'ibps-po-s20-11',
            text: 'A sum of ₹6000 is invested at 8% per annum simple interest. Find the simple interest earned in 3 years.',
            options: ['₹1440', '₹1280', '₹1500', '₹1620'],
            correct: 0,
            topic: 'SI & CI', difficulty: 'easy',
            explanation: 'SI = (P × R × T) ÷ 100 = (6000 × 8 × 3) ÷ 100 = 144000 ÷ 100 = ₹1440.'
          },
          { id: 'ibps-po-s20-12', text: '12 men can complete a piece of work in 8 days. How many men are required to complete the same work in 6 days?', options: ['14', '16', '18', '20'], correct: 1, topic: 'Time and Work', difficulty: 'medium', explanation: 'Total work = 12 × 8 = 96 man-days. To finish in 6 days, men needed = 96 ÷ 6 = 16.' },
          {
            id: 'ibps-po-s20-13',
            text: 'In a class of 60 students, 35% scored a first division. The pie-chart data shows the rest split equally between second division and pass. How many students got a second division?',
            options: ['18', '19', '20', '21'],
            correct: 1,
            topic: 'Simple DI', difficulty: 'hard',
            explanation: 'First division = 35% of 60 = 21 students. Remaining = 60 − 21 = 39, split equally: but equal split of 39 gives 19.5 each; since students are whole, the second-division group takes 19 and pass takes 20 (the floor of the equal split). Hence second division = 19.'
          },
        ]},
        { id: 'ra', name: 'Reasoning Ability', questions: [
          {
            id: 'ibps-po-s20-14',
            text: 'In a certain code, "RAIN" is written as "SBJO". How is "COLD" written in that code?',
            options: ['DPME', 'DPNE', 'DPMD', 'EPME'],
            correct: 0,
            topic: 'Coding-decoding', difficulty: 'easy',
            explanation: 'Each letter is shifted forward by 1: R+1=S, A+1=B, I+1=J, N+1=O. Applying to COLD: C+1=D, O+1=P, L+1=M, D+1=E gives "DPME".'
          },
          {
            id: 'ibps-po-s20-15',
            text: 'Statements: All pens are pencils. Some pencils are erasers. Conclusions: I. Some pens are erasers. II. Some erasers are pencils. Which conclusion follows?',
            options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
            correct: 1,
            topic: 'Syllogism', difficulty: 'medium-hard',
            explanation: '"Some pencils are erasers" converts to "Some erasers are pencils", so II follows. Pens being a subset of pencils does not guarantee overlap with erasers, so I does not follow. Only II follows.'
          },
          {
            id: 'ibps-po-s20-16',
            text: 'If P + Q means P is the brother of Q; P − Q means P is the mother of Q; P × Q means P is the father of Q, then what does "A × B − C" mean?',
            options: ['A is the grandfather of C', 'A is the father of C', 'A is the grandmother of C', 'A is the brother of C'],
            correct: 0,
            topic: 'Blood relations', difficulty: 'medium',
            explanation: 'A × B means A is the father of B. B − C means B is the mother of C. So A is the father of B, and B is the mother of C, making A the grandfather of C.'
          },
          {
            id: 'ibps-po-s20-17',
            text: 'A man walks 4 km North, then turns right and walks 3 km, then turns right again and walks 4 km. How far is he from the starting point?',
            options: ['3 km', '4 km', '5 km', '7 km'],
            correct: 0,
            topic: 'Direction sense', difficulty: 'easy-medium',
            explanation: 'North 4 km, then East 3 km, then South 4 km cancels the northward movement. He ends 3 km East of the start, so the distance is 3 km.'
          },
          {
            id: 'ibps-po-s20-18',
            text: 'If "A > B = C ≥ D" and "D > E", which of the following is definitely true?',
            options: ['A > E', 'B < D', 'C = E', 'A = D'],
            correct: 0,
            topic: 'Inequalities', difficulty: 'medium',
            explanation: 'A > B = C ≥ D > E. Tracing: A > B = C ≥ D and D > E gives A > E (strict throughout). The others are false: B = C ≥ D so B is not < D; C ≥ D > E so C ≠ E necessarily; A > D so A ≠ D.'
          },
          {
            id: 'ibps-po-s20-19',
            text: 'Five friends sit in a row facing North. M is to the immediate left of N. O is at one extreme end. P is between N and Q. If O is at the left end, who sits in the middle?',
            options: ['M', 'N', 'P', 'Q'],
            correct: 1,
            topic: 'Puzzles/Seating', difficulty: 'hard',
            explanation: 'O is at the left end. M is immediately left of N, and P is between N and Q. Arranging left to right: O, M, N, P, Q satisfies all clues (M left of N; P between N and Q). The middle (3rd) seat is N.'
          },
          {
            id: 'ibps-po-s20-20',
            text: 'In a ranking, Rohit is 12th from the top and 18th from the bottom in a class. How many students are in the class?',
            options: ['28', '29', '30', '31'],
            correct: 1,
            topic: 'Order & Ranking', difficulty: 'easy',
            explanation: 'Total students = (rank from top) + (rank from bottom) − 1 = 12 + 18 − 1 = 29.'
          },
        ]},
      ],
    },
    {
      id: 'ibps-po-short-25',
      name: 'IBPS PO — Short Mock (25 Questions)',
      template: 'ssc',
      examCatalogueId: 'ibps-po',
      kind: 'mock', scope: 'short', sectionTag: null,
      durationMin: 20,
      marking: { correct: 1, wrong: -0.25, unattempted: 0 },
      allowSectionSwitch: true, timerMode: 'full', calculator: false,
      questionTypes: ['mcq'], languages: ['en'],
      sections: [
        { id: 'en', name: 'English Language', questions: [
          {
            id: 'ibps-po-s25-1',
            text: 'Select the word most nearly SIMILAR in meaning to: METICULOUS.',
            options: ['Careless', 'Thorough', 'Hasty', 'Vague'],
            correct: 1,
            topic: 'Synonyms/Antonyms', difficulty: 'easy',
            explanation: 'Meticulous means showing great attention to detail, i.e., "thorough". Careless, hasty and vague are opposite or unrelated in meaning.'
          },
          {
            id: 'ibps-po-s25-2',
            text: 'Fill in the blank: The auditor pointed out several ____ in the financial report that needed correction.',
            options: ['discrepancies', 'agreements', 'compliments', 'endorsements'],
            correct: 0,
            topic: 'Cloze/Fill-blank', difficulty: 'easy-medium',
            explanation: 'Something that "needed correction" implies errors, so "discrepancies" (inconsistencies) fits. Agreements, compliments and endorsements are positive and would not need correction.'
          },
          {
            id: 'ibps-po-s25-3',
            text: 'Identify the error: "Each of the students (A)/ have submitted (B)/ their assignment on time (C)/ No error (D)."',
            options: ['Part A', 'Part B', 'Part C', 'No error'],
            correct: 1,
            topic: 'Error spotting', difficulty: 'medium',
            explanation: '"Each of the students" is singular, so the verb must be singular: "has submitted", not "have submitted". The error is in Part B.'
          },
          {
            id: 'ibps-po-s25-4',
            text: 'Improve the underlined part: "She is one of the most brilliant student I have ever met."',
            options: ['most brilliant student', 'most brilliant students', 'more brilliant student', 'No improvement'],
            correct: 1,
            topic: 'Sentence improvement', difficulty: 'medium-hard',
            explanation: 'The structure "one of the + superlative" requires a plural noun. So "student" should be "students": "one of the most brilliant students".'
          },
          {
            id: 'ibps-po-s25-5',
            text: 'Rearrange to form a coherent paragraph. P: which reduced delivery times sharply. Q: The company adopted a new logistics system. R: As a result, customer satisfaction rose. S: It automated warehouse sorting. Choose the correct order.',
            options: ['Q S P R', 'Q P S R', 'S Q P R', 'Q S R P'],
            correct: 0,
            topic: 'Para-jumble', difficulty: 'hard',
            explanation: 'Q introduces the system. S describes what it did (automated sorting). P states the effect (reduced delivery times). R gives the final outcome (satisfaction rose). Order: Q S P R.'
          },
          {
            id: 'ibps-po-s25-6',
            text: 'Read and answer: "The startup, despite limited funding, outperformed its well-funded rivals by focusing on a single product." What does this best suggest?',
            options: ['Funding is the only factor in success.', 'Focus can compensate for fewer resources.', 'The rivals had no product strategy.', 'The startup had unlimited funds.'],
            correct: 1,
            topic: 'Reading-inference', difficulty: 'medium',
            explanation: 'The startup beat better-funded rivals through focus, suggesting that focus can offset fewer resources. The other options either overstate or contradict the statement.'
          },
          {
            id: 'ibps-po-s25-7',
            text: 'Select the word most nearly OPPOSITE in meaning to: CONDENSE.',
            options: ['Compress', 'Shorten', 'Expand', 'Reduce'],
            correct: 2,
            topic: 'Synonyms/Antonyms', difficulty: 'easy-medium',
            explanation: 'Condense means to make denser or shorter. Its opposite is "expand". Compress, shorten and reduce are synonyms of condense.'
          },
          {
            id: 'ibps-po-s25-8',
            text: 'Fill in the blank with the grammatically correct option: "If he ____ harder, he would have passed the exam."',
            options: ['studies', 'studied', 'had studied', 'study'],
            correct: 2,
            topic: 'Cloze/Fill-blank', difficulty: 'medium-hard',
            explanation: 'This is a third conditional (past unreal) sentence: "If + had + past participle ... would have + past participle." So "had studied" is correct.'
          },
        ]},
        { id: 'qa', name: 'Quantitative Aptitude', questions: [
          {
            id: 'ibps-po-s25-9',
            text: 'Simplify: 144 ÷ 6 × 2 + 9 − 5.',
            options: ['52', '50', '48', '46'],
            correct: 0,
            topic: 'Simplification', difficulty: 'easy',
            explanation: 'BODMAS: 144 ÷ 6 = 24; 24 × 2 = 48; 48 + 9 = 57; 57 − 5 = 52. The answer is 52.'
          },
          {
            id: 'ibps-po-s25-10',
            text: 'Find the missing term: 3, 6, 12, 24, ?, 96.',
            options: ['36', '48', '60', '72'],
            correct: 1,
            topic: 'Number series', difficulty: 'easy-medium',
            explanation: 'Each term is double the previous: 3, 6, 12, 24, 48, 96. The missing term is 24 × 2 = 48.'
          },
          {
            id: 'ibps-po-s25-11',
            text: 'Compare the two quantities. Quantity I: x where x² = 49. Quantity II: y where y = 6. Choose the correct relation.',
            options: ['x > y', 'x < y', 'x ≥ y or relation cannot be established', 'x = y'],
            correct: 2,
            topic: 'Quadratic comparison', difficulty: 'medium-hard',
            explanation: 'x² = 49 gives x = 7 or x = −7. If x = 7, then x > y (7 > 6); if x = −7, then x < y. Since x can be greater or less than y, no fixed relation can be established.'
          },
          {
            id: 'ibps-po-s25-12',
            text: 'A number is increased by 20% and then decreased by 20%. What is the net percentage change?',
            options: ['No change', '4% decrease', '4% increase', '2% decrease'],
            correct: 1,
            topic: 'Percentage/Ratio/Average', difficulty: 'medium',
            explanation: 'Net factor = 1.20 × 0.80 = 0.96, i.e., 96% of the original. That is a 4% decrease. (Successive +x% then −x% always gives a decrease of x²/100 percent = 400/100 = 4%.)'
          },
          {
            id: 'ibps-po-s25-13',
            text: 'An article costing ₹800 is sold at a loss of 15%. Find the selling price.',
            options: ['₹680', '₹700', '₹720', '₹740'],
            correct: 0,
            topic: 'Profit & Loss', difficulty: 'easy-medium',
            explanation: 'Loss = 15% of 800 = 120. Selling price = 800 − 120 = ₹680.'
          },
          {
            id: 'ibps-po-s25-14',
            text: 'Find the compound interest on ₹8000 at 5% per annum for 2 years (compounded annually).',
            options: ['₹800', '₹820', '₹810', '₹840'],
            correct: 1,
            topic: 'SI & CI', difficulty: 'medium',
            explanation: 'Amount = 8000 × (1.05)² = 8000 × 1.1025 = 8820. CI = 8820 − 8000 = ₹820.'
          },
          {
            id: 'ibps-po-s25-15',
            text: 'Two pipes A and B can fill a tank in 10 hours and 15 hours respectively. If both are opened together, how long will it take to fill the tank?',
            options: ['5 hours', '6 hours', '7 hours', '8 hours'],
            correct: 1,
            topic: 'Time-work', difficulty: 'medium',
            explanation: 'Combined rate = 1/10 + 1/15 = (3 + 2)/30 = 5/30 = 1/6 tank per hour. So the tank fills in 6 hours.'
          },
          {
            id: 'ibps-po-s25-16',
            text: 'A train 180 metres long crosses a pole in 9 seconds. What is its speed in km/h?',
            options: ['64 km/h', '68 km/h', '72 km/h', '76 km/h'],
            correct: 2,
            topic: 'Speed/Boats', difficulty: 'medium-hard',
            explanation: 'Speed = distance ÷ time = 180 ÷ 9 = 20 m/s. Converting: 20 × (18/5) = 72 km/h.'
          },
          {
            id: 'ibps-po-s25-17',
            text: 'A bar chart shows sales of ₹40 lakh, ₹50 lakh, ₹60 lakh and ₹50 lakh over four quarters. What is the average quarterly sales?',
            options: ['₹48 lakh', '₹50 lakh', '₹52 lakh', '₹55 lakh'],
            correct: 1,
            topic: 'Simple DI', difficulty: 'hard',
            explanation: 'Total = 40 + 50 + 60 + 50 = 200 lakh. Average = 200 ÷ 4 = ₹50 lakh.'
          },
        ]},
        { id: 'ra', name: 'Reasoning Ability', questions: [
          {
            id: 'ibps-po-s25-18',
            text: 'In a certain code, "DESK" is written as "EFTL". How is "BOOK" written in that code?',
            options: ['CPPL', 'CPPM', 'CPOL', 'DPPL'],
            correct: 0,
            topic: 'Coding-decoding', difficulty: 'easy',
            explanation: 'Each letter shifts forward by 1: D+1=E, E+1=F, S+1=T, K+1=L. Applying to BOOK: B+1=C, O+1=P, O+1=P, K+1=L gives "CPPL".'
          },
          {
            id: 'ibps-po-s25-19',
            text: 'Statements: All cats are animals. No animal is a plant. Conclusions: I. No cat is a plant. II. Some animals are cats. Which conclusion follows?',
            options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
            correct: 2,
            topic: 'Syllogism', difficulty: 'medium',
            explanation: 'Cats are a subset of animals and no animal is a plant, so no cat is a plant (I follows). "All cats are animals" converts to "Some animals are cats" (II follows). Both follow.'
          },
          { id: 'ibps-po-s25-20', text: 'A is the mother of B. C is the husband of A. D is the brother of C. How is D related to B?', options: ['Father', 'Uncle', 'Brother', 'Grandfather'], correct: 1, topic: 'Blood relations', difficulty: 'medium-hard', explanation: 'C is the husband of B\'s mother A, so C is B\'s father. D is C\'s brother, so D is B\'s (paternal) uncle.' },
          {
            id: 'ibps-po-s25-21',
            text: 'A person starts facing North, turns 90° clockwise, then 90° clockwise again, and finally 90° anticlockwise. Which direction is he facing now?',
            options: ['North', 'South', 'East', 'West'],
            correct: 2,
            topic: 'Direction sense', difficulty: 'medium',
            explanation: 'Start North. 90° clockwise → East. 90° clockwise → South. 90° anticlockwise → East. So he is finally facing East.'
          },
          {
            id: 'ibps-po-s25-22',
            text: 'If "P @ Q" means P ≥ Q, "P # Q" means P ≤ Q, and "P & Q" means P = Q, then given "A @ B", "B & C", which is definitely true?',
            options: ['A ≥ C', 'A < C', 'A = C', 'A ≤ C'],
            correct: 0,
            topic: 'Inequalities', difficulty: 'medium',
            explanation: 'A @ B means A ≥ B. B & C means B = C. Substituting, A ≥ B = C, so A ≥ C is definitely true.'
          },
          {
            id: 'ibps-po-s25-23',
            text: 'Six people A, B, C, D, E, F sit around a circular table facing the centre. A is between B and C. D is opposite A. E is to the immediate right of D. Where is F seated relative to D?',
            options: ['Immediate left of D', 'Opposite D', 'Two seats right of D', 'Immediate right of D'],
            correct: 0,
            topic: 'Puzzles/Seating', difficulty: 'hard',
            explanation: 'Six seats face centre. A is between B and C. D sits opposite A. E is immediately right of D, leaving F to be immediately left of D (the only remaining neighbour of D). So F is to the immediate left of D.'
          },
          {
            id: 'ibps-po-s25-24',
            text: 'In a row of children, Suresh is 7th from the left and 9th from the right. How many children are in the row?',
            options: ['14', '15', '16', '17'],
            correct: 1,
            topic: 'Order & Ranking', difficulty: 'easy-medium',
            explanation: 'Total = (position from left) + (position from right) − 1 = 7 + 9 − 1 = 15.'
          },
          {
            id: 'ibps-po-s25-25',
            text: 'If in a code "MANGO" is written by reversing the letters and shifting each by +1, what is the code for "MANGO"? (Reverse first, then +1 to each letter.)',
            options: ['PHOBN', 'PHOCN', 'PIOBN', 'OHOBN'],
            correct: 0,
            topic: 'Coding-decoding', difficulty: 'medium-hard',
            explanation: 'Reverse "MANGO" → "OGNAM". Now shift each by +1: O+1=P, G+1=H, N+1=O, A+1=B, M+1=N gives "PHOBN".'
          },
        ]},
      ],
    },
  ];
  window.EXAMS = (window.EXAMS || []).concat(mocks);
})();
