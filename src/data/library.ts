export type Department = {
  slug: string;
  name: string;
  icon: "Heart" | "Brain" | "Bone" | "Baby" | "Activity" | "ScanLine";
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
};

export interface NavItem {
  id: string;
  title: string;
  type: "subject" | "module" | "topic" | "article";
  icd11?: string;
  excerpt?: string;
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
  { slug: "anatomy", name: "Anatomiya", icon: "Bone", articleCount: 56, pdfCount: 41, blurb: "Gros va mikroskopik anatomiya" },
  { slug: "pediatrics", name: "Pediatriya", icon: "Baby", articleCount: 29, pdfCount: 19, blurb: "Chaqaloqlardan o'smirlargacha parvarish" },
  { slug: "oncology", name: "Onkologiya", icon: "Activity", articleCount: 31, pdfCount: 22, blurb: "O'sma biologiyasi va terapiyasi" },
  { slug: "radiology", name: "Radiologiya", icon: "ScanLine", articleCount: 24, pdfCount: 18, blurb: "Tasvirlash va diagnostik interpretatsiya" },
];

export const professors: Professor[] = [
  {
    id: "alimov",
    fullName: "Baxtiyor Alimov",
    title: "Prof. Dr. Alimov",
    department: "Kardiologiya",
    avatar: "https://i.pravatar.cc/240?img=12",
    bio: "22 yillik klinik va akademik tajribaga ega kardiolog va o'qituvchi. Universitetning yurak-qon tomir o'quv dasturining asosiy muallifi va ESC ko'rsatmalari bo'yicha ishchi guruhlarining faol a'zosi.",
    researchInterests: ["O'tkir koronar sindromlar", "Kardial biomarkerlar", "Yurak yetishmovchiligi"],
    credentials: ["Toshkent Tibbiyot Akademiyasi doktori", "Karolinska Instituti fanlari doktori (PhD)", "FESC — Yevropa kardiologiya jamiyati a'zosi"],
  },
  {
    id: "petrova",
    fullName: "Irina Petrova",
    title: "Prof. Dr. Petrova",
    department: "Nevrologiya",
    avatar: "https://i.pravatar.cc/240?img=47",
    bio: "Serebrovaskulyar kasalliklar va klinik neyroanatomiya bo'yicha mutaxassis nevrolog. Keng qo'llaniladigan uchta nevrologiya darsligi muallifi.",
    researchInterests: ["Ishemik insult", "Neyrotasvirlash", "Klinik neyroanatomiya"],
    credentials: ["Moskva davlat tibbiyot universiteti tibbiyot fanlari doktori (MD, PhD)", "Sertifikatlangan nevrolog"],
  },
  {
    id: "okafor",
    fullName: "Chinedu Okafor",
    title: "Prof. Dr. Okafor",
    department: "Pediatriya",
    avatar: "https://i.pravatar.cc/240?img=33",
    bio: "Neonatal parvarish va pediatrik yuqumli kasalliklarga ixtisoslashgan pediatr. Universitetning pediatrik simulyatsiya laboratoriyasi asoschisi.",
    researchInterests: ["Neonatal sepsis", "Vaksinalash dasturlari", "Pediatrik farmakologiya"],
    credentials: ["Ibadan universiteti doktori", "LSHTM ning jamoat salomatligi magistri"],
  },
  {
    id: "lindgren",
    fullName: "Astrid Lindgren",
    title: "Prof. Dr. Lindgren",
    department: "Onkologiya",
    avatar: "https://i.pravatar.cc/240?img=49",
    bio: "Maqsadli terapiya va immun-onkologiya bo'yicha tadqiqot olib boruvchi onkolog. Bir qancha xalqaro sinovlarning bosh tadqiqotchisi.",
    researchInterests: ["Immunoterapiya", "Ko'krak saratoni", "Translatsion onkologiya"],
    credentials: ["Uppsala universiteti fanlari doktori (MD, PhD)", "Sertifikatlangan onkolog"],
  },
];

const lorem = (term: string) =>
  `<strong>${term}</strong> bo'yicha klinik asoslash anamnez, imtihon xulosalari va maqsadli tekshiruvlarni taqqoslashni talab qiladi. Talabalar kundalik amaliyotda uchraydigan klassik ko'rinishlarni hamda umumiy atipik variantlarni taniy olishlari kerak.`;

