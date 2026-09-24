"use client";

import dynamic from "next/dynamic";

const MoveChecklistWizard = dynamic(
  () => import("./wizard").then((mod) => ({ default: mod.MoveChecklistWizard })),
  {
    ssr: false,
    loading: () => <div className="mdc-wrap" aria-busy="true" />,
  },
);

export function ChecklistClient() {
  return <MoveChecklistWizard />;
}
