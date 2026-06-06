(function () {
  const mock20 = {
    id: 'jee-main-short-20',
    name: 'JEE Main — Short Mock (20 Questions)',
    template: 'nta',
    examCatalogueId: 'jee-main',
    kind: 'mock', scope: 'short', sectionTag: null,
    durationMin: 15,
    marking: { correct: 4, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'phy', name: 'Physics', questions: [
        {
          id: 'jee-main-s20-1',
          text: 'A particle starts from rest and moves with constant acceleration 4 m/s². What distance does it cover in the 3rd second of its motion?',
          options: ['8 m', '10 m', '12 m', '16 m'],
          correct: 1,
          topic: 'Kinematics', difficulty: 'easy',
          explanation: 'Distance in nth second sₙ = u + (a/2)(2n−1) = 0 + (4/2)(2×3−1) = 2×5 = 10 m. Option (b).'
        },
        {
          id: 'jee-main-s20-2',
          text: 'A force of 12 N acts on a 3 kg body resting on a frictionless surface. The acceleration produced is:',
          options: ['2 m/s²', '3 m/s²', '4 m/s²', '6 m/s²'],
          correct: 2,
          topic: 'Laws of Motion', difficulty: 'easy',
          explanation: 'a = F/m = 12/3 = 4 m/s². Option (c).'
        },
        {
          id: 'jee-main-s20-3',
          text: 'A body of mass 2 kg moving at 5 m/s is brought to rest. The work done by the stopping force is:',
          options: ['−10 J', '−25 J', '−50 J', '−5 J'],
          correct: 1,
          topic: 'Work-Energy', difficulty: 'easy-medium',
          explanation: 'Work–energy theorem: W = ΔKE = 0 − ½mv² = −½×2×5² = −25 J. Option (b).'
        },
        {
          id: 'jee-main-s20-4',
          text: 'A solid sphere and a solid cylinder of equal mass and radius roll down a fixed incline without slipping. Which reaches the bottom first?',
          options: ['Cylinder', 'Sphere', 'Both together', 'Cannot be determined'],
          correct: 1,
          topic: 'Rotation', difficulty: 'medium',
          explanation: 'Acceleration a = g sinθ /(1 + k²/R²). Sphere k²/R² = 2/5, cylinder = 1/2. Smaller ratio (sphere) gives larger a, so sphere arrives first. Option (b).'
        },
        {
          id: 'jee-main-s20-5',
          text: 'The acceleration due to gravity at a height equal to the radius of the Earth (above the surface) is what fraction of its value on the surface?',
          options: ['1/2', '1/3', '1/4', '1/9'],
          correct: 2,
          topic: 'Gravitation', difficulty: 'medium-hard',
          explanation: 'g\' = g R²/(R+h)². At h = R: g\' = g R²/(2R)² = g/4. Option (c).'
        },
        {
          id: 'jee-main-s20-6',
          text: 'A particle in SHM has amplitude 0.05 m and angular frequency 10 rad/s. Its maximum speed is:',
          options: ['0.25 m/s', '0.5 m/s', '1.0 m/s', '5.0 m/s'],
          correct: 1,
          topic: 'SHM/Waves', difficulty: 'easy-medium',
          explanation: 'v_max = Aω = 0.05 × 10 = 0.5 m/s. Option (b).'
        },
        {
          id: 'jee-main-s20-7',
          text: 'An ideal gas does 200 J of work on its surroundings while absorbing 500 J of heat. The change in its internal energy is:',
          options: ['300 J', '700 J', '−300 J', '200 J'],
          correct: 0,
          topic: 'Thermodynamics', difficulty: 'medium',
          explanation: 'First law: ΔU = Q − W = 500 − 200 = 300 J. Option (a).'
        },
      ]},
      { id: 'che', name: 'Chemistry', questions: [
        {
          id: 'jee-main-s20-8',
          text: 'How many moles of oxygen atoms are present in 1 mole of CO₂?',
          options: ['1', '2', '3', '0.5'],
          correct: 1,
          topic: 'Mole Concept', difficulty: 'easy',
          explanation: 'Each CO₂ molecule has 2 O atoms, so 1 mole CO₂ contains 2 moles of O atoms. Option (b).'
        },
        {
          id: 'jee-main-s20-9',
          text: 'The maximum number of electrons that can occupy the n = 3 shell is:',
          options: ['8', '9', '18', '32'],
          correct: 2,
          topic: 'Atomic Structure', difficulty: 'easy',
          explanation: 'Maximum electrons = 2n² = 2×3² = 18. Option (c).'
        },
        {
          id: 'jee-main-s20-10',
          text: 'Which of the following molecules has a linear shape according to VSEPR theory?',
          options: ['H₂O', 'NH₃', 'CO₂', 'SO₂'],
          correct: 2,
          topic: 'Bonding', difficulty: 'easy-medium',
          explanation: 'CO₂ has 2 bonding pairs and no lone pairs on C (sp hybridised), giving 180° linear geometry. H₂O and SO₂ are bent, NH₃ is pyramidal. Option (c).'
        },
        {
          id: 'jee-main-s20-11',
          text: 'Across a period from left to right in the periodic table, the atomic radius generally:',
          options: ['Increases', 'Decreases', 'Remains constant', 'First increases then decreases'],
          correct: 1,
          topic: 'Periodicity', difficulty: 'easy-medium',
          explanation: 'Effective nuclear charge increases across a period while the shell number stays the same, pulling electrons inward, so atomic radius decreases. Option (b).'
        },
        {
          id: 'jee-main-s20-12',
          text: 'For a reaction at equilibrium, if Kc = 1, then:',
          options: ['Reactants are favoured', 'Products are favoured', 'Concentrations of reactants and products terms are comparable', 'Reaction has not started'],
          correct: 2,
          topic: 'Equilibrium', difficulty: 'medium',
          explanation: 'Kc = [products]/[reactants] terms = 1 means the equilibrium concentration terms of products and reactants are comparable (neither side strongly favoured). Option (c).'
        },
        {
          id: 'jee-main-s20-13',
          text: 'In which compound does carbon show the +2 oxidation state?',
          options: ['CO₂', 'CO', 'CH₄', 'CCl₄'],
          correct: 1,
          topic: 'GOC', difficulty: 'medium-hard',
          explanation: 'In CO, O is −2 and the molecule is neutral, so C = +2. In CO₂ C = +4, CH₄ C = −4, CCl₄ C = +4. Option (b).'
        },
        {
          id: 'jee-main-s20-14',
          text: 'The coordination number of the central metal ion in the complex [Co(NH₃)₆]³⁺ is:',
          options: ['3', '4', '6', '2'],
          correct: 2,
          topic: 'Coordination', difficulty: 'medium',
          explanation: 'Six NH₃ ligands, each monodentate, give coordination number 6. Option (c).'
        },
      ]},
      { id: 'math', name: 'Mathematics', questions: [
        {
          id: 'jee-main-s20-15',
          text: 'The sum of the roots of the quadratic equation 2x² − 8x + 6 = 0 is:',
          options: ['3', '4', '6', '8'],
          correct: 1,
          topic: 'Quadratics', difficulty: 'easy',
          explanation: 'Sum of roots = −b/a = −(−8)/2 = 4. Option (b).'
        },
        {
          id: 'jee-main-s20-16',
          text: 'The 10th term of the arithmetic progression 3, 7, 11, 15, ... is:',
          options: ['37', '39', '41', '43'],
          correct: 1,
          topic: 'Sequences', difficulty: 'easy',
          explanation: 'a = 3, d = 4. T₁₀ = a + 9d = 3 + 36 = 39. Option (b).'
        },
        {
          id: 'jee-main-s20-17',
          text: 'The number of ways to arrange the letters of the word "BALL" is:',
          options: ['6', '12', '24', '4'],
          correct: 1,
          topic: 'P&C', difficulty: 'easy-medium',
          explanation: '4 letters with L repeated twice: 4!/2! = 24/2 = 12. Option (b).'
        },
        {
          id: 'jee-main-s20-18',
          text: 'The value of lim(x→0) (sin 3x)/x is:',
          options: ['0', '1', '3', '∞'],
          correct: 2,
          topic: 'Calculus (Limits)', difficulty: 'medium',
          explanation: 'lim(x→0) sin3x/x = lim 3·(sin3x)/(3x) = 3×1 = 3. Option (c).'
        },
        {
          id: 'jee-main-s20-19',
          text: 'The derivative of f(x) = x³ − 4x with respect to x at x = 2 is:',
          options: ['4', '8', '12', '0'],
          correct: 1,
          topic: 'Calculus (Derivatives)', difficulty: 'medium-hard',
          explanation: 'f\'(x) = 3x² − 4. At x = 2: 3×4 − 4 = 12 − 4 = 8. Option (b).'
        },
        {
          id: 'jee-main-s20-20',
          text: 'A fair die is rolled once. The probability of getting a number greater than 4 is:',
          options: ['1/6', '1/3', '1/2', '2/3'],
          correct: 1,
          topic: 'Probability', difficulty: 'hard',
          explanation: 'Favourable outcomes: 5 and 6, i.e. 2 outcomes out of 6. Probability = 2/6 = 1/3. Option (b).'
        },
      ]},
    ],
  };

  const mock25 = {
    id: 'jee-main-short-25',
    name: 'JEE Main — Short Mock (25 Questions)',
    template: 'nta',
    examCatalogueId: 'jee-main',
    kind: 'mock', scope: 'short', sectionTag: null,
    durationMin: 20,
    marking: { correct: 4, wrong: -1, unattempted: 0 },
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['en'],
    sections: [
      { id: 'phy', name: 'Physics', questions: [
        {
          id: 'jee-main-s25-1',
          text: 'A car accelerates uniformly from 10 m/s to 30 m/s in 5 s. Its acceleration is:',
          options: ['2 m/s²', '4 m/s²', '5 m/s²', '8 m/s²'],
          correct: 1,
          topic: 'Kinematics', difficulty: 'easy',
          explanation: 'a = (v−u)/t = (30−10)/5 = 20/5 = 4 m/s². Option (b).'
        },
        {
          id: 'jee-main-s25-2',
          text: 'A 5 kg block experiences a net force of 20 N. The magnitude of its acceleration is:',
          options: ['2 m/s²', '4 m/s²', '5 m/s²', '100 m/s²'],
          correct: 1,
          topic: 'Laws of Motion', difficulty: 'easy',
          explanation: 'a = F/m = 20/5 = 4 m/s². Option (b).'
        },
        {
          id: 'jee-main-s25-3',
          text: 'A pump raises 100 kg of water to a height of 10 m in 20 s. The power delivered is (g = 10 m/s²):',
          options: ['250 W', '500 W', '1000 W', '2000 W'],
          correct: 1,
          topic: 'Work-Energy', difficulty: 'easy-medium',
          explanation: 'Work = mgh = 100×10×10 = 10000 J. Power = W/t = 10000/20 = 500 W. Option (b).'
        },
        {
          id: 'jee-main-s25-4',
          text: 'The moment of inertia of a uniform disc of mass M and radius R about its central axis perpendicular to its plane is:',
          options: ['MR²', '½MR²', '¼MR²', '⅖MR²'],
          correct: 1,
          topic: 'Rotation', difficulty: 'medium',
          explanation: 'For a uniform disc about its central axis, I = ½MR². Option (b).'
        },
        {
          id: 'jee-main-s25-5',
          text: 'The escape velocity from the surface of a planet is √2 times its orbital velocity for a low orbit. If orbital velocity is 7 km/s, the escape velocity is approximately:',
          options: ['7 km/s', '9.9 km/s', '14 km/s', '4.9 km/s'],
          correct: 1,
          topic: 'Gravitation', difficulty: 'medium-hard',
          explanation: 'v_escape = √2 × v_orbit = 1.414 × 7 ≈ 9.9 km/s. Option (b).'
        },
        {
          id: 'jee-main-s25-6',
          text: 'A simple pendulum has time period 2 s. If its length is made 4 times, the new time period is:',
          options: ['1 s', '2 s', '4 s', '8 s'],
          correct: 2,
          topic: 'SHM/Waves', difficulty: 'easy-medium',
          explanation: 'T ∝ √L, so quadrupling L doubles T: 2 × 2 = 4 s. Option (c).'
        },
        {
          id: 'jee-main-s25-7',
          text: 'A Carnot engine operates between 500 K and 300 K. Its efficiency is:',
          options: ['20%', '40%', '60%', '80%'],
          correct: 1,
          topic: 'Thermodynamics', difficulty: 'medium',
          explanation: 'η = 1 − T_cold/T_hot = 1 − 300/500 = 1 − 0.6 = 0.4 = 40%. Option (b).'
        },
        {
          id: 'jee-main-s25-8',
          text: 'Two point charges of +2 μC each are placed 3 m apart in vacuum. The magnitude of the force between them is (k = 9×10⁹ N·m²/C²):',
          options: ['2×10⁻³ N', '4×10⁻³ N', '6×10⁻³ N', '9×10⁻³ N'],
          correct: 1,
          topic: 'Electrostatics', difficulty: 'medium-hard',
          explanation: 'F = kq₁q₂/r² = 9×10⁹ × (2×10⁻⁶)² / 3² = 9×10⁹ × 4×10⁻¹² / 9 = 4×10⁻³ N. Option (b).'
        },
        {
          id: 'jee-main-s25-9',
          text: 'The work function of a metal is 2 eV. The threshold wavelength for photoemission is approximately (use hc ≈ 1240 eV·nm):',
          options: ['310 nm', '620 nm', '1240 nm', '155 nm'],
          correct: 1,
          topic: 'Modern Physics', difficulty: 'hard',
          explanation: 'λ_threshold = hc/W = 1240/2 = 620 nm. Option (b).'
        },
      ]},
      { id: 'che', name: 'Chemistry', questions: [
        {
          id: 'jee-main-s25-10',
          text: 'The number of molecules in 0.5 mole of N₂ gas is (Nₐ = 6.022×10²³):',
          options: ['3.011×10²³', '6.022×10²³', '1.204×10²⁴', '1.505×10²³'],
          correct: 0,
          topic: 'Mole Concept', difficulty: 'easy',
          explanation: 'Number = 0.5 × 6.022×10²³ = 3.011×10²³ molecules. Option (a).'
        },
        {
          id: 'jee-main-s25-11',
          text: 'The number of unpaired electrons in a nitrogen atom (Z = 7) in its ground state is:',
          options: ['1', '2', '3', '0'],
          correct: 2,
          topic: 'Atomic Structure', difficulty: 'easy',
          explanation: 'N: 1s² 2s² 2p³. The three 2p electrons singly occupy three orbitals (Hund\'s rule), giving 3 unpaired electrons. Option (c).'
        },
        {
          id: 'jee-main-s25-12',
          text: 'Which of the following has the maximum number of lone pairs on the central atom?',
          options: ['CH₄', 'NH₃', 'H₂O', 'BF₃'],
          correct: 2,
          topic: 'Bonding', difficulty: 'easy-medium',
          explanation: 'Lone pairs on central atom: CH₄ = 0, NH₃ = 1, H₂O = 2, BF₃ = 0. H₂O has the most. Option (c).'
        },
        {
          id: 'jee-main-s25-13',
          text: 'Which element has the highest first ionization enthalpy among the following?',
          options: ['Na', 'Mg', 'Al', 'Ar'],
          correct: 3,
          topic: 'Periodicity', difficulty: 'medium',
          explanation: 'Ionization enthalpy increases across a period; Ar (a noble gas with a stable closed shell) has the highest among these. Option (d).'
        },
        {
          id: 'jee-main-s25-14',
          text: 'For the reaction N₂ + 3H₂ ⇌ 2NH₃, if the volume of the container is decreased (pressure increased), the equilibrium shifts:',
          options: ['Towards reactants', 'Towards products', 'No shift', 'Depends on temperature only'],
          correct: 1,
          topic: 'Equilibrium', difficulty: 'medium-hard',
          explanation: 'Increasing pressure shifts equilibrium toward the side with fewer gas moles. Left has 4 moles (1+3), right has 2 moles, so it shifts toward products. Option (b).'
        },
        {
          id: 'jee-main-s25-15',
          text: 'During the standard reduction half-reaction Cu²⁺ + 2e⁻ → Cu, copper undergoes:',
          options: ['Oxidation', 'Reduction', 'Neither', 'Disproportionation'],
          correct: 1,
          topic: 'Electrochemistry', difficulty: 'medium',
          explanation: 'Cu²⁺ gains electrons (oxidation state +2 → 0), which is a gain of electrons, i.e. reduction. Option (b).'
        },
        {
          id: 'jee-main-s25-16',
          text: 'The functional group present in an aldehyde is:',
          options: ['−OH', '−COOH', '−CHO', '−CO−'],
          correct: 2,
          topic: 'Functional Groups', difficulty: 'easy-medium',
          explanation: 'Aldehydes contain the −CHO (formyl) group. −OH is alcohol, −COOH carboxylic acid, −CO− ketone. Option (c).'
        },
        {
          id: 'jee-main-s25-17',
          text: 'Standard enthalpy of formation of an element in its most stable form is:',
          options: ['Always positive', 'Always negative', 'Zero', 'Equal to its atomic mass'],
          correct: 2,
          topic: 'Thermodynamics', difficulty: 'hard',
          explanation: 'By convention the standard enthalpy of formation of an element in its reference (most stable) state is zero. Option (c).'
        },
      ]},
      { id: 'math', name: 'Mathematics', questions: [
        {
          id: 'jee-main-s25-18',
          text: 'If one root of x² − 5x + k = 0 is 2, the value of k is:',
          options: ['4', '6', '8', '10'],
          correct: 1,
          topic: 'Quadratics', difficulty: 'easy',
          explanation: 'Substituting x = 2: 4 − 10 + k = 0 ⇒ k = 6. Option (b).'
        },
        {
          id: 'jee-main-s25-19',
          text: 'The sum of the first 20 natural numbers is:',
          options: ['200', '210', '190', '220'],
          correct: 1,
          topic: 'Sequences', difficulty: 'easy',
          explanation: 'Sum = n(n+1)/2 = 20×21/2 = 210. Option (b).'
        },
        {
          id: 'jee-main-s25-20',
          text: 'The number of diagonals in a regular hexagon is:',
          options: ['6', '9', '12', '15'],
          correct: 1,
          topic: 'P&C', difficulty: 'easy-medium',
          explanation: 'Diagonals = n(n−3)/2 = 6×3/2 = 9. Option (b).'
        },
        {
          id: 'jee-main-s25-21',
          text: 'The coefficient of x² in the expansion of (1 + x)⁵ is:',
          options: ['5', '10', '15', '20'],
          correct: 1,
          topic: 'Binomial', difficulty: 'medium',
          explanation: 'Coefficient = C(5,2) = 5!/(2!3!) = 10. Option (b).'
        },
        {
          id: 'jee-main-s25-22',
          text: 'The value of sin 30° + cos 60° is:',
          options: ['0', '½', '1', '√3'],
          correct: 2,
          topic: 'Trigonometry', difficulty: 'easy-medium',
          explanation: 'sin 30° = ½ and cos 60° = ½, so the sum = ½ + ½ = 1. Option (c).'
        },
        {
          id: 'jee-main-s25-23',
          text: 'The value of the integral ∫₀¹ 2x dx is:',
          options: ['0', '1', '2', '½'],
          correct: 1,
          topic: 'Calculus (Integration)', difficulty: 'medium-hard',
          explanation: '∫2x dx = x². Evaluated from 0 to 1: 1² − 0² = 1. Option (b).'
        },
        {
          id: 'jee-main-s25-24',
          text: 'The distance between the points (1, 2) and (4, 6) is:',
          options: ['3', '4', '5', '7'],
          correct: 2,
          topic: 'Coordinate Geometry', difficulty: 'medium',
          explanation: 'd = √[(4−1)² + (6−2)²] = √(9 + 16) = √25 = 5. Option (c).'
        },
        {
          id: 'jee-main-s25-25',
          text: 'The value of the determinant |[2 0; 3 4]| (2×2 matrix with rows [2,0] and [3,4]) is:',
          options: ['6', '8', '11', '14'],
          correct: 1,
          topic: 'Matrices/Determinants', difficulty: 'hard',
          explanation: 'Determinant = (2×4) − (0×3) = 8 − 0 = 8. Option (b).'
        },
      ]},
    ],
  };

  const mocks = [mock20, mock25];
  window.EXAMS = (window.EXAMS || []).concat(mocks);
})();
