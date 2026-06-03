import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({ icon: Icon, title, body, action, onAction }: { icon: LucideIcon; title: string; body: string; action: string; onAction?: () => void }) {
  return (
    <div className="glass grid min-h-64 place-items-center rounded-lg p-8 text-center">
      <div>
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-cyan-200">
          <Icon size={22} />
        </div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/52">{body}</p>
        <Button className="mt-5" variant="primary" onClick={onAction}>{action}</Button>
      </div>
    </div>
  );
}
