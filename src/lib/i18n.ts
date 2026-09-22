export type Locale = "en" | "id";

export const localePaths = {
  home: { en: "/", id: "/beranda" },
  about: { en: "/about", id: "/tentang" },
  research: { en: "/research", id: "/penelitian" },
  people: { en: "/people", id: "/anggota" },
  news: { en: "/news", id: "/berita" },
  widget: { en: "/widget", id: "/widget" },
} as const;

export type NavKey = keyof typeof localePaths;

const ID_PREFIXES = ["/beranda", "/tentang", "/penelitian", "/anggota", "/berita"] as const;

export function localeFromPathname(pathname: string): Locale {
  return ID_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ? "id" : "en";
}

export function switchLocalePath(pathname: string, target: Locale): string {
  if (pathname.startsWith("/news/")) {
    const slug = pathname.slice("/news/".length);
    return target === "id" ? `/berita/${slug}` : `/news/${slug}`;
  }
  if (pathname.startsWith("/berita/")) {
    const slug = pathname.slice("/berita/".length);
    return target === "id" ? `/berita/${slug}` : `/news/${slug}`;
  }
  if (pathname.startsWith("/people/")) {
    const slug = pathname.slice("/people/".length);
    return target === "id" ? `/anggota/${slug}` : `/people/${slug}`;
  }
  if (pathname.startsWith("/anggota/")) {
    const slug = pathname.slice("/anggota/".length);
    return target === "id" ? `/anggota/${slug}` : `/people/${slug}`;
  }
  const map: Record<string, { en: string; id: string }> = {
    "/": { en: "/", id: "/beranda" },
    "/beranda": { en: "/", id: "/beranda" },
    "/about": { en: "/about", id: "/tentang" },
    "/tentang": { en: "/about", id: "/tentang" },
    "/research": { en: "/research", id: "/penelitian" },
    "/penelitian": { en: "/research", id: "/penelitian" },
    "/people": { en: "/people", id: "/anggota" },
    "/anggota": { en: "/people", id: "/anggota" },
    "/news": { en: "/news", id: "/berita" },
    "/berita": { en: "/news", id: "/berita" },
    "/widget": { en: "/widget", id: "/widget" },
    "/admin": { en: "/admin", id: "/admin" },
    "/login": { en: "/login", id: "/login" },
  };
  const hit = map[pathname];
  if (hit) return hit[target];
  return target === "id" ? "/beranda" : "/";
}

export const ui = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navResearch: "Research",
    navPeople: "Faculty",
    navNews: "News",
    linkedIn: "LinkedIn",
    newsDesk: "News desk",
    signIn: "Sign in",
    langLabel: "Bahasa Indonesia",
    langShort: "ID",
    readMore: "Read more",
    allNews: "All news",
    footerNavigate: "Navigate",
    footerPartners: "Partners",
    footerEmbed: "Embed news",
    footerSecretariat: "Secretariat",
    footerOfficial: "Official FTSL page",
    backHome: "Back to home",
    notFoundTitle: "Page not found",
    notFoundBody: "The link may have moved.",
  },
  id: {
    navHome: "Beranda",
    navAbout: "Tentang",
    navResearch: "Penelitian",
    navPeople: "Anggota",
    navNews: "Berita",
    linkedIn: "LinkedIn",
    newsDesk: "Meja berita",
    signIn: "Masuk",
    langLabel: "English",
    langShort: "EN",
    readMore: "Baca selengkapnya",
    allNews: "Semua berita",
    footerNavigate: "Navigasi",
    footerPartners: "Mitra",
    footerEmbed: "Sematan berita",
    footerSecretariat: "Sekretariat",
    footerOfficial: "Laman resmi FTSL",
    backHome: "Kembali ke beranda",
    notFoundTitle: "Halaman tidak ditemukan",
    notFoundBody: "Tautan mungkin sudah berpindah.",
  },
} as const;

