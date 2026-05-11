"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

const SPRING_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Context + hook ──────────────────────────────────────────────────────────
type OpenOptions = {
  /** Where the modal was triggered from (e.g. "header", "bottom-cta", "/products") */
  source?: string;
};

type ContactSalesContextValue = {
  isOpen: boolean;
  open: (opts?: OpenOptions) => void;
  close: () => void;
};

const ContactSalesContext = createContext<ContactSalesContextValue | null>(null);

export function useContactSales() {
  const ctx = useContext(ContactSalesContext);
  if (!ctx) {
    throw new Error(
      "useContactSales must be called inside <ContactSalesProvider>",
    );
  }
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function ContactSalesProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((opts?: OpenOptions) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setSource(opts?.source);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Restore focus to whatever opened the modal
    setTimeout(() => triggerRef.current?.focus?.(), 50);
  }, []);

  return (
    <ContactSalesContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactSalesModal isOpen={isOpen} onClose={close} source={source} />
    </ContactSalesContext.Provider>
  );
}

// ─── Form data ──────────────────────────────────────────────────────────────
type FormData = {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  teamSize: "",
  message: "",
};

const ROLE_OPTIONS = [
  "跨境卖家 / 品牌方",
  "选品团队 / 选品代理",
  "合规与法务",
  "ERP / SaaS 服务商",
  "运营服务商",
  "其他",
];

const TEAM_SIZE_OPTIONS = [
  "1–10 人",
  "11–50 人",
  "51–200 人",
  "201–1,000 人",
  "1,000+ 人",
];

// ─── Modal ───────────────────────────────────────────────────────────────────
function ContactSalesModal({
  isOpen,
  onClose,
  source,
}: {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Body scroll lock + ESC handler
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // Initial focus on open
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Reset state shortly after close (so the form animates out cleanly first)
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setForm(INITIAL_FORM);
      setSuccess(false);
      setLoading(false);
    }, 380);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Cleanup auto-close timer
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    // Mock backend — replace with your form-service / API call
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.log("[contact-sales] submitted", { ...form, source });

    setLoading(false);
    setSuccess(true);

    // Auto-close after a short success display
    closeTimerRef.current = setTimeout(() => onClose(), 2400);
  }

  // Backdrop click closes (only when clicking the backdrop, not the dialog)
  function onBackdropMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="contact-sales-overlay"
          onMouseDown={onBackdropMouseDown}
          className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 pt-16 sm:items-center sm:p-6"
        >
          {/* Backdrop — its own fast fade so the blur doesn't fight the dialog spring.
              Lighter blur (4px) + GPU layer hint avoid first-paint jank. */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.16,
              ease: "linear",
            }}
            style={{
              willChange: "opacity",
              transform: "translateZ(0)",
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-sales-title"
            aria-describedby="contact-sales-subtitle"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 8, scale: 0.97 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.34,
              ease: SPRING_EASE,
            }}
            className="bento-frame relative isolate w-full max-w-[560px] overflow-hidden rounded-[20px]"
          >
            <div className="p-6 sm:p-8 lg:p-9">
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                  <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
                  Contact Sales
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="关闭"
                  className="-mr-1 rounded-md p-1.5 text-ink-faint transition-colors duration-200 hover:bg-white/[0.05] hover:text-ink focus-visible:bg-white/[0.05] focus-visible:text-ink"
                >
                  <X size={16} strokeWidth={1.75} />
                </button>
              </div>

              {/* Title + subtitle */}
              <h2
                id="contact-sales-title"
                className="text-display mt-5 text-[24px] font-semibold leading-[1.18] text-ink md:text-[28px]"
              >
                30 分钟内,
                <br />
                让销售工程师回复你。
              </h2>
              <p
                id="contact-sales-subtitle"
                className="mt-3 text-sm leading-[1.65] text-ink-muted"
              >
                告诉我们你的跨境业务规模与正在面临的风险或机会场景。
              </p>

              {/* Body — form vs success */}
              <div className="mt-7">
                <AnimatePresence mode="wait" initial={false}>
                  {success ? (
                    <SuccessPanel key="success" onClose={onClose} />
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field
                            ref={firstFieldRef}
                            label="姓名"
                            id="cs-name"
                            type="text"
                            value={form.name}
                            onChange={(v) => update("name", v)}
                            required
                          />
                          <Field
                            label="公司邮箱"
                            id="cs-email"
                            type="email"
                            value={form.email}
                            onChange={(v) => update("email", v)}
                            required
                          />
                        </div>
                        <Field
                          label="公司名称"
                          id="cs-company"
                          type="text"
                          value={form.company}
                          onChange={(v) => update("company", v)}
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <SelectField
                            label="所属角色"
                            id="cs-role"
                            value={form.role}
                            onChange={(v) => update("role", v)}
                            placeholder="选择角色 …"
                            options={ROLE_OPTIONS}
                            required
                          />
                          <SelectField
                            label="团队规模"
                            id="cs-team-size"
                            value={form.teamSize}
                            onChange={(v) => update("teamSize", v)}
                            placeholder="选择规模 …"
                            options={TEAM_SIZE_OPTIONS}
                          />
                        </div>
                        <TextareaField
                          label="想咨询什么?"
                          id="cs-message"
                          value={form.message}
                          onChange={(v) => update("message", v)}
                          placeholder="比如:我们是 3C 配件出海品牌,希望了解检测雷达的批量扫描方案…"
                          required
                        />

                        {/* Submit row */}
                        <div className="mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-[11px] leading-[1.55] text-ink-faint">
                            一般在 1 个工作日内回复 ·{" "}
                            <a
                              href="/privacy"
                              className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand-bright hover:decoration-brand-bright/60"
                            >
                              隐私政策
                            </a>
                          </p>
                          <SubmitButton loading={loading} />
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Field primitives ────────────────────────────────────────────────────────
type FieldProps = {
  label: string;
  id: string;
  type: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, id, type, value, onChange, required },
  ref,
) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        {label}
        {required && <span className="ml-1 text-brand-bright">*</span>}
      </label>
      <input
        ref={ref}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="block w-full rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-brand-bright/60 focus:outline-none"
        autoComplete="off"
      />
    </div>
  );
});

function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        {label}
        {required && <span className="ml-1 text-brand-bright">*</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="block w-full rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink transition-colors focus:border-brand-bright/60 focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  id,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        {label}
        {required && <span className="ml-1 text-brand-bright">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="block w-full resize-none rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-brand-bright/60 focus:outline-none"
      />
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative inline-flex h-11 items-center justify-center gap-1.5 self-end overflow-hidden rounded-full bg-brand px-6 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-hover hover:shadow-[0_0_24px_rgba(217,70,239,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="relative z-[2]">{loading ? "发送中…" : "发送"}</span>
      <ArrowRight
        size={14}
        className={`relative z-[2] transition-transform duration-300 ${
          loading ? "" : "group-hover:translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: SPRING_EASE }}
      className="flex flex-col items-center gap-4 py-6 text-center"
    >
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-bright/30" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-accent-bright/40 bg-accent-bright/10">
          <CheckCircle2
            size={22}
            strokeWidth={1.75}
            className="text-accent-bright"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,255,102,0.6))" }}
          />
        </span>
      </span>
      <div>
        <h3 className="text-[18px] font-semibold leading-tight text-ink">
          已收到 · Thanks
        </h3>
        <p className="mt-2 text-sm leading-[1.65] text-ink-muted">
          我们的销售工程师会在 1 个工作日内联系你。
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint transition-colors hover:text-brand-bright"
      >
        关闭
      </button>
    </motion.div>
  );
}
