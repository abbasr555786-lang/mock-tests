// JamiaPrep -- JMI 2024 MA Mass Media (Hindi) entrance, Part A digitized as an
// online MCQ mock. Part A (40 one-mark MCQs) only; the descriptive Part B is not modelled.
// Every answer independently solved/verified (no official key is published). Items with an
// unreproducible figure or a printed defect are noted inline as [FLAGGED]. Hindi (Devanagari).
// Loaded after data.js, before repo.js; appends to window.EXAMS.

(function () {
  var questions = [
      {"id":"mmh2024-1","text":"निम्नलिखित में से कौन विकास से संबंधित मौलिक बात नहीं है ?","options":["भोजन","वस्त्र","आवास","व्यक्तिगत वाहन"],"correct":3,"topic":"Development basic needs","difficulty":"easy","explanation":"Food, clothing and shelter are basic needs; a personal vehicle is not a fundamental need."},
      {"id":"mmh2024-2","text":"निम्नलिखित में से कौन-सा युग्म सही नहीं है ?","options":["केन्या-नैरोबी","न्यूज़ीलैंड-थिम्पू","चेकोस्लोवाकिया-प्राग","पोलैंड-वासी"],"correct":1,"topic":"Country-capital","difficulty":"easy-medium","explanation":"Thimphu is the capital of Bhutan, not New Zealand (Wellington)."},
      {"id":"mmh2024-3","text":"शैनन और वीवर ने जनसंचार का कौन-सा मॉडल प्रतिपादित किया था?","options":["संज्ञानात्मक","सर्कुलर","गणितीय","एसएमसीआर"],"correct":2,"topic":"Communication models","difficulty":"medium","explanation":"Shannon and Weaver propounded the mathematical model of communication."},
      {"id":"mmh2024-4","text":"भाषा की सबसे छोटी इकाई है—","options":["ध्वनि","शब्द","पद","पदबंध"],"correct":0,"topic":"Linguistics","difficulty":"easy-medium","explanation":"The smallest unit of language is the sound (phoneme)."},
      {"id":"mmh2024-5","text":"देश और उसकी मुद्रा से संबंधित कौन-सा युग्म सही है?","options":["चीन-रेन्मिन्बी","बांग्लादेश-टका","श्रीलंका-श्रीलंकाई डॉलर","रूस-रूबल"],"correct":3,"topic":"Currency","difficulty":"medium","explanation":"Russia's currency is the rouble; Sri Lanka uses the rupee so that pair is wrong, while Russia-rouble is correct."},
      {"id":"mmh2024-6","text":"भारतीय क्रिकेट कंट्रोल बोर्ड के अध्यक्ष हैं—","options":["रोजर बिन्नी","सौरव गांगुली","विराट कोहली","महेंद्र सिंह धोनी"],"correct":0,"topic":"Current affairs cricket","difficulty":"medium","explanation":"Roger Binny is the BCCI president."},
      {"id":"mmh2024-7","text":"सरकार ने 'सोशल मीडिया इंफ्ल्यूएंसर्स' के लिए क्या निर्देश दिया है?","options":["किसी की छवि धूमिल करने वाले मीम्स न बनायें","किसी उत्पाद का प्रचार न करें","सूचनाएं साझा न करें","भ्रामक विज्ञापन से बचें"],"correct":3,"topic":"Media regulation","difficulty":"medium","explanation":"Influencers were directed to avoid misleading advertisements and disclose paid promotions."},
      {"id":"mmh2024-8","text":"'राजधानी एक्सप्रेस' क्या है?","options":["समाचार-पत्र","यात्री रेल सेवा","टीवी न्यूज़ चैनल","वेब पत्रकारिता प्लेटफॉर्म"],"correct":1,"topic":"General knowledge","difficulty":"easy","explanation":"Rajdhani Express is a passenger rail service."},
      {"id":"mmh2024-9","text":"NAAC का फुल फॉर्म है—","options":["नेशनल एक्रीडिटेशन एंड असेसमेंट काउंसिल","नेशनल असेसमेंट एंड ऑडिट काउंसिल","नेशनल असेसमेंट एंड एक्रीडिटेशन काउंसिल","नेशनल असेसमेंट एंड एक्रीडिटेशन कॉर्पोरेशन"],"correct":2,"topic":"Abbreviations","difficulty":"medium","explanation":"NAAC stands for National Assessment and Accreditation Council."},
      {"id":"mmh2024-10","text":"जी-20 की स्थापना कब हुई ?","options":["1995","1999","2001","2004"],"correct":1,"topic":"International organisations","difficulty":"medium","explanation":"The G-20 was established in 1999."},
      {"id":"mmh2024-11","text":"जनसंचार की कौन-सी अवधारणा पूँजी को केंद्र में रखती है?","options":["मार्क्सवादी","प्रभुत्ववादी","उदारवादी","स्वीवादी"],"correct":0,"topic":"Media theory","difficulty":"medium-hard","explanation":"The Marxist concept of mass communication places capital (economic base) at the centre."},
      {"id":"mmh2024-12","text":"पीवीआर सिनेमा में 'पीवीआर' का फुल फॉर्म है—","options":["प्रीमियर विलेज रोड शो","प्रीमियर विंटेज रोड शो","प्रिया विलेज रोड शो","प्रिया विंटेज रोड शो"],"correct":2,"topic":"Abbreviations","difficulty":"medium","explanation":"PVR stands for Priya Village Roadshow."},
      {"id":"mmh2024-13","text":"'अल नीनो' की उत्पत्ति का संबंध किस समुद्र से है ?","options":["अटलांटिक महासागर","अरब सागर","प्रशांत महासागर","हिन्द महासागर"],"correct":2,"topic":"Geography","difficulty":"medium","explanation":"El Nino originates in the Pacific Ocean."},
      {"id":"mmh2024-14","text":"'खबर लहरिया' का प्रकाशन किसके द्वारा किया जाता है?","options":["फैशन उद्योग द्वारा","प्रबुद्ध शहरी महिलाओं द्वारा","दलित ग्रामीण महिलाओं द्वारा","आदिवासी मजदूरों द्वारा"],"correct":2,"topic":"Indian media","difficulty":"medium","explanation":"Khabar Lahariya is run by rural Dalit women journalists."},
      {"id":"mmh2024-15","text":"हाल ही में प्रसारण कंपनी डिज़्नी-हॉटस्टार (भारत में) का किसके साथ विलय हुआ ?","options":["सोनी","जियो","ज़ी","एनडीटीवी"],"correct":1,"topic":"Media industry","difficulty":"medium","explanation":"Disney-Hotstar merged with Reliance's Jio (Viacom18) in India."},
      {"id":"mmh2024-16","text":"इनमें से कौन-सा उपन्यास प्रेमचंद का है?","options":["झूठा सच","राग दरबारी","आधा गाँव","गोदान"],"correct":3,"topic":"Hindi literature","difficulty":"easy-medium","explanation":"Godan is Premchand's novel; the others are by Yashpal, Shrilal Shukla and Rahi Masoom Raza."},
      {"id":"mmh2024-17","text":"'अल जज़ीरा' का मुख्यालय कहाँ स्थित है?","options":["कनाडा","संयुक्त अरब अमीरात","कतर","दोहा"],"correct":3,"topic":"International media","difficulty":"medium","explanation":"Al Jazeera is headquartered in Doha; the specific city Doha is listed as a separate option. [FLAGGED]"},
      {"id":"mmh2024-18","text":"'मीन वर्ल्ड सिंड्रोम' का प्रतिपादन किसने किया था?","options":["नॉम चॉम्स्की","लासवेल","जॉर्ज गर्बनर","ऑसगुड"],"correct":2,"topic":"Media theory","difficulty":"medium-hard","explanation":"George Gerbner propounded the Mean World Syndrome within cultivation theory."},
      {"id":"mmh2024-19","text":"'फ्लैशबैक' से आशय है—","options":["कहानी का भविष्य में जाना","कहानी का अतीत में जाना","कैमरे का फ्लैश ठीक करना","बिना फ्लैश के कैमरे का संचालन"],"correct":1,"topic":"Film terminology","difficulty":"easy","explanation":"Flashback means going back into the past in a narrative."},
      {"id":"mmh2024-20","text":"विधान सभा सदस्यों की अधिकतम संख्या किस राज्य में है?","options":["केरल","महाराष्ट्र","उड़ीसा","उत्तर प्रदेश"],"correct":3,"topic":"Indian polity","difficulty":"easy-medium","explanation":"Uttar Pradesh has the largest Legislative Assembly (403 members)."},
      {"id":"mmh2024-21","text":"डॉ. भीमराव अंबेडकर ने किस शहर में अपने अनुयायियों के साथ बौद्ध धर्म अपनाया था?","options":["नागपुर","हरिद्वार","पुरी","गया"],"correct":0,"topic":"History","difficulty":"medium","explanation":"Ambedkar embraced Buddhism with his followers at Nagpur in 1956."},
      {"id":"mmh2024-22","text":"इनमें से किसको वैकल्पिक पत्रकारिता नहीं माना जा सकता?","options":["साहित्यिक पत्रिकाएं","टीवी चैनल","दीवार-पोस्टर","सोशल मीडिया"],"correct":1,"topic":"Alternative media","difficulty":"medium","explanation":"Mainstream TV channels are not considered alternative journalism."},
      {"id":"mmh2024-23","text":"दादा साहब फाल्के का संबंध है—","options":["राजनीति से","अपराध से","विज्ञान से","फिल्म से"],"correct":3,"topic":"Indian cinema","difficulty":"easy","explanation":"Dadasaheb Phalke is the father of Indian cinema, associated with film."},
      {"id":"mmh2024-24","text":"अजीमुल्ला खां किस क्रान्तिकारी पत्र के संपादक थे ?","options":["साम्यवादी मार्तंड","पयामे आजादी","प्रजा हितैषी","मिरातुल अखबार"],"correct":1,"topic":"Indian press history","difficulty":"hard","explanation":"Azimullah Khan edited the revolutionary paper Payam-e-Azadi during 1857."},
      {"id":"mmh2024-25","text":"'इंडिया विंस फ्रीडम' के लेखक कौन है?","options":["मौलाना अबुल कलाम आज़ाद","के. आर. नारायण","जवाहरलाल नेहरू","महात्मा गांधी"],"correct":0,"topic":"Books and authors","difficulty":"medium","explanation":"'India Wins Freedom' was written by Maulana Abul Kalam Azad."},
      {"id":"mmh2024-26","text":"भारतीय समाचार एजेंसी एएनआई का पूरा नाम है?","options":["एशिया न्यूज़ इंडिया","एजेंसी न्यूज़ इंटरनेशनल","एशियन न्यूज़ इंटरनेशनल","एशिया नियो इंटरनेशनल"],"correct":2,"topic":"News agencies","difficulty":"medium","explanation":"ANI stands for Asian News International."},
      {"id":"mmh2024-27","text":"इनमें से क्या समाचार लेखन से संबंधित नहीं है?","options":["लक्ष्यात्मकता","पिरामिड शैली","रचनात्मकता","काल्पनिकता"],"correct":3,"topic":"News writing","difficulty":"medium","explanation":"Imaginativeness (fictionalisation) is not part of factual news writing."},
      {"id":"mmh2024-28","text":"निम्न में से कौन खेल पत्रकार है?","options":["विक्रांत गुप्ता","वीईद अंसारी","बलराम","सोनल मेहरोत्रा"],"correct":0,"topic":"Sports journalism","difficulty":"medium","explanation":"Vikrant Gupta is a well-known sports journalist."},
      {"id":"mmh2024-29","text":"रेडियो में संस्कृत समाचार के लिए किस शब्द का प्रयोग किया जाता है?","options":["समाचार","वृत्तान्त","वार्ता","सन्देश"],"correct":1,"topic":"Radio broadcasting","difficulty":"medium-hard","explanation":"Sanskrit news bulletins on radio are termed 'Vrittant' (वृत्तान्त)."},
      {"id":"mmh2024-30","text":"'उदन्त मार्तण्ड' का प्रकाशन कब प्रारंभ हुआ था?","options":["1873 ई.","1826 ई.","1900 ई.","1800 ई."],"correct":1,"topic":"Hindi journalism history","difficulty":"medium","explanation":"Udant Martand, the first Hindi newspaper, began publication in 1826."},
      {"id":"mmh2024-31","text":"अमीन सायानी किस गीतपरक कार्यक्रम के उद्घोषक थे ?","options":["ऑनली फॉर ब्रोकेन हार्ट्स","हवामहल","बिनाका गीतमाला","फौजी भाइयों के लिए"],"correct":2,"topic":"Radio history","difficulty":"medium","explanation":"Ameen Sayani hosted the song-based programme Binaca Geetmala."},
      {"id":"mmh2024-32","text":"परिचर्चापरक कार्यक्रम 'हम लोग' का संबंध किस चैनल से था ?","options":["ज़ी न्यूज़","एबीपी न्यूज़","दूरदर्शन","एनडीटीवी"],"correct":2,"topic":"Indian television","difficulty":"easy-medium","explanation":"'Hum Log' was telecast on Doordarshan."},
      {"id":"mmh2024-33","text":"निम्नलिखित में से कौन देश सार्क का वर्तमान सदस्य नहीं है?","options":["म्यांमार","नेपाल","बांग्लादेश","भूटान"],"correct":0,"topic":"International organisations","difficulty":"medium","explanation":"Myanmar is not a SAARC member."},
      {"id":"mmh2024-34","text":"'PARI' के संस्थापक हैं—","options":["राजदीप सरदेसाई","रवीश कुमार","पी. साईनाथ","विनोद मेहता"],"correct":2,"topic":"Indian media","difficulty":"medium","explanation":"P. Sainath founded the People's Archive of Rural India (PARI)."},
      {"id":"mmh2024-35","text":"RTI का फुल फॉर्म है—","options":["राइट टू इन्फॉर्मेशन","राइट टू इन्फॉर्टेनमेंट","राइट टू एंटरटेनमेंट","रोड टू इन्फॉर्मेशन"],"correct":0,"topic":"Abbreviations","difficulty":"easy","explanation":"RTI stands for Right To Information."},
      {"id":"mmh2024-36","text":"भारत की पहली फिल्म मानी जाती है—","options":["आलम आरा","कालिया मर्दन","राजा हरिश्चंद्र","अछूत कन्या"],"correct":2,"topic":"Indian cinema","difficulty":"medium","explanation":"Raja Harishchandra (1913) is regarded as India's first feature film."},
      {"id":"mmh2024-37","text":"समूह संचार में कितने लोग शामिल होते हैं?","options":["केवल 1","2 से अधिक","केवल 2","असंख्य"],"correct":1,"topic":"Communication types","difficulty":"easy-medium","explanation":"Group communication involves more than two people."},
      {"id":"mmh2024-38","text":"भारत में 'वर्नाकुलर प्रेस एक्ट' कब पास हुआ था?","options":["1857 ई.","1878 ई.","1905 ई.","1935 ई."],"correct":1,"topic":"Press history","difficulty":"medium","explanation":"The Vernacular Press Act was passed in 1878."},
      {"id":"mmh2024-39","text":"डिजिटल इंडिया को प्रधानमंत्री नरेंद्र मोदी ने कब लांच किया था ?","options":["1 जुलाई, 2015","26 जनवरी, 2020","15 अगस्त, 2017","14 सितंबर, 2018"],"correct":0,"topic":"Current affairs","difficulty":"medium","explanation":"Digital India was launched on 1 July 2015."},
      {"id":"mmh2024-40","text":"'रेड इंक' पुरस्कार किस क्षेत्र से संबंधित है?","options":["साहित्य","विज्ञान","कला","पत्रकारिता"],"correct":3,"topic":"Awards","difficulty":"medium-hard","explanation":"The Red Ink Award is given in the field of journalism. [FLAGGED]"}
  ];

  var mock = {
    id: 'jmi-2024-massmedia-hindi-full',
    name: 'JMI 2024 MA Mass Media (Hindi) Paper',
    template: 'ssc',
    examCatalogueId: 'jmi-massmedia-hindi',
    kind: 'pyq', scope: 'full', sectionTag: null, sourceSet: null, year: 2024,
    durationMin: 90,
    marking: {"correct":1,"wrong":-0.25,"unattempted":0},
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['hi'],
    sections: [
      { id: 'all', name: 'MA Mass Media (Hindi) Entrance 2024 — Part A (40 Questions)', questions: questions }
    ]
  };

  window.EXAMS = (window.EXAMS || []).concat([mock]);
})();
