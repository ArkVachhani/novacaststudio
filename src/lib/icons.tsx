import React from "react";

export type IconName =
  | "camera"
  | "gear"
  | "gallery"
  | "close"
  | "chevronDown"
  | "check"
  | "upload"
  | "download"
  | "home"
  | "leaf"
  | "poseStanding"
  | "poseSeated"
  | "poseAction"
  | "posePortrait"
  | "garment";

// Ported 1:1 from the prototype's ICONS map (artifact 21bfdce7-...).
export function Icon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "camera":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24">
          <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
          <circle cx="12" cy="13" r="3.4" />
        </svg>
      );
    case "gear":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 13.5a1.7 1.7 0 0 0 .35 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.35 1.7 1.7 0 0 0-1.05 1.55V19.5a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.95 17.85a1.7 1.7 0 0 0-1.87.35l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 13.5a1.7 1.7 0 0 0-1.55-1.05H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 7.4a1.7 1.7 0 0 0-.35-1.87l-.06-.06A2 2 0 1 1 7.02 2.64l.06.06a1.7 1.7 0 0 0 1.87.35h.06A1.7 1.7 0 0 0 10 1.5V1.4a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.05 1.55h.06a1.7 1.7 0 0 0 1.87-.35l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.35 1.87v.06c.27.62.83 1.05 1.5 1.05h.1a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.05Z" />
        </svg>
      );
    case "gallery":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24" style={{ width: 22, height: 22 }}>
          <rect x="4" y="6" width="14" height="14" rx="2" />
          <path d="M8 2h12a2 2 0 0 1 2 2v12" />
        </svg>
      );
    case "close":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "check":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24" style={{ width: 13, height: 13, strokeWidth: 2.4 }}>
          <path d="M4 12l5 5L20 6" />
        </svg>
      );
    case "upload":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24">
          <path d="M12 16V4M7 9l5-5 5 5" />
          <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </svg>
      );
    case "download":
      return (
        <svg className={className ?? "icon"} viewBox="0 0 24 24" style={{ width: 17, height: 17, stroke: "#fff" }}>
          <path d="M12 4v12M7 11l5 5 5-5" />
          <path d="M4 19h16" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255,255,255,0.85)", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
          <path d="M4 11l8-7 8 7" />
          <path d="M6 10v9h12v-9" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255,255,255,0.85)", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
          <path d="M5 19c8 1 14-5 14-14C10 5 5 11 5 19Z" />
          <path d="M5 19c3-4 6-7 12-11" />
        </svg>
      );
    case "poseStanding":
      return (
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255,255,255,0.85)", strokeWidth: 1.6, strokeLinecap: "round" }}>
          <circle cx="12" cy="5" r="2.1" />
          <path d="M12 8v8M9 11l3-1.4 3 1.4M9 21l3-5 3 5" />
        </svg>
      );
    case "poseSeated":
      return (
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255,255,255,0.85)", strokeWidth: 1.6, strokeLinecap: "round" }}>
          <circle cx="12" cy="6" r="2" />
          <path d="M12 9v5M9 12h6M9 20v-6l3 1 3-1v6" />
        </svg>
      );
    case "poseAction":
      return (
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255,255,255,0.85)", strokeWidth: 1.6, strokeLinecap: "round" }}>
          <circle cx="13" cy="5" r="2" />
          <path d="M13 8l-2 4 3 2M11 12l-4 2M14 14l3 6M11 12l-2 8" />
        </svg>
      );
    case "posePortrait":
      return (
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255,255,255,0.85)", strokeWidth: 1.6, strokeLinecap: "round" }}>
          <circle cx="12" cy="9" r="4" />
          <path d="M5 21c1.5-4 4-6 7-6s5.5 2 7 6" />
        </svg>
      );
    case "garment":
      return (
        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "none", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
          <path d="M9 4 5 7v3h2v10h10V10h2V7l-4-3-3 2-3-2Z" />
        </svg>
      );
    default:
      return null;
  }
}

// Raw markup version of the garment icon, tinted white — used inside the
// server-rendered SVG "look" preview string in svg.ts, which can't use JSX.
export const GARMENT_ICON_MARKUP_WHITE =
  '<svg viewBox="0 0 24 24" style="width:100%;height:100%;fill:none;stroke:rgba(255,255,255,0.92);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;"><path d="M9 4 5 7v3h2v10h10V10h2V7l-4-3-3 2-3-2Z"/></svg>';

export function poseIconKey(fam: string): IconName {
  if (fam === "seated") return "poseSeated";
  if (fam === "action") return "poseAction";
  if (fam === "portrait") return "posePortrait";
  return "poseStanding";
}