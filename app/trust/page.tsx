import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bug,
  Database,
  FileCheck,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BottomCTA } from "@/components/home/bottom-cta";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "信任中心 · Trust",
  description:
    "出海雷达信任中心 · SOC 2 Type II / ISO 27001 / GDPR / PIPL / CCPA 合规 · 数据驻留可选 · 子处理者清单 · 渗透测试报告。",
};

export default function TrustPage() {
  return (
    <>
      <TrustHero />
      <CertificationGrid />
      <SecurityArchitecture />
      <Subprocessors />
      <DataResidency />
      <SecurityProgram />
      <BottomCTA />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function TrustHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-data-grid" />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
            <span className="h-1 w-1 rounded-full bg-accent-bright shadow-[0_0_6px_rgba(0,255,102,0.7)]" />
            Trust Center · 信任中心
          </p>
          <h1 className="text-display mt-6 text-[44px] font-semibold leading-[1.05] text-ink md:text-[56px] lg:text-[60px]">
            你的数据,在我们这里,
            <br />
            会被怎么对待。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.65] text-ink-muted">
            合规认证 · 安全架构 · 子处理者清单 · 数据驻留 — 所有 IT / 法务团队需要的答案,这里 30 秒看完。
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Compliance certification grid ──────────────────────────────────────────
type Certification = {
  icon: LucideIcon;
  abbr: string;
  fullName: string;
  status: string;
  description: string;
  reportAvailable: boolean;
};

const CERTIFICATIONS: Certification[] = [
  {
    icon: ShieldCheck,
    abbr: "SOC 2 Type II",
    fullName: "System and Organization Controls 2",
    status: "已认证 · 2025 年度",
    description:
      "AICPA 体系认证 · 安全 / 可用性 / 处理完整性 / 保密性 / 隐私 五大类控制",
    reportAvailable: true,
  },
  {
    icon: Award,
    abbr: "ISO 27001",
    fullName: "Information Security Management System",
    status: "已认证 · 有效至 2027",
    description:
      "国际信息安全管理体系认证 · 涵盖物理与逻辑访问控制、变更管理、应急响应",
    reportAvailable: true,
  },
  {
    icon: FileCheck,
    abbr: "GDPR",
    fullName: "EU General Data Protection Regulation",
    status: "全量符合",
    description:
      "针对欧盟客户的数据处理协议 (DPA) · 标准合同条款 (SCC) · DPO 任命",
    reportAvailable: false,
  },
  {
    icon: FileCheck,
    abbr: "PIPL",
    fullName: "中华人民共和国个人信息保护法",
    status: "全量符合",
    description:
      "境内数据处理 + 跨境传输安全评估 · 个人信息处理告知 + 同意机制",
    reportAvailable: false,
  },
  {
    icon: FileCheck,
    abbr: "CCPA",
    fullName: "California Consumer Privacy Act",
    status: "全量符合",
    description:
      "加州消费者隐私法适用 · 数据访问 / 删除 / 退出 销售权利支持",
    reportAvailable: false,
  },
  {
    icon: Bug,
    abbr: "Bug Bounty",
    fullName: "持续性漏洞奖励计划",
    status: "Active · 通过 HackerOne",
    description:
      "全球白帽社区参与 · 严重漏洞最高奖励 ¥50,000 · 平均响应 4 小时",
    reportAvailable: false,
  },
];

function CertificationGrid() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mb-14 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
              <span className="h-1 w-1 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
              Compliance · 合规认证
            </p>
            <h2 className="text-display mt-5 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px]">
              企业级合规栈。
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.65] text-ink-muted">
              所有认证由独立第三方机构审计 · 详细报告可申请下载。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <CertificationCard key={cert.abbr} cert={cert} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <article className="bento-frame group/cert relative isolate flex flex-col overflow-hidden rounded-[18px] p-6">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line-strong bg-white/[0.04]">
          <cert.icon size={18} strokeWidth={1.5} className="text-brand-bright" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-accent-bright/30 bg-accent-bright/10 px-2 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.2em] text-accent-bright">
          <span className="h-1 w-1 rounded-full bg-accent-bright" />
          {cert.status.split("·")[0].trim()}
        </span>
      </div>
      <h3 className="mt-6 text-[20px] font-semibold leading-tight text-ink">
        {cert.abbr}
      </h3>
      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
        {cert.fullName}
      </p>
      <p className="mt-4 flex-1 text-[13px] leading-[1.6] text-ink-muted">
        {cert.description}
      </p>
      {cert.reportAvailable && (
        <div className="mt-5 border-t border-line pt-4">
          <a
            href={`mailto:${site.email.support}?subject=申请 ${cert.abbr} 报告`}
            className="group/dl inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-bright transition-colors hover:text-accent-bright"
          >
            申请报告
            <ArrowRight
              size={11}
              className="transition-transform duration-300 group-hover/dl:translate-x-0.5"
            />
          </a>
        </div>
      )}
    </article>
  );
}

