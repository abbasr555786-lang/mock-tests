(function () {
  const mocks = [
    {
      id: 'neet-ug-short-20',
      name: 'NEET UG — Short Mock (20 Questions)',
      template: 'nta',
      examCatalogueId: 'neet-ug',
      kind: 'mock', scope: 'short', sectionTag: null,
      durationMin: 15,
      marking: { correct: 4, wrong: -1, unattempted: 0 },
      allowSectionSwitch: true, timerMode: 'full', calculator: false,
      questionTypes: ['mcq'], languages: ['en'],
      sections: [
        { id: 'phy', name: 'Physics', questions: [
          {
            id: 'neet-ug-s20-1',
            text: 'A body starts from rest and moves with uniform acceleration of 2 m/s². What distance does it cover in the 4th second of its motion?',
            options: ['7 m', '8 m', '14 m', '16 m'],
            correct: 0,
            topic: 'Mechanics', difficulty: 'easy-medium',
            explanation: 'Distance in nth second = u + a(2n − 1)/2 = 0 + 2(2×4 − 1)/2 = 2(7)/2 = 7 m. Option (1) is 7 m.'
          },
          {
            id: 'neet-ug-s20-2',
            text: 'The SI unit of coefficient of viscosity is:',
            options: ['N s m⁻²', 'N m⁻² s⁻¹', 'N m s⁻¹', 'N m⁻¹ s'],
            correct: 0,
            topic: 'Mechanics', difficulty: 'easy',
            explanation: 'From F = η A (dv/dx), η = F/(A·velocity gradient). Units = N / (m² × s⁻¹) = N·s·m⁻². Equivalent to Pa·s. Option (1).'
          },
          {
            id: 'neet-ug-s20-3',
            text: 'A heat engine operating between 500 K and 300 K has its source at 500 K. What is its maximum possible efficiency?',
            options: ['20%', '40%', '60%', '80%'],
            correct: 1,
            topic: 'Thermodynamics', difficulty: 'medium',
            explanation: 'Maximum (Carnot) efficiency = 1 − T_cold/T_hot = 1 − 300/500 = 1 − 0.6 = 0.4 = 40%. Option (2).'
          },
          {
            id: 'neet-ug-s20-4',
            text: 'Two charges of +4 μC and +1 μC are placed 30 cm apart. At what distance from the +4 μC charge (along the line joining them) is the net electric field zero?',
            options: ['10 cm', '15 cm', '20 cm', '25 cm'],
            correct: 2,
            topic: 'Electrostatics', difficulty: 'medium-hard',
            explanation: 'Null point lies between the like charges. Let x from +4 μC. k(4)/x² = k(1)/(0.30 − x)². Taking √: 2/x = 1/(0.30 − x) → 2(0.30 − x) = x → 0.60 = 3x → x = 0.20 m = 20 cm. Option (3).'
          },
          {
            id: 'neet-ug-s20-5',
            text: 'Light of wavelength 500 nm in vacuum enters a medium of refractive index 1.5. Its wavelength in the medium is:',
            options: ['333 nm', '500 nm', '750 nm', '250 nm'],
            correct: 0,
            topic: 'Optics', difficulty: 'easy-medium',
            explanation: 'Frequency is unchanged; λ_medium = λ_vacuum / n = 500/1.5 = 333.3 nm. Option (1).'
          }
        ]},
        { id: 'che', name: 'Chemistry', questions: [
          {
            id: 'neet-ug-s20-6',
            text: 'How many moles of oxygen atoms are present in 0.5 mol of CO₂?',
            options: ['0.5 mol', '1.0 mol', '1.5 mol', '2.0 mol'],
            correct: 1,
            topic: 'Mole concept/Stoichiometry', difficulty: 'easy',
            explanation: 'Each CO₂ has 2 O atoms, so 0.5 mol CO₂ contains 0.5 × 2 = 1.0 mol of O atoms. Option (2).'
          },
          {
            id: 'neet-ug-s20-7',
            text: 'Which of the following molecules has a non-zero dipole moment?',
            options: ['CO₂', 'BF₃', 'CCl₄', 'NH₃'],
            correct: 3,
            topic: 'Chemical bonding', difficulty: 'medium',
            explanation: 'NH₃ is pyramidal (sp³, one lone pair), so bond dipoles do not cancel and it is polar. CO₂ (linear), BF₃ (trigonal planar) and CCl₄ (tetrahedral) are symmetric with zero net dipole. Option (4).'
          },
          { id: 'neet-ug-s20-8', text: 'Which element has the highest electronegativity?', options: ['Oxygen', 'Fluorine', 'Chlorine', 'Nitrogen'], correct: 1, topic: 'Periodicity', difficulty: 'easy', explanation: 'Fluorine is the most electronegative element on the Pauling scale (≈4.0).' },
          {
            id: 'neet-ug-s20-9',
            text: 'For the equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g), increasing the pressure (decreasing volume) at constant temperature shifts the equilibrium:',
            options: ['toward reactants', 'toward products', 'no shift', 'first toward reactants then products'],
            correct: 1,
            topic: 'Equilibrium', difficulty: 'medium-hard',
            explanation: 'By Le Chatelier, increasing pressure favours the side with fewer gas moles. Reactant side = 4 mol, product side = 2 mol, so equilibrium shifts toward products (NH₃). Option (2).'
          },
          { id: 'neet-ug-s20-10', text: 'The functional group —COOH is characteristic of which class of organic compounds?', options: ['Aldehydes', 'Ketones', 'Carboxylic acids', 'Alcohols'], correct: 2, topic: 'Organic functional groups', difficulty: 'easy-medium', explanation: 'The —COOH (carboxyl) group is the characteristic functional group of carboxylic acids.' }
        ]},
        { id: 'bio', name: 'Biology', questions: [
          {
            id: 'neet-ug-s20-11',
            text: 'Which cell organelle is bounded by a single membrane and contains hydrolytic enzymes for intracellular digestion?',
            options: ['Mitochondrion', 'Lysosome', 'Ribosome', 'Centriole'],
            correct: 1,
            topic: 'Cell biology', difficulty: 'easy',
            explanation: 'Lysosomes are single-membrane-bound vesicles rich in acid hydrolases that digest worn-out organelles and engulfed material. Mitochondria are double-membraned; ribosomes and centrioles lack membranes. Option (2).'
          },
          {
            id: 'neet-ug-s20-12',
            text: 'In a DNA double helix, adenine pairs with thymine through how many hydrogen bonds?',
            options: ['One', 'Two', 'Three', 'Four'],
            correct: 1,
            topic: 'Genetics/Molecular biology', difficulty: 'easy-medium',
            explanation: 'A–T base pairs are held by two hydrogen bonds, whereas G–C pairs have three. Option (2).'
          },
          {
            id: 'neet-ug-s20-13',
            text: 'The opening and closing of stomata in plants is primarily regulated by the turgor changes of:',
            options: ['Epidermal cells', 'Guard cells', 'Mesophyll cells', 'Companion cells'],
            correct: 1,
            topic: 'Plant physiology', difficulty: 'medium',
            explanation: 'Guard cells flank the stomatal pore; when they gain water and become turgid the stoma opens, and when they lose turgor it closes. Option (2).'
          },
          {
            id: 'neet-ug-s20-14',
            text: 'Which blood vessel carries oxygenated blood from the lungs to the left atrium of the human heart?',
            options: ['Pulmonary artery', 'Pulmonary vein', 'Aorta', 'Vena cava'],
            correct: 1,
            topic: 'Human physiology', difficulty: 'easy-medium',
            explanation: 'The pulmonary veins carry oxygenated blood from the lungs to the left atrium. The pulmonary artery carries deoxygenated blood to the lungs. Option (2).'
          },
          {
            id: 'neet-ug-s20-15',
            text: 'According to Darwin, the driving force of evolution leading to "survival of the fittest" is:',
            options: ['Use and disuse of organs', 'Natural selection', 'Inheritance of acquired characters', 'Genetic drift'],
            correct: 1,
            topic: 'Evolution', difficulty: 'medium',
            explanation: 'Darwinism proposes that natural selection acts on heritable variation, allowing better-adapted individuals to survive and reproduce. Use/disuse and inheritance of acquired characters are Lamarckian ideas. Option (2).'
          },
          {
            id: 'neet-ug-s20-16',
            text: 'In an ecosystem, organisms that obtain energy by breaking down dead organic matter are called:',
            options: ['Producers', 'Primary consumers', 'Decomposers', 'Top carnivores'],
            correct: 2,
            topic: 'Ecology', difficulty: 'easy',
            explanation: 'Decomposers (e.g., fungi and bacteria) are saprotrophs that break down detritus, releasing inorganic nutrients back to the environment. Option (3).'
          },
          {
            id: 'neet-ug-s20-17',
            text: 'The restriction enzyme EcoRI used in genetic engineering acts as a:',
            options: ['Ligase joining DNA fragments', 'Molecular scissors cutting DNA at specific sequences', 'Polymerase synthesizing DNA', 'Primer for replication'],
            correct: 1,
            topic: 'Biotechnology', difficulty: 'medium-hard',
            explanation: 'Restriction endonucleases such as EcoRI recognise specific palindromic sequences (GAATTC) and cleave the phosphodiester backbone, acting as molecular scissors. Ligase joins fragments. Option (2).'
          },
          {
            id: 'neet-ug-s20-18',
            text: 'In angiosperms, double fertilization results in the formation of a diploid zygote and a:',
            options: ['Haploid endosperm', 'Triploid endosperm', 'Diploid endosperm', 'Tetraploid endosperm'],
            correct: 1,
            topic: 'Reproduction', difficulty: 'medium-hard',
            explanation: 'One male gamete fuses with the egg (forming the diploid zygote) and the second fuses with the two polar nuclei of the central cell, giving a triploid (3n) primary endosperm nucleus. Option (2).'
          },
          {
            id: 'neet-ug-s20-19',
            text: 'The causative agent of malaria, Plasmodium, is transmitted to humans by the bite of:',
            options: ['Male Anopheles mosquito', 'Female Anopheles mosquito', 'Female Culex mosquito', 'Female Aedes mosquito'],
            correct: 1,
            topic: 'Biology in human welfare', difficulty: 'easy-medium',
            explanation: 'Only the female Anopheles mosquito acts as the vector, transmitting Plasmodium sporozoites during a blood meal. Culex and Aedes transmit other diseases. Option (2).'
          },
          {
            id: 'neet-ug-s20-20',
            text: 'Venation in the leaves of monocotyledonous plants is typically:',
            options: ['Reticulate', 'Parallel', 'Furcate', 'Palmate'],
            correct: 1,
            topic: 'Morphology', difficulty: 'hard',
            explanation: 'Monocots characteristically show parallel venation (veins run parallel to one another), whereas dicots usually show reticulate (net-like) venation. Option (2).'
          }
        ]}
      ]
    },
    {
      id: 'neet-ug-short-25',
      name: 'NEET UG — Short Mock (25 Questions)',
      template: 'nta',
      examCatalogueId: 'neet-ug',
      kind: 'mock', scope: 'short', sectionTag: null,
      durationMin: 20,
      marking: { correct: 4, wrong: -1, unattempted: 0 },
      allowSectionSwitch: true, timerMode: 'full', calculator: false,
      questionTypes: ['mcq'], languages: ['en'],
      sections: [
        { id: 'phy', name: 'Physics', questions: [
          {
            id: 'neet-ug-s25-1',
            text: 'A ball is thrown vertically upward with a speed of 20 m/s. Taking g = 10 m/s², the maximum height reached is:',
            options: ['10 m', '20 m', '30 m', '40 m'],
            correct: 1,
            topic: 'Mechanics', difficulty: 'easy',
            explanation: 'At maximum height v = 0. Using v² = u² − 2gh → 0 = 20² − 2(10)h → h = 400/20 = 20 m. Option (2).'
          },
          {
            id: 'neet-ug-s25-2',
            text: 'A wave has a frequency of 256 Hz and travels at 340 m/s in air. Its wavelength is approximately:',
            options: ['0.75 m', '1.33 m', '1.50 m', '2.66 m'],
            correct: 1,
            topic: 'Waves', difficulty: 'easy-medium',
            explanation: 'λ = v/f = 340/256 = 1.328 ≈ 1.33 m. Option (2).'
          },
          {
            id: 'neet-ug-s25-3',
            text: 'The equivalent resistance of two resistors 6 Ω and 3 Ω connected in parallel is:',
            options: ['1 Ω', '2 Ω', '4.5 Ω', '9 Ω'],
            correct: 1,
            topic: 'Current electricity', difficulty: 'easy-medium',
            explanation: 'For parallel: 1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 → R = 2 Ω. Option (2).'
          },
          {
            id: 'neet-ug-s25-4',
            text: 'When a gas is compressed adiabatically, which statement is correct?',
            options: ['Heat is added to the gas', 'Temperature of the gas decreases', 'Internal energy increases due to work done on the gas', 'No change in internal energy'],
            correct: 2,
            topic: 'Thermodynamics', difficulty: 'medium-hard',
            explanation: 'In an adiabatic process Q = 0, so ΔU = −W. When the gas is compressed, work is done on the gas (W is negative), hence ΔU is positive — internal energy and temperature both rise. Option (3).'
          },
          {
            id: 'neet-ug-s25-5',
            text: 'In the photoelectric effect, if the frequency of incident light is increased (above threshold) while keeping intensity constant, the maximum kinetic energy of emitted electrons:',
            options: ['Decreases', 'Increases', 'Remains the same', 'Becomes zero'],
            correct: 1,
            topic: 'Modern physics', difficulty: 'medium',
            explanation: 'By Einstein’s equation KE_max = hf − φ. KE_max depends linearly on frequency, so increasing f increases KE_max. Intensity affects only the number of electrons, not their energy. Option (2).'
          },
          {
            id: 'neet-ug-s25-6',
            text: 'A point charge produces an electric field of magnitude 200 N/C at a distance of 3 m. The field magnitude at a distance of 6 m from the same charge is:',
            options: ['25 N/C', '50 N/C', '100 N/C', '400 N/C'],
            correct: 1,
            topic: 'Electrostatics', difficulty: 'hard',
            explanation: 'E ∝ 1/r². Doubling distance (3 m → 6 m) reduces E by a factor of 2² = 4. So E = 200/4 = 50 N/C. Option (2).'
          }
        ]},
        { id: 'che', name: 'Chemistry', questions: [
          {
            id: 'neet-ug-s25-7',
            text: 'The number of molecules in 11.2 litres of an ideal gas at STP is approximately:',
            options: ['6.022 × 10²³', '3.011 × 10²³', '1.204 × 10²⁴', '1.505 × 10²³'],
            correct: 1,
            topic: 'Mole concept/Stoichiometry', difficulty: 'medium',
            explanation: 'At STP 22.4 L = 1 mol = 6.022 × 10²³ molecules. So 11.2 L = 0.5 mol = 0.5 × 6.022 × 10²³ = 3.011 × 10²³ molecules. Option (2).'
          },
          {
            id: 'neet-ug-s25-8',
            text: 'The hybridization of the carbon atom in methane (CH₄) is:',
            options: ['sp', 'sp²', 'sp³', 'sp³d'],
            correct: 2,
            topic: 'Chemical bonding', difficulty: 'easy',
            explanation: 'Carbon in CH₄ forms four equivalent sigma bonds with tetrahedral geometry (bond angle 109.5°), which corresponds to sp³ hybridization. Option (3).'
          },
          { id: 'neet-ug-s25-9', text: 'Which of the following has the largest atomic radius?', options: ['Lithium', 'Sodium', 'Potassium', 'Rubidium'], correct: 3, topic: 'Periodicity', difficulty: 'medium-hard', explanation: 'Atomic radius increases down a group as new shells are added; among these Group 1 elements, rubidium (period 5) has the largest atomic radius.' },
          {
            id: 'neet-ug-s25-10',
            text: 'For a reaction at equilibrium, the equilibrium constant K is related to standard Gibbs energy change by ΔG° = −RT ln K. If ΔG° is negative, then:',
            options: ['K < 1, reactants favoured', 'K > 1, products favoured', 'K = 1, equal amounts', 'K = 0, no reaction'],
            correct: 1,
            topic: 'Equilibrium', difficulty: 'medium',
            explanation: 'ΔG° = −RT ln K. If ΔG° is negative, then ln K is positive, so K > 1, meaning products are favoured at equilibrium. Option (2).'
          },
          {
            id: 'neet-ug-s25-11',
            text: 'Glucose and fructose are examples of which class of biomolecules?',
            options: ['Amino acids', 'Monosaccharides', 'Fatty acids', 'Nucleotides'],
            correct: 1,
            topic: 'Biomolecules', difficulty: 'easy-medium',
            explanation: 'Glucose (an aldohexose) and fructose (a ketohexose) are simple sugars that cannot be hydrolysed into smaller carbohydrates, so they are monosaccharides. Option (2).'
          },
          {
            id: 'neet-ug-s25-12',
            text: 'In the coordination compound K₄[Fe(CN)₆], the oxidation state of iron is:',
            options: ['+1', '+2', '+3', '+4'],
            correct: 1,
            topic: 'Coordination compounds', difficulty: 'hard',
            explanation: 'K is +1 (×4 = +4), CN is −1 (×6 = −6). Overall compound is neutral: 4(+1) + x + 6(−1) = 0 → 4 + x − 6 = 0 → x = +2. Iron is in the +2 oxidation state. Option (2).'
          }
        ]},
        { id: 'bio', name: 'Biology', questions: [
          {
            id: 'neet-ug-s25-13',
            text: 'Which of the following is NOT a feature of prokaryotic cells?',
            options: ['Absence of a true nucleus', 'Presence of 70S ribosomes', 'Presence of membrane-bound organelles', 'Presence of a single circular chromosome'],
            correct: 2,
            topic: 'Cell biology', difficulty: 'medium',
            explanation: 'Prokaryotes lack membrane-bound organelles (no mitochondria, ER, etc.). They have no true nucleus, possess 70S ribosomes and typically a single circular DNA molecule. The exception is option (3).'
          },
          {
            id: 'neet-ug-s25-14',
            text: 'During the light reactions of photosynthesis, the source of oxygen released is:',
            options: ['Carbon dioxide', 'Water', 'Glucose', 'ATP'],
            correct: 1,
            topic: 'Plant physiology', difficulty: 'medium',
            explanation: 'The O₂ liberated in photosynthesis comes from the photolysis (splitting) of water during the light reaction, not from CO₂, as shown by isotope-labelling experiments. Option (2).'
          },
          {
            id: 'neet-ug-s25-15',
            text: 'The hormone insulin, which lowers blood glucose levels, is secreted by the:',
            options: ['Alpha cells of the pancreas', 'Beta cells of the pancreas', 'Adrenal cortex', 'Thyroid gland'],
            correct: 1,
            topic: 'Human physiology', difficulty: 'easy-medium',
            explanation: 'Insulin is produced by the beta (β) cells of the islets of Langerhans in the pancreas; it promotes glucose uptake and lowers blood sugar. Alpha cells secrete glucagon. Option (2).'
          },
          {
            id: 'neet-ug-s25-16',
            text: 'In humans, a person with blood group AB is described as a universal recipient because their plasma contains:',
            options: ['Both anti-A and anti-B antibodies', 'Only anti-A antibody', 'Only anti-B antibody', 'Neither anti-A nor anti-B antibodies'],
            correct: 3,
            topic: 'Genetics', difficulty: 'medium-hard',
            explanation: 'AB individuals carry both A and B antigens on RBCs and therefore have no anti-A or anti-B antibodies in plasma, so they can receive blood of any ABO group — universal recipients. Option (4).'
          },
          {
            id: 'neet-ug-s25-17',
            text: 'Homologous organs (like the forelimbs of a whale, bat and human) provide evidence for:',
            options: ['Convergent evolution', 'Divergent evolution', 'Genetic drift', 'Spontaneous generation'],
            correct: 1,
            topic: 'Evolution', difficulty: 'medium-hard',
            explanation: 'Homologous organs share a common basic structure and ancestry but perform different functions, indicating divergent evolution (adaptive radiation) from a common ancestor. Option (2).'
          },
          {
            id: 'neet-ug-s25-18',
            text: 'The most stable and largest community that develops at the end of ecological succession is called the:',
            options: ['Pioneer community', 'Seral community', 'Climax community', 'Sere'],
            correct: 2,
            topic: 'Ecology', difficulty: 'medium',
            explanation: 'Succession culminates in a stable, self-perpetuating climax community in equilibrium with the environment. Pioneer and seral communities are transitional stages. Option (3).'
          },
          {
            id: 'neet-ug-s25-19',
            text: 'The technique used to amplify a specific segment of DNA into millions of copies in vitro is:',
            options: ['Gel electrophoresis', 'Polymerase Chain Reaction (PCR)', 'Southern blotting', 'Centrifugation'],
            correct: 1,
            topic: 'Biotechnology', difficulty: 'easy-medium',
            explanation: 'PCR uses a thermostable DNA polymerase, primers and repeated thermal cycling (denaturation, annealing, extension) to exponentially amplify a target DNA sequence. Option (2).'
          },
          {
            id: 'neet-ug-s25-20',
            text: 'In the human male reproductive system, sperms are produced in the:',
            options: ['Epididymis', 'Vas deferens', 'Seminiferous tubules', 'Prostate gland'],
            correct: 2,
            topic: 'Reproduction', difficulty: 'easy-medium',
            explanation: 'Spermatogenesis occurs in the seminiferous tubules of the testes. The epididymis stores and matures sperm, the vas deferens transports them, and the prostate adds secretions. Option (3).'
          },
          {
            id: 'neet-ug-s25-21',
            text: 'BCG vaccine, given to provide immunity, protects primarily against:',
            options: ['Polio', 'Tuberculosis', 'Tetanus', 'Measles'],
            correct: 1,
            topic: 'Biology in human welfare', difficulty: 'easy',
            explanation: 'BCG (Bacillus Calmette–Guérin) vaccine is given to confer immunity against tuberculosis, caused by Mycobacterium tuberculosis. Option (2).'
          },
          {
            id: 'neet-ug-s25-22',
            text: 'In a typical flower, the part that develops into the fruit after fertilization is the:',
            options: ['Ovule', 'Ovary', 'Stigma', 'Style'],
            correct: 1,
            topic: 'Morphology', difficulty: 'easy-medium',
            explanation: 'After fertilization the ovary wall develops into the fruit (pericarp), while the ovules within mature into seeds. Option (2).'
          },
          {
            id: 'neet-ug-s25-23',
            text: 'The phase of mitosis in which sister chromatids separate and move toward opposite poles is:',
            options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
            correct: 2,
            topic: 'Cell biology', difficulty: 'medium',
            explanation: 'During anaphase the centromeres split and sister chromatids (now daughter chromosomes) are pulled to opposite poles by spindle fibres. Option (3).'
          },
          {
            id: 'neet-ug-s25-24',
            text: 'Auxin, a plant growth hormone, is chiefly responsible for:',
            options: ['Inducing seed dormancy', 'Promoting cell elongation and apical dominance', 'Closing of stomata under stress', 'Inhibiting fruit ripening'],
            correct: 1,
            topic: 'Plant physiology', difficulty: 'medium-hard',
            explanation: 'Auxins (e.g., IAA) promote cell elongation in shoots and maintain apical dominance by suppressing growth of lateral buds. Abscisic acid causes dormancy and stomatal closure; ethylene promotes ripening. Option (2).'
          },
          {
            id: 'neet-ug-s25-25',
            text: 'A pure-breeding tall pea plant (TT) is crossed with a pure-breeding dwarf plant (tt). What fraction of the F₂ generation will be homozygous dwarf?',
            options: ['1/4', '1/2', '3/4', 'All tall'],
            correct: 0,
            topic: 'Genetics', difficulty: 'hard',
            explanation: 'F₁ are all Tt (tall). Selfing Tt × Tt gives genotypic ratio 1 TT : 2 Tt : 1 tt. Homozygous dwarf (tt) = 1/4 of the F₂. Option (1).'
          }
        ]}
      ]
    }
  ];
  window.EXAMS = (window.EXAMS || []).concat(mocks);
})();
