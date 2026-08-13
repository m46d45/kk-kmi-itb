export type Partner = {
  slug: string;
  name: string;
  short: string;
  region: "national" | "international";
  href: string;
  logo: string;
};

export const partners: Partner[] = [
  {
    slug: "hutama-karya",
    name: "Hutama Karya",
    short: "State-owned infrastructure developer",
    region: "national",
    href: "https://www.hutamakarya.com/",
    logo: "/partners/hutama-karya.png",
  },
  {
    slug: "pupr",
    name: "Directorate General of Construction Development",
    short: "Ministry of Public Works",
    region: "national",
    href: "https://binakonstruksi.pu.go.id/",
    logo: "/partners/pupr.png",
  },
  {
    slug: "lpjk",
    name: "LPJK Indonesia",
    short: "Construction Services Development Board",
    region: "national",
    href: "https://lpjk.pu.go.id/",
    logo: "/partners/lpjk.png",
  },
  {
    slug: "iampi",
    name: "IAMPI",
    short: "Indonesian Society of Project Management Professionals",
    region: "national",
    href: "https://iampi.org/",
    logo: "/partners/iampi.png",
  },
  {
    slug: "iamkri",
    name: "IAMKRI",
    short: "Indonesian Lean Construction Management Association",
    region: "national",
    href: "https://iamkri.id/",
    logo: "/partners/iamkri.png",
  },
  {
    slug: "ia-crc",
    name: "IA-CRC",
    short: "Indonesia–Australia Collaborative Research in Construction",
    region: "national",
    href: "",
    logo: "/partners/ia-crc.png",
  },
  {
    slug: "loughborough",
    name: "Loughborough University",
    short: "United Kingdom",
    region: "international",
    href: "https://www.lboro.ac.uk/",
    logo: "/partners/loughborough.png",
  },
  {
    slug: "latrobe",
    name: "La Trobe University",
    short: "Australia",
    region: "international",
    href: "https://www.latrobe.edu.au/",
    logo: "/partners/latrobe.png",
  },
  {
    slug: "adelaide",
    name: "Adelaide University",
    short: "Australia",
    region: "international",
    href: "https://www.adelaide.edu.au/",
    logo: "/partners/adelaide.png",
  },
  {
    slug: "deakin",
    name: "Deakin University",
    short: "Australia",
    region: "international",
    href: "https://www.deakin.edu.au/",
    logo: "/partners/deakin.png",
  },
  {
    slug: "melbourne",
    name: "The University of Melbourne",
    short: "Australia",
    region: "international",
    href: "https://www.unimelb.edu.au/",
    logo: "/partners/melbourne.png",
  },
  {
    slug: "rmit",
    name: "RMIT University",
    short: "Australia",
    region: "international",
    href: "https://www.rmit.edu.au/",
    logo: "/partners/rmit.png",
  },
  {
    slug: "unsw",
    name: "UNSW Sydney",
    short: "Australia",
    region: "international",
    href: "https://www.unsw.edu.au/",
    logo: "/partners/unsw.png",
  },
];

export const nationalPartners = partners.filter((p) => p.region === "national");
export const internationalPartners = partners.filter((p) => p.region === "international");
