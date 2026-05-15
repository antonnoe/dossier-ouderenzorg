"use client";

import { useCallback } from "react";
import type { DomainData } from "@/lib/schema";

interface Props {
  data: DomainData["wegwijzer"];
  selectedReplyId: string | null;
  onSelect: (id: string | null) => void;
}

export function Wegwijzer({ data, selectedReplyId, onSelect }: Props) {
  const selectedReply = data.quickReplies.find((q) => q.id === selectedReplyId) ?? null;

  const handleClick = useCallback(
    (id: string) => () => onSelect(id),
    [onSelect],
  );

  return (
    <aside className="rail-wrap">
      <div className="rail">
        <div className="rail-head">
          <span className="badge">
            <span className="dot" />
            <span>{data.badge}</span>
          </span>
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>

        <div className="chat" id="rail-chat">
          <div className="bubble bot">{data.openingQuestion}</div>

          {!selectedReply && (
            <div className="quick">
              {data.quickReplies.map((qr) => (
                <button key={qr.id} type="button" onClick={handleClick(qr.id)}>
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {selectedReply && (
            <>
              <div className="bubble user">{selectedReply.label}</div>
              <div className="bubble bot">{data.followup}</div>
            </>
          )}
        </div>

        <div className="chat-input">
          Of typ uw vraag… <span className="send">Stuur</span>
        </div>

        <div
          className="rail-foot"
          dangerouslySetInnerHTML={{ __html: data.disclaimer }}
        />
      </div>
    </aside>
  );
}
