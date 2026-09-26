"use client";

import { MODELS, STYLES, BACKGROUNDS, MODEL_TINTS } from "@/lib/data";
import { Icon, poseIconKey } from "@/lib/icons";
import { styleGradient, swatchGradient } from "@/lib/svg";
import { initials, cap } from "@/lib/helpers";
import { AccordionField } from "./AccordionField";
import { SectionHead } from "./SimpleSections";
import { BgTypeTiles } from "./SimpleSections";
import type { Selections, BgType } from "@/lib/types";

interface AccordionState {
  openField: string | null;
  onToggle: (field: string) => void;
}

export function ModelSection({
  selections,
  onSelect,
  accordion,
}: {
  selections: Selections;
  onSelect: (id: string) => void;
  accordion: AccordionState;
}) {
  const list = MODELS.filter(
    (m) => (!selections.gender || m.gender === selections.gender) && (!selections.category || m.category === selections.category)
  );
  const shown = list.length > 0 ? list : MODELS.filter((m) => !selections.gender || m.gender === selections.gender);

  const selectedModel = MODELS.find((m) => m.id === selections.modelId) || null;

  return (
    <section className="form-section" id="sec-model">
      <SectionHead num={5} title="Cast your model" sub="Matched to the gender and category you picked. Click to browse the library." />
      <AccordionField
        field="model"
        label="Model"
        currentText={selectedModel ? selectedModel.name : "Not selected yet"}
        preview={selectedModel ? initials(selectedModel.name) : undefined}
        previewBg={selectedModel ? MODEL_TINTS[selectedModel.seed % MODEL_TINTS.length] : undefined}
        isOpen={accordion.openField === "model"}
        onToggle={() => accordion.onToggle("model")}
      >
        <div className="thumb-grid">
          {shown.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`model-card${selections.modelId === m.id ? " selected" : ""}`}
              onClick={() => onSelect(m.id)}
            >
              <div className="avatar-circle" style={{ background: MODEL_TINTS[m.seed % MODEL_TINTS.length] }}>
                {initials(m.name)}
              </div>
              <div className="name">{m.name}</div>
              <div className="tag">{cap(m.category)}</div>
            </button>
          ))}
        </div>
      </AccordionField>
    </section>
  );
}

export function StyleSection({
  selections,
  onSelect,
  accordion,
}: {
  selections: Selections;
  onSelect: (id: string) => void;
  accordion: AccordionState;
}) {
  const list = STYLES.filter((s) => !selections.category || s.cats.includes(selections.category));
  const shown = list.length > 0 ? list : STYLES;
  const selectedStyle = STYLES.find((s) => s.id === selections.styleId) || null;

  return (
    <section className="form-section" id="sec-style">
      <SectionHead num={6} title="Choose a style" sub="How your model is posed for the shot." />
      <AccordionField
        field="style"
        label="Style"
        currentText={selectedStyle ? selectedStyle.name : "Not selected yet"}
        preview={selectedStyle ? <Icon name={poseIconKey(selectedStyle.fam)} /> : undefined}
        isOpen={accordion.openField === "style"}
        onToggle={() => accordion.onToggle("style")}
      >
        <div className="thumb-grid">
          {shown.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`swatch-card${selections.styleId === s.id ? " selected" : ""}`}
              onClick={() => onSelect(s.id)}
            >
              <div className="swatch-face" style={{ background: styleGradient(s.fam) }}>
                <Icon name={poseIconKey(s.fam)} />
                <span className="swatch-check">
                  <Icon name="check" />
                </span>
              </div>
              <div className="swatch-label">{s.name}</div>
            </button>
          ))}
        </div>
      </AccordionField>
    </section>
  );
}

export function BackgroundSection({
  selections,
  onSelectType,
  onSelectBackground,
  accordion,
}: {
  selections: Selections;
  onSelectType: (id: BgType) => void;
  onSelectBackground: (id: string) => void;
  accordion: AccordionState;
}) {
  const type = selections.bgType || "indoor";
  const list = BACKGROUNDS[type];
  const badge = type === "indoor" ? "home" : "leaf";
  const selectedBg = list.find((b) => b.id === selections.bgId) || null;

  return (
    <section className="form-section" id="sec-bgtype">
      <SectionHead num={7} title="Indoor or outdoor" sub="Sets the kind of scene behind your model, and which backgrounds show up below." />
      <BgTypeTiles selections={selections} onSelect={onSelectType} />
      <AccordionField
        field="background"
        label="Background"
        currentText={selectedBg ? selectedBg.name : "Not selected yet"}
        preview={<Icon name={badge} />}
        isOpen={accordion.openField === "background"}
        onToggle={() => accordion.onToggle("background")}
      >
        <div className="thumb-grid">
          {list.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              className={`swatch-card${selections.bgId === b.id ? " selected" : ""}`}
              onClick={() => onSelectBackground(b.id)}
            >
              <div className="swatch-face" style={{ background: swatchGradient(b.name, type, idx) }}>
                <Icon name={badge} />
                <span className="swatch-check">
                  <Icon name="check" />
                </span>
              </div>
              <div className="swatch-label">{b.name}</div>
            </button>
          ))}
        </div>
      </AccordionField>
    </section>
  );
}