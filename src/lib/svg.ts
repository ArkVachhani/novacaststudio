import { POSE_FAM, MODEL_TINTS, STYLE_HUES } from "./data";
import { hashStr, esc } from "./helpers";
import { GARMENT_ICON_MARKUP_WHITE } from "./icons";
import type { BgType, PoseFamily } from "./types";

export interface LookOpts {
  bgType: BgType | null;
  bgName: string;
  fam: PoseFamily;
  modelSeed: number;
  label: string;
}

/**
 * Builds the placeholder "generated look" SVG. This is an honest visual
 * placeholder for the real AI output — see the backend plan for how the
 * real FASHN (+ Gemini, for Pack 2/3) pipeline slots in here later.
 * Ported 1:1 from the approved prototype.
 */
export function buildLookSVG(opts: LookOpts): string {
  const bgHash = hashStr(opts.bgName);
  const hue = opts.bgType === "outdoor" ? 165 + (bgHash % 110) : 30 + (bgHash % 42);
  const sat = opts.bgType === "outdoor" ? 34 : 30;
  const l1 = 21;
  const l2 = opts.bgType === "outdoor" ? 38 : 36;
  const famT = POSE_FAM[opts.fam] || POSE_FAM.standing;
  const tint = MODEL_TINTS[opts.modelSeed % MODEL_TINTS.length];
  const uid = "g" + Math.random().toString(36).slice(2, 8);

  return (
    "" +
    '<svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg">' +
    "<defs>" +
    `<linearGradient id="bgGrad${uid}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="hsl(${hue},${sat}%,${l1}%)"/>` +
    `<stop offset="1" stop-color="hsl(${hue},${sat}%,${l2}%)"/>` +
    "</linearGradient>" +
    `<radialGradient id="vig${uid}" cx="50%" cy="38%" r="75%">` +
    '<stop offset="0%" stop-color="rgba(0,0,0,0)"/><stop offset="100%" stop-color="rgba(0,0,0,0.45)"/>' +
    "</radialGradient>" +
    "</defs>" +
    `<rect width="320" height="400" fill="url(#bgGrad${uid})"/>` +
    '<ellipse cx="160" cy="368" rx="104" ry="13" fill="rgba(0,0,0,0.32)"/>' +
    `<g transform="translate(160,222) rotate(${famT.rot}) scale(${famT.scale}) translate(0,${famT.ty})">` +
    `<circle cx="0" cy="-90" r="32" fill="${tint}" opacity="0.92"/>` +
    `<path d="M-54,-40 Q0,-64 54,-40 L66,88 Q0,116 -66,88 Z" fill="${tint}" opacity="0.92"/>` +
    '<rect x="-17" y="-18" width="34" height="34" rx="9" fill="rgba(19,17,16,0.55)"/>' +
    `<g transform="translate(-9,-10) scale(0.7)">${GARMENT_ICON_MARKUP_WHITE}</g>` +
    "</g>" +
    `<rect width="320" height="400" fill="url(#vig${uid})"/>` +
    '<rect x="0" y="342" width="320" height="58" fill="rgba(12,10,9,0.38)"/>' +
    `<text x="18" y="378" fill="#F4EFE6" font-family="Manrope,sans-serif" font-size="14" font-weight="700">${esc(opts.label)}</text>` +
    '<rect x="228" y="14" width="78" height="24" rx="12" fill="rgba(12,10,9,0.45)"/>' +
    '<text x="267" y="30" fill="#F4EFE6" font-family="Manrope,sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">AI PREVIEW</text>' +
    "</svg>"
  );
}

export function swatchGradient(name: string, type: BgType | null, index: number): string {
  const hash = hashStr(name + index);
  const hue = type === "outdoor" ? 165 + (hash % 110) : 30 + (hash % 42);
  const sat = type === "outdoor" ? 34 : 30;
  return `linear-gradient(135deg, hsl(${hue},${sat}%,26%), hsl(${hue},${sat}%,42%))`;
}

export function styleGradient(fam: PoseFamily): string {
  const h = STYLE_HUES[fam] || 42;
  return `linear-gradient(135deg, hsl(${h},30%,24%), hsl(${h},30%,40%))`;
}