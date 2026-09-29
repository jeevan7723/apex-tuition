# Script to generate authentic, multi-page PDF documents for Apex Scholars Academy

def create_multipage_pdf(filename, title, pages_data):
    """
    pages_data is a list of lists of strings (lines for each page)
    """
    objects = []
    
    # We will construct:
    # Obj 1: Catalog
    # Obj 2: Pages
    # Objs 3 to 3+N-1: Page objects
    # Objs 3+N to 3+2N-1: Content stream objects
    # Font 1 and Font 2
    
    num_pages = len(pages_data)
    page_obj_ids = [3 + i for i in range(num_pages)]
    stream_obj_ids = [3 + num_pages + i for i in range(num_pages)]
    font1_id = 3 + 2 * num_pages
    font2_id = 3 + 2 * num_pages + 1
    total_objs = 3 + 2 * num_pages + 1
    
    catalog_obj = f"<< /Type /Catalog /Pages 2 0 R >>".encode("latin1")
    kids_str = " ".join([f"{pid} 0 R" for pid in page_obj_ids])
    pages_obj = f"<< /Type /Pages /Kids [{kids_str}] /Count {num_pages} >>".encode("latin1")
    
    page_objs = []
    for i in range(num_pages):
        stream_id = stream_obj_ids[i]
        p_obj = f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents {stream_id} 0 R /Resources << /Font << /F1 {font1_id} 0 R /F2 {font2_id} 0 R >> >> >>".encode("latin1")
        page_objs.append(p_obj)
        
    stream_objs = []
    for page_num, lines in enumerate(pages_data):
        stream_commands = [
            "BT",
            f"/F1 16 Tf",
            "50 740 Td",
            f"({title}) Tj",
            "/F2 9 Tf",
            "0 -16 Td",
            "(APEX SCHOLARS ACADEMY - PREMIER COACHING FOR CLASSES 11TH & 12TH) Tj",
            "0 -14 Td",
            f"(Document: Official Publication | Page {page_num + 1} of {num_pages} | Helpline: +91 73858 03641) Tj",
            "0 -8 Td",
            "(/F1 1 Tf) Tj", # dummy
            "0 -18 Td"
        ]
        
        for line in lines:
            safe = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
            if safe.startswith("# "):
                header = safe[2:]
                stream_commands.append(f"/F1 14 Tf 0 -22 Td ({header}) Tj")
            elif safe.startswith("## "):
                header = safe[3:]
                stream_commands.append(f"/F1 11 Tf 0 -18 Td ({header}) Tj")
            elif safe.startswith("### "):
                header = safe[4:]
                stream_commands.append(f"/F1 10 Tf 0 -15 Td ({header}) Tj")
            elif safe.strip() == "":
                stream_commands.append("0 -10 Td")
            else:
                stream_commands.append(f"/F2 9.5 Tf 0 -13 Td ({safe}) Tj")
                
        # Footer
        stream_commands.append(f"/F2 8 Tf 0 -25 Td (Apex Scholars Academy • 402 Excellence Tower, Knowledge Park • contact@apexscholars.edu • +91 73858 03641) Tj")
        stream_commands.append("ET")
        
        stream_bytes = "\n".join(stream_commands).encode("latin1", "replace")
        s_obj = f"<< /Length {len(stream_bytes)} >>\nstream\n".encode("latin1") + stream_bytes + b"\nendstream"
        stream_objs.append(s_obj)
        
    font1_obj = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>".encode("latin1")
    font2_obj = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>".encode("latin1")
    
    all_objs = [catalog_obj, pages_obj] + page_objs + stream_objs + [font1_obj, font2_obj]
    
    pdf_bytes = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = []
    
    for i, obj in enumerate(all_objs):
        offsets.append(len(pdf_bytes))
        header = f"{i+1} 0 obj\n".encode("latin1")
        footer = b"\nendobj\n"
        pdf_bytes.extend(header + obj + footer)
        
    xref_offset = len(pdf_bytes)
    xref = [
        f"xref\n0 {len(all_objs)+1}\n",
        "0000000000 65535 f \n"
    ]
    for off in offsets:
        xref.append(f"{off:010d} 00000 n \n")
        
    trailer = f"trailer\n<< /Size {len(all_objs)+1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n"
    pdf_bytes.extend("".join(xref).encode("latin1") + trailer.encode("latin1"))
    
    with open(filename, "wb") as f:
        f.write(pdf_bytes)
    print(f"Generated {filename}: {num_pages} pages, {len(pdf_bytes)} bytes.")


