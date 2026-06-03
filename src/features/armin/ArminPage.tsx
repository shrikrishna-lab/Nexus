import { useState } from "react";
import { Bot, Code2, Mic, Send, Settings, SplitSquareHorizontal } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { useNexusStore } from "@/stores/useNexusStore";

const initialMessages = [
  { role: "assistant", content: "Good evening. I am Armin. I can search your current workspace, create tasks, paste prompts, and log progress while staying local-first." },
  { role: "user", content: "/progress summarize this week" },
  { role: "assistant", content: "You logged 50.5 hours across study, projects, and fitness. The strongest pattern is project work; the next useful correction is a small daily study block." }
];

export function ArminPage() {
  const { arminThinking, setArminThinking } = useNexusStore();
  const [draft, setDraft] = useState("");
  const [chatMessages, setChatMessages] = useState(initialMessages);

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 7"
        title="Armin"
        description="Claude Sonnet powered local assistant with workspace context, internal tools, voice dictation, quick commands, memory, and a side-panel code preview."
        actions={
          <>
            <Button onClick={() => toast.info("Split view toggled")}><SplitSquareHorizontal size={16} /> Split View</Button>
            <Button onClick={() => toast.info("Armin settings opened")}><Settings size={16} /> Settings</Button>
            <Button variant={arminThinking ? "danger" : "primary"} onClick={() => setArminThinking(!arminThinking)}><Bot size={16} /> {arminThinking ? "Stop Ambient" : "Think"}</Button>
          </>
        }
      />
      <div className="grid min-h-[68vh] gap-4 xl:grid-cols-[1fr_380px]">
        <section className="glass flex min-h-[68vh] flex-col rounded-lg">
          <div className="border-b border-white/10 p-4 text-sm text-white/52">Model: claude-sonnet-4-20250514 | Memory: last 20 messages | Offline cache enabled</div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "ml-auto max-w-2xl rounded-lg bg-violet-500/18 p-4" : "max-w-2xl rounded-lg border border-white/10 bg-white/[0.04] p-4"}>
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/35">{message.role}</div>
                <p className="text-sm leading-6 text-white/72">{message.content}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="/task, /stash, /prompt, /progress, /idea or ask Armin anything..." />
            <div className="mt-3 flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <Button onClick={() => toast.info("Voice dictation requested")}><Mic size={16} /> Voice</Button>
                <Button onClick={() => toast.info("Sandbox preview is active")}><Code2 size={16} /> Sandbox</Button>
              </div>
              <Button variant="primary" onClick={() => {
                if (!draft.trim()) {
                  toast.error("Type a message for Armin");
                  return;
                }
                setChatMessages((items) => [...items, { role: "user", content: draft }, { role: "assistant", content: "I saved that as a local draft response. Connect your Anthropic key to enable live Claude streaming." }]);
                setDraft("");
                toast.success("Message added");
              }}><Send size={16} /> Send</Button>
            </div>
          </div>
        </section>
        <aside className="glass rounded-lg p-4">
          <h2 className="font-bold">Internal Tools</h2>
          <div className="mt-3 grid gap-2">
            {["create_task", "search_stash", "open_workspace", "copy_prompt", "log_progress"].map((tool) => (
              <button key={tool} className="focus-ring rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-left font-mono text-sm text-cyan-100/72 hover:bg-white/[0.07]" onClick={() => toast.info(`${tool} queued`)}>{tool}</button>
            ))}
          </div>
          <h2 className="mt-6 font-bold">HTML/CSS/JS Preview</h2>
          <iframe title="Armin sandbox preview" className="mt-3 h-56 w-full rounded-md border border-white/10 bg-white" srcDoc="<style>body{font-family:Inter;background:#0a0a0f;color:white;display:grid;place-items:center;height:100vh;margin:0}</style><strong>Nexus sandbox</strong>" />
        </aside>
      </div>
    </div>
  );
}
