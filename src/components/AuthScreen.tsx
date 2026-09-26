"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import type { AuthUser } from "@/lib/types";

interface AuthScreenProps {
  onLogin: (user: AuthUser) => void;
}

/**
 * Sign-up / log-in screen. No backend wired up yet on purpose — any
 * input logs you in, matching the "frontend only, no backend logic"
 * scope of this commit. Swap in real Supabase Auth per the backend plan.
 */
export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalName = name.trim() || (email.trim().split("@")[0] || "Guest");
    const finalEmail = email.trim() || "guest@example.com";
    onLogin({ name: finalName, email: finalEmail });
  }

  function handleGoogleMock() {
    onLogin({ name: "Guest", email: "guest@example.com" });
  }

  const isSignup = mode === "signup";

  return (
    <div className="auth-wrap">
      <div className="auth-hero">
        <div className="brand">
          <Icon name="camera" /> NovaCastStudio
        </div>
        <h1>Every garment deserves its own photoshoot.</h1>
        <p>
          Upload a flat lay. Cast a model, set the pose, choose the scene. Get publish-ready
          photography back in minutes.
        </p>
        <div className="hero-foot">No studio. No stylist. No shoot day.</div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-card">
          <div className="mobile-brand">
            <Icon name="camera" /> NovaCastStudio
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab${!isSignup ? " active" : ""}`}
              onClick={() => setMode("login")}
            >
              Log in
            </button>
            <button
              type="button"
              className={`auth-tab${isSignup ? " active" : ""}`}
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            )}
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                placeholder="Your password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-primary btn-block">
              {isSignup ? "Create account" : "Log in"}
            </button>
          </form>

          <div className="or-row">or</div>
          <button type="button" className="btn btn-ghost btn-block" onClick={handleGoogleMock}>
            Continue with Google
          </button>

          <p className="auth-switch">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button type="button" className="link-btn" onClick={() => setMode("login")}>
                  Log in
                </button>
              </>
            ) : (
              <>
                New here?{" "}
                <button type="button" className="link-btn" onClick={() => setMode("signup")}>
                  Create an account
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}