export const pages = {
  en: {
    homeKicker: "FTSL · Institut Teknologi Bandung",
    homeCtaNews: "Read the news",
    homeCtaAbout: "About the group",
    homeStatStaff: "Academic staff",
    homeStatFocus: "Focus",
    homeStatFocusValue: "Management & engineering",
    homeStatFocusHint: "From projects to field operations",
    homeStatHome: "Home",
    homeAboutKicker: "About the group",
    homeAboutCta: "Full profile",
    homeResearchKicker: "Field of interest",
    homeResearchTitle: "Research areas",
    homeResearchDesc:
      "Construction-industry development, business performance, and field operations — through an interdisciplinary approach.",
    homeResearchAll: "All areas",
    homeNewsKicker: "LinkedIn → this site → FTSL",
    homeNewsTitle: "News from KK KMI",
    homeNewsDesc:
      "The group LinkedIn page is the source. This site holds the copy. The official FTSL page shows the same widget.",
    homeNewsPath: "Path to FTSL",
    homeNewsEmpty: "No published news yet.",
    homePartnersKicker: "Collaboration",
    homePartnersTitle: "Partners",
    homePartnersDesc: "National institutions and international universities.",
    homePartnersAll: "Full list",
    homeFacultyKicker: "Academic staff",
    homeFacultyTitle: "Researchers and teachers",
    homeFacultyDesc: "Faculty in construction management and construction engineering.",
    homeFacultyAll: "Faculty directory",
    aboutKicker: "Group profile",
    aboutRole: "Role and scope",
    aboutStakeholders:
      "The group works with other FTSL research groups and with construction-industry stakeholders — project owners, contractors, consultants, associations, and government.",
    aboutFormerPrefix: "On the official FTSL page the group still uses the historic slug",
    aboutStudents: "Faculty members and students",
    aboutFacultyCount: "Faculty members",
    aboutUndergrad: "Undergraduate students",
    aboutUndergradHint: "Part of the Civil Engineering programme",
    aboutMasters: "Master’s students",
    aboutDoctoral: "Doctoral students",
    aboutLab: "Laboratory",
    aboutLabBody:
      "supports teaching, research, and outreach in project management, construction methods, and construction digitalization.",
    aboutSecretariat: "Secretariat",
    aboutPartnersKicker: "Collaboration",
    aboutPartnersTitle: "Partners",
    aboutPartnersDesc:
      "National institutions and international universities the group works with in research, teaching, and industry practice.",
    researchKicker: "Field of interest",
    researchTitle: "Research areas",
    researchLead:
      "KK KMI research runs from construction-industry and business development to field operations, in interdisciplinary work with industry stakeholders.",
    peopleKicker: "Academic staff",
    peopleTitle: "Research group members",
    peopleLead:
      "KK KMI faculty work across project management, construction engineering, infrastructure management, digitalization, and risk.",
    newsKicker: "Archive",
    newsTitle: "News and events",
    newsLead:
      "Combined from this site and the group LinkedIn page. The embed on the official FTSL page uses the same feed.",
  },
  id: {
    homeKicker: "FTSL · Institut Teknologi Bandung",
    homeCtaNews: "Baca berita",
    homeCtaAbout: "Tentang kelompok",
    homeStatStaff: "Staf akademik",
    homeStatFocus: "Fokus",
    homeStatFocusValue: "Manajemen & rekayasa",
    homeStatFocusHint: "Dari proyek hingga operasi lapangan",
    homeStatHome: "Rumah",
    homeAboutKicker: "Tentang kelompok",
    homeAboutCta: "Profil lengkap",
    homeResearchKicker: "Bidang minat",
    homeResearchTitle: "Area penelitian",
    homeResearchDesc:
      "Pengembangan industri konstruksi, kinerja bisnis, dan operasi lapangan — melalui pendekatan interdisiplin.",
    homeResearchAll: "Semua area",
    homeNewsKicker: "LinkedIn → situs ini → FTSL",
    homeNewsTitle: "Berita KK KMI",
    homeNewsDesc:
      "Halaman LinkedIn kelompok adalah sumbernya. Situs ini menyimpan salinan. Laman resmi FTSL menampilkan widget yang sama.",
    homeNewsPath: "Jalur ke FTSL",
    homeNewsEmpty: "Belum ada berita yang dipublikasikan.",
    homePartnersKicker: "Kolaborasi",
    homePartnersTitle: "Mitra",
    homePartnersDesc: "Institusi nasional dan perguruan tinggi internasional.",
    homePartnersAll: "Daftar lengkap",
    homeFacultyKicker: "Staf akademik",
    homeFacultyTitle: "Peneliti dan pengajar",
    homeFacultyDesc: "Dosen manajemen konstruksi dan rekayasa konstruksi.",
    homeFacultyAll: "Direktori anggota",
    aboutKicker: "Profil kelompok",
    aboutRole: "Peran dan cakupan",
    aboutStakeholders:
      "Kelompok bekerja dengan kelompok keahlian FTSL lainnya dan pemangku kepentingan industri konstruksi — pemilik proyek, kontraktor, konsultan, asosiasi, dan pemerintah.",
    aboutFormerPrefix: "Di laman resmi FTSL, kelompok masih memakai slug historis",
    aboutStudents: "Anggota dosen dan mahasiswa",
    aboutFacultyCount: "Anggota dosen",
    aboutUndergrad: "Mahasiswa sarjana",
    aboutUndergradHint: "Bagian dari program Studi Teknik Sipil",
    aboutMasters: "Mahasiswa magister",
    aboutDoctoral: "Mahasiswa doktor",
    aboutLab: "Laboratorium",
    aboutLabBody:
      "mendukung pengajaran, penelitian, dan pengabdian dalam manajemen proyek, metode konstruksi, dan digitalisasi konstruksi.",
    aboutSecretariat: "Sekretariat",
    aboutPartnersKicker: "Kolaborasi",
    aboutPartnersTitle: "Mitra",
    aboutPartnersDesc:
      "Institusi nasional dan perguruan tinggi internasional yang bekerja sama dengan kelompok dalam penelitian, pengajaran, dan praktik industri.",
    researchKicker: "Bidang minat",
    researchTitle: "Area penelitian",
    researchLead:
      "Penelitian KK KMI mencakup pengembangan industri dan bisnis konstruksi hingga operasi lapangan, secara interdisiplin bersama pemangku kepentingan.",
    peopleKicker: "Staf akademik",
    peopleTitle: "Anggota kelompok keahlian",
    peopleLead:
      "Dosen KK KMI berkarya di manajemen proyek, rekayasa konstruksi, manajemen infrastruktur, digitalisasi, dan risiko.",
    newsKicker: "Arsip",
    newsTitle: "Berita dan kegiatan",
    newsLead:
      "Gabungan dari situs ini dan halaman LinkedIn kelompok. Sematan di laman resmi FTSL memakai umpan yang sama.",
  },
} as const;

