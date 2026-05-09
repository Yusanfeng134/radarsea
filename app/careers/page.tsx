import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Coffee,
  Compass,
  Cpu,
  Globe2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BottomCTA } from "@/components/home/bottom-cta";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "加入我们 · Careers",
  description:
    "出海雷达正在招募工程师、产品经理、跨境合规专家与销售伙伴 — 来和我们一起,把跨境风险预警前置。",
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersBenefits />
      <OpenRoles />
      <CareersProcess />
      <BottomCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function CareersHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,211,238,0.08), transparent 70%)",
        }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Careers · 我们在招人
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[64px]">
            和我们一起,
            <br />
            <span className="bg-gradient-to-r from-brand-bright to-accent-bright bg-clip-text text-transparent">
              重写跨境的风险预警。
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
            一支 30 人的小团队,服务 1,000+ 跨境品牌。我们偏好
            <span className="text-ink"> 高自驱、低管理 </span>—
            如果你受不了「为了讨论而开会」的公司,这里可能适合你。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#open-roles"
              className="cta-inner-glow group inline-flex h-11 items-center gap-1.5 rounded-full bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
            >
              <span className="relative z-[2]">查看在招职位</span>
              <ArrowRight
                size={14}
                className="relative z-[2] transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
            <Link
              href="/about"
              className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong bg-transparent px-6 text-sm font-medium text-ink transition-all hover:border-brand-bright/60 hover:text-brand-bright"
            >
              了解我们
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Benefits ────────────────────────────────────────────────────────────────
type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: Globe2,
    title: "Remote-friendly · 异步协作",
    description:
      "杭州 / 深圳 / 新加坡三地办公 + 远程岗位,大部分协同跑在 Linear / Slack / Notion 上,会议默认 30 分钟封顶。",
  },
  {
    icon: Cpu,
    title: "工具自由 · 设备齐全",
    description:
      "M-Pro 配机、付费版 ChatGPT / Claude / Cursor、付费版 Linear / Figma / GitHub Copilot — 工具不是问题。",
  },
  {
    icon: BookOpen,
    title: "学习预算 · ¥6,000/年",
    description:
      "技术书 / 在线课程 / 线下大会都可报销,跨领域学习同样支持(认知投入回报最高)。",
  },
  {
    icon: Coffee,
    title: "全员持股 · 长期主义",
    description:
      "前 50 号员工人手期权,vesting 4 年。我们不做 996,但我们做 10 年。",
  },
  {
    icon: HeartHandshake,
    title: "顶级补贴 · 实质福利",
    description:
      "六险一金按高基数缴纳,补充医疗 + 体检 + 子女教育补贴,父母可加保。",
  },
  {
    icon: ShieldCheck,
    title: "失败友好 · 心理安全",
    description:
      "我们公开复盘失败,所有出海雷达 V0.x 的产品决策错都写在内部 wiki 里,任何人可查阅。",
  },
];

