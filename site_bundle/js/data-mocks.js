// Mockly — Sectional short mocks for the remaining catalogue exams.
// Each non-full mock is presented as ONE representative (and deliberately
// different) section, scope: 'sectional', ~5 questions. The full-length
// flagship mock lives in data.js (SSC CGL Tier 1). These fill the catalogue's
// "sectional mock" quadrant and are meant to be expanded later.
// Loaded after data.js, before repo.js; appends to window.EXAMS.

(function () {
  const mocks = [];

  // ---------------- SSC CGL — Quantitative Aptitude (sectional short) ----------------
  // SSC CGL also has the full-length 100-question mock in data.js; this is its
  // short sectional companion.
  mocks.push({
    id: 'ssc-cgl-sec-qa-1',
    name: 'SSC CGL — Quantitative Aptitude (Sectional Mock)',
    template: 'ssc',
    examCatalogueId: 'ssc-cgl',
    kind: 'mock', scope: 'sectional', sectionTag: 'Quantitative Aptitude',
    durationMin: 12,
    marking: { correct: 2, wrong: -0.5, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'qa', name: 'Quantitative Aptitude', questions: [
        { id: 'qa-1', text: 'Find 15% of 360.', options: ['48', '54', '60', '45'], correct: 1, topic: 'Percentage', difficulty: 'easy', explanation: '15% of 360 = 0.15 × 360 = 54.' },
        { id: 'qa-2', text: 'The average of 10, 20, 30, 40 and 50 is:', options: ['25', '30', '35', '40'], correct: 1, topic: 'Averages', difficulty: 'easy', explanation: 'Sum = 150; 150 / 5 = 30.' },
        { id: 'qa-3', text: 'A shopkeeper buys an article for ₹80 and sells it for ₹100. What is his profit percentage?', options: ['20%', '25%', '30%', '15%'], correct: 1, topic: 'Profit & Loss', difficulty: 'easy-medium', explanation: 'Profit = 20; (20/80) × 100 = 25%.' },
        { id: 'qa-4', text: 'Find the simple interest on ₹4,000 at 5% per annum for 2 years.', options: ['₹400', '₹420', '₹200', '₹800'], correct: 0, topic: 'Simple Interest', difficulty: 'easy-medium', explanation: 'SI = (4000 × 5 × 2)/100 = ₹400.' },
        { id: 'qa-5', text: 'A train 180 m long crosses a platform 270 m long in 18 seconds. What is its speed?', options: ['81 km/h', '90 km/h', '72 km/h', '100 km/h'], correct: 1, topic: 'Time, Speed & Distance', difficulty: 'medium-hard', explanation: 'Distance = 450 m; speed = 450/18 = 25 m/s = 90 km/h.' },
      ]},
    ],
  });

  // ---------------- SSC CHSL — Reasoning (sectional) ----------------
  mocks.push({
    id: 'ssc-chsl-mock-1',
    name: 'SSC CHSL — Reasoning (Sectional Mock)',
    template: 'ssc',
    examCatalogueId: 'ssc-chsl',
    kind: 'mock', scope: 'sectional', sectionTag: 'Reasoning',
    durationMin: 10,
    marking: { correct: 2, wrong: -0.5, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'r', name: 'Reasoning', questions: [
        { id: 'r-1', text: 'Find the next term: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correct: 1, topic: 'Number series', difficulty: 'easy', explanation: 'Differences are 4, 6, 8, 10, 12. 30 + 12 = 42.' },
        { id: 'r-2', text: 'CAT : TAC :: DOG : ?', options: ['GOD', 'GDO', 'OGD', 'DGO'], correct: 0, topic: 'Coding', difficulty: 'easy', explanation: 'Reverse the letters: CAT→TAC, DOG→GOD.' },
        { id: 'r-3', text: 'If P = 16, Q = 17, then BAT = ?', options: ['23', '25', '46', '48'], correct: 0, topic: 'Letter coding', difficulty: 'easy-medium', explanation: 'A=1..Z=26. B+A+T = 2+1+20 = 23.' },
        { id: 'r-4', text: 'A man walks 3 km north, 4 km east. Shortest distance from start?', options: ['5 km', '7 km', '6 km', '4 km'], correct: 0, topic: 'Directions', difficulty: 'medium', explanation: '√(3²+4²) = 5.' },
        { id: 'r-5', text: 'Five friends sit in a row. A is left of B, C is right of B, D is between A and B. Who is at the leftmost end?', options: ['A', 'D', 'B', 'Cannot determine'], correct: 3, topic: 'Seating', difficulty: 'hard', explanation: 'Position of E is not given, so leftmost could be A or E. Cannot determine.' },
      ]},
    ],
  });

  // ---------------- JEE Main — Physics (sectional) ----------------
  mocks.push({
    id: 'jee-main-mock-1',
    name: 'JEE Main — Physics (Sectional Mock)',
    template: 'nta',
    examCatalogueId: 'jee-main',
    kind: 'mock', scope: 'sectional', sectionTag: 'Physics',
    durationMin: 15,
    marking: { correct: 4, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'phy', name: 'Physics', questions: [
        { id: 'phy-1', text: 'SI unit of electric field is:', options: ['N/C', 'V/m', 'Both N/C and V/m', 'J/C'], correct: 2, topic: 'Electrostatics', difficulty: 'easy-medium', explanation: 'E = F/q (N/C) = V/m. Both are equivalent.' },
        { id: 'phy-2', text: 'A body in uniform circular motion has:', options: ['Constant velocity', 'Zero acceleration', 'Constant speed', 'Zero net force'], correct: 2, topic: 'Circular motion', difficulty: 'easy-medium', explanation: 'Speed is constant but velocity changes direction; centripetal force is non-zero.' },
        { id: 'phy-3', text: 'A 2 kg block on a frictionless surface is pulled by 10 N. Acceleration?', options: ['2 m/s²', '5 m/s²', '10 m/s²', '20 m/s²'], correct: 1, topic: "Newton's laws", difficulty: 'easy-medium', explanation: 'a = F/m = 10/2 = 5 m/s².' },
        { id: 'phy-4', text: 'Focal length of a convex lens (n=1.5) with R₁=20 cm, R₂=−20 cm:', options: ['10 cm', '20 cm', '40 cm', '15 cm'], correct: 1, topic: 'Optics', difficulty: 'medium-hard', explanation: '1/f = (n−1)(1/R₁−1/R₂) = 0.5·(1/20+1/20) = 1/20. f = 20 cm.' },
        { id: 'phy-5', text: 'A photon of wavelength 620 nm has energy nearest to:', options: ['1 eV', '2 eV', '3 eV', '4 eV'], correct: 1, topic: 'Modern physics', difficulty: 'hard', explanation: 'E = 1240/λ(nm) eV = 1240/620 = 2 eV.' },
      ]},
    ],
  });

  // ---------------- JEE Advanced — Chemistry (sectional) ----------------
  mocks.push({
    id: 'jee-adv-mock-1',
    name: 'JEE Advanced — Chemistry (Sectional Mock)',
    template: 'nta',
    examCatalogueId: 'jee-advanced',
    kind: 'mock', scope: 'sectional', sectionTag: 'Chemistry',
    durationMin: 15,
    marking: { correct: 3, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'che', name: 'Chemistry', questions: [
        { id: 'che-1', text: 'IUPAC name of CH₃-CO-CH₃:', options: ['Propanone', 'Propanal', 'Propanol', 'Propane'], correct: 0, topic: 'Nomenclature', difficulty: 'easy', explanation: 'Acetone = propan-2-one.' },
        { id: 'che-2', text: 'Number of σ-bonds in C₂H₆:', options: ['5', '6', '7', '8'], correct: 2, topic: 'Bonding', difficulty: 'easy-medium', explanation: '1 C-C + 6 C-H = 7 σ-bonds.' },
        { id: 'che-3', text: 'Standard enthalpy of formation of an element in its standard state:', options: ['Always positive', 'Zero', 'Always negative', 'Depends'], correct: 1, topic: 'Thermo', difficulty: 'medium', explanation: 'By definition, ΔH°_f of elements in standard state = 0.' },
        { id: 'che-4', text: 'In SN2 reaction, rate depends on:', options: ['[substrate] only', '[nucleophile] only', '[substrate]·[nucleophile]', 'Neither'], correct: 2, topic: 'Reaction mech', difficulty: 'medium', explanation: 'SN2 is bimolecular: rate = k[S][Nu].' },
        { id: 'che-5', text: 'Coordination number of Na⁺ in NaCl rock-salt structure:', options: ['4', '6', '8', '12'], correct: 1, topic: 'Solid state', difficulty: 'medium-hard', explanation: 'Each Na⁺ is surrounded by 6 Cl⁻ octahedrally.' },
      ]},
    ],
  });

  // ---------------- NEET UG — Biology (sectional) ----------------
  mocks.push({
    id: 'neet-ug-mock-1',
    name: 'NEET UG — Biology (Sectional Mock)',
    template: 'nta',
    examCatalogueId: 'neet-ug',
    kind: 'mock', scope: 'sectional', sectionTag: 'Biology',
    durationMin: 12,
    marking: { correct: 4, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'bio', name: 'Biology', questions: [
        { id: 'bio-1', text: 'Powerhouse of the cell:', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Lysosome'], correct: 1, topic: 'Cell', difficulty: 'easy', explanation: 'Mitochondria produce ATP.' },
        { id: 'bio-2', text: 'Number of chambers in human heart:', options: ['2', '3', '4', '5'], correct: 2, topic: 'Anatomy', difficulty: 'easy', explanation: '2 atria + 2 ventricles.' },
        { id: 'bio-3', text: 'Site of photosynthesis in a plant cell:', options: ['Mitochondria', 'Chloroplast', 'Vacuole', 'Cell wall'], correct: 1, topic: 'Plant phys', difficulty: 'easy-medium', explanation: 'Chlorophyll in chloroplasts traps light.' },
        { id: 'bio-4', text: 'Functional unit of kidney:', options: ['Neuron', 'Nephron', 'Alveolus', 'Hepatocyte'], correct: 1, topic: 'Excretion', difficulty: 'easy-medium', explanation: 'Nephron filters blood.' },
        { id: 'bio-5', text: 'In Mendel’s monohybrid cross, F₂ phenotypic ratio:', options: ['1:1', '3:1', '9:3:3:1', '1:2:1'], correct: 1, topic: 'Genetics', difficulty: 'medium-hard', explanation: 'Monohybrid F₂ phenotypic 3:1; genotypic 1:2:1.' },
      ]},
    ],
  });

  // ---------------- CAT — VARC (sectional) ----------------
  mocks.push({
    id: 'cat-mock-1',
    name: 'CAT — VARC (Sectional Mock)',
    template: 'cat',
    examCatalogueId: 'cat',
    kind: 'mock', scope: 'sectional', sectionTag: 'VARC',
    durationMin: 15,
    marking: { correct: 3, wrong: -1, unattempted: 0 },
    allowSectionSwitch: false, timerMode: 'per-section', calculator: true,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'varc', name: 'VARC', questions: [
        { id: 'varc-1', text: 'Synonym of "lucid":', options: ['Obscure', 'Clear', 'Dark', 'Mysterious'], correct: 1, topic: 'Vocab', difficulty: 'easy', explanation: 'Lucid means clear, easily understood.' },
        { id: 'varc-2', text: 'Choose the grammatically correct sentence:', options: ['He don’t like coffee.', 'He doesn’t likes coffee.', 'He doesn’t like coffee.', 'He not like coffee.'], correct: 2, topic: 'Grammar', difficulty: 'easy-medium', explanation: 'Auxiliary "doesn’t" + base form "like".' },
        { id: 'varc-3', text: 'A paragraph’s main idea is best identified by:', options: ['First sentence only', 'Last sentence only', 'Overall argument and supporting detail', 'Word count'], correct: 2, topic: 'RC', difficulty: 'medium', explanation: 'Main idea is the central claim with its support.' },
        { id: 'varc-4', text: 'Para-jumble — first sentence: "Cities grow as economies expand." Best follower:', options: ['Cats are nocturnal animals.', 'But growth brings infrastructure stress.', 'Mountains are formed by tectonic plates.', 'Pizza was invented in Italy.'], correct: 1, topic: 'Para-jumbles', difficulty: 'medium', explanation: 'Continues the urban-growth theme.' },
        { id: 'varc-5', text: 'Odd-one-out (sentence theme): (i) Inflation hurts savers. (ii) High inflation erodes purchasing power. (iii) Bananas are yellow. (iv) Central banks raise rates to fight inflation.', options: ['i', 'ii', 'iii', 'iv'], correct: 2, topic: 'Odd one out', difficulty: 'medium-hard', explanation: 'Only (iii) is unrelated to inflation.' },
      ]},
    ],
  });

  // ---------------- GATE CS — Core Subject (sectional) ----------------
  mocks.push({
    id: 'gate-cs-mock-1',
    name: 'GATE CS — Core Subject (Sectional Mock)',
    template: 'gate',
    examCatalogueId: 'gate',
    kind: 'mock', scope: 'sectional', sectionTag: 'Core Subject',
    durationMin: 15,
    marking: { correct: 1, wrong: -0.33, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: true,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'core', name: 'Core Subject', questions: [
        { id: 'core-1', text: 'Worst-case time complexity of binary search on sorted array of n elements:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 1, topic: 'Algorithms', difficulty: 'easy', explanation: 'Halving each step → log₂ n.' },
        { id: 'core-2', text: 'Which is a stable sort?', options: ['QuickSort', 'HeapSort', 'MergeSort', 'SelectionSort'], correct: 2, topic: 'Algorithms', difficulty: 'easy-medium', explanation: 'MergeSort preserves the relative order of equal keys.' },
        { id: 'core-3', text: 'In a B+ tree of order m, max children of an internal node:', options: ['m−1', 'm', 'm+1', '2m'], correct: 1, topic: 'DBMS', difficulty: 'medium', explanation: 'Order m → at most m children.' },
        { id: 'core-4', text: 'Which OSI layer handles routing?', options: ['Data link', 'Network', 'Transport', 'Session'], correct: 1, topic: 'Networks', difficulty: 'easy-medium', explanation: 'Layer 3 — Network layer (IP).' },
        { id: 'core-5', text: 'Number of states in minimal DFA for {w | w ends with "ab"} over {a,b}:', options: ['2', '3', '4', '5'], correct: 1, topic: 'TOC', difficulty: 'hard', explanation: 'Three states: q0 (start), q1 (saw a), q2 (saw ab, accept).' },
      ]},
    ],
  });

  // ---------------- UPSC CSE Prelims — General Studies I (sectional) ----------------
  mocks.push({
    id: 'upsc-cse-mock-1',
    name: 'UPSC CSE Prelims — General Studies I (Sectional Mock)',
    template: 'nta',
    examCatalogueId: 'upsc-cse',
    kind: 'mock', scope: 'sectional', sectionTag: 'General Studies I',
    durationMin: 12,
    marking: { correct: 2, wrong: -0.66, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'gs1', name: 'General Studies I', questions: [
        { id: 'gs1-1', text: 'The Indian Constitution came into effect on:', options: ['15 Aug 1947', '26 Jan 1950', '26 Nov 1949', '2 Oct 1950'], correct: 1, topic: 'Polity', difficulty: 'easy', explanation: 'Adopted 26 Nov 1949; came into force 26 Jan 1950.' },
        { id: 'gs1-2', text: 'Which river is known as "Sorrow of Bengal"?', options: ['Ganga', 'Damodar', 'Hooghly', 'Brahmaputra'], correct: 1, topic: 'Geography', difficulty: 'easy-medium', explanation: 'Damodar caused frequent floods in Bengal.' },
        { id: 'gs1-3', text: 'The Tropic of Cancer passes through how many Indian states?', options: ['6', '7', '8', '9'], correct: 2, topic: 'Geography', difficulty: 'medium-hard', explanation: '8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.' },
        { id: 'gs1-4', text: 'The Quit India Movement was launched in:', options: ['1930', '1942', '1945', '1947'], correct: 1, topic: 'History', difficulty: 'easy-medium', explanation: 'Gandhi launched it on 8 Aug 1942.' },
        { id: 'gs1-5', text: 'Article 32 of the Constitution provides:', options: ['Right to education', 'Right to constitutional remedies', 'Right to property', 'Right to freedom of religion'], correct: 1, topic: 'Polity', difficulty: 'medium', explanation: 'Dr. Ambedkar called it the "heart and soul" of the Constitution.' },
      ]},
    ],
  });

  // ---------------- IBPS PO — Quantitative Aptitude (sectional) ----------------
  mocks.push({
    id: 'ibps-po-mock-1',
    name: 'IBPS PO — Quantitative Aptitude (Sectional Mock)',
    template: 'ssc',
    examCatalogueId: 'ibps-po',
    kind: 'mock', scope: 'sectional', sectionTag: 'Quantitative Aptitude',
    durationMin: 10,
    marking: { correct: 1, wrong: -0.25, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'q', name: 'Quantitative Aptitude', questions: [
        { id: 'q-1', text: 'Simplify: 144 ÷ 12 + 8 × 2', options: ['28', '32', '40', '44'], correct: 0, topic: 'BODMAS', difficulty: 'easy', explanation: '12 + 16 = 28.' },
        { id: 'q-2', text: 'Ratio 3:5, sum 64. Larger?', options: ['24', '32', '36', '40'], correct: 3, topic: 'Ratio', difficulty: 'easy-medium', explanation: '8 parts = 64 → 1 part = 8. 5 parts = 40.' },
        { id: 'q-3', text: 'CI on ₹10000 at 10% for 2 yrs:', options: ['2000', '2100', '2200', '2500'], correct: 1, topic: 'CI', difficulty: 'medium', explanation: '10000·(1.1²−1) = 10000·0.21 = 2100.' },
        { id: 'q-4', text: 'A pipe fills tank in 6 h, another empties in 8 h. Both open?', options: ['18 h', '20 h', '24 h', '12 h'], correct: 2, topic: 'Pipes', difficulty: 'medium', explanation: '1/6 − 1/8 = 1/24 → 24 h.' },
        { id: 'q-5', text: 'Boat speed in still water 10 km/h, stream 2 km/h. Time to go 24 km downstream and back?', options: ['4 h', '5 h', '5.5 h', '6 h'], correct: 1, topic: 'Boats', difficulty: 'medium-hard', explanation: '24/12 + 24/8 = 2 + 3 = 5 h.' },
      ]},
    ],
  });

  // ---------------- SBI PO — Data Analysis (sectional) ----------------
  mocks.push({
    id: 'sbi-po-mock-1',
    name: 'SBI PO — Data Analysis (Sectional Mock)',
    template: 'ssc',
    examCatalogueId: 'sbi-po',
    kind: 'mock', scope: 'sectional', sectionTag: 'Data Analysis',
    durationMin: 12,
    marking: { correct: 1, wrong: -0.25, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'da', name: 'Data Analysis', questions: [
        { id: 'da-1', text: 'Mean of 10, 20, 30, 40, 50:', options: ['25', '30', '35', '40'], correct: 1, topic: 'Statistics', difficulty: 'easy', explanation: '150/5 = 30.' },
        { id: 'da-2', text: 'Median of 3, 7, 5, 9, 11:', options: ['5', '7', '9', '11'], correct: 1, topic: 'Statistics', difficulty: 'easy-medium', explanation: 'Sorted: 3,5,7,9,11. Middle = 7.' },
        { id: 'da-3', text: 'A pie chart: 30% A, 25% B, 20% C, 15% D, 10% E. If total = 2000, value of C?', options: ['300', '400', '450', '500'], correct: 1, topic: 'DI', difficulty: 'easy-medium', explanation: '20% × 2000 = 400.' },
        { id: 'da-4', text: 'In a bar chart, sales grew from 80 to 100. % growth?', options: ['20%', '25%', '30%', '15%'], correct: 1, topic: 'DI', difficulty: 'easy-medium', explanation: '(20/80)×100 = 25%.' },
        { id: 'da-5', text: 'Variance of {2,4,4,4,5,5,7,9}:', options: ['3', '4', '5', '6'], correct: 1, topic: 'Statistics', difficulty: 'hard', explanation: 'Mean=5. Squared dev sum = 9+1+1+1+0+0+4+16=32. Var=32/8=4.' },
      ]},
    ],
  });

  // ---------------- RRB NTPC — General Awareness (sectional) ----------------
  mocks.push({
    id: 'rrb-ntpc-mock-1',
    name: 'RRB NTPC — General Awareness (Sectional Mock)',
    template: 'ssc',
    examCatalogueId: 'rrb-ntpc',
    kind: 'mock', scope: 'sectional', sectionTag: 'General Awareness',
    durationMin: 10,
    marking: { correct: 1, wrong: -0.33, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'ga', name: 'General Awareness', questions: [
        { id: 'ga-1', text: 'Longest river in India:', options: ['Yamuna', 'Ganga', 'Brahmaputra', 'Godavari'], correct: 1, topic: 'Geography', difficulty: 'easy', explanation: 'Ganga (~2525 km within India).' },
        { id: 'ga-2', text: 'First PM of India:', options: ['Patel', 'Nehru', 'Rajendra Prasad', 'Gandhi'], correct: 1, topic: 'History', difficulty: 'easy', explanation: 'Jawaharlal Nehru, 1947.' },
        { id: 'ga-3', text: 'Headquarters of Indian Railways:', options: ['Delhi', 'Mumbai', 'New Delhi (Rail Bhawan)', 'Kolkata'], correct: 2, topic: 'Railways', difficulty: 'easy-medium', explanation: 'Rail Bhawan, New Delhi.' },
        { id: 'ga-4', text: 'Indian Railway "Vande Bharat" is a:', options: ['Cargo train', 'Semi-high-speed passenger train', 'Metro service', 'Steam engine'], correct: 1, topic: 'Railways', difficulty: 'easy-medium', explanation: 'Semi-high-speed indigenously built train.' },
        { id: 'ga-5', text: 'First Indian to win Nobel Prize:', options: ['CV Raman', 'Rabindranath Tagore', 'Mother Teresa', 'Hargobind Khorana'], correct: 1, topic: 'History', difficulty: 'medium', explanation: 'Tagore — Nobel for Literature, 1913.' },
      ]},
    ],
  });

  // ---------------- CUET UG — General Test (sectional) ----------------
  mocks.push({
    id: 'cuet-ug-mock-1',
    name: 'CUET UG — General Test (Sectional Mock)',
    template: 'nta',
    examCatalogueId: 'cuet-ug',
    kind: 'mock', scope: 'sectional', sectionTag: 'General Test',
    durationMin: 12,
    marking: { correct: 5, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'gt', name: 'General Test', questions: [
        { id: 'gt-1', text: 'Capital of Canada:', options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'], correct: 1, topic: 'World', difficulty: 'easy-medium', explanation: 'Ottawa, not Toronto.' },
        { id: 'gt-2', text: '25% of 400 = ?', options: ['80', '100', '120', '125'], correct: 1, topic: 'Quant', difficulty: 'easy', explanation: '0.25 × 400 = 100.' },
        { id: 'gt-3', text: 'Find next: 1, 1, 2, 3, 5, 8, ?', options: ['11', '12', '13', '14'], correct: 2, topic: 'Series', difficulty: 'easy-medium', explanation: 'Fibonacci: 5+8 = 13.' },
        { id: 'gt-4', text: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Michelangelo'], correct: 1, topic: 'GK', difficulty: 'easy-medium', explanation: 'Leonardo da Vinci, c. 1503–1519.' },
        { id: 'gt-5', text: 'A clock loses 5 min/hour. After 12 actual hours, it shows:', options: ['11:00', '11:50', '11:05', '12:00'], correct: 0, topic: 'Clock', difficulty: 'medium-hard', explanation: 'Loses 60 min over 12 h → shows 11:00 when actual time is 12:00.' },
      ]},
    ],
  });

  // Merge into window.EXAMS so repo.js seeds them on first run.
  window.EXAMS = (window.EXAMS || []).concat(mocks);
})();
