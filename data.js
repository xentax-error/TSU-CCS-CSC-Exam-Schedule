const EXAM_DAYS = [
  { id: 1, date: "2026-09-22", label: "Tuesday, September 22", endTime: "18:00" },
  { id: 2, date: "2026-09-23", label: "Wednesday, September 23", endTime: "18:00" },
  { id: 3, date: "2026-09-24", label: "Thursday, September 24", endTime: "18:00" }
];


const MASTER_SCHEDULE = [

  // Day 1 — Sept 22, 2026
  { day: 1, time: "7:45 – 9:15 AM", subject: "Data Structures and Algorithm" },
  { day: 1, time: "7:45 – 9:15 AM", subject: "Advance Web Development (Lecture)" },
  { day: 1, time: "7:45 – 9:15 AM", subject: "Fundamentals of Analytics Modelling (Lecture)" },
  { day: 1, time: "7:45 – 9:15 AM", subject: "Computational Science" },

  { day: 1, time: "9:30 – 11:00 AM", subject: "Information Management (Lecture)" },
  { day: 1, time: "9:30 – 11:00 AM", subject: "Object Oriented Programming" },
  { day: 1, time: "9:30 – 11:00 AM", subject: "Information Assurance and Security" },

  { day: 1, time: "11:15 AM – 12:45 PM", subject: "Program Logic Formulation" },
  { day: 1, time: "11:15 AM – 12:45 PM", subject: "Windows Enterprise Administration (Lecture)" },
  // { day: 1, time: "11:15 AM – 12:45 PM", subject: "Mathematics in the Modern World" },
  { day: 1, time: "11:15 AM – 12:45 PM", subject: "Integrative Programming Technologies 2 (Lecture)" },

  { day: 1, time: "1:00 – 2:30 PM", subject: "Enterprise Architecture" },
  { day: 1, time: "1:00 – 2:30 PM", subject: "Discrete Structures 2" },

  { day: 1, time: "2:45 – 4:15 PM", subject: "Intelligent System" },
  { day: 1, time: "2:45 – 4:15 PM", subject: "Quantitative Methods" },

  { day: 1, time: "4:30 – 6:00 PM", subject: "Automata Theory and Formal Language" },
  { day: 1, time: "4:30 – 6:00 PM", subject: "Enterprise Networking, Security and Automation (Lecture)" },
  { day: 1, time: "4:30 – 6:00 PM", subject: "Introduction to Computing" },


  // Day 2 — Sept 23, 2026
  { day: 2, time: "7:45 – 9:15 AM", subject: "Computer Programming 1 (Lecture)" },
  { day: 2, time: "7:45 – 9:15 AM", subject: "Web Development (Lecture)" },
  { day: 2, time: "7:45 – 9:15 AM", subject: "Evaluation of Business Performance" },

  { day: 2, time: "9:30 – 11:00 AM", subject: "Software Engineering" },
  { day: 2, time: "9:30 – 11:00 AM", subject: "Organization and Management" },

  { day: 2, time: "1:00 – 2:30 PM", subject: "Social and Professional Issues in Computing" },
  { day: 2, time: "1:00 – 2:30 PM", subject: "Systems Analysis & Design" },
  { day: 2, time: "1:00 – 2:30 PM", subject: "Web Programming (Lecture)" },

  { day: 2, time: "4:30 – 6:00 PM", subject: "Design and Analysis of Algorithm" },
  { day: 2, time: "4:30 – 6:00 PM", subject: "Application Development and Emerging Technologies" },
  { day: 2, time: "4:30 – 6:00 PM", subject: "Advance Computer Networks" },
  { day: 2, time: "4:30 – 6:00 PM", subject: "Principles of Systems Thinking" },


  // Day 3 — Sept 24, 2026
  { day: 3, time: "7:45 – 9:15 AM", subject: "Introduction to Networks" },
  { day: 3, time: "7:45 – 9:15 AM", subject: "Analytics Techniques and Tools (Lecture)" },
  { day: 3, time: "7:45 – 9:15 AM", subject: "Systems Integration and Architecture" },
  { day: 3, time: "7:45 – 9:15 AM", subject: "IS Project Management" },
  { day: 3, time: "7:45 – 9:15 AM", subject: "Fundamentals of BPO 101" },

  { day: 3, time: "9:30 – 11:00 AM", subject: "Computer Organization and Assembly Language" },
  { day: 3, time: "9:30 – 11:00 AM", subject: "Computer Programming 3 (Lecture)" },

  { day: 3, time: "11:15 AM – 12:45 PM", subject: "Mobile Application Development (Lecture)" },
  { day: 3, time: "11:15 AM – 12:45 PM", subject: "Business Communications" },
  { day: 3, time: "11:15 AM – 12:45 PM", subject: "Analytics Application (Lecture)" },

  { day: 3, time: "2:45 – 4:15 PM", subject: "Integrative Programming Technologies 1" }

];

