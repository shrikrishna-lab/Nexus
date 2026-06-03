import { useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { ChevronDown, Copy, Download, ImagePlus, Lock, Search, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { extractVariables, substituteVariables } from "@/lib/utils";
import { useNexusStore } from "@/stores/useNexusStore";

type GalleryMeta = {
  category: string;
  premium?: boolean;
  size?: "normal" | "wide" | "tall";
  art: string;
};

const galleryMeta: GalleryMeta[] = [
  {
    category: "Study System",
    art: "radial-gradient(circle at 70% 20%, rgba(255,255,255,.85), transparent 8%), radial-gradient(circle at 50% 35%, rgba(124,58,237,.95), transparent 22%), radial-gradient(circle at 25% 70%, rgba(6,182,212,.72), transparent 26%), linear-gradient(145deg, #15151b, #25222f)"
  },
  {
    category: "Product Spec",
    premium: true,
    art: "radial-gradient(circle at 62% 35%, rgba(16,185,129,.75), transparent 22%), radial-gradient(circle at 28% 38%, rgba(6,182,212,.7), transparent 24%), linear-gradient(135deg, #121417, #272d2b)"
  },
  {
    category: "Hero Section",
    size: "wide",
    art: "radial-gradient(circle at 52% 40%, rgba(255,255,255,.92), transparent 10%), radial-gradient(circle at 53% 43%, rgba(245,158,11,.95), transparent 16%), radial-gradient(circle at 65% 42%, rgba(37,99,235,.9), transparent 18%), radial-gradient(circle at 50% 40%, transparent 29%, rgba(255,255,255,.82) 30%, transparent 33%), linear-gradient(140deg, #17151a, #08090d)"
  },
  {
    category: "Roleplay",
    premium: true,
    art: "radial-gradient(circle at 30% 30%, rgba(244,63,94,.75), transparent 22%), radial-gradient(circle at 75% 60%, rgba(245,158,11,.55), transparent 25%), linear-gradient(145deg, #1b1719, #2a2420)"
  },
  {
    category: "Backgrounds",
    size: "wide",
    art: "radial-gradient(ellipse at 50% 22%, rgba(125,211,252,.96), transparent 16%), radial-gradient(ellipse at 48% 25%, rgba(6,182,212,.42), transparent 30%), radial-gradient(ellipse at 55% 36%, transparent 27%, rgba(255,255,255,.2) 29%, transparent 33%), linear-gradient(155deg, #020409 20%, #07131e 55%, #000 100%)"
  },
  {
    category: "SaaS",
    premium: true,
    art: "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02)), radial-gradient(circle at 80% 20%, rgba(124,58,237,.58), transparent 30%), #242424"
  },
  {
    category: "Code",
    art: "linear-gradient(135deg, rgba(6,182,212,.16), transparent), repeating-linear-gradient(0deg, rgba(255,255,255,.08), rgba(255,255,255,.08) 1px, transparent 1px, transparent 28px), #252525"
  },
  {
    category: "Marketing",
    premium: true,
    size: "tall",
    art: "radial-gradient(circle at 72% 12%, rgba(255,255,255,.72), transparent 12%), radial-gradient(circle at 70% 30%, rgba(59,130,246,.85), transparent 26%), linear-gradient(160deg, #121212, #292929)"
  }
];

export function PromptPage() {
  const { prompts, activeWorkspaceId } = useNexusStore();
  const [selectedId, setSelectedId] = useState(prompts[0]?.id);
  const [values, setValues] = useState<Record<string, string>>({});
  const selected = prompts.find((prompt) => prompt.id === selectedId) || prompts[0];
  const variables = useMemo(() => extractVariables(selected?.body || ""), [selected]);

  const copyPrompt = async (body: string) => {
    await navigator.clipboard?.writeText(body);
    toast.success("Prompt copied");
  };

  return (
    <div className="-m-4 min-h-[calc(100vh-4rem)] bg-[#141414] px-4 pb-10 pt-8 text-white md:-m-6 md:px-8 md:pt-10">
      <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/68">
          <span className="inline-flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          </span>
          Nexus Prompt Department
        </div>
        <p className="text-sm font-semibold text-white/58">Powered by Armin and your local prompt vault</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-normal text-white md:text-7xl">
          Unlock your AI prompt superpowers
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-semibold leading-7 text-white/58">
          Build, save, filter, copy, and reuse your best prompts from one gallery. Pick a card, fill variables, and launch.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button className="h-14 rounded-full px-8 text-base" variant="primary">
            <Sparkles size={18} /> New Prompt
          </Button>
          <Button className="h-14 rounded-full px-6 text-base">
            <Upload size={18} /> Import
          </Button>
          <Button className="h-14 rounded-full px-6 text-base">
            <Download size={18} /> Export
          </Button>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1720px]">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {["Pricing", "Landing Page", "Hero", "SaaS", "Study", "GTA RP"].map((filter) => (
              <button key={filter} className="focus-ring inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 text-sm font-bold text-white/78 hover:bg-white/[0.08]">
                {filter} <ChevronDown size={15} />
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex h-12 min-w-72 items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4">
              <Search size={17} className="text-white/42" />
              <Input className="h-full border-0 bg-transparent px-0" placeholder="Search prompt gallery" />
            </div>
            <button className="focus-ring inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 text-sm font-bold text-white/78">
              Type <ChevronDown size={15} />
            </button>
            <button className="focus-ring inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 text-sm font-bold text-white/78">
              Mixed <ChevronDown size={15} />
            </button>
          </div>
        </div>

        <div className="grid auto-rows-[210px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {prompts.concat(prompts).concat(prompts.slice(0, 2)).map((prompt, index) => {
            const meta = galleryMeta[index % galleryMeta.length];
            const isSelected = selected?.id === prompt.id;
            return (
              <article
                key={`${prompt.id}-${index}`}
                className={`group relative overflow-hidden rounded-[26px] border bg-[#282828] transition duration-300 hover:-translate-y-1 hover:border-white/22 hover:shadow-[0_22px_70px_rgba(0,0,0,.38)] ${meta.size === "wide" ? "md:col-span-2 md:row-span-2" : ""} ${meta.size === "tall" ? "xl:row-span-2" : ""} ${isSelected ? "border-cyan-300/55" : "border-white/8"}`}
                onClick={() => setSelectedId(prompt.id)}
              >
                <div className="absolute inset-x-0 top-0 h-[58%] opacity-95 transition duration-300 group-hover:scale-[1.03]" style={{ background: meta.art }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#282828] via-[#282828]/72 to-transparent" />
                {meta.size === "wide" && (
                  <div className="absolute left-8 top-8 text-xs font-black uppercase tracking-[0.14em] text-white/48">{meta.category}</div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  {meta.size === "wide" && index === 4 && (
                    <div className="mb-6 max-w-md text-3xl font-black leading-tight text-white">
                      Animated prompt backgrounds designed to convert, impress, and amaze.
                    </div>
                  )}
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-black text-white">{prompt.title}</h2>
                      <p className="mt-2 text-sm font-medium text-white/56">{meta.category}</p>
                    </div>
                    <button
                      className="focus-ring inline-flex h-11 shrink-0 items-center gap-2 rounded-2xl bg-white/[0.065] px-4 text-sm font-bold text-white/70 hover:bg-white/[0.12]"
                      onClick={(event) => {
                        event.stopPropagation();
                        void copyPrompt(prompt.body);
                      }}
                    >
                      {meta.premium ? <Lock size={17} /> : <Copy size={17} />}
                      {meta.premium ? "Premium" : "Copy"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
          <article className="flex min-h-52 items-center justify-center rounded-[26px] border border-dashed border-white/14 bg-white/[0.035]">
            <Button variant="primary"><ImagePlus size={17} /> Add Prompt Card</Button>
          </article>
        </div>
      </section>

      {selected && (
        <aside className="fixed bottom-5 right-5 z-50 hidden w-[430px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[26px] border border-white/12 bg-[#1d1d1d]/95 shadow-2xl backdrop-blur-2xl xl:block">
          <div className="flex items-start justify-between border-b border-white/10 p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/70">Selected Prompt</p>
              <h2 className="mt-1 text-xl font-black">{selected.title}</h2>
              <p className="mt-1 text-xs text-white/42">Workspace: {selected.workspaceId === activeWorkspaceId ? "Active workspace" : selected.workspaceId}</p>
            </div>
            <Button size="icon" variant="ghost" aria-label="Close prompt detail" onClick={() => setSelectedId("")}>
              <X size={18} />
            </Button>
          </div>
          <div className="max-h-[66vh] overflow-y-auto p-5">
            <CodeMirror value={selected.body} height="190px" theme={oneDark} extensions={[markdown()]} basicSetup={{ lineNumbers: false }} />
            <div className="mt-4 space-y-3">
              {variables.map((variable) => (
                <Input key={variable} placeholder={`Value for {{${variable}}}`} value={values[variable] || ""} onChange={(event) => setValues({ ...values, [variable]: event.target.value })} />
              ))}
            </div>
            <Button className="mt-4 w-full rounded-full" variant="primary" onClick={() => copyPrompt(substituteVariables(selected.body, values))}>
              <Copy size={16} /> Copy Filled Prompt
            </Button>
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 text-xs uppercase tracking-[0.18em] text-white/35">Versions</div>
              {selected.versions.map((version) => (
                <div key={version.id} className="mb-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-sm">
                  <div className="font-medium">{version.label}</div>
                  <div className="mt-1 line-clamp-2 text-xs text-white/45">{version.body}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
