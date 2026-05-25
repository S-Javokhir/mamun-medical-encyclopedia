export type Department = {
  slug: string;
  name: string;
  icon: "Heart" | "Brain" | "Bone" | "Baby" | "Activity" | "ScanLine" | "Dna" | "Microscope";
  articleCount: number;
  pdfCount: number;
  blurb: string;
};

export type Professor = {
  id: string;
  fullName: string;
  title: string;
  department: string;
  avatar: string;
  bio: string;
  quote?: string;
  researchInterests: string[];
  credentials: string[];
};

export type Download = {
  filename: string;
  type: "PDF" | "PPTX";
  sizeMB: number;
};

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  imageCaption?: string;
};

export type Article = {
  id: string;
  title: string;
  icd11: string;
  departmentSlug: string;
  professorId: string;
  publishedAt: string; // ISO date
  excerpt: string;
  sections: ArticleSection[];
  downloads: Download[];
  badges?: string[];
};

export interface NavItem {
  id: string;
  title: string;
  englishTitle?: string;
  type: "subject" | "module" | "topic" | "article";
  description?: string;
  icon?: string;
  topicCount?: number;
  articleCount?: number;
  icd11?: string;
  children?: NavItem[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const departments: Department[] = [
  { slug: "cardiology", name: "Kardiologiya", icon: "Heart", articleCount: 42, pdfCount: 28, blurb: "Yurak, qon tomirlari va qon aylanishi" },
  { slug: "neurology", name: "Nevrologiya", icon: "Brain", articleCount: 37, pdfCount: 24, blurb: "Bosh miya, umurtqa pog'onasi va nervlar" },
  { slug: "anatomy", name: "Anatomiya", icon: "Bone", articleCount: 156, pdfCount: 89, blurb: "Gros va mikroskopik anatomiya" },
  { slug: "histology", name: "Histologiya", icon: "Microscope", articleCount: 92, pdfCount: 45, blurb: "Hujayra va to'qimalar darajasidagi hayot" },
  { slug: "physiology", name: "Fiziyologiya", icon: "Activity", articleCount: 110, pdfCount: 67, blurb: "Organizmning hayotiy funktsiyalari mexanikasi" },
  { slug: "biochemistry", name: "Bioximiya", icon: "Dna", articleCount: 78, pdfCount: 34, blurb: "Molekulyar darajadagi biologik jarayonlar" },
];

export const professors: Professor[] = [
  {
    id: "alimov",
    fullName: "Baxtiyor Alimov",
    title: "Prof. Dr. Alimov",
    department: "Kardiologiya",
    avatar: "https://i.pravatar.cc/240?img=12",
    bio: "22 yillik klinik va akademik tajribaga ega kardiolog va o'qituvchi.",
    quote: "Kallaning ichki asosi tuzilishini bilish neyroxirurgiya va otorinolaringologiya sohalari uchun poydevor hisoblanadi. Foramenlarning joylashuvini yodda tuting.",
    researchInterests: ["O'tkir koronar sindromlar", "Kardial biomarkerlar", "Yurak yetishmovchiligi"],
    credentials: ["Toshkent Tibbiyot Akademiyasi doktori", "Karolinska Instituti fanlari doktori (PhD)"],
  },
  {
    id: "karimov",
    fullName: "Jamshid Karimov",
    title: "Prof. Dr. Karimov",
    department: "Histologiya",
    avatar: "https://i.pravatar.cc/240?img=11",
    bio: "Sitologiya va embriologiya bo'yicha yetuk mutaxassis. 15 yildan beri kafedra mudiri.",
    quote: "To'qimalarning mikroskopik tuzilishini tushunmasdan turib, patologiyani chuqur anglash imkonsiz.",
    researchInterests: ["Regenerativ tibbiyot", "Gistopatologiya"],
    credentials: ["O'zbekiston Fanlar Akademiyasi a'zosi", "MD, PhD"],
  },
  {
    id: "petrova",
    fullName: "Irina Petrova",
    title: "Prof. Dr. Petrova",
    department: "Nevrologiya",
    avatar: "https://i.pravatar.cc/240?img=47",
    bio: "Serebrovaskulyar kasalliklar va klinik neyroanatomiya bo'yicha mutaxassis nevrolog.",
    researchInterests: ["Ishemik insult", "Neyrotasvirlash"],
    credentials: ["Moskva davlat tibbiyot universiteti tibbiyot fanlari doktori (MD, PhD)"],
  },
];

export const articles: Article[] = [
  {
    id: "art-1",
    title: "Kallaning ichki asos tuzilishi",
    icd11: "FA01.0",
    departmentSlug: "anatomy",
    professorId: "alimov",
    publishedAt: "2026-05-23",
    excerpt: "Kallaning ichki asosi (basis cranii interna) miya qutisining pastki qismi bo'lib, u uchta chuqurchaga: oldingi, o'rta va orqa kalla chuqurchalariga bo'linadi.",
    badges: ["BIOLOGY", "Anatomiya"],
    sections: [
      {
        id: "intro",
        heading: "Kallaning ichki asos tuzilishi",
        paragraphs: [
          "Kallaning ichki asosi (basis cranii interna) miya qutisining pastki qismi bo'lib, u uchta chuqurchaga: oldingi, o'rta va orqa kalla chuqurchalariga bo'linadi. Har bir chuqurcha miyaning ma'lum qismlari joylashishi va muhim nerv-tomir kanallarining o'tishi uchun mo'ljallangan."
        ]
      },
      {
        id: "anterior",
        heading: "Oldingi kalla chuqurchasi (Fossa cranii anterior)",
        paragraphs: [
          "Ushbu chuqurcha peshona suyagining orbital qismlari, g'alvirsimon suyakning elaksimon plastinkasi va ponasimon suyakning kichik qanotlari orqali hosil bo'ladi. Bu erda miyaning peshona bo'laklari joylashadi. Lamina cribrosa orqali hid bilish nervlari (I juft) burun bo'shlig'iga o'tadi."
        ]
      },
      {
        id: "mid",
        heading: "O'rta kalla chuqurchasi (Fossa cranii media)",
        paragraphs: [
          "Markaziy qismini turk egari (sella turcica) egallagan bo'lib, unda gipofiz bezi joylashadi. Yon tomonlarida miyaning chakka bo'laklari yotadi. Bu chuqurchada canalis opticus (ko'ruv nervi uchun) va fissura orbitalis superior kabi hayotiy muhim teshiklar mavjud."
        ],
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
        imageCaption: "1-rasm. Kalla ichki asosining yuqoridan ko'rinishi: uchta asosiy kalla chuqurchasi."
      }
    ],
    downloads: [{ filename: "Kalla suyagining anatomiyasi.pdf", type: "PDF", sizeMB: 4.1 }]
  },
  {
    id: "art-hist-1",
    title: "Epiteliya to'qimasi morfologiyasi",
    icd11: "XA01.2",
    departmentSlug: "histology",
    professorId: "karimov",
    publishedAt: "2026-05-22",
    excerpt: "Epiteliya to'qimasi organizmning barcha tashqi va ichki yuzalarini qoplab turuvchi, bir-biriga zich joylashgan hujayralar qatlamidan iborat.",
    badges: ["HISTOLOGY", "Cytology"],
    sections: [
      {
        id: "s1",
        heading: "Epiteliya turlari",
        paragraphs: ["Epiteliya to'qimasi funktsional jihatdan qoplovchi va bezli epiteliylarga bo'linadi. Qoplovchi epiteliylar bir qatlamli va ko'p qatlamli bo'lishi mumkin."]
      }
    ],
    downloads: [{ filename: "Epiteliya_gistologiyasi.pdf", type: "PDF", sizeMB: 2.8 }]
  },
  {
    id: "art-phys-1",
    title: "Gemonamika asoslari",
    icd11: "BB05.1",
    departmentSlug: "physiology",
    professorId: "alimov",
    publishedAt: "2026-05-21",
    excerpt: "Qonning qon tomirlari bo'ylab harakatlanishi gidrodinamika qonunlariga bo'ysunadi. Bu jarayonda yurakning nasos funktsiyasi asosiy rol o'ynaydi.",
    badges: ["PHYSIOLOGY", "Cardiovascular"],
    sections: [
      {
        id: "s1",
        heading: "Qon bosimi va qarshilik",
        paragraphs: ["Qon oqimi tezligi qon bosimi gradiyentiga to'g'ri mutanosib va gidravlik qarshilikka teskari mutanosibdir."]
      }
    ],
    downloads: [{ filename: "Qon_aylanish_fiziyologiyasi.pdf", type: "PDF", sizeMB: 5.2 }]
  }
];

export const medicalCurriculumData: NavItem[] = [
  {
    id: "subj-1",
    title: "Anatomiya",
    englishTitle: "Anatomy",
    type: "subject",
    description: "Inson tanasining tuzilishi, a'zolari va tizimlarini o'rganuvchi asosiy tibbiy fan.",
    icon: "Bone",
    topicCount: 5,
    articleCount: 156,
    children: [
      {
        id: "mod-1",
        title: "Osteologiya",
        englishTitle: "Osteology",
        type: "module",
        description: "Skelet tizimi va suyaklarning batafsil o'rganilishi.",
        icon: "Bone",
        topicCount: 12,
        articleCount: 45,
        children: [
          {
            id: "topic-1",
            title: "Bosh suyak",
            englishTitle: "Skull",
            type: "topic",
            description: "Kalla suyagi tuzilishi.",
            icon: "Bone",
            children: [
              { id: "art-1", title: "Kallaning ichki asos tuzilishi", type: "article", icd11: "FA01.0" }
            ]
          }
        ]
      },
      {
        id: "mod-2",
        title: "Miologiya",
        englishTitle: "Myology",
        type: "module",
        description: "Mushak tizimini o'rganish.",
        icon: "Activity",
        children: []
      }
    ]
  },
  {
    id: "subj-2",
    title: "Histologiya",
    englishTitle: "Histology",
    type: "subject",
    description: "To'qimalar va hujayralarning mikroskopik darajadagi tuzilishini o'rganadi.",
    icon: "Microscope",
    topicCount: 4,
    articleCount: 92,
    children: [
      {
        id: "mod-h1",
        title: "Sitologiya",
        englishTitle: "Cytology",
        type: "module",
        description: "Hujayra hayotiy sikli va organellalar.",
        icon: "Microscope",
        children: [
          { id: "art-hist-1", title: "Epiteliya to'qimasi morfologiyasi", type: "article", icd11: "XA01.2" }
        ]
      }
    ]
  },
  {
    id: "subj-3",
    title: "Fiziyologiya",
    englishTitle: "Physiology",
    type: "subject",
    description: "Organizmning hayotiy jarayonlari va funktsiyalarini o'rganuvchi fan.",
    icon: "Activity",
    topicCount: 6,
    articleCount: 110,
    children: [
      {
        id: "mod-p1",
        title: "Gematologiya",
        englishTitle: "Hematology",
        type: "module",
        description: "Qon tizimi va qon hosil bo'lish jarayonlari.",
        icon: "Activity",
        children: [
          { id: "art-phys-1", title: "Gemonamika asoslari", type: "article", icd11: "BB05.1" }
        ]
      }
    ]
  },
  {
    id: "subj-4",
    title: "Bioximiya",
    englishTitle: "Biochemistry",
    type: "subject",
    description: "Biologik molekulalar va metabolizm jarayonlarini kimyoviy jihatdan o'rganadi.",
    icon: "Dna",
    topicCount: 3,
    articleCount: 78,
    children: []
  }
];

export function getArticle(id: string) {
  return articles.find((a) => a.id === id);
}
export function getProfessor(id: string) {
  return professors.find((p) => p.id === id);
}
export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug);
}