function CareersBenefits() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
            Why us · 我们提供什么
          </p>
          <h2 className="text-display mt-6 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px]">
            一份对得起长期投入的工作。
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <article
              key={b.title}
              className="rounded-2xl border border-line bg-white/[0.012] p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line-strong bg-white/[0.04]">
                <b.icon size={16} strokeWidth={1.5} className="text-brand-bright" />
              </span>
              <h3 className="mt-5 text-base font-semibold leading-tight text-ink">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.65] text-ink-muted">
                {b.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Open roles ──────────────────────────────────────────────────────────────
type Role = {
  id: string;
  title: string;
  team: "Engineering" | "Product" | "Compliance" | "Sales · GTM" | "Data";
  location: string;
  type: "Full-time" | "Contract" | "Intern";
  href: string;
};

const ROLES: Role[] = [
  {
    id: "senior-fe",
    title: "高级前端工程师",
    team: "Engineering",
    location: "杭州 / Remote",
    type: "Full-time",
    href: "mailto:talent@overseasradar.com?subject=高级前端工程师",
  },
  {
    id: "senior-be",
    title: "后端工程师 · 数据底座方向",
    team: "Engineering",
    location: "杭州",
    type: "Full-time",
    href: "mailto:talent@overseasradar.com?subject=后端工程师",
  },
  {
    id: "ml-engineer",
    title: "ML 工程师 · 风险与趋势模型",
    team: "Data",
    location: "杭州 / 深圳",
    type: "Full-time",
    href: "mailto:talent@overseasradar.com?subject=ML 工程师",
  },
  {
    id: "product-detection",
    title: "产品经理 · 检测雷达",
    team: "Product",
    location: "杭州",
    type: "Full-time",
    href: "mailto:talent@overseasradar.com?subject=产品经理 · 检测雷达",
  },
  {
    id: "ip-lawyer",
    title: "跨境合规与 IP 法务专家",
    team: "Compliance",
    location: "杭州 / 上海 / Remote",
    type: "Full-time",
    href: "mailto:talent@overseasradar.com?subject=合规与 IP 法务专家",
  },
  {
    id: "ent-sales",
    title: "企业销售 · 头部 DTC 品牌",
    team: "Sales · GTM",
    location: "深圳",
    type: "Full-time",
    href: "mailto:talent@overseasradar.com?subject=企业销售",
  },
  {
    id: "design-intern",
    title: "产品设计实习生",
    team: "Product",
    location: "杭州",
    type: "Intern",
    href: "mailto:talent@overseasradar.com?subject=产品设计实习生",
  },
];

function OpenRoles() {
  // Group roles by team for visual scanability
  const byTeam = ROLES.reduce<Record<string, Role[]>>((acc, r) => {
    (acc[r.team] ??= []).push(r);
    return acc;
  }, {});
  const teams = Object.keys(byTeam);

  return (
    <section
      id="open-roles"
      className="scroll-mt-20 border-b border-line bg-bg-subtle/40 py-24 md:py-32 lg:py-40"
    >
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
              Open roles · {ROLES.length} positions
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              在招职位。
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.65] text-ink-muted">
            没有看到适合的岗位?把简历发到{" "}
            <a
              href="mailto:talent@overseasradar.com"
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand-bright hover:decoration-brand-bright/60"
            >
              talent@overseasradar.com
            </a>
            ,我们会保存 6 个月。
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {teams.map((team) => (
            <div key={team}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                {team} · {byTeam[team].length}
              </h3>
              <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bg">
                {byTeam[team].map((role) => (
                  <li key={role.id}>
                    <a
                      href={role.href}
                      className="group flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-semibold leading-tight text-ink transition-colors group-hover:text-brand-bright">
                          {role.title}
                        </div>
                        <div className="mt-1.5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                          <span>{role.location}</span>
                          <span className="h-2.5 w-px bg-line-strong" />
                          <span>{role.type}</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 self-start font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted transition-colors group-hover:text-brand-bright sm:self-auto">
                        Apply
                        <ArrowUpRight
                          size={12}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: "01",
    label: "投递",
    description: "邮件附简历或作品集到 talent@overseasradar.com,2 个工作日内回复。",
  },
  {
    n: "02",
    label: "电话沟通",
    description: "30 分钟非正式聊天,主要互相了解,不考察技术细节。",
  },
  {
    n: "03",
    label: "技术 / 业务面",
    description: "1-2 轮深度交流,实战题为主,我们也回答你想问的所有问题。",
  },
  {
    n: "04",
    label: "Offer",
    description: "通过后 3 个工作日内发出 Offer,薪资透明、期权具体到股数。",
  },
];

function CareersProcess() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              <Compass size={12} className="text-brand-bright" />
              Our process
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              4 步,平均 12 天。
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-ink-muted">
              我们尊重候选人的时间。所有流程都给具体反馈,不通过的也会告诉你具体原因。
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-line bg-white/[0.012] p-5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-bright">
                  {s.n}
                </div>
                <h3 className="mt-3 text-base font-semibold leading-tight text-ink">
                  {s.label}
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-ink-muted">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
