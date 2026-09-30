# Bar Ranca Ptuj – Spletna stran

## 1. Opis projekta
Premium, vizualno impresivna enostranska spletna stran za Bar Ranca Ptuj – sproščen lokal ob Ptujskem jezeru. Cilj strani je, da obiskovalca v prvih 3 sekundah navduši z ambientom in ga prepriča, da obišče lokacijo. Stran bo popolnoma odzivna, z gladkimi animacijami in profesionalnim dizajnom.

Ciljna publika: Lokalni prebivalci, turisti, mladi in odrasli, ki iščejo sproščen ambient ob jezeru za kavo, pijačo, biljard in druženje.

## 2. Struktura strani
- `/` – Glavna stran (enostranska, z anchor navigacijo do sekcij)
  - Hero
  - Hitre informacije
  - Dobrodošli na Ranci
  - Izberi svoj trenutek
  - Ponudba (samo pijača, brez cen)
  - Cinematic sekcija
  - Galerija
  - Doživetje
  - Lokacija
  - Zaključni CTA
  - Footer

## 3. Jedrne funkcionalnosti
- [x] Transparentna navigacija z glassmorphism efektom ob scrollu
- [x] Cinematic hero sekcija z animacijami
- [x] Smooth scroll in reveal animacije ob scrollu
- [x] Galerija z lightbox pogledom
- [x] Mobile sticky spodnji meni
- [x] Google Maps vgradnja
- [x] SEO optimizacija (meta podatki, schema markup)
- [x] Popolnoma odzivna zasnova
- [x] Klikabilna telefonska številka in navigacija

## 4. Podatkovni model
Baza podatkov ni potrebna. Vse informacije so statične, prikazane na strani. Lastnik lahko kasneje dodaja cene in izdelke v meni preko urejanja kode.

## 5. Integracije tretjih oseb
- Google Maps Embed (za prikaz lokacije)
- Lucide React (ikone)
- GSAP + ScrollTrigger (animacije in parallax)

## 6. Načrt razvojnih faz

### Faza 1: Temeljna postavitev in stili
- Cilj: Nastaviti Tailwind konfiguracijo, globalne stile, Google Fonts in osnovno strukturo projekta
- Dostava: tailwind.config.ts, index.css, index.html z SEO meta podatki

### Faza 2: Gradnja sekcij
- Cilj: Ustvariti vse vizualne sekcije s komponentami
- Dostava: Navbar, Hero, QuickInfo, Welcome, Moments, Menu, Cinematic, Gallery, Experience, Location, FinalCTA, Footer

### Faza 3: Animacije in interakcije
- Cilj: Dodati GSAP animacije, scroll reveal, hover efekte in smooth scroll
- Dostava: Animacije na vseh sekcijah, mobile sticky meni

### Faza 4: Optimizacija in testiranje
- Cilj: Preveriti odzivnost, SEO, build in vizualno kakovost
- Dostava: Build check, SEO schema markup, mobile optimizacija