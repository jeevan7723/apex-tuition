// =============================================================================
// SANGLI SHIKSHAN SANSTHA - FULL-PAGE BILINGUAL (ENGLISH & MARATHI) ENGINE
// Translates EVERY section, card, form, field, label, option, placeholder & text
// =============================================================================

const marathiDictionary = {
  "\"Accountancy balance sheets always gave me tension until Singhania Sir taught us the conceptual ledger method. Scored a perfect 100!\"": "\"सिंघानिया सरांनी लेजर पद्धत शिकवेपर्यंत बॅलन्स शीटची खूप भीती वाटायची. त्यांच्यामुळे अकाउंट्समध्ये १०० पैकी १०० गुण मिळाले!\"",
  "\"My son used to struggle with Class 11 Physics and Calculus derivations. Within 3 months of joining Sangli Shikshan Sanstha, his unit test marks jumped from 58% to 92%. The small batch size and daily doubt clinic are incredible.\"": "\"माझ्या मुलाला भौतिकशास्त्र आणि गणिताची भीती वाटायची. सांगली शिक्षण संस्थेत आल्यावर ३ महिन्यांत त्याचे गुण ५८% वरून ९२% झाले. लहान बॅच आणि दररोजच्या शंका समाधानाचा मोठा फायदा झाला.\"",
  "\"No big corporate coaching compares to the personal mentorship here. The teachers here know my exact weaknesses and pushed me to conquer them.\"": "\"येथील वैयक्तिक मार्गदर्शनाची तुलना कोणत्याही मोठ्या क्लासशी होऊ शकत नाही. शिक्षकांना माझ्या अडचणी माहिती होत्या व त्यांनी त्या सोडवल्या.\"",
  "\"The daily doubt session at Sangli Shikshan Sanstha made all the difference. Sir made sure I solved at least 25 standard question papers before the finals.\"": "\"सांगली शिक्षण संस्थेच्या दररोजच्या शंका समाधान सत्रामुळे माझा आत्मविश्वास वाढला. सरांनी परीक्षेपूर्वी किमान २५ प्रश्नपत्रिका सोडवून घेतल्या.\"",
  "\"The transparency in tuition fees and regular parent-teacher updates are commendable. They treat every child with genuine dedication instead of treating them like numbers.\"": "\"पारदर्शक फी रचना आणि पालकांना मिळणारे नियमित अपडेट्स प्रशंसनीय आहेत. येथे प्रत्येक विद्यार्थ्यावर वैयक्तिक लक्ष दिले जाते.\"",
  "& Proven Exam Readiness": "व खात्रीशीर परीक्षा तयारी",
  "(850+ Google Reviews)": "(८५०+ गुगल रिव्ह्यूज)",
  "(Individual attention)": "(वैयक्तिक लक्ष)",
  "(Optional)": "(ऐच्छिक)",
  "(Strict Capping)": "(निश्चित विद्यार्थी मर्यादा)",
  "(Strict Micro-Batch Limit)": "(मर्यादित मायक्रो-बॅच क्षमता)",
  "+ free study kit.": "+ मोफत स्टडी किट मिळते.",
  "+91 73858 03641 (24x7 Quick Response)": "+91 73858 03641 (२४x७ त्वरित प्रतिसाद)",
  "/ Stream": "/ शाखा",
  "/ academic year": "/ शैक्षणिक वर्ष",
  "/ mo": "/ महिना",
  "/ month": "/ महिना",
  "0% Interest EMI:": "०% व्याजदर EMI:",
  "1-on-1 Doubt Resolution": "वैयक्तिक शंका समाधान",
  "1-on-1 personalized mentorship & project presentation coaching": "वैयक्तिक मार्गदर्शन व प्रकल्प सादरीकरण प्रशिक्षण",
  "1. Student Details": "१. विद्यार्थ्यांची माहिती",
  "10+ Yrs Exp": "१०+ वर्षे अनुभव",
  "10-digit mobile number": "१० अंकी मोबाइल नंबर",
  "100% Free 2-Day Trial Session before fee commitment": "फी भरण्यापूर्वी २ दिवसांचे १००% मोफत ट्रायल सेशन",
  "100% Free Consultation • Zero Obligation • Strictly Confidential": "१००% मोफत मार्गदर्शन • कोणतेही बंधन नाही • पूर्णपणे गोपनीय",
  "12 Full-length pre-board commerce mock simulations with step-by-step audit": "तपशीलवार तपासणीसह १२ संपूर्ण सराव परीक्षा",
  "12+ Yrs Exp": "१२+ वर्षे अनुभव",
  "14+ Yrs Exp": "१४+ वर्षे अनुभव",
  "14+ years proven track record": "१४+ वर्षांचा अध्यापनाचा अनुभव",
  "15 Students Strictly": "फक्त १५ विद्यार्थी",
  "15 full-length Board Mock Simulation Series evaluated strictly by senior examiners": "ज्येष्ठ परीक्षकांद्वारे तपासल्या जाणाऱ्या १५ संपूर्ण बोर्ड सराव परीक्षा",
  "15 real-exam timed papers with identical marking schemes and personalized feedback on step-marking and presentation.": "बोर्डाच्या धर्तीवर १५ संपूर्ण सराव परीक्षा, ज्यामध्ये उत्तरपत्रिका सादरीकरणावर वैयक्तिक मार्गदर्शन केले जाते.",
  "15–18 Students Max": "कमाल १५ ते १८ विद्यार्थी",
  "16+ Yrs Exp": "१६+ वर्षे अनुभव",
  "2,500+ High-yield bio assertion-reason and diagram question bank booklets": "२,५००+ आकृत्या व बहुपर्यायी प्रश्नांची विशेष हस्तपुस्तिका",
  "2. Academic Level & Program": "२. शैक्षणिक स्तर व अभ्यासक्रम",
  "20 Students Only": "फक्त २० विद्यार्थी",
  "20% discount": "२०% सवलत",
  "3-month cycle with an automatic": "३ महिन्यांचा हप्ता, ज्यामध्ये आपोआप",
  "3. Parent / Guardian Contact Details": "३. पालक संपर्क तपशील",
  "30 Mins (1-on-1)": "३० मिनिटे (वैयक्तिक)",
  "3–5 Minutes": "३-५ मिनिटे",
  "4.9 / 5 Rating": "४.९ / ५ रेटिंग",
  "45 Mins (Free)": "४५ मिनिटे (मोफत)",
  "4:30 PM – 7:30 PM (Mon to Sat)": "सायं. ४:३० ते ७:३० (सोम ते शनि)",
  "6:30 AM – 8:30 AM (Mon to Sat)": "सकाळी ६:३० ते ८:३० (सोम ते शनि)",
  "8% fee discount": "८% फी सवलत मिळते",
  "8:00 AM – 8:30 PM": "सकाळी ८:०० ते सायं. ८:३०",
  "8:00 AM – 8:30 PM (Daily)": "सकाळी ८:०० ते सायं. ८:३० (दररोज)",
  "98.4% Overall": "एकूण ९८.४%",
  "98.6% Overall": "एकूण ९८.६%",
  "99.2% Overall": "एकूण ९९.२%",
  "9:00 AM – 2:00 PM (Counseling & Mock Tests)": "सकाळी ९:०० ते दुपारी २:०० (समुपदेशन व सराव परीक्षा)",
  "A clear, structured, and student-first roadmap guiding you from initial registration to your very first day in the classroom. Click on any step below to explore what to expect.": "प्रारंभिक नोंदणीपासून प्रत्यक्ष क्लासरूममधील पहिल्या दिवसापर्यंतची स्पष्ट व विद्यार्थी-केंद्रित रचना. अधिक जाणून घेण्यासाठी खालील टप्प्यांवर क्लिक करा.",
  "AC tech-enabled classrooms with digital smart boards. Missed a lecture due to illness? Watch high-definition lecture recordings from home.": "डिजिटल स्मार्ट बोर्डसह वातानुकूलित वर्ग. आजारपणामुळे तासिका चुकल्यास घरी बसून ॲपवर HD रेकॉर्डेड लेक्चर्स पाहण्याची सोय.",
  "ACTIVE STEP": "सध्याचा टप्पा",
  "APPLICATION SUBMITTED": "अर्ज यशस्वीरीत्या सादर केला",
  "About": "संस्थेबद्दल",
  "About Sangli Shikshan Sanstha": "सांगली शिक्षण संस्थेबद्दल",
  "Academic Mentors": "तज्ज्ञ शिक्षकवृंद",
  "Academic Session 2026-27": "शैक्षणिक वर्ष २०२६-२७",
  "Academic Session 2026-27:": "शैक्षणिक वर्ष २०२६-२७:",
  "Accountancy": "अकाउंटन्सी",
  "Accountancy, Macroeconomics, Business Studies & Applied Mathematics": "अकाउंटन्सी, समग्र अर्थशास्त्र, व्यवसाय अभ्यास व उपयोजित गणित",
  "Accountancy, Microeconomics, Statistics & Business Studies blueprints": "अकाउंटन्सी, सूक्ष्म अर्थशास्त्र, सांख्यिकी व व्यवसाय अभ्यास मार्गदर्शक",
  "Accounts: 100/100": "अकाउंट्स: १००/१००",
  "Achieving top ranks and distinctions across CBSE & ICSE boards.": "विविध शिक्षण मंडळांमध्ये गुणवत्ता यादीत अव्वल स्थान मिळवणारे विद्यार्थी.",
  "Admission FAQs": "प्रवेश विषयक प्रश्नोत्तरे",
  "Admission Helpline & WhatsApp": "प्रवेश हेल्पलाईन व व्हॉट्सॲप",
  "Admission Office": "प्रवेश कार्यालय",
  "Admission Portal 2026-27": "प्रवेश पोर्टल २०२६-२७",
  "Admission Process Steps": "प्रवेश प्रक्रियेचे टप्पे",
  "Admission Process: 4-Step Interactive Pathway": "प्रवेश प्रक्रिया: ४ सोप्या टप्प्यांचा मार्ग",
  "Admission Prospectus PDF downloaded successfully!": "माहितीपुस्तिका PDF यशस्वीरीत्या डाउनलोड झाली!",
  "Admission Steps": "प्रवेश प्रक्रिया",
  "Admissions Open 2026-27: Classes 11th & 12th (Science, Commerce & JEE/NEET Wings)": "प्रवेश सुरू २०२६-२७: इयत्ता ११ वी व १२ वी (विज्ञान, वाणिज्य व JEE/NEET विभाग)",
  "Admissions Open for Classes 11th & 12th (Science & Commerce). Transparent Uniform Tuition Fees. Only 15 students per batch!": "इयत्ता ११ वी व १२ वी (विज्ञान व वाणिज्य) प्रवेश सुरू. पारदर्शक व एकसमान फी. प्रत्येक बॅचमध्ये फक्त १५ विद्यार्थी!",
  "Advanced Mechanics, Electromagnetism, Vectors/Calculus, Organic & Physical Chem": "प्रगत मेकॅनिक्स, विद्युतचुंबकत्व, वेक्टर्स/कॅल्क्युलस, सेंद्रिय व भौतिक रसायनशास्त्र",
  "All 11th & 12th Programs": "सर्व ११ वी व १२ वी अभ्यासक्रम",
  "All Subjects Combo Trial": "सर्व विषयांचे संयुक्त सत्र",
  "All enrolled students pay the exact same transparent tuition fees for high-touch faculty mentoring, regardless of past marks.": "सर्व प्रवेशित विद्यार्थ्यांना मागील गुणांचा विचार न करता एकाच पारदर्शक व समान दरात उत्कृष्ट अध्यापन दिले जाते.",
  "Already submitted an admission form? Enter your": "आधीच प्रवेश अर्ज भरला आहे का? पडताळणी स्थिती आणि सीट निश्चिती जाणून घेण्यासाठी तुमचा",
  "Annual Board Commerce Plan (20% OFF)": "वार्षिक वाणिज्य बोर्ड योजना (२०% सवलत)",
  "Annual Board Master Plan (20% OFF)": "वार्षिक बोर्ड मास्टर योजना (२०% सवलत)",
  "Annual Class 11 Plan (20% OFF)": "वार्षिक ११ वी योजना (२०% सवलत)",
  "Annual Commerce Plan (20% OFF)": "वार्षिक वाणिज्य योजना (२०% सवलत)",
  "Annual Comprehensive Package:": "वार्षिक संपूर्ण पॅकेज:",
  "Annual Integrated JEE Plan (20% OFF)": "वार्षिक एकात्मिक JEE योजना (२०% सवलत)",
  "Annual JEE Masterclass Plan (20% OFF)": "वार्षिक JEE मास्टरक्लास योजना (२०% सवलत)",
  "Annual Lump-sum (Save 15%)": "वार्षिक एकरकमी (१५% सवलत)",
  "Annual NEET Super-20 Plan (20% OFF)": "वार्षिक NEET सुपर-२० योजना (२०% सवलत)",
  "Any specific focus needed (Calculus, Physics, Commerce Accounts, etc.)": "गणित, भौतिकशास्त्र, किंवा वाणिज्य विषयांमध्ये काही विशेष मदत हवी असल्यास नमूद करा",
  "Application ID": "अर्ज क्रमांक (Application ID)",
  "Application Receipt & Tracking ID": "प्रवेश पावती व ट्रॅकिंग आयडी",
  "Application Reference ID:": "अर्ज संदर्भ क्रमांक (Application ID):",
  "Application Under Verification": "अर्ज पडताळणी सुरू आहे",
  "Application Verified • Seat Confirmed": "अर्ज पडताळणी पूर्ण • जागा निश्चित",
  "Applied On:": "अर्ज केल्याची तारीख:",
  "Apply For This Course": "या कोर्सेससाठी अर्ज करा",
  "Apply Now": "त्वरित अर्ज करा",
  "Apply Online": "ऑनलाइन अर्ज",
  "Apply Online →": "ऑनलाइन अर्ज करा →",
  "Are study materials, formula sheets, and question banks provided?": "अभ्यास साहित्य, सूत्र पत्रिका आणि प्रश्नसंच दिले जातात का?",
  "Attend live classroom lectures, meet the teachers, review our study material, and take a diagnostic test—completely free with zero obligation.": "प्रत्यक्ष वर्गातील लेक्चर्स, शिक्षकांशी भेट, अभ्यास साहित्याची पाहणी आणि पूर्वचाचणी—सर्व काही १००% मोफत आणि कोणतेही बंधन नाही.",
  "Available 8:00 AM – 8:30 PM (Mon to Sat)": "सकाळी ८:०० ते सायं. ८:३० (सोम ते शनि उपलब्ध)",
  "Available Monday to Saturday 8:00 AM – 8:30 PM.": "सोमवार ते शनिवार सकाळी ८:०० ते सायं. ८:३० उपलब्ध.",
  "Average Score Improvement": "सरासरी गुणांमधील वाढ",
  "Batch Timings:": "बॅचच्या वेळा:",
  "Batch: Board Booster 12": "बॅच: बोर्ड बूस्टर १२",
  "Batch: Evening Super-15": "बॅच: संध्याकाळ सुपर-१५",
  "Batch: Morning Excellence-15": "बॅच: सकाळ एक्सलन्स-१५",
  "Batch: Morning Super-15": "बॅच: सकाळ सुपर-१५",
  "Batch: Super-12 JEE Focus": "बॅच: सुपर-१२ JEE फोकस",
  "Batch: Super-20 NEET Elite": "बॅच: सुपर-२० NEET एलिट",
  "Begin Academic Excellence": "शैक्षणिक उत्कृष्टतेची सुरुवात करा",
  "Begin your admission journey in just 3 minutes. Parents or prospective students complete the online inquiry form below by providing basic academic background, current school, target examination board, and preferred shift timings.": "अवघ्या ३ मिनिटांत तुमची प्रवेश प्रक्रिया सुरू करा. पालक किंवा विद्यार्थ्यांनी खालील फॉर्ममध्ये शैक्षणिक माहिती, शाळा, बोर्ड आणि सोयीची बॅच वेळ भरावी.",
  "Best value • Comprehensive test series included": "उत्कृष्ट पर्याय • टेस्ट सिरीज मोफत समाविष्ट",
  "Bi-Weekly Unit Cumulative Tests:": "पंधरवड्याला युनिट चाचणी:",
  "Billing Cycle / Payment Frequency:": "फी भरण्याचा कालावधी:",
  "Biology": "जीवशास्त्र",
  "Board & Entrance Pass Rate": "बोर्ड व प्रवेश परीक्षा निकाल",
  "Board 95%+ Target": "बोर्ड ९५%+ लक्ष्य",
  "Board Examination Pass Rate": "बोर्ड परीक्षा उत्तीर्ण निकाल",
  "Book Free Demo": "मोफत डेमो क्लास",
  "Book Free Demo Class": "मोफत २ दिवसांचा डेमो क्लास",
  "Book Free Diagnostic Test": "मोफत मूल्यांकन चाचणी बुक करा",
  "Book Your Free 2-Day Trial": "२ दिवसांचे विनामूल्य ट्रायल सेशन बुक करा",
  "Book a Free 2-Day Trial Demo Class": "२ दिवसांचा मोफत ट्रायल डेमो क्लास आरक्षित करा",
  "Booked for Upcoming Saturday 5:00 PM": "येत्या शनिवारी सायं. ५:०० वाजता निश्चित",
  "Botany, Zoology, Medical Physics & Physical/Organic Chemistry + High-Yield Test Series": "वनस्पतीशास्त्र, प्राणिशास्त्र, वैद्यकीय भौतिकशास्त्र व रसायनशास्त्र + विशेष टेस्ट सिरीज",
  "Bridge the transition from 10th to 11th with rigorous concept building in calculus, kinematics, chemical bonding & bio mechanisms.": "१० वी नंतर ११ वीच्या कठीण विषयांमध्ये मूलभूत संकल्पना, कॅल्क्युलस, भौतिकशास्त्र व रसायनशास्त्राची पक्की तयारी.",
  "CBSE Board": "CBSE बोर्ड",
  "CBSE Class 12 (Science PCM) + JEE 99.4 %ile": "CBSE १२ वी (विज्ञान PCM) + JEE ९९.४ पर्सेंटाईल",
  "CBSE Class 12 Board Exam (98.6% - PCM School Topper)": "CBSE इयत्ता १२ वी बोर्ड परीक्षा (९८.६% - PCM स्कूल टॉपर)",
  "Calculate your exact tuition cost and explore billing options. We maintain a strict transparent and equal fee structure for all students with zero hidden charges.": "तुमचा अचूक ट्युशन खर्च आणि पेमेंट पर्याय तपासा. आम्ही कोणत्याही लपविलेल्या शुल्काशिवाय पारदर्शक आणि सर्वांसाठी समान फी रचना पाळतो.",
  "Call Desk": "कॉल करा",
  "Campus Address": "केंद्राचा पत्ता",
  "Can my child attend a trial demo class before paying any fees?": "फी भरण्यापूर्वी माझा पाल्य मोफत डेमो क्लास करू शकतो का?",
  "Can prospective students attend free trial or demo classes before enrolling?": "प्रवेश घेण्यापूर्वी विद्यार्थी मोफत डेमो किंवा ट्रायल क्लास करू शकतात का?",
  "Can students reshuffle or switch between morning and evening shifts if school timings change?": "शाळेच्या वेळेनुसार विद्यार्थी सकाळ किंवा संध्याकाळ बॅचमध्ये बदल करू शकतात का?",
  "Center Hours:": "केंद्राच्या वेळा:",
  "Chartered Accountant (CA Finalist), M.Com": "चार्टर्ड अकाउंटंट (CA फायनलिस्ट), एम.कॉम.",
  "Chat with admission desk on WhatsApp": "प्रवेश कक्षाशी व्हॉट्सॲपवर चॅट करा",
  "Check Batch Availability & Fees": "बॅच उपलब्धता आणि फी तपासा",
  "Check Schedule & Reserve Seat": "बॅच वेळापत्रक तपासा आणि जागा आरक्षित करा",
  "Check Status": "स्थिती तपासा",
  "Chemistry": "रसायनशास्त्र",
  "Chemistry: 98/100": "रसायनशास्त्र: ९८/१००",
  "Choice of Math, Physics, or Accounts": "गणित, भौतिकशास्त्र किंवा अकाउंट्स",
  "Choose Grade (11th or 12th)": "इयत्ता निवडा (११ वी किंवा १२ वी)",
  "Claim This Fee & Proceed to Admission": "ही फी निवडा आणि प्रवेशासाठी पुढे जा",
  "Class 11 & 12": "इयत्ता ११ वी व १२ वी",
  "Class 11 Commerce Excellence & Applied Math": "इयत्ता ११ वी वाणिज्य प्रावीण्य व उपयोजित गणित",
  "Class 11 Science Foundation (PCM / PCB)": "इयत्ता ११ वी विज्ञान पायाभरणी (PCM / PCB)",
  "Class 11 Wing": "इयत्ता ११ वी विभाग",
  "Class 11-12 Higher Maths & JEE": "इयत्ता ११-१२ प्रगत गणित व JEE",
  "Class 11th (CBSE / ISC / State Board)": "इयत्ता ११ वी (CBSE / ISC / राज्य मंडळ)",
  "Class 11th - Commerce (Accounts, Economics, Math)": "इयत्ता ११ वी - वाणिज्य (अकाउंट्स, अर्थशास्त्र, गणित)",
  "Class 11th - Commerce Stream": "इयत्ता ११ वी - वाणिज्य विभाग",
  "Class 11th - Science (PCM / PCB + JEE/NEET Base)": "इयत्ता ११ वी - विज्ञान (PCM / PCB + JEE/NEET बेस)",
  "Class 11th - Science (PCM / PCB + JEE/NEET)": "इयत्ता ११ वी - विज्ञान (PCM / PCB + JEE/NEET)",
  "Class 11th - Science (PCM / PCB)": "इयत्ता ११ वी - विज्ञान (PCM / PCB)",
  "Class 11th Commerce": "इयत्ता ११ वी वाणिज्य",
  "Class 11th Commerce & Applied Math Syllabus Guide": "इयत्ता ११ वी वाणिज्य व उपयोजित गणित अभ्यासक्रम मार्गदर्शक",
  "Class 11th Commerce & Economics": "इयत्ता ११ वी वाणिज्य व अर्थशास्त्र",
  "Class 11th Science (PCM / PCB) Syllabus Guide": "इयत्ता ११ वी विज्ञान (PCM / PCB) अभ्यासक्रम मार्गदर्शक",
  "Class 11th Science (PCM/PCB)": "इयत्ता ११ वी विज्ञान (PCM/PCB)",
  "Class 11th Wing": "इयत्ता ११ वी विभाग",
  "Class 12 Commerce Mastery & CA Foundation": "इयत्ता १२ वी वाणिज्य प्रावीण्य व CA फाउंडेशन",
  "Class 12 Science Board Booster & CUET Prep": "इयत्ता १२ वी विज्ञान बोर्ड बूस्टर व CUET तयारी",
  "Class 12 Wing": "इयत्ता १२ वी विभाग",
  "Class 12th (Board & CA Foundation)": "इयत्ता १२ वी (बोर्ड व CA फाउंडेशन)",
  "Class 12th - Commerce & CA Foundation": "इयत्ता १२ वी - वाणिज्य व CA फाउंडेशन",
  "Class 12th - Commerce (Accounts, BST, Economics)": "इयत्ता १२ वी - वाणिज्य (अकाउंट्स, BST, अर्थशास्त्र)",
  "Class 12th - Commerce (Board Target 98%+ & CA Track)": "इयत्ता १२ वी - वाणिज्य (बोर्ड टार्गेट ९८%+ व CA फाउंडेशन)",
  "Class 12th - Science (Board Booster + CUET)": "इयत्ता १२ वी - विज्ञान (बोर्ड बूस्टर + CUET)",
  "Class 12th - Science (Board Target 95%+ & CUET)": "इयत्ता १२ वी - विज्ञान (बोर्ड टार्गेट ९५%+ व CUET)",
  "Class 12th Board Candidates (CBSE / ISC / State)": "इयत्ता १२ वी बोर्ड विद्यार्थी (CBSE / ISC / राज्य मंडळ)",
  "Class 12th Commerce": "इयत्ता १२ वी वाणिज्य",
  "Class 12th Commerce & CA Track": "इयत्ता १२ वी वाणिज्य व CA फाउंडेशन",
  "Class 12th Commerce Board Mastery & CA Foundation Track": "इयत्ता १२ वी वाणिज्य बोर्ड प्रावीण्य व CA फाउंडेशन विभाग",
  "Class 12th Science (Board Booster)": "इयत्ता १२ वी विज्ञान (बोर्ड बूस्टर)",
  "Class 12th Science (Boards + Competitions)": "इयत्ता १२ वी विज्ञान (बोर्ड + स्पर्धा परीक्षा)",
  "Class 12th Science Board Booster": "इयत्ता १२ वी विज्ञान बोर्ड बूस्टर",
  "Class 12th Science Board Booster Syllabus & 15-Mock Calendar": "इयत्ता १२ वी विज्ञान बोर्ड बूस्टर अभ्यासक्रम व १५ सराव परीक्षा वेळापत्रक",
  "Class 12th Wing": "इयत्ता १२ वी विभाग",
  "Classes 11th & 12th (Engineering Aspirants)": "इयत्ता ११ वी व १२ वी (अभियांत्रिकी प्रवेश इच्छुक)",
  "Classes 11th & 12th (Medical Aspirants)": "इयत्ता ११ वी व १२ वी (वैद्यकीय प्रवेश इच्छुक)",
  "Classes 11th & 12th Academic Programs": "इयत्ता ११ वी व १२ वी शैक्षणिक अभ्यासक्रम",
  "Clear All": "सर्व साफ करा",
  "Close": "बंद करा",
  "Close Fee Sheet": "फी तक्ता बंद करा",
  "Close Window": "खिडकी बंद करा",
  "Col. Arvind Rao (Retd.)": "कर्नल अरविंद राव (निवृत्त)",
  "Company accounts, macroeconomics, case study guide & entrance blueprint": "कंपनी अकाउंट्स, समग्र अर्थशास्त्र, केस स्टडी आणि प्रवेश परीक्षा मार्गदर्शक",
  "Company balance sheets, cash flow statements, macro models, Indian economic growth, and board case studies.": "कंपनी ताळेबंद, रोख प्रवाह विवरणपत्रे, समग्र अर्थशास्त्र आणि बोर्ड परीक्षेसाठी केस स्टडी सराव.",
  "Company balance sheets, cash flow statements, macro models, Indian economic growth, and fast-track MCQ speed drills for CA Foundation exams.": "कंपनी ताळेबंद, रोख प्रवाह पत्रके, समग्र अर्थशास्त्र आणि CA फाउंडेशन परीक्षेसाठी जलद MCQ सराव.",
  "Competitive (JEE / NEET / Olympiad)": "स्पर्धा परीक्षा (JEE / NEET / ऑलिम्पियाड)",
  "Competitive (JEE / NEET Track)": "स्पर्धा परीक्षा (JEE / NEET विभाग)",
  "Competitive / Entrance Track": "स्पर्धा परीक्षा / प्रवेश परीक्षा विभाग",
  "Competitive Entrance Track (JEE / NEET)": "स्पर्धा परीक्षा विभाग (JEE / NEET)",
  "Competitive Track (Integrated JEE / NEET)": "स्पर्धा परीक्षा विभाग (JEE / NEET)",
  "Competitive Track (JEE / NEET 11th & 12th)": "स्पर्धा परीक्षा विभाग (JEE / NEET ११ वी व १२ वी)",
  "Complete 95%+ target curriculum, practical blueprint, and pre-board series": "९५%+ लक्ष्य अभ्यासक्रम, प्रात्यक्षिक तयारी आणि प्री-बोर्ड सराव मालिका",
  "Complete NCERT Botany, Zoology, NEET Physics & Chemistry Shortcuts": "संपूर्ण वनस्पतीशास्त्र, प्राणिशास्त्र, NEET भौतिक व रसायनशास्त्र शॉर्टकट्स",
  "Complete board syllabus coverage by October, 15 pre-board mock simulation series, NCERT line-by-line review, and practical prep.": "ऑक्टोबरपर्यंत संपूर्ण अभ्यासक्रम पूर्ण, १५ प्री-बोर्ड सराव परीक्षा, NCERT सविस्तर वाचन आणि प्रात्यक्षिक तयारी.",
  "Complete board syllabus coverage by October, 15 pre-board mock simulation series, and intense derivation clinics for guaranteed high centum scores.": "ऑक्टोबरपर्यंत संपूर्ण अभ्यासक्रम पूर्ण, १५ सराव परीक्षा आणि हमखास उत्कृष्ट गुणांसाठी डेरिवेशन वर्ग.",
  "Complete paperwork, collect study kits, and join orientation.": "कागदपत्रे पूर्ण करा, स्टडी किट मिळवा आणि ओरिएंटेशन सत्रात सहभागी व्हा.",
  "Complete step-by-step theory derivation booklets & formula cheat sheets": "सविस्तर थिअरी डेरिवेशन पुस्तके आणि सूत्र हस्तपुस्तिका",
  "Comprehensive archive of past 15-year JEE Main & Advanced questions with video solutions": "मागील १५ वर्षांच्या JEE मेन व ॲडव्हान्स्ड प्रश्नांचे सविस्तर विश्लेषण",
  "Comprehensive printed study modules & 15,000+ multi-level question banks": "सविस्तर मुद्रित अभ्यास साहित्य आणि १५,०००+ बहुस्तरीय प्रश्नसंच",
  "Comprehensive printed study modules with step-by-step journal entry guides": "सविस्तर मुद्रित अभ्यास साहित्य व रोजनिशी नोंदी मार्गदर्शक",
  "Concept Mastery": "सखोल संकल्पनांसह",
  "Configure Tuition Preferences": "ट्युशन प्राधान्ये निवडा",
  "Confirm Free Trial Pass": "मोफत ट्रायल पास निश्चित करा",
  "Confirm seat, collect study kit booklets, and join orientation.": "जागा निश्चित करा, स्टडी किट मिळवा आणि ओरिएंटेशनला या.",
  "Consistent track record year after year. Here are some of our proud scholars from the 2024-25 board exams.": "दरवर्षी सातत्यपूर्ण निकाल. २०२४-२५ च्या बोर्ड परीक्षेतील आमचे काही अभिमानास्पद गुणवंत विद्यार्थी.",
  "Contact": "संपर्क",
  "Contact & Campus Location": "पत्ता व संपर्क केंद्र",
  "Copy ID": "आयडी कॉपी करा",
  "Course Fee Breakdown": "कोर्स फी सविस्तर तक्ता",
  "Cross-chapter tests evaluating long-term retention.": "संकल्पनांची दीर्घकालीन तयारी तपासण्यासाठी एकत्रित घटक परीक्षा.",
  "Current Grade / Class": "चालू इयत्ता / वर्ग",
  "Current School / Institution": "शाळा / कनिष्ठ महाविद्यालयाचे नाव",
  "Curriculum:": "विषय रचना:",
  "Daily 1-on-1 doubt clearing clinic (4:30 PM – 6:30 PM)": "दररोज वैयक्तिक शंका निवारण वर्ग (सायं. ४:३० ते ६:३०)",
  "Daily 1-on-1 doubt clinics & board presentation technique guidance": "दररोज स्वतंत्र शंका समाधान व बोर्ड सादरीकरण तंत्र मार्गदर्शन",
  "Daily 1-on-1 doubt clinics & examiner answer-presentation masterclasses": "दररोज स्वतंत्र शंका समाधान व उत्तरपत्रिका सादरीकरण कार्यशाळा",
  "Daily 1-on-1 doubt clinics & medical faculty guidance": "दररोज वैयक्तिक शंका समाधान आणि तज्ज्ञ वैद्यकीय प्राध्यापकांचे मार्गदर्शन",
  "Daily 1-on-1 doubt clinics & numerical problem-solving sessions (4:30 - 6:30 PM)": "दररोज स्वतंत्र शंका समाधान व उदाहरणे सोडवण्याचे वर्ग (सायं. ४:३० ते ६:३०)",
  "Daily 1-on-1 doubt clinics mentored directly by IIT/NIT alumni faculty": "IIT/NIT माजी शिक्षक मार्गदर्शकांद्वारे दररोज वैयक्तिक शंका समाधान",
  "Daily Dedicated Doubt Counter": "दररोज स्वतंत्र शंका समाधान कक्ष",
  "Daily dedicated mentor desk": "दररोज स्वतंत्र शिक्षक मार्गदर्शन कक्ष",
  "Daily personal guidance for physics numerical speed & negative-mark reduction": "भौतिकशास्त्रातील गती वाढवण्यासाठी व चुका टाळण्यासाठी दररोज वैयक्तिक मार्गदर्शन",
  "Date of Birth": "जन्मतारीख",
  "Day 1 Orientation": "पहिल्या दिवशी ओरिएंटेशन",
  "Dedicated daily mentor desk for multi-concept numerical resolution (3:30 - 8:00 PM)": "कठीण उदाहरणे सोडवण्यासाठी दररोज स्वतंत्र शिक्षक मार्गदर्शन (दुपारी ३:३० ते ८:००)",
  "Deep conceptual mastery in double-entry bookkeeping, microeconomics, statistical methods, and business case study analysis.": "द्विनोंद पद्धती, सूक्ष्म अर्थशास्त्र, सांख्यिकी पद्धती आणि व्यावसायिक केस स्टडीचे सखोल मार्गदर्शन.",
  "Deep conceptual mastery in double-entry bookkeeping, microeconomics, statistical tools, and commercial mathematics for aspiring CAs and financial leaders.": "द्विनोंद पद्धती, सूक्ष्म अर्थशास्त्र, सांख्यिकी आणि भावी सनदी लेखापाल (CA) व व्यवस्थापकांसाठी व्यावसायिक गणिताची सखोल तयारी.",
  "Deep multi-concept calculus, rotation, organic mechanism mastery, speed arithmetic, and computer-based all-India test simulation rank prediction.": "मल्टी-कन्सेप्ट कॅल्क्युलस, रोटेशनल मेकॅनिक्स, सेंद्रिय रासायनिक प्रक्रिया आणि अखिल भारतीय संगणकीकृत सराव परीक्षा.",
  "Detailed graphical diagnostic report shared with parents during counseling": "समुपदेशनादरम्यान पालकांसोबत सविस्तर प्रगती आलेख शेअर केला जातो",
  "Diagnostic Assessment": "मूल्यांकन चाचणी",
  "Digital Smart Classrooms & Recorded Lectures": "डिजिटल स्मार्ट क्लासरूम व रेकॉर्डेड लेक्चर्स",
  "Direct Admission Helpline": "थेट प्रवेश हेल्पलाईन",
  "Direct Center Admissions": "थेट केंद्र प्रवेश",
  "Done & Close": "पूर्ण झाले व बंद करा",
  "Download Fee Sheet": "फी पत्रक डाउनलोड करा",
  "Download Fee Slip": "फी पावती डाउनलोड करा",
  "Download Full Syllabus & Fee Guide (PDF)": "संपूर्ण अभ्यासक्रम व फी मार्गदर्शक डाउनलोड करा (PDF)",
  "Download Prospectus": "माहितीपुस्तिका डाउनलोड करा",
  "Download Prospectus & Fee Structure PDF...": "माहितीपुस्तिका व फी रचना PDF डाउनलोड करत आहे...",
  "Download Syllabus": "अभ्यासक्रम डाउनलोड करा",
  "Download Syllabus & Complete Fee Guide": "अभ्यासक्रम व फी मार्गदर्शक डाउनलोड करा",
  "Download Syllabus / Fee Guide": "अभ्यासक्रम व फी मार्गदर्शक डाउनलोड",
  "Dr. Ananya Mukherjee": "डॉ. अनन्या मुखर्जी",
  "END-TO-END ROADMAP": "प्रवेश प्रक्रियेचा मार्ग",
  "Economics": "अर्थशास्त्र",
  "Economics: 98/100": "अर्थशास्त्र: ९८/१००",
  "Educational Board": "शिक्षण मंडळ (Board)",
  "Email Inquiries": "ईमेल संपर्क",
  "Email:": "ईमेल:",
  "Empowering students across CBSE, ICSE & State Boards with deep conceptual clarity, rigorous practice, and compassionate mentorship. We bridge learning gaps and build confident achievers for board exams, JEE & NEET.": "CBSE, ICSE आणि राज्य मंडळाच्या विद्यार्थ्यांना सखोल संकल्पना, नियमित सराव आणि तज्ज्ञ मार्गदर्शनाद्वारे सक्षम बनवणे. बोर्ड परीक्षा, JEE आणि NEET मध्ये यशाची खात्रीशीर परंपरा.",
  "End-to-End 4-Step Pathway": "४ सोप्या टप्प्यांत प्रवेश प्रक्रिया",
  "End-to-End Roadmap": "प्रवेश प्रक्रियेचा मार्ग",
  "Enroll Now": "आत्ताच प्रवेश घ्या",
  "Enter Application ID (e.g. Aarav-8403), Student Name or Mobile Number": "अर्ज क्रमांक (उदा. Aarav-8403 किंवा SSS-2026-1024), नाव किंवा मोबाइल नंबर टाका",
  "Enter a valid 10-digit mobile number": "कृपया वैध १० अंकी मोबाइल नंबर टाका",
  "Enter percentage between 35 and 100": "३५ ते १०० दरम्यान टक्केवारी टाका",
  "Equal & Uniform Fee Policy": "एकसमान व पारदर्शक फी धोरण",
  "Equivalent to just": "म्हणजेच दरमहा फक्त",
  "Estimated Tuition Fee": "अंदाजे ट्युशन फी",
  "Evening Shift (4:30 PM â 7:30 PM)": "à¤¸à¤à¤§à¥à¤¯à¤¾à¤à¤¾à¤³à¤à¥ à¤¸à¤¤à¥à¤° (à¤¸à¤¾à¤¯à¤. à¥ª:à¥©à¥¦ à¤¤à¥ à¥­:à¥©à¥¦)",
  "Evening Shift (4:30 PM – 7:30 PM)": "संध्याकाळचे सत्र (सायं. ४:३० ते ७:३०)",
  "Evening Shift:": "संध्याकाळचे सत्र:",
  "Every evening from 5:00 PM to 6:30 PM, faculty members are available for 1-on-1 doubt solving. No student leaves with an unresolved doubt.": "दररोज संध्याकाळी ५:०० ते ६:३० या वेळेत शिक्षक वैयक्तिक शंका समाधानासाठी उपलब्ध असतात. शंकेचे निरसन झाल्याशिवाय कोणताही विद्यार्थी जात नाही.",
  "Every single evening from 4:30 PM to 6:30 PM, senior faculty members sit at dedicated 1-on-1 doubt desks. Students can walk in with school homework, test corrections, or unresolved textbook numericals. No student is ever rushed or turned away.": "दररोज संध्याकाळी ४:३० ते ६:३० या वेळेत वरिष्ठ शिक्षक शंका समाधान कक्षात बसतात. विद्यार्थी शाळेचा गृहपाठ किंवा पुस्तकातील अडचणी वैयक्तिकरीत्या सोडवून घेऊ शकतात.",
  "Every student is heard. Teachers monitor each child's notebook, comprehension speed, and problem areas during every single class.": "प्रत्येक विद्यार्थ्यावर लक्ष दिले जाते. शिक्षक प्रत्येक तासाला विद्यार्थ्याची वही, आकलनाची गती आणि अडचणी तपासतात.",
  "Everything you need to know about the admission procedure, fee payment, batch adjustments, and classroom policies.": "प्रवेश प्रक्रिया, फी भरणे, बॅचच्या वेळा आणि नियम याविषयी संपूर्ण माहिती.",
  "Experience our teaching quality firsthand before paying any tuition fees.": "कोणतीही फी भरण्यापूर्वी प्रत्यक्ष शिक्षणाचा दर्जा व अध्यापन पद्धती अनुभवा.",
  "Experience the Sanstha Difference with a Free 2-Day Trial": "२ दिवसांच्या मोफत ट्रायलसह संस्थेच्या अध्यापनाचा प्रत्यक्ष अनुभव घ्या",
  "Experienced Faculty": "अनुभवी शिक्षकवृंद",
  "Expert Guidance": "तज्ज्ञ मार्गदर्शन",
  "FAQs": "प्रश्नोत्तरे",
  "FREE": "मोफत",
  "Faculty": "शिक्षकवृंद",
  "Fast 15-Min Response": "१५ मिनिटांत त्वरित प्रतिसाद",
  "Fast-Track Admission 2026-27": "जलद प्रवेश नोंदणी २०२६-२७",
  "Fee Calculator": "फी कॅल्क्युलेटर",
  "Fee Policy:": "फी नियम:",
  "Fill out basic academic interest form with student & parent details.": "विद्यार्थी व पालकांच्या माहितीसह प्राथमिक नोंदणी फॉर्म भरा.",
  "Fill student details, target grade, board, and questions.": "विद्यार्थ्यांची माहिती, इयत्ता, बोर्ड आणि अडचणी भरा.",
  "Finalize your enrollment with transparent fee installment choices. The student receives their welcome study kit containing printed theory modules, formula cheat-sheets, student portal app credentials, and attends the Day 1 batch orientation.": "सुलभ हप्त्यांच्या पर्यायांसह प्रवेश निश्चित करा. विद्यार्थ्यांना मुद्रित थिअरी पुस्तके, सूत्र हस्तपुस्तिका आणि विद्यार्थी पोर्टल ॲप पासवर्ड असलेले स्टडी किट दिले जाते.",
  "Financial Accountancy, Microeconomics, Statistics & Business Studies": "फायनान्शियल अकाउंटन्सी, सूक्ष्म अर्थशास्त्र, सांख्यिकी व व्यवसाय अभ्यास",
  "Find available slots and view our transparent uniform fee structure": "उपलब्ध जागा आणि आमची पारदर्शक एकसमान फी रचना पहा",
  "Firebase Database Live Sync": "फायरबेस क्लाउड थेट सिंक",
  "Firebase Status:": "फायरबेस क्लाउड स्थिती:",
  "For academic baseline profiling (all students pay uniform standard fees)": "शैक्षणिक मूल्यांकनासाठी (सर्व विद्यार्थ्यांसाठी एकसमान फी लागू)",
  "Formal seat reservation in the capped 15–20 student batch": "मर्यादित १५-२० विद्यार्थ्यांच्या बॅचमध्ये जागा निश्चिती",
  "Fosters genuine scientific curiosity in junior school students (Grades 6-8). Expert in visual diagrammatic representation and Olympiad question problem sets.": "विद्यार्थ्यांमध्ये विज्ञानाची आवड निर्माण करण्यात निपुण. ऑलिम्पियाड व आकृत्यांवर आधारित प्रश्नांचा उत्तम सराव.",
  "Found Application Record": "अर्जाची माहिती सापडली",
  "Free Assessment": "मोफत मूल्यांकन चाचणी",
  "Free Demo Class Slot:": "मोफत डेमो क्लास वेळ:",
  "Free evaluation test to identify learning gaps and subject baseline.": "अभ्यासातील कमतरता व विषयांची तयारी समजण्यासाठी विनामूल्य पूर्वचाचणी.",
  "Free gap analysis test to understand baseline proficiency.": "पायाभूत ज्ञान तपासण्यासाठी मोफत मूल्यांकन चाचणी.",
  "Frequently Asked Questions": "वारंवार विचारले जाणारे प्रश्न",
  "Full All-Subjects Combo": "सर्व विषय संपूर्ण पॅकेज",
  "Full All-Subjects Combo Best value • Comprehensive test series included": "सर्व विषय संपूर्ण पॅकेज (उत्कृष्ट पर्याय • टेस्ट सिरीज मोफत समाविष्ट)",
  "Full-Length Board Simulation Mocks:": "संपूर्ण बोर्ड सराव परीक्षा:",
  "Get in Touch & Center Timings": "संपर्क व केंद्राच्या वेळा",
  "Get instant access to detailed chapter blueprints, weekly hours, and full tuition fee schedules.": "सविस्तर घटक रचना, तासिका व संपूर्ण फी वेळापत्रक त्वरित मिळवा.",
  "Go to Registration Form": "नोंदणी फॉर्मकडे जा",
  "Go to Registration Form ↓": "नोंदणी फॉर्मकडे जा ↓",
  "Got Questions?": "काही प्रश्न आहेत?",
  "Grade / Class": "इयत्ता / वर्ग",
  "Hall of Fame": "यशस्वी गुणवंत विद्यार्थी",
  "Hand-crafted notes, mind maps, formula sheets, NCERT solutions, and last 10 years of solved question papers supplied at no extra fee.": "हस्तलिखित नोट्स, माइंड मॅप्स, सूत्र पत्रिका, NCERT सोल्यूशन्स आणि मागील १० वर्षांच्या सोडवलेल्या प्रश्नपत्रिका विनामूल्य दिल्या जातात.",
  "Head of Mathematics & Logic": "विभागप्रमुख - गणित व तर्कशास्त्र",
  "Held every Saturday covering topics taught in the preceding 5 days.": "मागील ५ दिवसांत शिकवलेल्या घटकांवर दर शनिवारी परीक्षा घेतली जाते.",
  "Helpline:": "हेल्पलाईन:",
  "Helps our mentors tailor batch pacing to the student's exact learning style": "विद्यार्थ्यांच्या शिकण्याच्या पद्धतीनुसार मार्गदर्शकांना शिकवण्याची गती ठरवता येते",
  "High-rigor analytical problem solving, multi-concept physics mechanics, advanced calculus, and NTA Computer-Based Test (CBT) training.": "उच्च दर्जाचे विश्लेषणात्मक प्रश्न सोडवणे, प्रगत भौतिकशास्त्र मेकॅनिक्स, कॅल्क्युलस आणि NTA संगणकीय परीक्षा (CBT) सराव.",
  "Higher JEE Physics, Organic/Inorganic/Physical Chem, Vector & Calculus Math": "उच्चस्तरीय JEE भौतिकशास्त्र, संपूर्ण रसायनशास्त्र व प्रगत गणित",
  "Hotline:": "हेल्पलाईन:",
  "How are parents kept informed about student attendance and test performance?": "विद्यार्थ्यांची उपस्थिती व चाचणी निकालांची माहिती पालकांना कशी दिली जाते?",
  "How does the 1-on-1 daily doubt resolution counter work?": "दररोजचे वैयक्तिक शंका समाधान केंद्र कसे चालते?",
  "How does the daily doubt-solving desk work?": "दररोजचे शंका समाधान सत्र कसे चालते?",
  "How frequently are chapter tests, unit tests, and board mock series conducted?": "घटक चाचण्या, युनिट टेस्ट आणि बोर्ड सराव परीक्षा किती वारंवार घेतल्या जातात?",
  "Hybrid (Offline + Live Online Flexibility)": "हायब्रिड (ऑफलाइन + थेट ऑनलाइन सोय)",
  "IB / Cambridge": "IB / केंब्रिज आंतरराष्ट्रीय",
  "IB / Cambridge IGCSE": "IB / केंब्रिज IGCSE",
  "ICSE / ISC Board": "ICSE / ISC मंडळ",
  "IIT-JEE Focus": "IIT-JEE विशेष लक्ष",
  "ISC Class 12 (Commerce Stream)": "ISC इयत्ता १२ वी (वाणिज्य शाखा)",
  "If a family relocates or a student cannot continue due to valid medical reasons within the first 14 days of admission, unused monthly tuition fees are refunded transparently after deducting registration overheads, as per our documented policy.": "प्रवेशानंतर पहिल्या १४ दिवसांच्या आत कौटुंबिक स्थलांतर किंवा वैद्यकीय कारणास्तव शिक्षण चालू ठेवणे शक्य नसल्यास, आमच्या अधिकृत धोरणानुसार उर्वरित फी पारदर्शकपणे परत केली जाते.",
  "If your school shifts its timetable or sports commitments arise, parents can submit a simple batch reshuffle request to our academic coordinator. Because our curriculum pacing is strictly synchronized across shifts, students transition without missing a single topic.": "शाळेच्या वेळा बदलल्यास पालक बॅच बदलण्याची विनंती करू शकतात. दोन्ही सत्रांमध्ये एकाच गतीने शिकवले जात असल्याने विद्यार्थ्यांचा कोणताही भाग चुकत नाही.",
  "Inquiry & Online Form": "नोंदणी अर्ज",
  "Instant Tuition Estimator": "त्वरित ट्युशन फी अंदाज",
  "Instant WhatsApp acknowledgment & counselor callback": "त्वरित व्हॉट्सॲप पावती आणि समुपदेशकांचा कॉलबॅक",
  "Instant WhatsApp acknowledgment & counselor callback within 15 minutes": "त्वरित व्हॉट्सॲप पावती आणि १५ मिनिटांत समुपदेशकांचा कॉलबॅक",
  "Instant digital Application ID generated": "त्वरित डिजिटल अर्ज क्रमांक (Application ID) मिळतो",
  "Instant digital Application ID generated upon form submission": "फॉर्म सादर केल्यावर त्वरित डिजिटल अर्ज क्रमांक मिळतो",
  "Integrated JEE (Main + Advanced) 2-Year Syllabus Roadmap": "एकात्मिक JEE (मेन + ॲडव्हान्स्ड) २-वर्षीय अभ्यासक्रम मार्गदर्शक",
  "Integrated JEE Main & Advanced 2-Year Program": "एकात्मिक JEE मेन व ॲडव्हान्स्ड २-वर्षीय अभ्यासक्रम",
  "Integrated JEE Main + Advanced": "एकात्मिक JEE मेन + ॲडव्हान्स्ड",
  "Integrated JEE Main + Advanced 2-Year Rigor": "एकात्मिक JEE मेन + ॲडव्हान्स्ड २-वर्षीय तयारी",
  "Integrated NEET-UG Medical Super-20 Program": "एकात्मिक NEET-UG मेडिकल सुपर-२० अभ्यासक्रम",
  "Intensive focus on core scoring areas": "जास्त गुण मिळवून देणाऱ्या विषयांवर भर",
  "Is there a refund policy if we need to discontinue?": "प्रवेश रद्द करायचा असल्यास फी परतावा धोरण काय आहे?",
  "JEE Foundation": "JEE पायाभरणी",
  "Junior Foundation & Biology Mentor": "फाउंडेशन व जीवशास्त्र मार्गदर्शिका",
  "Junior Science": "पायाभूत विज्ञान",
  "KEY PROGRAM INCLUSIONS": "अभ्यासक्रमाची प्रमुख वैशिष्ट्ये",
  "Key Inclusions Covered in This Fee:": "या फीमध्ये समाविष्ट असणाऱ्या सुविधा:",
  "Key Program Inclusions": "अभ्यासक्रमाची प्रमुख वैशिष्ट्ये",
  "Known for her live classroom experiments and real-world demonstrations. Eliminates fear of numerical physics and organic chemical reactions with memorable mnemonic frameworks.": "प्रत्यक्ष प्रयोगांच्या माध्यमातून भौतिकशास्त्राची भीती दूर करण्यात हातखंडा. सेंद्रिय रसायनशास्त्रातील क्लृप्त्यांमध्ये विशेष प्रावीण्य.",
  "Lead Commerce & Accountancy": "विभागप्रमुख - वाणिज्य व लेखाशास्त्र",
  "Learn from Experienced Educators": "अनुभवी शिक्षकांकडून शिका",
  "Learning Mode:": "शिक्षणाचे माध्यम:",
  "Leave your phone number and target class. Our senior academic counselor will call you back within 15 minutes.": "तुमचा फोन नंबर आणि इयत्ता नोंदवा. आमचे वरिष्ठ शैक्षणिक समुपदेशक १५ मिनिटांत तुम्हाला संपर्क करतील.",
  "Line-by-line NCERT Bio dissection, high-yield physics mechanics, chemical stoichiometry, and strict 200-question timed speed drills for 650+ target.": "NCERT ओळ-न्-ओळ जीवशास्त्र तयारी, भौतिकशास्त्र मेकॅनिक्स आणि ६५०+ गुणांच्या लक्ष्यासाठी वेळेत २०० प्रश्न सोडवण्याचा सराव.",
  "Lump-sum with up to": "एकरकमी फी भरल्यास थेट",
  "M.Sc. Life Sciences, Gold Medalist": "एम.एस्सी. लाइफ सायन्सेस (सुवर्णपदक विजेती)",
  "M.Sc. Mathematics, B.Ed (Ex-Kendriya Vidyalaya)": "एम.एस्सी. गणित, बी.एड. (माजी शिक्षक, केंद्रीय विद्यालय)",
  "Math & Science Only": "फक्त गणित आणि विज्ञान",
  "Math & Science Only Intensive focus on core scoring areas": "फक्त गणित आणि विज्ञान (जास्त गुण मिळवून देणाऱ्या विषयांवर भर)",
  "Mathematics": "गणित",
  "Maths: 100/100": "गणित: १००/१००",
  "Max 15 Students": "कमाल १५ विद्यार्थी",
  "Max Batch Capacity:": "बॅच क्षमता:",
  "Measured score growth from diagnostic test to term-end board exams.": "सुरुवातीच्या चाचणीपासून बोर्ड परीक्षेपर्यंत झालेली सातत्यपूर्ण प्रगती.",
  "Meet Senior Mentors": "वरिष्ठ मार्गदर्शकांना भेटा",
  "Mentor Counseling": "मार्गदर्शक समुपदेशन",
  "Message / Specific Academic Concerns or Questions": "काही विशेष अडचणी किंवा शैक्षणिक प्रश्न असल्यास लिहा",
  "Micro-Batches (12-15 Students)": "लहान बॅचेस (१२-१५ विद्यार्थी)",
  "Micro-batches fill up quickly. Secure your slot early.": "लहान बॅचेस लवकर भरतात. तुमची जागा आजच आरक्षित करा.",
  "Mobile Number": "मोबाइल नंबर",
  "Mobile quick actions": "मोबाइल जलद पर्याय",
  "Monday to Saturday:": "सोमवार ते शनिवार:",
  "Monthly": "मासिक (दरमहा)",
  "Monthly Payment Plan:": "मासिक पेमेंट योजना:",
  "Monthly Tuition Fee": "मासिक ट्युशन फी",
  "Morning Shift (6:30 AM â 8:30 AM)": "à¤¸à¤à¤¾à¤³à¤à¥ à¤¸à¤¤à¥à¤° (à¤¸à¤à¤¾à¤³à¥ à¥¬:à¥©à¥¦ à¤¤à¥ à¥®:à¥©à¥¦)",
  "Morning Shift (6:30 AM – 8:30 AM)": "सकाळचे सत्र (सकाळी ६:३० ते ८:३०)",
  "Morning Shift:": "सकाळचे सत्र:",
  "Mrs. Priya Sen": "सौ. प्रिया सेन",
  "Mrs. Sunita Mehta": "सौ. सुनीता मेहता",
  "NCERT line-by-line coverage, Botany, Zoology, Physics & Chemistry strategy": "NCERT ओळ-न्-ओळ अभ्यास, वनस्पती, प्राणी, भौतिक व रसायनशास्त्र रणनीती",
  "NCERT line-by-line decoding, negative marking elimination drills, high-speed physics numericals, and full mock tests.": "NCERT ओळ-न्-ओळ विश्लेषण, नकारात्मक गुण टाळण्याचा सराव, हाय-स्पीड भौतिकशास्त्र गणिते आणि संपूर्ण सराव परीक्षा.",
  "NEET-UG Medical Entrance Comprehensive Chapter Weightage Map": "NEET-UG वैद्यकीय प्रवेश परीक्षा घटकनिहाय गुणविभागणी",
  "NEET-UG Medical Super-20": "NEET-UG मेडिकल सुपर-२०",
  "NEET-UG Medical Super-20 Intensive": "NEET-UG वैद्यकीय सुपर-२० विशेष बॅच",
  "NEET/Board Prep": "NEET व बोर्ड तयारी",
  "Net Payable Tuition Fee:": "एकूण देय ट्युशन फी:",
  "Next Steps for Parents:": "पालकांसाठी पुढील महत्त्वाच्या सूचना:",
  "None provided": "काहीही नाही",
  "Objective and descriptive weekly tests replicate real school & board exam patterns. Instant test analytics pinpoint exact knowledge gaps.": "वस्तुनिष्ठ आणि वर्णनात्मक साप्ताहिक परीक्षा प्रत्यक्ष बोर्ड पॅटर्ननुसार होतात. निकालाद्वारे अभ्यासातील त्रुटी त्वरित समजतात.",
  "Official Tuition Fee Structure 2026-27": "अधिकृत ट्युशन फी रचना २०२६-२७",
  "Offline Center (In-Person Classroom)": "ऑफलाइन केंद्र (क्लासरूम प्रत्यक्ष शिक्षण)",
  "Online Admission Form": "ऑनलाइन प्रवेश अर्ज",
  "Online Analytics Portal:": "ऑनलाइन विश्लेषण पोर्टल:",
  "Orientation session with fellow batchmates and lead faculty": "वर्गमित्र आणि मुख्य शिक्षकांसोबत परिचयात्मक ओरिएंटेशन सत्र",
  "Our Faculty": "आमचे शिक्षकवृंद",
  "Our Recent Board Toppers & Success Stories": "आमचे गुणवंत बोर्ड टॉपर विद्यार्थी व यशोगाथा",
  "Our faculty members bring 10 to 18 years of classroom and board evaluation experience.": "आमचे शिक्षक १० ते १८ वर्षांचा अध्यापन व बोर्ड मूल्यमापनाचा समृद्ध अनुभव घेऊन येतात.",
  "Our faculty members sit at the dedicated doubt counters every evening between 4:30 PM and 6:30 PM. Students can walk in with specific school homework questions, test errors, or textbook derivations for individualized 1-on-1 explanation until concepts are crystal clear.": "आमचे शिक्षक दररोज संध्याकाळी ४:३० ते ६:३० या वेळेत स्वतंत्र शंका निवारण कक्षात उपस्थित असतात. विद्यार्थी शाळेतील गृहपाठ, चाचणीतील चुका किंवा पुस्तकातील अडचणी वैयक्तिकरीत्या विचारून संपूर्ण शंका निरसन करून घेऊ शकतात.",
  "Our online form takes less than 3 minutes to complete.": "आमचा ऑनलाइन फॉर्म भरण्यास ३ मिनिटांपेक्षा कमी वेळ लागतो.",
  "Our senior academic counselor will call within 15 minutes to confirm batch timing and trial session.": "आमचे वरिष्ठ शैक्षणिक समुपदेशक १५ मिनिटांत संपर्क करून बॅचची वेळ आणि डेमो क्लास निश्चित करतील.",
  "Over 72% students consistently score 90%+ in Maths & Science.": "७२% पेक्षा अधिक विद्यार्थ्यांना गणित व विज्ञानात ९०%+ गुण.",
  "Parent / Guardian Email Address": "पालकांचा ईमेल पत्ता",
  "Parent / Guardian Full Name": "पालकांचे संपूर्ण नाव",
  "Parent / Guardian Phone Number": "पालकांचा मोबाइल नंबर",
  "Parent / Guardian:": "पालक नाव:",
  "Parent WhatsApp Number": "पालकांचा व्हॉट्सॲप नंबर",
  "Parent mobile tracking portal & monthly teacher conferences": "पालक मोबाइल ट्रॅकिंग पोर्टल व मासिक शिक्षक सभा",
  "Parent of Class 11 & 12 Students": "११ वी व १२ वीच्या विद्यार्थ्यांचे पालक",
  "Parent of Class 11 Science Student": "११ वी विज्ञान शाखेतील विद्यार्थ्याचे पालक",
  "Parent-Teacher App & Monthly PTM": "पालक-शिक्षक ॲप व मासिक सभा",
  "Parents and students participate in a personalized 1-on-1 meeting with senior subject faculty. We discuss diagnostic results, school homework balance, exam targets (Board 95%+, JEE, or NEET), and select the most convenient morning or evening batch.": "पालक आणि विद्यार्थी वरिष्ठ विषय शिक्षकांशी वैयक्तिक चर्चा करतात. चाचणीचा निकाल, शाळेचा गृहपाठ आणि परीक्षेचे लक्ष्य (बोर्ड ९५%+, JEE किंवा NEET) यानुसार सोयीची बॅच निवडली जाते.",
  "Parents receive instant SMS test scores and graphical learning-gap breakdowns.": "पालकांना तात्काळ SMS द्वारे गुण आणि प्रगतीचा आलेख पाठवला जातो.",
  "Parents receive instant automated WhatsApp / SMS notifications when their child enters the center, along with weekly test scorecards. Additionally, we organize mandatory monthly Parent-Teacher Meetings (PTMs) to discuss academic growth, focus areas, and board exam strategies.": "विद्यार्थी केंद्रात आल्यावर पालकांना तात्काळ व्हॉट्सॲप / SMS द्वारे उपस्थितीची सूचना जाते. तसेच साप्ताहिक गुणपत्रिका आणि दरमहा होणाऱ्या पालक-शिक्षक बैठकीत (PTM) पाल्याच्या प्रगतीचा आढावा दिला जातो.",
  "Parents receive real-time attendance SMS, weekly test scores, and scheduled monthly conferences to review homework and performance.": "पालकांना दैनंदिन उपस्थितीचा SMS, साप्ताहिक गुण आणि गृहपाठ व प्रगतीचा आढावा घेण्यासाठी दरमहा पालक-शिक्षक बैठक घेतली जाते.",
  "Payment Term Bonus:": "पेमेंट सवलत:",
  "Personal 1-on-1 counseling to choose optimal morning/evening shifts.": "सकाळ किंवा संध्याकाळ सत्रासाठी वैयक्तिक समुपदेशन.",
  "Personal meeting with senior mentors to choose optimal timings.": "सोयीची वेळ व सत्र निवडण्यासाठी ज्येष्ठ मार्गदर्शकांशी वैयक्तिक चर्चा.",
  "Personalized guidance with senior IIT / NIT alumni mentors": "ज्येष्ठ IIT / NIT माजी शिक्षक मार्गदर्शकांकडून वैयक्तिक सल्ला",
  "Ph.D. in Physical Sciences, B.Tech": "पीएच.डी. भौतिकशास्त्र, बी.टेक.",
  "Physics": "भौतिकशास्त्र",
  "Physics / Science": "भौतिकशास्त्र / विज्ञान",
  "Physics, Chemistry, Pure Math & Biology (Full Board + CUET Syllabus)": "भौतिकशास्त्र, रसायनशास्त्र, गणित व जीवशास्त्र (बोर्ड + CUET अभ्यासक्रम)",
  "Physics, Chemistry, Pure Math & Biology (Full Combo or Individual Subject)": "भौतिकशास्त्र, रसायनशास्त्र, गणित व जीवशास्त्र (पूर्ण कॉम्बो किंवा स्वतंत्र विषय)",
  "Physics, Chemistry, Pure Math & Biology CBSE/ISC annual curriculum roadmap": "भौतिकशास्त्र, रसायनशास्त्र, गणित व जीवशास्त्र वार्षिक अभ्यासक्रम रूपरेषा",
  "Physics: 99/100": "भौतिकशास्त्र: ९९/१००",
  "Pinpoints specific weak chapters and conceptual misunderstandings": "अडचणींचे घटक आणि कमकुवत संकल्पना अचूकपणे समजतात",
  "Please carry previous year's marksheet copy during the center orientation visit.": "संस्थेत प्रत्यक्ष भेटीवेळी मागील वर्षाच्या गुणपत्रिकेची छायाप्रत सोबत आणावी.",
  "Please enter a valid email address": "कृपया वैध ईमेल पत्ता प्रविष्ट करा",
  "Please enter parent's name": "कृपया पालकांचे नाव प्रविष्ट करा",
  "Please enter school name": "कृपया शाळेचे नाव प्रविष्ट करा",
  "Please enter student's full name": "कृपया विद्यार्थ्याचे नाव प्रविष्ट करा",
  "Please enter your locality": "कृपया तुमचा पत्ता / परिसर प्रविष्ट करा",
  "Please provide student and contact details below. You will receive an instant": "कृपया खालील फॉर्ममध्ये विद्यार्थी व पालकांची माहिती भरा. अर्ज सादर केल्यावर आपणास त्वरित",
  "Please select current grade": "कृपया चालू इयत्ता निवडा",
  "Please select date of birth": "कृपया जन्मतारीख निवडा",
  "Please select target board/exam": "कृपया लक्ष्य मंडळ किंवा परीक्षा निवडा",
  "Plot 42, Knowledge Park Arcade, 2nd Flr, Commercial Hub": "प्लॉट ४२, नॉलेज पार्क आर्केड, २ रा मजला, सांगली",
  "Plot No. 42, Knowledge Park Arcade, 2nd Floor, Main Commercial Complex, Opposite City Central Library, City Center - 400001": "प्लॉट नं. ४२, नॉलेज पार्क आर्केड, २ रा मजला, मध्यवर्ती ग्रंथालयासमोर, सांगली - ४१६४१६",
  "Pre-book trial demo class and choose morning or evening shifts": "मोफत ट्रायल क्लास आणि सकाळ किंवा संध्याकाळ बॅचची वेळ निवडा",
  "Pre-book trial demo class and shift timing": "मोफत ट्रायल क्लास आणि बॅचची वेळ आरक्षित करा",
  "Preferred Mode of Tuition": "अभ्यासाचे माध्यम",
  "Preferred Shift Timing Slot": "सोयीची बॅच वेळ / सत्र",
  "Preferred Study Mode": "अभ्यासाचे माध्यम",
  "Preferred Trial Day": "ट्रायलसाठी सोयीचा दिवस",
  "Premier coaching and tuition center committed to concept-first education, personalized batch attention, and verified board success since 2012.": "संकल्पनाधिष्ठित शिक्षण, मर्यादित बॅच आणि बोर्ड परीक्षेतील उत्कृष्ट यशासाठी कटिबद्ध असणारी अग्रगण्य संस्था.",
  "Previous Academic Year Score (%)": "मागील शैक्षणिक वर्षाचे गुण (%)",
  "Print Receipt": "पावती प्रिंट करा",
  "Printed comprehensive theory booklets & formula handbooks": "मुद्रित सविस्तर थिअरी पुस्तके व सूत्र हस्तपुस्तिका",
  "Priority Admission Desk": "प्राधान्य प्रवेश कक्ष",
  "Priority Counselor Desk": "वरिष्ठ समुपदेशक कक्ष",
  "Privacy Policy": "गोपनीयता धोरण",
  "Prof. Rameshwar Singhania": "प्रा. रामेश्वर सिंघानिया",
  "Prof. Vikram Kulkarni": "प्रा. विक्रम कुलकर्णी",
  "Programs": "अभ्यासक्रम",
  "Proprietary Printed Study Material": "संस्थेचे स्वतःचे मुद्रित अभ्यास साहित्य",
  "Quarterly (Save 8%)": "तिमाही (८% सवलत)",
  "Quarterly Plan:": "तिमाही योजना:",
  "Questions / Concerns:": "काही प्रश्न / अडचणी:",
  "Questions or Specific Subject Needs": "काही प्रश्न किंवा विशिष्ट विषयाची गरज",
  "Questions or Specific Subject Needs (Optional)": "काही प्रश्न किंवा विशिष्ट विषयाची गरज (ऐच्छिक)",
  "Quick Links": "महत्त्वाच्या लिंक्स",
  "Ready to Start?": "प्रवेश घेण्यास उत्सुक आहात?",
  "Receive printed chapter modules, workbooks & formula handbooks": "मुद्रित घटक पुस्तके, वर्कबुक्स आणि सूत्र हस्तपुस्तिका मिळवा",
  "Refund Policy": "फी परतावा धोरण",
  "Registered WhatsApp No:": "नोंदणीकृत व्हॉट्सॲप नंबर:",
  "Request Fee Sheet": "फी पत्रक मिळवा",
  "Request Free Counselor Callback": "मोफत कॉलबॅक विनंती पाठवा",
  "Request an Instant Callback": "त्वरित कॉलबॅक मिळवा",
  "Reserve Counseling Slot": "समुपदेशनासाठी वेळ आरक्षित करा",
  "Reset Form": "अर्ज पूर्ववत करा",
  "Residential Area / City Locality": "रहिवासी पत्ता / परिसर / शहर",
  "Rohan K. Verma": "रोहन के. वर्मा",
  "Sangli Shikshan Sanstha": "सांगली शिक्षण संस्था",
  "Sangli Shikshan Sanstha Fee Quotation": "सांगली शिक्षण संस्था फी अंदाजपत्रक",
  "Sangli Shikshan Sanstha | Tuition & Coaching Admissions 2026-27": "सांगली शिक्षण संस्था | ट्युशन व कोचिंग प्रवेश २०२६-२७",
  "Save or print this receipt for your records. Quote your Application ID for any inquiries.": "ही पावती जतन करा किंवा प्रिंट काढा. चौकशीसाठी तुमचा अर्ज क्रमांक नमूद करा.",
  "Saved to Cloud Firestore (tuition-academy-17e21 / admissions)": "क्लाउड फायरस्टोअरमध्ये सुरक्षित जतन केले (admissions)",
  "Schedule Your Diagnostic": "तुमची मूल्यांकन चाचणी निश्चित करा",
  "Schedule a Free 2-Day Trial Demo Class before final fee payment": "अंतिम फी भरण्यापूर्वी २ दिवसांचा मोफत डेमो क्लास आरक्षित करा",
  "Science Olympiad": "विज्ञान ऑलिम्पियाड",
  "Science: 99/100": "विज्ञान: ९९/१००",
  "Seat Allocation & Kit": "जागा वाटप व स्टडी किट",
  "Seats Available: 2 Left": "उपलब्ध जागा: फक्त २ शिल्लक",
  "Seats Available: 3 Left": "उपलब्ध जागा: फक्त ३ शिल्लक",
  "Seats Available: 4 Left": "उपलब्ध जागा: फक्त ४ शिल्लक",
  "Seats Available: 5 Left": "उपलब्ध जागा: फक्त ५ शिल्लक",
  "Seats Available: 6 Left": "उपलब्ध जागा: फक्त ६ शिल्लक",
  "Secure your child's seat in the preferred batch. Batch sizes are strictly capped at 15–20 students on a first-come, first-served basis.": "आपल्या पाल्याची पसंतीच्या बॅचमधील जागा आरक्षित करा. 'प्रथम येणाऱ्यास प्रथम प्राधान्य' तत्त्वावर जागा मर्यादित.",
  "Select Grade (11th or 12th)": "इयत्ता निवडा (११ वी किंवा १२ वी)",
  "Select Student Grade / Class": "विद्यार्थ्याची इयत्ता निवडा",
  "Selected Batch Timing:": "निवडलेली बॅचची वेळ:",
  "Selection of optimal batch shift (Morning: 6:30 AM or Evening: 4:30 PM)": "सोयीस्कर बॅच वेळेची निवड (सकाळ: ६:३० किंवा संध्याकाळ: ४:३०)",
  "Senior Physics & Chemistry Mentor": "वरिष्ठ भौतिकशास्त्र व रसायनशास्त्र मार्गदर्शिका",
  "Senior Secondary & Competitive Wings": "उच्च माध्यमिक व स्पर्धा परीक्षा विभाग",
  "Senior educators with IIT, NIT & Master's pedagogy backgrounds.": "IIT, NIT व पदव्युत्तर शिक्षण असलेले ज्येष्ठ मार्गदर्शक.",
  "Session 2026-27 Admission": "शैक्षणिक वर्ष २०२६-२७ प्रवेश",
  "Shift Timing:": "बॅच वेळ:",
  "Simple recurring fee payable by the 5th of every month.": "दरमहा ५ तारखेपर्यंत भरता येणारी सोपी मासिक फी.",
  "Single Subject Tutoring": "स्वतंत्र एका विषयाचे मार्गदर्शन",
  "Single Subject Tutoring Choice of Math, Physics, or Accounts": "स्वतंत्र एका विषयाचे मार्गदर्शन (गणित, भौतिकशास्त्र किंवा अकाउंट्स)",
  "Small Batch Sizes": "लहान बॅचेस",
  "Sneha Deshmukh": "स्नेहा देशमुख",
  "Solved past 10-year board question banks & step-marking strategy guides": "मागील १० वर्षांच्या सोडवलेल्या प्रश्नपत्रिका व गुणदान पद्धती मार्गदर्शन",
  "Speak with our Academic Counselor right away:": "आमच्या शैक्षणिक समुपदेशकांशी त्वरित बोला:",
  "Special CA Foundation entrance orientation modules & business law insights": "विशेष CA फाउंडेशन प्रवेश परीक्षा मार्गदर्शन व व्यावसायिक कायदा ओळख",
  "Specialist in breaking down complex Calculus, Trigonometry & Geometry into intuitive visual puzzles. Produced 140+ centum (100/100) scorers in CBSE/ICSE board exams.": "कॅल्क्युलस, त्रिकोणमिती व भूमिती सोप्या भाषेत शिकवण्यात तज्ज्ञ. बोर्ड परीक्षेत १००/१०० गुण मिळवणारे १४०+ विद्यार्थी घडवले.",
  "Specialized, high-impact tuition batches exclusively for Class 11 and Class 12 (Science, Commerce, JEE & NEET). Strictly capped at 15–18 students with morning & evening shifts.": "इयत्ता ११ वी आणि १२ वी साठी (विज्ञान, वाणिज्य, JEE व NEET) विशेष वर्ग. सकाळ व संध्याकाळ सत्रांमध्ये मर्यादित प्रवेश.",
  "Quick Menu / थेट पर्याय:": "त्वरित मेनू / थेट पर्याय:",
  "Quick Menu": "त्वरित मेनू",
  "Contact Desk": "संपर्क कक्ष",
  "Track Status": "अर्ज स्थिती",
  "Spread full-year fees across 6 or 9 easy interest-free bank installments.": "संपूर्ण वर्षाची फी ६ किंवा ९ विनाव्याज बँक हप्त्यांमध्ये भरण्याची सोय.",
  "Standard Tuition Base Fee:": "मूळ ट्युशन फी:",
  "Standard Uniform Academy Fee (Equal for all students)": "संस्थेची एकसमान व पारदर्शक फी रचना (सर्व विद्यार्थ्यांसाठी समान)",
  "Start Admission Process": "प्रवेश प्रक्रिया सुरू करा",
  "Start Your Admission Now": "आत्ताच प्रवेश प्रक्रिया सुरू करा",
  "Starting Fee": "किमान मासिक फी",
  "State Board": "महाराष्ट्र राज्य मंडळ (State Board)",
  "State Board (English/Vernacular)": "महाराष्ट्र राज्य मंडळ (इंग्रजी/मराठी)",
  "Step 1: Inquiry & Online Registration": "टप्पा १: चौकशी व ऑनलाइन नोंदणी",
  "Step 2: Diagnostic & Aptitude Assessment": "टप्पा २: पूर्वचाचणी व क्षमता मूल्यांकन",
  "Step 3: Academic Counseling & Batch Selection": "टप्पा ३: समुपदेशन व बॅच निवड",
  "Step 4: Seat Allocation & Class Kickoff": "टप्पा ४: जागा वाटप व वर्ग प्रारंभ",
  "Strict 15–20 student capping": "फक्त १५-२० विद्यार्थ्यांची मर्यादा",
  "Strict Batch Limit": "मर्यादित बॅच क्षमता",
  "Strictly 15–20 Students": "फक्त १५ ते २० विद्यार्थी",
  "Student Admission Inquiry Form": "विद्यार्थी प्रवेश नोंदणी अर्ज",
  "Student Full Name": "विद्यार्थ्याचे संपूर्ण नाव",
  "Student Grade / Level:": "विद्यार्थ्याची इयत्ता / स्तर:",
  "Student Name": "विद्यार्थ्याचे नाव",
  "Student Name:": "विद्यार्थ्याचे नाव:",
  "Student portal mobile app login for recorded lectures & test analytics": "रेकॉर्डेड लेक्चर्स व चाचणी विश्लेषणासाठी विद्यार्थी मोबाइल ॲप लॉगिन",
  "Student's Current Grade": "विद्यार्थ्याची इयत्ता",
  "Student's Current Grade / Stream": "विद्यार्थ्याची इयत्ता / शाखा",
  "Students Coached Successfully": "यशस्वी विद्यार्थी",
  "Study Mode:": "अभ्यास पद्धत:",
  "Study Modules & Test Portal:": "अभ्यास साहित्य व टेस्ट पोर्टल:",
  "Study material booklets, NCERT diagram compendiums & memory flashcards": "अभ्यास साहित्य पुस्तिका, NCERT आकृती संग्रह आणि मेमरी फ्लॅशकार्ड्स",
  "Subject combo customization (All-Subjects vs. Core Math & Science)": "विषय कॉम्बो निवड (सर्व विषय किंवा फक्त मुख्य गणित व विज्ञान)",
  "Subject for Demo": "डेमोसाठी विषय",
  "Submission Date & Time:": "अर्ज सादर केल्याची तारीख व वेळ:",
  "Submit Admission Application": "प्रवेश अर्ज सादर करा",
  "Submit Application": "अर्ज सादर करा",
  "Sunday:": "रविवार:",
  "THE SANSTHA ADVANTAGE": "संस्थेची वैशिष्ट्ये",
  "Tailored milestone roadmap for board scoring & competitive prep": "बोर्ड परीक्षा व स्पर्धा परीक्षेसाठी वैयक्तिक वेळापत्रक आणि नियोजन",
  "Take Step 1 Right Now": "आत्ताच पहिला टप्पा पूर्ण करा",
  "Take the test online or in-person at our learning center.": "आमच्या केंद्रावर प्रत्यक्ष किंवा ऑनलाइन चाचणी द्या.",
  "Tanvi Agarwal": "तन्वी अग्रवाल",
  "Target Board / Exam": "लक्ष्य शिक्षण मंडळ / परीक्षा",
  "Target Grade & Board:": "इयत्ता व शिक्षण मंडळ:",
  "Target Grade:": "प्रवेशासाठी इयत्ता:",
  "Tell us about student": "विद्यार्थ्यांच्या विषयातील अडचणींबद्दल माहिती द्या",
  "Tell us about student's specific subject difficulties (e.g. Maths calculus, Physics mechanics), preferred shift timings, or questions for our academic counselor...": "विद्यार्थ्यांच्या विषयातील अडचणी (उदा. गणित, भौतिकशास्त्र), सोयीची वेळ किंवा इतर काही प्रश्न असल्यास येथे लिहा...",
  "Tell us if you want help with Maths, Physics derivations, Board Exam Crash Course, etc.": "गणित, भौतिकशास्त्र, किंवा बोर्ड परीक्षा रिव्हिजनबद्दल मदत हवी असल्यास येथे लिहा.",
  "Tell us if you want help with Maths, Physics, Board Exam Crash Course, etc.": "उदा. भौतिकशास्त्र, गणित किंवा बोर्ड परीक्षा क्रॅश कोर्सबद्दल माहिती हवी असल्यास सांगा...",
  "Terms of Admission": "प्रवेशाच्या अटी व शर्ती",
  "Testing and performance benchmarking are at the heart of our methodology:": "नियमित सराव परीक्षा ही आमच्या अध्यापन पद्धतीचा मुख्य पाया आहे:",
  "The Sanstha Advantage": "संस्थेची वैशिष्ट्ये",
  "This Saturday (5:00 PM)": "हा शनिवार (सायं. ५:००)",
  "This Sunday (10:30 AM)": "हा रविवार (सकाळी १०:३०)",
  "Toppers & Testimonials": "गुणवंत विद्यार्थी व अनुभव",
  "Track Application Status": "अर्जाची स्थिती तपासा",
  "Track Your Admission Application": "तुमच्या प्रवेश अर्जाची स्थिती तपासा",
  "Transforms Accountancy and Macroeconomics from dry theory into engaging business case studies. Trained top city rankers in ISC and CBSE 12th Commerce.": "अकाउंटन्सी आणि अर्थशास्त्र रंजक केस स्टडीजद्वारे शिकवण्यात तज्ज्ञ. ISC आणि CBSE १२ वी वाणिज्यमध्ये शहर अव्वल विद्यार्थी घडवले.",
  "Transparent & uniform tuition fee structure for all enrolled students": "सर्व प्रवेशित विद्यार्थ्यांसाठी पारदर्शक आणि एकसमान फी रचना",
  "Transparent fee breakdown, batch shifts, and payment installments.": "पारदर्शक फी रचना, बॅचच्या वेळा आणि सुलभ हप्ते.",
  "Transparent, uniform, and equal fee pricing for Classes 11 & 12": "इयत्ता ११ वी व १२ वी साठी पारदर्शक, एकसमान आणि समन्यायी फी रचना",
  "Try Before You Commit": "प्रवेशापूर्वी खात्री करा",
  "Tuition & Admission FAQs": "ट्युशन व प्रवेशासंबंधी वारंवार विचारले जाणारे प्रश्न",
  "Tuition Center Office Hours": "केंद्राच्या कार्यालयीन वेळा",
  "Tuition Fee Calculator": "ट्युशन फी कॅल्क्युलेटर",
  "Tuition Fee Overview": "ट्युशन फी तपशील",
  "Tuition Fee Sheet": "ट्युशन फी पत्रक",
  "Tuition Programs": "ट्युशन अभ्यासक्रम",
  "Tuition Programs & Courses": "अभ्यासक्रम व कोर्सेस",
  "Tuition Subject Package:": "विषय पॅकेज निवडा:",
  "Tuition Tuition Fee Calculator": "ट्युशन फी कॅल्क्युलेटर",
  "Unlock High Scores With": "मिळवा सर्वोच्च गुण ",
  "Visit Our Learning Center": "आमच्या शिक्षण केंद्राला भेट द्या",
  "We conduct a complimentary, low-pressure 45-minute diagnostic evaluation test. Rather than ranking students, this test identifies root conceptual gaps in Mathematics, Science, and analytical reasoning from previous academic years.": "आम्ही ४५ मिनिटांची विनामूल्य पूर्वचाचणी घेतो. विद्यार्थ्यांना रँक देण्याऐवजी, गणित, विज्ञान आणि तर्कशुद्ध विचारांमधील मूलभूत त्रुटी शोधणे हा या चाचणीचा मुख्य उद्देश आहे.",
  "We don't believe in crowded lecture halls. We provide structured, individualized, result-driven coaching designed to eliminate exam anxiety.": "आम्ही गर्दीच्या क्लासरूमवर विश्वास ठेवत नाही. आम्ही परीक्षेची भीती दूर करण्यासाठी पद्धतशीर, वैयक्तिक आणि निकाल देणारे शिक्षण देतो.",
  "We invite every prospective student to experience a 2-day complimentary classroom demo session. This lets the student experience our conceptual teaching methodology, teacher interaction, classroom technology, and peer group before parents make any financial commitment.": "आम्ही प्रत्येक विद्यार्थ्याला २ दिवसांचे मोफत डेमो सेशन देतो. याद्वारे पालकांनी फी भरण्यापूर्वी विद्यार्थ्याला अध्यापन पद्धती, शिक्षक आणि वर्गाचे वातावरण अनुभवता येते.",
  "We maintain a strict ceiling of 15 to 18 students per batch. This micro-batch format ensures that faculty members can physically check each student's homework, review their step-by-step problem-solving, and actively monitor comprehension in every single class session.": "आम्ही प्रत्येक बॅचमध्ये फक्त १५ ते १८ विद्यार्थ्यांची कठोर मर्यादा पाळतो. यामुळे शिक्षक प्रत्येक विद्यार्थ्याचा गृहपाठ तपासू शकतात, त्यांची सोडवण्याची पद्धत पाहू शकतात आणि प्रत्येक तासाला आकलनावर लक्ष ठेवू शकतात.",
  "We provide total financial flexibility for parents:": "आम्ही पालकांसाठी सोयीस्कर पेमेंट पर्याय देतो:",
  "We welcome parents and students to visit our campus, tour our digital classrooms, and meet our senior faculty in person.": "पालक व विद्यार्थ्यांनी आमच्या केंद्राला प्रत्यक्ष भेट देऊन डिजिटल क्लासरूम आणि ज्येष्ठ शिक्षकांशी चर्चा करावी.",
  "Weekday Evening (Thursday 6:00 PM)": "आठवड्यातील दिवस (गुरूवार सायं. ६:००)",
  "Weekday Evening (Tuesday 6:00 PM)": "आठवड्यातील दिवस (मंगळवार सायं. ६:००)",
  "Weekend Intensive (Saturday & Sunday)": "वीकेंड विशेष बॅच (शनिवार व रविवार)",
  "Weekly 3-hour computer-based testing (CBT) with detailed negative marking analysis": "नकारात्मक गुण पद्धतीसह साप्ताहिक ३ तासांची संगणकीकृत CBT परीक्षा",
  "Weekly Chapter Tests:": "साप्ताहिक घटक चाचण्या:",
  "Weekly NTA CBT pattern tests with national rank percentile benchmarking": "राष्ट्रीय स्तरावरील रँक पर्सेंटाईलसह NTA CBT पॅटर्न साप्ताहिक परीक्षा",
  "Weekly OMR-sheet mock test series under strict all-India medical exam conditions": "अखिल भारतीय वैद्यकीय परीक्षेच्या धर्तीवर साप्ताहिक OMR शीट सराव परीक्षा",
  "Weekly Rigorous Testing & Analysis": "साप्ताहिक सराव परीक्षा व विश्लेषण",
  "Weekly chapter tests + cumulative unit assessments with detailed answer keys": "साप्ताहिक घटक चाचण्या आणि उत्तरांसह सविस्तर मूल्यमापन",
  "Weekly chapter tests with OMR bubble sheets and negative marking penalty analysis": "OMR शीटवर साप्ताहिक घटक परीक्षा आणि नकारात्मक गुणांचे विश्लेषण",
  "Weekly chapter-wise descriptive & objective tests": "साप्ताहिक वर्णनात्मक व बहुपर्यायी चाचण्या",
  "Weekly practical ledger balancing workshops & corporate case study drills": "साप्ताहिक लेजर बॅलन्सिंग कार्यशाळा व व्यावसायिक केस स्टडी सराव",
  "Weightage distribution, chapter prioritization, and NTA CBT test pattern": "घटकनिहाय गुणविभागणी, चॅप्टर प्राधान्यक्रम आणि NTA CBT परीक्षा पॅटर्न",
  "Welcome to Sangli Shikshan Sanstha": "सांगली शिक्षण संस्थेत आपले स्वागत आहे",
  "What fee payment installment plans are available (monthly, quarterly, annual, zero-cost EMI)?": "फी भरण्यासाठी कोणते हप्ते (मासिक, तिमाही, वार्षिक किंवा विनाव्याज EMI) उपलब्ध आहेत?",
  "What is the fee refund policy if a student relocates?": "विद्यार्थ्याचे स्थलांतर झाल्यास फी परतावा धोरण काय आहे?",
  "What is the student-to-teacher ratio in each tuition batch?": "प्रत्येक बॅचमध्ये विद्यार्थी व शिक्षकांचे प्रमाण काय आहे?",
  "WhatsApp": "व्हॉट्सॲप",
  "WhatsApp:": "व्हॉट्सॲप:",
  "Why Parents & Students Choose Us": "पालक आणि विद्यार्थी आम्हाला का निवडतात?",
  "Years of Mentorship Excellence": "वर्षांची अध्यापन परंपरा",
  "Yes, 100% free with no commitment.": "होय, कोणतेही शुल्क न घेता १००% विनामूल्य.",
  "Yes, absolutely. We offer a 100% free 2-day trial demo class for any grade and stream. Your child can attend live lectures in the actual classroom, interact with faculty members, and inspect our printed study booklets before parents make any financial commitment.": "होय, नक्कीच! आम्ही कोणत्याही शाखेसाठी १००% मोफत २ दिवसांचा डेमो क्लास देतो. कोणताही आर्थिक भार न घेता आपला पाल्य प्रत्यक्ष वर्गात बसू शकतो, शिक्षकांशी चर्चा करू शकतो आणि स्टडी मटेरियल पाहू शकतो.",
  "Yes, we offer seamless batch flexibility.": "होय, आम्ही बॅच बदलण्याची पूर्ण सोय देतो.",
  "Yes. All enrolled students receive our proprietary printed study modules, chapter formula sheets, past 10-year board question banks, and weekly test papers at zero extra fee. Everything is included in the transparent tuition fee.": "होय! सर्व प्रवेशित विद्यार्थ्यांना हस्तलिखित मुद्रित अभ्यास साहित्य, घटकनिहाय सूत्र पत्रिका, मागील १० वर्षांच्या प्रश्नपत्रिका संच विनामूल्य मिळतात. सर्व काही एकसमान फीमध्ये समाविष्ट आहे.",
  "Yes. If within the first 7 days of formal enrolled classes you feel the batch is not the right fit for your child, we provide a 100% money-back refund on tuition fees (minus a nominal ₹500 study material kit processing cost). No difficult questions asked.": "होय. वर्गाच्या पहिल्या ७ दिवसांत वर्ग योग्य वाटला नाही तर, नाममात्र ₹५०० स्टडी किट खर्च वगळता संपूर्ण ट्युशन फी कोणत्याही अटींशिवाय १००% परत केली जाते.",
  "You will receive admission receipt and schedule here": "या नंबरवर प्रवेश पावती आणि वेळापत्रक पाठवले जाईल",
  "Your Name": "तुमचे नाव",
  "Zero upfront registration or administrative processing fee": "नोंदणीसाठी कोणतेही आगाऊ किंवा प्रशासकीय शुल्क नाही",
  "Zero upfront registration or processing fee": "नोंदणीसाठी कोणतेही आगाऊ शुल्क नाही",
  "admissions@sanglishikshansanstha.edu.in | info@sanglishikshansanstha.edu.in": "admissions@sanglishikshansanstha.edu.in | info@sanglishikshansanstha.edu.in",
  "e.g. 88.50": "उदा. ८८.५०",
  "e.g. 89": "उदा. ८९",
  "e.g. 98765 43210": "उदा. ९८७६५ ४३२१०",
  "e.g. 9876543210": "उदा. ९८७६५४३२१०",
  "e.g. Aarav Patil": "उदा. आरव पाटील",
  "e.g. Aarav Sharma": "उदा. आरव शर्मा / पाटील",
  "e.g. Meera Joshi": "उदा. मीरा जोशी",
  "e.g. Priyanshu Roy": "उदा. प्रियांशू रॉय / पाटील",
  "e.g. Rajesh Patil": "उदा. राजेश पाटील",
  "e.g. Rajesh Sharma": "उदा. राजेश पाटील / शर्मा",
  "e.g. Sector 14, Urban Estate": "उदा. विश्रामबाग / गणपती पेठ, सांगली",
  "e.g. St. Xavier": "उदा. विलिंग्डन कॉलेज, सांगली",
  "e.g. St. Xavier's High School": "उदा. विलिंग्डन कॉलेज / हायस्कूल, सांगली",
  "e.g. Vishrambag, Sangli": "उदा. विश्रामबाग, सांगली",
  "e.g. Willingdon College, Sangli": "उदा. विलिंग्डन कॉलेज, सांगली",
  "e.g. parents@example.com": "उदा. parents@example.com",
  "e.g. rajesh.patil@gmail.com": "उदा. rajesh.patil@gmail.com",
  "or registered mobile number to check verification status, counseling dates, and seat confirmation.": "किंवा नोंदणीकृत मोबाइल नंबर टाका.",
  "per month!": "रुपये!",
  "upon submission.": "प्राप्त होईल.",
  "© 2026 Sangli Shikshan Sanstha. All Rights Reserved. Designed for Student Excellence.": "© २०२६ सांगली शिक्षण संस्था. सर्व हक्क राखीव. विद्यार्थ्यांच्या उत्कृष्ट गुणवत्तेसाठी समर्पित.",
  "ð Congratulations! Your admission application has been successfully registered.": "ð à¤à¤­à¤¿à¤¨à¤à¤¦à¤¨! à¤à¤ªà¤²à¤¾ à¤ªà¥à¤°à¤µà¥à¤¶ à¤à¤°à¥à¤ à¤¯à¤¶à¤¸à¥à¤µà¥à¤°à¥à¤¤à¥à¤¯à¤¾ à¤¨à¥à¤à¤¦à¤µà¤²à¤¾ à¤à¥à¤²à¤¾ à¤à¤¹à¥.",
  "ð« Classroom (Center)": "ð« à¤à¥à¤²à¤¾à¤¸à¤°à¥à¤® (à¤¸à¥à¤à¤à¤°)",
  "ð¬ Share with Admin WhatsApp (+91 7385803641)": "ð¬ à¤µà¥à¤¹à¥à¤à¥à¤¸à¥²à¤ªà¤µà¤° à¤ªà¤¾à¤ à¤µà¤¾ (+91 7385803641)",
  "ð» Live Online": "ð» à¤¥à¥à¤ à¤à¤¨à¤²à¤¾à¤à¤¨",
  "ð Hybrid": "ð à¤¹à¤¾à¤¯à¤¬à¥à¤°à¤¿à¤¡ à¤ªà¤¦à¥à¤§à¤¤",
  "ð Your data is kept strictly confidential. No commercial sharing or spam.": "ð à¤à¤ªà¤²à¥ à¤®à¤¾à¤¹à¤¿à¤¤à¥ à¤ªà¥à¤°à¥à¤£à¤ªà¤£à¥ à¤à¥à¤ªà¤¨à¥à¤¯ à¤ à¥à¤µà¤²à¥ à¤à¤¾à¤¤à¥. à¤à¥à¤£à¤¤à¥à¤¹à¥ à¤µà¥à¤¯à¤¾à¤µà¤¸à¤¾à¤¯à¤¿à¤ à¤¦à¥à¤µà¤¾à¤£à¤à¥à¤µà¤¾à¤£ à¤à¤¿à¤à¤µà¤¾ à¤¸à¥à¤ªà¥à¤® à¤à¥à¤²à¤¾ à¤à¤¾à¤¤ à¤¨à¤¾à¤¹à¥.",
  "सांगली शिक्षण संस्था • Official Admission Slip • Session 2026-27": "सांगली शिक्षण संस्था • अधिकृत प्रवेश पावती • शैक्षणिक वर्ष २०२६-२७",
  "₹3,400 / mo": "₹३,४०० / महिना",
  "⏰ Batch Timings:": "⏰ बॅचच्या वेळा:",
  "⏱️ 30 Mins (1-on-1)": "⏱️ ३० मिनिटे (वैयक्तिक)",
  "⏱️ 3–5 Minutes": "⏱️ ३-५ मिनिटे",
  "⏱️ 45 Mins (Free)": "⏱️ ४५ मिनिटे (मोफत)",
  "⏱️ Day 1 Welcome": "⏱️ दिवस १ स्वागत",
  "🌅 Morning Shift: 6:00 AM – 8:30 AM": "🌅 सकाळचे सत्र: सकाळी ६:०० ते ८:३०",
  "🌅 Morning Shift: 6:30 AM – 8:00 AM": "🌅 सकाळचे सत्र: सकाळी ६:३० ते ८:००",
  "🌅 Morning Shift: 6:30 AM – 8:30 AM": "🌅 सकाळचे सत्र: सकाळी ६:३० ते ८:३०",
  "🌆 Evening Shift: 4:30 PM – 7:30 PM": "🌆 संध्याकाळचे सत्र: सायं. ४:३० ते ७:३०",
  "🌆 Evening Shift: 4:30 PM – 7:45 PM": "🌆 संध्याकाळचे सत्र: सायं. ४:३० ते ७:४५",
  "🌆 Evening Shift: 5:00 PM – 7:30 PM": "🌆 संध्याकाळचे सत्र: सायं. ५:०० ते ७:३०",
  "🎉 Congratulations! Your admission application has been successfully registered.": "🎉 अभिनंदन! आपला प्रवेश अर्ज यशस्वीरीत्या नोंदवला गेला आहे.",
  "🏫 Classroom (Center)": "🏫 क्लासरूम (सेंटर)",
  "👥 Max Batch Capacity:": "👥 बॅच क्षमता:",
  "💬 Share with Admin WhatsApp (+91 7385803641)": "💬 व्हॉट्सॲपवर पाठवा (+91 7385803641)",
  "💻 Live Online": "💻 थेट ऑनलाइन",
  "📚 Curriculum:": "📚 विषय रचना:",
  "📢 Admissions Open": "📢 प्रवेश सुरू",
  "🔄 Hybrid": "🔄 हायब्रिड पद्धत",
  "🔒 Your data is kept strictly confidential. No commercial sharing or spam.": "🔒 आपली माहिती पूर्णपणे गोपनीय ठेवली जाते. कोणतीही व्यावसायिक देवाणघेवाण किंवा स्पॅम केला जात नाही.",
  "🛡️ 7-Day Money Back Assurance • No Hidden Registration Surcharges": "🛡️ ७ दिवसांचे मनी बॅक आश्वासन • कोणतेही लपलेले नोंदणी शुल्क नाही",
};


