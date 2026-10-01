#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate high-fidelity, bilingual (English & Marathi) PDF documents for Sangli Shikshan Sanstha
Includes embedded logo, Devanagari Unicode Mukta font, Science & Competitive courses, and zero Commerce courses.
"""

import os
import shutil
from fpdf import FPDF

FONT_REG = 'Mukta-Regular.ttf'
FONT_BOLD = 'Mukta-Bold.ttf'
LOGO_IMG = 'logo.png'

class SansthaPDF(FPDF):
    def __init__(self, title_text, org_name, is_marathi=False, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.doc_title = title_text
        self.org_name = org_name
        self.is_marathi = is_marathi
        self.set_auto_page_break(auto=True, margin=18)
        self.set_text_shaping(True)
        
        # Add unicode fonts
        self.add_font('Mukta', '', FONT_REG)
        self.add_font('Mukta', 'B', FONT_BOLD)
        self.set_font('Mukta', '', 10)

    def header(self):
        # Logo on left
        if os.path.exists(LOGO_IMG):
            self.image(LOGO_IMG, x=12, y=9, w=18)
        
        # Institution Header Info
        self.set_xy(34, 9)
        self.set_font('Mukta', 'B', 15)
        self.set_text_color(26, 43, 76) # navy #1a2b4c
        self.cell(0, 7, self.org_name, new_x='LMARGIN', new_y='NEXT')
        
        self.set_x(34)
        self.set_font('Mukta', '', 9.5)
        self.set_text_color(75, 85, 99) # gray-600
        subtitle = "इयत्ता ११ वी व १२ वी सायन्स आणि JEE / NEET मार्गदर्शन केंद्र (स्थापना १९१९)" if self.is_marathi else "Premier Junior College & Coaching Wing for Classes 11th & 12th (Est. 1919)"
        self.cell(0, 5, subtitle, new_x='LMARGIN', new_y='NEXT')

        self.set_x(34)
        doc_sub = f"दस्तावेज: {self.doc_title} | शैक्षणिक वर्ष २०२६-२७ | हेल्पलाईन: +९१ ७३८५८ ०३६४१" if self.is_marathi else f"Document: {self.doc_title} | Academic Year 2026-27 | Helpline: +91 73858 03641"
        self.set_font('Mukta', '', 8.5)
        self.set_text_color(100, 116, 139)
        self.cell(0, 4.5, doc_sub, new_x='LMARGIN', new_y='NEXT')

        # Decorative rule
        self.set_draw_color(37, 99, 235) # blue-600
        self.set_line_width(0.7)
        self.line(12, 28, 198, 28)
        self.ln(6)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.4)
        self.line(12, self.get_y(), 198, self.get_y())
        
        self.set_font('Mukta', '', 8)
        self.set_text_color(100, 116, 139)
        if self.is_marathi:
            foot_text = f"सांगली शिक्षण संस्था संकुल, गणपती मंदिरा जवळ, सांगली - ४१६४१६ | फोन: +९१ ७३८५८ ०३६४१ | पृष्ठ {self.page_no()}"
        else:
            foot_text = f"Sangli Shikshan Sanstha Campus, Near Ganpati Temple, Sangli - 416416 | Tel: +91 73858 03641 | Page {self.page_no()}"
        self.cell(0, 10, foot_text, align='C')

    def add_section_title(self, title):
        self.ln(2)
        self.set_fill_color(238, 242, 255) # light indigo
        self.set_draw_color(199, 210, 254)
        self.set_text_color(30, 58, 138) # dark blue
        self.set_font('Mukta', 'B', 12)
        self.cell(0, 8, f"  {title}", fill=True, border=1, new_x='LMARGIN', new_y='NEXT')
        self.ln(3)

    def add_subsection_title(self, title):
        self.set_font('Mukta', 'B', 10.5)
        self.set_text_color(30, 41, 59)
        self.cell(0, 6, title, new_x='LMARGIN', new_y='NEXT')
        self.ln(1)

    def add_bullet_point(self, bold_prefix, text):
        self.set_font('Mukta', 'B', 9.5)
        self.set_text_color(30, 41, 59)
        self.write(5, f"  • {bold_prefix} ")
        self.set_font('Mukta', '', 9.5)
        self.set_text_color(71, 85, 105)
        self.write(5, f"{text}\n")

    def add_paragraph(self, text):
        self.set_font('Mukta', '', 9.5)
        self.set_text_color(71, 85, 105)
        self.multi_cell(0, 5, text)
        self.ln(2)


# =============================================================================
# 1. GENERATE SYLLABUS & FEE GUIDE (ENGLISH & MARATHI)
# =============================================================================
def generate_syllabus_en(filepath):
    pdf = SansthaPDF("Syllabus & Course Curriculum Blueprint 2026-27", "SANGLI SHIKSHAN SANSTHA", is_marathi=False)
    pdf.add_page()
    
    pdf.add_section_title("1. CLASS 11TH SCIENCE FOUNDATION (PCM / PCB)")
    pdf.add_paragraph("A comprehensive 1-year conceptual mastery program preparing students for Maharashtra State Board, CBSE, ICSE, and base for JEE & NEET entrance exams.")
    pdf.add_bullet_point("Physics:", "Physical World, Units & Dimensions, Motion in a Plane, Laws of Motion, Work Energy Power, System of Particles & Rotational Motion, Gravitation, Mechanical Properties, Thermodynamics, Kinetic Theory, Oscillations & Waves.")
    pdf.add_bullet_point("Chemistry:", "Basic Concepts of Chemistry, Structure of Atom, Periodic Classification, Chemical Bonding, Thermodynamics, Equilibrium, Redox Reactions, Organic Chemistry Fundamentals & Hydrocarbons.")
    pdf.add_bullet_point("Mathematics:", "Sets & Functions, Complex Numbers, Linear Inequalities, Permutations & Combinations, Binomial Theorem, Sequences & Series, Straight Lines, Conic Sections, Calculus Introduction, Statistics.")
    pdf.add_bullet_point("Biology:", "Diversity of Living Organisms, Structural Organisation in Animals & Plants, Cell Structure & Function, Plant Physiology, Human Physiology (Digestion, Respiration, Circulation, Excretion).")
    pdf.add_bullet_point("Batch Shifts:", "Morning Shift: 6:30 AM – 8:30 AM | Evening Shift: 4:30 PM – 7:30 PM (Micro-batches: Max 15 students)")
    pdf.add_bullet_point("Tuition Fee:", "Rs. 4,600 / month | Quarterly: Rs. 12,696 | Annual (20% OFF): Rs. 44,160")

    pdf.add_section_title("2. CLASS 12TH SCIENCE BOARD BOOSTER & PRE-BOARD ACCELERATOR")
    pdf.add_paragraph("Targeted 95%+ Board Scoring curriculum with syllabus completion by October followed by rigorous 15-mock test simulation series and practical viva mentorship.")
    pdf.add_bullet_point("Physics:", "Rotational Dynamics, Mechanical Properties of Fluids, Kinetic Theory & Radiation, Thermodynamics, Wave Optics, Electrostatics, Current Electricity, Magnetic Fields, EMI & AC Circuits, Modern Physics & Semiconductor Devices.")
    pdf.add_bullet_point("Chemistry:", "Solid State, Solutions, Ionic Equilibria, Chemical Thermodynamics, Electrochemistry, Chemical Kinetics, Coordination Compounds, Halogen Derivatives, Alcohols, Phenols, Aldehydes, Ketones, Carboxylic Acids, Amines, Biomolecules.")
    pdf.add_bullet_point("Mathematics:", "Mathematical Logic, Matrices, Differentiation, Applications of Derivatives, Indefinite & Definite Integration, Differential Equations, Vectors, 3D Geometry, Linear Programming, Probability Distribution.")
    pdf.add_bullet_point("Biology:", "Reproduction in Plants & Animals, Genetics & Variation, Molecular Basis of Inheritance, Origin & Evolution, Plant Water Relations, Plant Growth, Control & Coordination, Biotechnology Applications.")
    pdf.add_bullet_point("15-Mock Series:", "Phase 1: Unit Mocks (Oct 15 - Nov 20) | Phase 2: Half Syllabus (Dec 1 - Dec 24) | Phase 3: Full 100% Board Mocks (Jan 5 - Jan 28).")
    pdf.add_bullet_point("Tuition Fee:", "Rs. 5,200 / month | Quarterly: Rs. 14,352 | Annual (20% OFF): Rs. 49,920")

    pdf.add_page()
    pdf.add_section_title("3. INTEGRATED JEE (MAIN + ADVANCED) 2-YEAR PROGRAM")
    pdf.add_paragraph("High-intensity engineering entrance curriculum synchronised seamlessly with senior secondary boards. Led by experienced ex-IITian mentors.")
    pdf.add_bullet_point("Curriculum:", "Complete 11th & 12th NTA JEE syllabus with 15,000+ graded difficulty problems (Levels 1, 2, 3), daily timed quizzes, and error log audit.")
    pdf.add_bullet_point("Mock Tests:", "Full NTA Computer-Based Test (CBT) portal simulation every Sunday with All-India benchmarking and chapter-wise percentile breakdown.")
    pdf.add_bullet_point("Tuition Fee:", "Rs. 6,500 / month | Quarterly: Rs. 17,940 | Annual (20% OFF): Rs. 62,400")

    pdf.add_section_title("4. INTEGRATED NEET-UG MEDICAL SUPER-20 PROGRAM")
    pdf.add_paragraph("Dedicated medical wing designed to secure 680+ marks in NEET-UG with micro-batch capping of only 15–20 candidates.")
    pdf.add_bullet_point("Curriculum:", "NCERT line-by-line mastery, high-yield Botany & Zoology diagram decoding, Physics numerical speed hacks, and physical chemistry calculations.")
    pdf.add_bullet_point("OMR Practice:", "Timed 200-question OMR bubble sheet simulations with negative marking minimization techniques.")
    pdf.add_bullet_point("Tuition Fee:", "Rs. 6,500 / month | Quarterly: Rs. 17,940 | Annual (20% OFF): Rs. 62,400")

    pdf.add_section_title("5. ADMISSION ENROLLMENT & ASSISTANCE")
    pdf.add_paragraph("Sangli Shikshan Sanstha provides a 100% Free 2-Day Trial Session before fee commitment. Apply online through our official portal or visit the campus admission desk.")
    pdf.add_bullet_point("Online Portal:", "https://n-bice.vercel.app/admission.html")
    pdf.add_bullet_point("Admissions Desk:", "Sangli Shikshan Sanstha Campus, Near Ganpati Temple, Sangli - 416416")
    pdf.add_bullet_point("Direct Hotline:", "+91 73858 03641 | WhatsApp: +91 73858 03641")

    pdf.output(filepath)
    print(f"Generated English Syllabus: {filepath}")


def generate_syllabus_mr(filepath):
    pdf = SansthaPDF("अभ्यासक्रम व फी मार्गदर्शक २०२६-२७", "सांगली शिक्षण संस्था", is_marathi=True)
    pdf.add_page()
    
    pdf.add_section_title("१. इयत्ता ११ वी सायन्स फाउंडेशन (PCM / PCB)")
    pdf.add_paragraph("महाराष्ट्र राज्य मंडळ, CBSE व ICSE बोर्डासह JEE व NEET प्रवेश परीक्षेची पायाभरणी करणारा १ वर्षाचा परिपूर्ण अभ्यासक्रम.")
    pdf.add_bullet_point("भौतिकशास्त्र (Physics):", "भौतिक जग, एकके व मापन, सरळ रेषेतील गती, गतीचे नियम, कार्य, ऊर्जा व शक्ती, गुरुत्वाकर्षण, उष्णता व थर्मोडायनॅमिक्स, ध्वनी व दोलन तरंग.")
    pdf.add_bullet_point("रसायनशास्त्र (Chemistry):", "मूलभूत संकल्पना, अणू रचना, मूलद्रव्यांचे आवर्ती वर्गीकरण, रासायनिक बंध, इक्विलिब्रियम, सेंद्रिय रसायनशास्त्राची मूलतत्त्वे व हायड्रोकार्बन्स.")
    pdf.add_bullet_point("गणित (Mathematics):", "संच व संबंध, त्रिकोणमितीय फलने, संमिश्र संख्या, क्रमचय व संचय, द्विपद सिद्धांत, श्रेणी, निर्देशक भूमिती, कलनशास्त्र (Calculus), सांख्यिकी.")
    pdf.add_bullet_point("जीवशास्त्र (Biology):", "सजीवांची विविधता, पेशी रचना व कार्य, वनस्पती शरीरक्रियाशास्त्र, मानवी शरीरशास्त्र (पचन, श्वसन, रक्ताभिसरण व उत्सर्जन).")
    pdf.add_bullet_point("बॅच वेळा:", "सकाळ सत्र: ६:३० ते ८:३० | संध्याकाळ सत्र: ४:३० ते ७:३० (प्रत्येक बॅचमध्ये जास्तीत जास्त १५ विद्यार्थी)")
    pdf.add_bullet_point("फी रचना:", "रु. ४,६०० / महिना | त्रैमासिक: रु. १२,६९६ | वार्षिक योजना (२०% सवलत): रु. ४४,१६०")

    pdf.add_section_title("२. इयत्ता १२ वी सायन्स बोर्ड बूस्टर व सराव परीक्षा मालिका")
    pdf.add_paragraph("बोर्ड परीक्षेत ९५%+ गुण मिळवण्यासाठी ऑक्टोबरपर्यंत संपूर्ण अभ्यासक्रम पूर्ण करून १५ दर्जेदार सराव परीक्षांचे आयोजन.")
    pdf.add_bullet_point("भौतिकशास्त्र (Physics):", "रोटेशनल डायनॅमिक्स, द्रव्यांचे यांत्रिक गुणधर्म, थर्मोडायनॅमिक्स, वेव्ह ऑप्टिक्स, इलेक्ट्रोस्टॅटिक्स, करंट इलेक्ट्रिसिटी, चुंबकीय परिणाम, सेमीकंडक्टर.")
    pdf.add_bullet_point("रसायनशास्त्र (Chemistry):", "सोल्युशन्स, इलेक्ट्रोकेमिस्ट्री, केमिकल कायनेटिक्स, कोऑर्डिनेशन कंपाउंड्स, हॅलोजन डेरिव्हेटिव्ह्ज, अल्कोहोल, अल्डीहाईड्स व बायोमॉलिक्युल्स.")
    pdf.add_bullet_point("गणित (Mathematics):", "मॅथेमॅटिकल लॉजिक, मॅट्रायसेस, डेरिव्हेटिव्ह्ज व त्याचे उपयोजन, इंटिग्रेशन, डिफरेंशियल इक्वेशन्स, वेक्टर्स, ३D भूमिती, संभाव्यता.")
    pdf.add_bullet_point("जीवशास्त्र (Biology):", "वनस्पती व प्राण्यांमधील प्रजनन, जनुकीय वारसा, आण्विक वारसा, बायोटेक्नॉलॉजी व मानवी कल्याण.")
    pdf.add_bullet_point("१५ सराव परीक्षा:", "टप्पा १: घटक चाचण्या (१५ ऑक्टो - २० नोव्हें) | टप्पा २: अर्ध अभ्यासक्रम (१ डिसें - २४ डिसें) | टप्पा ३: १००% संपूर्ण बोर्ड मॉक (५ जाने - २८ जाने).")
    pdf.add_bullet_point("फी रचना:", "रु. ५,२०० / महिना | त्रैमासिक: रु. १४,३५२ | वार्षिक योजना (२०% सवलत): रु. ४९,९२०")

    pdf.add_page()
    pdf.add_section_title("३. एकात्मिक JEE (मेन + ॲडव्हान्स) २-वर्षीय कार्यक्रम")
    pdf.add_paragraph("IIT, NIT व IIIT या नामांकित अभियांत्रिकी संस्थांमध्ये प्रवेश मिळवून देणारा अत्यंत प्रभावी व सखोल तयारी कार्यक्रम.")
    pdf.add_bullet_point("अभ्यासक्रम:", "इयत्ता ११ वी व १२ वी संपूर्ण NTA अभ्यासक्रम, १५,००० हून अधिक प्रश्न सोडवण्याचा सराव आणि दररोज शंका समाधान.")
    pdf.add_bullet_point("ऑनलाइन मॉक टेस्ट:", "NTA च्या धर्तीवर कॉम्प्युटर आधारित परीक्षा (CBT) सराव व अखिल भारतीय गुणवत्ता क्रमवारी विश्लेषण.")
    pdf.add_bullet_point("फी रचना:", "रु. ६,५०० / महिना | त्रैमासिक: रु. १७,९४० | वार्षिक योजना (२०% सवलत): रु. ६२,४००")

    pdf.add_section_title("४. एकात्मिक NEET-UG मेडिकल सुपर-२० कार्यक्रम")
    pdf.add_paragraph("AIIMS, JIPMER आणि सरकारी मेडिकल कॉलेजेसमध्ये MBBS प्रवेश मिळवण्यासाठी ६८०+ गुणांचे उद्दिष्ट ठेवणारा विशेष वर्ग.")
    pdf.add_bullet_point("अभ्यासक्रम:", "NCERT चे सखोल ओळ-न्-ओळ वाचन, बॉटनी व झूलॉजीच्या महत्त्वाच्या आकृत्या, व निगेटिव्ह मार्किंग टाळण्याच्या ट्रिक्स.")
    pdf.add_bullet_point("OMR सराव:", "प्रत्यक्ष परीक्षेच्या वेळेत २०० प्रश्नांच्या OMR उत्तरपत्रिका सोडवण्याचा सराव व चुकांचे वैयक्तिक विश्लेषण.")
    pdf.add_bullet_point("फी रचना:", "रु. ६,५०० / महिना | त्रैमासिक: रु. १७,९४० | वार्षिक योजना (२०% सवलत): रु. ६२,४००")

    pdf.add_section_title("५. प्रवेश नोंदणी व संपर्क")
    pdf.add_paragraph("सांगली शिक्षण संस्था फी भरण्यापूर्वी २ दिवसांचे १००% मोफत ट्रायल सेशन उपलब्ध करून देते. अधिक माहितीसाठी संपर्क करा.")
    pdf.add_bullet_point("ऑनलाइन अर्ज:", "https://n-bice.vercel.app/admission.html")
    pdf.add_bullet_point("कार्यालय:", "सांगली शिक्षण संस्था संकुल, गणपती मंदिरा जवळ, सांगली - ४१६४१६")
    pdf.add_bullet_point("थेट संपर्क:", "+९१ ७३८५८ ०३६४१ | व्हॉट्सॲप: +९१ ७३८५८ ०३६४१")

    pdf.output(filepath)
    print(f"Generated Marathi Syllabus: {filepath}")


# =============================================================================
# 2. GENERATE OFFICIAL FEE SHEET (ENGLISH & MARATHI)
# =============================================================================
def generate_feesheet_en(filepath):
    pdf = SansthaPDF("Official Tuition Fee Structure 2026-27", "SANGLI SHIKSHAN SANSTHA", is_marathi=False)
    pdf.add_page()
    
    pdf.add_section_title("APPROVED UNIFORM TUITION FEE SCHEDULE (SESSION 2026-27)")
    pdf.add_paragraph("Sangli Shikshan Sanstha maintains 100% transparent and uniform pricing for all students. No admission hidden charges, no mandatory costly tablet bundles, and zero donation.")

    # Table Header
    pdf.set_fill_color(30, 58, 138)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Mukta', 'B', 10)
    pdf.cell(75, 8, "  Academic Program / Track", fill=True, border=1)
    pdf.cell(35, 8, "Monthly Fee", fill=True, border=1, align='C')
    pdf.cell(38, 8, "Quarterly (8% Off)", fill=True, border=1, align='C')
    pdf.cell(38, 8, "Annual (20% Off)", fill=True, border=1, align='C', new_x='LMARGIN', new_y='NEXT')

    # Table Rows
    rows = [
        ("Class 11th Science Foundation (PCM/PCB)", "Rs. 4,600 / mo", "Rs. 12,696 / qtr", "Rs. 44,160 / yr"),
        ("Class 12th Science Board Booster + CUET", "Rs. 5,200 / mo", "Rs. 14,352 / qtr", "Rs. 49,920 / yr"),
        ("Integrated JEE Main & Advanced (2-Yr)", "Rs. 6,500 / mo", "Rs. 17,940 / qtr", "Rs. 62,400 / yr"),
        ("Integrated NEET-UG Medical Super-20", "Rs. 6,500 / mo", "Rs. 17,940 / qtr", "Rs. 62,400 / yr"),
    ]
    
    pdf.set_text_color(30, 41, 59)
    for i, (course, m, q, a) in enumerate(rows):
        bg = (248, 250, 252) if i % 2 == 0 else (255, 255, 255)
        pdf.set_fill_color(*bg)
        pdf.set_font('Mukta', 'B' if 'JEE' in course or 'NEET' in course else '', 9)
        pdf.cell(75, 7.5, f"  {course}", fill=True, border=1)
        pdf.set_font('Mukta', '', 9)
        pdf.cell(35, 7.5, m, fill=True, border=1, align='C')
        pdf.cell(38, 7.5, q, fill=True, border=1, align='C')
        pdf.set_font('Mukta', 'B', 9)
        pdf.cell(38, 7.5, a, fill=True, border=1, align='C', new_x='LMARGIN', new_y='NEXT')

    pdf.ln(4)
    pdf.add_section_title("ALL-INCLUSIVE TUITION PERKS (ZERO HIDDEN EXTRAS)")
    pdf.add_bullet_point("Comprehensive Study Material:", "High-yield printed theory notes, solved derivations, formula master charts, and question banks.")
    pdf.add_bullet_point("15-Mock Pre-Board Exam Series:", "Actual exam simulations evaluated with detailed marking criteria and individual improvement sheets.")
    pdf.add_bullet_point("Daily 1-on-1 Doubt Clinic:", "Dedicated faculty available daily from 4:30 PM to 6:30 PM for personal query resolution.")
    pdf.add_bullet_point("Parent Real-Time Sync:", "Attendance logs, weekly test scores, and performance analytics shared directly with parents via SMS & WhatsApp.")

    pdf.add_section_title("PAYMENT MODES & EASY EMI")
    pdf.add_bullet_point("Accepted Modes:", "UPI (Google Pay, PhonePe, Paytm), Net Banking, NEFT/RTGS, Cheque, and Credit/Debit Cards.")
    pdf.add_bullet_point("No-Cost EMI:", "0% Interest monthly installment options available in 6-month and 9-month plans with partner banks.")
    pdf.add_bullet_point("Inquiries Desk:", "Sangli Shikshan Sanstha, Near Ganpati Temple, Sangli | Phone: +91 73858 03641")

    pdf.output(filepath)
    print(f"Generated English Fee Sheet: {filepath}")


def generate_feesheet_mr(filepath):
    pdf = SansthaPDF("अधिकृत ट्युशन फी वेळापत्रक २०२६-२७", "सांगली शिक्षण संस्था", is_marathi=True)
    pdf.add_page()
    
    pdf.add_section_title("मंजूर एकसमान शैक्षणिक फी रचना (शैक्षणिक वर्ष २०२६-२७)")
    pdf.add_paragraph("सांगली शिक्षण संस्था सर्व विद्यार्थ्यांसाठी १००% पारदर्शक व एकसमान फी आकारते. कोणतीही गुप्त फी, सक्तीचे टॅबलेट बंडल किंवा डोनेशन आकारले जात नाही.")

    # Table Header
    pdf.set_fill_color(30, 58, 138)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Mukta', 'B', 10)
    pdf.cell(75, 8, "  शैक्षणिक अभ्यासक्रम / वर्ग", fill=True, border=1)
    pdf.cell(35, 8, "मासिक फी", fill=True, border=1, align='C')
    pdf.cell(38, 8, "त्रैमासिक (८% सवलत)", fill=True, border=1, align='C')
    pdf.cell(38, 8, "वार्षिक (२०% सवलत)", fill=True, border=1, align='C', new_x='LMARGIN', new_y='NEXT')

    # Table Rows
    rows = [
        ("इयत्ता ११ वी सायन्स फाउंडेशन (PCM/PCB)", "रु. ४,६०० / महिना", "रु. १२,६९६ / त्रैमासिक", "रु. ४४,१६० / वर्ष"),
        ("इयत्ता १२ वी सायन्स बोर्ड बूस्टर + CUET", "रु. ५,२०० / महिना", "रु. १४,३५२ / त्रैमासिक", "रु. ४९,९२० / वर्ष"),
        ("एकात्मिक JEE (मेन + ॲडव्हान्स) २-वर्षीय", "रु. ६,५०० / महिना", "रु. १७,९४० / त्रैमासिक", "रु. ६२,४०० / वर्ष"),
        ("एकात्मिक NEET-UG मेडिकल सुपर-२०", "रु. ६,५०० / महिना", "रु. १७,९४० / त्रैमासिक", "रु. ६२,४०० / वर्ष"),
    ]
    
    pdf.set_text_color(30, 41, 59)
    for i, (course, m, q, a) in enumerate(rows):
        bg = (248, 250, 252) if i % 2 == 0 else (255, 255, 255)
        pdf.set_fill_color(*bg)
        pdf.set_font('Mukta', 'B' if 'JEE' in course or 'NEET' in course else '', 9)
        pdf.cell(75, 7.5, f"  {course}", fill=True, border=1)
        pdf.set_font('Mukta', '', 9)
        pdf.cell(35, 7.5, m, fill=True, border=1, align='C')
        pdf.cell(38, 7.5, q, fill=True, border=1, align='C')
        pdf.set_font('Mukta', 'B', 9)
        pdf.cell(38, 7.5, a, fill=True, border=1, align='C', new_x='LMARGIN', new_y='NEXT')

    pdf.ln(4)
    pdf.add_section_title("फी मध्ये समाविष्ट सर्व सुविधा (शून्य लपवलेले शुल्क)")
    pdf.add_bullet_point("संपूर्ण छापील अभ्यास साहित्य:", "थिएरी नोट्स, सोडवलेली उदाहरणे, सूत्र तक्ते आणि प्रश्न संच मोफत दिले जातात.")
    pdf.add_bullet_point("१५ बोर्ड सराव परीक्षा मालिका:", "बोर्डाच्या धर्तीवर परीक्षा घेऊन गुणदान व वैयक्तिक मार्गदर्शन केले जाते.")
    pdf.add_bullet_point("दररोज वैयक्तिक शंका समाधान:", "शिक्षकांकडून दररोज संध्याकाळी ४:३० ते ६:३० या वेळेत विद्यार्थ्यांच्या शंकांचे निरसन.")
    pdf.add_bullet_point("पालकांसाठी थेट अपडेट्स:", "विद्यार्थ्यांची उपस्थिती व चाचणी परीक्षांचे गुण पालकांना SMS व व्हॉट्सॲपवर नियमित पाठवले जातात.")

    pdf.add_section_title("फी भरण्याचे पर्याय व ०% व्याजदर EMI")
    pdf.add_bullet_point("स्वीकार्य पद्धती:", "UPI (Google Pay, PhonePe), नेट बँकिंग, धनादेश (Cheque) आणि कार्ड पेमेंट्स.")
    pdf.add_bullet_point("०% व्याजदर हप्ते:", "६ महिने व ९ महिन्यांचे सुलभ मासिक हप्ते उपलब्ध.")
    pdf.add_bullet_point("प्रवेश चौकशी कक्ष:", "सांगली शिक्षण संस्था संकुल, गणपती मंदिरा जवळ, सांगली | संपर्क: +९१ ७३८५८ ०३६४१")

    pdf.output(filepath)
    print(f"Generated Marathi Fee Sheet: {filepath}")


# =============================================================================
# 3. GENERATE ADMISSION PROSPECTUS (ENGLISH & MARATHI)
# =============================================================================
def generate_prospectus_en(filepath):
    pdf = SansthaPDF("Official Admission Prospectus 2026-27", "SANGLI SHIKSHAN SANSTHA", is_marathi=False)
    pdf.add_page()
    
    pdf.add_section_title("1. INSTITUTION HERITAGE & PHILOSOPHY")
    pdf.add_paragraph("Established in 1919, Sangli Shikshan Sanstha has stood as a beacon of academic excellence for over a century. Our Classes 11th & 12th Senior Secondary & Competitive Coaching Wing delivers world-class conceptual coaching, disciplined mentorship, and compassionate guidance to students across Sangli and surrounding regions.")
    pdf.add_bullet_point("Strict Micro-Batch Limit:", "Strictly capped at 15 to 18 students per batch. Every student is known personally by our teachers.")
    pdf.add_bullet_point("1-on-1 Daily Doubt Clinic:", "Mentors available every evening to clear conceptual blockages without fear or hesitation.")
    pdf.add_bullet_point("Senior Faculty:", "14+ years of proven coaching experience from premier institutions.")
    pdf.add_bullet_point("Diagnostic Assessment:", "Every prospective student undergoes diagnostic profiling to identify individual strengths and focus areas.")

    pdf.add_section_title("2. PROVEN PERFORMANCE RECORD")
    pdf.add_bullet_point("99.4% Board Pass Rate:", "Over 74% of our students secure Distinction (>85%) in board examinations.")
    pdf.add_bullet_point("+24.6% Average Score Improvement:", "Noticeable jump in conceptual clarity and test scores within 90 days.")
    pdf.add_bullet_point("Consistent Top Ranks:", "Top city and state rankers across CBSE, ICSE, and Maharashtra State Board.")

    pdf.add_section_title("3. ADMISSION PATHWAY (4 SIMPLE STEPS)")
    pdf.add_bullet_point("Step 1: Online Application:", "Fill the online application form on our portal to obtain an Application Reference ID.")
    pdf.add_bullet_point("Step 2: Free Diagnostic Assessment:", "Take a 60-minute conceptual check to understand learning gaps (100% Free).")
    pdf.add_bullet_point("Step 3: Academic Counseling:", "Personal meeting with our senior academic counselor to choose batch shifts.")
    pdf.add_bullet_point("Step 4: Seat Confirmation:", "Receive welcome study kit, timetable, and batch allotment letter.")

    pdf.add_page()
    pdf.add_section_title("4. ACADEMIC PROGRAMS OVERVIEW")
    pdf.add_bullet_point("Class 11th Science Foundation:", "Physics, Chemistry, Math & Biology with rigorous foundation. Fee: Rs. 4,600 / mo.")
    pdf.add_bullet_point("Class 12th Science Board Booster:", "Complete board readiness + 15 Mock Examinations. Fee: Rs. 5,200 / mo.")
    pdf.add_bullet_point("Integrated JEE Main & Advanced:", "2-Year engineering target track with CBT portal simulations. Fee: Rs. 6,500 / mo.")
    pdf.add_bullet_point("Integrated NEET-UG Medical Super-20:", "Strictly 20 students target AIIMS / GMC. Fee: Rs. 6,500 / mo.")

    pdf.add_section_title("5. MERIT SCHOLARSHIP SLABS (SESSION 2026-27)")
    pdf.add_bullet_point("Star Merit (95%+ Previous Exam):", "30% Tuition Fee Concession.")
    pdf.add_bullet_point("Super Merit (90% - 94.9%):", "20% Tuition Fee Concession.")
    pdf.add_bullet_point("Merit Award (80% - 89.9%):", "15% Tuition Fee Concession.")
    pdf.add_bullet_point("Early Bird Enrollment:", "Direct 8% fee waiver for applications completed this week.")

    pdf.add_section_title("6. CAMPUS HELPLINE & OFFICE HOURS")
    pdf.add_paragraph("Campus Address: Sangli Shikshan Sanstha Campus, Near Ganpati Temple, Sangli - 416416, Maharashtra")
    pdf.add_bullet_point("Office Hours:", "Monday to Saturday: 8:00 AM - 8:30 PM | Sunday: 9:00 AM - 2:00 PM")
    pdf.add_bullet_point("Admissions Telephone:", "+91 73858 03641 | WhatsApp: +91 73858 03641")
    pdf.add_bullet_point("Portal:", "https://n-bice.vercel.app/admission.html")

    pdf.output(filepath)
    print(f"Generated English Prospectus: {filepath}")


def generate_prospectus_mr(filepath):
    pdf = SansthaPDF("अधिकृत माहितीपुस्तिका २०२६-२७", "सांगली शिक्षण संस्था", is_marathi=True)
    pdf.add_page()
    
    pdf.add_section_title("१. संस्थेचा गौरवशाली वारसा व उद्दिष्ट")
    pdf.add_paragraph("१९१९ मध्ये स्थापन झालेली 'सांगली शिक्षण संस्था' गेल्या शतकाहून अधिक काळ शिक्षण क्षेत्रात विश्वासाचे प्रतीक राहिली आहे. आमचा इयत्ता ११ वी व १२ वी सायन्स आणि JEE/NEET विभाग प्रत्येक विद्यार्थ्याला उत्कृष्ट मार्गदर्शन आणि संस्कारक्षम शिक्षण देण्यास कटिबद्ध आहे.")
    pdf.add_bullet_point("मर्यादित मायक्रो-बॅच क्षमता:", "प्रत्येक बॅचमध्ये फक्त १५ ते १८ विद्यार्थी. यामुळे शिक्षकांचे प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष राहते.")
    pdf.add_bullet_point("दररोज वैयक्तिक शंका समाधान:", "कोणतीही भीती न बाळगता विषयातील शंकांचे निरसन करण्यासाठी दररोज विशेष वेळ.")
    pdf.add_bullet_point("अनुभवी प्राध्यापक वर्ग:", "१४+ वर्षांचा दांडगा अनुभव असणारे तज्ज्ञ प्राध्यापक.")
    pdf.add_bullet_point("मोफत मूल्यमापन परीक्षा:", "विद्यार्थ्यांची वैचारिक पकड समजून घेण्यासाठी सुरुवातीला १००% मोफत चाचणी.")

    pdf.add_section_title("२. दैदिप्यमान निकालांची परंपरा")
    pdf.add_bullet_point("९९.४% बोर्ड निकाल:", "७४% हून अधिक विद्यार्थ्यांना डिस्टिंक्शन (>८५%) गुण.")
    pdf.add_bullet_point("+२४.६% गुणांमध्ये सरासरी वाढ:", "३ महिन्यांत विद्यार्थ्यांच्या संकल्पनात्मक ज्ञानात व गुणांमध्ये भरीव सुधारणा.")
    pdf.add_bullet_point("अव्वल रँकर्स:", "CBSE, ICSE व महाराष्ट्र राज्य मंडळात सातत्याने शहर व राज्य पातळीवर अव्वल विद्यार्थी.")

    pdf.add_section_title("३. सोपी ४-टप्प्यांची प्रवेश प्रक्रिया")
    pdf.add_bullet_point("टप्पा १: ऑनलाइन अर्ज:", "आमच्या वेबसाइटवर जाऊन ऑनलाइन अर्ज भरा व संदर्भ क्रमांक मिळवा.")
    pdf.add_bullet_point("टप्पा २: मोफत चाचणी सत्र:", "विद्यार्थ्याची अभ्यासातील तयारी समजण्यासाठी ६० मिनिटांची मोफत चाचणी.")
    pdf.add_bullet_point("टप्पा ३: समुपदेशन व बॅच निवड:", "पालकांसह वरिष्ठ मार्गदर्शकांशी चर्चा करून सोयीस्कर बॅच वेळ ठरवा.")
    pdf.add_bullet_point("टप्पा ४: प्रवेश निश्चिती:", "स्टडी किट, वेळापत्रक आणि ओळखपत्र मिळवून अभ्यासाची सुरुवात करा.")

    pdf.add_page()
    pdf.add_section_title("४. उपलब्ध शैक्षणिक अभ्यासक्रम")
    pdf.add_bullet_point("इयत्ता ११ वी सायन्स फाउंडेशन:", "भौतिकशास्त्र, रसायनशास्त्र, गणित व जीवशास्त्र पायाभूत तयारी. फी: रु. ४,६०० / महिना.")
    pdf.add_bullet_point("इयत्ता १२ वी सायन्स बोर्ड बूस्टर:", "संपूर्ण बोर्ड तयारी + १५ सराव परीक्षा. फी: रु. ५,२०० / महिना.")
    pdf.add_bullet_point("एकात्मिक JEE मेन व ॲडव्हान्स:", "२-वर्षीय अभियांत्रिकी प्रवेश परीक्षा तयारी. फी: रु. ६,५०० / महिना.")
    pdf.add_bullet_point("एकात्मिक NEET-UG मेडिकल सुपर-२०:", "फक्त २० विद्यार्थ्यांची विशेष बॅच - MBBS उद्दिष्ट. फी: रु. ६,५०० / महिना.")

    pdf.add_section_title("५. गुणवत्ता शिष्यवृत्ती योजना (२०२६-२७)")
    pdf.add_bullet_point("स्टार मेरिट (मागील परीक्षेत ९५%+ गुण):", "फी मध्ये ३०% थेट सवलत.")
    pdf.add_bullet_point("सुपर मेरिट (९०% ते ९४.९% गुण):", "फी मध्ये २०% सवलत.")
    pdf.add_bullet_point("मेरिट शिष्यवृत्ती (८०% ते ८९.९% गुण):", "फी मध्ये १५% सवलत.")
    pdf.add_bullet_point("अर्ली बर्ड प्रवेश सवलत:", "चालू आठवड्यात प्रवेश घेणाऱ्या सर्व विद्यार्थ्यांना ८% थेट सूट.")

    pdf.add_section_title("६. कार्यालयीन वेळ व संपर्क पत्ता")
    pdf.add_paragraph("पत्ता: सांगली शिक्षण संस्था संकुल, गणपती मंदिरा जवळ, सांगली - ४१६४१६, महाराष्ट्र")
    pdf.add_bullet_point("कार्यालयीन वेळ:", "सोमवार ते शनिवार: सकाळी ८:०० ते रात्री ८:३० | रविवार: सकाळी ९:०० ते दुपारी २:००")
    pdf.add_bullet_point("थेट दूरध्वनी:", "+९१ ७३८५८ ०३६४१ | व्हॉट्सॲप: +९१ ७३८५८ ०३६४१")
    pdf.add_bullet_point("वेबसाइट:", "https://n-bice.vercel.app/admission.html")

    pdf.output(filepath)
    print(f"Generated Marathi Prospectus: {filepath}")


if __name__ == '__main__':
    # 1. Syllabus & Fee Guide
    generate_syllabus_en("Sangli_Shikshan_Sanstha_Class11_12_Syllabus_Guide.pdf")
    generate_syllabus_mr("Sangli_Shikshan_Sanstha_Syllabus_Guide_Marathi.pdf")
    # Also maintain old filename for legacy link compatibility
    shutil.copy("Sangli_Shikshan_Sanstha_Class11_12_Syllabus_Guide.pdf", "Apex_Scholars_Class11_12_Syllabus_Guide.pdf")

    # 2. Fee Sheet
    generate_feesheet_en("Sangli_Shikshan_Sanstha_Official_Fee_Sheet.pdf")
    generate_feesheet_mr("Sangli_Shikshan_Sanstha_Fee_Sheet_Marathi.pdf")
    shutil.copy("Sangli_Shikshan_Sanstha_Official_Fee_Sheet.pdf", "Apex_Scholars_Official_Fee_Sheet.pdf")

    # 3. Prospectus
    generate_prospectus_en("Sangli_Shikshan_Sanstha_Prospectus_2026-27.pdf")
    generate_prospectus_mr("Sangli_Shikshan_Sanstha_Prospectus_Marathi.pdf")
    shutil.copy("Sangli_Shikshan_Sanstha_Prospectus_2026-27.pdf", "Apex_Scholars_Prospectus_2026-27.pdf")

    print("\nAll 6 bilingual PDFs generated successfully!")
