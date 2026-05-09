import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Building2,
  HeartHandshake,
  LifeBuoy,
  Mail,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "联系我们 · Contact",
  description:
    "联系出海雷达 — 销售、商务合作、客户支持与人才合作的对接邮箱与办公地址。",
};

type Channel = {
  icon: LucideIcon;
  label: string;
  englishLabel: string;
  description: string;
  email: string;
};

const CHANNELS: Channel[] = [
  {
    icon: Building2,
    label: "销售合作",
    englishLabel: "Sales",
    description: "了解产品、获取演示、申请试用账号或商务报价。",
    email: site.email.sales,
  },
  {
    icon: HeartHandshake,
    label: "商务合作",
    englishLabel: "Business Dev",
    description: "渠道合作、SaaS / ERP 接入、API 对接与生态共建。",
    email: site.email.bd,
  },
  {
    icon: LifeBuoy,
    label: "客户支持",
    englishLabel: "Support",
    description: "现有客户的产品问题、Bug 反馈与功能建议直通工单。",
    email: site.email.support,
  },
  {
    icon: Briefcase,
    label: "人才合作",
    englishLabel: "Talent",
    description: "投递简历、内推、求职咨询与实习生合作申请。",
    email: site.email.talent,
  },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactGrid />
      <ContactOffice />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Contact · 我们在等你
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[60px]">
            告诉我们你的跨境难题。
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.65] text-ink-muted">
            按需求选择最直接的对接方式 — 大部分询问会在 1 个工作日内得到回复。
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Channels + form ─────────────────────────────────────────────────────────
function ContactGrid() {
  return (
    <section className="border-b border-line py-20 md:py-24 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Channels */}
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              4 channels · 直接对接
            </p>
            <h2 className="text-display mt-4 text-[28px] font-semibold leading-tight text-ink md:text-[32px]">
              选择对的入口。
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    href={`mailto:${c.email}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white/[0.012] p-5 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.025]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line-strong bg-white/[0.04]">
                      <c.icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-brand-bright"
                      />
                    </span>
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                      {c.englishLabel}
                    </p>
                    <h3 className="mt-1 text-base font-semibold leading-tight text-ink">
                      {c.label}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-[1.55] text-ink-muted">
                      {c.description}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-xs text-brand-bright">
                      <Mail size={12} />
                      <span className="truncate font-mono">{c.email}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

function ContactForm() {
  return (
    <form
      className="bento-frame relative isolate flex flex-col rounded-[24px] p-7 lg:p-9"
      // The form is a mock — wire up to your backend / form service of choice.
      action="https://example.com/contact"
      method="POST"
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
        Or write directly · 直接留言
      </p>
      <h2 className="text-display mt-4 text-[28px] font-semibold leading-tight text-ink md:text-[30px]">
        发条消息给销售。
      </h2>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="姓名" name="name" type="text" required />
        <Field label="公司邮箱" name="email" type="email" required />
        <Field label="公司名称" name="company" type="text" />
        <Field label="电话(选填)" name="phone" type="tel" />
      </div>

      <div className="mt-4">
        <label
          htmlFor="role"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
        >
          所属角色
        </label>
        <select
          id="role"
          name="role"
          defaultValue=""
          className="block w-full rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink focus:border-brand-bright/60 focus:outline-none"
        >
          <option value="" disabled>
            选择角色 …
          </option>
          <option value="seller">跨境卖家 / 品牌方</option>
          <option value="sourcing">选品团队 / 选品代理</option>
          <option value="compliance">合规与法务</option>
          <option value="erp">ERP / SaaS 服务商</option>
          <option value="service">运营服务商</option>
          <option value="other">其他</option>
        </select>
      </div>

      <div className="mt-4">
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
        >
          想咨询什么?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="比如:我们是一家做 3C 配件的跨境品牌,希望了解检测雷达的批量扫描方案 …"
          className="block w-full resize-none rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand-bright/60 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="cta-inner-glow group mt-7 inline-flex h-11 items-center justify-center gap-1.5 self-start overflow-hidden rounded-full bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
      >
        <span className="relative z-[2]">发送</span>
        <ArrowRight
          size={14}
          className="relative z-[2] transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </button>

      <p className="mt-4 text-xs text-ink-faint">
        提交即表示同意我们处理你的联系信息以回复你的咨询。
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint"
      >
        {label}
        {required && <span className="ml-1 text-brand-bright">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="block w-full rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand-bright/60 focus:outline-none"
      />
    </div>
  );
}

// ─── Office ──────────────────────────────────────────────────────────────────
function ContactOffice() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <OfficeCard
            city="杭州 · Hangzhou"
            tag="Headquarters"
            address="浙江省杭州市余杭区未来科技城梦想小镇 · 100 号"
            timezone="UTC+8"
          />
          <OfficeCard
            city="深圳 · Shenzhen"
            tag="Sales · DTC Hub"
            address="广东省深圳市南山区科技园 · 跨境电商集聚区"
            timezone="UTC+8"
          />
          <OfficeCard
            city="新加坡 · Singapore"
            tag="APAC"
            address="71 Robinson Road, #14-01 Singapore"
            timezone="UTC+8"
          />
        </div>
      </Container>
    </section>
  );
}

function OfficeCard({
  city,
  tag,
  address,
  timezone,
}: {
  city: string;
  tag: string;
  address: string;
  timezone: string;
}) {
  return (
    <article className="rounded-2xl border border-line bg-white/[0.012] p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong bg-white/[0.04]">
          <MapPin size={14} strokeWidth={1.5} className="text-brand-bright" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          {tag}
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold leading-tight text-ink">
        {city}
      </h3>
      <p className="mt-2 text-sm leading-[1.6] text-ink-muted">{address}</p>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        {timezone}
      </p>
    </article>
  );
}
