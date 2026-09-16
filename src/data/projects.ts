export type Project = {
  id: string
  name: string
  category: string
  year: string
  summary: string
  stack: string[]
  href?: string
  linkLabel?: string
  /** 'mobile' renders the shots as phone screens side by side. */
  layout?: 'mobile'
  /** Web cards read the first three; mobile cards render every entry. */
  images: [string, string, string, ...string[]]
}

/** Eight pieces of work that carry the portfolio — each card stacks and scales on scroll. */
export const projects: Project[] = [
  {
    id: 'rais-store',
    name: 'Rais Store',
    category: 'Client · E-commerce',
    year: '2026',
    summary:
      "Plateforme sneakers à Tunis : vitrine PWA en dark/light, panier et commande WhatsApp, API REST NestJS (catalogue, commandes, paiements, audit) et espace admin protégé par JWT + 2FA TOTP.",
    stack: ['NestJS', 'MySQL', 'PWA', 'JWT + TOTP', 'OVH / Plesk'],
    images: ['/shots/rais-store-1.webp', '/shots/rais-store-2.webp', '/shots/rais-store-3.webp'],
  },
  {
    id: 'farhty',
    name: 'Farhty',
    category: 'Produit · SaaS',
    year: '2026',
    summary:
      "Invitations de mariage et de fêtes en ligne : éditeur de faire-part, gestion des invités, QR code de check-in à l'entrée et parrainage. Trilingue arabe / français / anglais, en production sur Vercel.",
    stack: ['Next.js', 'TypeScript', 'Neon Postgres', 'Supabase', 'Framer Motion'],
    href: 'https://farhty.vercel.app',
    linkLabel: 'Site en ligne',
    images: ['/shots/farhty-1.webp', '/shots/farhty-2.webp', '/shots/farhty-3.webp'],
  },
  {
    id: 'calyrox',
    name: 'Calyrox',
    category: 'Client · Sport',
    year: '2026',
    summary:
      "Site d'un coach Hyrox et calisthénics : porte d'entrée qui laisse choisir sa discipline, puis un monde défilant image par image au scroll. Réservation de programmes adossée à une API NestJS.",
    stack: ['Scroll cinematic', 'NestJS', 'Vanilla JS', 'Video pipeline'],
    images: ['/shots/calyrox-1.webp', '/shots/calyrox-2.webp', '/shots/calyrox-3.webp'],
  },
  {
    id: 'calyrox-mobile',
    name: 'Calyrox Mobile',
    category: 'Client · App mobile',
    year: '2026',
    summary:
      "App compagnon du coach Hyrox / Calisthénics : onboarding qui présente les deux coachs, choix de discipline, connexion athlète, tableau de bord de charge hebdomadaire et séances guidées pas à pas avec chrono et BPM.",
    stack: ['Flutter', 'iOS'],
    layout: 'mobile',
    images: [
      '/shots/calyrox-mobile-1.webp',
      '/shots/calyrox-mobile-2.webp',
      '/shots/calyrox-mobile-3.webp',
      '/shots/calyrox-mobile-4.webp',
      '/shots/calyrox-mobile-5.webp',
      '/shots/calyrox-mobile-6.webp',
    ],
  },
  {
    id: 'isp',
    name: 'ISP Automation',
    category: 'Client · Industrie',
    year: '2026',
    summary:
      "Distributeur tunisien d'automatisation industrielle depuis 2014 : pneumatique, hydraulique, capteurs et instrumentation. Site refondu et rendu éditable par un CMS maison — contenu en JSON, back-office protégé (login, CSRF, upload d'images), brochure PDF. Déployé chez OVH.",
    stack: ['CMS maison', 'JSON', 'OVH', 'SEO'],
    images: ['/shots/isp-1.webp', '/shots/isp-2.webp', '/shots/isp-3.webp'],
  },
  {
    id: 'hydro',
    name: 'Hydro Smart Engineering',
    category: 'Client · Industrie',
    year: '2026',
    summary:
      "Identité et site d'un bureau d'études en traitement de l'eau : pages produits, back-office d'édition du contenu et catalogue papier généré en PDF depuis les mêmes sources. Déployé chez OVH.",
    stack: ['Design system', 'Python (PDF)', 'OVH'],
    href: 'https://hydrosmart.tn',
    linkLabel: 'Site en ligne',
    images: ['/shots/hydro-1.webp', '/shots/hydro-2.webp', '/shots/hydro-3.webp'],
  },
  {
    id: 'palvina',
    name: 'Palvina',
    category: 'Client · Mode',
    year: '2026',
    summary:
      "Boutique de mode modeste branchée sur l'Instagram de la marque : les publications deviennent des fiches produit, un parseur lit prix, tailles et couleurs dans les légendes. Bilingue FR / EN, trois devises.",
    stack: ['React', 'Instagram Graph API', 'Vite', 'i18n', 'Multi-devise'],
    images: ['/shots/palvina-1.webp', '/shots/palvina-2.webp', '/shots/palvina-3.webp'],
  },
  {
    id: 'zouza',
    name: 'Zouza',
    category: 'Client · Pâtisserie',
    year: '2026',
    summary:
      "Pâtisserie artisanale tunisienne : une caméra plonge dans l'atelier, le four et les ingrédients au fil du scroll, sans coupure. Vidéos générées puis découpées, commande par WhatsApp.",
    stack: ['Scroll scrub', 'Video pipeline', 'Vanilla JS'],
    images: ['/shots/zouza-1.webp', '/shots/zouza-2.webp', '/shots/zouza-3.webp'],
  },
  {
    id: 'khademni',
    name: 'Khademni',
    category: 'Produit · App mobile',
    year: '2026',
    summary:
      "Mise en relation avec des artisans à domicile : recherche géolocalisée, réservation, messagerie avec suggestions de réponse IA et abonnement Pro par Stripe. App Flutter en MVVM, API NestJS modulaire sur MongoDB. Bilingue arabe / français, interface RTL comprise.",
    stack: ['Flutter', 'NestJS', 'MongoDB', 'Stripe', 'JWT + OTP', 'Groq'],
    layout: 'mobile',
    images: [
      '/shots/khademni-1.webp',
      '/shots/khademni-2.webp',
      '/shots/khademni-3.webp',
      '/shots/khademni-4.webp',
      '/shots/khademni-5.webp',
    ],
  },
]