const SUBJECT_CODES = {

  "Introduction to Computing": "CC 1",
  "Computer Programming 1 (Lecture)": "CC 2",
  "Program Logic Formulation": "PLF",
  "Data Structures and Algorithm": "CC 4",
  "Quantitative Methods": "QM",
  "Introduction to Networks": "CCNA 1",
  "Web Programming (Lecture)": "WEBPROG",
  "Design and Analysis of Algorithm": "DAA",
  "Automata Theory and Formal Language": "ATFL",
  "Computer Organization and Assembly Language": "COAL",
  "Discrete Structures 2": "DS 2",
  "Software Engineering": "SOFTENG",
  "Information Management (Lecture)": "CC 6",
  "Social and Professional Issues in Computing": "SPIC",
  "Intelligent System": "IS",
  "Computational Science": "CSci",
  "Enterprise Architecture": "EA",
  "Web Development (Lecture)": "WD",
  "Enterprise Networking, Security and Automation (Lecture)": "CCNA 3",
  "Systems Integration and Architecture": "SIA",
  "Advance Computer Networks": "NA 3",
  "Windows Enterprise Administration (Lecture)": "NA 2",
  "Object Oriented Programming": "OOP",
  "Computer Programming 3 (Lecture)": "COMPROG 3 Lec",
  "Integrative Programming Technologies 1": "IPT1",
  "Advance Web Development (Lecture)": "WMA 4 Lec",
  "Integrative Programming Technologies 2 (Lecture)": "IPT 2 Lec",
  "Mobile Application Development (Lecture)": "WMA 3 Lec",
  "IS Project Management": "ISPM 1",
  "Systems Analysis & Design": "SAD",
  "Organization and Management": "OM",
  "Fundamentals of Analytics Modelling (Lecture)": "ISBA1 Lec",
  "Analytics Techniques and Tools (Lecture)": "ISBA2 Lec",
  "Evaluation of Business Performance": "EBP",
  "Analytics Application (Lecture)": "ISBA 5 Lec",
  "Information Assurance and Security": "IAS",
  "Mathematics in the Modern World": "MATH 1F",
  "Object Oriented Programming": "OOP",
  "Integrative Programming Technologies 1": "IPT1",
  "Fundamentals of BPO 101": "TSM 1",
  "Business Communications": "TSM 2",
  "Principles of Systems Thinking": "TSM 5",
  "Application Development and Emerging Technologies": "CC 5",
  // "Mathematics in the Modern World": "MATH 1F"
  
};

