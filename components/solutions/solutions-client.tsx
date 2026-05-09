"use client";

import * as React from "react";

import { RoleSolutionsList } from "@/components/solutions/role-solutions-list";
import { SolutionsHero } from "@/components/solutions/solutions-hero";
import { Container } from "@/components/ui/container";
import { roles } from "@/lib/solutions-content";

/**
 * Client root for /solutions.
 *
 * The tab switcher (按角色 / 按行业 / 按业务阶段) was removed per request, so
 * the page is now a single linear flow showing the roles content. Industry
 * and stage views still exist as data but no longer have a UI surface here.
 *
 * Expand state for the role accordion lives at this level so a future
 * re-introduction of tabs (or any wrapper that unmounts content) won't lose
 * the user's open cards.
 */
export function SolutionsClient() {
  const [expandedRoleIds, setExpandedRoleIds] = React.useState<
    ReadonlySet<string>
  >(() => new Set(roles[0] ? [roles[0].id] : []));

  const toggleRole = React.useCallback((id: string) => {
    setExpandedRoleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <>
      <SolutionsHero />
      <section>
        <Container>
          <div className="py-20 md:py-24 lg:py-28">
            <RoleSolutionsList
              expandedIds={expandedRoleIds}
              onToggle={toggleRole}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
