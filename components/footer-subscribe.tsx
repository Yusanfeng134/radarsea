"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FooterSubscribe() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("subscribe", email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 2200);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-5 flex h-11 items-stretch overflow-hidden rounded-lg border border-line-strong focus-within:border-ink transition-colors"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="你的工作邮箱"
        required
        className="flex-1 min-w-0 px-4 text-sm bg-transparent text-ink placeholder:text-ink-faint focus:outline-none"
        aria-label="订阅邮箱"
      />
      <button
        type="submit"
        className={
          "group inline-flex items-center justify-center gap-1.5 border-l border-line-strong bg-transparent px-4 text-sm font-medium transition-colors " +
          (submitted
            ? "text-accent-bright"
            : "text-ink-muted hover:bg-white/[0.04] hover:text-brand-bright focus-visible:bg-white/[0.04] focus-visible:text-brand-bright")
        }
      >
        {submitted ? (
          <>
            已订阅
            <CheckCircle2 size={14} />
          </>
        ) : (
          <>
            订阅
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>
    </form>
  );
}