# 1. PROSPECTUS 2026-27
prospectus_p1 = [
    "# ADMISSION PROSPECTUS & ACADEMIC BROCHURE 2026-27",
    "Apex Scholars Academy - Senior Secondary & Competitive Coaching Wing",
    "",
    "## 1. INSTITUTION OVERVIEW & PHILOSOPHY",
    "Apex Scholars Academy is an elite coaching institute dedicated exclusively to",
    "Classes 11th and 12th students aspiring for 95%+ Board Exam excellence and top ranks",
    "in competitive examinations like JEE (Main + Advanced), NEET-UG, and CUET.",
    "",
    "- Strict Micro-Batch Size: Every batch is strictly capped at 15 to 18 students.",
    "- 1-on-1 Daily Doubt Resolution Desk: Mentors available daily from 4:30 PM to 6:30 PM.",
    "- Senior Faculty: 14+ years of proven coaching experience from IIT, NIT, and medical colleges.",
    "- Diagnostic & Aptitude Profiling: Every student undergoes personalized baseline assessment.",
    "",
    "## 2. PROVEN TRACK RECORD & PERFORMANCE HIGHLIGHTS",
    "- 99.4% Board Pass Rate with over 72% students securing distinction (>85%).",
    "- Average improvement of +24.6% in marks within 4 months of structured coaching.",
    "- Over 1,200 successful alumni admitted to prestigious engineering, medical, and commerce colleges.",
    "- School & State Rankers across CBSE, ISC, and State Board examinations.",
    "",
    "## 3. ADMISSION PROCESS (4 SYSTEMATIC STEPS)",
    "Step 1: Online Inquiry & Seat Reservation (submit online application form).",
    "Step 2: Diagnostic & Aptitude Assessment (60-minute conceptual test with instant score card).",
    "Step 3: Academic Counseling & Batch Selection (guidance with senior academic counselor).",
    "Step 4: Formal Seat Allocation & Welcome Kit Handover (course booklets, timetable, portal login)."
]

prospectus_p2 = [
    "# PROGRAM CURRICULUM FOR CLASSES 11TH & 12TH",
    "",
    "## A. CLASS 11TH SCIENCE FOUNDATION (PCM / PCB)",
    "- Core Subjects: Physics, Chemistry, Pure Mathematics, Biology",
    "- Focus: Calculus fundamentals, Kinematics, Organic nomenclature, and Cell biology.",
    "- Shifts: Morning (6:30 AM - 8:30 AM) | Evening (4:30 PM - 7:30 PM)",
    "- Fee: Rs. 4,600 / month (Annual package Rs. 44,160 with 20% savings)",
    "",
    "## B. CLASS 11TH COMMERCE EXCELLENCE & APPLIED MATH",
    "- Core Subjects: Financial Accountancy, Microeconomics, Statistics & Business Studies",
    "- Focus: Double-entry bookkeeping, ledger mastery, and economic models.",
    "- Shifts: Morning (6:30 AM - 8:00 AM) | Evening (5:00 PM - 7:30 PM)",
    "- Fee: Rs. 4,200 / month (Annual package Rs. 40,320 with 20% savings)",
    "",
    "## C. CLASS 12TH SCIENCE BOARD BOOSTER & CUET PREP",
    "- Core Subjects: Physics, Chemistry, Mathematics, Biology (Complete Board Syllabus)",
    "- Focus: Syllabus completion by October, 15 pre-board mock series, and practical training.",
    "- Shifts: Morning (6:30 AM - 8:30 AM) | Evening (4:30 PM - 7:30 PM)",
    "- Fee: Rs. 5,200 / month (Annual package Rs. 49,920 with 20% savings)",
    "",
    "## D. CLASS 12TH COMMERCE MASTERY & CA FOUNDATION TRACK",
    "- Core Subjects: Company Accountancy, Macroeconomics, Indian Economy, Business Law Intro",
    "- Focus: Balance sheet workshops, past 10-year question banks, and case studies.",
    "- Shifts: Morning (6:30 AM - 8:00 AM) | Evening (5:00 PM - 7:30 PM)",
    "- Fee: Rs. 4,500 / month (Annual package Rs. 43,200 with 20% savings)"
]