export const articles: Article[] = [
  {
    id: "myocardial-infarction",
    title: "Miyokard infarkti",
    icd11: "BA41",
    departmentSlug: "cardiology",
    professorId: "alimov",
    publishedAt: "2026-04-18",
    excerpt: "O'tkir MI haqida tuzilgan sharh: patofiziologiya, EKG naqshlari, biomarkerlar va joriy reperfuziya strategiyalari.",
    sections: [
      {
        id: "introduction",
        heading: "Kirish",
        paragraphs: [
          `<strong>Miyokard infarkti (MI)</strong> uzoq davom etgan ishemiya natijasida kelib chiqadigan yurak mushaklarining qaytmas nekrozini anglatadi. U butun dunyo bo'ylab o'limning asosiy sababi va zamonaviy kardiologiyaning dolzarb muammosi bo'lib qolmoqda.`,
          `Ushbu maqolada zamonaviy tasnif (1–5-turlar), MI ning To'rtinchi universal ta'rifidan asosiy diagnostika mezonlari va shoshilinch holatlarda qo'llaniladigan vaqtga sezgir boshqaruv yo'llari umumlashtirilgan.`,
        ],
      },
      {
        id: "pathophysiology",
        heading: "Patofiziologiya",
        paragraphs: [
          `Ko'pgina 1-tur hodisalari <strong>aterosklerotik blyashka yorilishi</strong> natijasida yuzaga keladi, bu koronar qon oqimini keskin kamaytiradi. Keyingi ishemiya bir necha daqiqa ichida metabolik va elektr buzilishlar kaskadini keltirib chiqaradi.`,
          lorem("ishemiya-reperfuziya jarohati"),
        ],
      },
      {
        id: "clinical-manifestations",
        heading: "Klinik ko'rinishlar",
        paragraphs: [
          `Klassik ko'rinishga chap qo'l yoki jag'ga tarqaladigan <strong>to'sh orqasidagi og'riq</strong>, shuningdek terlash, hansirash va ko'ngil aynishi kiradi. Atipik ko'rinishlar ayollarda, keksalar va diabet bilan og'rigan bemorlarda ko'p uchraydi.`,
          `Bemor birinchi marta tibbiy yordamga murojaat qilganidan keyin 10 daqiqa ichida kardiologik tekshiruv va 12 tarmoqli EKG o'tkazilishi shart.`,
        ],
      },
      {
        id: "treatment",
        heading: "Davolash",
        paragraphs: [
          `Reperfuziya STEMI boshqaruvining asosidir — diagnostikadan keyin 120 daqiqa ichida <strong>birlamchi teri orqali koronar aralashuvni (PCI)</strong> o'tkazish afzaldir. Yordamchi terapiya sifatida qo'sh antiaregant terapiya, antikoagulyatsiya, beta-blokada va yuqori intensiv statinlar qo'llaniladi.`,
          `Uzoq muddatli ikkilamchi profilaktika turmush tarzini o'zgartirish, kardiologik reabilitatsiya va o'zgaruvchan xavf omillarini qat'iy nazorat qilishga qaratilgan.`,
        ],
      },
    ],
    downloads: [
      { filename: "Kardiologiya bo'yicha ma'ruza yozuvlari 2026.pdf", type: "PDF", sizeMB: 14.2 },
      { filename: "MI — Vaziyatni muhokama qilish slaydlari.pptx", type: "PPTX", sizeMB: 8.7 },
      { filename: "O'tkir MI da EKG naqshlari.pdf", type: "PDF", sizeMB: 5.1 },
    ],
  },
  {
    id: "ischemic-stroke",
    title: "Ishemik insult",
    icd11: "8B11",
    departmentSlug: "neurology",
    professorId: "petrova",
    publishedAt: "2026-05-02",
    excerpt: "Yirik qon tomir oklyuziyasidan lakunar sindromlargacha: ishemik insult bo'yicha klinik qo'llanma.",
    sections: [
      {
        id: "introduction",
        heading: "Kirish",
        paragraphs: [
          `<strong>Ishemik insult</strong> barcha insultlarning taxminan 80% ini tashkil qiladi va tasvirlash yoki patologik dalillar bilan tasdiqlangan o'tkir nevrologik nuqson sifatida belgilanadi.`,
        ],
      },
      {
        id: "pathophysiology",
        heading: "Patofiziologiya",
        paragraphs: [
          `Mexanizmlarga yirik arteriya aterosklerozi, <strong>kardioemboliya</strong>, kichik qon tomir oklyuziyasi va diseksiya yoki giperkoagulyatsiya holatlari kabi kamroq tarqalgan sabablar kiradi.`,
          lorem("penumbra"),
        ],
      },
      {
        id: "clinical-manifestations",
        heading: "Klinik ko'rinishlar",
        paragraphs: [
          `Namoyon bo'lishi shikastlangan qon tomiri hududiga bog'liq. <strong>NIHSS</strong> insult og'irligini baholashning samarali usuli hisoblanadi.`,
        ],
      },
      {
        id: "treatment",
        heading: "Davolash",
        paragraphs: [
          `Munosib bemorlar 4.5 soat ichida <strong>venoz tromboliz</strong> olishlari kerak va yirik qon tomir oklyuziyasi uchun mexanik tromboektomiya o'tkazilishi mumkin.`,
        ],
      },
    ],
    downloads: [
      { filename: "Insult — O'quv dasturi bo'yicha qo'llanma.pdf", type: "PDF", sizeMB: 11.4 },
      { filename: "NIHSS yordamchi ma'lumotlar.pdf", type: "PDF", sizeMB: 1.8 },
    ],
  },
  {
    id: "neonatal-sepsis",
    title: "Neonatal sepsis",
    icd11: "KA60",
    departmentSlug: "pediatrics",
    professorId: "okafor",
    publishedAt: "2026-05-15",
    excerpt: "Dastlabki va kech neonatal sepsisni aniqlash va boshqarish.",
    sections: [
      {
        id: "introduction",
        heading: "Kirish",
        paragraphs: [
          `<strong>Neonatal sepsis</strong> hayotning dastlabki 28 kunidagi kasallanish va o'limning asosiy sabablaridan biri bo'lib qolmoqda.`,
        ],
      },
      {
        id: "pathophysiology",
        heading: "Patofiziologiya",
        paragraphs: [
          `Erta boshlanadigan kasallik (<72 soat) odatda <strong>vertikal transmissiya</strong>ni aks ettiradi. Kech boshlanadigan kasallik ko'proq nozokomial xarakterga ega.`,
        ],
      },
      {
        id: "clinical-manifestations",
        heading: "Klinik ko'rinishlar",
        paragraphs: [
          `Belgilari ko'pincha o'ziga xos bo'lmagan bo'lishi mumkin — tana haroratining beqarorligi, emishdan bosh tortish, holsizlik yoki nafas qisishi.`,
        ],
      },
      {
        id: "treatment",
        heading: "Davolash",
        paragraphs: [
          `Empirik antibiotiklar (odatda <strong>ampitsillin + gentamitsin</strong>) kechiktirmasdan boshlanishi kerak.`,
        ],
      },
    ],
    downloads: [
      { filename: "Neonatal sepsis protokoli.pdf", type: "PDF", sizeMB: 3.9 },
      { filename: "Bolalar uchun antibiotiklar jadvali.pdf", type: "PDF", sizeMB: 2.1 },
      { filename: "NICU o'quv slaydlari.pptx", type: "PPTX", sizeMB: 12.6 },
    ],
  },
  {
    id: "breast-cancer",
    title: "Ko'krak saratoni",
    icd11: "2C60",
    departmentSlug: "oncology",
    professorId: "lindgren",
    publishedAt: "2026-03-21",
    excerpt: "Bosqinchi ko'krak saratonida molekulyar kichik turlar, bosqichlar va zamonaviy tizimli terapiya.",
    sections: [
      {
        id: "introduction",
        heading: "Kirish",
        paragraphs: [
          `<strong>Ko'krak saratoni</strong> butun dunyo bo'ylab ayollarda eng ko'p tashxis qilinadigan saraton turi hisoblanadi.`,
        ],
      },
      {
        id: "pathophysiology",
        heading: "Patofiziologiya",
        paragraphs: [
          `<strong>ER, PR va HER2</strong> xolati bo'yicha kichik turlarga ajratish prognozni ham, davolashni tanlashni ham belgilaydi.`,
        ],
      },
      {
        id: "clinical-manifestations",
        heading: "Klinik ko'rinishlar",
        paragraphs: [
          `Saraton kasalligining ko'p qismi skrining mammografiyasida aniqlanadi. Simptomatik ko'rinishlarga <strong>paypaslanadigan massa</strong>, so'rg'ichdan ajralmalar yoki teridagi o'zgarishlar kiradi.`,
        ],
      },
      {
        id: "treatment",
        heading: "Davolash",
        paragraphs: [
          `Boshqarish jarayoni jarrohlik, radioterapiya va molekulyar kichik turga moslashtirilgan <strong>tizimli terapiyani</strong> birlashtiradi.`,
        ],
      },
    ],
    downloads: [
      { filename: "Ko'krak onkologiyasi o'quv dasturi 2026.pdf", type: "PDF", sizeMB: 17.8 },
      { filename: "Molekulyar kichik turlarni ko'rib chiqish.pptx", type: "PPTX", sizeMB: 9.4 },
    ],
  },
  {
    id: "heart-failure",
    title: "Surunkali yurak yetishmovchiligi",
    icd11: "BD10",
    departmentSlug: "cardiology",
    professorId: "alimov",
    publishedAt: "2026-02-09",
    excerpt: "HFrEF, HFpEF va tibbiyot talabalari uchun tushuntirilgan dori terapiyasi.",
    sections: [
      {
        id: "introduction",
        heading: "Kirish",
        paragraphs: [
          `<strong>Yurak yetishmovchiligi</strong> — bu yurakning qon bilan to'lishi yoki qonni haydab chiqarishining buzilishi bilan bog'liq klinik sindromdir.`,
        ],
      },
      {
        id: "pathophysiology",
        heading: "Patofiziologiya",
        paragraphs: [
          `Neyrogormonal faollashuv — <strong>RAAS</strong> va simpatik tizim — progressiv modellashtirishga olib keladi va zamonaviy farmakologik maqsadlarning asosi bo'lib xizmat qiladi.`,
        ],
      },
      {
        id: "clinical-manifestations",
        heading: "Klinik ko'rinishlar",
        paragraphs: [
          `Hansirash va periferik shishlar klinik manzarada ustunlik qiladi.`,
        ],
      },
      {
        id: "treatment",
        heading: "Davolash",
        paragraphs: [
          `HFrEF uchun to'rt ustunli terapiya <strong>ARNI/ACEi</strong>, beta-blokator, MRA va SGLT2 inhibitorini birlashtiradi.`,
        ],
      },
    ],
    downloads: [
      { filename: "Yurak yetishmovchiligi — GDMT ma'lumotnomasi.pdf", type: "PDF", sizeMB: 6.3 },
    ],
  },
  {
    id: "clinical-neuroanatomy",
    title: "Klinik neyroanatomiya: Miya ustuni",
    icd11: "XA0J21",
    departmentSlug: "neurology",
    professorId: "petrova",
    publishedAt: "2026-01-28",
    excerpt: "Miya ustuni yadrolari, yo'llari va klassik lezyon sindromlari bo'yicha tuzilgan qo'llanma.",
    sections: [
      {
        id: "introduction",
        heading: "Kirish",
        paragraphs: [
          `<strong>Miya ustuni</strong> kalla nervlari yadrolari, uzun ko'tariluvchi va tushuvchi yo'llarni o'z ichiga oladi.`,
        ],
      },
      {
        id: "pathophysiology",
        heading: "Patofiziologiya",
        paragraphs: [
          `<strong>Vallenberg</strong> (lateral medullar) kabi vaskulyar sindromlar fokal lezyon qanday qilib bashorat qilinadigan kamchiliklarni keltirib chiqarishini ko'rsatib beradi.`,
        ],
      },
      {
        id: "clinical-manifestations",
        heading: "Klinik ko'rinishlar",
        paragraphs: [
          `Kesishgan belgilar — ipsilateral kalla nervi defitsiti va kontralateral uzun yo'l belgilari — <strong>miya ustuni lezyonlarining</strong> asosiy belgisidir.`,
        ],
      },
      {
        id: "treatment",
        heading: "Davolash",
        paragraphs: [
          `Boshqarish etiologiya (ko'pincha vaskulyar) bilan belgilanadi va standart insult yo'llariga amal qiladi.`,
        ],
      },
    ],
    downloads: [
      { filename: "Miya ustuni atlasi.pdf", type: "PDF", sizeMB: 22.9 },
      { filename: "Kalla nervlari bo'yicha qisqa ma'lumot.pdf", type: "PDF", sizeMB: 1.4 },
    ],
  },
];

