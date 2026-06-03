import { ReactNode, useMemo, useState } from "react";
import { Bot, Boxes, Check, ChevronRight, Lock, Palette, Plus, Sparkles, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { type ModuleId, useNexusStore } from "@/stores/useNexusStore";
import { type Workspace, workspaces as seedWorkspaces } from "@/data/seed";

const moduleOptions: { id: ModuleId; label: string; body: string }[] = [
  { id: "workspaces", label: "Workspaces", body: "Your main private rooms" },
  { id: "prompts", label: "Prompt Department", body: "Copy, edit, and version prompts" },
  { id: "commands", label: "Command UI", body: "Slash commands with copy buttons" },
  { id: "progress", label: "Progress", body: "Study, projects, habits, timers" },
  { id: "stash", label: "Stash", body: "Snippets, media, commands, vault" },
  { id: "future", label: "Future Board", body: "Ideas, links, tasks, MCP configs" },
  { id: "armin", label: "Armin", body: "AI assistant and code sandbox" },
  { id: "connect", label: "Connect", body: "GitHub, Notion, Calendar, APIs" }
];

const colors = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];

export function AuthGate({ children }: { children: ReactNode }) {
  const { authReady, profileName, unlock, setupLocalAuth } = useNexusStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [enabled, setEnabled] = useState<ModuleId[]>(moduleOptions.map((module) => module.id));
  const [draftWorkspace, setDraftWorkspace] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [customWorkspaces, setCustomWorkspaces] = useState<Workspace[]>(seedWorkspaces);
  const [error, setError] = useState("");

  const isFirstRun = !profileName;
  const selectedColor = colors[customWorkspaces.length % colors.length];
  const canFinish = name.trim().length > 0 && pin.trim().length >= 4 && enabled.length > 0 && customWorkspaces.length > 0;
  const heroTitle = useMemo(() => ["Meet Nexus", "Choose Powers", "Build Rooms"][step] || "Meet Nexus", [step]);

  if (authReady) return <>{children}</>;

  if (!isFirstRun) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#141414] p-4 text-white">
        <section className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#242424] p-6 shadow-2xl">
          <div className="absolute -right-16 -top-16 h-44 w-44 animate-pulse rounded-full bg-violet-400/25 blur-2xl" />
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#141414]"><Lock size={20} /></div>
            <div>
              <h1 className="text-2xl font-black">Unlock Nexus</h1>
              <p className="text-sm text-white/52">Welcome back, {profileName}.</p>
            </div>
          </div>
          <Input placeholder="Local PIN" type="password" value={pin} onChange={(event) => setPin(event.target.value)} onKeyDown={(event) => {
            if (event.key === "Enter" && !unlock(pin)) setError("PIN did not match.");
          }} />
          {error && <p className="mt-3 text-sm text-rose-200">{error}</p>}
          <Button className="mt-4 w-full rounded-full" variant="primary" onClick={() => {
            if (!unlock(pin)) setError("PIN did not match.");
          }}>Unlock</Button>
        </section>
      </div>
    );
  }

  const addWorkspace = () => {
    if (!draftWorkspace.trim()) return;
    setCustomWorkspaces((items) => [
      ...items,
      {
        id: draftWorkspace.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || crypto.randomUUID(),
        name: draftWorkspace.trim(),
        icon: "Boxes",
        color: selectedColor,
        description: draftDescription.trim() || "A custom Nexus room.",
        pinned: false
      }
    ]);
    setDraftWorkspace("");
    setDraftDescription("");
  };

  const finish = () => {
    if (!canFinish) {
      setError("Add your name, a 4 digit PIN, at least one module, and one workspace.");
      return;
    }
    setupLocalAuth(name, pin, enabled, customWorkspaces);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f47f62] text-white transition-colors duration-500" style={{ backgroundColor: step === 0 ? "#f47f62" : step === 1 ? "#6bbf7a" : "#6eb5ff" }}>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.45), transparent 16%), radial-gradient(circle at 80% 25%, rgba(255,255,255,.32), transparent 18%)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-[12%] select-none text-center font-black uppercase leading-none text-white/35" style={{ fontSize: "clamp(86px, 20vw, 300px)" }}>NEXUS</div>
      <div className="absolute left-1/2 top-[19%] z-10 h-48 w-48 -translate-x-1/2 animate-[bobUp_2s_ease-in-out_infinite] rounded-[42%] border-8 border-white/65 bg-white/35 shadow-2xl backdrop-blur">
        <div className="absolute left-10 top-16 h-8 w-8 rounded-full bg-[#141414]" />
        <div className="absolute right-10 top-16 h-8 w-8 rounded-full bg-[#141414]" />
        <div className="absolute bottom-12 left-1/2 h-5 w-16 -translate-x-1/2 rounded-b-full border-b-8 border-[#141414]" />
        <Bot className="absolute -right-7 top-4 rounded-full bg-white p-2 text-[#141414]" size={46} />
      </div>

      <section className="relative z-20 mx-auto flex min-h-screen max-w-6xl items-end px-4 pb-6 md:items-center md:px-8">
        <div className="grid w-full gap-5 rounded-[34px] border border-white/25 bg-[#141414]/82 p-5 shadow-2xl backdrop-blur-2xl md:grid-cols-[340px_1fr] md:p-7">
          <aside className="rounded-[26px] bg-white/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/56">Initialising login role</p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-[.95]">{heroTitle}</h1>
            <p className="mt-4 text-sm leading-6 text-white/58">Personalize what Nexus contains before the app opens. You can edit, delete, and add rooms later.</p>
            <div className="mt-6 flex gap-2">
              {[0, 1, 2].map((item) => <span key={item} className={`h-2 rounded-full ${step === item ? "w-8 bg-white" : "w-3 bg-white/35"}`} />)}
            </div>
          </aside>

          <div className="min-h-[430px]">
            {step === 0 && (
              <div className="grid gap-4">
                <label className="text-sm font-bold text-white/70">Your name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-3 text-white/35" size={16} />
                  <Input className="pl-9" placeholder="Example: Krishna" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <label className="text-sm font-bold text-white/70">Local PIN</label>
                <Input placeholder="4+ digits" type="password" value={pin} onChange={(event) => setPin(event.target.value)} />
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-2 flex items-center gap-2 font-bold"><Palette size={17} /> Style direction</div>
                  <p className="text-sm leading-6 text-white/56">Nexus will use a playful dark gallery language: bold hero screens, rounded content cards, quick copy buttons, and animated first-run screens.</p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {moduleOptions.map((module) => {
                  const checked = enabled.includes(module.id);
                  return (
                    <button key={module.id} className={`focus-ring rounded-3xl border p-4 text-left transition ${checked ? "border-white/40 bg-white/[0.12]" : "border-white/10 bg-white/[0.035]"}`} onClick={() => setEnabled((items) => items.includes(module.id) ? items.filter((id) => id !== module.id) : [...items, module.id])}>
                      <div className="flex items-center justify-between">
                        <h2 className="font-black">{module.label}</h2>
                        <span className={`grid h-6 w-6 place-items-center rounded-full border ${checked ? "border-white bg-white text-[#141414]" : "border-white/20"}`}>{checked && <Check size={15} />}</span>
                      </div>
                      <p className="mt-2 text-sm leading-5 text-white/52">{module.body}</p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="grid max-h-[430px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                  {customWorkspaces.map((workspace) => (
                    <article key={workspace.id} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="h-4 w-4 rounded-full" style={{ background: workspace.color }} />
                        <button className="focus-ring rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white" onClick={() => setCustomWorkspaces((items) => items.filter((item) => item.id !== workspace.id))} aria-label={`Remove ${workspace.name}`}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <h2 className="font-black">{workspace.name}</h2>
                      <p className="mt-2 text-sm leading-5 text-white/52">{workspace.description}</p>
                    </article>
                  ))}
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                  <h2 className="mb-3 flex items-center gap-2 font-black"><Plus size={17} /> Add your own</h2>
                  <Input placeholder="Workspace name" value={draftWorkspace} onChange={(event) => setDraftWorkspace(event.target.value)} />
                  <Textarea className="mt-3" placeholder="What will live here?" value={draftDescription} onChange={(event) => setDraftDescription(event.target.value)} />
                  <Button className="mt-3 w-full rounded-full" onClick={addWorkspace}>Add Workspace</Button>
                </div>
              </div>
            )}

            {error && <p className="mt-4 text-sm text-rose-200">{error}</p>}
            <div className="mt-6 flex justify-between gap-3">
              <Button className="rounded-full" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Back</Button>
              {step < 2 ? (
                <Button className="rounded-full" variant="primary" onClick={() => setStep((value) => value + 1)}>Next <ChevronRight size={16} /></Button>
              ) : (
                <Button className="rounded-full px-7" variant="primary" onClick={finish}>Launch Nexus</Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
