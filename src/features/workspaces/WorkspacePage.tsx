import { GripVertical, Pin, Plus, Search } from "lucide-react";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useNexusStore } from "@/stores/useNexusStore";

export function WorkspacePage() {
  const { workspaces, activeWorkspaceId, setActiveWorkspace } = useNexusStore();

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 1"
        title="Workspaces & Categories"
        description="Unlimited local workspaces with accent colors, pinned favorites, drag handles, and global search across prompts, notes, tasks, media, and links."
        actions={<Button variant="primary"><Plus size={16} /> New Workspace</Button>}
      />
      <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="glass flex items-center gap-3 rounded-lg px-3">
          <Search size={17} className="text-white/40" />
          <Input className="border-0 bg-transparent px-0" placeholder="Search all workspaces simultaneously" />
        </div>
        <div className="glass rounded-lg p-3 text-sm text-white/62">Pinned favorites stay on top. Drag handles are ready for DnD wiring.</div>
      </div>
      {workspaces.length === 0 ? (
        <EmptyState icon={Plus} title="No workspaces yet" body="Create your first private area for prompts, notes, tasks, media, and links." action="Create Workspace" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              className="glass card-hover min-h-56 rounded-lg p-4 text-left"
              onClick={() => setActiveWorkspace(workspace.id)}
              aria-label={`Open ${workspace.name}`}
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-xl" style={{ color: workspace.color }}>
                  {workspace.name.slice(0, 1)}
                </div>
                <div className="flex items-center gap-2 text-white/35">
                  {workspace.pinned && <Pin size={16} />}
                  <GripVertical size={16} />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: workspace.color }} />
                <h2 className="text-lg font-bold">{workspace.name}</h2>
              </div>
              <p className="mt-2 min-h-12 text-sm leading-6 text-white/52">{workspace.description}</p>
              <div className="mt-5 grid grid-cols-5 gap-1 text-center text-[11px] text-white/45">
                {["Prompts", "Notes", "Tasks", "Media", "Links"].map((item) => (
                  <span key={item} className="rounded border border-white/10 bg-white/[0.035] py-1">{item}</span>
                ))}
              </div>
              {activeWorkspaceId === workspace.id && <div className="mt-4 text-xs font-semibold text-cyan-300">Active workspace</div>}
            </button>
          ))}
          <div className="glass rounded-lg p-4">
            <Skeleton className="h-12 w-12" />
            <Skeleton className="mt-6 h-5 w-32" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </div>
        </div>
      )}
    </div>
  );
}
