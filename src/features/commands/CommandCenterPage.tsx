import { useState } from "react";
import { Copy, Search, Terminal, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { nexusCommands } from "@/data/commands";

export function CommandCenterPage() {
  const [query, setQuery] = useState("");
  const results = nexusCommands.filter((item) => `${item.command} ${item.title} ${item.description} ${item.module}`.toLowerCase().includes(query.toLowerCase()));

  const copy = async (value: string) => {
    await navigator.clipboard?.writeText(value);
    toast.success(`${value} copied`);
  };

  return (
    <div className="-m-4 min-h-[calc(100vh-4rem)] bg-[#141414] px-4 py-8 text-white md:-m-6 md:px-8">
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-[#242424] p-6 text-center md:p-10">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 22% 12%, rgba(124,58,237,.55), transparent 22%), radial-gradient(circle at 82% 20%, rgba(6,182,212,.35), transparent 22%)" }} />
        <div className="relative z-10">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-white/70">
            <Terminal size={16} /> Nexus Command UI
          </div>
          <h1 className="text-5xl font-black uppercase leading-[.9] md:text-7xl">Command everything</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-white/58">Slash commands for every department. Learn what each command does, copy it, or use Cmd+K to jump anywhere.</p>
          <div className="mx-auto mt-8 flex h-14 max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-black/25 px-5">
            <Search className="text-white/42" size={19} />
            <Input className="h-full border-0 bg-transparent px-0 text-base" placeholder="Search /task, /prompt, /stash..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-[1720px] gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((item, index) => (
          <article key={item.command} className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#282828] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/25 ${index === 0 ? "xl:col-span-2" : ""}`}>
            <div className="absolute right-[-30px] top-[-30px] h-32 w-32 rounded-full bg-violet-400/20 blur-2xl transition group-hover:bg-cyan-300/20" />
            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <code className="rounded-2xl border border-white/10 bg-black/28 px-4 py-2 font-mono text-lg font-black text-cyan-100">{item.command}</code>
                <Button className="rounded-full" size="sm" onClick={() => copy(item.example)}><Copy size={14} /> Copy</Button>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/38">{item.module}</p>
              <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
              <p className="mt-3 min-h-14 text-sm leading-6 text-white/54">{item.description}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/35"><Wand2 size={14} /> Example</div>
                <code className="font-mono text-sm text-white/72">{item.example}</code>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
