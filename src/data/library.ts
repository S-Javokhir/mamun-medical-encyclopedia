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
  videoUrl?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
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
  href?: string;
  children?: NavItem[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const departments: Department[] = [
  {
    slug: "cardiology",
    name: "Kardiologiya",
    icon: "Heart",
    articleCount: 1,
    pdfCount: 1,
    blurb: "Yurak, qon tomirlari va qon aylanishi",
  },
  {
    slug: "neurology",
    name: "Nevrologiya",
    icon: "Brain",
    articleCount: 0,
    pdfCount: 0,
    blurb: "Bosh miya, umurtqa pog'onasi va nervlar",
  },
  {
    slug: "anatomy",
    name: "Anatomiya",
    icon: "Bone",
    articleCount: 1,
    pdfCount: 1,
    blurb: "Gros va mikroskopik anatomiya",
  },
  {
    slug: "histology",
    name: "Histologiya",
    icon: "Microscope",
    articleCount: 2,
    pdfCount: 2,
    blurb: "Hujayra va to'qimalar darajasidagi hayot",
  },
  {
    slug: "physiology",
    name: "Fiziyologiya",
    icon: "Activity",
    articleCount: 2,
    pdfCount: 2,
    blurb: "Organizmning hayotiy funktsiyalari mexanikasi",
  },
  {
    slug: "biochemistry",
    name: "Bioximiya",
    icon: "Dna",
    articleCount: 0,
    pdfCount: 0,
    blurb: "Molekulyar darajadagi biologik jarayonlar",
  },
  {
    slug: "pediatrics",
    name: "Pediatriya",
    icon: "Baby",
    articleCount: 3,
    pdfCount: 3,
    blurb: "Bolalar salomatligi va kasalliklari",
  },
  {
    slug: "surgery",
    name: "Xirurgiya",
    icon: "ScanLine",
    articleCount: 2,
    pdfCount: 2,
    blurb: "Operativ tibbiyot va jarrohlik",
  },
  {
    slug: "pharmacology",
    name: "Farmakologiya",
    icon: "Dna",
    articleCount: 1,
    pdfCount: 1,
    blurb: "Dorilar va ularning ta'siri",
  },
];

export const professors: Professor[] = [
  {
    id: "alimov",
    fullName: "Baxtiyor Alimov",
    title: "Prof. Dr. Alimov",
    department: "Kardiologiya",
    avatar: "https://i.pravatar.cc/240?img=12",
    bio: "22 yillik klinik va akademik tajribaga ega kardiolog va o'qituvchi.",
    quote:
      "Kallaning ichki asosi tuzilishini bilish neyroxirurgiya va otorinolaringologiya sohalari uchun poydevor hisoblanadi. Foramenlarning joylashuvini yodda tuting.",
    researchInterests: [
      "O'tkir koronar sindromlar",
      "Kardial biomarkerlar",
      "Yurak yetishmovchiligi",
    ],
    credentials: [
      "Toshkent Tibbiyot Akademiyasi doktori",
      "Karolinska Instituti fanlari doktori (PhD)",
    ],
  },
  {
    id: "karimov",
    fullName: "Jamshid Karimov",
    title: "Prof. Dr. Karimov",
    department: "Histologiya",
    avatar: "https://i.pravatar.cc/240?img=11",
    bio: "Sitologiya va embriologiya bo'yicha yetuk mutaxassis. 15 yildan beri kafedra mudiri.",
    quote:
      "To'qimalarning mikroskopik tuzilishini tushunmasdan turib, patologiyani chuqur anglash imkonsiz.",
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
  {
    id: "safarov",
    fullName: "Omon Safarov",
    title: "Prof. Dr. Safarov",
    department: "Pediatriya",
    avatar: "https://i.pravatar.cc/240?img=13",
    bio: "Bolalar kardiologiyasi va rivojlanish fiziologiyasi bo'yicha 25 yillik tajribaga ega.",
    researchInterests: ["Neonatologiya", "Bolalar infeksiyalari"],
    credentials: ["Samarqand Davlat Tibbiyot Universiteti PhD"],
  },
  {
    id: "ergashev",
    fullName: "Jasur Ergashev",
    title: "Prof. Dr. Ergashev",
    department: "Xirurgiya",
    avatar: "https://i.pravatar.cc/240?img=14",
    bio: "Abdominal xirurgiya va laparoskopiya bo'yicha yetakchi mutaxassis.",
    researchInterests: ["Minimal invaziv xirurgiya", "Onkoxirurgiya"],
    credentials: ["Respublika Shoshilinch Tibbiy Yordam Ilmiy Markazi doktori"],
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
    excerpt:
      "Kallaning ichki asosi (basis cranii interna) miya qutisining pastki qismi bo'lib, u uchta chuqurchaga: oldingi, o'rta va orqa kalla chuqurchalariga bo'linadi.",
    badges: ["BIOLOGY", "Anatomiya"],
    sections: [
      {
        id: "intro",
        heading: "Kallaning ichki asos tuzilishi",
        paragraphs: [
          "Kallaning ichki asosi (basis cranii interna) miya qutisining pastki qismi bo'lib, u uchta chuqurchaga: oldingi, o'rta va orqa kalla chuqurchalariga bo'linadi. Har bir chuqurcha miyaning ma'lum qismlari joylashishi va muhim nerv-tomir kanallarining o'tishi uchun mo'ljallangan.",
        ],
      },
      {
        id: "anterior",
        heading: "Oldingi kalla chuqurchasi (Fossa cranii anterior)",
        paragraphs: [
          "Ushbu chuqurcha peshona suyagining orbital qismlari, g'alvirsimon suyakning elaksimon plastinkasi va ponasimon suyakning kichik qanotlari orqali hosil bo'ladi. Bu erda miyaning peshona bo'laklari joylashadi. Lamina cribrosa orqali hid bilish nervlari (I juft) burun bo'shlig'iga o'tadi.",
        ],
      },
      {
        id: "mid",
        heading: "O'rta kalla chuqurchasi (Fossa cranii media)",
        paragraphs: [
          "Markaziy qismini turk egari (sella turcica) egallagan bo'lib, unda gipofiz bezi joylashadi. Yon tomonlarida miyaning chakka bo'laklari yotadi. Bu chuqurchada canalis opticus (ko'ruv nervi uchun) va fissura orbitalis superior kabi hayotiy muhim teshiklar mavjud.",
        ],
        image:
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
        imageCaption:
          "1-rasm. Kalla ichki asosining yuqoridan ko'rinishi: uchta asosiy kalla chuqurchasi.",
      },
    ],
    downloads: [{ filename: "Kalla suyagining anatomiyasi.pdf", type: "PDF", sizeMB: 4.1 }],
  },
  {
    id: "art-hist-1",
    title: "Epiteliya to'qimasi morfologiyasi",
    icd11: "XA01.2",
    departmentSlug: "histology",
    professorId: "karimov",
    publishedAt: "2026-05-22",
    excerpt:
      "Epiteliya to'qimasi organizmning barcha tashqi va ichki yuzalarini qoplab turuvchi, bir-biriga zich joylashgan hujayralar qatlamidan iborat.",
    badges: ["HISTOLOGY", "Cytology"],
    sections: [
      {
        id: "s1",
        heading: "Epiteliya turlari",
        paragraphs: [
          "Epiteliya to'qimasi funktsional jihatdan qoplovchi va bezli epiteliylarga bo'linadi. Qoplovchi epiteliylar bir qatlamli va ko'p qatlamli bo'lishi mumkin.",
        ],
      },
    ],
    downloads: [{ filename: "Epiteliya_gistologiyasi.pdf", type: "PDF", sizeMB: 2.8 }],
  },
  {
    id: "art-hist-2",
    title: "Qon to'qimasi gistologiyasi",
    icd11: "XA5Y",
    departmentSlug: "histology",
    professorId: "karimov",
    publishedAt: "2026-05-25",
    excerpt:
      "Qon - suyuq holatdagi biriktiruvchi to'qima bo'lib, u shaklli elementlar va plazmadan iborat.",
    badges: ["HISTOLOGY", "Blood"],
    sections: [
      {
        id: "blood-table",
        heading: "Qonning shaklli elementlari",
        paragraphs: ["Qon hujayralarining asosiy turlari va ularning funktsiyalari:"],
        table: {
          headers: ["Element", "Miqdori (1 mkl)", "Asosiy vazifasi"],
          rows: [
            ["Eritrotsitlar", "4.5 - 5.0 mln", "Gidrogen tashish (O2, CO2)"],
            ["Leykotsitlar", "4,000 - 9,000", "Himoya (fagotsitoz, immunitet)"],
            ["Trombotsitlar", "180,000 - 320,000", "Qon ivishida ishtirok etish"],
          ],
        },
      },
    ],
    downloads: [{ filename: "Qon_gistologiyasi.pdf", type: "PDF", sizeMB: 1.8 }],
  },
  {
    id: "art-phys-1",
    title: "Gemonamika asoslari",
    icd11: "BB05.1",
    departmentSlug: "physiology",
    professorId: "alimov",
    publishedAt: "2026-05-21",
    excerpt:
      "Qonning qon tomirlari bo'ylab harakatlanishi gidrodinamika qonunlariga bo'ysunadi. Bu jarayonda yurakning nasos funktsiyasi asosiy rol o'ynaydi.",
    badges: ["PHYSIOLOGY", "Cardiovascular"],
    sections: [
      {
        id: "s1",
        heading: "Qon bosimi va qarshilik",
        paragraphs: [
          "Qon oqimi tezligi qon bosimi gradiyentiga to'g'ri mutanosib va gidravlik qarshilikka teskari mutanosibdir.",
        ],
      },
    ],
    downloads: [{ filename: "Qon_aylanish_fiziyologiyasi.pdf", type: "PDF", sizeMB: 5.2 }],
  },
  {
    id: "art-phys-2",
    title: "Nerv tizimi fiziologiyasi",
    icd11: "XA2Q",
    departmentSlug: "physiology",
    professorId: "petrova",
    publishedAt: "2026-05-25",
    excerpt:
      "Nerv tizimi organizmning barcha a'zolari faoliyatini boshqaradi va tashqi muhit bilan bog'liqligini ta'minlaydi.",
    badges: ["PHYSIOLOGY", "Neuroscience"],
    sections: [
      {
        id: "nervous-intro",
        heading: "Reflektor yoy",
        paragraphs: [
          "Nerv faoliyatining asosi refleks hisoblanadi. Reflektor yoy 5 ta qismdan iborat bo'ladi.",
          "Quyidagi rasmda reflektor yoyning sxemasi ko'rsatilgan:",
        ],
        image:
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Nerv impulslarining o'tish yo'li.",
      },
    ],
    downloads: [{ filename: "Nerv_fiziyologiyasi.pdf", type: "PDF", sizeMB: 2.1 }],
  },
  {
    id: "art-ped-1",
    title: "Bolalarda o'sish va rivojlanish ko'rsatkichlari",
    icd11: "2A00.0",
    departmentSlug: "pediatrics",
    professorId: "safarov",
    publishedAt: "2026-05-24",
    excerpt:
      "Bolalik davrida o'sish va rivojlanish jarayonlari ularning yoshiga mos ravishda doimiy nazorat qilinishi kerak.",
    badges: ["PEDIATRICS", "Growth"],
    sections: [
      {
        id: "growth-table",
        heading: "Yoshga doir o'rtacha ko'rsatkichlar",
        paragraphs: [
          "Quyidagi jadvalda bolalarning yoshi bo'yicha o'rtacha bo'yi va vazni keltirilgan:",
        ],
        table: {
          headers: ["Yosh", "Vazn (kg)", "Bo'y (cm)"],
          rows: [
            ["Yangi tug'ilgan", "3.2 - 3.5", "50 - 52"],
            ["6 oy", "7.5 - 8.0", "66 - 68"],
            ["1 yosh", "10.0 - 10.5", "74 - 76"],
            ["2 yosh", "12.0 - 13.0", "86 - 88"],
          ],
        },
      },
    ],
    downloads: [{ filename: "Bolalar_rivojlanish_jadvali.pdf", type: "PDF", sizeMB: 1.5 }],
  },
  {
    id: "art-surg-1",
    title: "O'tkir appenditsit: Tashxis va xirurgik muolaja",
    icd11: "DB10",
    departmentSlug: "surgery",
    professorId: "ergashev",
    publishedAt: "2026-05-25",
    excerpt:
      "O'tkir appenditsit qorin bo'shlig'ining eng ko'p uchraydigan o'tkir xirurgik kasalliklaridan biridir.",
    badges: ["SURGERY", "Emergency"],
    sections: [
      {
        id: "surg-intro",
        heading: "Laparoskopik appendektomiya",
        paragraphs: [
          "Hozirgi vaqtda laparoskopik usul appenditsitni davolashda 'oltin standart' hisoblanadi. Bu usul kam jarohatli bo'lib, bemorning tezroq oyoqqa turishini ta'minlaydi.",
          "Video qo'llanmada operatsiya bosqichlari ko'rsatilgan:",
        ],
        videoUrl: "https://www.youtube.com/embed/S2p-L6u4E_k",
      },
    ],
    downloads: [{ filename: "Xirurgiya_protokol.pdf", type: "PDF", sizeMB: 3.2 }],
  },
  {
    id: "art-ped-2",
    title: "Milliy emlash kalendari",
    icd11: "XA9S2",
    departmentSlug: "pediatrics",
    professorId: "safarov",
    publishedAt: "2026-05-25",
    excerpt:
      "Bolalarni yuqumli kasalliklardan himoya qilishning eng samarali usuli bu o'z vaqtida emlashdir.",
    badges: ["PEDIATRICS", "Vaccination"],
    sections: [
      {
        id: "vax-table",
        heading: "Emlash jadvali (0-1 yosh)",
        paragraphs: ["Bolaning birinchi yoshida o'tkaziladigan asosiy emlashlar:"],
        table: {
          headers: ["Muddat", "Vaktsina turi", "Kasallikka qarshi"],
          rows: [
            ["Tug'ilganda", "VB, BSJ-1", "Gepatit B, Tuberkulyoz"],
            ["2 oylik", "OPV-1, AKDS-1", "Polio, Bo'g'ma, Qo'shma"],
            ["3 oylik", "OPV-2, AKDS-2", "Polio, Bo'g'ma, Qo'shma"],
            ["4 oylik", "OPV-3, AKDS-3", "Polio, Bo'g'ma, Qo'shma"],
          ],
        },
      },
    ],
    downloads: [{ filename: "Emlash_kalendari_2026.pdf", type: "PDF", sizeMB: 1.2 }],
  },
  {
    id: "art-card-1",
    title: "Yurak ishemik kasalligi",
    icd11: "BA41",
    departmentSlug: "cardiology",
    professorId: "alimov",
    publishedAt: "2026-05-25",
    excerpt:
      "Yurak ishemik kasalligi (YIK) - yurak mushaklarining qon bilan ta'minlanishi buzilishi natijasida kelib chiqadigan patologik holat.",
    badges: ["CARDIOLOGY", "Ischemia"],
    sections: [
      {
        id: "card-video",
        heading: "YIK patogenezi",
        paragraphs: [
          "Quyidagi video lavhada koronar arteriyalarning torayishi va plastinkalar hosil bo'lish jarayoni ko'rsatilgan:",
        ],
        videoUrl: "https://www.youtube.com/embed/H05fM6-M6_8",
      },
    ],
    downloads: [{ filename: "Ishemik_kasalliklar_davolash.pdf", type: "PDF", sizeMB: 2.4 }],
  },
  {
    id: "art-ped-3",
    title: "Bolalarda vitamin D tanqisligi",
    icd11: "5B56",
    departmentSlug: "pediatrics",
    professorId: "safarov",
    publishedAt: "2026-05-25",
    excerpt:
      "Vitamin D tanqisligi bolalarda suyak-mushak tizimi rivojlanishida salbiy oqibatlarga olib kelishi mumkin.",
    badges: ["PEDIATRICS", "Nutrition"],
    sections: [
      {
        id: "vitd-intro",
        heading: "Oldini olish choralari",
        paragraphs: ["Quyidagi jadvalda yoshga doir profilaktik dozalar keltirilgan:"],
        table: {
          headers: ["Yosh", "Sutkalik doza (IU)", "Izoh"],
          rows: [
            ["0 - 12 oy", "400 - 500", "Profilaktika uchun"],
            ["1 - 3 yosh", "600", "Doimiy qabul qilish tavsiya etiladi"],
            ["4 - 8 yosh", "600 - 800", "Mavsumiy (qish oylarida)"],
          ],
        },
      },
    ],
    downloads: [{ filename: "Vitamin_D_protokol.pdf", type: "PDF", sizeMB: 0.9 }],
  },
  {
    id: "art-surg-2",
    title: "Qorin churralari tasnifi",
    icd11: "DD0Z",
    departmentSlug: "surgery",
    professorId: "ergashev",
    publishedAt: "2026-05-25",
    excerpt:
      "Qorin churralari (grijalar) joylashuvi va kelib chiqishi bo'yicha bir necha guruhlarga bo'linadi.",
    badges: ["SURGERY", "Hernia"],
    sections: [
      {
        id: "hernia-types",
        heading: "Asosiy turlari",
        paragraphs: ["Lokalizatsiyasi bo'yicha churralar quyidagilarga bo'linadi:"],
        table: {
          headers: ["Turi", "Lokalizatsiya", "Tez-tezligi"],
          rows: [
            ["Chov churrasi", "Chov kanali", "75% - 80%"],
            ["Son churrasi", "Son kanali", "5% - 10%"],
            ["Kindik churrasi", "Kindik halqasi", "3% - 5%"],
          ],
        },
      },
    ],
    downloads: [{ filename: "Churra_turlari.pdf", type: "PDF", sizeMB: 1.4 }],
  },
  {
    id: "art-phar-1",
    title: "Antibiotiklar: Guruhlar va ta'sir mexanizmi",
    icd11: "XA8T2",
    departmentSlug: "pharmacology",
    professorId: "alimov", // Placeholder
    publishedAt: "2026-05-25",
    excerpt:
      "Antibiotiklar bakterial infeksiyalarni davolashda ishlatiladigan kimyoviy moddalardir.",
    badges: ["PHARMACOLOGY", "Antibiotics"],
    sections: [
      {
        id: "vax-table",
        heading: "Asosiy guruhlar",
        paragraphs: ["Antibiotiklarning asosiy guruhlari va vakillari:"],
        table: {
          headers: ["Guruh", "Vakillari", "Ta'sir mexanizmi"],
          rows: [
            ["Penitsillinlar", "Amoksitsillin, Ampitsillin", "Hujayra devori sintezini buzish"],
            ["Sevalosporinlar", "Sefazolin, Seftriakson", "Hujayra devori sintezini buzish"],
            ["Makrolidlar", "Azitromitsin, Eritromitsin", "Oqsil sintezini to'xtatish"],
            ["Aminoglikozidlar", "Gentamitsin, Amikatsin", "DNK sintezini buzish"],
          ],
        },
      },
    ],
    downloads: [{ filename: "Antibiotiklar_tasnifi.pdf", type: "PDF", sizeMB: 1.1 }],
  },
];

export const medicalCurriculumData: NavItem[] = [
  {
    id: "subj-1",
    title: "Anatomiya",
    englishTitle: "Anatomy",
    type: "subject",
    description:
      "Inson tanasining tuzilishi, a'zolari va tizimlarini o'rganuvchi asosiy tibbiy fan.",
    icon: "Bone",
    topicCount: 1,
    articleCount: 1,
    children: [
      {
        id: "mod-1",
        title: "Osteologiya",
        englishTitle: "Osteology",
        type: "module",
        description: "Skelet tizimi va suyaklarning batafsil o'rganilishi.",
        icon: "Bone",
        topicCount: 1,
        articleCount: 1,
        children: [
          {
            id: "topic-1",
            title: "Bosh suyak",
            englishTitle: "Skull",
            type: "topic",
            description: "Kalla suyagi tuzilishi.",
            icon: "Bone",
            children: [
              {
                id: "art-1",
                title: "Kallaning ichki asos tuzilishi",
                type: "article",
                icd11: "FA01.0",
              },
            ],
          },
        ],
      },
      {
        id: "mod-2",
        title: "Miologiya",
        englishTitle: "Myology",
        type: "module",
        description: "Mushak tizimini o'rganish.",
        icon: "Activity",
        children: [],
      },
    ],
  },
  {
    id: "subj-2",
    title: "Histologiya",
    englishTitle: "Histology",
    type: "subject",
    description: "To'qimalar va hujayralarning mikroskopik darajadagi tuzilishini o'rganadi.",
    icon: "Microscope",
    topicCount: 1,
    articleCount: 2,
    children: [
      {
        id: "mod-h1",
        title: "Sitologiya",
        englishTitle: "Cytology",
        type: "module",
        description: "Hujayra hayotiy sikli va organellalar.",
        icon: "Microscope",
        articleCount: 2,
        children: [
          {
            id: "art-hist-1",
            title: "Epiteliya to'qimasi morfologiyasi",
            type: "article",
            icd11: "XA01.2",
          },
          {
            id: "art-hist-2",
            title: "Qon to'qimasi gistologiyasi",
            type: "article",
            icd11: "XA5Y",
          },
        ],
      },
    ],
  },
  {
    id: "subj-3",
    title: "Fiziyologiya",
    englishTitle: "Physiology",
    type: "subject",
    description: "Organizmning hayotiy jarayonlari va funktsiyalarini o'rganuvchi fan.",
    icon: "Activity",
    topicCount: 2,
    articleCount: 2,
    children: [
      {
        id: "mod-p1",
        title: "Gematologiya",
        englishTitle: "Hematology",
        type: "module",
        description: "Qon tizimi va qon hosil bo'lish jarayonlari.",
        icon: "Activity",
        articleCount: 1,
        children: [
          { id: "art-phys-1", title: "Gemonamika asoslari", type: "article", icd11: "BB05.1" },
        ],
      },
      {
        id: "mod-p2",
        title: "Neyrofiziologiya",
        englishTitle: "Neurophysiology",
        type: "module",
        description: "Nerv tizimi funktsiyalari.",
        icon: "Activity",
        articleCount: 1,
        children: [
          { id: "art-phys-2", title: "Nerv tizimi fiziologiyasi", type: "article", icd11: "XA2Q" },
        ],
      },
    ],
  },
  {
    id: "subj-4",
    title: "Bioximiya",
    englishTitle: "Biochemistry",
    type: "subject",
    description: "Biologik molekulalar va metabolizm jarayonlarini kimyoviy jihatdan o'rganadi.",
    icon: "Dna",
    topicCount: 0,
    articleCount: 0,
    children: [],
  },
  {
    id: "subj-pharm",
    title: "Farmakologiya",
    englishTitle: "Pharmacology",
    type: "subject",
    description: "Dorilar va ularning organizmga ta'sirini o'rganuvchi fan.",
    icon: "Dna",
    topicCount: 1,
    articleCount: 1,
    children: [
      {
        id: "mod-pharm-1",
        title: "Umumiy farmakologiya",
        englishTitle: "General Pharmacology",
        type: "module",
        description: "Farmakodinamika va farmakokinetika asoslari.",
        icon: "Dna",
        articleCount: 1,
        children: [
          {
            id: "art-phar-1",
            title: "Antibiotiklar: Guruhlar va ta'sir mexanizmi",
            type: "article",
            icd11: "XA8T2",
          },
        ],
      },
    ],
  },
  {
    id: "subj-5",
    title: "Pediatriya",
    englishTitle: "Pediatrics",
    type: "subject",
    description: "Bolalar kasalliklari va rivojlanishini o'rganuvchi fan.",
    icon: "Baby",
    topicCount: 1,
    articleCount: 3,
    children: [
      {
        id: "mod-ped-1",
        title: "Propedevtika",
        englishTitle: "Propaedeutics",
        type: "module",
        description: "Bolalar kasalliklari propedevtikasi asoslari.",
        icon: "Baby",
        articleCount: 3,
        children: [
          {
            id: "art-ped-1",
            title: "Bolalarda o'sish va rivojlanish ko'rsatkichlari",
            type: "article",
            icd11: "2A00.0",
          },
          { id: "art-ped-2", title: "Milliy emlash kalendari", type: "article", icd11: "XA9S2" },
          {
            id: "art-ped-3",
            title: "Bolalarda vitamin D tanqisligi",
            type: "article",
            icd11: "5B56",
          },
        ],
      },
    ],
  },
  {
    id: "subj-6",
    title: "Xirurgiya",
    englishTitle: "Surgery",
    type: "subject",
    description: "Operativ yo'l bilan davolash usullarini o'rganuvchi fan.",
    icon: "ScanLine",
    topicCount: 1,
    articleCount: 2,
    children: [
      {
        id: "mod-surg-1",
        title: "Umumiy xirurgiya",
        englishTitle: "General Surgery",
        type: "module",
        description: "Xirurgik kasalliklar umumiy diagnostikasi.",
        icon: "ScanLine",
        articleCount: 2,
        children: [
          {
            id: "art-surg-1",
            title: "O'tkir appenditsit: Tashxis va xirurgik muolaja",
            type: "article",
            icd11: "DB10",
          },
          { id: "art-surg-2", title: "Qorin churralari tasnifi", type: "article", icd11: "DD0Z" },
        ],
      },
    ],
  },
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

export function findNavItemPath(
  id: string,
  items: NavItem[] = medicalCurriculumData,
  path: NavItem[] = [],
): NavItem[] | null {
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
  return new Date(iso).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
  {
    term: "Abssess",
    definition: "To'qimalarning yiringli yallig'lanishi natijasida hosil bo'lgan bo'shliq.",
    category: "Umumiy xirurgiya",
  },
  {
    term: "Anemiya",
    definition: "Qonda gemoglobin va eritrotsitlar miqdorining kamayishi.",
    category: "Gematologiya",
  },
  {
    term: "Bakteriya",
    definition: "Bir hujayrali mikroskopik organizmlar.",
    category: "Mikrobiologiya",
  },
  {
    term: "Vitamin",
    definition: "Organizmning normal ishlashi uchun zarur bo'lgan organik birikmalar.",
    category: "Bioximiya",
  },
];
