"use client";

import { Icon } from "@/lib/icons";
import type { Theme } from "@/lib/types";

interface SettingsOverlayProps {
  open: boolean;
  theme: Theme;
  onSetTheme: (t: Theme) => void;
  onClose: () => void;
  onLogout: () => void;
}

export function SettingsOverlay({ open, theme, onSetTheme, onClose, onLogout }: SettingsOverlayProps) {
  if (!open) return null;

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="overlay-card">
        <div className="overlay-head">
          <h2>Settings</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="overlay-body">
          <div className="settings-section">
            <div className="sec-title">Appearance</div>
            <div className="settings-row">
              <span>Theme</span>
              <div className="seg">
                <button
                  type="button"
                  className={theme === "light" ? "active" : ""}
                  onClick={() => onSetTheme("light")}
                >
                  Light
                </button>
                <button
                  type="button"
                  className={theme === "dark" ? "active" : ""}
                  onClick={() => onSetTheme("dark")}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
          <div className="settings-section">
            <div className="sec-title">Account</div>
            <button type="button" className="btn btn-ghost btn-block" onClick={onLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}