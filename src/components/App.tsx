"use client";

import { useEffect, useRef, useState } from "react";
import { PACKS, MODELS, STYLES, BACKGROUNDS } from "@/lib/data";
import { buildLookSVG } from "@/lib/svg";
import { Icon } from "@/lib/icons";
import { AuthScreen } from "./AuthScreen";
import { PackSection, GenderSection, CategorySection, AgeSection } from "./SimpleSections";
import { ModelSection, StyleSection, BackgroundSection } from "./LibrarySections";
import { UploadSection } from "./UploadSection";
import { SummarySidebar } from "./SummarySidebar";
import { GenerateOverlay } from "./GenerateOverlay";
import { SettingsOverlay } from "./SettingsOverlay";
import { Toast } from "./Toast";
import type { AuthUser, BgType, Category, Gender, ResultImage, Selections, Theme } from "@/lib/types";

const EMPTY_SELECTIONS: Selections = {
  packId: null,
  gender: null,
  category: null,
  age: null,
  modelId: null,
  styleId: null,
  bgType: null,
  bgId: null,
  batchName: "",
  uploads: [],
};

const REQUIRED_ORDER: { key: keyof Selections; sec: string; msg: string }[] = [
  { key: "packId", sec: "sec-pack", msg: "Choose a pack first." },
  { key: "gender", sec: "sec-gender", msg: "Select a gender first." },
  { key: "category", sec: "sec-category", msg: "Select a category first." },
  { key: "age", sec: "sec-age", msg: "Select an age range first." },
  { key: "modelId", sec: "sec-model", msg: "Cast a model first." },
  { key: "styleId", sec: "sec-style", msg: "Choose a style first." },
  { key: "bgType", sec: "sec-bgtype", msg: "Choose indoor or outdoor first." },
  { key: "bgId", sec: "sec-bgtype", msg: "Pick a background first." },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser>({ name: "", email: "" });
  const [selections, setSelections] = useState<Selections>(EMPTY_SELECTIONS);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [theme, setThemeState] = useState<Theme>("dark");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [generatePhase, setGeneratePhase] = useState<"loading" | "result">("loading");
  const [results, setResults] = useState<ResultImage[]>([]);
  const [toast, setToast] = useState({ message: "", show: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Theme: restore saved preference on mount ----
  useEffect(() => {
    try {
      const stored = localStorage.getItem("novacast-theme");
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("novacast-theme", t);
    } catch {
      /* ignore */
    }
  }

  function showToast(message: string) {
    setToast({ message, show: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2400);
  }

  // ---- Auth (no backend yet — matches this commit's frontend-only scope) ----
  function handleLogin(u: AuthUser) {
    setUser(u);
    setLoggedIn(true);
    showToast(`Welcome, ${u.name}.`);
  }

  function handleLogout() {
    setSettingsOpen(false);
    setLoggedIn(false);
  }

  // ---- Selections ----
  function selectPack(id: string) {
    setSelections((s) => ({ ...s, packId: id, uploads: [] }));
  }
  function selectGender(id: Gender) {
    setSelections((s) => ({ ...s, gender: id, modelId: null }));
  }
  function selectCategory(id: Category) {
    setSelections((s) => ({ ...s, category: id, age: null, modelId: null, styleId: null }));
  }
  function selectAge(age: string) {
    setSelections((s) => ({ ...s, age }));
  }
  function selectModel(id: string) {
    setSelections((s) => ({ ...s, modelId: id }));
    setTimeout(() => setOpenAccordion(null), 260);
  }
  function selectStyle(id: string) {
    setSelections((s) => ({ ...s, styleId: id }));
    setTimeout(() => setOpenAccordion(null), 260);
  }
  function selectBgType(id: BgType) {
    setSelections((s) => ({ ...s, bgType: id, bgId: null }));
  }
  function selectBackground(id: string) {
    setSelections((s) => ({ ...s, bgId: id }));
    setTimeout(() => setOpenAccordion(null), 260);
  }
  function handleUpload(index: number, file: File) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSelections((s) => {
        const uploads = [...s.uploads];
        uploads[index] = { name: file.name, dataUrl: ev.target?.result as string };
        return { ...s, uploads };
      });
    };
    reader.readAsDataURL(file);
  }
  function handleBatchNameChange(name: string) {
    setSelections((s) => ({ ...s, batchName: name }));
  }
  function toggleAccordion(field: string) {
    setOpenAccordion((cur) => (cur === field ? null : field));
  }

  // ---- Validation + jump-and-flash ----
  function goToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.remove("flash");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (el as HTMLElement).offsetWidth; // force reflow so the animation can restart
    el.classList.add("flash");
  }

  function validateAll(): { ok: true } | { ok: false; sec: string; msg: string } {
    for (const r of REQUIRED_ORDER) {
      if (!selections[r.key]) return { ok: false, sec: r.sec, msg: r.msg };
    }
    const pack = PACKS.find((p) => p.id === selections.packId)!;
    const uploaded = selections.uploads.filter((u) => u?.dataUrl).length;
    if (uploaded < pack.images) {
      return { ok: false, sec: "sec-upload", msg: `Upload all ${pack.images} garment photo(s) first.` };
    }
    if (!selections.batchName.trim()) {
      return { ok: false, sec: "sec-upload", msg: "Name this batch first." };
    }
    return { ok: true };
  }

  function handleGenerateClick() {
    const v = validateAll();
    if (!v.ok) {
      goToSection(v.sec);
      showToast(v.msg);
      return;
    }
    setGeneratePhase("loading");
    setGenerateOpen(true);
  }

  // ---- Building the placeholder result(s) once the loading sequence finishes ----
  function handleLoadingDone() {
    const pack = PACKS.find((p) => p.id === selections.packId) || null;
    const model = MODELS.find((m) => m.id === selections.modelId) || null;
    const style = STYLES.find((s) => s.id === selections.styleId) || null;
    const bgList = selections.bgType === "outdoor" ? BACKGROUNDS.outdoor : BACKGROUNDS.indoor;
    const bg = bgList.find((b) => b.id === selections.bgId) || null;
    const n = pack ? pack.images : 1;

    const built: ResultImage[] = [];
    for (let i = 0; i < n; i++) {
      const up = selections.uploads[i];
      const label = `${selections.batchName || "look"}_${i + 1}`;
      const svg = buildLookSVG({
        bgType: selections.bgType,
        bgName: bg ? bg.name : "Studio",
        fam: style ? style.fam : "standing",
        modelSeed: model ? model.seed : 0,
        label,
      });
      built.push({ id: `r${Date.now()}${i}`, filename: label, svg, thumb: up?.dataUrl || null });
    }
    setResults(built);
    setGeneratePhase("result");
  }

  function handleStartNewShoot() {
    setSelections(EMPTY_SELECTIONS);
    setGenerateOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDownload(result: ResultImage) {
    try {
      const blob = new Blob([result.svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${result.filename}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      showToast("Download is not available in this view.");
    }
  }

  const accordionState = { openField: openAccordion, onToggle: toggleAccordion };

  if (!loggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <Icon name="camera" />
          <span className="wordmark">NovaCastStudio</span>
        </div>
        <div className="topbar-right">
          <button
            type="button"
            className="icon-btn"
            aria-label="Settings"
            onClick={() => setSettingsOpen(true)}
          >
            <Icon name="gear" />
          </button>
        </div>
      </header>

      <div className="layout">
        <div className="main-col" id="main-col">
          <PackSection selections={selections} onSelect={selectPack} />
          <GenderSection selections={selections} onSelect={selectGender} />
          <CategorySection selections={selections} onSelect={selectCategory} />
          <AgeSection selections={selections} onSelect={selectAge} />
          <ModelSection selections={selections} onSelect={selectModel} accordion={accordionState} />
          <StyleSection selections={selections} onSelect={selectStyle} accordion={accordionState} />
          <BackgroundSection
            selections={selections}
            onSelectType={selectBgType}
            onSelectBackground={selectBackground}
            accordion={accordionState}
          />
          <UploadSection
            selections={selections}
            onUpload={handleUpload}
            onBatchNameChange={handleBatchNameChange}
          />
        </div>

        <SummarySidebar selections={selections} onGenerate={handleGenerateClick} />
      </div>

      <GenerateOverlay
        open={generateOpen}
        phase={generatePhase}
        results={results}
        onClose={() => setGenerateOpen(false)}
        onLoadingDone={handleLoadingDone}
        onStartNewShoot={handleStartNewShoot}
        onDownload={handleDownload}
      />

      <SettingsOverlay
        open={settingsOpen}
        theme={theme}
        onSetTheme={setTheme}
        onClose={() => setSettingsOpen(false)}
        onLogout={handleLogout}
      />

      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}