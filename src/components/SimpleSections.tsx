"use client";

import { PACKS, AGE_RANGES } from "@/lib/data";
import { Icon } from "@/lib/icons";
import type { Selections, Category, Gender, BgType } from "@/lib/types";

function SectionHead({ num, title, sub }: { num: number; title: string; sub: string }) {
  return (
    <div className="section-head">
      <span className="section-num">{num}</span>
      <div>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
    </div>
  );
}

export function PackSection({
  selections,
  onSelect,
}: {
  selections: Selections;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="form-section" id="sec-pack">
      <SectionHead num={1} title="Choose your pack" sub="This sets how many garments you can upload in one shoot." />
      <div className="pack-grid">
        {PACKS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`pack-card${selections.packId === p.id ? " selected" : ""}`}
            onClick={() => onSelect(p.id)}
          >
            <span className="pack-badge">
              <Icon name="garment" />
            </span>
            <span className="name">
              {p.name} — {p.title}
            </span>
            <span className="desc">{p.desc}</span>
            <span className="credits">{p.credits} credits</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function GenderSection({
  selections,
  onSelect,
}: {
  selections: Selections;
  onSelect: (id: Gender) => void;
}) {
  const options: { id: Gender; label: string }[] = [
    { id: "male", label: "Male" },
    { id: "female", label: "Female" },
  ];
  return (
    <section className="form-section" id="sec-gender">
      <SectionHead num={2} title="Select gender" sub="Choose who the AI model will represent." />
      <div className="tile-grid">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`tile-card${selections.gender === o.id ? " selected" : ""}`}
            onClick={() => onSelect(o.id)}
          >
            <div className="name">{o.label}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function CategorySection({
  selections,
  onSelect,
}: {
  selections: Selections;
  onSelect: (id: Category) => void;
}) {
  const options: { id: Category; label: string; sub: string }[] = [
    { id: "kids", label: "Kids", sub: "Ages 0–15" },
    { id: "adult", label: "Adult", sub: "Ages 18–59" },
    { id: "seniors", label: "Seniors", sub: "Ages 60+" },
  ];
  return (
    <section className="form-section" id="sec-category">
      <SectionHead num={3} title="Select category" sub="Kids, adults, and seniors draw from different model sets." />
      <div className="tile-grid tri">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`tile-card${selections.category === o.id ? " selected" : ""}`}
            onClick={() => onSelect(o.id)}
          >
            <div className="name">{o.label}</div>
            <div className="sub">{o.sub}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function AgeSection({
  selections,
  onSelect,
}: {
  selections: Selections;
  onSelect: (age: string) => void;
}) {
  return (
    <section className="form-section" id="sec-age">
      <SectionHead num={4} title="Select age range" sub="A rough range for now — easy to refine later." />
      {!selections.category ? (
        <div className="placeholder-note">Select a category above to unlock age ranges.</div>
      ) : (
        <div className="chip-wrap">
          {AGE_RANGES[selections.category].map((r) => (
            <button
              key={r}
              type="button"
              className={`chip${selections.age === r ? " selected" : ""}`}
              onClick={() => onSelect(r)}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export function BgTypeTiles({
  selections,
  onSelect,
}: {
  selections: Selections;
  onSelect: (id: BgType) => void;
}) {
  const options: { id: BgType; label: string; sub: string }[] = [
    { id: "indoor", label: "Indoor", sub: "Studios, rooms, interiors" },
    { id: "outdoor", label: "Outdoor", sub: "Streets, nature, open air" },
  ];
  return (
    <div className="tile-grid" style={{ marginBottom: 16 }}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`tile-card${selections.bgType === o.id ? " selected" : ""}`}
          onClick={() => onSelect(o.id)}
        >
          <div className="name">{o.label}</div>
          <div className="sub">{o.sub}</div>
        </button>
      ))}
    </div>
  );
}

export { SectionHead };