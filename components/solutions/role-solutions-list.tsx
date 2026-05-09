"use client";

import { RoleCard } from "@/components/solutions/role-card";
import { roles } from "@/lib/solutions-content";

type RoleSolutionsListProps = {
  expandedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
};

export function RoleSolutionsList({
  expandedIds,
  onToggle,
}: RoleSolutionsListProps) {
  return (
    <>
      {/* Sub-section header inside the tab panel.
          We render an <h2> here even though the page already has an h1 in
          the Hero, because each tab's content is a logically distinct
          section that benefits from its own heading. */}
      <header className="mb-14">
        <h2 className="text-2xl font-semibold leading-[1.2] tracking-tightish text-ink md:text-[28px]">
          按角色,找到你的雷达组合
        </h2>
        <p className="mt-3 text-base leading-[1.5] text-ink-muted">
          5 个角色,5 种典型组合。点击展开了解详情。
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {roles.map((role, index) => (
          <RoleCard
            key={role.id}
            data={role}
            index={index}
            isExpanded={expandedIds.has(role.id)}
            onToggle={() => onToggle(role.id)}
          />
        ))}
      </div>
    </>
  );
}
