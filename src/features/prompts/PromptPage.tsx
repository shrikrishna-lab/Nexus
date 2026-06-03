import { useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { Copy, Download, History, ImagePlus, Search, Star, Upload } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { extractVariables, substituteVariables } from "@/lib/utils";
import { useNexusStore } from "@/stores/useNexusStore";

export function PromptPage() {
  const { prompts, activeWorkspaceId } = useNexusStore();
  const [selectedId, setSelectedId] = useState(prompts[0]?.id);
  const selected = prompts.find((prompt) => prompt.id === selectedId) || prompts[0];
  const variables = useMemo(() => extractVariables(selected?.body || ""), [selected]);
  const [values, setValues] = useState<Record<string, string>>({});

  const copyPrompt = async (body: string) => {
    await navigator.clipboard?.writeText(body);
    toast.success("Prompt copied");
  };

  return (
    <div>
      <ModuleHeader
        eyebrow="Module 2"
        title="Prompt Library"
        description="Cover-art prompt cards, tags, full-screen editor patterns, variable substitution, favorites, version restore, and JSON import/export."
        actions={
          <>
            <Button><Upload size={16} /> Import JSON</Button>
            <Button><Download size={16} /> Export</Button>
            <Button variant="primary"><ImagePlus size={16} /> New Prompt</Button>
          </>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section>
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_160px_160px]">
            <div className="glass flex items-center gap-3 rounded-lg px-3">
              <Search size={17} className="text-white/40" />
              <Input className="border-0 bg-transparent px-0" placeholder="Search prompt body, title, or tags" />
            </div>
            <select className="focus-ring h-10 rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm">
              <option>All tags</option>
              <option>Study</option>
              <option>Product</option>
            </select>
            <select className="focus-ring h-10 rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm">
              <option>Most used</option>
              <option>Newest</option>
              <option>A-Z</option>
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {prompts.map((prompt) => (
              <article key={prompt.id} className="glass card-hover overflow-hidden rounded-lg">
                <div className="h-32 border-b border-white/10" style={{ background: prompt.imageUrl }} />
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <button className="text-left" onClick={() => setSelectedId(prompt.id)}>
                      <h2 className="font-bold">{prompt.title}</h2>
                      <p className="mt-1 text-xs text-white/40">{prompt.useCount} uses · {prompt.updatedAt}</p>
                    </button>
                    <Star size={17} className={prompt.favorite ? "fill-violet-300 text-violet-300" : "text-white/35"} />
                  </div>
                  <p className="line-clamp-3 min-h-16 text-sm leading-6 text-white/55">{prompt.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{prompt.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                  <Button className="mt-4 w-full" onClick={() => copyPrompt(prompt.body)}><Copy size={16} /> Copy</Button>
                </div>
              </article>
            ))}
            <div className="glass rounded-lg p-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="mt-4 h-5 w-36" />
              <Skeleton className="mt-3 h-4 w-full" />
            </div>
          </div>
        </section>
        {selected && (
          <aside className="glass sticky top-4 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">{selected.title}</h2>
                <p className="text-xs text-white/42">Workspace: {selected.workspaceId === activeWorkspaceId ? "Active" : selected.workspaceId}</p>
              </div>
              <Button size="icon" aria-label="Version history"><History size={17} /></Button>
            </div>
            <CodeMirror value={selected.body} height="220px" theme={oneDark} extensions={[markdown()]} basicSetup={{ lineNumbers: false }} />
            <div className="mt-4 space-y-3">
              {variables.map((variable) => (
                <Input key={variable} placeholder={`Value for {{${variable}}}`} value={values[variable] || ""} onChange={(event) => setValues({ ...values, [variable]: event.target.value })} />
              ))}
            </div>
            <Button className="mt-4 w-full" variant="primary" onClick={() => copyPrompt(substituteVariables(selected.body, values))}><Copy size={16} /> Copy Filled Prompt</Button>
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 text-xs uppercase tracking-[0.18em] text-white/35">Versions</div>
              {selected.versions.map((version) => (
                <div key={version.id} className="mb-2 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm">
                  <div className="font-medium">{version.label}</div>
                  <div className="mt-1 line-clamp-2 text-xs text-white/45">{version.body}</div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
