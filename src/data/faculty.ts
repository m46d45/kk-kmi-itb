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
  photo: string;
  profileUrl: string;
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
    photo: "/faculty/biemo-w-soemardi.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/bws/",
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
    photo: "/faculty/reini-wirahadikusumah.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/rdw/",
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
    photo: "/faculty/muhamad-abduh.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/ma/",
    interests: [
      "Productivity Improvement",
      "Lean Construction",
      "Product and Process Design",
    ],
    keywords: ["lean construction", "productivity", "construction operations"],
    bio: "Professor of construction operations management. His research includes productivity improvement, lean construction, and product and process design in the construction industry.",
  },
  {
    slug: "iris-mahani",
    name: "Dr. Iris Mahani, S.T., M.T.",
    shortName: "Iris Mahani",
    role: "Member",
    rank: "Associate Professor",
    credentials: "Infrastructure Finance & Safety",
    photo: "/faculty/iris-mahani.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/im/",
    interests: ["Infrastructure financing", "Construction safety"],
    keywords: ["finance", "safety", "OHS"],
    bio: "Faculty member whose research interests include infrastructure financing schemes and construction safety.",
  },
  {
    slug: "rani-kusumawardhani",
    name: "Rani Gayatri Kusumawardhani P., S.T., M.Sc., Ph.D.",
    shortName: "Rani G. Kusumawardhani",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "Construction Engineering & Management",
    photo: "/faculty/rani-kusumawardhani.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/rgk/",
    interests: [
      "Construction execution management",
      "Construction industry development and disaster mitigation",
      "Construction material technology",
    ],
    keywords: ["execution", "construction engineering", "materials"],
    bio: "Faculty member with a civil and structural engineering background. Education: B.Eng. Civil Engineering, ITB; M.Sc., Colorado State University; Ph.D., ITB.",
  },
  {
    slug: "eliza-rosmaya-puri",
    name: "Eliza Rosmaya Puri, S.T., M.T., Ph.D.",
    shortName: "Eliza Rosmaya Puri",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "Infrastructure & Community Development",
    photo: "/faculty/eliza-rosmaya-puri.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/erp/",
    interests: [
      "Road maintenance management",
      "Post-disaster management",
      "Virtual reality for construction",
      "Project planning and control",
    ],
    keywords: ["regional infrastructure", "disaster", "planning"],
    bio: "Faculty member active in applied research on infrastructure delivery, road maintenance, and post-disaster management.",
  },
  {
    slug: "budi-hasiholan",
    name: "Budi Hasiholan, S.T., M.Eng., Ph.D.",
    shortName: "Budi Hasiholan",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "Automation & Productivity",
    email: "hasiholan.budi@itb.ac.id",
    photo: "/faculty/budi-hasiholan.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/bh/",
    interests: [
      "IT applications and automation in construction",
      "Productivity improvement in construction",
      "Lean construction",
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
    photo: "/faculty/meifrinaldi.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/mei/",
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
  {
    slug: "adrianto-oktavianus",
    name: "Adrianto Oktavianus, S.T., M.Sc., Ph.D.",
    shortName: "Adrianto Oktavianus",
    role: "Member",
    rank: "Assistant Professor",
    credentials: "BIM & Construction Technology",
    email: "adrianto.oktavianus@itb.ac.id",
    photo: "/faculty/adrianto-oktavianus.jpg",
    profileUrl: "https://ftsl.itb.ac.id/kelompok-keahlian/manajemen-dan-rekayasa-konstruksi/adrianto-oktavianus",
    interests: [
      "Building Information Modeling (BIM)",
      "Construction technology application",
      "AI and computer vision in construction",
      "Post-disaster recovery management",
    ],
    keywords: ["BIM", "computer vision", "automation", "disaster recovery"],
    bio: "Faculty member working on BIM-based analysis, automation, and AI image-based inspection. Education: S.T. Civil Engineering, ITB (2009); M.Sc. Urban Management, TU Berlin (2015); Ph.D. Civil Engineering, National Taiwan University (2024).",
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