// ─── Security architecture ──────────────────────────────────────────────────
function SecurityArchitecture() {
  const LAYERS = [
    {
      title: "传输层加密",
      detail: "TLS 1.3 · HSTS · Certificate pinning",
    },
    {
      title: "静态数据加密",
      detail: "AES-256-GCM · 客户级密钥隔离 · KMS 托管",
    },
    {
      title: "访问控制",
      detail: "RBAC + ABAC · 最小权限原则 · 双因素认证强制",
    },
    {
      title: "审计日志",
      detail: "所有 API 调用 / 配置变更 / 数据访问记录 · 保留 7 年",
    },
    {
      title: "密钥管理",
      detail: "AWS KMS / 阿里云 KMS · 客户可选 BYOK (Bring Your Own Key)",
    },
    {
      title: "应急响应",
      detail: "7×24 SOC · 平均 4 分钟首次响应 · RPO 1h / RTO 4h",
    },
  ];
  return (
    <section className="border-b border-line bg-bg-subtle/30 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              <Lock size={12} className="text-brand-bright" />
              Security Architecture
            </p>
            <h2 className="text-display mt-5 text-[32px] font-semibold leading-[1.1] text-ink md:text-[40px]">
              安全架构 · 6 层防线。
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.65] text-ink-muted">
              零信任设计 · 每一层独立审计 · 完整白皮书与架构图可申请。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
            {LAYERS.map((l) => (
              <div
                key={l.title}
                className="bg-bg p-6 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div className="text-[14px] font-semibold leading-tight text-ink">
                  {l.title}
                </div>
                <div className="mt-3 font-mono text-[11px] leading-[1.65] text-ink-muted">
                  {l.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Subprocessors ──────────────────────────────────────────────────────────
type Subprocessor = {
  name: string;
  category: string;
  region: string;
  purpose: string;
};

const SUBPROCESSORS: Subprocessor[] = [
  {
    name: "AWS",
    category: "云基础设施",
    region: "中国 · 新加坡 · 欧盟",
    purpose: "应用与数据存储",
  },
  {
    name: "阿里云",
    category: "云基础设施",
    region: "中国",
    purpose: "中国大陆数据驻留区",
  },
  {
    name: "Cloudflare",
    category: "CDN + WAF",
    region: "全球",
    purpose: "边缘加速 + 防护",
  },
  {
    name: "Datadog",
    category: "监控与日志",
    region: "美国",
    purpose: "应用性能与错误追踪(脱敏数据)",
  },
  {
    name: "Sentry",
    category: "错误追踪",
    region: "美国",
    purpose: "前端错误堆栈(脱敏)",
  },
  {
    name: "Resend",
    category: "邮件服务",
    region: "美国",
    purpose: "事务邮件(密码重置 / 提醒)",
  },
  {
    name: "Stripe",
    category: "支付",
    region: "美国",
    purpose: "订阅计费 · 不存信用卡数据",
  },
  {
    name: "Intercom",
    category: "客户支持",
    region: "美国 · 欧盟",
    purpose: "工单 · 客户对话",
  },
];

function Subprocessors() {
  return (
    <section className="border-b border-line py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mb-14 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
              <Database size={12} className="text-brand-bright" />
              Subprocessors · 子处理者
            </p>
            <h2 className="text-display mt-5 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px]">
              我们用了哪些第三方服务。
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.65] text-ink-muted">
              每个子处理者的用途、数据驻留区、合规协议都清晰列出。新增子处理者会提前 30 天通知客户。
            </p>
          </div>
          <a
            href={`mailto:${site.email.support}?subject=订阅子处理者更新通知`}
            className="group inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink transition-colors hover:text-brand-bright"
          >
            订阅更新通知
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-bg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="border-b border-line bg-white/[0.018]">
                  <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                    子处理者
                  </th>
                  <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                    类别
                  </th>
                  <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                    数据驻留
                  </th>
                  <th className="px-5 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                    用途
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((sp, i) => (
                  <tr
                    key={sp.name}
                    className={
                      i === SUBPROCESSORS.length - 1
                        ? ""
                        : "border-b border-line"
                    }
                  >
                    <td className="px-5 py-4 text-[14px] font-semibold text-ink">
                      {sp.name}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-ink-muted">
                      {sp.category}
                    </td>
                    <td className="px-5 py-4 font-mono text-[12px] text-ink-muted">
                      {sp.region}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-ink-muted">
                      {sp.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Data residency ─────────────────────────────────────────────────────────
function DataResidency() {
  const REGIONS = [
    {
      name: "中国大陆",
      provider: "阿里云",
      city: "杭州 / 深圳",
      laws: "PIPL · 网络安全法 · 数据安全法",
      tier: "默认 / Starter+",
    },
    {
      name: "新加坡",
      provider: "AWS",
      city: "Singapore (ap-southeast-1)",
      laws: "PDPA · GDPR-equivalent",
      tier: "Team+",
    },
    {
      name: "欧盟",
      provider: "AWS",
      city: "Frankfurt (eu-central-1)",
      laws: "GDPR · DPF (Data Privacy Framework)",
      tier: "Enterprise",
    },
  ];
  return (
    <section className="border-b border-line bg-bg-subtle/30 py-24 md:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-faint">
            Data Residency · 数据驻留
          </p>
          <h2 className="text-display mt-5 text-[36px] font-semibold leading-[1.1] text-ink md:text-[44px]">
            你的数据存在你能选的地方。
          </h2>
          <p className="mt-5 text-base leading-[1.65] text-ink-muted">
            选择数据驻留区,所有处理 / 备份 / 日志都不会跨区。跨境传输由 SCC 保护并明确记录。
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
          {REGIONS.map((r) => (
            <article
              key={r.name}
              className="rounded-2xl border border-line bg-white/[0.012] p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-center justify-between">
                <span className="text-[18px] font-semibold leading-tight text-ink">
                  {r.name}
                </span>
                <span className="rounded-full border border-line-strong bg-white/[0.04] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint">
                  {r.tier}
                </span>
              </div>
              <dl className="mt-5 space-y-3">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                    云服务商
                  </dt>
                  <dd className="mt-1 text-[14px] text-ink">{r.provider}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                    数据中心
                  </dt>
                  <dd className="mt-1 font-mono text-[12.5px] text-ink-muted">
                    {r.city}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                    适用法规
                  </dt>
                  <dd className="mt-1 text-[12.5px] text-ink-muted">
                    {r.laws}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Security program (penetration tests + bug bounty + DPO) ────────────────
function SecurityProgram() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
          {[
            {
              title: "渗透测试",
              detail: "每年 2 次 · 由独立安全公司执行",
              metric: "Last test: 2025-09",
              link: `mailto:${site.email.support}?subject=申请最近一次渗透测试摘要`,
              linkText: "申请测试报告",
            },
            {
              title: "漏洞奖励",
              detail: "通过 HackerOne 平台运营",
              metric: "平均响应:4h · 严重漏洞最高 ¥50,000",
              link: "https://hackerone.com/overseasradar",
              linkText: "前往报告漏洞",
            },
            {
              title: "数据保护负责人 (DPO)",
              detail: "独立 DPO · 直接对接客户法务团队",
              metric: "邮箱:dpo@overseasradar.com",
              link: "mailto:dpo@overseasradar.com",
              linkText: "联系 DPO",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bento-frame relative isolate overflow-hidden rounded-[18px] p-7"
            >
              <h3 className="text-[18px] font-semibold leading-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
                {item.detail}
              </p>
              <p className="mt-4 font-mono text-[11.5px] text-brand-bright">
                {item.metric}
              </p>
              <Link
                href={item.link}
                className="group mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-brand-bright"
              >
                {item.linkText}
                <ArrowRight
                  size={11}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