export function getArticle(id: string) {
  return articles.find((a) => a.id === id);
}
export function getProfessor(id: string) {
  return professors.find((p) => p.id === id);
}
export function getProfessorArticles(id: string) {
  return articles
    .filter((a) => a.professorId === id)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function getLatestArticles(n: number) {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, n);
}
export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug);
}
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uz-UZ", { year: "numeric", month: "short", day: "numeric" });
}

export const medicalCurriculumData: NavItem[] = [
  {
    id: "subj-1",
    title: "Anatomiya (Anatomy)",
    type: "subject",
    children: [
      {
        id: "mod-1",
        title: "Ostologiya (Osteology)",
        type: "module",
        children: [
          {
            id: "topic-1",
            title: "Bosh suyak (Skull)",
            type: "topic",
            children: [
              { id: "art-1", title: "Kallaning ichki asos tuzilishi", type: "article", icd11: "FA01.0" },
              { id: "art-2", title: "Yuz suyaklarining anatomiyasi", type: "article", icd11: "FA01.1" }
            ]
          },
          {
            id: "topic-2",
            title: "Umurtqa pog'ona (Vertebral Column)",
            type: "topic",
            children: [
              { id: "art-3", title: "Bo'yin umurtqalari tuzilishi", type: "article", icd11: "FA02.0" }
            ]
          }
        ]
      },
      {
        id: "mod-2",
        title: "Miologiya (Myology)",
        type: "module",
        children: []
      }
    ]
  },
  {
    id: "subj-2",
    title: "Fiziologiya (Physiology)",
    type: "subject",
    children: [
      {
        id: "mod-3",
        title: "Yurak-qon tomir tizimi",
        type: "module",
        children: []
      }
    ]
  },
  {
    id: "subj-3",
    title: "Gistologiya (Histology)",
    type: "subject",
    children: []
  }
];

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

