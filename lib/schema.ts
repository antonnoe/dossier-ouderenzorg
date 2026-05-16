import { z } from "zod";

export const QuickReplySchema = z.object({
  id: z.string(),
  label: z.string(),
  recommends: z.array(z.string()),
});

export const ThemeSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  readingTime: z.string().optional().default(""),
  href: z.string().optional().default("#"),
});

export const ToolSchema = z.object({
  title: z.string(),
  summary: z.string(),
  cta: z.string().optional().default("Open"),
  href: z.string().optional().default("#"),
});

export const SourceSchema = z.object({
  n: z.number(),
  label: z.string(),
});

export const ExtraSectionSchema = z.object({
  type: z.enum(["info", "callout", "timeline", "list", "html"]),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  lede: z.string().optional(),
  body: z.string().optional(),
  items: z.array(z.string()).optional(),
});

export const DomainDataSchema = z.object({
  domain: z.object({
    eyebrow: z.string(),
    title: z.string(),
    intro: z.string(),
    peildatum: z.string(),
    status: z.string(),
    versie: z.string(),
    redacteur: z.string().optional().default(""),
    wijzigingen: z.string(),
    contactNote: z.string().optional().default(""),
    disclaimer: z.string(),
  }),
  wegwijzer: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    openingQuestion: z.string(),
    quickReplies: z.array(QuickReplySchema),
    followup: z.string(),
    disclaimer: z.string(),
  }),
  themes: z.array(ThemeSchema),
  tools: z.array(ToolSchema),
  vraagbaak: z.object({
    badge: z.string(),
    title: z.string(),
    intro: z.string(),
    exampleQuestion: z.string(),
    answer: z.string(),
    sources: z.array(SourceSchema),
  }),
  extraSections: z.array(ExtraSectionSchema),
});

export type DomainData = z.infer<typeof DomainDataSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type QuickReply = z.infer<typeof QuickReplySchema>;
export type ExtraSection = z.infer<typeof ExtraSectionSchema>;

export function loadDomain(raw: unknown): DomainData {
  const result = DomainDataSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      "Ongeldig domein-JSON: " + JSON.stringify(result.error.issues, null, 2),
    );
  }
  return result.data;
}
