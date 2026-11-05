# CLAUDE.md

Repo: dossier-ouderenzorg

## Wat dit is

Kennisdomein-cockpit: data-driven hub-pagina voor infofrankrijk.com, met ouderenzorg in Frankrijk als pilot-domein. Eén Next.js-codebase met meerdere kennisdomeinen via JSON (bron: README.md).

## Live adres

Niet in de repo vastgelegd. De pagina draait als route /ouderenzorg en wordt via een iframe in een Divi Code Module ingebed op infofrankrijk.com (bron: README.md).

## Opbouw

- app: layout.tsx, page.tsx (redirect naar /ouderenzorg), globals.css, ouderenzorg/page.tsx, api/verify-token/route.ts
- components/cockpit: Cockpit, Topbar, DomainHead, Wegwijzer, Atlas, Tools, Vraagbaak, ExtraSections, DomainFoot, PremiumGate, IframeResize
- data/ouderenzorg.json: content van het domein
- lib/schema.ts (Zod-schema voor de JSON), lib/auth.ts (HMAC-SHA256 tokenverificatie)
- DOMEIN-TOEVOEGEN.md: stappen voor een nieuw kennisdomein (nieuw JSON-bestand in data/ en nieuwe route in app/)

## Techniek

Next.js 14 (App Router), React 18, TypeScript, Zod. Scripts: dev, build, start, lint.

## Externe diensten en namen van omgevingsvariabelen

- Vercel (hosting)
- WordPress (Divi-embed en uitgifte van het SSO-token)
- Variabele: INFOFRANKRIJK_SSO_SECRET (gedeeld geheim met WordPress; zonder deze variabele is iedere bezoeker een gratis gebruiker)

## Hoe het live gaat

Volgens README.md deployt Vercel automatisch vanaf main. De standaardtak van deze repo is echter claude/elderly-care-cockpit-mvp-B6Cbm. Embed via iframe in een Divi Code Module, met postMessage-resize (IframeResize). Premium-gating per component via een HMAC-SSO-token van WordPress, via query-parameter sso, cookie if_sso of header x-if-sso.

## Regels en besluiten

Uit README.md en DOMEIN-TOEVOEGEN.md:
- Een nieuw kennisdomein is een nieuw JSON-bestand plus een nieuwe route, zonder codewijzigingen.
- De themes-id's moeten overeenkomen met wegwijzer.quickReplies[].recommends, en er zijn 5 tot en met 8 thema-tegels.
- Voldoet de JSON niet aan het schema, dan crasht de pagina met een duidelijke foutmelding, zodat een half ingevuld domein niet live gaat.
- Premium-componenten: Wegwijzer, Tools en Vraagbaak.
- Acceptatiecriteria (README.md): pixel-identiek aan het canonieke ontwerp, quick-replies markeren de juiste thema-tegels, free-gebruiker ziet placeholders op premium-componenten, iframe-resize zonder inner-scrollbar, geen console-errors, npm run build slaagt.

## Laatst nagelopen

Laatst nagelopen: 5 november 2026
