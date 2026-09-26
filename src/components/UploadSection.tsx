"use client";

import { useRef } from "react";
import { PACKS } from "@/lib/data";
import { Icon } from "@/lib/icons";
import { SectionHead } from "./SimpleSections";
import type { Selections } from "@/lib/types";

interface UploadSectionProps {
  selections: Selections;
  onUpload: (index: number, file: File) => void;
  onBatchNameChange: (name: string) => void;
}

export function UploadSection({ selections, onUpload, onBatchNameChange }: UploadSectionProps) {
  const pack = PACKS.find((p) => p.id === selections.packId) || null;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <section className="form-section" id="sec-upload">
      <SectionHead num={8} title="Upload your garments" sub="One clear, well-lit photo per garment works best." />

      {!pack ? (
        <div className="placeholder-note">Choose a pack above to see upload slots.</div>
      ) : (
        <div className="upload-slots">
          {Array.from({ length: pack.images }).map((_, i) => {
            const up = selections.uploads[i];
            const filled = !!up?.dataUrl;
            return (
              <div
                key={i}
                className={`upload-slot${filled ? " filled" : ""}`}
                onClick={() => inputRefs.current[i]?.click()}
              >
                <div className="upload-thumb">
                  {filled ? <img src={up!.dataUrl} alt="" /> : <Icon name="upload" />}
                </div>
                <div className="upload-info">
                  <div className="label">Garment {i + 1}</div>
                  <div className="hint">{filled ? up!.name : "Click to choose a photo"}</div>
                </div>
                <span className="upload-cta">{filled ? "Change" : "Add photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input hidden"
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(i, file);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="batch-name field">
        <span>Name this batch</span>
        <input
          type="text"
          placeholder="e.g. summer-floral-dress"
          value={selections.batchName}
          onChange={(e) => onBatchNameChange(e.target.value)}
        />
      </div>
    </section>
  );
}