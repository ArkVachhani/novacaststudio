"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/lib/icons";

interface AccordionFieldProps {
  field: string;
  label: string;
  currentText: string;
  preview?: React.ReactNode;
  previewBg?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

/**
 * The collapsible "click to browse the library" field used for Model,
 * Style, and Background. Height-animates open/closed the same way the
 * prototype did (measuring scrollHeight), just via a ref instead of
 * direct DOM queries.
 */
export function AccordionField({
  field,
  label,
  currentText,
  preview,
  previewBg,
  isOpen,
  onToggle,
  children,
}: AccordionFieldProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : "0px";
  });

  return (
    <div className={`field-accordion${isOpen ? " open" : ""}`} data-field={field}>
      <button type="button" className="field-header" onClick={onToggle}>
        <span className="field-preview" style={previewBg ? { background: previewBg } : undefined}>
          {preview}
        </span>
        <span className="field-headtext">
          <span className="field-name">{label}</span>
          <span className="field-current">{currentText}</span>
        </span>
        <span className="field-chevron">
          <Icon name="chevronDown" />
        </span>
      </button>
      <div className="field-panel" ref={panelRef}>
        <div className="field-panel-inner">{children}</div>
      </div>
    </div>
  );
}