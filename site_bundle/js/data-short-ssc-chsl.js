(function () {
  const mock20 = {
    id: 'ssc-chsl-short-20',
    name: 'SSC CHSL — Short Mock (20 Questions)',
    template: 'ssc',
    examCatalogueId: 'ssc-chsl',
    kind: 'mock', scope: 'short', sectionTag: null,
    durationMin: 15,
    marking: { correct: 2, wrong: -0.5, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'gi', name: 'General Intelligence (Reasoning)', questions: [
        { id: 'ssc-chsl-s20-1', text: 'Find the next term in the series: 3, 7, 15, 31, 63, ?', options: ['95', '111', '127', '129'], correct: 2, topic: 'Series', difficulty: 'easy-medium', explanation: 'Each term is doubled and 1 is added: 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63, 63×2+1=127. So the next term is 127.' },
        { id: 'ssc-chsl-s20-2', text: 'If FLOWER is coded as GMPXFS, how is GARDEN coded?', options: ['HBSEFO', 'HBSDFO', 'GBSEFO', 'HBTEFO'], correct: 0, topic: 'Coding-Decoding', difficulty: 'medium', explanation: 'Each letter is shifted forward by 1: F→G, L→M, O→P, W→X, E→F, R→S. Applying the same to GARDEN: G→H, A→B, R→S, D→E, E→F, N→O gives HBSEFO.' },
        { id: 'ssc-chsl-s20-3', text: 'Select the pair that is analogous to the given pair. Pen : Write :: Knife : ?', options: ['Sharp', 'Cut', 'Metal', 'Blade'], correct: 1, topic: 'Analogy', difficulty: 'easy', explanation: 'A pen is a tool used to write; analogously a knife is a tool used to cut. So the answer is Cut.' },
        { id: 'ssc-chsl-s20-4', text: 'Pointing to a photograph, a man said, "She is the daughter of my grandfather’s only son." How is the woman in the photograph related to the man?', options: ['Sister', 'Mother', 'Daughter', 'Cousin'], correct: 0, topic: 'Blood Relations', difficulty: 'medium-hard', explanation: 'The grandfather’s only son is the man’s own father. The daughter of the man’s father is the man’s sister.' },
        { id: 'ssc-chsl-s20-5', text: 'Select the odd one out: 64, 125, 216, 100, 343', options: ['64', '125', '100', '343'], correct: 2, topic: 'Classification', difficulty: 'easy-medium', explanation: '64=4³, 125=5³, 216=6³, 343=7³ are all perfect cubes, but 100=10² is a perfect square, not a cube. So 100 is the odd one out.' },
      ]},
      { id: 'ga', name: 'General Awareness', questions: [
        { id: 'ssc-chsl-s20-6', text: 'The First Battle of Panipat (1526) was fought between Babur and:', options: ['Rana Sanga', 'Ibrahim Lodi', 'Hemu', 'Sher Shah Suri'], correct: 1, topic: 'History', difficulty: 'easy', explanation: 'In the First Battle of Panipat (1526), Babur defeated Ibrahim Lodi, the last Sultan of the Delhi Sultanate, founding the Mughal Empire.' },
        { id: 'ssc-chsl-s20-7', text: 'Which Schedule of the Indian Constitution lists the officially recognised languages?', options: ['Fifth Schedule', 'Seventh Schedule', 'Eighth Schedule', 'Tenth Schedule'], correct: 2, topic: 'Polity', difficulty: 'medium', explanation: 'The Eighth Schedule of the Constitution lists the officially recognised languages (currently 22). The Tenth Schedule deals with anti-defection.' },
        { id: 'ssc-chsl-s20-8', text: 'Which is the southernmost point of mainland India?', options: ['Indira Point', 'Kanyakumari', 'Rameswaram', 'Dhanushkodi'], correct: 1, topic: 'Geography', difficulty: 'medium-hard', explanation: 'Kanyakumari (Cape Comorin) is the southernmost point of the Indian mainland. Indira Point, in the Nicobar Islands, is the southernmost point of Indian territory overall.' },
        { id: 'ssc-chsl-s20-9', text: 'Which is the lightest element in the periodic table?', options: ['Helium', 'Hydrogen', 'Lithium', 'Oxygen'], correct: 1, topic: 'Science', difficulty: 'easy', explanation: 'Hydrogen, with atomic number 1 and a single proton, is the lightest element in the periodic table.' },
        { id: 'ssc-chsl-s20-10', text: 'Which is the national aquatic animal of India?', options: ['Blue whale', 'Gangetic river dolphin', 'Olive ridley turtle', 'Saltwater crocodile'], correct: 1, topic: 'Static GK', difficulty: 'easy-medium', explanation: 'The Gangetic river dolphin was declared the national aquatic animal of India in 2009.' },
      ]},
      { id: 'qa', name: 'Quantitative Aptitude', questions: [
        { id: 'ssc-chsl-s20-11', text: 'If the price of an article is increased by 25%, by what percentage must the new price be decreased to bring it back to the original price?', options: ['20%', '25%', '15%', '30%'], correct: 0, topic: 'Percentage', difficulty: 'medium', explanation: 'Let original price = 100. After 25% increase, new price = 125. To return to 100, decrease = 25 on 125 = 25/125 × 100 = 20%.' },
        { id: 'ssc-chsl-s20-12', text: 'The average of seven consecutive whole numbers is 20. What is the largest of these numbers?', options: ['22', '23', '24', '25'], correct: 1, topic: 'Average', difficulty: 'medium', explanation: 'For seven consecutive numbers the average equals the middle (fourth) number, which is 20. The numbers are 17, 18, 19, 20, 21, 22, 23; the largest is 23.' },
        { id: 'ssc-chsl-s20-13', text: 'A man buys an article for ₹400 and sells it for ₹460. What is his profit percentage?', options: ['12%', '15%', '18%', '20%'], correct: 1, topic: 'Profit and Loss', difficulty: 'easy', explanation: 'Profit = 460 − 400 = 60. Profit % = 60/400 × 100 = 15%.' },
        { id: 'ssc-chsl-s20-14', text: 'A and B together can finish a work in 12 days, and A alone can finish it in 20 days. In how many days can B alone finish the work?', options: ['24 days', '30 days', '28 days', '32 days'], correct: 1, topic: 'Time and Work', difficulty: 'medium-hard', explanation: 'A+B do 1/12 per day, A does 1/20 per day. B’s rate = 1/12 − 1/20 = (5−3)/60 = 2/60 = 1/30. So B alone takes 30 days.' },
        { id: 'ssc-chsl-s20-15', text: 'Find the simple interest on ₹6000 at 8% per annum for 2 years.', options: ['₹840', '₹920', '₹960', '₹1000'], correct: 2, topic: 'Simple Interest', difficulty: 'easy-medium', explanation: 'SI = (P × R × T)/100 = (6000 × 8 × 2)/100 = 96000/100 = ₹960.' },
      ]},
      { id: 'en', name: 'English Language', questions: [
        { id: 'ssc-chsl-s20-16', text: 'Select the synonym of the word ABUNDANT.', options: ['Scarce', 'Plentiful', 'Limited', 'Rare'], correct: 1, topic: 'Synonyms', difficulty: 'easy', explanation: 'Abundant means existing in large quantities, i.e. plentiful. The other options mean the opposite.' },
        { id: 'ssc-chsl-s20-17', text: 'Select the antonym of the word HUMBLE.', options: ['Modest', 'Arrogant', 'Simple', 'Polite'], correct: 1, topic: 'Antonyms', difficulty: 'easy-medium', explanation: 'Humble means modest or having a low opinion of one’s importance; its antonym is arrogant.' },
        { id: 'ssc-chsl-s20-18', text: 'Select the meaning of the idiom: "To bite the dust".', options: ['To eat hurriedly', 'To be defeated or to die', 'To work very hard', 'To become dirty'], correct: 1, topic: 'Idioms', difficulty: 'medium', explanation: 'The idiom "to bite the dust" means to be defeated, to fail, or to die.' },
        { id: 'ssc-chsl-s20-19', text: 'Select the one-word substitution for "A place where bees are kept".', options: ['Aviary', 'Apiary', 'Aquarium', 'Hive'], correct: 1, topic: 'One-word Substitution', difficulty: 'medium-hard', explanation: 'An apiary is a place where bees (in their hives) are kept. An aviary houses birds and an aquarium houses fish.' },
        { id: 'ssc-chsl-s20-20', text: 'Identify the part of the sentence that contains an error: "Neither of the boys / have completed / their homework / on time."', options: ['Neither of the boys', 'have completed', 'their homework', 'on time'], correct: 1, topic: 'Error Spotting', difficulty: 'hard', explanation: '"Neither" is singular and takes a singular verb, so "have completed" should be "has completed". The error is in the second part.' },
      ]},
    ],
  };

  const mock25 = {
    id: 'ssc-chsl-short-25',
    name: 'SSC CHSL — Short Mock (25 Questions)',
    template: 'ssc',
    examCatalogueId: 'ssc-chsl',
    kind: 'mock', scope: 'short', sectionTag: null,
    durationMin: 20,
    marking: { correct: 2, wrong: -0.5, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'gi', name: 'General Intelligence (Reasoning)', questions: [
        { id: 'ssc-chsl-s25-1', text: 'Find the next term in the series: 5, 11, 23, 47, 95, ?', options: ['181', '189', '191', '195'], correct: 2, topic: 'Series', difficulty: 'medium', explanation: 'Each term is doubled and 1 is added: 5×2+1=11, 11×2+1=23, 23×2+1=47, 47×2+1=95, 95×2+1=191. So the next term is 191.' },
        { id: 'ssc-chsl-s25-2', text: 'If in a certain code MANGO is written as NBOHP, then how is APPLE written?', options: ['BQQMF', 'BQPMF', 'BQQNF', 'BPQMF'], correct: 0, topic: 'Coding-Decoding', difficulty: 'easy-medium', explanation: 'Each letter is shifted forward by 1: M→N, A→B, N→O, G→H, O→P. Applying to APPLE: A→B, P→Q, P→Q, L→M, E→F gives BQQMF.' },
        { id: 'ssc-chsl-s25-3', text: 'Select the pair that is analogous to the given pair. Doctor : Hospital :: Teacher : ?', options: ['Student', 'Book', 'School', 'Lesson'], correct: 2, topic: 'Analogy', difficulty: 'easy', explanation: 'A doctor works in a hospital; analogously a teacher works in a school. So the answer is School.' },
        { id: 'ssc-chsl-s25-4', text: 'A girl is facing south. She turns 90° clockwise, then 180° anticlockwise, and then 45° clockwise. Which direction is she facing now?', options: ['North-East', 'South-East', 'North-West', 'East'], correct: 1, topic: 'Directions', difficulty: 'medium-hard', explanation: 'Facing south, 90° clockwise gives west. 180° anticlockwise gives east. 45° clockwise from east gives south-east.' },
        { id: 'ssc-chsl-s25-5', text: 'P is the brother of Q, and Q is the mother of R. How is P related to R?', options: ['Father', 'Maternal uncle', 'Brother', 'Cousin'], correct: 1, topic: 'Blood Relations', difficulty: 'medium', explanation: 'Q is R\'s mother, and P is Q\'s brother, so P is the brother of R\'s mother — i.e. R\'s maternal uncle.' },
        { id: 'ssc-chsl-s25-6', text: 'Select the odd one out: 17, 23, 29, 33, 41', options: ['17', '23', '33', '41'], correct: 2, topic: 'Classification', difficulty: 'easy-medium', explanation: '17, 23, 29 and 41 are all prime numbers, but 33 = 3 × 11 is composite. So 33 is the odd one out.' },
        { id: 'ssc-chsl-s25-7', text: 'Find the missing number: 6, 13, 27, 55, ?', options: ['109', '110', '111', '112'], correct: 2, topic: 'Series', difficulty: 'hard', explanation: 'Each term is doubled and 1 is added: 6×2+1=13, 13×2+1=27, 27×2+1=55, 55×2+1=111. So the next term is 111.' },
      ]},
      { id: 'ga', name: 'General Awareness', questions: [
        { id: 'ssc-chsl-s25-8', text: 'Who was the first Governor-General of independent India?', options: ['C. Rajagopalachari', 'Lord Mountbatten', 'Lord Canning', 'Warren Hastings'], correct: 1, topic: 'History', difficulty: 'medium', explanation: 'Lord Mountbatten was the first Governor-General of independent India (1947–1948). C. Rajagopalachari was the first Indian and last Governor-General.' },
        { id: 'ssc-chsl-s25-9', text: 'The Directive Principles of State Policy in the Indian Constitution were borrowed from the constitution of which country?', options: ['United States', 'Ireland', 'United Kingdom', 'Canada'], correct: 1, topic: 'Polity', difficulty: 'medium-hard', explanation: 'The Directive Principles of State Policy were borrowed from the Constitution of Ireland (which had in turn drawn on the Spanish model).' },
        { id: 'ssc-chsl-s25-10', text: 'Which Indian state shares the longest border with Bangladesh?', options: ['Assam', 'Tripura', 'West Bengal', 'Meghalaya'], correct: 2, topic: 'Geography', difficulty: 'easy', explanation: 'West Bengal shares the longest stretch of India\'s border with Bangladesh (about 2,200 km).' },
        { id: 'ssc-chsl-s25-11', text: 'Which gas is commonly known as "laughing gas"?', options: ['Carbon monoxide', 'Nitrous oxide', 'Methane', 'Sulphur dioxide'], correct: 1, topic: 'Science', difficulty: 'easy-medium', explanation: 'Nitrous oxide (N₂O) is commonly called laughing gas and is used as a mild anaesthetic.' },
        { id: 'ssc-chsl-s25-12', text: 'The headquarters of the International Monetary Fund (IMF) is located in which city?', options: ['New York', 'Washington, D.C.', 'London', 'Frankfurt'], correct: 1, topic: 'Static GK', difficulty: 'medium', explanation: 'The International Monetary Fund (IMF) is headquartered in Washington, D.C., United States.' },
        { id: 'ssc-chsl-s25-13', text: 'Which vitamin is produced in the human body upon exposure to sunlight?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'], correct: 3, topic: 'Science', difficulty: 'easy', explanation: 'Vitamin D is synthesised in the skin when it is exposed to ultraviolet rays from sunlight.' },
      ]},
      { id: 'qa', name: 'Quantitative Aptitude', questions: [
        { id: 'ssc-chsl-s25-14', text: 'The ratio of two numbers is 3 : 5 and their sum is 64. What is the larger number?', options: ['24', '36', '40', '45'], correct: 2, topic: 'Ratio', difficulty: 'easy-medium', explanation: 'Total parts = 3 + 5 = 8. Each part = 64/8 = 8. The larger number = 5 × 8 = 40.' },
        { id: 'ssc-chsl-s25-15', text: 'What is 35% of 240?', options: ['72', '78', '84', '90'], correct: 2, topic: 'Percentage', difficulty: 'easy', explanation: '35% of 240 = (35/100) × 240 = 0.35 × 240 = 84.' },
        { id: 'ssc-chsl-s25-16', text: 'A train 150 metres long is running at 54 km/h. How long will it take to cross a pole?', options: ['8 seconds', '10 seconds', '12 seconds', '15 seconds'], correct: 1, topic: 'Speed and Distance', difficulty: 'medium', explanation: 'Speed = 54 km/h = 54 × 5/18 = 15 m/s. Time to cross a pole = length/speed = 150/15 = 10 seconds.' },
        { id: 'ssc-chsl-s25-17', text: 'The area of a rectangle is 96 cm² and its length is 12 cm. What is its perimeter?', options: ['36 cm', '40 cm', '44 cm', '48 cm'], correct: 1, topic: 'Mensuration', difficulty: 'medium', explanation: 'Width = area/length = 96/12 = 8 cm. Perimeter = 2 × (12 + 8) = 2 × 20 = 40 cm.' },
        { id: 'ssc-chsl-s25-18', text: 'A sum of money doubles itself in 8 years at simple interest. What is the rate of interest per annum?', options: ['10%', '12%', '12.5%', '15%'], correct: 2, topic: 'Simple Interest', difficulty: 'medium-hard', explanation: 'To double, interest equals the principal, so SI = P over 8 years. R = (SI × 100)/(P × T) = (P × 100)/(P × 8) = 100/8 = 12.5%.' },
        { id: 'ssc-chsl-s25-19', text: 'The average of the first five multiples of 6 is:', options: ['16', '18', '20', '24'], correct: 1, topic: 'Average', difficulty: 'easy-medium', explanation: 'First five multiples of 6 are 6, 12, 18, 24, 30. Sum = 90. Average = 90/5 = 18.' },
      ]},
      { id: 'en', name: 'English Language', questions: [
        { id: 'ssc-chsl-s25-20', text: 'Select the synonym of the word DILIGENT.', options: ['Lazy', 'Hardworking', 'Careless', 'Slow'], correct: 1, topic: 'Synonyms', difficulty: 'easy', explanation: 'Diligent means showing care and persistent effort in one’s work, i.e. hardworking.' },
        { id: 'ssc-chsl-s25-21', text: 'Select the antonym of the word EXPAND.', options: ['Enlarge', 'Stretch', 'Contract', 'Grow'], correct: 2, topic: 'Antonyms', difficulty: 'easy-medium', explanation: 'Expand means to become larger; its antonym is contract, which means to become smaller.' },
        { id: 'ssc-chsl-s25-22', text: 'Select the meaning of the idiom: "Once in a blue moon".', options: ['Very frequently', 'Very rarely', 'At night', 'Suddenly'], correct: 1, topic: 'Idioms', difficulty: 'medium', explanation: 'The idiom "once in a blue moon" means something that happens very rarely.' },
        { id: 'ssc-chsl-s25-23', text: 'Select the one-word substitution for "A government run by a king or queen".', options: ['Democracy', 'Monarchy', 'Aristocracy', 'Oligarchy'], correct: 1, topic: 'One-word Substitution', difficulty: 'medium', explanation: 'A monarchy is a form of government in which supreme power is held by a single person such as a king or queen.' },
        { id: 'ssc-chsl-s25-24', text: 'Fill in the blank with the correct option: "The teacher insisted ____ punctuality from every student."', options: ['for', 'on', 'at', 'with'], correct: 1, topic: 'Fill in the Blanks', difficulty: 'medium-hard', explanation: 'The verb "insist" takes the preposition "on": "insisted on punctuality".' },
        { id: 'ssc-chsl-s25-25', text: 'Identify the part of the sentence that contains an error: "The teacher along with / the students / were going / to the museum."', options: ['The teacher along with', 'the students', 'were going', 'to the museum'], correct: 2, topic: 'Error Spotting', difficulty: 'hard', explanation: 'When the subject is joined by "along with", the verb agrees with the main subject "teacher" (singular), so "were going" should be "was going". The error is in the third part.' },
      ]},
    ],
  };

  const mocks = [mock20, mock25];
  window.EXAMS = (window.EXAMS || []).concat(mocks);
})();
