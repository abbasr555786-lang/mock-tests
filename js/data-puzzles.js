// JamiaPrep — JMI-style Daily Challenge / Practice puzzle pool.
// These are ORIGINAL questions authored to match the topics, style and
// difficulty level of real JMI entrance papers (MBA, BA LLB, MCA, RCA).
// They are NOT past questions — never label them "Asked in <year>".
// Tag pattern matches the integrity rule: show track + subject only.
(function () {
  const puzzles = [
    { id: 'q-mba-quant-001', track: 'mba', subject: 'Quantitative', difficulty: 'medium',
      text: 'A shopkeeper marks his goods 40% above cost and then allows a discount of 25%. What is his profit percent?',
      options: ['5%', '10%', '15%', '12%'], correct: 0,
      explanation: 'Let CP = 100, so MP = 140. SP = 140 - 25% of 140 = 105. Profit = 5 on CP 100 = 5%.',
      seedPctCorrect: 47, tags: ['profit-loss'] },

    { id: 'q-mba-reason-001', track: 'mba', subject: 'Reasoning', difficulty: 'medium',
      text: 'In a certain code MANGO is written as NBOHP. How is APPLE written in that code?',
      options: ['BQQMF', 'BQPMF', 'BPQMF', 'BQQNF'], correct: 0,
      explanation: 'Each letter is shifted by +1: A->B, P->Q, P->Q, L->M, E->F => BQQMF.',
      seedPctCorrect: 53, tags: ['coding-decoding'] },

    { id: 'q-mba-quant-002', track: 'mba', subject: 'Quantitative', difficulty: 'medium',
      text: 'Three pipes can fill a tank in 4, 6 and 12 hours respectively. If all are opened together, how long will the tank take to fill?',
      options: ['2 hours', '2.5 hours', '3 hours', '3.5 hours'], correct: 0,
      explanation: 'Combined rate = 1/4 + 1/6 + 1/12 = 3/12 + 2/12 + 1/12 = 6/12 = 1/2 tank per hour => 2 hours.',
      seedPctCorrect: 51, tags: ['time-work'] },

    { id: 'q-ballb-english-001', track: 'ballb', subject: 'English', difficulty: 'medium',
      text: 'Choose the word most nearly OPPOSITE in meaning to "Candid".',
      options: ['Frank', 'Evasive', 'Honest', 'Blunt'], correct: 1,
      explanation: '"Candid" means open/frank; its antonym is "Evasive" (avoiding directness).',
      seedPctCorrect: 44, tags: ['antonym'] },

    { id: 'q-ballb-legal-001', track: 'ballb', subject: 'Legal Aptitude', difficulty: 'medium',
      text: 'Principle: A person who voluntarily accepts a known risk cannot later claim compensation for resulting harm. Facts: A spectator at a cricket match is hit by a six and injured. Can he claim damages from the organisers?',
      options: ['Yes, organisers are always liable', 'No, he accepted the known risk of the game', 'Yes, because he paid for a ticket', 'No, because cricket is a national sport'], correct: 1,
      explanation: 'This is volenti non fit injuria — voluntarily accepting a known risk bars the claim. A spectator accepts the ordinary risks of the game.',
      seedPctCorrect: 56, tags: ['volenti', 'torts'] },

    { id: 'q-mca-quant-001', track: 'mca', subject: 'Quantitative', difficulty: 'hard',
      text: 'What is the remainder when 7^100 is divided by 5?',
      options: ['1', '2', '3', '4'], correct: 0,
      explanation: '7 = 2 (mod 5). Powers of 2 mod 5 cycle 2,4,3,1 with period 4. 100 is divisible by 4, so 2^100 = 1 (mod 5).',
      seedPctCorrect: 38, tags: ['number-theory', 'modular'] },

    { id: 'q-mca-reason-001', track: 'mca', subject: 'Reasoning', difficulty: 'medium',
      text: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
      options: ['36', '40', '42', '44'], correct: 2,
      explanation: 'Differences are 4, 6, 8, 10, 12 => next term = 30 + 12 = 42. (n^2 + n pattern.)',
      seedPctCorrect: 58, tags: ['series'] },

    { id: 'q-rca-ga-001', track: 'rca', subject: 'General Awareness', difficulty: 'medium',
      text: 'The "Doctrine of Basic Structure" of the Indian Constitution was propounded by the Supreme Court in which landmark case?',
      options: ['Golaknath case', 'Kesavananda Bharati case', 'Minerva Mills case', 'Maneka Gandhi case'], correct: 1,
      explanation: 'The Basic Structure doctrine was established in Kesavananda Bharati v. State of Kerala (1973).',
      seedPctCorrect: 49, tags: ['polity'] },

    { id: 'q-general-reason-001', track: 'general', subject: 'Reasoning', difficulty: 'medium',
      text: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
      options: ['0°', '7.5°', '30°', '37.5°'], correct: 1,
      explanation: 'Minute hand at 90°. Hour hand at 3*30 + 15*0.5 = 97.5°. Difference = 7.5°.',
      seedPctCorrect: 41, tags: ['clocks'] },

    { id: 'q-general-quant-001', track: 'general', subject: 'Quantitative', difficulty: 'medium',
      text: 'The average of five consecutive even numbers is 16. What is the largest of them?',
      options: ['18', '20', '22', '24'], correct: 1,
      explanation: 'Five consecutive evens averaging 16 are 12,14,16,18,20. Largest = 20.',
      seedPctCorrect: 62, tags: ['averages'] },

    { id: 'q-general-english-001', track: 'general', subject: 'English', difficulty: 'medium',
      text: 'Choose the correctly spelt word.',
      options: ['Occassion', 'Ocassion', 'Occasion', 'Occasssion'], correct: 2,
      explanation: '"Occasion" — one c-c pair, single s. The others are common misspellings.',
      seedPctCorrect: 55, tags: ['spelling'] },

    { id: 'q-general-reason-002', track: 'general', subject: 'Reasoning', difficulty: 'hard',
      text: 'If FRIEND is coded as HUMJTK, then how is CANDLE coded?',
      options: ['EDRIRL', 'DCQHQK', 'ESJKCJ', 'FYOBOC'], correct: 0,
      explanation: 'Letters shift by +2, +3, +4, +5, +6, +7: C+2=E, A+3=D, N+4=R, D+5=I, L+6=R, E+7=L => EDRIRL.',
      seedPctCorrect: 33, tags: ['coding-decoding'] },

    // ---- additional pool ----

    { id: 'q-mba-quant-003', track: 'mba', subject: 'Quantitative', difficulty: 'medium',
      text: 'A sum of money doubles itself in 8 years at simple interest. In how many years will it become four times?',
      options: ['16 years', '24 years', '32 years', '20 years'], correct: 1,
      explanation: 'Doubling means interest = principal in 8 yrs, so rate makes interest = P every 8 yrs. To become 4 times, total interest = 3P, needing 3 x 8 = 24 years.',
      seedPctCorrect: 46, tags: ['simple-interest'] },

    { id: 'q-mba-di-001', track: 'mba', subject: 'Data Interpretation', difficulty: 'medium',
      text: 'A company sold 1200 units in 2021 and 1500 units in 2022. What is the percentage increase in units sold?',
      options: ['20%', '25%', '30%', '15%'], correct: 1,
      explanation: 'Increase = 300 on a base of 1200 => 300/1200 = 25%.',
      seedPctCorrect: 57, tags: ['percentage', 'growth'] },

    { id: 'q-mba-english-001', track: 'mba', subject: 'English', difficulty: 'medium',
      text: 'Choose the word that best fills the blank: "His argument was so ___ that no one could find a flaw in it."',
      options: ['cogent', 'tenuous', 'verbose', 'spurious'], correct: 0,
      explanation: '"Cogent" means clear, logical and convincing — fitting a flawless argument. The others imply weakness or excess.',
      seedPctCorrect: 43, tags: ['vocabulary'] },

    { id: 'q-mba-reason-002', track: 'mba', subject: 'Reasoning', difficulty: 'hard',
      text: 'Pointing to a photograph, a man said, "She is the daughter of my grandfather\'s only son." How is the woman related to the man?',
      options: ['Sister', 'Daughter', 'Cousin', 'Niece'], correct: 0,
      explanation: 'Grandfather\'s only son is the man\'s own father; the father\'s daughter is the man\'s sister.',
      seedPctCorrect: 39, tags: ['blood-relations'] },

    { id: 'q-mba-quant-004', track: 'mba', subject: 'Quantitative', difficulty: 'medium',
      text: 'If the ratio of two numbers is 3:5 and their sum is 64, what is the larger number?',
      options: ['24', '40', '32', '45'], correct: 1,
      explanation: 'Parts total 8 = 64, so 1 part = 8. Larger = 5 x 8 = 40.',
      seedPctCorrect: 60, tags: ['ratio'] },

    { id: 'q-ballb-legal-002', track: 'ballb', subject: 'Legal Aptitude', difficulty: 'medium',
      text: 'Principle: An agreement made without free consent is voidable at the option of the party whose consent was so caused. Facts: A signs a contract because B threatened to harm A\'s family. Is the contract enforceable?',
      options: ['Yes, a signed contract is always binding', 'No, it is voidable as consent was caused by coercion', 'Yes, because A actually signed it', 'No, it is void from the very beginning'], correct: 1,
      explanation: 'Consent obtained by coercion makes a contract voidable (not void ab initio) at the option of the aggrieved party A.',
      seedPctCorrect: 52, tags: ['contract', 'coercion'] },

    { id: 'q-ballb-ga-001', track: 'ballb', subject: 'General Awareness', difficulty: 'medium',
      text: 'Which Article of the Indian Constitution guarantees the Right to Constitutional Remedies?',
      options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'], correct: 3,
      explanation: 'Article 32 lets a person move the Supreme Court for enforcement of fundamental rights; Dr. Ambedkar called it the "heart and soul" of the Constitution.',
      seedPctCorrect: 50, tags: ['polity', 'fundamental-rights'] },

    { id: 'q-ballb-reason-001', track: 'ballb', subject: 'Reasoning', difficulty: 'medium',
      text: 'Statements: All judges are lawyers. Some lawyers are writers. Conclusion: Some judges are writers. Is the conclusion valid?',
      options: ['Definitely true', 'Definitely false', 'Does not necessarily follow', 'Cannot be a syllogism'], correct: 2,
      explanation: 'The writers among lawyers need not include any judge, so the link is not guaranteed; the conclusion does not necessarily follow.',
      seedPctCorrect: 42, tags: ['syllogism'] },

    { id: 'q-ballb-english-002', track: 'ballb', subject: 'English', difficulty: 'medium',
      text: 'Identify the grammatically correct sentence.',
      options: ['Neither of the boys have done their homework.', 'Neither of the boys has done his homework.', 'Neither of the boys have done his homework.', 'Neither of the boys has done their homeworks.'], correct: 1,
      explanation: '"Neither" is singular, requiring "has" and the singular pronoun "his". "Homework" is uncountable.',
      seedPctCorrect: 45, tags: ['grammar', 'agreement'] },

    { id: 'q-ballb-legal-003', track: 'ballb', subject: 'Legal Aptitude', difficulty: 'hard',
      text: 'Principle: A master is liable for the wrongful acts of his servant committed in the course of employment. Facts: A delivery driver, while making deliveries for his employer, negligently injures a pedestrian. Who is liable?',
      options: ['Only the driver', 'Only the employer', 'Both driver and employer (vicarious liability)', 'Neither, it was an accident'], correct: 2,
      explanation: 'Under vicarious liability the employer is liable for the servant\'s tort in the course of employment; the driver remains personally liable too, so both are liable.',
      seedPctCorrect: 37, tags: ['vicarious-liability', 'torts'] },

    { id: 'q-mca-quant-002', track: 'mca', subject: 'Quantitative', difficulty: 'medium',
      text: 'How many distinct ways can the letters of the word "LEVEL" be arranged?',
      options: ['60', '30', '120', '20'], correct: 1,
      explanation: 'LEVEL has 5 letters with L repeated twice and E repeated twice: 5!/(2!*2!) = 120/4 = 30.',
      seedPctCorrect: 44, tags: ['permutations'] },

    { id: 'q-mca-comp-001', track: 'mca', subject: 'Computer Aptitude', difficulty: 'medium',
      text: 'What is the decimal value of the binary number 1011?',
      options: ['9', '11', '13', '7'], correct: 1,
      explanation: '1011 = 8 + 0 + 2 + 1 = 11.',
      seedPctCorrect: 59, tags: ['number-system', 'binary'] },

    { id: 'q-mca-comp-002', track: 'mca', subject: 'Computer Aptitude', difficulty: 'medium',
      text: 'In computing, 1 kilobyte (KB) is conventionally equal to how many bytes?',
      options: ['1000 bytes', '1024 bytes', '512 bytes', '2048 bytes'], correct: 1,
      explanation: 'By the binary convention used in computer aptitude, 1 KB = 2^10 = 1024 bytes.',
      seedPctCorrect: 54, tags: ['memory-units'] },

    { id: 'q-mca-quant-003', track: 'mca', subject: 'Quantitative', difficulty: 'hard',
      text: 'How many positive integers less than 100 are divisible by neither 2 nor 3?',
      options: ['33', '34', '32', '30'], correct: 0,
      explanation: 'From 1 to 99: divisible by 2 = 49, by 3 = 33, by 6 = 16. By inclusion-exclusion divisible by 2 or 3 = 49+33-16 = 66. Neither = 99 - 66 = 33.',
      seedPctCorrect: 34, tags: ['number-theory', 'counting'] },

    { id: 'q-mca-reason-002', track: 'mca', subject: 'Reasoning', difficulty: 'medium',
      text: 'Find the odd one out: 8, 27, 64, 100, 125.',
      options: ['27', '64', '100', '125'], correct: 2,
      explanation: '8, 27, 64, 125 are perfect cubes (2^3, 3^3, 4^3, 5^3). 100 is not a perfect cube.',
      seedPctCorrect: 56, tags: ['odd-one-out'] },

    { id: 'q-mca-quant-004', track: 'mca', subject: 'Quantitative', difficulty: 'medium',
      text: 'If A = {1, 2, 3} and B = {2, 3, 4}, how many elements are in A union B?',
      options: ['3', '4', '5', '6'], correct: 1,
      explanation: 'A union B = {1, 2, 3, 4}, which has 4 elements.',
      seedPctCorrect: 61, tags: ['set-theory'] },

    { id: 'q-rca-reason-001', track: 'rca', subject: 'Reasoning', difficulty: 'medium',
      text: 'If in a certain year 1st January is a Monday, what day is 1st February of the same (non-leap) year?',
      options: ['Wednesday', 'Thursday', 'Tuesday', 'Friday'], correct: 1,
      explanation: 'January has 31 days = 4 weeks + 3 days. So 1 Feb is 3 days after Monday = Thursday.',
      seedPctCorrect: 48, tags: ['calendar'] },

    { id: 'q-rca-polity-001', track: 'rca', subject: 'Polity', difficulty: 'medium',
      text: 'Who has the power to summon and prorogue the sessions of the Indian Parliament?',
      options: ['The Prime Minister', 'The Speaker of Lok Sabha', 'The President', 'The Vice-President'], correct: 2,
      explanation: 'Under Article 85, the President summons and prorogues each House of Parliament and may dissolve the Lok Sabha.',
      seedPctCorrect: 47, tags: ['polity', 'parliament'] },

    { id: 'q-rca-ga-002', track: 'rca', subject: 'General Awareness', difficulty: 'medium',
      text: 'The headquarters of the World Health Organization (WHO) is located in which city?',
      options: ['New York', 'Geneva', 'Paris', 'Vienna'], correct: 1,
      explanation: 'The WHO is headquartered in Geneva, Switzerland.',
      seedPctCorrect: 53, tags: ['international-organisations'] },

    { id: 'q-rca-current-001', track: 'rca', subject: 'Current Affairs', difficulty: 'medium',
      text: 'India\'s national space agency, responsible for missions like Chandrayaan and Mangalyaan, is known by which abbreviation?',
      options: ['DRDO', 'ISRO', 'NASA', 'BARC'], correct: 1,
      explanation: 'ISRO (Indian Space Research Organisation) conducts these missions. DRDO handles defence research and BARC handles atomic research.',
      seedPctCorrect: 64, tags: ['science-tech', 'space'] },

    { id: 'q-rca-polity-002', track: 'rca', subject: 'Polity', difficulty: 'hard',
      text: 'Under the Indian Constitution, a money bill can be introduced only in which House and on whose recommendation?',
      options: ['Rajya Sabha, on the Speaker\'s recommendation', 'Lok Sabha, on the President\'s recommendation', 'Either House, on the PM\'s recommendation', 'Lok Sabha, on the Finance Minister\'s recommendation'], correct: 1,
      explanation: 'Article 110 requires a money bill to be introduced only in the Lok Sabha and only on the recommendation of the President.',
      seedPctCorrect: 35, tags: ['polity', 'legislation'] },

    { id: 'q-rca-ga-003', track: 'rca', subject: 'General Awareness', difficulty: 'medium',
      text: 'Which river is known as the "Sorrow of Bihar" due to its recurrent flooding?',
      options: ['Gandak', 'Kosi', 'Son', 'Ganga'], correct: 1,
      explanation: 'The Kosi river is called the "Sorrow of Bihar" because of its frequent course changes and devastating floods.',
      seedPctCorrect: 46, tags: ['geography', 'rivers'] },

    { id: 'q-general-quant-002', track: 'general', subject: 'Quantitative', difficulty: 'medium',
      text: 'A train 150 metres long crosses a pole in 15 seconds. What is its speed in km/h?',
      options: ['36 km/h', '40 km/h', '45 km/h', '30 km/h'], correct: 0,
      explanation: 'Speed = 150/15 = 10 m/s. Multiply by 18/5: 10 x 18/5 = 36 km/h.',
      seedPctCorrect: 52, tags: ['speed-distance'] },

    { id: 'q-general-reason-003', track: 'general', subject: 'Reasoning', difficulty: 'medium',
      text: 'Complete the analogy: Doctor is to Hospital as Teacher is to ___ ?',
      options: ['Student', 'Books', 'School', 'Lesson'], correct: 2,
      explanation: 'A doctor works in a hospital; a teacher works in a school (workplace relationship).',
      seedPctCorrect: 66, tags: ['analogy'] },

    { id: 'q-general-quant-003', track: 'general', subject: 'Quantitative', difficulty: 'hard',
      text: 'What is the compound interest on Rs. 8000 at 10% per annum for 2 years, compounded annually?',
      options: ['Rs. 1600', 'Rs. 1680', 'Rs. 1700', 'Rs. 1640'], correct: 1,
      explanation: 'Amount = 8000 x (1.1)^2 = 8000 x 1.21 = 9680. CI = 9680 - 8000 = 1680.',
      seedPctCorrect: 40, tags: ['compound-interest'] },

    { id: 'q-general-english-002', track: 'general', subject: 'English', difficulty: 'medium',
      text: 'Choose the correct meaning of the idiom "to bite the bullet".',
      options: ['To act recklessly', 'To endure a painful situation bravely', 'To eat very fast', 'To start a fight'], correct: 1,
      explanation: '"To bite the bullet" means to face a difficult or painful situation with courage.',
      seedPctCorrect: 49, tags: ['idioms'] },

    { id: 'q-general-reason-004', track: 'general', subject: 'Reasoning', difficulty: 'medium',
      text: 'Arrange in a logical sequence: 1. Seed  2. Tree  3. Flower  4. Fruit  5. Plant',
      options: ['1, 5, 2, 3, 4', '1, 2, 5, 3, 4', '5, 1, 2, 3, 4', '1, 5, 3, 2, 4'], correct: 0,
      explanation: 'A seed grows into a plant, which becomes a tree, which bears flowers and then fruit: 1, 5, 2, 3, 4.',
      seedPctCorrect: 55, tags: ['logical-sequence'] },

    { id: 'q-general-quant-004', track: 'general', subject: 'Quantitative', difficulty: 'hard',
      text: 'A can do a piece of work in 12 days and B in 18 days. They work together for 4 days, then A leaves. In how many more days will B finish the remaining work?',
      options: ['6 days', '7 days', '8 days', '5 days'], correct: 2,
      explanation: 'In 4 days together they do 4 x (1/12 + 1/18) = 4 x (3/36 + 2/36) = 4 x 5/36 = 20/36 = 5/9. Remaining = 4/9. B alone does 1/18 per day, so time = (4/9) / (1/18) = (4/9) x 18 = 8 days.',
      seedPctCorrect: 36, tags: ['time-work'] },
  ];

  window.PUZZLES = (window.PUZZLES || []).concat(puzzles);
})();
