"use client";

import { PACKS, MODELS, STYLES, BACKGROUNDS } from "@/lib/data";
import { cap } from "@/lib/helpers";
import type { Selections } from "@/lib/types";

export function SummarySidebar({
  selections,
  onGenerate,
}: {
  selections: Selections;
  onGenerate: () => void;
}) {
  const pack = PACKS.find((p) => p.id === selections.packId) || null;
  const model = MODELS.find((m) => m.id === selections.modelId) || null;
  const style = STYLES.find((s) => s.id === selections.styleId) || null;
  const bgList = selections.bgType === "outdoor" ? BACKGROUNDS.outdoor : BACKGROUNDS.indoor;
  const bg = bgList.find((b) => b.id === selections.bgId) || null;
  const uploaded = selections.uploads.filter((u) => u?.dataUrl).length;

  const rows: { label: string; value: string | null }[] = [
    { label: "Pack", value: pack ? pack.name : null },
    { label: "Gender", value: selections.gender ? cap(selections.gender) : null },
    { label: "Category", value: selections.category ? cap(selections.category) : null },
    { label: "Age range", value: selections.age },
    { label: "Model", value: model ? model.name : null },
    { label: "Style", value: style ? style.name : null },
    { label: "Background", value: bg ? bg.name : null },
    { label: "Garments", value: pack ? `${uploaded} of ${pack.images}` : null },
    { label: "Batch name", value: selections.batchName || null },
  ];

  return (
    <aside className="side-col">
      <div className="summary-card">
        <h3>Your shoot</h3>
        <div className="summary-rows">
          {rows.map((r) => (
            <div className="summary-row" key={r.label}>
              <span className="slabel">{r.label}</span>
              <span className={`svalue${r.value ? "" : " empty"}`}>{r.value || "Not set"}</span>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary btn-block" onClick={onGenerate}>
          Generate photos
        </button>
      </div>
    </aside>
  );
}