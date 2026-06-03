import { Archive, Copy, Image, KeyRound, Plus, Search, Terminal } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/EmptyState";
import { useNexusStore } from "@/stores/useNexusStore";

const typeIcon = { text: Archive, code: Terminal, image: Image, command: Terminal, "api-key": KeyRound, file: Archive };

export function StashPage() {
  const { stashItems } = useNexusStore();
  const copy = async (content: string) => {
    await navigator.clipboard?.writeText(content);
    toast.success("Copied from Stash");
  };

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 4"
        title="Stash Storage Vault"
        description="Universal local clipboard for text, code, commands, images, aliases, encrypted API keys, files, and GTA RP reference packs."
        actions={<Button variant="primary" onClick={() => toast.info("Quick Add ready: paste detection panel is next.")}><Plus size={16} /> Quick Add</Button>}
      />
      <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_220px]">
        <div className="glass flex items-center gap-3 rounded-lg px-3">
          <Search size={17} className="text-white/40" />
          <Input className="border-0 bg-transparent px-0" placeholder="Search tags, content, code, commands, vault entries" />
        </div>
        <Button onClick={() => toast.success("Vault unlocked for this session")}><KeyRound size={16} /> Unlock Vault</Button>
      </div>
      {stashItems.length === 0 ? (
        <EmptyState icon={Archive} title="Stash is empty" body="Paste anything into Quick Add and Nexus will detect whether it is a URL, code, image, command, or plain text." action="Quick Add" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stashItems.map((item) => {
              const Icon = typeIcon[item.type];
              return (
                <article key={item.id} className="glass card-hover rounded-lg p-4">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-cyan-200"><Icon size={18} /></div>
                    {item.encrypted && <span className="rounded border border-violet-400/25 bg-violet-500/10 px-2 py-1 text-xs text-violet-100">PIN locked</span>}
                  </div>
                  <h2 className="font-bold">{item.title}</h2>
                  <pre className="mt-3 max-h-28 overflow-hidden whitespace-pre-wrap rounded-md border border-white/10 bg-black/30 p-3 font-mono text-xs leading-5 text-white/64">{item.content}</pre>
                  <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                  <Button className="mt-4 w-full" onClick={() => copy(item.content)}><Copy size={16} /> Copy</Button>
                </article>
              );
            })}
          </div>
          <aside className="glass rounded-lg p-4">
            <h2 className="font-bold">GTA RP Section</h2>
            <div className="mt-3 grid gap-2 text-sm text-white/60">
              {["Character bios", "RP scripts", "Radio codes", "Gang info", "Car lists", "Server rules", "Custom keybinds", "Cooldown timers"].map((item) => (
                <button key={item} className="focus-ring rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-left hover:bg-white/[0.07]" onClick={() => toast.info(`${item} opened`)}>{item}</button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
