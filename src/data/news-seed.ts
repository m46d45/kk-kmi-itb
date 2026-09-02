export type NewsSeed = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  cover_url: string;
  published_at: string;
  author_name: string;
  source_url?: string;
};

export const newsSeed: NewsSeed[] = [
  {
    slug: "lean-construction-simulation-series-ice-center",
    title: "Lean construction simulation series on ICE Center ITB",
    excerpt:
      "KK KMI is opening a six-part lean construction simulation series on ICE Center ITB — free, online labs with browser-based tools. Enrol from the instructor course list, or jump to a session below.",
    body: `Construction work is a production system: crews, equipment, materials, and space move through cycles and hand-offs. When those cycles are unbalanced, projects finish late even though every team looks busy.

The Lean Construction Simulation Series (Simulasi Konstruksi Ramping) is a short laboratory sequence from KK KMI FTSL ITB, offered through ICE Center ITB with IAMKRI — Think Lean, Act Lean! Each session is about two hours, online, and free. Participants run a browser tool, change a few parameters, and watch utilisation, queues, buffers, and waiting cost respond — rather than reading another Gantt chart.

Start from the full course list taught by Prof. Muhamad Abduh: [All ICE Center courses by Prof. Muhamad Abduh](https://icecenter.itb.ac.id/profile/abduhitb-ac-id/?view=instructor).

**1. Parade of Trades.** Five sequential crews on one zone; Line of Balance, WIP, and idle cost. Course: [Seri 01 · Parade Tim Kerja](https://icecenter.itb.ac.id/courses/simulasi-konstruksi-ramping-seri-01-parade-tim-kerja/). Tool: [parade-tim-kerja.vercel.app](https://parade-tim-kerja.vercel.app).

**2. SiklOps.** Discrete-event simulation of repeating operations — earthmoving Load–Haul–Dump–Return, brickwork, concreting, tower crane — covering throughput, match factor, buffers, cost, and emissions. Saturday, 17 October 2026, 08.00–09.30 WIB, online. Course: [Seri 02 · SiklOps](https://icecenter.itb.ac.id/courses/simulasi-konstruksi-ramping-seri-02-siklus-operasi/).

**3. Neo-CYCLONE.** Halpin’s CYCLONE networks in the browser, with an AI assistant for drafting the model; the engineer still owns the logic. Saturday, 31 October 2026, 08.00–09.30 WIB, online. Course: [Seri 03 · Neo-CYCLONE](https://icecenter.itb.ac.id/courses/simulasi-konstruksi-ramping-seri-03-neo-cyclone/). Tool: [neo-cyclone.vercel.app](https://neo-cyclone.vercel.app).

**4. SiapKerja!** Last Planner® System for a type-36 house, from master plan to daily huddle; constraint-free work and workable backlog. Saturday, 14 November 2026, 08.00–09.30 WIB, online. Course: [Seri 04 · SiapKerja!](https://icecenter.itb.ac.id/courses/simulasi-konstruksi-ramping-seri-04-siapkerja/). Tool: [siapkerja-lps.vercel.app](https://siapkerja-lps.vercel.app).

**5. Rusun Takt.** Walk-up three-storey housing as a takt line; push versus JIT, seven trade wagons, one zone / one crew, including the seven-day concrete cure. Course: [Seri 05 · Rusun Takt](https://icecenter.itb.ac.id/courses/simulasi-konstruksi-ramping-seri-05-rusun-takt/). Tool: [rusun-takt.vercel.app](https://rusun-takt.vercel.app).

**6. MP2K.** Project production management across three modes — in-situ columns, near-site beams, far-supply slabs — using capacity, variability, and inventory; Little’s Law, Kingman, CONWIP. Course: [Seri 06 · MP2K](https://icecenter.itb.ac.id/courses/simulasi-konstruksi-ramping-seri-06-mp2k/).

Introductory ICE Center sessions on lean construction, construction operations, and operations simulation remain on the same instructor page if you want the conceptual prelude before the labs.

The series is built for contractors, consultants, owners, lecturers, and students who need to see flow — not only schedule percent-complete.`,
    category: "Training",
    cover_url: "/images/lab.jpg",
    published_at: "2026-09-02T08:00:00.000Z",
    author_name: "KK KMI Communications",
    source_url: "https://icecenter.itb.ac.id/profile/abduhitb-ac-id/?view=instructor",
  },
  {
    slug: "kuliah-tamu-kk-kmi-ftsl-itb",
    title: "KK KMI hosts guest lectures and academic visits",
    excerpt:
      "The Faculty of Civil and Environmental Engineering, through KK KMI, hosted guest lectures and visits from academic partners to strengthen construction-management research.",
    body: `The Faculty of Civil and Environmental Engineering (FTSL) at ITB, through the Construction and Infrastructure Management Research Group (KK KMI), received guest lectures and academic visits from partner universities.

The programme was a forum for exchanging practice in infrastructure management, construction safety, and industry readiness for project-delivery challenges in Indonesia.

KK KMI remains open to further collaboration through joint research, recurring guest lectures, and supervision of undergraduate, master’s, and doctoral students in Civil Engineering.`,
    category: "Events",
    cover_url: "/images/seminar.jpg",
    published_at: "2026-04-18T08:00:00.000Z",
    author_name: "KK KMI Communications",
  },
  {
    slug: "icmfa-kochi-university-of-technology",
    title: "KK KMI faculty attend ICMFA at Kochi University of Technology, Japan",
    excerpt:
      "Academic staff of KK KMI took part in the International Construction Management Forum in Asia to deepen regional research ties.",
    body: `Members of the Construction and Infrastructure Management Research Group attended the International Construction Management Forum in Asia (ICMFA) at Kochi University of Technology, Japan.

The forum addressed construction-management issues across Asia, including productivity, project digitalization, and infrastructure governance. KK KMI’s presence underlined the group’s role as a pioneer of construction research in Indonesia and a partner in regional dialogue.

Outcomes will be followed up in internal seminars and collaborative doctoral research proposals.`,
    category: "International",
    cover_url: "/images/japan.jpg",
    published_at: "2025-11-12T08:00:00.000Z",
    author_name: "KK KMI Communications",
  },
  {
    slug: "beasiswa-doktor-teknik-sipil-kk-kmi",
    title: "Doctoral scholarships open in Civil Engineering at KK KMI",
    excerpt:
      "KK KMI is offering doctoral scholarships covering tuition and research costs for three years in construction management and engineering.",
    body: `The Construction and Infrastructure Management Research Group is offering scholarships in ITB’s Doctoral Programme in Civil Engineering.

Awards cover tuition and research costs for three years. Topics should align with the group’s interests: lean construction, infrastructure management, BIM, finance, safety, and project risk.

Applicants should contact a prospective supervisor in KK KMI and prepare a research-proposal summary before applying through the official ITB Graduate School route.`,
    category: "Announcement",
    cover_url: "/images/lab.jpg",
    published_at: "2025-08-21T08:00:00.000Z",
    author_name: "KK KMI FTSL ITB",
  },
  {
    slug: "visiting-professor-igor-martek",
    title: "Dr. Igor Martek joins KK KMI as visiting professor",
    excerpt:
      "FTSL ITB welcomed Dr. Igor Martek as a visiting professor and research partner of the Construction and Infrastructure Management Research Group.",
    body: `To strengthen international research, FTSL ITB received Dr. Igor Martek as a visiting professor and research partner of KK KMI.

The visit supports joint publications, student supervision, and methodological exchange in construction and infrastructure management.

Master’s and doctoral students are invited to join focused discussion sessions during the visit.`,
    category: "Collaboration",
    cover_url: "/images/highway.jpg",
    published_at: "2025-06-04T08:00:00.000Z",
    author_name: "FTSL Communications",
  },
  {
    slug: "kompetisi-simulasi-proyek-konstruksi-ramping",
    title: "KK KMI holds a lean construction project-simulation competition",
    excerpt:
      "A project-simulation contest using lean construction principles invited civil-engineering student teams from several campuses.",
    body: `The Construction and Infrastructure Management Research Group held a project-simulation competition grounded in lean construction.

Teams designed work sequences, managed waste, and presented field-control strategies through physical models. The event served as a living laboratory for teaching productivity and construction operations management.

KK KMI intends to make the competition an annual programme open to partner campuses in Indonesia.`,
    category: "Students",
    cover_url: "/images/lego.jpg",
    published_at: "2024-10-05T08:00:00.000Z",
    author_name: "KK KMI FTSL ITB",
  },
  {
    slug: "kolaborasi-infrastruktur-dan-pengabdian",
    title: "Applied research from KK KMI supports infrastructure delivery",
    excerpt:
      "Through community service and applied research, KK KMI places construction-management knowledge against the problems of national infrastructure delivery.",
    body: `KK KMI treats community service as equal to research. Members contribute technical studies, project-delivery support, and infrastructure-policy forums.

Interdisciplinary work with other FTSL research groups and industry stakeholders has marked the group since it was established as Indonesia’s first construction research group.

Government partners, state-owned contractors, and professional associations may contact the group secretariat for joint initiatives.`,
    category: "Outreach",
    cover_url: "/images/cranes.jpg",
    published_at: "2026-01-30T08:00:00.000Z",
    author_name: "KK KMI FTSL ITB",
  },
];