export const aboutCopyId = {
  name: "Kelompok Keahlian Konstruksi dan Manajemen Infrastruktur",
  english: "Construction and Infrastructure Management Research Group",
  short: "KK KMI",
  former: "sebelumnya Kelompok Keahlian Manajemen dan Rekayasa Konstruksi (KK MRK)",
  lead: "Kelompok keahlian FTSL ITB yang mengembangkan pengetahuan dan menjawab permasalahan masyarakat di bidang manajemen konstruksi dan rekayasa konstruksi.",
  tagline:
    "Menuju Infrastruktur Berkelanjutan dan Tangguh melalui Peningkatan Sistem Produksi Proyek Konstruksi",
  body: "Kelompok Keahlian Konstruksi dan Manajemen Infrastruktur (KK KMI) adalah kelompok keahlian FTSL yang melakukan penelitian dan pengabdian kepada masyarakat untuk mengembangkan pengetahuan serta menyelesaikan masalah manajemen konstruksi dan rekayasa konstruksi. Kerja bersifat interdisiplin, bersama kelompok keahlian lain dan pemangku kepentingan di industri konstruksi.",
  pioneer:
    "Kelompok ini dikenal sebagai pelopor kelompok penelitian konstruksi di Indonesia. Sejak 1980 menjadi rumah awal pendidikan rekayasa dan manajemen konstruksi.",
  scope:
    "Penelitian mencakup pengembangan industri konstruksi, kinerja bisnis konstruksi, dan operasi lapangan. Agenda terkini berfokus pada lean construction: rantai pasok, perencanaan dan pengendalian proyek, operasi konstruksi, serta manajemen infrastruktur dan aset.",
};

export const researchAreasId: Record<string, { title: string; summary: string }> = {
  "project-management": {
    title: "Manajemen Proyek Konstruksi",
    summary:
      "Perencanaan, pengendalian waktu–biaya–mutu, visualisasi konstruksi, dan pemanfaatan teknologi dalam manajemen proyek.",
  },
  "construction-engineering": {
    title: "Rekayasa Konstruksi",
    summary:
      "Metode lapangan, produktivitas, lean construction, dan perancangan sistem produksi konstruksi.",
  },
  "infrastructure-management": {
    title: "Manajemen Infrastruktur",
    summary:
      "Siklus hidup aset, pengadaan berkelanjutan, metode kontrak alternatif, dan pembiayaan infrastruktur publik.",
  },
  digitalization: {
    title: "Digitalisasi & BIM",
    summary:
      "Building Information Modelling, otomasi, dan aplikasi TI yang mengintegrasikan data dari desain hingga operasi.",
  },
  "contracts-procurement": {
    title: "Kontrak, Pengadaan & KPBU",
    summary:
      "Administrasi kontrak, penyelesaian sengketa, kemitraan pemerintah–swasta, dan tata kelola pengadaan konstruksi.",
  },
  "safety-risk": {
    title: "Keselamatan & Risiko",
    summary:
      "Keselamatan konstruksi, manajemen risiko proyek, dan pengurangan risiko bencana dalam penyediaan infrastruktur.",
  },
};
