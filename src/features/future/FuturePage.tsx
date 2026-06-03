import { CalendarDays, Flag, Link2, MessageSquare, Plus, Wand2 } from "lucide-react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { ideas } from "@/data/seed";

export function FuturePage() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Module 5"
        title="Future Board"
        description="Ideas, tasks, web links, app concepts, MCP configs, saved chats, timeline planning, sketch pad slots, and brain-dump auto sorting."
        actions={<Button variant="primary"><Plus size={16} /> New Future Item</Button>}
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <section className="grid gap-4 md:grid-cols-2">
          {ideas.map((idea) => (
            <article key={idea.id} className="glass card-hover rounded-lg p-4">
              <div className="mb-4 flex items-center justify-between">
                <Tag>{idea.status}</Tag>
                <span className="flex items-center gap-1 text-xs text-white/45"><Flag size={14} /> {idea.priority}</span>
              </div>
              <h2 className="text-lg font-bold">{idea.title}</h2>
              <p className="mt-2 min-h-16 text-sm leading-6 text-white/55">{idea.body}</p>
              <div className="mt-4 aspect-video rounded-md border border-dashed border-white/14 bg-[linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01))]" />
            </article>
          ))}
          <article className="glass rounded-lg p-4">
            <h2 className="font-bold">MCP Config</h2>
            <pre className="mt-3 rounded-md border border-white/10 bg-black/30 p-3 font-mono text-xs text-cyan-100/80">{`{
  "nexus": {
    "command": "npx",
    "args": ["@nexus/mcp"],
    "env": { "NEXUS_DB": "./nexus.sqlite" }
  }
}`}</pre>
            <Button className="mt-4 w-full"><Link2 size={16} /> Copy JSON Config</Button>
          </article>
        </section>
        <aside className="space-y-4">
          <section className="glass rounded-lg p-4">
            <h2 className="mb-3 flex items-center gap-2 font-bold"><Wand2 size={17} /> Brain Dump</h2>
            <Textarea placeholder="Paste tasks, URLs, app ideas, chats, or MCP config notes. Nexus will sort them by type." />
            <Button className="mt-3 w-full" variant="primary">Sort Into Board</Button>
          </section>
          <section className="glass rounded-lg p-4">
            <h2 className="mb-3 flex items-center gap-2 font-bold"><CalendarDays size={17} /> Timeline</h2>
            {["Today: Ship PWA shell", "Jun 7: Nexus desktop smoke test", "Jun 12: Restore backup flow", "Jun 20: Mobile haptics pass"].map((item) => (
              <div key={item} className="border-l border-violet-400/35 py-2 pl-4 text-sm text-white/60">{item}</div>
            ))}
          </section>
          <section className="glass rounded-lg p-4">
            <h2 className="mb-3 flex items-center gap-2 font-bold"><MessageSquare size={17} /> Saved Chats</h2>
            <p className="text-sm leading-6 text-white/52">Conversation paste, screenshot attachments, tags, and searchable long-term notes are reserved here.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
