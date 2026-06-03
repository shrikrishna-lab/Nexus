import { Bot, Github, KeyRound, Link2, Play, RefreshCw, Settings, Webhook } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/Button";
import { integrations } from "@/data/seed";
import { cn } from "@/lib/utils";
import { syncEnabled } from "@/lib/sync";

const icons: Record<string, typeof Github> = {
  GitHub: Github,
  Notion: Link2,
  "Google Calendar": RefreshCw,
  Spotify: Play,
  Discord: Bot,
  "Custom Webhooks": Webhook
};

export function ConnectPage() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Module 6"
        title="Connect Hub"
        description="Offline-friendly integration dashboard for GitHub, Notion, Calendar, Spotify, Discord, webhooks, API keys, and desktop MCP subprocess launchers."
        actions={<Button variant="primary" onClick={() => toast.info("API Key Manager opened")}><KeyRound size={16} /> API Key Manager</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => {
          const Icon = icons[integration.service] || Link2;
          return (
            <article key={integration.id} className="glass card-hover rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-cyan-200"><Icon size={20} /></div>
                <span className={cn("rounded border px-2 py-1 text-xs", integration.status === "connected" && "border-emerald-400/25 bg-emerald-500/10 text-emerald-100", integration.status === "syncing" && "border-cyan-400/25 bg-cyan-500/10 text-cyan-100", integration.status === "error" && "border-rose-400/25 bg-rose-500/10 text-rose-100", integration.status === "offline" && "border-white/10 bg-white/[0.04] text-white/45")}>{integration.status}</span>
              </div>
              <h2 className="mt-5 text-lg font-bold">{integration.service}</h2>
              <p className="mt-2 text-sm text-white/52">{integration.detail}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-white/42">
                <span>Refresh: {integration.interval}</span>
                <Button size="sm" onClick={() => toast.info(`${integration.service} configuration opened`)}><Settings size={14} /> Configure</Button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="glass rounded-lg p-4">
          <h2 className="font-bold">Cross-Device Sync</h2>
          <p className="mt-2 text-sm leading-6 text-white/52">
            Status: {syncEnabled ? "enabled with Supabase realtime" : "disabled until VITE_SYNC_ENABLED and Supabase anon key are configured locally"}.
            When enabled, every signed-in device reads and writes the same Supabase rows while keeping the PWA installable and cache-first.
          </p>
        </section>
        <section className="glass rounded-lg p-4">
          <h2 className="font-bold">Encrypted API Keys</h2>
          <p className="mt-2 text-sm leading-6 text-white/52">OpenAI, Anthropic, GitHub, and custom service keys are modeled for encrypted-at-rest storage and PIN unlock.</p>
        </section>
        <section className="glass rounded-lg p-4">
          <h2 className="font-bold">MCP Server Launcher</h2>
          <p className="mt-2 text-sm leading-6 text-white/52">Tauri desktop builds can spawn configured MCP servers through the shell plugin with copied JSON configs from Future Board.</p>
        </section>
      </div>
    </div>
  );
}
