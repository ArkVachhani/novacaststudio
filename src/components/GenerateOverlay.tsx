"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";
import type { ResultImage } from "@/lib/types";

const LOADING_MSGS = [
  "Preparing your garment reference…",
  "Positioning the model and pose…",
  "Applying the background scene…",
  "Finalizing your look…",
];

interface GenerateOverlayProps {
  open: boolean;
  phase: "loading" | "result";
  results: ResultImage[];
  onClose: () => void;
  onLoadingDone: () => void;
  onStartNewShoot: () => void;
  onDownload: (result: ResultImage) => void;
}

export function GenerateOverlay({
  open,
  phase,
  results,
  onClose,
  onLoadingDone,
  onStartNewShoot,
  onDownload,
}: GenerateOverlayProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [pct, setPct] = useState(5);
  const doneRef = useRef(onLoadingDone);
  doneRef.current = onLoadingDone;

  useEffect(() => {
    if (!open || phase !== "loading") return;
    setMsgIndex(0);
    setPct(5);
    let step = 0;
    let running = 5;
    const interval = setInterval(() => {
      step++;
      running = Math.min(96, running + 23);
      setPct(running);
      if (step < LOADING_MSGS.length) setMsgIndex(step);
      if (step >= LOADING_MSGS.length) {
        clearInterval(interval);
        setTimeout(() => doneRef.current(), 500);
      }
    }, 850);
    return () => clearInterval(interval);
  }, [open, phase]);

  if (!open) return null;

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="overlay-card wide">
        <div className="overlay-head">
          <h2>
            {phase === "loading"
              ? "Generating"
              : results.length > 1
              ? "Your looks are ready"
              : "Your look is ready"}
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="overlay-body">
          {phase === "loading" ? (
            <div className="loading-view">
              <div className="spinner" />
              <div className="loading-status">{LOADING_MSGS[msgIndex]}</div>
              <div className="loading-bar">
                <div className="loading-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 13.5, color: "var(--text-faint)", marginBottom: 18 }}>
                Preview placeholders below — connect your AI engine to render the real photo.
              </p>
              <div className="result-grid">
                {results.map((r) => (
                  <div className="result-card" key={r.id}>
                    {r.thumb && (
                      <div className="result-thumb">
                        <img src={r.thumb} alt="" />
                      </div>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: r.svg }} />
                    <button
                      type="button"
                      className="result-dl"
                      aria-label="Download"
                      onClick={() => onDownload(r)}
                    >
                      <Icon name="download" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="result-actions">
                <button type="button" className="btn btn-ghost" onClick={onStartNewShoot}>
                  Start a new photoshoot
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
