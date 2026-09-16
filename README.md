# Portfolio — Rayen Borgi

Landing page one-page : hero plein écran, bandeau d'aperçus qui défile au scroll,
section à propos, services, pile de cartes projets et contact.

Stack : Vite + React 19 + TypeScript + Tailwind CSS 3 + Framer Motion + Lucide.
Typo Kanit (Google Fonts), fond `#0C0C0C`, texte `#D7E2EA`.

## Lancer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production -> dist/
npm run preview  # sert le build
```

## Où changer quoi

| Quoi | Fichier |
| --- | --- |
| Projets mis en avant + autres réalisations | `src/data/projects.ts` |
| Textes du hero, nav | `src/components/HeroSection.tsx` |
| Texte « à propos » | `src/components/AboutSection.tsx` |
| Liste des services | `src/components/ServicesSection.tsx` |
| Email, GitHub, ville | `src/components/ContactSection.tsx` |
| Photo de profil | `public/avatar.png` |

## Captures d'écran des projets

Les aperçus dans `public/shots/` sont générés automatiquement : chaque projet est
servi en local (python `http.server`, ou `php -S` pour Hydro), puis Chrome headless
prend trois captures à trois hauteurs de scroll.

```bash
npm run shots                       # regénère tout
node scripts/shoot-one.mjs isp      # un seul projet
```

Les cibles (dossier, port, positions de scroll) sont listées en haut de
[`scripts/shoot.mjs`](scripts/shoot.mjs) ; Calyrox a sa propre passe ([`scripts/shoot-calyrox.mjs`](scripts/shoot-calyrox.mjs)) parce qu’il faut franchir sa porte d’entrée avant de scroller. Après la capture, convertir en WebP :

```bash
python3 -c "
from PIL import Image; import pathlib
for p in pathlib.Path('public/shots').glob('*.png'):
    im = Image.open(p).convert('RGB')
    if im.width > 1600: im = im.resize((1600, round(im.height*1600/im.width)), Image.LANCZOS)
    im.save(p.with_suffix('.webp'), 'WEBP', quality=80, method=6); p.unlink()
"
```

`npm run review` rejoue la page complète en 1440px et en 390px et écrit les
captures dans le dossier temporaire — utile pour vérifier une modif sans ouvrir
le navigateur.

## Composants réutilisables

- `FadeIn` — apparition au scroll (`whileInView`, joué une seule fois).
- `Magnet` — l'élément suit la souris quand le curseur entre dans son rayon.
- `AnimatedText` — révélation caractère par caractère pilotée par le scroll.
- `ContactButton` / `LiveProjectButton` — les deux boutons de la page.

## Déploiement

Build statique, rien côté serveur : `dist/` se pose tel quel sur Vercel, Netlify,
GitHub Pages ou un hébergement mutualisé.

## Hébergement

Le site est publié sur GitHub Pages : <https://rayen122.github.io>

- Branche `main` : le code source.
- Branche `gh-pages` : le contenu de `dist/` servi par Pages.

Pour redéployer après des modifications :

```bash
npm run deploy
```

Le script construit le projet, copie `dist/` sur la branche `gh-pages`
et la force-push. Pages se reconstruit tout seul en une minute environ.
