export type FacultyMember = {
  slug: string;
  name: string;
  shortName: string;
  role: "Chair" | "Member";
  rank: "Professor" | "Associate Professor" | "Assistant Professor";
  credentials: string;
  interests: string[];
  keywords: string[];
  email?: string;
  bio: string;
};

export const faculty: FacultyMember[] = [
  {
    slug: "biemo-w-soemardi",
    name: "Prof. Ir. Biemo W. Soemardi, M.S.E., Ph.D.",
    shortName: "Biemo W. Soemardi",
    role: "Chair",
    rank: "Professor",
    credentials: "Head of the Research Group",
    interests: [
      "Application of Technology in Construction Project Management",
      "Visualization in Construction Project",
      "Construction Contract Management and Dispute Resolution",
    ],
    keywords: ["project management", "visualization", "contracts", "disputes"],
    bio: "Professor and Chair of KK KMI. His research focuses on technology in construction project management, construction visualization, and contract management and dispute resolution.",
  },
  {
    slug: "reini-wirahadikusumah",
    name: "Prof. Reini Wirahadikusumah, Ph.D.",
    shortName: "Reini Wirahadikusumah",
    role: "Member",
    rank: "Professor",
    credentials: "Rector of ITB, 2020–2025",
    interests: [
      "Infrastructure Management",
      "Sustainable Procurement",
      "Alternative Contracting Methods",
      "Infrastructure Financing",
    ],
    keywords: ["infrastructure management", "procurement", "finance"],
    bio: "Professor of infrastructure management. Her research covers sustainable procurement, alternative contracting methods, and infrastructure finance. She served as Rector of ITB from 2020 to 2025.",
  },
  {
    slug: "muhamad-abduh",
    name: "Prof. Ir. Muhamad Abduh, M.T., Ph.D.",
    shortName: "Muhamad Abduh",
    role: "Member",
    rank: "Professor",
    credentials: "Construction Operation Management",
    email: "abduh@itb.ac.id",
    interests: [
      "Productivity Improvement",
      "Lean Construction",
      "Product and Process Design",
    ],
    keywords: ["lean construction", "productivity", "construction operations"],
    bio: "Professor of construction operations management. His research includes productivity improvement, lean construction, and product and process design in the construction industry.",
  },
  {
    slug: "puti-farida-marzuki",
    name: "Prof. Dr. Ir. Puti Farida Marzuki",
    shortName: "Puti Farida Marzuki",
    role: "Member",
    rank: "Professor",
    credentials: "Construction Risk Management",
    interests: [
      "Construction project risk management",
      "Construction industry governance",
      "Unknown unknowns in risk events",
    ],
    keywords: ["risk", "governance", "construction industry"],
    bio: "Professor whose research addresses project risk management and construction-industry challenges, including unmapped risk events.",
  },
  {
    slug: "krishna-s-pribadi",
    name: "Prof. Ir. Krishna S. Pribadi, M.S.E., Ph.D.",
    shortName: "Krishna S. Pribadi",
    role: "Member",
    rank: "Professor",
    credentials: "Disaster Risk & Construction",
    interests: [
      "Disaster risk reduction in construction",
      "Engineering services and professional practice",
      "Construction industry policy",
    ],
    keywords: ["disaster", "industry policy", "engineering services"],
    bio: "Professor focusing on disaster-risk reduction in construction, industry policy, and professional engineering practice in the ASEAN region.",
  },
  {
    slug: "iris-mahani",
    name: "Dr. Iris Mahani, S.T., M.T.",
    shortName: "Iris Mahani",
    role: "Member",
    rank: "Associate Professor",
    credentials: "Infrastructure Finance & Safety",
    interests: ["Infrastructure financing", "Construction safety"],
    keywords: ["finance", "safety", "OHS"],
    bio: "Faculty member whose research interests include infrastructure financing schemes and construction safety.",
  },
  {
    slug: "ima-fatima",
    name: "Dr. Ir. Ima Fatima, M.Eng.",
    shortName: "Ima Fatima",
    role: "Member",
    rank: "Associate Professor",
    credentials: "Project Delivery & Organizations",
    interests: [
      "Project delivery and management process",
      "Corporate performance management",
      "Organizational behaviour",
    ],
    keywords: ["project delivery", "corporate performance", "organizations"],
    bio: "Researches project-delivery processes, organizational performance management, and organizational behaviour among construction-industry actors.",
  },
  {
    slug: "rani-kusumawardhani",
    name: "Rani Gayatri Kusumawardhani P., S.T., M.Sc., Ph.D.",
    shortName: "Rani G. Kusumawardhani",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "Construction Engineering & Management",
    interests: [
      "Construction execution management",
      "Integration of structural engineering and construction",
    ],
    keywords: ["execution", "construction engineering"],
    bio: "Faculty member with a civil and structural engineering background. Education: B.Eng. Civil Engineering, ITB; M.Sc., Colorado State University; Ph.D., ITB.",
  },
  {
    slug: "eliza-rosmaya-puri",
    name: "Eliza Rosmaya Puri, S.T., M.T., Ph.D.",
    shortName: "Eliza Rosmaya Puri",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "Infrastructure & Community Development",
    interests: [
      "Regional infrastructure delivery",
      "Rural-area empowerment",
      "Applied research collaboration",
    ],
    keywords: ["regional infrastructure", "rural development", "applied research"],
    bio: "Faculty member active in applied research on infrastructure delivery and area empowerment, including the collaborative K2R initiative.",
  },
  {
    slug: "budi-hasiholan",
    name: "Budi Hasiholan, S.T., M.Eng., Ph.D.",
    shortName: "Budi Hasiholan",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "Automation & Productivity",
    email: "hasiholan.budi@itb.ac.id",
    interests: [
      "IT applications and automation in construction",
      "Productivity improvement in construction",
    ],
    keywords: ["automation", "construction IT", "productivity"],
    bio: "Researches information technology and automation for construction productivity improvement.",
  },
  {
    slug: "meifrinaldi",
    name: "Meifrinaldi, S.T., M.T.",
    shortName: "Meifrinaldi",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "BIM, IPD & Quality",
    email: "meifrinaldi@itb.ac.id",
    interests: [
      "Integrated Project Delivery",
      "Building Information Modelling",
      "Public Private Partnership",
      "Quality Control",
      "Sustainability",
    ],
    keywords: ["BIM", "IPD", "PPP", "quality"],
    bio: "Focuses on Integrated Project Delivery, BIM, public–private partnerships, quality control, and sustainability.",
  },
];

export function getFaculty(slug: string) {
  return faculty.find((member) => member.slug === slug);
}

export const facultyStats = {
  total: faculty.length,
  professors: faculty.filter((m) => m.rank === "Professor").length,
  associateProfessors: faculty.filter((m) => m.rank === "Associate Professor").length,
};