export function findNavItemPath(id: string, items: NavItem[] = medicalCurriculumData, path: NavItem[] = []): NavItem[] | null {
  for (const item of items) {
    const currentPath = [...path, item];
    if (item.id === id) return currentPath;
    if (item.children) {
      const result = findNavItemPath(id, item.children, currentPath);
      if (result) return result;
    }
  }
  return null;
}

export function getNavItem(id: string, items: NavItem[] = medicalCurriculumData): NavItem | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const result = getNavItem(id, item.children);
      if (result) return result;
    }
  }
  return null;
}

export function getLatestArticles(n: number) {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, n);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uz-UZ", { year: "numeric", month: "short", day: "numeric" });
}

export function getProfessorArticles(id: string) {
  return articles
    .filter((a) => a.professorId === id)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getGlossaryByLetter(letter: string) {
  return glossaryTerms.filter((t) => t.term.toLowerCase().startsWith(letter.toLowerCase()));
}

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Abssess", definition: "To'qimalarning yiringli yallig'lanishi natijasida hosil bo'lgan bo'shliq.", category: "Umumiy xirurgiya" },
  { term: "Anemiya", definition: "Qonda gemoglobin va eritrotsitlar miqdorining kamayishi.", category: "Gematologiya" },
  { term: "Bakteriya", definition: "Bir hujayrali mikroskopik organizmlar.", category: "Mikrobiologiya" },
  { term: "Vitamin", definition: "Organizmning normal ishlashi uchun zarur bo'lgan organik birikmalar.", category: "Bioximiya" },
];
