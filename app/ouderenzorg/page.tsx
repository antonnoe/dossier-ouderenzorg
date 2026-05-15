import { Cockpit } from "@/components/cockpit/Cockpit";
import ouderenzorgData from "@/data/ouderenzorg.json";
import { getSessionFromRequest, isPremium } from "@/lib/auth";
import { loadDomain } from "@/lib/schema";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function OuderenzorgPage({ searchParams }: PageProps) {
  const data = loadDomain(ouderenzorgData);
  const user = getSessionFromRequest(searchParams);
  return <Cockpit data={data} isPremium={isPremium(user)} />;
}