const YEAR_LEVEL_MAP = {

  CS: {

    1: [
      "Introduction to Computing",
      "Computer Programming 1 (Lecture)",
      "Program Logic Formulation"
    ],

    2: [
      //"Mathematics in the Modern World",
      "Data Structures and Algorithm",
      "Quantitative Methods",
      "Introduction to Networks"
    ],

    3: [
      "Web Programming (Lecture)",
      "Design and Analysis of Algorithm",
      "Automata Theory and Formal Language",
      "Computer Organization and Assembly Language",
      "Discrete Structures 2",
      "Software Engineering",
      "Information Management (Lecture)"
    ],

    4: [
      "Social and Professional Issues in Computing",
      "Intelligent System",
      "Computational Science"
    ]

  },


  "IT-NA": {

    1: [
      "Introduction to Computing",
      "Computer Programming 1 (Lecture)",
      "Program Logic Formulation"
    ],

    2: [
      //"Mathematics in the Modern World",
      "Data Structures and Algorithm",
      "Quantitative Methods",
      "Introduction to Networks"
    ],

    3: [
      "Information Management (Lecture)",
      // "Object Oriented Programming",
      "Enterprise Architecture",
      "Web Development (Lecture)",
      "Enterprise Networking, Security and Automation (Lecture)",
      "Systems Integration and Architecture",
      "Integrative Programming Technologies 1"
    ],

    4: [
      "Social and Professional Issues in Computing",
      "Advance Computer Networks",
      "Windows Enterprise Administration (Lecture)"
    ]

  },


  "IT-TSM": {

    1: [
      "Introduction to Computing",
      "Computer Programming 1 (Lecture)",
      "Program Logic Formulation"
    ],

    2: [
      //"Mathematics in the Modern World",
      "Data Structures and Algorithm",
      "Quantitative Methods",
      "Introduction to Networks"
    ],

    3: [
      "Integrative Programming Technologies 1",
      "Information Management (Lecture)",
      "Object Oriented Programming",
      "Enterprise Architecture",
      "Web Development (Lecture)",
      "Fundamentals of BPO 101",
      "Business Communications"
    ],

    4: [
      "Social and Professional Issues in Computing",
      "Systems Integration and Architecture",
      "Principles of Systems Thinking"
    ]

  },


  "IT-WMA": {

    1: [
      "Introduction to Computing",
      "Computer Programming 1 (Lecture)",
      "Program Logic Formulation"
    ],

    2: [
      //"Mathematics in the Modern World",
      "Data Structures and Algorithm",
      "Quantitative Methods",
      "Introduction to Networks"
    ],

    3: [
      "Enterprise Architecture",
      "Information Management (Lecture)",
      "Object Oriented Programming",
      "Web Development (Lecture)",
      "Computer Programming 3 (Lecture)",
      "Integrative Programming Technologies 1",
      "Systems Integration and Architecture"
    ],

    4: [
      "Social and Professional Issues in Computing",
      "Advance Web Development (Lecture)",
      "Integrative Programming Technologies 2 (Lecture)",
      "Mobile Application Development (Lecture)"
    ]

  },


  IS: {

    1: [
      "Introduction to Computing",
      "Computer Programming 1 (Lecture)",
      "Program Logic Formulation"
    ],

    2: [
      //"Mathematics in the Modern World",
      "Data Structures and Algorithm",
      "Quantitative Methods",
      "Introduction to Networks"
    ],

    3: [
      "Enterprise Architecture",
      "IS Project Management",
      "Systems Analysis & Design",
      "Organization and Management",
      "Fundamentals of Analytics Modelling (Lecture)",
      "Analytics Techniques and Tools (Lecture)",
      "Application Development and Emerging Technologies"
    ],

    4: [
      "Social and Professional Issues in Computing",
      "Evaluation of Business Performance",
      "Analytics Application (Lecture)",
      "Information Assurance and Security"
    ]

  }

};

const PROGRAM_LABELS = {
  all: "All programs",
  CS: "BS Computer Science",
  IS: "BS Information Systems – Business Analytics",
  "IT-NA": "BS Information Technology – Network Administration",
  "IT-TSM": "BS Information Technology – Technical Service Management",
  "IT-WMA": "BS Information Technology – Web and Mobile Application"
};