function getSavedLanguage() {
  try {
    return localStorage.getItem('sanstha_lang') || 'en';
  } catch (e) {
    return 'en';
  }
}

function saveLanguage(lang) {
  try {
    localStorage.setItem('sanstha_lang', lang);
  } catch (e) {
    // Ignore storage errors in private browsing/incognito
  }
}

let currentLanguage = getSavedLanguage();

function normalizeText(str) {
  if (!str) return '';
  return str
    .replace(/[\\u2010\\u2011\\u2012\\u2013\\u2014\\u2015]/g, '-')
    .replace(/[\\u2018\\u2019]/g, "'")
    .replace(/[\\u201C\\u201D]/g, '"')
    .replace(/\\s+/g, ' ')
    .trim();
}

// Build pre-normalized lookup map for fast, infallible matching
const normalizedDict = {};
for (const [k, v] of Object.entries(marathiDictionary)) {
  normalizedDict[normalizeText(k)] = v;
}

function lookupTranslation(text) {
  if (!text) return null;
  if (marathiDictionary[text]) return marathiDictionary[text];
  const norm = normalizeText(text);
  if (normalizedDict[norm]) return normalizedDict[norm];
  return null;
}

// Recursive DOM translator that replaces all visible text nodes, placeholders, options, and button values
function translateNode(node, lang) {
  if (!node) return;

  // 1. Process text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    const val = node.nodeValue;
    const clean = normalizeText(val);
    if (!clean) return;

    if (!node.__origText) {
      node.__origText = val;
    }

    if (lang === 'mr') {
      const mr = lookupTranslation(clean);
      if (mr) {
        const m = val.match(/^(\\s*)([\\s\\S]*?)(\\s*)$/);
        const pre = m ? m[1] : '';
        const post = m ? m[3] : '';
        node.nodeValue = pre + mr + post;
      }
    } else {
      if (node.__origText) {
        node.nodeValue = node.__origText;
      }
    }
    return;
  }

  // Skip language switcher, scripts, styles, svgs and non-translatable containers
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.classList && (node.classList.contains('lang-switch-wrap') || node.classList.contains('lang-btn') || node.hasAttribute('data-no-translate'))) {
      return;
    }
  }

  // Skip script, style, and svg
  const tagName = node.tagName ? node.tagName.toLowerCase() : '';
  if (['script', 'style', 'svg', 'path', 'polyline', 'polygon', 'circle', 'line', 'code'].includes(tagName)) return;

  // 2. Process input/textarea placeholders
  if (node.placeholder) {
    if (!node.__origPlaceholder) {
      node.__origPlaceholder = node.placeholder;
    }
    const cleanPh = normalizeText(node.__origPlaceholder);
    if (lang === 'mr') {
      const mr = lookupTranslation(cleanPh);
      if (mr) {
        node.placeholder = mr;
      } else {
        // Fallback partial match for long placeholders
        for (const [k, v] of Object.entries(normalizedDict)) {
          if (cleanPh.includes(k) || k.includes(cleanPh)) {
            node.placeholder = v;
            break;
          }
        }
      }
    } else {
      node.placeholder = node.__origPlaceholder;
    }
  }

  // 3. Process select option texts
  if (tagName === 'option') {
    if (!node.__origText) {
      node.__origText = node.textContent;
    }
    const cleanOpt = normalizeText(node.__origText);
    if (lang === 'mr') {
      const mr = lookupTranslation(cleanOpt);
      if (mr) {
        node.textContent = mr;
      }
    } else {
      node.textContent = node.__origText;
    }
    return;
  }

  // 4. Process input button / submit values
  if (tagName === 'input' && (node.type === 'button' || node.type === 'submit')) {
    if (!node.__origVal) {
      node.__origVal = node.value;
    }
    const cleanVal = normalizeText(node.__origVal);
    if (lang === 'mr') {
      const mr = lookupTranslation(cleanVal);
      if (mr) node.value = mr;
    } else {
      node.value = node.__origVal;
    }
  }

  // 5. Process child nodes recursively
  for (let i = 0; i < node.childNodes.length; i++) {
    translateNode(node.childNodes[i], lang);
  }
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'mr') return;
  currentLanguage = lang;
  saveLanguage(lang);
  document.documentElement.lang = lang;

  // Update button active state across all switchers (header and mobile drawer)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Translate entire DOM
  if (document.body) {
    translateNode(document.body, lang);
  }

  // Also translate all dialog modals
  document.querySelectorAll('dialog').forEach(dlg => {
    translateNode(dlg, lang);
  });

  // Dispatch custom event for components
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
}