export const getGlossaryByLetter = (letter: string) => {
  return glossaryTerms.filter((t) => t.term.toLowerCase().startsWith(letter.toLowerCase()));
};

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Abssess", definition: "To'qimalarning yiringli yallig'lanishi natijasida hosil bo'lgan bo'shliq.", category: "Umumiy xirurgiya" },
  { term: "Adrenalin", definition: "Buyrak usti bezining mag'iz qavatidan ajraladigan gormon.", category: "Endokrinologiya" },
  { term: "Anemiya", definition: "Qonda gemoglobin va eritrotsitlar miqdorining kamayishi.", category: "Gematologiya" },
  { term: "Aorta", definition: "Yurakning chap qorinchasidan chiquvchi eng yirik qon tomiri.", category: "Kardiologiya" },
  { term: "Bradikardiya", definition: "Yurak urishi tezligining pasayishi (minutiga 60 tadan kam).", category: "Kardiologiya" },
  { term: "Bronxit", definition: "Bronxlarning yallig'lanishi.", category: "Pulmonologiya" },
  { term: "Vaksina", definition: "Kasalliklarga qarshi immunitet hosil qilish uchun yuboriladigan preparat.", category: "Immunologiya" },
  { term: "Gastrit", definition: "Me'da shilliq qavatining yallig'lanishi.", category: "Gastroenterologiya" },
  { term: "Gematoma", definition: "To'qimalarda qon to'planishi (ko'karish).", category: "Travmatologiya" },
  { term: "Gipoksiya", definition: "To'qimalarning kislorod bilan yetarli darajada ta'minlanmasligi.", category: "Patofiziologiya" },
  { term: "Diabet", definition: "Qonda qand miqdorining oshishi bilan kechadigan kasalliklar guruhi.", category: "Endokrinologiya" },
  { term: "Insult", definition: "Miya qon aylanishining o'tkir buzilishi.", category: "Nevrologiya" },
  { term: "Kardiologiya", definition: "Yurak va qon tomirlarini o'rganuvchi fan.", category: "Tibbiyot sohasi" },
  { term: "Leykotsit", definition: "Qonning oq hujayralari, organizmni himoya qiladi.", category: "Gematologiya" },
  { term: "Meningit", definition: "Miya pardalarining yallig'lanishi.", category: "Yuqumli kasalliklar" },
  { term: "Narkoz", definition: "Sun'iy uyqu va og'riqsizlantirish holati.", category: "Anesteziologiya" },
  { term: "Osteoporoz", definition: "Suyak to'qimasining zichligi kamayishi va mo'rtlashishi.", category: "Revmatologiya" },
  { term: "Pnevmoniya", definition: "O'pka to'qimalarining yallig'lanishi (zotiljam).", category: "Pulmonologiya" },
  { term: "Sepsis", definition: "Organizmning infektsiyaga umumiy og'ir reaksiyasi (qon zaharlanishi).", category: "Reanimatologiya" },
  { term: "Tromb", definition: "Qon tomiri ichida hosil bo'lgan qon laxtasi.", category: "Gematologiya" },
  { term: "Ultratovush", definition: "Ichki a'zolarni tekshirishda foydalaniladigan yuqori chastotali tovush to'lqinlari.", category: "Diagnostika" },
  { term: "Farmakologiya", definition: "Dorivor moddalarning xususiyatlarini o'rganuvchi fan.", category: "Tibbiyot sohasi" },
  { term: "Xolesterin", definition: "Hujayra membranalarida mavjud bo'lgan yog'simon modda.", category: "Biokimyo" },
  { term: "Sistit", definition: "Qovuq shilliq qavatining yallig'lanishi.", category: "Urologiya" },
  { term: "Eritrotsit", definition: "Qonning qizil hujayralari, kislorod tashiydi.", category: "Gematologiya" },
];
