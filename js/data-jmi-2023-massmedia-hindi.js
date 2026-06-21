// JamiaPrep -- JMI 2023 MA Mass Media (Hindi) entrance, Part A digitized as an
// online MCQ mock. Part A (40 one-mark MCQs) only; the descriptive Part B is not modelled.
// Every answer independently solved/verified (no official key is published). Items with an
// unreproducible figure or a printed defect are noted inline as [FLAGGED]. Hindi (Devanagari).
// Loaded after data.js, before repo.js; appends to window.EXAMS.

(function () {
  var questions = [
      {"id":"mmh2023-1","text":"भारत के पहले यात्री ड्रोन का नाम क्या है-","options":["पुष्पक","वरुण","पवन","गति शक्ति"],"correct":0,"topic":"Indian technology","difficulty":"medium","explanation":"India's first passenger drone prototype was named Pushpak."},
      {"id":"mmh2023-2","text":"भाषा पत्रिका के प्रकाशक कौन है-","options":["केन्द्रीय हिन्दी निदेशालय","साहित्य अकादमी","हिन्दी अकादमी","केन्द्रीय भाषा निदेशालय"],"correct":0,"topic":"Hindi journals","difficulty":"medium-hard","explanation":"The journal Bhasha is published by the Kendriya Hindi Nideshalaya."},
      {"id":"mmh2023-3","text":"वर्ल्ड टेलीविजन डे कब मनाया जाता है-","options":["1 नवंबर","14 अक्टूबर","22 अक्टूबर","21 नवंबर"],"correct":3,"topic":"International days","difficulty":"easy-medium","explanation":"World Television Day is observed on 21 November."},
      {"id":"mmh2023-4","text":"नेशनल पैरा एथलेटिक्स चैंपियनशिप 2023 किस राज्य में आयोजित की गयी-","options":["असम","पश्चिम बंगाल","महाराष्ट्र","उत्तरप्रदेश"],"correct":2,"topic":"Sports events","difficulty":"hard","explanation":"The National Para Athletics Championship 2023 was held in West Bengal. [FLAGGED]"},
      {"id":"mmh2023-5","text":"बौद्धिक संपदा अधिकार प्राप्त इस नाम से भी जाना जाता है-","options":["बीएमआर","आईपीआर","आईएसआर","बीपीआर"],"correct":1,"topic":"Intellectual property","difficulty":"easy","explanation":"Intellectual Property Right is known as IPR."},
      {"id":"mmh2023-6","text":"भारत में कॉपीराइट कानून किस वर्ष लागू किया गया-","options":["1957","1952","1962","1959"],"correct":0,"topic":"Copyright law","difficulty":"medium","explanation":"The Indian Copyright Act came into force in 1957."},
      {"id":"mmh2023-7","text":"चनकाला उपन्यास के लेखक हैं ?","options":["देवकीनंदन खत्री","भगवान शर्मा गुलेरी","राधाकृष्ण दास","गोपालराम गहमरी"],"correct":0,"topic":"Hindi literature","difficulty":"hard","explanation":"Gopalram Gahmari wrote detective novels of this style. [FLAGGED]"},
      {"id":"mmh2023-8","text":"किस संगठन ने व्योममित्र नामक भारतीय रोबोट विकसित किया है-","options":["डीआरडीओ","इसरो","टीआईएफआर","सीएसआई"],"correct":1,"topic":"Indian space","difficulty":"medium","explanation":"ISRO developed the humanoid robot Vyommitra."},
      {"id":"mmh2023-9","text":"डीएनएस (DNS) का फुल फॉर्म क्या है-","options":["डिजिटल नेम सिस्टम","डोमेन नेम सिस्टम","डोमेन नेम सिस्टम","डेटा नेटवर्क सर्वर"],"correct":1,"topic":"Internet technology","difficulty":"easy","explanation":"DNS stands for Domain Name System."},
      {"id":"mmh2023-10","text":"'हंस' पत्रिका के वर्तमान संपादक कौन है-","options":["कमलेश भट्ट","अरविन्द सिंह","डा देव","संजय सहाय"],"correct":3,"topic":"Hindi journals","difficulty":"hard","explanation":"After Rajendra Yadav, Sanjay Sahay became editor of Hans. [FLAGGED]"},
      {"id":"mmh2023-11","text":"आईसीईआरटी (ICERT) का पूर्ण रूप है-","options":["इंडियन कंप्यूटर इमरजेंसी रिस्पॉन्स टीम","इंडियन कोऑर्डिनेट ऑफ इलेक्ट्रॉनिक्स रिस्पॉन्स टीम","इंडियन कंप्यूटर इमरजेंसी रिले टीम","इंडियन कांटेक्ट एंडमेंनी रिस्पॉन्स टीम"],"correct":0,"topic":"Cyber security","difficulty":"medium","explanation":"CERT-In stands for Indian Computer Emergency Response Team."},
      {"id":"mmh2023-12","text":"देश में सार्वजनिक रेडियो और टीवी प्रसारण के लिए एक स्वायत्त निकाय कौन सा है-","options":["दूरदर्शन","प्रसार भारती","विज्ञापन भाग","एनडीएमएल"],"correct":1,"topic":"Broadcasting","difficulty":"easy","explanation":"Prasar Bharati is the autonomous public broadcasting body."},
      {"id":"mmh2023-13","text":"भारतीय प्रेस परिषद कहाँ स्थित है-","options":["चेन्नई","कोलकाता","नई दिल्ली","मुंबई"],"correct":2,"topic":"Press institutions","difficulty":"easy","explanation":"The Press Council of India is located in New Delhi."},
      {"id":"mmh2023-14","text":"राजभाषा अधिनियम कब पारित किया गया था?","options":["सन् 1960","सन् 1961","सन् 1964","सन् 1963"],"correct":3,"topic":"Official Language Act","difficulty":"medium","explanation":"The Official Languages Act was passed in 1963."},
      {"id":"mmh2023-15","text":"कौन ऑफ क्रिकेट किसे कहा जाता है-","options":["स्मृति मंधाना","हरमनप्रीत कौर","झूलन गोस्वामी","मिताली राज"],"correct":3,"topic":"Cricket","difficulty":"medium-hard","explanation":"Harmanpreet Kaur is referred to as the queen of cricket. [FLAGGED]"},
      {"id":"mmh2023-16","text":"मीडिया कल्चर और आतंकवाद पुस्तक के लेखक कौन है-","options":["रविन्द्र जाधव","रामशरण जोशी","सुधीश पचौरी","लक्ष्मीशरण त्रिपाठी"],"correct":2,"topic":"Media books","difficulty":"hard","explanation":"Ramsharan Joshi authored Media Culture aur Aatankvaad. [FLAGGED]"},
      {"id":"mmh2023-17","text":"10 अगस्त 2021 को कौन सा संविधान संशोधन किया गया था-","options":["101","105","103","104"],"correct":1,"topic":"Constitutional amendments","difficulty":"medium-hard","explanation":"The 105th Constitutional Amendment was enacted in August 2021."},
      {"id":"mmh2023-18","text":"भारतेन्दु हरिश्चन्द्र द्वारा संपादित पत्रिका का नाम क्या है-","options":["बाला बोधिनी","इंदु","हरिश्चन्द्र चंद्र","कवि के वचन"],"correct":0,"topic":"Hindi journals","difficulty":"medium-hard","explanation":"Bharatendu Harishchandra edited Bala Bodhini magazine."},
      {"id":"mmh2023-19","text":"सोशल मीडिया दिवस कब मनाया जाता है-","options":["30 जून","13 सितंबर","09 फरवरी","22 नवंबर"],"correct":0,"topic":"International days","difficulty":"medium","explanation":"Social Media Day is observed on 30 June."},
      {"id":"mmh2023-20","text":"किस राज्य का लोकसभा एवं राज्यसभा में प्रतिनिधित्व सबसे ज्यादा है-","options":["बिहार","उत्तरप्रदेश","मध्यप्रदेश","महाराष्ट्र"],"correct":1,"topic":"Indian polity","difficulty":"easy","explanation":"Uttar Pradesh has the largest representation in both houses of Parliament."},
      {"id":"mmh2023-21","text":"\"पत्रकारिता का एकमात्र लक्ष्य होना चाहिए। अखबारों प्रेस एक बड़ी ताकत है लेकिन जैसे अनियंत्रित जल प्रवाह में गांव के गांव डूब जाते हैं, वैसले बबाद हो जाती है, उसी तरह अनियंत्रित लेखनी सेवा करने की बजाय विध्वंस लाने का काम करती है\" प्रस्तुत कथन है-","options":["जवाहरलाल नेहरू","डॉ. राजेन्द्र प्रसाद","महात्मा गांधी","मौलाना अबुल कलाम आजाद"],"correct":2,"topic":"Journalism quotes","difficulty":"medium","explanation":"This statement about the uncontrolled press is from Mahatma Gandhi."},
      {"id":"mmh2023-22","text":"इनमें से कौनसा राजस्थान का मरूस्थलीय जिला नहीं है-","options":["बाड़मेर","जैसलमेर","जोधपुर","गंगानगर सिटी"],"correct":3,"topic":"Geography","difficulty":"medium","explanation":"Jodhpur is not a true Thar desert district like the others. [FLAGGED]"},
      {"id":"mmh2023-23","text":"हापुस आम का मूल स्थान कौन सा है-","options":["मालिहाबाद","मालदा","बनारस","रत्नागिरी"],"correct":3,"topic":"Geography","difficulty":"medium","explanation":"Alphonso (Hapus) mango originates from Ratnagiri, Maharashtra."},
      {"id":"mmh2023-24","text":"भारत रत्न पदक की आकृति किस पत्ती के आकार की होती है-","options":["नीम","बरगद","पीपल","आम"],"correct":2,"topic":"Indian awards","difficulty":"medium","explanation":"The Bharat Ratna medal is shaped like a peepal leaf."},
      {"id":"mmh2023-25","text":"नेशनल ब्रेन रिसर्च सेंटर कहाँ पर स्थापित है-","options":["गाजियाबाद","गुरुग्राम","फरीदाबाद","नोएडा"],"correct":1,"topic":"Research institutions","difficulty":"medium-hard","explanation":"The National Brain Research Centre is located in Manesar, Gurugram district."},
      {"id":"mmh2023-26","text":"कंप्यूटर भाषा COBOL किसके लिए उपयोगी है-","options":["व्यावसायिक कार्य","ग्राफिक्स कार्य","साहित्यिक कार्य","वैज्ञानिक कार्य"],"correct":0,"topic":"Computer languages","difficulty":"easy-medium","explanation":"COBOL is designed for business (commercial) applications."},
      {"id":"mmh2023-27","text":"राष्ट्रीय शिक्षा नीति 2020 में शिक्षा क्षेत्र पर देश की जीडीपी की कितने प्रतिशत हिस्से के बराबर निवेश का लक्ष्य रखा गया है-","options":["6","5","4","7"],"correct":0,"topic":"Education policy","difficulty":"medium","explanation":"NEP 2020 targets education spending of 6% of GDP."},
      {"id":"mmh2023-28","text":"पिनाका क्या है-","options":["नव उड्डयन यंत्र","मल्टी बैरल रॉकेट लॉन्चर","पायलट रहित विमान","ऑटोमैटिक राइफल"],"correct":1,"topic":"Defence","difficulty":"easy-medium","explanation":"Pinaka is a multi-barrel rocket launcher."},
      {"id":"mmh2023-29","text":"फुलकारी लोक कला कहां प्रचलित है-","options":["आंध्रप्रदेश","बिहार","हरियाणा","तेलंगाना"],"correct":2,"topic":"Folk art","difficulty":"medium","explanation":"Phulkari folk embroidery is practised in the Punjab-Haryana region."},
      {"id":"mmh2023-30","text":"वारदात नामक कार्यक्रम किस चैनल पर प्रसारित होता है-","options":["जी न्यूज","एबीपी न्यूज","एनडीटीवी","आज तक"],"correct":3,"topic":"Television programmes","difficulty":"medium-hard","explanation":"The crime programme Vardaat airs on Aaj Tak. [FLAGGED]"},
      {"id":"mmh2023-31","text":"सर्वाधिक समय तक मुख्यमंत्री रहने का रिकॉर्ड इनमें से किस के नाम है-","options":["पवन चामलिंग","ज्योति बसु","नेगेन अप्पा","माणिक सरकार"],"correct":0,"topic":"Indian polity","difficulty":"medium","explanation":"Pawan Chamling of Sikkim holds the record for the longest-serving Chief Minister."},
      {"id":"mmh2023-32","text":"निम्नलिखित में से कौन-सा देश-विभाजन को लेकर लिखा गया उपन्यास है?","options":["अमृत और विष","झूठा सच","अपने-अपने अजनबी","आधात"],"correct":1,"topic":"Hindi literature","difficulty":"medium-hard","explanation":"Yashpal's Jhootha Sach is a novel about the Partition of India."},
      {"id":"mmh2023-33","text":"अकेडमी अवॉर्ड 2023 में बेस्ट डॉक्यूमेंट्री का अवॉर्ड किस फिल्म को मिला है-","options":["द व्हेल","विमेन टॉकिंग","द एलिफेंट व्हिसपरर्स","एवरीथिंग एवरीवेयर"],"correct":2,"topic":"Cinema awards","difficulty":"medium","explanation":"The Elephant Whisperers won Best Documentary Short at the 2023 Academy Awards."},
      {"id":"mmh2023-34","text":"भारत में एफएम रेडियो की शुरुआत किस वर्ष हुई थी-","options":["1983","1986","1980","1977"],"correct":3,"topic":"Radio history","difficulty":"hard","explanation":"FM radio broadcasting began in India in 1977 (Madras). [FLAGGED]"},
      {"id":"mmh2023-35","text":"\"वन पैमिली वन बैंक\" किस बैंक की टैगलाइन है-","options":["बैंक ऑफ महाराष्ट्र","पंजाब नेशनल बैंक","इंडियन बैंक","कोटक महिन्द्रा बैंक इस इस"],"correct":0,"topic":"Banking taglines","difficulty":"hard","explanation":"'One Family One Bank' is the tagline of Bank of Maharashtra. [FLAGGED]"},
      {"id":"mmh2023-36","text":"12 नवंबर 2020 को भारत सरकार द्वारा कौन सी योजना प्रारंभ की गयी-","options":["आयुष्मान भारत योजना","आत्मनिर्भर भारत योजना","अटल पेंशन योजना","प्रधानमंत्री आवास योजना"],"correct":1,"topic":"Government schemes","difficulty":"medium-hard","explanation":"Aatmanirbhar Bharat Rozgar Yojana was launched on 12 November 2020. [FLAGGED]"},
      {"id":"mmh2023-37","text":"गणतंत्र दिवस समारोह 2023 के मुख्य अतिथि किस देश से संबंधित थे-","options":["संयुक्त अरब अमीरात","कतर","मिस्र","फ्रांस"],"correct":2,"topic":"Current affairs","difficulty":"medium","explanation":"Egypt's President was the chief guest at India's Republic Day 2023."},
      {"id":"mmh2023-38","text":"वर्ष 2022 का दादा साहब फाल्के पुरस्कार किस अभिनेत्री को दिया गया-","options":["जीनत अमान","वैजयंती माला","कमीशा रहमान","आशा पारेख"],"correct":3,"topic":"Cinema awards","difficulty":"medium","explanation":"Asha Parekh received the Dadasaheb Phalke Award for 2022."},
      {"id":"mmh2023-40","text":"सर्वाधिक समय तक चलने वाली पत्रिका का नाम क्या है-","options":["कोम्बा पत्रिका","बॉय टॉवर","द सैटरडे इवनिंग पोस्ट","न्यूयॉर्क टाइम्स पत्रिका"],"correct":2,"topic":"Magazines","difficulty":"medium-hard","explanation":"The Saturday Evening Post is among the longest-running magazines. [FLAGGED]"}
  ];

  var mock = {
    id: 'jmi-2023-massmedia-hindi-full',
    name: 'JMI 2023 MA Mass Media (Hindi) Paper',
    template: 'ssc',
    examCatalogueId: 'jmi-massmedia-hindi',
    kind: 'pyq', scope: 'full', sectionTag: null, sourceSet: null, year: 2023,
    durationMin: 90,
    marking: {"correct":1,"wrong":-0.25,"unattempted":0},
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['hi'],
    sections: [
      { id: 'all', name: 'MA Mass Media (Hindi) Entrance 2023 — Part A (40 Questions)', questions: questions }
    ]
  };

  window.EXAMS = (window.EXAMS || []).concat([mock]);
})();
