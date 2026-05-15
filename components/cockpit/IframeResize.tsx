"use client";

import { useEffect } from "react";

export function IframeResize() {
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;

    let lastHeight = 0;
    const post = () => {
      const h = document.documentElement.scrollHeight;
      if (h === lastHeight) return;
      lastHeight = h;
      window.parent.postMessage({ type: "iframe-resize", height: h }, "*");
    };

    post();
    const ro = new ResizeObserver(() => post());
    ro.observe(document.documentElement);

    window.addEventListener("load", post);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
    };
  }, []);

  return null;
}
