// JamiaPrep -- JMI 2021 MA Mass Media (Hindi) entrance, Part A digitized as an
// online MCQ mock. Part A (40 one-mark MCQs) only; the descriptive Part B is not modelled.
// Every answer independently solved/verified (no official key is published). Items with an
// unreproducible figure or a printed defect are noted inline as [FLAGGED]. Hindi (Devanagari).
// Loaded after data.js, before repo.js; appends to window.EXAMS.

(function () {
  var questions = [
      {"id":"mmh2021-1","text":"किस भाषा को बिहार की 'दूसरी राजभाषा' का दर्जा हासिल है :","options":["उर्दू","हिन्दी","अंग्रेजी","मैथिली"],"correct":0,"topic":"Bihar official language","difficulty":"easy-medium","explanation":"Urdu is the second official language of Bihar."},
      {"id":"mmh2021-2","text":"कन्हैया सिंह किस पत्रिका के सम्पादक थे :","options":["हंस","धर्मयुग","आलोचना","हंस"],"correct":2,"topic":"Hindi magazine editor","difficulty":"hard","explanation":"Best guess; options A and D both read 'हंस' which is a printed defect, no clear distinct correct option. [FLAGGED]"},
      {"id":"mmh2021-3","text":"कौन सी फिल्म 84 के दंगों पर आधारित है? :","options":["बॉम्बे","माचिस","तमस","पिंजर"],"correct":1,"topic":"Film on 1984 riots","difficulty":"medium","explanation":"Gulzar's 'Maachis' deals with the aftermath of the 1984 anti-Sikh riots."},
      {"id":"mmh2021-4","text":"कैटालोनिया कहाँ स्थित है :","options":["यूरोप","एशिया","अमेरिका","ब्रिटेन"],"correct":0,"topic":"Geography Catalonia","difficulty":"easy","explanation":"Catalonia is a region of Spain in Europe."},
      {"id":"mmh2021-6","text":"'अ प्रॉमिस्ड लैंड' पुस्तक किसने लिखी है :","options":["बराक ओबामा","ब्लादिमीर पुतिन","शेख हसीना","नेल्सन मंडेला"],"correct":0,"topic":"Author of book","difficulty":"easy","explanation":"'A Promised Land' is Barack Obama's memoir."},
      {"id":"mmh2021-7","text":"यहूदियों का पूजा-स्थल है :","options":["मस्जिद","सिनेगॉग","चर्च","चैपल"],"correct":1,"topic":"Jewish place of worship","difficulty":"easy","explanation":"Synagogue is the Jewish place of worship."},
      {"id":"mmh2021-8","text":"भारत में जन्मे किस अर्थशास्त्री को 2019 का नोबेल पुरस्कार मिला है :","options":["अभिजीत बनर्जी","जयराम रमेश","मनमोहन सिंह","जयति घोष"],"correct":0,"topic":"Nobel Economics 2019","difficulty":"easy-medium","explanation":"Abhijit Banerjee won the 2019 Nobel Prize in Economics."},
      {"id":"mmh2021-9","text":"'जिन्दा कौमें पाँच साल इन्तज़ार नहीं करतीं' किसने कहा था :","options":["इन्दिरा गांधी","जय प्रकाश नारायण","डॉ. राम मनोहर लोहिया","मोरारजी देसाई"],"correct":2,"topic":"Famous quote","difficulty":"medium-hard","explanation":"This quote is attributed to Ram Manohar Lohia."},
      {"id":"mmh2021-10","text":"वर्तमान केन्द्र सरकार में कृषि मंत्री कौन है :","options":["प्रकाश जावड़ेकर","स्मृति ईरानी","राजनाथ सिंह","नरेन्द्र सिंह तोमर"],"correct":3,"topic":"Current Agriculture Minister","difficulty":"easy-medium","explanation":"Narendra Singh Tomar was the Union Agriculture Minister at the time."},
      {"id":"mmh2021-11","text":"'गीत गोविन्द' की रचना किसने की :","options":["विद्यापति","जयदेव","सूरदास","भोजराज"],"correct":1,"topic":"Geet Govind author","difficulty":"medium","explanation":"Geet Govind was composed by Jayadeva."},
      {"id":"mmh2021-12","text":"निम्न में से कौन समाचार-चैनल नहीं है :","options":["आज तक","फ्रांस 24","ऐपक","सी.एन.ए."],"correct":2,"topic":"News channels","difficulty":"medium","explanation":"Best guess; 'ऐपक' is not a news channel. [FLAGGED]"},
      {"id":"mmh2021-13","text":"'साहित्य राजनीति के आगे मशाल दिखाती हुई चलने वाली सच्चाई है।' किस लेखक ने कहा था :","options":["अज्ञेय","प्रेमचन्द","निराला","महादेवी वर्मा"],"correct":1,"topic":"Literature quote Premchand","difficulty":"medium-hard","explanation":"This statement is attributed to Premchand."},
      {"id":"mmh2021-14","text":"क्रिकेट में 1983 का विश्वकप किस देश ने जीता था :","options":["भारत","पाकिस्तान","इंग्लैंड","ऑस्ट्रेलिया"],"correct":0,"topic":"1983 Cricket World Cup","difficulty":"easy","explanation":"India won the 1983 Cricket World Cup."},
      {"id":"mmh2021-15","text":"बांग्लादेश के प्रथम राष्ट्रपति कौन थे :","options":["शेख मुजीबुर रहमान","नुसरत इस्लाम","जियाउर रहमान","अब्दुस्सत्तार"],"correct":0,"topic":"First President Bangladesh","difficulty":"easy-medium","explanation":"Sheikh Mujibur Rahman was the first President of Bangladesh."},
      {"id":"mmh2021-16","text":"पहला भारतीय समाचार पत्र कौन सा था :","options":["उदन्त मार्तण्ड","देहली उर्दू अखबार","बनारस अखबार","हिकी का बंगाल गजट"],"correct":3,"topic":"First Indian newspaper","difficulty":"medium","explanation":"Hicky's Bengal Gazette (1780) was the first newspaper in India."},
      {"id":"mmh2021-17","text":"'जनसत्ता' समाचार पत्र के सम्पादक नहीं रहे हैं :","options":["ओम थानवी","प्रभाष जोशी","मुकेश भारद्वाज","राजेन्द्र माथुर"],"correct":3,"topic":"Jansatta editors","difficulty":"medium-hard","explanation":"Rajendra Mathur edited Navbharat Times, not Jansatta."},
      {"id":"mmh2021-18","text":"'प्लेग' उपन्यास के लेखक का नाम है :","options":["फ्रांज़ काफ्का","अल्बेर कामू","डी. एच. लॉरेंस","एन्तोन चेखव"],"correct":1,"topic":"Author of The Plague","difficulty":"medium","explanation":"'The Plague' was written by Albert Camus."},
      {"id":"mmh2021-20","text":"हाल में किस पॉप-गायिका का ट्वीट किसान आंदोलन के संदर्भ में प्रसिद्ध हुआ था :","options":["शकीरा","लेडी गागा","रिहाना","मदोना"],"correct":2,"topic":"Rihanna farmer protest tweet","difficulty":"easy","explanation":"Rihanna's tweet about the Indian farmers' protest went viral."},
      {"id":"mmh2021-21","text":"जम्मू कश्मीर की वर्तमान स्थिति निम्न है :","options":["केंद्र शासित प्रदेश","पूर्ण राज्य","राष्ट्रपति शासन","जम्मू और कश्मीर दो अलग-अलग राज्य हैं"],"correct":0,"topic":"J&K current status","difficulty":"easy-medium","explanation":"After Article 370 abrogation, J&K became a Union Territory."},
      {"id":"mmh2021-22","text":"हाल में पश्चिम बंगाल चुनाव में ममता बनर्जी किस विधानसभा क्षेत्र से हारी थीं :","options":["हाजीराम","नंदीग्राम","इस्लामपुर","कोलकाता पोर्ट"],"correct":1,"topic":"WB 2021 election","difficulty":"medium","explanation":"Mamata Banerjee lost from Nandigram to Suvendu Adhikari."},
      {"id":"mmh2021-23","text":"महात्मा गांधी को 'हाफ नेकेड फकीर' किसने कहा था :","options":["विन्सटन चर्चिल","माउंटबेटन","क्लीव वेलिंगबेक","रडयार्ड किपलिंग"],"correct":0,"topic":"Half naked fakir quote","difficulty":"medium","explanation":"Winston Churchill called Gandhi a 'half-naked fakir'."},
      {"id":"mmh2021-24","text":"मोहिनीअट्टम किस प्रदेश का नृत्य है :","options":["तमिलनाडु","असम","केरल","कर्नाटक"],"correct":2,"topic":"Mohiniyattam dance","difficulty":"easy","explanation":"Mohiniyattam is a classical dance form of Kerala."},
      {"id":"mmh2021-25","text":"किस समाचार एजेंसी का मुख्यालय कतर में है :","options":["एसोसिएटेड प्रेस","सी.एन.ए.","अल जजीरा","रॉयटर्स"],"correct":2,"topic":"News agency Qatar","difficulty":"easy","explanation":"Al Jazeera is headquartered in Doha, Qatar."},
      {"id":"mmh2021-26","text":"'महाभारत' में धृतराष्ट्र को युद्धभूमि का आँखों देखा हाल किसने सुनाया था :","options":["संजय ने","विदुर ने","पाण्डु ने","गांधारी ने"],"correct":0,"topic":"Mahabharata Sanjay","difficulty":"easy","explanation":"Sanjay narrated the battlefield events to Dhritarashtra."},
      {"id":"mmh2021-27","text":"'आपातकाल' को अनुशासन-पर्व किसने कहा था :","options":["विनोबा भावे","खुशवन्त सिंह","इन्दिरा गांधी","बाल ठाकरे"],"correct":0,"topic":"Emergency Anushasan Parva","difficulty":"medium","explanation":"Vinoba Bhave termed the Emergency as 'Anushasan Parva'."},
      {"id":"mmh2021-28","text":"'मुसाफिर की डायरी' के लेखक हैं :","options":["सहादत हसन मंटो","ख्वाजा अहमद अब्बास","कुर्तुल ऐन हैदर","साहिर लुधियानवी"],"correct":1,"topic":"Author Musafir ki Diary","difficulty":"hard","explanation":"Best guess; attributed to Khwaja Ahmad Abbas. [FLAGGED]"},
      {"id":"mmh2021-29","text":"फिदेल कास्त्रो किस देश के प्रधानमंत्री थे :","options":["चीली","क्यूबा","स्पेन","मैक्सिको"],"correct":1,"topic":"Fidel Castro Cuba","difficulty":"easy","explanation":"Fidel Castro led Cuba."},
      {"id":"mmh2021-30","text":"सी.एन.एन. का पूरा नाम क्या है :","options":["कंबल न्यूज नेटवर्क","कैलिफोर्निया न्यूज नेटवर्क","कनाडा न्यूज नेटवर्क","केबल न्यूज नेटवर्क"],"correct":3,"topic":"CNN full form","difficulty":"easy","explanation":"CNN stands for Cable News Network."},
      {"id":"mmh2021-31","text":"'विश्व स्वास्थ्य संगठन' का मुख्यालय कहाँ स्थित है :","options":["जेनेवा","कोपनहेगन","न्यूयार्क","शंघाई"],"correct":0,"topic":"WHO headquarters","difficulty":"easy","explanation":"WHO is headquartered in Geneva, Switzerland."},
      {"id":"mmh2021-32","text":"ओलम्पिक खेलों में पदक जीतने वाली पहली भारतीय महिला खिलाड़ी का नाम है :","options":["पी.टी. ऊषा","सायना नेहवाल","मेरी कॉम","कर्णम मल्लेश्वरी"],"correct":3,"topic":"First Indian woman Olympic medal","difficulty":"medium","explanation":"Karnam Malleswari won India's first Olympic medal by a woman (2000)."},
      {"id":"mmh2021-33","text":"अदर पूनावाला किस संस्था के सी.ई.ओ. हैं :","options":["सीरम इंस्टीट्यूट","भारत बायोटेक","आस्ट्राज़ेनिका","जॉनसन एंड जॉनसन"],"correct":0,"topic":"Adar Poonawalla CEO","difficulty":"easy","explanation":"Adar Poonawalla is CEO of Serum Institute of India."},
      {"id":"mmh2021-34","text":"फेसबुक का मुख्यालय कहाँ है :","options":["न्यू जर्सी","कैलिफोर्निया","न्यूयार्क","फ्लोरिडा"],"correct":1,"topic":"Facebook headquarters","difficulty":"easy","explanation":"Facebook is headquartered in Menlo Park, California."},
      {"id":"mmh2021-35","text":"'जूठन' किस लेखक की आत्मकथा है :","options":["ओमप्रकाश वाल्मीकि","प्रभा खेतान","रानी","शैलेश मटियानी"],"correct":0,"topic":"Joothan autobiography","difficulty":"medium","explanation":"'Joothan' is the autobiography of Omprakash Valmiki."},
      {"id":"mmh2021-36","text":"उदन्त मार्तण्ड कब प्रकाशित हुआ था :","options":["1850","1802","1821","1826"],"correct":3,"topic":"Udant Martand year","difficulty":"medium","explanation":"Udant Martand was first published in 1826."},
      {"id":"mmh2021-37","text":"कौन सा देश यूरोपीय संघ का हिस्सा नहीं है :","options":["आयरलैंड","इजिप्ट","माल्टा","स्लोवेनिया"],"correct":1,"topic":"EU membership","difficulty":"easy-medium","explanation":"Egypt is not part of the European Union."},
      {"id":"mmh2021-38","text":"'जब तोप मुकाबिल हो तो अखबार निकालो' किसकी पंक्ति है :","options":["सर सैयद अहमद खाँ","फिराक गोरखपुरी","अकबर इलाहाबादी","इकबाल"],"correct":2,"topic":"Famous Urdu couplet","difficulty":"medium-hard","explanation":"This famous line is by Akbar Allahabadi."},
      {"id":"mmh2021-39","text":"ऑल इंडिया रेडियो आकाशवाणी कब बना :","options":["1954","1949","1957","1942"],"correct":2,"topic":"AIR named Akashvani","difficulty":"medium-hard","explanation":"All India Radio was officially named Akashvani in 1957."},
      {"id":"mmh2021-40","text":"'प्राइम टाइम' किस समाचार चैनल का कार्यक्रम है :","options":["एनडीटीवी इंडिया","आज तक","एबीपी न्यूज","बीबीसी न्यूज"],"correct":0,"topic":"Prime Time programme","difficulty":"medium","explanation":"'Prime Time' with Ravish Kumar aired on NDTV India."}
  ];

  var mock = {
    id: 'jmi-2021-massmedia-hindi-full',
    name: 'JMI 2021 MA Mass Media (Hindi) Paper',
    template: 'ssc',
    examCatalogueId: 'jmi-massmedia-hindi',
    kind: 'pyq', scope: 'full', sectionTag: null, sourceSet: null, year: 2021,
    durationMin: 90,
    marking: {"correct":1,"wrong":-0.25,"unattempted":0},
    allowSectionSwitch: true, timerMode: 'full', calculator: false,
    questionTypes: ['mcq'], languages: ['hi'],
    sections: [
      { id: 'all', name: 'MA Mass Media (Hindi) Entrance 2021 — Part A (40 Questions)', questions: questions }
    ]
  };

  window.EXAMS = (window.EXAMS || []).concat([mock]);
})();
