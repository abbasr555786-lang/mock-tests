// JamiaPrep -- JMI 2022 MA Mass Media (Hindi) entrance, Part A digitized as an
// online MCQ mock. Part A (40 one-mark MCQs) only; the descriptive Part B is not modelled.
// Every answer independently solved/verified (no official key is published). Items with an
// unreproducible figure or a printed defect are noted inline as [FLAGGED]. Hindi (Devanagari).
// Loaded after data.js, before repo.js; appends to window.EXAMS.

(function () {
  var questions = [
      {"id":"mmh2022-1","text":"मिर्ज़ा ग़ालिब की मज़ार कहाँ है-","options":["अजमेर","लाहौर","दिल्ली","गुलबर्ग"],"correct":2,"topic":"Urdu literature","difficulty":"easy","explanation":"Mirza Ghalib's tomb (mazar) is in Nizamuddin, Delhi."},
      {"id":"mmh2022-2","text":"मानव से संबंधित सबसे ज़्यादा जीवाश्म किस महाद्वीप पर मिले हैं?","options":["अमरीका","आस्ट्रेलिया","एशिया","अफ्रीका"],"correct":3,"topic":"Anthropology","difficulty":"medium","explanation":"Most human-related fossils have been found in Africa."},
      {"id":"mmh2022-3","text":"उड़ने वाला स्तनधारी है -","options":["चील","चमगादड़","फ्लाइंग फ्रॉग","शुतुरमुर्ग"],"correct":1,"topic":"Biology","difficulty":"easy","explanation":"The bat (chamgadar) is the only mammal capable of true flight."},
      {"id":"mmh2022-4","text":"भारत के राष्ट्रपति को शपथ कौन दिलाता है?","options":["सर्वोच्च न्यायालय के मुख्य न्यायाधीश","भारत के उपराष्ट्रपति","लोकसभा अध्यक्ष","कानून मंत्री"],"correct":0,"topic":"Indian polity","difficulty":"easy-medium","explanation":"The Chief Justice of India administers the oath to the President."},
      {"id":"mmh2022-5","text":"संयुक्त राष्ट्रसंघ के वर्तमान अध्यक्ष कौन हैं ?","options":["फारूक अब्दुल्लाह","तिजानी मुहम्मद बंदे","अब्दुल्लाह शाहिद","ज़ोल्कान बोज़कर"],"correct":2,"topic":"United Nations","difficulty":"medium","explanation":"Abdulla Shahid was President of the UN General Assembly during 2021-22."},
      {"id":"mmh2022-6","text":"राज्यसभा के लिए मनोनीत पहली अभिनेत्री हैं-","options":["वैजंतीमाला","शबाना आज़मी","नर्गिस","हेमामालिनी"],"correct":2,"topic":"Indian polity","difficulty":"medium","explanation":"Nargis Dutt was the first actress nominated to the Rajya Sabha."},
      {"id":"mmh2022-7","text":"एशियाड 2022 का मेज़बान देश है-","options":["जापान","चीन","मलेशिया","भारत"],"correct":1,"topic":"Sports","difficulty":"easy-medium","explanation":"The 2022 Asian Games were hosted by Hangzhou, China."},
      {"id":"mmh2022-8","text":"'क्रिकेट माई स्टाइल' के लेखक हैं-","options":["लाला अमरनाथ","सुनील गावस्कर","कपिल देव","शेन वार्न"],"correct":2,"topic":"Books and authors","difficulty":"medium","explanation":"'Cricket My Style' was written by Kapil Dev."},
      {"id":"mmh2022-9","text":"राष्ट्रमंडल खेलों में पदक जीतने वाला पहला भारतीय-","options":["दारा सिंह","राशिद अनवर","संतोष यादव","मिल्खा सिंह"],"correct":1,"topic":"Sports history","difficulty":"hard","explanation":"Rashid Anwar won India's first Empire/Commonwealth Games medal in 1934."},
      {"id":"mmh2022-10","text":"अंकती भगवत का संबंध किस खेल से है ?","options":["तीरंदाज़ी से","एथलेटिक्स से","क्रिकेट से","बैडमिंटन से"],"correct":0,"topic":"Sports","difficulty":"hard","explanation":"Ankita Bhakat is an Indian archer (teerandazi). [FLAGGED]"},
      {"id":"mmh2022-11","text":"निम्नलिखित में से कौन सुमेलित नहीं है ?","options":["शिवकुमार शर्मा – संतूर","ज़ाकिर हुसैन – तबला","ब्रिजमोहन लाल खां – बांसुरी","रवि शंकर- सितार"],"correct":2,"topic":"Indian music","difficulty":"medium-hard","explanation":"The flute (bansuri) is associated with Hariprasad Chaurasia, so this pairing is mismatched."},
      {"id":"mmh2022-12","text":"फिल्म 'पाकीज़ा' के निर्देशक थे -","options":["कमाल अमरोहवी","नवाबत मिर्ज़ा","गुफ़रान अली","के.आसिफ"],"correct":0,"topic":"Hindi cinema","difficulty":"medium","explanation":"Pakeezah (1972) was directed by Kamal Amrohi."},
      {"id":"mmh2022-13","text":"सर्वाधिक साक्षरता वाला राज्य है-","options":["उत्तर प्रदेश","गुजरात","महाराष्ट्र","केरल"],"correct":3,"topic":"Indian geography","difficulty":"easy","explanation":"Kerala has the highest literacy rate among Indian states."},
      {"id":"mmh2022-14","text":"गिद्धा ................ का लोक नृत्य है?","options":["पंजाब","हरयाणा","राजस्थान","उत्तर प्रदेश"],"correct":0,"topic":"Folk dance","difficulty":"easy","explanation":"Giddha is a folk dance of Punjab."},
      {"id":"mmh2022-15","text":"काज़ीरंगा नेशनल पार्क कहाँ है ?","options":["उत्तराखंड में","हिमाचल प्रदेश में","गोवा में","असम में"],"correct":3,"topic":"Indian geography","difficulty":"easy","explanation":"Kaziranga National Park is in Assam."},
      {"id":"mmh2022-16","text":"प्रथम गणतंत्र दिवस समारोह (1950) के मुख्य अतिथि थे-","options":["राष्ट्रपति सुकर्णों","लार्ड माउंटबेटन","प्रधानमंत्री चर्चिल","राजा डिमे दोरजी वाँगचुक"],"correct":0,"topic":"Indian history","difficulty":"medium-hard","explanation":"President Sukarno of Indonesia was the chief guest at the first Republic Day (1950)."},
      {"id":"mmh2022-17","text":"निम्नलिखित में से कौन उपराष्ट्रपति नहीं रहे ?","options":["के.आर. नारायणन","आर. बेंकटरमण","नीलम संजीव रेड्डी","गोपाल स्वरूप पाठक"],"correct":2,"topic":"Indian polity","difficulty":"medium-hard","explanation":"Neelam Sanjiva Reddy was President but never Vice-President of India."},
      {"id":"mmh2022-18","text":"गंगटोक किस प्रदेश की राजधानी है ?","options":["सेंधालय","सिक्किम","त्रिपुरा","लक्षद्वीप"],"correct":1,"topic":"Indian geography","difficulty":"easy","explanation":"Gangtok is the capital of Sikkim."},
      {"id":"mmh2022-19","text":"एक रुपये के नोट पर किसके हस्ताक्षर होते हैं -","options":["गवर्नर आर.बी. आई.","वित्त सचिव, भारत सरकार","वित्त मंत्री, भारत सरकार","राष्ट्रपति"],"correct":1,"topic":"Indian economy","difficulty":"medium","explanation":"The one-rupee note bears the signature of the Finance Secretary, Government of India."},
      {"id":"mmh2022-20","text":"तूती-ए-हिंद किसे कहा गया है ?","options":["बिस्मिल्लाह खां","सरोजनी नायडू","तानसेन","अमीर खुसरो"],"correct":3,"topic":"Persian poetry","difficulty":"medium","explanation":"Amir Khusro is known as 'Tuti-e-Hind' (Parrot of India)."},
      {"id":"mmh2022-21","text":"भिलाई शहर की प्रसिद्धि का कारण है ?","options":["सीमेंट","स्टील प्लांट","डेयरी उद्योग","हस्तकला"],"correct":1,"topic":"Industry geography","difficulty":"easy-medium","explanation":"Bhilai is famous for its steel plant."},
      {"id":"mmh2022-22","text":"रबिंद्रनाथ टैगोर को किस क्षेत्र में नोबल पुरस्कार मिला था ?","options":["साहित्य","शान्ति","विज्ञान","राजनीति"],"correct":0,"topic":"Nobel Prize","difficulty":"easy","explanation":"Rabindranath Tagore won the Nobel Prize in Literature (1913)."},
      {"id":"mmh2022-23","text":"लंदन शहर किस नदी के किनारे बसा है ?","options":["स्वेज","नील","टेम्स","विस्तुला"],"correct":2,"topic":"World geography","difficulty":"easy","explanation":"London lies on the banks of the River Thames."},
      {"id":"mmh2022-24","text":"विश्व में सबसे कम आबादी वाला देश -","options":["सैन मैरिनो","मोनाको","वैटिकन सिटी","डोमिनिका"],"correct":2,"topic":"World geography","difficulty":"medium","explanation":"Vatican City is the least populous country in the world."},
      {"id":"mmh2022-25","text":"ऑस्ट्रेलिया के झंडे में कितने सितारे हैं ?","options":["4","5","6","7"],"correct":2,"topic":"World flags","difficulty":"medium","explanation":"The Australian flag has 6 stars (5 of the Southern Cross plus the Commonwealth Star)."},
      {"id":"mmh2022-26","text":"'कभी हार के आगे जीत है' किसकी टैग लाइन है ?","options":["कोका कोला","माउंटेन ड्यू","पेप्सी","सेवन अप"],"correct":1,"topic":"Advertising","difficulty":"medium","explanation":"'Darr ke aage jeet hai' is the tagline of Mountain Dew."},
      {"id":"mmh2022-27","text":"हाल ही में किस भारतीय शहर को विश्व धरोहर के रूप में प्रमाणित किया गया है ?","options":["बनारस","चेन्नई","भोपाल","जयपुर"],"correct":3,"topic":"UNESCO heritage","difficulty":"medium","explanation":"Jaipur was inscribed as a UNESCO World Heritage city (2019)."},
      {"id":"mmh2022-28","text":"ननकाना साहब गुरुद्वारा कहाँ है ?","options":["अफ़गानिस्तान में","पाकिस्तान में","बांग्लादेश में","भारत में"],"correct":1,"topic":"Sikhism","difficulty":"easy-medium","explanation":"Nankana Sahib Gurudwara, birthplace of Guru Nanak, is in Pakistan."},
      {"id":"mmh2022-29","text":"'रिश्ता वही सोच नई' किस टी.वी. चैनल की टैग लाइन है?","options":["इंडिया टी.वी.","स्टार प्लस","आजतक","ज़ी-टी.वी."],"correct":1,"topic":"Television","difficulty":"medium","explanation":"'Rishta wahi soch nayi' is the tagline of Star Plus."},
      {"id":"mmh2022-30","text":"ट्विटर की अधिकतम कैरेक्टर लिमिट कितनी है ?","options":["280","200","150","300"],"correct":0,"topic":"Social media","difficulty":"easy-medium","explanation":"Twitter's character limit is 280 characters."},
      {"id":"mmh2022-31","text":"ट्रेजडी किंग किसे कहा जाता है ?","options":["सोहराब मोदी को","देवानंद को","राज कपूर को","दिलीप कुमार को"],"correct":3,"topic":"Hindi cinema","difficulty":"easy-medium","explanation":"Dilip Kumar is known as the 'Tragedy King' of Hindi cinema."},
      {"id":"mmh2022-32","text":"'वार एंड पीस' उपन्यास के लेखक कौन हैं ?","options":["टॉलस्टॉय","शेक्सपीयर","मैक्सिम गोर्की","मिल्टन"],"correct":0,"topic":"World literature","difficulty":"medium","explanation":"'War and Peace' was written by Leo Tolstoy."},
      {"id":"mmh2022-33","text":"निम्नलिखित में से अशुद्ध वर्तनी चुनिए-","options":["आशीर्वाद","विद्ब","उज्ज्वल","श्रीमती"],"correct":1,"topic":"Hindi grammar","difficulty":"medium-hard","explanation":"'विद्ब' is the misspelt word; the correct form would be विद्वान/विद्व. [FLAGGED]"},
      {"id":"mmh2022-34","text":"'चीता बहुत तेज़ दौड़ता है' में 'बहुत' क्या है ?","options":["विशेषण","क्रिया","अव्यय","संज्ञा"],"correct":2,"topic":"Hindi grammar","difficulty":"medium","explanation":"Here 'bahut' modifies the verb's manner, functioning as an avyaya (kriya-visheshan)."},
      {"id":"mmh2022-35","text":"'आँख लगना' मुहावरे का अर्थ है -","options":["आँख चिपक जाना","नींद आ जाना","सपना देखना","आँख में चोट लगना"],"correct":1,"topic":"Hindi idioms","difficulty":"easy-medium","explanation":"The idiom 'aankh lagna' means to fall asleep."},
      {"id":"mmh2022-36","text":"अश्वत्थामा कौन था ?","options":["द्रोणाचार्य का पुत्र","एक नर पशु","एकलव्य का भाई","गंगा का बेटा"],"correct":0,"topic":"Mythology","difficulty":"easy-medium","explanation":"Ashwatthama was the son of Dronacharya in the Mahabharata."},
      {"id":"mmh2022-37","text":"निम्नलिखित में से कौन चित्रकार नहीं है ?","options":["वान गॉग","लियोनार्दो दि कैप्रियो","पिकासो","एम.एफ. हुसैन"],"correct":1,"topic":"Art","difficulty":"easy-medium","explanation":"Leonardo DiCaprio is an actor, not a painter."},
      {"id":"mmh2022-38","text":"भारतीय थल सेना की सबसे ऊँची रैंक होती है -","options":["ब्रिगेडियर","जनरल","फील्ड मार्शल","एयर मार्शल"],"correct":2,"topic":"Defence","difficulty":"medium","explanation":"Field Marshal is the highest (honorary) rank in the Indian Army."},
      {"id":"mmh2022-39","text":"यूक्रेन की राजधानी है-","options":["ग्रोज़नी","ताशकंद","कीव","अस्ताना"],"correct":2,"topic":"World geography","difficulty":"easy","explanation":"Kyiv (Kiev) is the capital of Ukraine."},
      {"id":"mmh2022-40","text":"'इंडिया विन्स फ्रीडम' के लेखक कौन हैं?","options":["अबुलकलाम आज़ाद","श्यामाप्रसाद मुखर्जी","अटलबिहारी वाजपेयी","जवाहरलाल नेहरू"],"correct":0,"topic":"Books and authors","difficulty":"medium","explanation":"'India Wins Freedom' was written by Maulana Abul Kalam Azad."}
  ];

  var mock = {
    id: 'jmi-2022-massmedia-hindi-full',
    name: 'JMI 2022 MA Mass Media (Hindi) Paper',
    template: 'ssc',
    examCatalogueId: 'jmi-massmedia-hindi',
    kind: 'pyq', scope: 'full', sectionTag: null, sourceSet: null, year: 2022,
    durationMin: 90,
    marking: {"correct":1,"wrong":-0.25,"unattempted":0},
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['hi'],
    sections: [
      { id: 'all', name: 'MA Mass Media (Hindi) Entrance 2022 — Part A (40 Questions)', questions: questions }
    ]
  };

  window.EXAMS = (window.EXAMS || []).concat([mock]);
})();
