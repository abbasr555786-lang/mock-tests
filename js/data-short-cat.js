(function () {
  const mock20 = {
    id: 'cat-short-20',
    name: 'CAT — Short Mock (20 Questions)',
    template: 'cat',
    examCatalogueId: 'cat',
    kind: 'mock', scope: 'short', sectionTag: null,
    durationMin: 15,
    marking: { correct: 3, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: true,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'varc', name: 'VARC', questions: [
        {
          id: 'cat-s20-1',
          text: 'In the sentence "The committee gave only a cursory glance at the proposal before rejecting it," the word "cursory" most nearly means:',
          options: ['Hostile and aggressive', 'Hasty and superficial', 'Careful and thorough', 'Reluctant and delayed'],
          correct: 1,
          topic: 'Vocabulary',
          difficulty: 'easy',
          explanation: 'A "cursory" glance is one that is hasty and superficial, lacking attention to detail. It contrasts with a careful, thorough review, so option 2 is correct.'
        },
        {
          id: 'cat-s20-2',
          text: 'Read the passage and answer: "Coral reefs occupy less than 0.1% of the ocean floor, yet they shelter roughly a quarter of all marine species. Their decline therefore threatens biodiversity far out of proportion to their physical extent." Which inference is best supported?',
          options: [
            'Coral reefs cover most of the ocean floor.',
            'Protecting a small habitat can have a disproportionately large effect on marine biodiversity.',
            'Most marine species can survive equally well without reefs.',
            'Reef decline has no measurable effect on biodiversity.'
          ],
          correct: 1,
          topic: 'Reading-inference',
          difficulty: 'easy-medium',
          explanation: 'The passage stresses that a tiny area shelters a quarter of marine species, so safeguarding that small habitat has an outsized effect on biodiversity. Option 2 captures this; the others contradict the text.'
        },
        {
          id: 'cat-s20-3',
          text: 'Arrange sentences A-D into a coherent paragraph. A: But repeated exposure gradually dulled that initial wonder. B: When the telescope was first turned to the night sky, observers were astonished. C: Today astronomers rely on instruments far more sensitive than the human eye. D: Familiarity, however, did not reduce the value of careful observation. Choose the correct order:',
          options: ['B-A-D-C', 'A-B-C-D', 'C-B-A-D', 'B-D-A-C'],
          correct: 0,
          topic: 'Para-jumble',
          difficulty: 'medium',
          explanation: 'B introduces the first astonishment; A says repeated exposure dulled the wonder; D concedes familiarity did not reduce observation\'s value; C concludes with the modern reliance on instruments. The logical chain is B-A-D-C.'
        },
        {
          id: 'cat-s20-4',
          text: 'Choose the option that best summarizes the paragraph: "Many start-ups fail not because their product is poor, but because they scale spending before confirming that customers will pay sustainably. Discipline in early budgeting often matters more than the brilliance of the idea."',
          options: [
            'Brilliant ideas guarantee start-up success.',
            'Start-ups should never spend money in early stages.',
            'Early financial discipline can matter more to start-up survival than product quality.',
            'Customers rarely pay for new products.'
          ],
          correct: 2,
          topic: 'Para-summary',
          difficulty: 'medium-hard',
          explanation: 'The paragraph argues failure often stems from premature scaling of spending, and that budgeting discipline can outweigh the idea\'s brilliance. Option 3 restates this; the others overstate or distort the claim.'
        },
        {
          id: 'cat-s20-5',
          text: 'Identify the sentence that does NOT belong with the others. (1) The library extended its hours during exam week. (2) Students could now study late into the night. (3) The cafeteria introduced a new dessert menu. (4) Extra reading lamps were installed in the reading hall.',
          options: ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'],
          correct: 2,
          topic: 'Odd sentence',
          difficulty: 'easy-medium',
          explanation: 'Sentences 1, 2 and 4 all concern study support during exam week (hours, late study, lamps). Sentence 3 about a dessert menu is unrelated, so it is the odd one out.'
        },
        {
          id: 'cat-s20-6',
          text: 'Choose the grammatically correct sentence:',
          options: [
            'Neither the manager nor the employees was informed of the change.',
            'Neither the manager nor the employees were informed of the change.',
            'Neither the manager or the employees were informed of the change.',
            'Neither the manager nor the employees is informed of the change.'
          ],
          correct: 1,
          topic: 'Grammar',
          difficulty: 'medium',
          explanation: 'In "neither...nor" constructions the verb agrees with the nearer subject ("employees", plural), so "were" is correct. "Nor" (not "or") must follow "neither", eliminating option 3.'
        },
        {
          id: 'cat-s20-7',
          text: 'In the sentence "Her tenacious refusal to abandon the experiment eventually paid off," the word "tenacious" most nearly means:',
          options: ['Persistent and determined', 'Careless and impulsive', 'Cheerful and relaxed', 'Brief and temporary'],
          correct: 0,
          topic: 'Vocabulary',
          difficulty: 'hard',
          explanation: '"Tenacious" describes holding firmly and persistently to a purpose. A tenacious refusal is a determined, persistent one, so option 1 is correct.'
        }
      ]},
      { id: 'dilr', name: 'DILR', questions: [
        {
          id: 'cat-s20-8',
          text: 'A shop sold 3 product types in a day: Tea 40 units, Coffee 25 units, Juice 15 units. What percentage of total units sold was Coffee? (Round to nearest whole percent.)',
          options: ['25%', '31%', '35%', '20%'],
          correct: 1,
          topic: 'Small tables/ratios',
          difficulty: 'easy',
          explanation: 'Total = 40 + 25 + 15 = 80. Coffee share = 25 ÷ 80 = 0.3125 = 31.25%, which rounds to 31%.'
        },
        {
          id: 'cat-s20-9',
          text: 'Four friends P, Q, R, S sit in a row of 4 chairs (positions 1 to 4, left to right). Both conditions hold: (i) Q is immediately to the left of P; (ii) R sits at the right end (position 4). Which arrangement (left to right) is valid?',
          options: ['Q P R S', 'P Q R S', 'R S Q P', 'S Q P R'],
          correct: 3,
          topic: 'Simple arrangements',
          difficulty: 'medium',
          explanation: 'Condition (ii) requires R in position 4. "Q P R S" has R in position 3 (fails ii). "P Q R S" also has R in position 3 (fails ii). "R S Q P" has R in position 1 (fails ii). "S Q P R" has R in position 4 (passes ii), and Q (position 2) is immediately left of P (position 3), satisfying (i). So option 4 is the only valid arrangement.'
        },
        {
          id: 'cat-s20-10',
          text: 'In a class of 30 students, 18 study French and 14 study Spanish; 5 study both. How many study neither language?',
          options: ['3', '5', '7', '8'],
          correct: 0,
          topic: 'Venn',
          difficulty: 'medium-hard',
          explanation: 'Students studying at least one = 18 + 14 − 5 = 27. Neither = 30 − 27 = 3.'
        },
        {
          id: 'cat-s20-11',
          text: 'Data sufficiency: Is integer N even? Statement I: N is the product of two consecutive integers. Statement II: N is greater than 10. Which is sufficient?',
          options: [
            'Statement I alone is sufficient.',
            'Statement II alone is sufficient.',
            'Both together are needed.',
            'Neither is sufficient.'
          ],
          correct: 0,
          topic: 'Data sufficiency',
          difficulty: 'hard',
          explanation: 'The product of two consecutive integers always includes one even factor, so it is always even (e.g., 3×4=12). Statement I alone settles that N is even. Statement II (N>10) tells nothing about parity. So I alone is sufficient.'
        },
        {
          id: 'cat-s20-12',
          text: 'A bakery records sales (in dozens): Mon 6, Tue 9, Wed 6, Thu 9, Fri 15. What is the average daily sales in dozens over the 5 days?',
          options: ['8', '9', '10', '9.5'],
          correct: 1,
          topic: 'Small tables/ratios',
          difficulty: 'easy-medium',
          explanation: 'Sum = 6 + 9 + 6 + 9 + 15 = 45. Average = 45 ÷ 5 = 9 dozens per day.'
        },
        {
          id: 'cat-s20-13',
          text: 'Three machines X, Y, Z produced items in the ratio 2 : 3 : 5. If total output was 400 items, how many did machine Z produce?',
          options: ['80', '120', '200', '160'],
          correct: 2,
          topic: 'Small tables/ratios',
          difficulty: 'medium',
          explanation: 'Total ratio parts = 2 + 3 + 5 = 10. Each part = 400 ÷ 10 = 40. Z = 5 × 40 = 200 items.'
        },
        {
          id: 'cat-s20-14',
          text: 'Data sufficiency: What is the value of x? Statement I: 2x + 3 = 11. Statement II: x is a positive even integer less than 6. Which is sufficient to find x uniquely?',
          options: [
            'Statement I alone is sufficient.',
            'Statement II alone is sufficient.',
            'Both statements together are required.',
            'Neither statement is sufficient.'
          ],
          correct: 0,
          topic: 'Data sufficiency',
          difficulty: 'easy-medium',
          explanation: 'From I: 2x = 8, so x = 4 uniquely. Statement II allows x = 2 or 4 (positive even, less than 6), not unique. So I alone is sufficient.'
        }
      ]},
      { id: 'qa', name: 'Quantitative Ability', questions: [
        {
          id: 'cat-s20-15',
          text: 'A shopkeeper marks an item 40% above cost and then gives a 25% discount on the marked price. What is his profit percent?',
          options: ['5%', '10%', '15%', '12%'],
          correct: 0,
          topic: 'Arithmetic (%)',
          difficulty: 'medium',
          explanation: 'Let cost = 100. Marked price = 140. Selling price = 140 × 0.75 = 105. Profit = 105 − 100 = 5 on cost 100, so profit = 5%.'
        },
        {
          id: 'cat-s20-16',
          text: 'Two trains move toward each other from stations 360 km apart at speeds 50 km/h and 70 km/h. After how many hours do they meet?',
          options: ['2', '3', '4', '5'],
          correct: 1,
          topic: 'TSD',
          difficulty: 'easy-medium',
          explanation: 'Relative speed (approaching) = 50 + 70 = 120 km/h. Time = distance ÷ relative speed = 360 ÷ 120 = 3 hours.'
        },
        {
          id: 'cat-s20-17',
          text: 'A can complete a job in 12 days and B in 18 days. Working together, how many days do they take to finish the job?',
          options: ['7.2', '6', '7.5', '8'],
          correct: 0,
          topic: 'Work',
          difficulty: 'medium-hard',
          explanation: 'A\'s rate = 1/12, B\'s rate = 1/18 per day. Combined = 1/12 + 1/18 = 3/36 + 2/36 = 5/36. Time = 36/5 = 7.2 days.'
        },
        {
          id: 'cat-s20-18',
          text: 'If √(x + 9) = 5, what is the value of x?',
          options: ['16', '4', '25', '14'],
          correct: 0,
          topic: 'Algebra',
          difficulty: 'easy',
          explanation: 'Square both sides: x + 9 = 25, so x = 25 − 9 = 16.'
        },
        {
          id: 'cat-s20-19',
          text: 'What is the remainder when 7³ is divided by 5?',
          options: ['1', '2', '3', '4'],
          correct: 2,
          topic: 'Number system',
          difficulty: 'medium',
          explanation: '7³ = 343. 343 ÷ 5 = 68 remainder 3 (since 68 × 5 = 340 and 343 − 340 = 3).'
        },
        {
          id: 'cat-s20-20',
          text: 'A rectangle has length 12 cm and width 5 cm. What is the length of its diagonal?',
          options: ['13 cm', '17 cm', '√119 cm', '15 cm'],
          correct: 0,
          topic: 'Geometry/mensuration',
          difficulty: 'hard',
          explanation: 'Diagonal = √(12² + 5²) = √(144 + 25) = √169 = 13 cm.'
        }
      ]}
    ]
  };

  const mock25 = {
    id: 'cat-short-25',
    name: 'CAT — Short Mock (25 Questions)',
    template: 'cat',
    examCatalogueId: 'cat',
    kind: 'mock', scope: 'short', sectionTag: null,
    durationMin: 20,
    marking: { correct: 3, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: true,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'varc', name: 'VARC', questions: [
        {
          id: 'cat-s25-1',
          text: 'In "The diplomat offered an ambiguous reply that satisfied no one," the word "ambiguous" most nearly means:',
          options: ['Open to more than one interpretation', 'Extremely detailed', 'Openly hostile', 'Perfectly clear'],
          correct: 0,
          topic: 'Vocabulary',
          difficulty: 'easy',
          explanation: '"Ambiguous" means having more than one possible meaning and so being unclear. That is why it satisfied no one. Option 1 is correct; it is the opposite of "clear".'
        },
        {
          id: 'cat-s25-2',
          text: 'Passage: "Although remote work cuts commuting time, several employees report that the lack of clear boundaries between home and office has lengthened their effective working hours." Which inference is best supported?',
          options: [
            'Remote work always reduces total working hours.',
            'Remote work can blur work-life boundaries and increase hours worked despite saving commute time.',
            'Commuting is the main cause of overwork.',
            'Employees universally prefer office work.'
          ],
          correct: 1,
          topic: 'Reading-inference',
          difficulty: 'medium',
          explanation: 'The passage notes saved commute time but also blurred boundaries lengthening working hours. Option 2 reflects both halves; the others overgeneralize or ignore one half of the sentence.'
        },
        {
          id: 'cat-s25-3',
          text: 'Arrange A-D into a coherent paragraph. A: Yet this convenience came at the cost of local bookshops. B: Online retailers made buying books extraordinarily easy. C: Many such shops, unable to compete on price, closed within a decade. D: Their disappearance changed the character of neighbourhood high streets. Order:',
          options: ['B-A-C-D', 'A-B-C-D', 'B-C-A-D', 'D-C-B-A'],
          correct: 0,
          topic: 'Para-jumble',
          difficulty: 'medium-hard',
          explanation: 'B states the convenience of online retail; A introduces the cost to local bookshops; C explains those shops closed; D describes the resulting change to high streets. The chain is B-A-C-D.'
        },
        {
          id: 'cat-s25-4',
          text: 'Choose the best summary: "Vaccination protects not only the individual but, by reducing transmission, also those who cannot be vaccinated. Its benefit is therefore partly collective rather than purely personal."',
          options: [
            'Vaccination benefits only the person vaccinated.',
            'Vaccination has no effect on disease transmission.',
            'Vaccination yields both individual and community-level protection.',
            'Only people who cannot be vaccinated benefit from vaccines.'
          ],
          correct: 2,
          topic: 'Para-summary',
          difficulty: 'medium',
          explanation: 'The paragraph says vaccination protects the individual and, by cutting transmission, the wider community. Option 3 captures both individual and collective benefit.'
        },
        {
          id: 'cat-s25-5',
          text: 'Identify the sentence that does NOT belong. (1) The river overflowed after three days of rain. (2) Low-lying fields were submerged. (3) Roads near the bank became impassable. (4) The town council debated a new parking fee.',
          options: ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'],
          correct: 3,
          topic: 'Odd sentence',
          difficulty: 'easy-medium',
          explanation: 'Sentences 1, 2 and 3 all describe the effects of flooding. Sentence 4 about a parking fee debate is unrelated, so it is the odd one out.'
        },
        {
          id: 'cat-s25-6',
          text: 'Choose the grammatically correct sentence:',
          options: [
            'Each of the candidates have submitted their forms.',
            'Each of the candidates has submitted their form.',
            'Each of the candidates have submitted his form.',
            'Each of the candidates having submitted their forms.'
          ],
          correct: 1,
          topic: 'Grammar',
          difficulty: 'medium-hard',
          explanation: '"Each" is singular and takes "has". The widely accepted singular "their" handles the possessive, giving "Each of the candidates has submitted their form." Option 1 uses plural "have"; option 4 is a fragment.'
        },
        {
          id: 'cat-s25-7',
          text: 'In "The new evidence cast doubt on the prosecutor\'s otherwise compelling case," the word "compelling" most nearly means:',
          options: ['Forceful and convincing', 'Confusing and weak', 'Optional and minor', 'Lengthy and dull'],
          correct: 0,
          topic: 'Vocabulary',
          difficulty: 'easy-medium',
          explanation: 'A "compelling" case is one that is forceful and convincing. The sentence implies the case was strong until new evidence appeared, so option 1 fits.'
        },
        {
          id: 'cat-s25-8',
          text: 'Passage: "Historians once treated written records as the only reliable evidence of the past. Increasingly, however, they draw on pottery, seeds and bones to reconstruct lives that left no documents." The author most likely intends to suggest that:',
          options: [
            'Written records are useless to historians.',
            'Material remains can extend historical knowledge beyond what documents alone allow.',
            'Pottery is more reliable than any written record.',
            'History before writing cannot be studied at all.'
          ],
          correct: 1,
          topic: 'Reading-inference',
          difficulty: 'hard',
          explanation: 'The passage contrasts an older reliance on documents with a growing use of material remains to study undocumented lives. Option 2 captures the broadening of evidence; the others overstate the shift.'
        },
        {
          id: 'cat-s25-9',
          text: 'In "She gave a candid assessment of the team\'s weaknesses," the word "candid" most nearly means:',
          options: ['Frank and honest', 'Vague and evasive', 'Flattering and kind', 'Angry and bitter'],
          correct: 0,
          topic: 'Vocabulary',
          difficulty: 'hard',
          explanation: '"Candid" means frank, open and honest. A candid assessment states weaknesses plainly, so option 1 is correct.'
        }
      ]},
      { id: 'dilr', name: 'DILR', questions: [
        {
          id: 'cat-s25-10',
          text: 'A survey of 50 people: 30 like tea, 25 like coffee, 10 like both. How many like neither?',
          options: ['5', '10', '15', '8'],
          correct: 0,
          topic: 'Venn',
          difficulty: 'easy',
          explanation: 'At least one = 30 + 25 − 10 = 45. Neither = 50 − 45 = 5.'
        },
        {
          id: 'cat-s25-11',
          text: 'Sales (units): Region A 120, Region B 80, Region C 100, Region D 100. What fraction of total sales came from Region A?',
          options: ['1/4', '3/10', '1/3', '2/5'],
          correct: 1,
          topic: 'Small tables/ratios',
          difficulty: 'easy-medium',
          explanation: 'Total = 120 + 80 + 100 + 100 = 400. Region A share = 120 ÷ 400 = 3/10.'
        },
        {
          id: 'cat-s25-12',
          text: 'Five books V, W, X, Y, Z are stacked (position 1 = bottom, position 5 = top). All four conditions hold: V is at the bottom; Z is at the top; X is immediately above W; Y is immediately above V. Which order (bottom to top) is valid?',
          options: ['V W X Y Z', 'V Y W X Z', 'V X W Y Z', 'W V X Y Z'],
          correct: 1,
          topic: 'Simple arrangements',
          difficulty: 'medium',
          explanation: '"W V X Y Z" fails because V is not at the bottom. "V W X Y Z" fails "Y immediately above V" (position 2 is W, not Y). "V X W Y Z" fails "X immediately above W" (X is below W there). "V Y W X Z" has V at bottom, Z at top, Y immediately above V (positions 1-2), and X immediately above W (positions 3-4) — all four conditions hold, so option 2 is valid.'
        },
        {
          id: 'cat-s25-13',
          text: 'Data sufficiency: Is the average of three integers a, b, c greater than 10? Statement I: a + b + c = 33. Statement II: each of a, b, c is positive. Which is sufficient?',
          options: [
            'Statement I alone is sufficient.',
            'Statement II alone is sufficient.',
            'Both statements together are needed.',
            'Neither is sufficient.'
          ],
          correct: 0,
          topic: 'Data sufficiency',
          difficulty: 'medium-hard',
          explanation: 'Average = sum ÷ 3. From I, sum = 33, so average = 11 > 10 regardless of individual values. Statement I alone is sufficient; II adds nothing needed.'
        },
        {
          id: 'cat-s25-14',
          text: 'A pie chart of a budget shows: Rent 90°, Food 72°, Transport 54°, Savings the rest. What percentage of the budget is Savings?',
          options: ['40%', '35%', '45%', '30%'],
          correct: 0,
          topic: 'Small tables/ratios',
          difficulty: 'medium',
          explanation: 'Used angles = 90 + 72 + 54 = 216°. Savings = 360 − 216 = 144°. Percentage = 144 ÷ 360 = 0.40 = 40%.'
        },
        {
          id: 'cat-s25-15',
          text: 'Three departments share 90 staff in the ratio 4 : 3 : 2. How many staff are in the largest department?',
          options: ['40', '30', '20', '45'],
          correct: 0,
          topic: 'Small tables/ratios',
          difficulty: 'easy-medium',
          explanation: 'Parts = 4 + 3 + 2 = 9. Each part = 90 ÷ 9 = 10. Largest = 4 × 10 = 40 staff.'
        },
        {
          id: 'cat-s25-16',
          text: 'In a group of 40, 22 play cricket, 18 play football, and 6 play both. How many play exactly one of the two sports?',
          options: ['28', '34', '40', '24'],
          correct: 0,
          topic: 'Venn',
          difficulty: 'hard',
          explanation: 'Only cricket = 22 − 6 = 16. Only football = 18 − 6 = 12. Exactly one = 16 + 12 = 28.'
        },
        {
          id: 'cat-s25-17',
          text: 'Data sufficiency: What is the two-digit number? Statement I: The sum of its digits is 9. Statement II: The tens digit is twice the units digit. Which is sufficient to find it uniquely?',
          options: [
            'Statement I alone is sufficient.',
            'Statement II alone is sufficient.',
            'Both statements together are needed.',
            'Neither is sufficient.'
          ],
          correct: 2,
          topic: 'Data sufficiency',
          difficulty: 'medium',
          explanation: 'I alone gives many numbers (18, 27, 36...). II alone gives many (21, 42, 63...). Together: tens = 2 × units and digits sum to 9, so units + 2·units = 9, units = 3, tens = 6, the number is 63. Both are needed.'
        }
      ]},
      { id: 'qa', name: 'Quantitative Ability', questions: [
        {
          id: 'cat-s25-18',
          text: 'The price of a shirt rose by 20% and then fell by 20%. Compared with the original price, the final price is:',
          options: ['Unchanged', '4% higher', '4% lower', '2% lower'],
          correct: 2,
          topic: 'Arithmetic (%)',
          difficulty: 'medium',
          explanation: 'Let price = 100. After +20%: 120. After −20%: 120 × 0.8 = 96. Final 96 vs 100 is 4% lower.'
        },
        {
          id: 'cat-s25-19',
          text: 'A car covers 150 km in 2.5 hours. At the same speed, how long will it take to cover 240 km?',
          options: ['4 hours', '3.5 hours', '4.5 hours', '5 hours'],
          correct: 0,
          topic: 'TSD',
          difficulty: 'easy',
          explanation: 'Speed = 150 ÷ 2.5 = 60 km/h. Time for 240 km = 240 ÷ 60 = 4 hours.'
        },
        {
          id: 'cat-s25-20',
          text: 'Pipe A fills a tank in 6 hours and pipe B in 12 hours. With both open, how long to fill the tank?',
          options: ['4 hours', '3 hours', '5 hours', '4.5 hours'],
          correct: 0,
          topic: 'Work',
          difficulty: 'easy-medium',
          explanation: 'Rates: 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 tank per hour. Time = 4 hours.'
        },
        {
          id: 'cat-s25-21',
          text: 'The average of five numbers is 18. If a sixth number, 30, is added, what is the new average?',
          options: ['20', '24', '19', '22'],
          correct: 0,
          topic: 'Averages',
          difficulty: 'medium',
          explanation: 'Sum of five = 5 × 18 = 90. New sum = 90 + 30 = 120. New average = 120 ÷ 6 = 20.'
        },
        {
          id: 'cat-s25-22',
          text: 'If 3x − 7 = 2x + 5, what is the value of x?',
          options: ['12', '6', '-2', '5'],
          correct: 0,
          topic: 'Algebra',
          difficulty: 'easy',
          explanation: 'Bring like terms together: 3x − 2x = 5 + 7, so x = 12.'
        },
        {
          id: 'cat-s25-23',
          text: 'How many distinct three-digit numbers can be formed using digits 1, 2, 3, 4 if no digit repeats?',
          options: ['24', '12', '64', '36'],
          correct: 0,
          topic: 'P&C & probability',
          difficulty: 'medium-hard',
          explanation: 'Choose ordered 3 of 4 digits with no repeat: 4 × 3 × 2 = 24 numbers.'
        },
        {
          id: 'cat-s25-24',
          text: 'What is the highest common factor (HCF) of 48 and 36?',
          options: ['12', '6', '24', '18'],
          correct: 0,
          topic: 'Number system',
          difficulty: 'medium',
          explanation: '48 = 2⁴ × 3 and 36 = 2² × 3². Common factors: 2² × 3 = 4 × 3 = 12. So HCF = 12.'
        },
        {
          id: 'cat-s25-25',
          text: 'A circle has radius 7 cm. What is its area? (Use π = 22/7.)',
          options: ['154 cm²', '44 cm²', '49 cm²', '308 cm²'],
          correct: 0,
          topic: 'Geometry/mensuration',
          difficulty: 'hard',
          explanation: 'Area = π r² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm².'
        }
      ]}
    ]
  };

  const mocks = [mock20, mock25];
  window.EXAMS = (window.EXAMS || []).concat(mocks);
})();
