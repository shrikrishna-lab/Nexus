import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Archive, BarChart3, Bot, Command, Flame, Home, Search, Sparkles, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNexusStore } from "@/stores/useNexusStore";

const commands = [
  { label: "Open Workspaces", to: "/workspaces", icon: Home },
  { label: "Open Prompt Library", to: "/prompts", icon: Sparkles },
  { label: "Open Progress Tracker", to: "/progress", icon: BarChart3 },
  { label: "Open Stash Vault", to: "/stash", icon: Archive },
  { label: "Open Future Board", to: "/future", icon: Flame },
  { label: "Open Armin", to: "/armin", icon: Bot },
  { label: "Open Connect Hub", to: "/connect", icon: Wifi }
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();
  const { prompts, stashItems, workspaces } = useNexusStore();

  return (
    <Dialog open={open} onClose={onOpenChange} className="relative z-[60]">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="fixed inset-x-3 top-16 mx-auto max-w-2xl">
        <Dialog.Panel className="glass overflow-hidden rounded-lg shadow-2xl">
          <div className="flex h-14 items-center gap-3 border-b border-white/10 px-4">
            <Search size={18} className="text-white/45" />
            <input className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-white/35" placeholder="Search commands, prompts, stash, workspaces..." autoFocus />
            <kbd className="rounded border border-white/10 px-2 py-0.5 text-xs text-white/42">Esc</kbd>
          </div>
          <div className="max-h-[62vh] overflow-y-auto p-2">
            <div className="px-2 py-2 text-xs uppercase tracking-[0.18em] text-white/35">Commands</div>
            {commands.map((item) => (
              <button
                key={item.to}
                className="focus-ring flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-white/78 hover:bg-white/[0.07]"
                onClick={() => {
                  navigate(item.to);
                  onOpenChange(false);
                }}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
            <div className="px-2 py-2 text-xs uppercase tracking-[0.18em] text-white/35">Global Results</div>
            {[...workspaces.map((x) => x.name), ...prompts.map((x) => x.title), ...stashItems.map((x) => x.title)].slice(0, 8).map((result) => (
              <div key={result} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/58">
                <Command size={15} />
                {result}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 p-3 text-xs text-white/40">
            <span>Cmd+1-7 jumps modules · Cmd+N creates in context</span>
            <Button size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
