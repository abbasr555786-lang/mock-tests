/* JMI official admission-test RESULTS & CUT-OFFS — session 2025-26.
 *
 * Every number here is transcribed from the official Jamia Millia Islamia
 * admission portal (admission.jmi.ac.in → Entrance Results). We publish ONLY
 * what JMI itself declared:
 *   - selection / waiting-list / interview-call COUNTS (candidates are listed by
 *     application number; totals are the sum of the category-wise serial blocks), and
 *   - the category-wise CUT-OFF MARKS that JMI prints on the selection lists.
 * JMI does NOT publish a per-candidate marks column, so no per-student score is shown.
 * Where JMI did not publish a figure, we leave it blank rather than estimate it.
 *
 * This file is regenerated when a new session's results are declared (see the
 * results-watch schedule). Do not hand-edit counts without a source PDF.
 */
(function () {
  'use strict';

  var BASE = 'https://admission.jmi.ac.in/application/assets/uploadedResults/';

  window.JMI_RESULTS = {
    session: '2025-26',
    updated: '2026-07-04',
    portalUrl: 'https://admission.jmi.ac.in/EntranceResults/DeclaredResultsLists',
    indexUrl: 'https://admission.jmi.ac.in/application/assets/pdfFile/notices/Results2025-26.pdf',

    // Reservation-category display order + friendly labels used by the cut-off tables.
    catOrder: ['GENERAL', 'MUSLIM', 'MUSLIM OBC/MUSLIM ST', 'MUSLIM WOMEN', 'JAMIA', 'J&K', 'KM', 'PWD'],
    catLabel: {
      'GENERAL': 'General',
      'MUSLIM': 'Muslim',
      'MUSLIM OBC/MUSLIM ST': 'Muslim OBC/ST',
      'MUSLIM WOMEN': 'Muslim Women',
      'JAMIA': 'Jamia',
      'J&K': 'J & K',
      'KM': 'Kashmiri Migrant',
      'PWD': 'PwD'
    },

    groups: [
      /* ---------------- Undergraduate entrance ---------------- */
      {
        key: 'ug',
        title: 'Undergraduate entrance (UG)',
        blurb: 'Provisional selection & waiting lists for bachelor programmes, with the category-wise cut-off marks JMI published alongside them.',
        items: [
          {
            code: 'B04',
            name: 'BBA / B.Com (Hons) / B.Com (Hons) — Self-financed',
            stats: [ { k: 'Selected', v: 164 }, { k: 'Waitlisted', v: 480 } ],
            cutoffNote: 'Cut-off = aggregate marks of the last provisionally-selected candidate, per course & category (1st list).',
            cutoffs: [
              { group: 'BBA', marks: { 'GENERAL': '67.25', 'MUSLIM': '63.75', 'MUSLIM OBC/MUSLIM ST': '62.75', 'MUSLIM WOMEN': '63.50', 'JAMIA': '61.75', 'J&K': '56.00', 'KM': '19.50', 'PWD': '35.25' } },
              { group: 'B.Com (Hons)', marks: { 'GENERAL': '70.00', 'MUSLIM': '66.50', 'MUSLIM OBC/MUSLIM ST': '63.75', 'MUSLIM WOMEN': '63.75', 'JAMIA': '60.00', 'J&K': '61.25', 'KM': '24.75', 'PWD': '31.50' } },
              { group: 'B.Com (Hons) — SF', marks: { 'GENERAL': '63.75', 'MUSLIM': '62.00', 'MUSLIM OBC/MUSLIM ST': '60.00', 'MUSLIM WOMEN': '61.00', 'JAMIA': '58.75', 'J&K': '53.75', 'PWD': '23.25' } }
            ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'UG1/CDUP_B04_SL1.pdf' } ]
          },
          {
            code: 'B05',
            name: 'B.A. (Hons) Political Science / B.A. (Multidisciplinary)',
            stats: [ { k: 'Selected', v: 117 }, { k: 'Waitlisted', v: 339 } ],
            cutoffs: [
              { group: 'Political Science', marks: { 'GENERAL': '71.75', 'MUSLIM': '67.25', 'MUSLIM OBC/MUSLIM ST': '66.00', 'MUSLIM WOMEN': '66.50', 'JAMIA': '69.75', 'J&K': '66.50', 'KM': '40.00', 'PWD': '56.00' } },
              { group: 'Multidisciplinary', marks: { 'GENERAL': '65.25', 'MUSLIM': '63.75', 'MUSLIM OBC/MUSLIM ST': '63.00', 'MUSLIM WOMEN': '62.25', 'JAMIA': '61.00', 'J&K': '62.25', 'KM': '33.75', 'PWD': '31.25' } }
            ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'UG1/CDUP_B05_SL1.pdf' } ]
          },
          {
            code: 'B13',
            name: 'B.Lib.I.Sc. — Library & Information Science (SF)',
            stats: [ { k: 'Selected', v: 52 }, { k: 'Waitlisted', v: 134 } ],
            cutoffs: [
              { group: 'B.Lib.I.Sc.', marks: { 'GENERAL': '70.25', 'MUSLIM': '63.00', 'MUSLIM OBC/MUSLIM ST': '56.00', 'MUSLIM WOMEN': '56.75', 'J&K': '53.00', 'KM': '44.50', 'PWD': '38.50' } }
            ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'UG1/CDUP_B13_SL1.pdf' } ]
          },
          {
            code: 'B67',
            name: 'B.A. (Hons) Social Work',
            stats: [ { k: 'Selected', v: 42 } ],
            cutoffs: [
              { group: 'Social Work', marks: { 'GENERAL': '53.75', 'MUSLIM': '50.75', 'MUSLIM OBC/MUSLIM ST': '48.50', 'MUSLIM WOMEN': '48.75', 'JAMIA': '47.75', 'J&K': '46.75', 'PWD': '17.00' } }
            ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'UG1/CDUP_B67_SL1.pdf' } ]
          },
          {
            code: 'B55',
            name: 'B.A. (Hons) Sociology / Psychology / Geography',
            stats: [],
            note: 'Only a waiting list was published for this code (a bundle of three honours programmes). Waiting-list depth reached ~72 (Geography) and ~51 each (Psychology, Sociology) in the General category. No cut-off marks were printed on the waiting-list notice.',
            cutoffs: [],
            lists: [ { label: 'Waiting list — I (PDF)', url: BASE + 'UG1/B55_Waitlisted.pdf' } ]
          }
        ]
      },

      /* ---------------- Postgraduate entrance ---------------- */
      {
        key: 'pg',
        title: 'Postgraduate entrance (PG)',
        blurb: 'Master’s programmes. Programmes with a group discussion / interview stage publish an interview-call list instead of a marks cut-off.',
        items: [
          {
            code: 'M63',
            name: 'M.A. Social Exclusion & Inclusive Policy',
            stats: [ { k: 'Selected', v: 32 }, { k: 'Waitlisted', v: 90 } ],
            cutoffs: [ { group: 'M.A. SEIP', marks: { 'GENERAL': '54.00', 'MUSLIM': '49.50', 'MUSLIM OBC/MUSLIM ST': '46.75', 'MUSLIM WOMEN': '44.50', 'J&K': '18.00' } } ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'PG1/USC_M63_SL1.pdf' } ]
          },
          {
            code: 'M89',
            name: 'M.Sc. Artificial Intelligence & Machine Learning (SF)',
            stats: [ { k: 'Selected', v: 42 } ],
            cutoffs: [ { group: 'M.Sc. AI & ML', marks: { 'GENERAL': '69.50', 'MUSLIM': '63.50', 'MUSLIM OBC/MUSLIM ST': '59.50', 'MUSLIM WOMEN': '59.75', 'J&K': '48.00' } } ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'PG1/CDUP_M89_SL1.pdf' } ]
          },
          {
            code: 'M10',
            name: 'M.A. Human Rights & Duties Education',
            stats: [ { k: 'Selected', v: 28 }, { k: 'Waitlisted', v: 69 } ],
            cutoffs: [ { group: 'M.A. HRDE', marks: { 'GENERAL': '36.50', 'MUSLIM': '30.25', 'MUSLIM OBC/MUSLIM ST': '22.50', 'MUSLIM WOMEN': '25.00', 'J&K': '20.50' } } ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'PG1/M10_List_of_Selected_Candidates.pdf' } ]
          },
          {
            code: 'M66',
            name: 'M.A. International Relations — West Asian Studies',
            stats: [ { k: 'Selected', v: 33 } ],
            cutoffs: [ { group: 'M.A. IR (WAS)', marks: { 'GENERAL': '79.50', 'MUSLIM': '74.50', 'MUSLIM OBC/MUSLIM ST': '71.25', 'MUSLIM WOMEN': '68.75', 'J&K': '69.25', 'KM': '39.75', 'PWD': '13.75' } } ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'PG1/M66_List_of_selected_Candidates.pdf' } ]
          },
          {
            code: 'M35',
            name: 'M.A./M.Sc. Development Extension',
            stats: [ { k: 'Selected', v: 21 } ],
            cutoffs: [ { group: 'Development Extension', marks: { 'GENERAL': '50.50', 'MUSLIM': '44.00', 'MUSLIM OBC/MUSLIM ST': '35.50', 'MUSLIM WOMEN': '24.50' } } ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'PG1/M35_List_of_selected_Candidates.pdf' } ]
          },
          { code: 'M20', name: 'M.A. Mass Communication', stats: [ { k: 'Called for interview', v: 201 } ], cutoffs: [], note: 'Final selection follows a group discussion & interview round.', lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG1/M20_List_of_Candidates_Called_for_Interview.pdf' } ] },
          { code: 'M80', name: 'M.Sc. Banking & Financial Analytics', stats: [ { k: 'Called for interview', v: 147 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG1/M80_List_of_Candidates_Called_for_Interview.pdf' } ] },
          { code: 'M19', name: 'M.A. Conflict Analysis & Peace Building', stats: [ { k: 'Called for interview', v: 85 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG1/M19_List_of_Candidates_Called_for_Interview.pdf' } ] },
          { code: 'M21', name: 'M.A. Convergent Journalism', stats: [ { k: 'Called for interview', v: 75 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG1/M21_List_of_Candidates_Called_for_Interview.pdf' } ] },
          { code: 'M22', name: 'M.A. Development Communication', stats: [ { k: 'Called for interview', v: 71 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG1/M22_List_of_Candidates_Called_for_Interview.pdf' } ] },
          { code: 'M23', name: 'M.A. Visual Effects & Animation', stats: [ { k: 'Called for interview', v: 61 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG1/M23_List_of_Candidates_Called_for_Interview.pdf' } ] },
          { code: 'M18', name: 'M.A. Media Governance', stats: [ { k: 'Called for interview', v: 51 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG1/M18_List_of_Candidates_Called_for_Interview.pdf' } ] }
        ]
      },

      /* ---------------- Diplomas ---------------- */
      {
        key: 'diploma',
        title: 'P.G. & Advanced Diplomas',
        blurb: 'Diploma programmes across departments and the AJK Mass Communication Research Centre.',
        items: [
          {
            code: 'G18',
            name: 'P.G. Diploma — Preservation, Conservation & Digitization in Libraries & Archives (SF)',
            stats: [ { k: 'Selected', v: 40 }, { k: 'Waitlisted', v: 1 } ],
            cutoffs: [ { group: 'PGD Preservation', marks: { 'GENERAL': '42.25', 'MUSLIM': '16.25' } } ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'PG2/USC_G18_SL1.pdf' } ]
          },
          {
            code: 'G19',
            name: 'P.G. Diploma — Fire Safety, Lifts & Plumbing Services (SF)',
            stats: [ { k: 'Selected', v: 20 }, { k: 'Waitlisted', v: 10 } ],
            cutoffs: [ { group: 'PGD Fire Safety', marks: { 'GENERAL': '54.00', 'MUSLIM': '39.00', 'MUSLIM OBC/MUSLIM ST': '25.00', 'PWD': '24.25' } } ],
            lists: [ { label: 'Selection + waiting list (PDF)', url: BASE + 'PG2/CDUP_G19_SL1.pdf' } ]
          },
          {
            code: 'A09',
            name: 'Advanced Diploma in Counselling Psychology (SF)',
            stats: [ { k: 'Selected', v: 30 } ],
            note: 'Selected by category — General 20, Muslim 10. No category-wise cut-off table was printed on this list.',
            cutoffs: [],
            lists: [ { label: 'Selection list (PDF)', url: BASE + 'ADP/CDUP_A09_SL1.pdf' } ]
          },
          { code: 'G09', name: 'P.G. Diploma — Still Photography & Visual Communication', stats: [ { k: 'Called for interview', v: 45 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'PG2/G09_List_of_Candidates_Called_for_Interview.pdf' } ] },
          { code: 'A11', name: 'Advanced Diploma in Public Health', stats: [ { k: 'Called for interview', v: 23 } ], cutoffs: [], lists: [ { label: 'Interview-call list (PDF)', url: BASE + 'ADP/CDUP_A11_INT.pdf' } ] }
        ]
      },

      /* ---------------- School (Class VI / IX / XI) ---------------- */
      {
        key: 'school',
        title: 'School admissions — Class VI, IX & XI',
        blurb: 'JMI’s constituent schools. Cut-offs are the aggregate marks of the last selected candidate, listed separately for each school (1st selection list).',
        items: [
          {
            code: 'Class IX',
            name: 'Class IX',
            stats: [ { k: 'Selected (1st list)', v: 372 }, { k: '+ 2nd list', v: 108 }, { k: '+ 3rd list', v: 53 }, { k: 'Waitlist', v: 1071 } ],
            cutoffs: [
              { group: 'Jamia Girls Sr. Sec.', marks: { 'GENERAL': '84', 'MUSLIM': '81', 'MUSLIM OBC/MUSLIM ST': '79', 'MUSLIM WOMEN': '80', 'J&K': '79', 'KM': '67', 'PWD': '37' } },
              { group: 'Jamia Sr. Secondary', marks: { 'GENERAL': '94', 'MUSLIM': '94', 'MUSLIM OBC/MUSLIM ST': '93', 'MUSLIM WOMEN': '90', 'J&K': '90', 'KM': '65', 'PWD': '81' } },
              { group: 'Syed Abid Husain (SF)', marks: { 'GENERAL': '90', 'MUSLIM': '89', 'MUSLIM OBC/MUSLIM ST': '88', 'MUSLIM WOMEN': '85', 'J&K': '85', 'KM': '51', 'PWD': '62' } }
            ],
            lists: [
              { label: '1st list', url: BASE + 'SCH/Results/S05_I_List_Selected.pdf' },
              { label: '2nd list', url: BASE + 'SCH/Results/S05_II_List_Selected.pdf' },
              { label: '3rd list', url: BASE + 'SCH/Results/IX_3rd_List_Selected_Candidates.pdf' },
              { label: 'Waiting list', url: BASE + 'SCH/Results/S05_1_WaitingList.pdf' }
            ]
          },
          {
            code: 'Class XI Science',
            name: 'Class XI — Science',
            stats: [ { k: 'Selected (2nd list)', v: 107 } ],
            cutoffs: [
              { group: 'Jamia Girls Sr. Sec.', marks: { 'GENERAL': '83.00', 'MUSLIM': '82.00', 'MUSLIM OBC/MUSLIM ST': '81.00', 'MUSLIM WOMEN': '82.00', 'J&K': '81.00', 'KM': '51.00', 'PWD': '49.00' } },
              { group: 'Jamia Sr. Secondary', marks: { 'GENERAL': '90.00', 'MUSLIM': '88.00', 'MUSLIM OBC/MUSLIM ST': '88.00', 'MUSLIM WOMEN': '87.00', 'J&K': '82.00', 'KM': '63.00', 'PWD': '68.00' } },
              { group: 'Syed Abid Husain (SF)', marks: { 'GENERAL': '87.00', 'MUSLIM': '86.00', 'MUSLIM OBC/MUSLIM ST': '86.00', 'MUSLIM WOMEN': '84.00', 'J&K': '80.00', 'KM': '53.00', 'PWD': '66.00' } }
            ],
            lists: [
              { label: '1st list', url: BASE + 'SCH/Results/S07_Selected.pdf' },
              { label: '2nd list', url: BASE + 'SCH/Results/XISc_Second_List_Selected_Candidates.pdf' },
              { label: 'Waiting list', url: BASE + 'SCH/Results/S07_Waitlisted.pdf' }
            ]
          },
          {
            code: 'Class XI Commerce',
            name: 'Class XI — Commerce',
            stats: [ { k: 'Selected (1st list)', v: 166 }, { k: '+ 2nd list', v: 71 } ],
            cutoffs: [
              { group: 'Jamia Girls Sr. Sec.', marks: { 'GENERAL': '66.00', 'MUSLIM': '63.00', 'MUSLIM OBC/MUSLIM ST': '59.00', 'MUSLIM WOMEN': '62.00', 'J&K': '54.00', 'PWD': '47.00' } },
              { group: 'Jamia Sr. Secondary', marks: { 'GENERAL': '79.00', 'MUSLIM': '76.00', 'MUSLIM OBC/MUSLIM ST': '73.00', 'MUSLIM WOMEN': '75.00', 'J&K': '67.00', 'KM': '42.00', 'PWD': '39.00' } },
              { group: 'Syed Abid Husain (SF)', marks: { 'GENERAL': '73.00', 'MUSLIM': '71.00', 'MUSLIM OBC/MUSLIM ST': '70.00', 'MUSLIM WOMEN': '68.00', 'J&K': '63.00', 'KM': '38.00', 'PWD': '33.00' } }
            ],
            lists: [
              { label: '1st list', url: BASE + 'SCH/Results/S08_Selected.pdf' },
              { label: '2nd list', url: BASE + 'SCH/Results/XICommerce_Second_List_Selected_Candidates.pdf' },
              { label: 'Waiting list', url: BASE + 'SCH/Results/S08_Waitlisted.pdf' }
            ]
          },
          {
            code: 'Class XI Arts',
            name: 'Class XI — Arts',
            stats: [ { k: 'Selected (1st list)', v: 250 }, { k: '+ 2nd list', v: 61 }, { k: 'Waitlist', v: 600 } ],
            cutoffs: [
              { group: 'Jamia Girls Sr. Sec.', marks: { 'GENERAL': '79.00', 'MUSLIM': '77.00', 'MUSLIM OBC/MUSLIM ST': '74.00', 'MUSLIM WOMEN': '76.00', 'J&K': '75.00', 'KM': '59.00', 'PWD': '38.00' } },
              { group: 'Jamia Sr. Secondary', marks: { 'GENERAL': '85.00', 'MUSLIM': '84.00', 'MUSLIM OBC/MUSLIM ST': '82.00', 'MUSLIM WOMEN': '83.00', 'J&K': '83.00', 'KM': '69.00', 'PWD': '58.00' } },
              { group: 'Syed Abid Husain (SF)', marks: { 'GENERAL': '80.00', 'MUSLIM': '78.00', 'MUSLIM OBC/MUSLIM ST': '77.00', 'MUSLIM WOMEN': '76.00', 'J&K': '78.00', 'KM': '34.00', 'PWD': '55.00' } }
            ],
            lists: [
              { label: '1st list', url: BASE + 'SCH/Results/S06_Selected.pdf' },
              { label: '2nd list', url: BASE + 'SCH/Results/S06_II_Selected.pdf' },
              { label: 'Waiting list', url: BASE + 'SCH/Results/S06_Waitlisted.pdf' }
            ]
          },
          {
            code: 'Class VI',
            name: 'Class VI',
            stats: [],
            cutoffNote: 'Cut-off marks published for Syed Abid Husain Sr. Sec. School (SF). 1st & 2nd selection lists and a waiting list were also declared.',
            cutoffs: [
              { group: 'Syed Abid Husain (SF) — 1st list', marks: { 'GENERAL': '88', 'MUSLIM': '87', 'MUSLIM OBC/MUSLIM ST': '85', 'MUSLIM WOMEN': '85', 'J&K': '81', 'KM': '53', 'PWD': '67' } },
              { group: 'Syed Abid Husain (SF) — 2nd list', marks: { 'GENERAL': '87.00', 'MUSLIM': '86.00', 'MUSLIM OBC/MUSLIM ST': '85.00', 'MUSLIM WOMEN': '84.00', 'KM': '33.00' } }
            ],
            lists: [
              { label: '1st list', url: BASE + 'SCH/Results/S04_I_List_Selected.pdf' },
              { label: '2nd list', url: BASE + 'SCH/Results/S04_II_List_Selected.pdf' },
              { label: 'Cut-off notice', url: BASE + 'SCH/Results/S04_II_List_Cutoff.pdf' },
              { label: 'Waiting list', url: BASE + 'SCH/Results/S04_WaitingList_1.pdf' }
            ]
          }
        ]
      }
    ],

    // Junior-school admissions are by lottery/draw of lots (no entrance marks), shown as a note.
    juniorNote: 'JMI also declared lottery-based admissions to its junior classes for 2025-26 — ' +
      'Nursery/Dareecha (146 selected), Class Prep (84) and Class I (44), plus waiting-list draws. ' +
      'These are decided by draw of lots, not an entrance test, so no cut-off marks apply.'
  };
})();
