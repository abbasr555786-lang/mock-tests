// JamiaPrep -- JMI 2025 MA Mass Media (Hindi) entrance, Part A digitized as an
// online MCQ mock. Part A (40 one-mark MCQs) only; the descriptive Part B is not modelled.
// Every answer independently solved/verified (no official key is published). Items with an
// unreproducible figure or a printed defect are noted inline as [FLAGGED]. Hindi (Devanagari).
// Loaded after data.js, before repo.js; appends to window.EXAMS.

(function () {
  var questions = [
      {"id":"mmh2025-1","text":"'जिन्दा कौमें पाँच साल इंतज़ार नहीं करतीं' किसका कथन है :","options":["जयप्रकाश नारायण","डॉ. राममनोहर लोहिया","डॉ. भीमराव अम्बेडकर","कांशीराम"],"correct":1,"topic":"Indian politics quotes","difficulty":"medium","explanation":"This famous statement is attributed to Dr. Ram Manohar Lohia."},
      {"id":"mmh2025-2","text":"बीबीसी के प्रसिद्ध न्यूज़-शो 'हार्ड टॉक' की शुरुआत किस वर्ष हुई थी :","options":["1998","2006","1997","2007"],"correct":2,"topic":"Broadcast media history","difficulty":"hard","explanation":"BBC's HARDtalk programme began in 1997. [FLAGGED]"},
      {"id":"mmh2025-3","text":"'डॉक्टर ज़िवागो' किस प्रसिद्ध उपन्यास के लेखक हैं :","options":["डॉक्टर ज़िवागो","गॉडफादर","पेड़ो परामो","1984"],"correct":0,"topic":"World literature","difficulty":"medium","explanation":"The clue refers to Boris Pasternak; the matching novel title among options is Doctor Zhivago. [FLAGGED]"},
      {"id":"mmh2025-4","text":"डॉ. अम्बेडकर किस समाचार-पत्र के सम्पादक थे :","options":["अभ्युदय","हरिजन","मूकनायक","देशदूत"],"correct":2,"topic":"Indian press history","difficulty":"medium","explanation":"Dr. Ambedkar founded and edited the newspaper Mooknayak."},
      {"id":"mmh2025-5","text":"अंतर्राष्ट्रीय मुद्रा कोष (IMF) की स्थापना कब हुई थी :","options":["1944","1942","1943","1945"],"correct":0,"topic":"International organisations","difficulty":"medium","explanation":"The IMF was established in 1944 at the Bretton Woods conference."},
      {"id":"mmh2025-6","text":"खोजी पत्रकार विंसे बेसर की किताब 'द वर्ल्ड इन ए डेन' किससे संबद्ध है :","options":["मानवाधिकार से","रेत-खनन से","जलवायु परिवर्तन से","विस्थापन से"],"correct":1,"topic":"Investigative journalism","difficulty":"hard","explanation":"The book relates to sand mining. [FLAGGED]"},
      {"id":"mmh2025-7","text":"कौन-सी फ़िल्म अमिताबी हंसा वाडकर की आत्मकथा पर आधारित है?","options":["भूमिका","अस्तित्व","चालबाज़","चमेली"],"correct":0,"topic":"Indian cinema","difficulty":"medium","explanation":"Shyam Benegal's 'Bhumika' is based on actress Hansa Wadkar's autobiography."},
      {"id":"mmh2025-8","text":"जॉर्ज कबीला कौन हैं?","options":["फ़िलीपींस के राष्ट्रपति","कांगो गणराज्य के पूर्व राष्ट्रपति","लिथुआनिया के राष्ट्रपति","मंगोलिया के पूर्व राष्ट्रपति"],"correct":1,"topic":"World leaders","difficulty":"hard","explanation":"Joseph Kabila was the former President of the Democratic Republic of the Congo."},
      {"id":"mmh2025-9","text":"समाचार पत्र नेशनल हेराल्ड के संस्थापक थे :","options":["महात्मा गांधी","सरदार पटेल","जवाहरलाल नेहरू","माउंटबेटन"],"correct":2,"topic":"Indian press history","difficulty":"easy-medium","explanation":"The National Herald was founded by Jawaharlal Nehru in 1938."},
      {"id":"mmh2025-10","text":"समाचार चैनल आजतक के शो 'ब्लैक एंड व्हाइट' का वर्तमान प्रस्तोता कौन है?","options":["सईद अंसारी","श्वेता सिंह","सुधीर चौधरी","अंजना ओम कश्यप"],"correct":2,"topic":"Indian TV anchors","difficulty":"medium","explanation":"Sudhir Chaudhary presents 'Black and White' on Aaj Tak."},
      {"id":"mmh2025-11","text":"'ओणम' किस राज्य का प्रमुख त्योहार है?","options":["असम","केरल","कर्नाटक","गोवा"],"correct":1,"topic":"Indian festivals","difficulty":"easy","explanation":"Onam is the major festival of Kerala."},
      {"id":"mmh2025-12","text":"'फोरिएंट' किस देश की मुद्रा का नाम है :","options":["चेक गणराज्य","बल्गारिया","स्लोवेनिया","हंगरी"],"correct":3,"topic":"World currencies","difficulty":"hard","explanation":"The forint is the currency of Hungary."},
      {"id":"mmh2025-13","text":"कौन सा युग्म सही नहीं है?","options":["एनडीटीवी इंडिया - सुमित अवस्थी","इंडिया टीवी - रजत शर्मा","टाइम्स नाउ - राजदीप सरदेसाई","आजतक - श्वेता सिंह"],"correct":2,"topic":"Indian TV journalists","difficulty":"medium","explanation":"Rajdeep Sardesai is not associated with Times Now."},
      {"id":"mmh2025-14","text":"प्रकाशन-वर्ष की दृष्टि से इन पत्रिकाओं का सही क्रम होगा :","options":["उदंत मार्तण्ड-सरस्वती-हंस-धर्मयुग","सरस्वती-उदंत मार्तण्ड-धर्मयुग-हंस","हंस-उदंत मार्तण्ड-सरस्वती-हंस-धर्मयुग","उदंत मार्तण्ड-धर्मयुग-सरस्वती-हंस"],"correct":0,"topic":"Hindi journalism history","difficulty":"hard","explanation":"Order: Udant Martand (1826), Saraswati (1900), Hans (1930), Dharmayug (1949)."},
      {"id":"mmh2025-15","text":"कौन-सी भाषा संविधान की आठवीं अनुसूची में शामिल नहीं है :","options":["नेपाली","कोंकणी","भोजपुरी","संथाली"],"correct":2,"topic":"Indian Constitution","difficulty":"medium","explanation":"Bhojpuri is not included in the Eighth Schedule of the Constitution."},
      {"id":"mmh2025-16","text":"नूक किस देश की राजधानी है :","options":["ग्रीनलैंड","आइसलैंड","लातविया","एस्टोनिया"],"correct":0,"topic":"World geography","difficulty":"medium","explanation":"Nuuk is the capital of Greenland."},
      {"id":"mmh2025-17","text":"कौन सा देश ब्रिक्स (BRICS) में शामिल नहीं है :","options":["रूस","भारत","चीन","दक्षिण कोरिया"],"correct":3,"topic":"International organisations","difficulty":"easy","explanation":"South Korea is not a BRICS member."},
      {"id":"mmh2025-18","text":"डॉ. ज़ाकिर हुसैन नहीं थे :","options":["भारत के शिक्षा मंत्री","भारत के उपराष्ट्रपति","भारत के राष्ट्रपति","बिहार के राज्यपाल"],"correct":0,"topic":"Indian polity","difficulty":"medium","explanation":"Zakir Husain was VP, President and Governor of Bihar but never Education Minister."},
      {"id":"mmh2025-19","text":"किसको 2024 का मेजर ध्यानचंद खेल रत्न पुरस्कार नहीं मिला है :","options":["हरमन प्रीत सिंह","मनप्रीत सिंह","मनु भाकर","प्रवीण कुमार"],"correct":1,"topic":"Sports awards","difficulty":"hard","explanation":"Manpreet Singh was not among the 2024 Khel Ratna awardees."},
      {"id":"mmh2025-20","text":"'आइडिया ऑफ जस्टिस' किस अर्थशास्त्री की कृति है :","options":["अमर्त्य सेन","रघुराम राजन","अभिजीत बनर्जी","मनमोहन सिंह"],"correct":0,"topic":"Economics literature","difficulty":"medium","explanation":"'The Idea of Justice' is by economist Amartya Sen."},
      {"id":"mmh2025-21","text":"प्रेस ट्रस्ट ऑफ इंडिया से क्या तात्पर्य है :","options":["समाचार पत्रों का एक समूह","प्रेस कानूनों की नियामक संस्था","एक भारतीय समाचार एजेंसी","पत्रकारों की पेंशन हेतु ट्रस्ट"],"correct":2,"topic":"News agencies","difficulty":"easy-medium","explanation":"PTI is an Indian news agency."},
      {"id":"mmh2025-22","text":"मंडल आयोग की स्थापना और सिफारिशें लागू के विषय में सत्य है :","options":["स्थापना-1980, सिफारिशें लागू-1989","स्थापना-1990, सिफारिशें लागू-1995","स्थापना-1985, सिफारिशें लागू-1995","स्थापना-1979, सिफारिशें लागू-1990"],"correct":3,"topic":"Indian polity","difficulty":"hard","explanation":"The Mandal Commission was set up in 1979 and its recommendations implemented in 1990."},
      {"id":"mmh2025-23","text":"प्रवर्तन निदेशालय द्वारा जाँच की जाती है :","options":["जातिगत भेदभाव से संबद्ध मामलों की","पर्यावरणीय क्षति से संबद्ध मामलों की","सामाजिक उत्पीड़न से संबद्ध मामलों की","आर्थिक अपराधों से संबद्ध मामलों की"],"correct":3,"topic":"Indian governance","difficulty":"easy-medium","explanation":"The Enforcement Directorate investigates economic offences and money laundering."},
      {"id":"mmh2025-24","text":"भारत के पहले शिक्षा मंत्री थे :","options":["डॉ. राजेंद्र प्रसाद","राजकुमारी अमृतकौर","अबुल कलाम आज़ाद","सरदार वल्लभ भाई पटेल"],"correct":2,"topic":"Indian history","difficulty":"easy","explanation":"Maulana Abul Kalam Azad was India's first Education Minister."},
      {"id":"mmh2025-25","text":"मसूद पैज़ेक्यिन किस देश के राष्ट्रपति हैं :","options":["ईरान","इज़राइल","मिस्र","लेबनान"],"correct":0,"topic":"World leaders","difficulty":"medium","explanation":"Masoud Pezeshkian is the President of Iran."},
      {"id":"mmh2025-26","text":"'जनसत्ता' अखबार के संपादक नहीं रहे हैं :","options":["प्रभाष जोशी","ओम थानवी","मुकेश भारद्वाज","शशि शेखर"],"correct":3,"topic":"Hindi journalism","difficulty":"medium","explanation":"Shashi Shekhar was not an editor of Jansatta."},
      {"id":"mmh2025-27","text":"'बिनाका गीतमाला' के रेडियो प्रस्तोता थे :","options":["हरीश भिमानी","जयदेव सिंह","अमीन सयानी","मनोहर महाजन"],"correct":2,"topic":"Radio history","difficulty":"easy-medium","explanation":"Ameen Sayani was the famous presenter of Binaca Geetmala."},
      {"id":"mmh2025-28","text":"एबीपी न्यूज़ में एबीपी है :","options":["अमृत बाज़ार पत्रिका","आनंद बाज़ार पत्रिका","अनित्य बाज़ार पत्रिका","अभ्युदय बाज़ार पत्रिका"],"correct":1,"topic":"Media houses","difficulty":"medium","explanation":"ABP stands for Ananda Bazar Patrika."},
      {"id":"mmh2025-29","text":"'जब तोप मुकाबिल हो तो अखबार निकालो' किसकी पंक्ति है :","options":["रियाज़ खैराबादी","जिगर मुरादाबादी","अकबर इलाहाबादी","नज़ीर अकबराबादी"],"correct":2,"topic":"Urdu poetry","difficulty":"medium","explanation":"This famous couplet is by Akbar Allahabadi."},
      {"id":"mmh2025-30","text":"कौन-सा युग्म सही नहीं है :","options":["बालबोधिनी- भारतेंदु हरिश्चंद्र","अभ्युदय- मदनमोहन मालवीय","कर्मवीर- गणेश शंकर विद्यार्थी","चाँद- महादेवी वर्मा"],"correct":3,"topic":"Hindi journalism","difficulty":"hard","explanation":"Chand was edited by Ramrakh Singh Sahgal, not Mahadevi Verma."},
      {"id":"mmh2025-31","text":"'कॉमन-मैन' चरित्र के लिए मशहूर कार्टूनिस्ट थे :","options":["आर. के. नारायण","के. आर. नारायण","आर. के. लक्ष्मण","के. आर. लक्ष्मण"],"correct":2,"topic":"Cartoonists","difficulty":"easy-medium","explanation":"R. K. Laxman created the 'Common Man' character."},
      {"id":"mmh2025-32","text":"पेमा खांडू किस राज्य के मुख्यमंत्री हैं :","options":["अरुणाचल प्रदेश","मणिपुर","मेघालय","मिजोरम"],"correct":0,"topic":"Indian polity","difficulty":"medium","explanation":"Pema Khandu is the Chief Minister of Arunachal Pradesh."},
      {"id":"mmh2025-33","text":"किस लेखक को साहित्य के 59 वें ज्ञानपीठ पुरस्कार से सम्मानित किया गया है :","options":["गुलज़ार","विनोद कुमार शुक्ल","कृष्णा सोबती","निर्मल वर्मा"],"correct":1,"topic":"Literary awards","difficulty":"hard","explanation":"Vinod Kumar Shukla received the 59th Jnanpith Award."},
      {"id":"mmh2025-34","text":"'विश्व जल दिवस' कब मनाया जाता है?","options":["22 जून","22 मई","22 अप्रेल","22 मार्च"],"correct":3,"topic":"Important days","difficulty":"easy","explanation":"World Water Day is observed on 22 March."},
      {"id":"mmh2025-35","text":"शेख मुजीबुर्रहमान किस देश के राष्ट्रपति थे :","options":["बांग्लादेश","पाकिस्तान","अफ़ग़ानिस्तान","ईरान"],"correct":0,"topic":"World leaders","difficulty":"easy","explanation":"Sheikh Mujibur Rahman was the founding leader of Bangladesh."},
      {"id":"mmh2025-36","text":"सन 2022 में ओलंपिक खेलों की मेज़बानी किस देश ने की थी?","options":["फ्रांस","इंग्लैंड","स्पेन","चीन"],"correct":3,"topic":"Sports events","difficulty":"easy-medium","explanation":"The 2022 Winter Olympics were hosted by China (Beijing)."},
      {"id":"mmh2025-37","text":"कृति 'एम एफ हुसैन की कहानी अपनी ज़बानी' की भूमिका किसने लिखी है :","options":["सैयद हैदर रज़ा","निर्मल वर्मा","फ्रांसिस न्यूटन सूज़ा","रामकुमार"],"correct":1,"topic":"Indian art and literature","difficulty":"hard","explanation":"Nirmal Verma wrote the foreword to M.F. Husain's autobiography. [FLAGGED]"},
      {"id":"mmh2025-38","text":"भारत की 'नई आर्थिक नीति' में क्या शामिल नहीं था :","options":["राष्ट्रीयकरण","उदारीकरण","निजीकरण","वैश्वीकरण"],"correct":0,"topic":"Indian economy","difficulty":"easy-medium","explanation":"Nationalisation was not part of the 1991 New Economic Policy (LPG)."},
      {"id":"mmh2025-39","text":"भारत का सबसे लम्बा पुल 'अटल सेतु' किस राज्य में स्थित है?","options":["अरुणाचल प्रदेश","चेन्नई","महाराष्ट्र","गुजरात"],"correct":2,"topic":"Indian geography","difficulty":"easy","explanation":"Atal Setu (Mumbai Trans Harbour Link) is in Maharashtra."},
      {"id":"mmh2025-40","text":"'क्लॉडिया शीनबॉम' हैं :","options":["क्यूबा की पहली महिला अंतरिक्ष यात्री","हॉलीवुड की प्रसिद्ध फ़िल्म अभिनेत्री","रूस की प्रसिद्ध टेनिस खिलाड़ी","मेक्सिको की पहली महिला राष्ट्रपति"],"correct":3,"topic":"World leaders","difficulty":"medium","explanation":"Claudia Sheinbaum is the first woman President of Mexico."}
  ];

  var mock = {
    id: 'jmi-2025-massmedia-hindi-full',
    name: 'JMI 2025 MA Mass Media (Hindi) Paper',
    template: 'ssc',
    examCatalogueId: 'jmi-massmedia-hindi',
    kind: 'pyq', scope: 'full', sectionTag: null, sourceSet: null, year: 2025,
    durationMin: 90,
    marking: {"correct":1,"wrong":-0.25,"unattempted":0},
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['hi'],
    sections: [
      { id: 'all', name: 'MA Mass Media (Hindi) Entrance 2025 — Part A (40 Questions)', questions: questions }
    ]
  };

  window.EXAMS = (window.EXAMS || []).concat([mock]);
})();
