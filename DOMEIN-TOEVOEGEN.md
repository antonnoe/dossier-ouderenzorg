# Een nieuw kennisdomein toevoegen

Doel: een nieuw domein (bv. *Verbouwen*, *Belastingen*) live krijgen
zonder ook maar één regel TypeScript aan te raken.

## Stap 1 — JSON-bestand maken

Kopieer `data/ouderenzorg.json` naar `data/<domein>.json` en vul het in.

De velden zijn:

- **`domain`** — eyebrow, title, intro, peildatum, status, versie,
  redacteur, wijzigingen, contactNote (HTML toegestaan in `contactNote`)
- **`wegwijzer`** — badge, title, subtitle, openingQuestion,
  `quickReplies` (elk met `id`, `label`, `recommends`), followup,
  disclaimer (HTML toegestaan in `disclaimer`)
- **`themes`** — 5 t/m 8 thema-tegels. Het `id`-veld moet overeenkomen
  met de waarden in `wegwijzer.quickReplies[].recommends`
- **`tools`** — 0 of meer kaartjes (sectie verbergt zich automatisch
  als de lijst leeg is)
- **`vraagbaak`** — voorbeeldvraag + synthese-antwoord met `<sup>`-tags
  voor bronvermelding, plus `sources[]`
- **`extraSections`** — vrije blokken. `type` is één van:
  `info` · `callout` · `timeline` · `list` · `html`

## Stap 2 — Route aanmaken

Maak `app/<domein>/page.tsx` aan met de inhoud:

```tsx
import { Cockpit } from "@/components/cockpit/Cockpit";
import data from "@/data/<domein>.json";
import { getSessionFromRequest, isPremium } from "@/lib/auth";
import { loadDomain } from "@/lib/schema";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({ searchParams }: PageProps) {
  const domain = loadDomain(data);
  const user = getSessionFromRequest(searchParams);
  return <Cockpit data={domain} isPremium={isPremium(user)} />;
}
```

Vervang `<domein>` op alle drie de plekken. Verder hoeft er niets aangepast.

## Stap 3 — Commit + push

Push naar `main`. Vercel deployt automatisch. Bezoek `/<domein>` om te controleren.

## Validatie

Als de JSON niet voldoet aan het schema crasht de pagina met een
duidelijke foutmelding (welk veld klopt niet). Zo voorkom je dat een
half ingevuld domein stilletjes live gaat.

## Het JSON-schema

Het exacte schema staat in `lib/schema.ts`. Bij twijfel: kopieer
`data/ouderenzorg.json` als startpunt — die voldoet aan het schema.
