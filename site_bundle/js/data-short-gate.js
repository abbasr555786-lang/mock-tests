(function () {
  const mocks = [
    {
      id: 'gate-short-20',
      name: 'GATE CS — Short Mock (20 Questions)',
      template: 'gate',
      examCatalogueId: 'gate',
      kind: 'mock', scope: 'short', sectionTag: null,
      durationMin: 15,
      marking: { correct: 1, wrong: -0.33, unattempted: 0 },
      allowSectionSwitch: true, timerMode: 'full', calculator: true,
      questionTypes: ['mcq'], languages: ['en'],
      sections: [
        { id: 'ga', name: 'General Aptitude', questions: [
          {
            id: 'gate-s20-1',
            text: 'Choose the word that is most nearly OPPOSITE in meaning to "Frugal".',
            options: ['Thrifty', 'Lavish', 'Cautious', 'Modest'],
            correct: 1,
            topic: 'Quantitative aptitude',
            difficulty: 'easy',
            explanation: 'Frugal means sparing or economical. Its opposite is "Lavish" (extravagant, spending freely). Thrifty and Modest are near-synonyms; Cautious is unrelated.'
          },
          {
            id: 'gate-s20-2',
            text: 'If the price of an item is first increased by 20% and then decreased by 20%, the net change in price is:',
            options: ['No change', '4% increase', '4% decrease', '2% decrease'],
            correct: 2,
            topic: 'Quantitative aptitude',
            difficulty: 'easy',
            explanation: 'Take base 100. After +20% it is 120. After -20% of 120 it is 120 × 0.8 = 96. Net = 96 − 100 = −4, i.e. a 4% decrease.'
          },
          {
            id: 'gate-s20-3',
            text: 'A train travels the first half of a distance at 40 km/h and the second half at 60 km/h. The average speed for the whole journey is:',
            options: ['48 km/h', '50 km/h', '52 km/h', '45 km/h'],
            correct: 0,
            topic: 'Quantitative aptitude',
            difficulty: 'easy-medium',
            explanation: 'For equal distances, average speed is the harmonic mean = 2ab/(a+b) = (2 × 40 × 60)/(40 + 60) = 4800/100 = 48 km/h.'
          },
          {
            id: 'gate-s20-4',
            text: 'In a certain code, "FLOWER" is written as "GMPXFS". How is "GARDEN" written in that code?',
            options: ['HBSEFO', 'HBSDFO', 'HCSEFO', 'HBTEFO'],
            correct: 0,
            topic: 'Logical reasoning',
            difficulty: 'medium',
            explanation: 'Each letter is shifted forward by 1: F→G, L→M, O→P, W→X, E→F, R→S. Applying +1 to GARDEN: G→H, A→B, R→S, D→E, E→F, N→O, giving HBSEFO.'
          },
          {
            id: 'gate-s20-5',
            text: 'A pie chart shows a monthly budget. If Rent is 35%, Food is 25%, Savings is 20% and the remainder is Others, what angle (in degrees) does Others occupy?',
            options: ['54°', '60°', '72°', '90°'],
            correct: 2,
            topic: 'Data interpretation',
            difficulty: 'medium',
            explanation: 'Others = 100 − (35 + 25 + 20) = 20%. Angle = 20% of 360° = 0.20 × 360 = 72°.'
          },
        ]},
        { id: 'em', name: 'Engineering Mathematics', questions: [
          {
            id: 'gate-s20-6',
            text: 'How many distinct subsets of a set with 6 elements contain at least one element?',
            options: ['63', '64', '32', '62'],
            correct: 0,
            topic: 'Discrete math/sets/relations',
            difficulty: 'easy',
            explanation: 'Total subsets = 2⁶ = 64, including the empty set. Subsets with at least one element = 64 − 1 = 63.'
          },
          {
            id: 'gate-s20-7',
            text: 'Two fair six-sided dice are rolled. What is the probability that the sum of the two faces equals 9?',
            options: ['1/9', '1/12', '1/6', '5/36'],
            correct: 0,
            topic: 'Probability',
            difficulty: 'easy-medium',
            explanation: 'Favourable outcomes for sum 9: (3,6),(4,5),(5,4),(6,3) = 4 outcomes out of 36. Probability = 4/36 = 1/9.'
          },
          {
            id: 'gate-s20-8',
            text: 'The number of edges in a complete graph K₇ on 7 vertices is:',
            options: ['21', '42', '14', '49'],
            correct: 0,
            topic: 'Graph theory',
            difficulty: 'medium',
            explanation: 'A complete graph on n vertices has C(n,2) = n(n−1)/2 edges. For n = 7: 7 × 6 / 2 = 21.'
          },
          {
            id: 'gate-s20-9',
            text: 'The proposition (p → q) is logically equivalent to:',
            options: ['p ∧ ¬q', '¬p ∨ q', 'p ∨ ¬q', '¬p ∧ q'],
            correct: 1,
            topic: 'Propositional logic',
            difficulty: 'medium',
            explanation: 'By definition of implication, p → q is false only when p is true and q is false. This is captured by ¬p ∨ q, which is false exactly when p is true (¬p false) and q is false.'
          },
          {
            id: 'gate-s20-10',
            text: 'If A is a 3 × 3 matrix with det(A) = 4, then det(2A) is:',
            options: ['8', '12', '32', '64'],
            correct: 2,
            topic: 'Linear algebra',
            difficulty: 'medium-hard',
            explanation: 'For an n × n matrix, det(kA) = kⁿ det(A). Here n = 3, k = 2, so det(2A) = 2³ × 4 = 8 × 4 = 32.'
          },
        ]},
        { id: 'cs', name: 'Computer Science (Core)', questions: [
          {
            id: 'gate-s20-11',
            text: 'What is the maximum number of nodes in a binary tree of height h (where a single node has height 0)?',
            options: ['2ʰ − 1', '2^(h+1) − 1', '2ʰ', '2^(h+1)'],
            correct: 1,
            topic: 'Data structures',
            difficulty: 'easy',
            explanation: 'With height h (root at level 0), levels 0..h hold at most 2⁰ + 2¹ + ... + 2ʰ = 2^(h+1) − 1 nodes.'
          },
          {
            id: 'gate-s20-12',
            text: 'A hash table uses open addressing with linear probing. Which problem is most directly associated with linear probing?',
            options: ['Primary clustering', 'Hash collision elimination', 'Perfect hashing', 'Underflow'],
            correct: 0,
            topic: 'Data structures',
            difficulty: 'easy-medium',
            explanation: 'Linear probing causes occupied slots to form long contiguous runs, called primary clustering, which lengthens future probe sequences.'
          },
          {
            id: 'gate-s20-13',
            text: 'The recurrence T(n) = 2T(n/2) + n, with T(1) = 1, solves to:',
            options: ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(log n)'],
            correct: 1,
            topic: 'Algorithms & complexity',
            difficulty: 'medium',
            explanation: 'By the Master Theorem, a = 2, b = 2, so n^(log_b a) = n¹ = n. Since f(n) = n = Θ(n), this is case 2, giving Θ(n log n).'
          },
          {
            id: 'gate-s20-14',
            text: 'A process executes the sequence: P(s); critical section; V(s). The semaphore s is initialized to 1. This guarantees:',
            options: ['Deadlock', 'Mutual exclusion', 'Starvation always', 'No synchronization'],
            correct: 1,
            topic: 'Operating systems',
            difficulty: 'medium',
            explanation: 'A binary semaphore initialized to 1 with P before and V after the critical section permits only one process inside at a time, guaranteeing mutual exclusion.'
          },
          {
            id: 'gate-s20-15',
            text: 'In a relational database, which normal form eliminates partial functional dependencies of non-prime attributes on a candidate key?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            correct: 1,
            topic: 'DBMS',
            difficulty: 'medium',
            explanation: 'Second Normal Form (2NF) requires the relation to be in 1NF and that every non-prime attribute is fully functionally dependent on each candidate key, i.e. no partial dependencies.'
          },
          {
            id: 'gate-s20-16',
            text: 'A subnet mask of 255.255.255.192 allows how many usable host addresses per subnet?',
            options: ['62', '64', '30', '126'],
            correct: 0,
            topic: 'Computer networks',
            difficulty: 'medium-hard',
            explanation: 'The mask leaves 32 − 26 = 6 host bits (192 = 11000000, so 26 network bits). Total addresses = 2⁶ = 64; subtract network and broadcast = 64 − 2 = 62 usable hosts.'
          },
          {
            id: 'gate-s20-17',
            text: 'The 2\'s complement representation of −6 in 5 bits is:',
            options: ['11010', '01010', '11001', '10110'],
            correct: 0,
            topic: 'Computer organization',
            difficulty: 'medium-hard',
            explanation: '+6 in 5 bits = 00110. Invert bits: 11001. Add 1: 11010. So −6 = 11010 in 5-bit 2\'s complement.'
          },
          {
            id: 'gate-s20-18',
            text: 'During compilation, lexical analysis produces a stream of:',
            options: ['Parse trees', 'Tokens', 'Three-address code', 'Machine code'],
            correct: 1,
            topic: 'Compilers',
            difficulty: 'easy',
            explanation: 'The lexical analyzer (scanner) groups input characters into lexemes and emits a stream of tokens, which the parser then consumes.'
          },
          {
            id: 'gate-s20-19',
            text: 'How many select lines are required for a 16-to-1 multiplexer?',
            options: ['3', '4', '8', '16'],
            correct: 1,
            topic: 'Digital logic',
            difficulty: 'easy-medium',
            explanation: 'A 2ⁿ-to-1 multiplexer needs n select lines. For 16 = 2⁴ inputs, n = 4 select lines are required.'
          },
          {
            id: 'gate-s20-20',
            text: 'The language L = { aⁿbⁿ | n ≥ 0 } is:',
            options: ['Regular', 'Context-free but not regular', 'Context-sensitive but not context-free', 'Not recursively enumerable'],
            correct: 1,
            topic: 'Theory of computation',
            difficulty: 'hard',
            explanation: 'L requires matching counts of a and b, which a finite automaton cannot track, so it is not regular. A PDA can use its stack to match them, making L context-free.'
          },
        ]},
      ],
    },
    {
      id: 'gate-short-25',
      name: 'GATE CS — Short Mock (25 Questions)',
      template: 'gate',
      examCatalogueId: 'gate',
      kind: 'mock', scope: 'short', sectionTag: null,
      durationMin: 20,
      marking: { correct: 1, wrong: -0.33, unattempted: 0 },
      allowSectionSwitch: true, timerMode: 'full', calculator: true,
      questionTypes: ['mcq'], languages: ['en'],
      sections: [
        { id: 'ga', name: 'General Aptitude', questions: [
          {
            id: 'gate-s25-1',
            text: 'Select the option that correctly completes the analogy: "Pen is to Writer as Brush is to ____".',
            options: ['Canvas', 'Painter', 'Colour', 'Wall'],
            correct: 1,
            topic: 'Verbal ability',
            difficulty: 'easy',
            explanation: 'A pen is the primary tool used by a writer; analogously a brush is the primary tool used by a painter. Canvas and colour are materials, not the user.'
          },
          {
            id: 'gate-s25-2',
            text: 'The simple interest on a principal of ₹5000 at 8% per annum for 2 years is:',
            options: ['₹400', '₹800', '₹1000', '₹640'],
            correct: 1,
            topic: 'Quantitative aptitude',
            difficulty: 'easy',
            explanation: 'Simple interest = P × R × T / 100 = 5000 × 8 × 2 / 100 = 800000/100 = ₹800.'
          },
          {
            id: 'gate-s25-3',
            text: 'A man can complete a task in 12 days and another in 18 days. Working together, how many days will they take?',
            options: ['7.2 days', '7.5 days', '6 days', '8 days'],
            correct: 0,
            topic: 'Quantitative aptitude',
            difficulty: 'medium',
            explanation: 'Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36 per day. Time = 36/5 = 7.2 days.'
          },
          { id: 'gate-s25-4', text: 'Find the next term in the series: 2, 3, 5, 7, 11, ____.', options: ['12', '13', '14', '15'], correct: 1, topic: 'Logical reasoning', difficulty: 'medium', explanation: 'The series lists consecutive prime numbers: 2, 3, 5, 7, 11, and the next prime is 13.' },
          {
            id: 'gate-s25-5',
            text: 'A bar chart shows sales (in units): Q1 = 120, Q2 = 150, Q3 = 90, Q4 = 180. What was the percentage increase from Q3 to Q4?',
            options: ['90%', '100%', '50%', '120%'],
            correct: 1,
            topic: 'Data interpretation',
            difficulty: 'medium-hard',
            explanation: 'Increase = 180 − 90 = 90. Percentage increase = (90/90) × 100 = 100%.'
          },
          {
            id: 'gate-s25-6',
            text: 'Choose the word OPPOSITE in meaning to "Transient".',
            options: ['Temporary', 'Permanent', 'Fleeting', 'Brief'],
            correct: 1,
            topic: 'Verbal ability',
            difficulty: 'easy-medium',
            explanation: 'Transient means lasting only a short time. Its antonym is "Permanent". Temporary, Fleeting and Brief are synonyms of transient.'
          },
        ]},
        { id: 'em', name: 'Engineering Mathematics', questions: [
          {
            id: 'gate-s25-7',
            text: 'How many distinct ways can 5 distinct books be arranged on a shelf?',
            options: ['25', '60', '120', '720'],
            correct: 2,
            topic: 'Combinatorics',
            difficulty: 'easy',
            explanation: 'The number of arrangements (permutations) of 5 distinct items is 5! = 5 × 4 × 3 × 2 × 1 = 120.'
          },
          {
            id: 'gate-s25-8',
            text: 'A relation R on a set is reflexive, symmetric and transitive. Such a relation is called:',
            options: ['A partial order', 'An equivalence relation', 'A total order', 'An antisymmetric relation'],
            correct: 1,
            topic: 'Discrete math/sets/relations',
            difficulty: 'easy-medium',
            explanation: 'A relation that is reflexive, symmetric and transitive is by definition an equivalence relation, which partitions the set into equivalence classes.'
          },
          {
            id: 'gate-s25-9',
            text: 'The derivative of f(x) = x³ − 3x with respect to x is zero at which positive value of x?',
            options: ['1', '2', '3', '√3'],
            correct: 0,
            topic: 'Calculus',
            difficulty: 'medium',
            explanation: 'f\'(x) = 3x² − 3. Setting 3x² − 3 = 0 gives x² = 1, so x = ±1. The positive value is x = 1.'
          },
          {
            id: 'gate-s25-10',
            text: 'A box has 4 red and 6 blue balls. Two balls are drawn without replacement. The probability that both are red is:',
            options: ['2/15', '4/25', '1/6', '2/9'],
            correct: 0,
            topic: 'Probability',
            difficulty: 'medium',
            explanation: 'P(both red) = (4/10) × (3/9) = (2/5) × (1/3) = 2/15.'
          },
          {
            id: 'gate-s25-11',
            text: 'For an undirected graph, the sum of the degrees of all vertices equals:',
            options: ['The number of vertices', 'The number of edges', 'Twice the number of edges', 'Half the number of edges'],
            correct: 2,
            topic: 'Graph theory',
            difficulty: 'medium-hard',
            explanation: 'By the Handshaking Lemma, each edge contributes 2 to the total degree (one to each endpoint), so the sum of all vertex degrees equals twice the number of edges.'
          },
          {
            id: 'gate-s25-12',
            text: 'Which of the following is a tautology?',
            options: ['p ∧ ¬p', 'p ∨ ¬p', 'p → ¬p', 'p ∧ q'],
            correct: 1,
            topic: 'Propositional logic',
            difficulty: 'hard',
            explanation: 'p ∨ ¬p (law of excluded middle) is true for every truth value of p, hence a tautology. p ∧ ¬p is a contradiction; the others are contingent.'
          },
        ]},
        { id: 'cs', name: 'Computer Science (Core)', questions: [
          {
            id: 'gate-s25-13',
            text: 'A queue is implemented using a circular array of size n. The maximum number of elements it can hold (reserving no extra logic) when one slot is kept empty to distinguish full from empty is:',
            options: ['n', 'n − 1', 'n + 1', 'n/2'],
            correct: 1,
            topic: 'Data structures',
            difficulty: 'medium',
            explanation: 'In the common circular-queue scheme, one slot is left unused so that "full" (rear+1 == front) is distinguishable from "empty" (front == rear). Thus capacity is n − 1.'
          },
          {
            id: 'gate-s25-14',
            text: 'Performing a depth-first traversal that visits a node before its descendants and before going right is known as which traversal in a binary tree?',
            options: ['Inorder', 'Preorder', 'Postorder', 'Level-order'],
            correct: 1,
            topic: 'Data structures',
            difficulty: 'easy',
            explanation: 'Preorder visits the root first, then the left subtree, then the right subtree (Root, Left, Right).'
          },
          {
            id: 'gate-s25-15',
            text: 'Which algorithm design technique does the standard Merge Sort use?',
            options: ['Greedy', 'Dynamic programming', 'Divide and conquer', 'Backtracking'],
            correct: 2,
            topic: 'Algorithms & complexity',
            difficulty: 'easy',
            explanation: 'Merge Sort divides the array into halves, recursively sorts each half, then merges them, a textbook divide-and-conquer strategy.'
          },
          {
            id: 'gate-s25-16',
            text: 'The average-case time complexity of Quicksort is:',
            options: ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(log n)'],
            correct: 1,
            topic: 'Algorithms & complexity',
            difficulty: 'medium',
            explanation: 'On average a pivot splits the array into balanced parts, giving the recurrence T(n) = 2T(n/2) + Θ(n), which solves to Θ(n log n). (Worst case is Θ(n²).)'
          },
          {
            id: 'gate-s25-17',
            text: 'A system uses paging with a page size of 4 KB. A logical address space of 16 KB requires how many entries in the page table?',
            options: ['2', '4', '8', '16'],
            correct: 1,
            topic: 'Operating systems',
            difficulty: 'medium-hard',
            explanation: 'Number of pages = address space / page size = 16 KB / 4 KB = 4. The page table needs one entry per page, so 4 entries.'
          },
          {
            id: 'gate-s25-18',
            text: 'Which of the following is NOT one of the ACID properties of a database transaction?',
            options: ['Atomicity', 'Consistency', 'Isolation', 'Indexing'],
            correct: 3,
            topic: 'DBMS',
            difficulty: 'easy-medium',
            explanation: 'ACID stands for Atomicity, Consistency, Isolation and Durability. "Indexing" is a performance feature, not an ACID property.'
          },
          {
            id: 'gate-s25-19',
            text: 'In TCP, the mechanism that controls the amount of data a sender can transmit before receiving an acknowledgement is called:',
            options: ['Routing', 'Flow control (sliding window)', 'Fragmentation', 'Encryption'],
            correct: 1,
            topic: 'Computer networks',
            difficulty: 'medium',
            explanation: 'TCP uses a sliding-window flow-control mechanism: the receiver advertises a window size that limits how much unacknowledged data the sender may have outstanding.'
          },
          {
            id: 'gate-s25-20',
            text: 'The decimal value of the binary number 101101 is:',
            options: ['45', '44', '46', '43'],
            correct: 0,
            topic: 'Computer organization',
            difficulty: 'easy-medium',
            explanation: '101101 = 1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 32 + 8 + 4 + 1 = 45.'
          },
          {
            id: 'gate-s25-21',
            text: 'A cache has a hit ratio of 0.9 with a cache access time of 10 ns. On a hit only the cache is accessed (10 ns); on a miss the access takes an additional 100 ns of main memory time on top of the 10 ns cache lookup. The average memory access time is:',
            options: ['19 ns', '20 ns', '28 ns', '15 ns'],
            correct: 1,
            topic: 'Computer organization',
            difficulty: 'hard',
            explanation: 'Average = hit_ratio × cache_time + miss_ratio × (cache_time + memory_time) = 0.9 × 10 + 0.1 × (10 + 100) = 9 + 0.1 × 110 = 9 + 11 = 20 ns.'
          },
          {
            id: 'gate-s25-22',
            text: 'A grammar production of the form A → α, where A is a single non-terminal, is characteristic of which grammar class in the Chomsky hierarchy?',
            options: ['Regular grammar', 'Context-free grammar', 'Context-sensitive grammar', 'Unrestricted grammar'],
            correct: 1,
            topic: 'Theory of computation',
            difficulty: 'medium-hard',
            explanation: 'A context-free grammar restricts every production to have exactly one non-terminal on the left-hand side (A → α). Regular grammars are more restrictive on the right side; context-sensitive allow more context on the left.'
          },
          {
            id: 'gate-s25-23',
            text: 'In a compiler, the phase that checks whether a program follows the type rules of the language is:',
            options: ['Lexical analysis', 'Syntax analysis', 'Semantic analysis', 'Code generation'],
            correct: 2,
            topic: 'Compilers',
            difficulty: 'medium',
            explanation: 'Type checking is part of semantic analysis, which verifies meaning-related rules (such as type compatibility) that syntax analysis cannot enforce.'
          },
          {
            id: 'gate-s25-24',
            text: 'The Boolean expression A + A·B simplifies to:',
            options: ['A', 'B', 'A·B', 'A + B'],
            correct: 0,
            topic: 'Digital logic',
            difficulty: 'easy',
            explanation: 'By the absorption law, A + A·B = A·(1 + B) = A·1 = A.'
          },
          {
            id: 'gate-s25-25',
            text: 'The class of languages accepted by Turing machines that always halt is:',
            options: ['Regular languages', 'Context-free languages', 'Recursive (decidable) languages', 'Recursively enumerable but not recursive'],
            correct: 2,
            topic: 'Theory of computation',
            difficulty: 'hard',
            explanation: 'A Turing machine that halts on every input (accepting or rejecting) decides its language; the set of such languages is exactly the recursive (decidable) languages.'
          },
        ]},
      ],
    },
  ];
  window.EXAMS = (window.EXAMS || []).concat(mocks);
})();
