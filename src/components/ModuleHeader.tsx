import { ReactNode } from "react";

export function ModuleHeader({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/70">{eyebrow}</div>
        <h1 className="text-3xl font-black tracking-normal text-white md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">{description}</p>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
