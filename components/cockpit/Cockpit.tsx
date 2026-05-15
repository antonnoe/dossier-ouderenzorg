"use client";

import { useMemo, useState } from "react";
import type { DomainData } from "@/lib/schema";
import { Atlas } from "./Atlas";
import { DomainFoot } from "./DomainFoot";
import { DomainHead } from "./DomainHead";
import { ExtraSections } from "./ExtraSections";
import { IframeResize } from "./IframeResize";
import { PremiumGate } from "./PremiumGate";
import { Tools } from "./Tools";
import { Topbar } from "./Topbar";
import { Vraagbaak } from "./Vraagbaak";
import { Wegwijzer } from "./Wegwijzer";

export function Cockpit({ data, isPremium }: { data: DomainData; isPremium: boolean }) {
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);

  const recommendedIds = useMemo(() => {
    const reply = data.wegwijzer.quickReplies.find((q) => q.id === selectedReplyId);
    return new Set(reply?.recommends ?? []);
  }, [data.wegwijzer.quickReplies, selectedReplyId]);

  const wegwijzerNode = (
    <Wegwijzer data={data.wegwijzer} selectedReplyId={selectedReplyId} onSelect={setSelectedReplyId} />
  );

  const toolsNode = <Tools tools={data.tools} peildatum={data.domain.peildatum} />;

  const vraagbaakNode = <Vraagbaak data={data.vraagbaak} />;

  return (
    <>
      <Topbar title={data.domain.title} />
      <div className="cockpit">
        {isPremium ? (
          wegwijzerNode
        ) : (
          <div className="rail-wrap">
            <PremiumGate
              title="Wegwijzer-assistent"
              sub="Voor abonnees: persoonlijke route door dit kennisdomein."
            >
              {wegwijzerNode}
            </PremiumGate>
          </div>
        )}

        <main className="canvas">
          <DomainHead domain={data.domain} />

          <Atlas themes={data.themes} recommendedIds={recommendedIds} />

          {data.tools.length > 0 &&
            (isPremium ? (
              toolsNode
            ) : (
              <PremiumGate
                title="Rekentools"
                sub="APA-indicatie, beslisbomen en meer — beschikbaar voor abonnees."
              >
                {toolsNode}
              </PremiumGate>
            ))}

          <ExtraSections sections={data.extraSections} />

          {isPremium ? (
            vraagbaakNode
          ) : (
            <PremiumGate
              title="AI-Vraagbaak"
              sub="Eén samengesteld antwoord met bronvermelding, op basis van het IF-corpus."
            >
              {vraagbaakNode}
            </PremiumGate>
          )}

          <DomainFoot domain={data.domain} />
        </main>
      </div>
      <IframeResize />
    </>
  );
}