prospectus_p3 = [
    "# COMPETITIVE WINGS & SCHOLARSHIPS 2026-27",
    "",
    "## E. INTEGRATED JEE (MAIN + ADVANCED) 2-YEAR PROGRAM",
    "- Designed for Class 11th & 12th engineering aspirants targeting IITs, NITs, and IIITs.",
    "- Weekly NTA Computer-Based Test (CBT) portal simulation with All-India percentile rank.",
    "- Over 15,000 multi-level practice problems with step-by-step video solutions.",
    "- Fee: Rs. 6,500 / month (Annual package Rs. 62,400 with 20% savings)",
    "",
    "## F. INTEGRATED NEET-UG MEDICAL SUPER-20 PROGRAM",
    "- Specialized classroom training for aspiring doctors targeting AIIMS, JIPMER, and top GMCs.",
    "- NCERT line-by-line decoding, negative marking elimination drills, and 200+ timed tests.",
    "- OMR bubble sheet practice with individual mistake-register audits.",
    "- Fee: Rs. 6,500 / month (Annual package Rs. 62,400 with 20% savings)",
    "",
    "## APEX MERIT SCHOLARSHIP SLABS (SESSION 2026-27)",
    "- Star Merit Scholarship: 95%+ in Previous Class -> 30% Tuition Fee Waiver",
    "- Super Merit Scholarship: 90% - 94.9% -> 20% Tuition Fee Waiver",
    "- Merit Scholarship: 80% - 89.9% -> 15% Tuition Fee Waiver",
    "- Early Bird Registration: Before Admissions Deadline -> 8% Direct Waiver",
    "",
    "## CAMPUS & CONTACT HELPLINE",
    "- Address: Apex Scholars Academy, 402 Excellence Tower, Knowledge Park, Central Avenue",
    "- Admissions Hotline: +91 73858 03641",
    "- Official WhatsApp Desk: +91 73858 03641 (24x7 Quick Assistance)",
    "- Email: admissions@apexscholars.edu | Website: http://localhost:8080"
]

create_multipage_pdf("Apex_Scholars_Prospectus_2026-27.pdf", "APEX SCHOLARS ACADEMY - PROSPECTUS 2026-27", [prospectus_p1, prospectus_p2, prospectus_p3])


# 2. SYLLABUS & FEE GUIDE 2026-27
syllabus_p1 = [
    "# COMPLETE SUBJECT SYLLABUS & CURRICULUM ROADMAP",
    "Classes 11th & 12th Senior Secondary Wings (CBSE / ISC / State Board)",
    "",
    "## CLASS 11TH SCIENCE SYLLABUS OVERVIEW",
    "- Physics: Physical World, Units & Measurements, Motion in a Straight Line / Plane,",
    "  Laws of Motion, Work Energy & Power, Rotational Motion, Gravitation, Thermodynamics.",
    "- Chemistry: Some Basic Concepts of Chemistry, Structure of Atom, Periodic Classification,",
    "  Chemical Bonding & Molecular Structure, Chemical Thermodynamics, Equilibrium, Organic Chemistry.",
    "- Mathematics: Sets, Relations & Functions, Trigonometric Functions, Complex Numbers,",
    "  Linear Inequalities, Permutations & Combinations, Binomial Theorem, Sequences, Calculus.",
    "- Biology: Living World, Biological Classification, Plant Kingdom, Animal Kingdom, Cell Cycle,",
    "  Plant Physiology, Human Physiology (Digestion, Circulation, Excretion, Locomotion).",
    "",
    "## CLASS 11TH COMMERCE SYLLABUS OVERVIEW",
    "- Accountancy: Accounting Principles, Accounting Equation, Journal, Ledger, Cash Book,",
    "  Bank Reconciliation Statement, Trial Balance, Depreciation, Provisions, Financial Statements.",
    "- Microeconomics: Consumer Equilibrium, Demand, Elasticity of Demand, Production Function,",
    "  Cost Concepts, Revenue, Producer Equilibrium, Supply, Market Mechanisms.",
    "- Business Studies: Nature & Purpose of Business, Forms of Business Organisation,",
    "  Public & Private Enterprises, Business Services, Emerging Modes, Sources of Finance."
]

