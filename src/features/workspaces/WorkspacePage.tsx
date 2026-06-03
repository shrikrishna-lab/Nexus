import { FormEvent, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Archive, CheckSquare, Copy, Edit3, GripVertical, Pin, Plus, Search, Sparkles, Trash2, X, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Tag } from "@/components/Tag";
import { type Workspace } from "@/data/seed";
import { useNexusStore } from "@/stores/useNexusStore";

const colors = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];

function blankWorkspace(): Workspace {
  return {
    id: crypto.randomUUID(),
    name: "",
    icon: "Boxes",
    color: colors[0],
    description: "",
    pinned: false
  };
}

export function WorkspacePage() {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { workspaces, prompts, stashItems, tasks, activeWorkspaceId, setActiveWorkspace, addWorkspace, updateWorkspace, deleteWorkspace } = useNexusStore();
  const selected = workspaces.find((workspace) => workspace.id === workspaceId) || null;
  const active = selected || workspaces.find((workspace) => workspace.id === activeWorkspaceId) || workspaces[0];
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Workspace | null>(null);

  const workspaceContent = useMemo(() => {
    if (!active) return { prompts: [], stash: [], tasks: [] };
    return {
      prompts: prompts.filter((prompt) => prompt.workspaceId === active.id),
      stash: stashItems.filter((item) => item.workspaceId === active.id),
      tasks: tasks.filter((task) => task.workspaceId === active.id)
    };
  }, [active, prompts, stashItems, tasks]);

  const visibleWorkspaces = workspaces.filter((workspace) => `${workspace.name} ${workspace.description}`.toLowerCase().includes(query.toLowerCase()));

  const saveWorkspace = (event: FormEvent) => {
    event.preventDefault();
    if (!editing?.name.trim()) {
      toast.error("Workspace needs a name");
      return;
    }
    if (workspaces.some((workspace) => workspace.id === editing.id)) updateWorkspace(editing.id, editing);
    else addWorkspace({ ...editing, id: editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || crypto.randomUUID() });
    setEditing(null);
    toast.success("Workspace saved");
  };

  if (selected && active) {
    return (
      <div className="-m-4 min-h-[calc(100vh-4rem)] bg-[#141414] px-4 py-8 text-white md:-m-6 md:px-8">
        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#252525] p-6 md:p-8">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: `${active.color}55` }} />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <button className="mb-5 text-sm font-bold text-white/52 hover:text-white" onClick={() => navigate("/workspaces")}>Back to workspace gallery</button>
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full" style={{ background: active.color }} />
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/48">Workspace Room</p>
              </div>
              <h1 className="mt-3 text-5xl font-black uppercase leading-none md:text-7xl">{active.name}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">{active.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="rounded-full" onClick={() => setEditing(active)}><Edit3 size={16} /> Edit</Button>
              <Button className="rounded-full" variant="danger" onClick={() => {
                deleteWorkspace(active.id);
                toast.success("Workspace deleted");
                navigate("/workspaces");
              }}><Trash2 size={16} /> Delete</Button>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 xl:grid-cols-3">
          <ContentPanel title="Prompts" icon={Sparkles} count={workspaceContent.prompts.length}>
            {workspaceContent.prompts.map((prompt) => (
              <article key={prompt.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <h3 className="font-black">{prompt.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/52">{prompt.body}</p>
                <Button className="mt-4 rounded-full" size="sm" onClick={async () => {
                  await navigator.clipboard?.writeText(prompt.body);
                  toast.success("Prompt copied");
                }}><Copy size={14} /> Copy</Button>
              </article>
            ))}
          </ContentPanel>
          <ContentPanel title="Stash" icon={Archive} count={workspaceContent.stash.length}>
            {workspaceContent.stash.map((item) => (
              <article key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between"><h3 className="font-black">{item.title}</h3><Tag>{item.type}</Tag></div>
                <p className="mt-2 line-clamp-2 font-mono text-xs leading-5 text-white/52">{item.content}</p>
              </article>
            ))}
          </ContentPanel>
          <ContentPanel title="Tasks" icon={CheckSquare} count={workspaceContent.tasks.length}>
            {workspaceContent.tasks.map((task) => (
              <article key={task.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <h3 className="font-black">{task.title}</h3>
                <div className="mt-3 flex gap-2"><Tag>{task.status}</Tag><Tag>{task.priority}</Tag></div>
              </article>
            ))}
          </ContentPanel>
        </section>
      </div>
    );
  }

  return (
    <div className="-m-4 min-h-[calc(100vh-4rem)] bg-[#141414] px-4 py-8 text-white md:-m-6 md:px-8">
      <section className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200/70">Nexus Rooms</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-[.92] md:text-7xl">Build your personal universe</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-white/56">Each workspace is a room with its own prompts, stash items, tasks, links, media, and progress. Open one to manage the real content inside.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button className="h-13 rounded-full px-7" variant="primary" onClick={() => setEditing(blankWorkspace())}><Plus size={17} /> New Workspace</Button>
          <div className="flex h-11 min-w-72 items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4">
            <Search size={17} className="text-white/42" />
            <Input className="h-full border-0 bg-transparent px-0" placeholder="Search rooms" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-[1720px] auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleWorkspaces.map((workspace, index) => (
          <article
            key={workspace.id}
            className={`group relative overflow-hidden rounded-[28px] border bg-[#282828] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/22 hover:shadow-[0_22px_70px_rgba(0,0,0,.38)] ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
          >
            <div className="absolute inset-x-0 top-0 h-[62%] opacity-80 transition duration-300 group-hover:scale-[1.03]" style={{ background: `radial-gradient(circle at 60% 25%, ${workspace.color}, transparent 18%), radial-gradient(circle at 35% 50%, rgba(255,255,255,.2), transparent 24%), linear-gradient(145deg, #151515, #303030)` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#282828] via-[#282828]/72 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-black text-white/62">{workspace.pinned ? "Pinned" : "Room"}</span>
              <div className="flex gap-1 text-white/45">
                {workspace.pinned && <Pin size={16} />}
                <GripVertical size={16} />
              </div>
            </div>
            <button className="absolute inset-0 z-20 text-left" aria-label={`Open ${workspace.name}`} onClick={() => {
              setActiveWorkspace(workspace.id);
              navigate(`/workspaces/${workspace.id}`);
            }} />
            <div className="absolute inset-x-0 bottom-0 z-30 p-5">
              <h2 className="text-2xl font-black">{workspace.name}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/56">{workspace.description}</p>
              <div className="mt-4 flex gap-2">
                <Button className="rounded-full" size="sm" onClick={(event) => {
                  event.stopPropagation();
                  setEditing(workspace);
                }}><Edit3 size={14} /> Edit</Button>
                <Button className="rounded-full" size="sm" variant="danger" onClick={(event) => {
                  event.stopPropagation();
                  deleteWorkspace(workspace.id);
                  toast.success("Workspace deleted");
                }}><Trash2 size={14} /> Delete</Button>
              </div>
            </div>
          </article>
        ))}
        <button className="focus-ring flex min-h-52 items-center justify-center rounded-[28px] border border-dashed border-white/14 bg-white/[0.035] text-white/70 hover:bg-white/[0.06]" onClick={() => setEditing(blankWorkspace())}>
          <Plus className="mr-2" size={18} /> Add Workspace
        </button>
      </section>

      {editing && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
          <form className="w-full max-w-lg rounded-[30px] border border-white/12 bg-[#202020] p-5 shadow-2xl" onSubmit={saveWorkspace}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black">{workspaces.some((workspace) => workspace.id === editing.id) ? "Edit Workspace" : "New Workspace"}</h2>
              <Button type="button" size="icon" variant="ghost" onClick={() => setEditing(null)}><X size={18} /></Button>
            </div>
            <label className="text-sm font-bold text-white/62">Name</label>
            <Input className="mt-2" value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} />
            <label className="mt-4 block text-sm font-bold text-white/62">Description</label>
            <Textarea className="mt-2" value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} />
            <label className="mt-4 block text-sm font-bold text-white/62">Accent</label>
            <div className="mt-2 flex gap-2">
              {colors.map((color) => (
                <button key={color} type="button" className={`h-9 w-9 rounded-full border-2 ${editing.color === color ? "border-white" : "border-transparent"}`} style={{ background: color }} onClick={() => setEditing({ ...editing, color })} aria-label={`Use color ${color}`} />
              ))}
            </div>
            <label className="mt-4 flex items-center gap-3 text-sm font-bold text-white/70">
              <input type="checkbox" checked={Boolean(editing.pinned)} onChange={(event) => setEditing({ ...editing, pinned: event.target.checked })} />
              Pin to top
            </label>
            <Button className="mt-5 w-full rounded-full" variant="primary" type="submit">Save Workspace</Button>
          </form>
        </div>
      )}
    </div>
  );
}

function ContentPanel({ title, icon: Icon, count, children }: { title: string; icon: LucideIcon; count: number; children: React.ReactNode }) {
  return (
    <section className="min-h-[420px] rounded-[30px] border border-white/10 bg-[#252525] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-black"><Icon size={19} /> {title}</h2>
        <span className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-bold text-white/55">{count}</span>
      </div>
      <div className="space-y-3">
        {count ? children : <p className="rounded-3xl border border-dashed border-white/12 p-5 text-sm leading-6 text-white/45">No {title.toLowerCase()} in this room yet. Add one from its department and it will appear here.</p>}
      </div>
    </section>
  );
}
