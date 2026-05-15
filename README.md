# Kennisdomein-cockpit — Ouderenzorg in Frankrijk

Data-driven hub-pagina voor infofrankrijk.com. Pilot-domein: ouderenzorg.
Eén Next.js-codebase, meerdere kennisdomeinen via JSON.

## Wat is dit

- Next.js (App Router) + TypeScript op Vercel
- Eén route per kennisdomein, bv. `/ouderenzorg`
- Alle content uit `data/<domein>.json` (Zod-gevalideerd)
- Premium-gating per component via HMAC-SSO-token van WordPress
- Embedbaar via iframe in een Divi Code Module (postMessage-resize)

## Snel starten (lokaal)

```
npm install
npm run dev
```

Bezoek `http://localhost:3000/ouderenzorg`.

## Build & deploy

```
npm run build
```

Vercel deployt automatisch vanaf `main`. Stel in Vercel onder *Project Settings → Environment Variables* de variabele in:

| Variabele                   | Waarde                          |
|----------------------------|---------------------------------|
| `INFOFRANKRIJK_SSO_SECRET` | gedeeld geheim met WordPress    |

Zonder deze variabele worden alle bezoekers behandeld als niet-abonnees (free).

## SSO-token

WordPress (na inloggen) stelt een token op met dezelfde secret:

```
payloadJson = { "userId": "...", "role": "premium", "exp": <unix-seconds> }
token       = base64url(payloadJson) + "." + hex(hmac_sha256(secret, payloadJson))
```

De cockpit accepteert dit token via:

- query-parameter `?sso=<token>`
- cookie `if_sso`
- HTTP-header `x-if-sso`

Server-side validatie loopt via `/api/verify-token` of automatisch op pagina-render.

## Nieuw kennisdomein toevoegen

Zie [DOMEIN-TOEVOEGEN.md](./DOMEIN-TOEVOEGEN.md).

## Structuur

```
app/
├── layout.tsx
├── page.tsx              ← redirect naar /ouderenzorg
├── globals.css           ← alle CSS-tokens en componentstijlen
├── ouderenzorg/page.tsx  ← cockpit-route voor ouderenzorg
└── api/verify-token/     ← HMAC token validation endpoint

components/cockpit/
├── Cockpit.tsx        ← client-wrapper met state
├── Topbar.tsx         ← logo + breadcrumb
├── DomainHead.tsx     ← titel, intro, status-strip
├── Wegwijzer.tsx      ← rode rail met chat-interactie  (premium)
├── Atlas.tsx          ← thema-tegels
├── Tools.tsx          ← rekentool-kaarten             (premium)
├── Vraagbaak.tsx      ← synthese-kaart                (premium)
├── ExtraSections.tsx  ← vrije blokken (info/callout/timeline/list/html)
├── DomainFoot.tsx     ← peildatum, redacteur, wijzigingen
├── PremiumGate.tsx    ← blur + "alleen voor abonnees" overlay
└── IframeResize.tsx   ← postMessage naar parent (Divi)

data/
└── ouderenzorg.json   ← content van dit domein

lib/
├── schema.ts          ← Zod-schema voor JSON-validatie
└── auth.ts            ← HMAC-SHA256 token-verificatie
```

## Acceptatiecriteria (uit briefing)

1. `/ouderenzorg` rendert pixel-identiek aan canoniek ontwerp
2. Quick-replies markeren correcte thema-tegels
3. Free-user ziet placeholders op premium-componenten; premium-user ziet alles
4. iframe-resize werkt (geen inner-scrollbar in Divi-embed)
5. Nieuw domein = nieuw JSON + nieuwe route, geen code-wijzigingen
6. Geen console-errors/warnings
7. `npm run build` slaagt