function t(key) {
  if (currentLanguage === 'mr') {
    const mr = lookupTranslation(key);
    if (mr) return mr;
  }
  return key;
}

window.SansthaI18n = {
  setLanguage,
  t,
  getLanguage: () => currentLanguage,
  translateElement: (el) => translateNode(el, currentLanguage)
};

// Hook HTMLDialogElement.prototype.showModal to automatically translate when opening modals
if (typeof HTMLDialogElement !== 'undefined' && HTMLDialogElement.prototype.showModal) {
  const originalShowModal = HTMLDialogElement.prototype.showModal;
  HTMLDialogElement.prototype.showModal = function() {
    originalShowModal.apply(this, arguments);
    if (currentLanguage === 'mr') {
      translateNode(this, 'mr');
    }
  };
}

// Observe dynamic content updates (e.g. status check results, quick finder results)
if (typeof MutationObserver !== 'undefined') {
  let isMutating = false;
  const dynamicObserver = new MutationObserver((mutations) => {
    if (currentLanguage !== 'mr' || isMutating) return;
    isMutating = true;
    for (const m of mutations) {
      if (m.type === 'childList') {
        m.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            translateNode(node, 'mr');
          }
        });
      }
    }
    isMutating = false;
  });

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      const containers = ['#trackResultBox', '#quickFinderResult', '#stepDetailLeft', '#stepDetailRight', '#printableReceipt'];
      containers.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
          dynamicObserver.observe(el, { childList: true, subtree: true });
        }
      });
    });
  }
}

// Language button click / touch handler
function handleLangSwitch(e) {
  const btn = e.target.closest('.lang-btn');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const lang = btn.getAttribute('data-lang');
  if (lang) {
    setLanguage(lang);
  }
}

// Auto initialize when DOM loads
function initLanguageEngine() {
  // Bind direct listeners to all .lang-btn elements
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.removeEventListener('click', handleLangSwitch);
    btn.addEventListener('click', handleLangSwitch);
    btn.removeEventListener('touchend', handleLangSwitch);
    btn.addEventListener('touchend', handleLangSwitch, { passive: false });
  });

  // Global delegation fallback so dynamically inserted buttons also work instantly
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (btn) {
      handleLangSwitch(e);
    }
  });

  // Apply chosen language if set to 'mr'
  if (currentLanguage === 'mr') {
    setTimeout(() => {
      setLanguage('mr');
    }, 20);
  } else {
    setLanguage('en');
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageEngine);
  } else {
    initLanguageEngine();
  }
}
