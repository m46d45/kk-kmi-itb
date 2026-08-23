export type Partner = {
  slug: string;
  name: string;
  short: string;
  region: "national" | "international";
  kind: "partner" | "collaboration";
  href: string;
  logo?: string;
  narrative?: string;
};

export const partners: Partner[] = [
  {
    slug: "iamkri",
    name: "IAMKRI",
    short: "Indonesian Lean Construction Management Association",
    region: "national",
    kind: "collaboration",
    href: "https://iamkri.id/",
    logo: "/partners/iamkri.png",
    narrative:
      "Ikatan Ahli Manajemen Konstruksi Ramping Indonesia brings professionals, academics, and practitioners together to improve construction performance through lean principles — culture, collaboration, and productivity on Indonesian projects.",
  },
  {
    slug: "ia-crc",
    name: "IA-CRC",
    short: "Indonesia–Australia Collaborative Research in Construction",
    region: "national",
    kind: "collaboration",
    href: "https://www.ia-crc.net/",
    narrative:
      "A bilateral research community (est. 2023) linking Indonesian and Australian universities on construction productivity, safety, resilience, and sustainable infrastructure — through working groups, seminars, and joint research.",
  },
  {
    slug: "hutama-karya",
    name: "Hutama Karya",
    short: "State-owned infrastructure developer",
    region: "national",
    kind: "partner",
    href: "https://www.hutamakarya.com/",
    logo: "/partners/hutama-karya.png",
  },
  {
    slug: "pupr",
    name: "Directorate General of Construction Development",
    short: "Ministry of Public Works",
    region: "national",
    kind: "partner",
    href: "https://binakonstruksi.pu.go.id/",
    logo: "/partners/pupr.png",
  },
  {
    slug: "lpjk",
    name: "LPJK Indonesia",
    short: "Construction Services Development Board",
    region: "national",
    kind: "partner",
    href: "https://lpjk.pu.go.id/",
  },
  {
    slug: "iampi",
    name: "IAMPI",
    short: "Indonesian Society of Project Management Professionals",
    region: "national",
    kind: "partner",
    href: "https://iampi.id/",
    logo: "/partners/iampi.png",
  },
  {
    slug: "loughborough",
    name: "Loughborough University",
    short: "United Kingdom",
    region: "international",
    kind: "partner",
    href: "https://www.lboro.ac.uk/",
    logo: "/partners/loughborough.png",
  },
  {
    slug: "latrobe",
    name: "La Trobe University",
    short: "Australia",
    region: "international",
    kind: "partner",
    href: "https://www.latrobe.edu.au/",
    logo: "/partners/latrobe.png",
  },
  {
    slug: "adelaide",
    name: "Adelaide University",
    short: "Australia",
    region: "international",
    kind: "partner",
    href: "https://www.adelaide.edu.au/",
    logo: "/partners/adelaide.png",
  },
  {
    slug: "deakin",
    name: "Deakin University",
    short: "Australia",
    region: "international",
    kind: "partner",
    href: "https://www.deakin.edu.au/",
    logo: "/partners/deakin.png",
  },
  {
    slug: "melbourne",
    name: "The University of Melbourne",
    short: "Australia",
    region: "international",
    kind: "partner",
    href: "https://www.unimelb.edu.au/",
    logo: "/partners/melbourne.png",
  },
  {
    slug: "rmit",
    name: "RMIT University",
    short: "Australia",
    region: "international",
    kind: "partner",
    href: "https://www.rmit.edu.au/",
    logo: "/partners/rmit.png",
  },
  {
    slug: "unsw",
    name: "UNSW Sydney",
    short: "Australia",
    region: "international",
    kind: "partner",
    href: "https://www.unsw.edu.au/",
    logo: "/partners/unsw.png",
  },
];

export const collaborations = partners.filter((p) => p.kind === "collaboration");
export const nationalPartners = partners.filter(
  (p) => p.region === "national" && p.kind === "partner",
);
export const internationalPartners = partners.filter(
  (p) => p.region === "international" && p.kind === "partner",
);