syllabus_p2 = [
    "# CLASS 12TH BOARD SYLLABUS & PRE-BOARD SCHEDULE",
    "",
    "## CLASS 12TH SCIENCE BOARD BOOSTER SYLLABUS",
    "- Physics: Electrostatics, Current Electricity, Magnetic Effects, EMI & AC, EM Waves,",
    "  Optics (Ray & Wave Optics), Dual Nature of Matter, Atoms & Nuclei, Semiconductor Electronics.",
    "- Chemistry: Solutions, Electrochemistry, Chemical Kinetics, d & f Block Elements, Coordination",
    "  Compounds, Haloalkanes & Haloarenes, Alcohols Phenols Ethers, Aldehydes & Ketones, Amines.",
    "- Mathematics: Relations & Functions, Inverse Trig, Matrices, Determinants, Continuity &",
    "  Differentiability, Applications of Derivatives, Integrals, Differential Equations, Vectors, 3D.",
    "- Biology: Reproduction in Organisms, Genetics & Evolution, Molecular Biology, Biotechnology.",
    "",
    "## CLASS 12TH COMMERCE SYLLABUS",
    "- Accountancy: Partnership Fundamentals, Admission/Retirement of Partner, Dissolution,",
    "  Company Accounts (Shares & Debentures), Financial Statement Analysis, Cash Flow Statement.",
    "- Macroeconomics: National Income, Money & Banking, Income Determination, Government Budget.",
    "- Business Studies: Principles of Management, Business Environment, Planning, Organising,",
    "  Staffing, Directing, Controlling, Financial Management, Marketing Management.",
    "",
    "## 15-MOCK PRE-BOARD EXAMINATION TIMETABLE",
    "- Pre-Board Mock 1 to 5: October 15 - November 15 (Chapter-wise Units)",
    "- Pre-Board Mock 6 to 10: December 1 - December 24 (Half-Syllabus Benchmarks)",
    "- Pre-Board Mock 11 to 15: January 5 - January 28 (Full 100% Board Pattern Simulation)"
]

create_multipage_pdf("Apex_Scholars_Class11_12_Syllabus_Guide.pdf", "APEX SCHOLARS - SYLLABUS & FEE GUIDE 2026-27", [syllabus_p1, syllabus_p2])


# 3. OFFICIAL FEE STRUCTURE
fee_p1 = [
    "# OFFICIAL TUITION FEE STRUCTURE & PAYMENT POLICIES",
    "Academic Session 2026-27 • Approved by Governing Academic Council",
    "",
    "## 1. SENIOR WING TUITION FEE COMPARISON TABLE",
    "Course Name                         Monthly Fee      Quarterly Fee     Annual (20% OFF)",
    "---------------------------------------------------------------------------------------",
    "Class 11 Science (PCM/PCB)          Rs. 4,600 / mo   Rs. 12,696 / qtr   Rs. 44,160 / yr",
    "Class 11 Commerce Excellence        Rs. 4,200 / mo   Rs. 11,592 / qtr   Rs. 40,320 / yr",
    "Class 12 Science Board Booster      Rs. 5,200 / mo   Rs. 14,352 / qtr   Rs. 49,920 / yr",
    "Class 12 Commerce Mastery           Rs. 4,500 / mo   Rs. 12,420 / qtr   Rs. 43,200 / yr",
    "Integrated JEE (Main + Adv)         Rs. 6,500 / mo   Rs. 17,940 / qtr   Rs. 62,400 / yr",
    "Integrated NEET-UG Medical          Rs. 6,500 / mo   Rs. 17,940 / qtr   Rs. 62,400 / yr",
    "",
    "## 2. KEY FEE INCLUSIONS (ZERO HIDDEN CHARGES)",
    "- Printed Theory Derivation Booklets, formula summaries, and chapter practice question sets.",
    "- 15 Full-length Mock Simulation Series with detailed examiner step-by-step scoring.",
    "- Daily 1-on-1 doubt resolution clinic with assigned senior faculty mentor.",
    "- Comprehensive Mobile / Online student portal with live attendance and progress analytics.",
    "",
    "## 3. FLEXIBLE PAYMENT OPTIONS",
    "- One-time Annual Payment: Direct 20% discount on total annual fee.",
    "- Quarterly Installment: 8% discount on each quarterly advance payment.",
    "- Zero-Interest EMI: 6-month & 9-month easy installment options available via partner banks.",
    "- Payment Modes: Online UPI (Google Pay / PhonePe / Paytm), Net Banking, RTGS, Credit/Debit Card.",
    "",
    "## 4. ADMISSION HOTLINE & DESK",
    "- Campus: 402 Excellence Tower, Knowledge Park, Central Avenue",
    "- Telephone: +91 73858 03641 | WhatsApp: +91 73858 03641"
]

create_multipage_pdf("Apex_Scholars_Official_Fee_Sheet.pdf", "APEX SCHOLARS - OFFICIAL FEE SHEET 2026-27", [fee_p1])
