import FadeIn from './FadeIn'

const SERVICES = [
  {
    number: '01',
    name: 'Sites & e-commerce',
    description:
      "Vitrines et boutiques complètes : catalogue, panier, tunnel de commande, paiement à la livraison ou commande WhatsApp. Pensées pour le mobile et pour être trouvées sur Google.",
  },
  {
    number: '02',
    name: 'Applications web',
    description:
      "Next.js et React pour des produits qui vivent après la mise en ligne : espaces clients, tableaux de bord, éditeurs, multilingue arabe / français / anglais.",
  },
  {
    number: '03',
    name: 'Backends & API',
    description:
      "API REST NestJS, base Postgres ou MySQL, authentification JWT avec 2FA, rôles, journal d'audit et back-office pour que le client gère son contenu lui-même.",
  },
  {
    number: '04',
    name: 'Desktop & mobile',
    description:
      "Outils internes en Electron ou en Python, applications Android en Kotlin et Flutter — quand un site ne suffit pas et qu'il faut toucher au système.",
  },
  {
    number: '05',
    name: 'Motion & scroll design',
    description:
      "Expériences défilantes, caméras qui traversent une scène, transitions GSAP et Framer Motion. Le mouvement au service du produit, jamais l'inverse.",
  },
  {
    number: '06',
    name: 'Mise en ligne & maintenance',
    description:
      "Déploiement sur Vercel, Netlify ou hébergement mutualisé OVH, nom de domaine, certificats, sauvegardes et corrections après lancement.",
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-0 rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.number}
            delay={i * 0.1}
            y={30}
            className="flex flex-col gap-3 border-t py-8 last:border-b sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="shrink-0 font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-2 pt-1 md:gap-4 md:pt-3">
              <h3
                className="font-medium uppercase leading-none text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