export type SideProject = {
  name: string
  meta: string
  image?: string
  href?: string
}

/** Everything else that deserves a mention but not a full card. */
export const sideProjects: SideProject[] = [
  {
    name: 'Maya Style',
    meta: 'Caftan & prêt-à-porter · Vite, GSAP, Lenis',
    image: '/shots/mayastyle-1.webp',
  },
  {
    name: 'Sasha Style',
    meta: 'Boutique une page · React, Vite, Tailwind',
    image: '/shots/sashastyle-1.webp',
  },
  {
    name: 'Hlowwaa',
    meta: 'Parfumerie de niche · Next.js, export statique',
    image: '/shots/parfum-1.webp',
  },
  {
    name: 'AutoDuo Export',
    meta: 'Import auto premium · vitrine + back-office NestJS',
    image: '/shots/autocar-1.webp',
  },
  {
    name: 'Roudayna Designs',
    meta: 'Refonte e-commerce · catalogue reconstruit',
    image: '/shots/rodayne-1.webp',
  },
  {
    name: 'Lo Squalo',
    meta: 'Restaurant de la mer, Ezzahra · site vitrine',
    image: '/shots/resto-1.webp',
  },
  {
    name: 'Jiji',
    meta: 'App desktop Electron · OpenStreetMap → site généré → Vercel',
    image: '/shots/jiji-1.webp',
  },
  {
    name: 'Nadhfni',
    meta: 'Détecteur de doublons macOS / Windows / Linux · Python',
  },
]
