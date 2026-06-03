import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Archive, BarChart3, Bot, Command, Copy, Flame, Home, Search, Sparkles, Terminal, Wifi } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { nexusCommands } from "@/data/commands";
import { useNexusStore } from "@/stores/useNexusStore";

const commands = [
  { label: "Open Workspaces", to: "/workspaces", icon: Home },
  { label: "Open Prompt Library", to: "/prompts", icon: Sparkles },
  { label: "Open Command Center", to: "/commands", icon: Terminal },
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
      <div className="fixed inset-0 bg-black/76 backdrop-blur-sm" />
      <div className="fixed inset-x-3 top-10 mx-auto max-w-4xl">
        <Dialog.Panel className="overflow-hidden rounded-[28px] border border-white/12 bg-[#1d1d1d]/96 shadow-2xl backdrop-blur-2xl">
          <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
            <Search size={20} className="text-white/45" />
            <input className="h-full flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-white/35" placeholder="Run a command, copy a slash command, or jump anywhere..." autoFocus />
            <kbd className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/42">Esc</kbd>
          </div>
          <div className="grid max-h-[72vh] gap-2 overflow-y-auto p-3 lg:grid-cols-[1.2fr_.8fr]">
            <section className="rounded-[22px] border border-white/8 bg-white/[0.025] p-2">
              <div className="px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200/60">Slash Commands</div>
              {nexusCommands.slice(0, 8).map((item) => (
                <div key={item.command} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-white/76 hover:bg-white/[0.07]">
                  <code className="w-36 shrink-0 rounded-xl border border-white/10 bg-black/25 px-3 py-2 font-mono text-cyan-100">{item.command}</code>
                  <button
                    className="min-w-0 flex-1 text-left"
                    onClick={() => {
                      navigate("/commands");
                      onOpenChange(false);
                    }}
                  >
                    <div className="font-black text-white">{item.title}</div>
                    <div className="truncate text-xs text-white/42">{item.description}</div>
                  </button>
                  <Button size="icon" variant="ghost" aria-label={`Copy ${item.command}`} onClick={async () => {
                    await navigator.clipboard?.writeText(item.example);
                    toast.success(`${item.command} copied`);
                  }}>
                    <Copy size={15} />
                  </Button>
                </div>
              ))}
            </section>
            <section className="rounded-[22px] border border-white/8 bg-white/[0.025] p-2">
              <div className="px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/35">Open Pages</div>
              {commands.map((item) => (
                <button
                  key={item.to}
                  className="focus-ring flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-white/78 hover:bg-white/[0.07]"
                  onClick={() => {
                    navigate(item.to);
                    onOpenChange(false);
                  }}
                >
                  <item.icon size={17} />
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/35">Global Results</div>
              {[...workspaces.map((x) => x.name), ...prompts.map((x) => x.title), ...stashItems.map((x) => x.title)].slice(0, 8).map((result) => (
                <div key={result} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-white/58">
                  <Command size={15} />
                  {result}
                </div>
              ))}
            </section>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs text-white/40">
            <span>Cmd+1-8 jumps modules | Cmd+N opens command actions</span>
            <Button size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
