import { Download, Lock, Moon, Palette, Shield, Timer, Upload } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeader } from "@/components/ModuleHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { themes } from "@/data/seed";
import { useNexusStore } from "@/stores/useNexusStore";

export function SettingsPage() {
  const { themeName, setTheme, focusMode, toggleFocus, lock } = useNexusStore();

  return (
    <div>
      <ModuleHeader
        eyebrow="Global"
        title="Settings & System"
        description="Onboarding, themes, backup and restore, privacy lock, focus mode, changelog, offline mode, desktop widgets, and lifetime stats."
        actions={
          <>
            <Button onClick={() => toast.info("Restore picker requested")}><Upload size={16} /> Restore .nexus</Button>
            <Button variant="primary" onClick={() => toast.success("Encrypted backup export prepared")}><Download size={16} /> Backup</Button>
          </>
        }
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="glass rounded-lg p-4 xl:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 font-bold"><Palette size={17} /> Theme Engine</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map(([name, accent, secondary]) => (
              <button key={name} className={`focus-ring rounded-lg border p-3 text-left ${themeName === name ? "border-violet-300 bg-white/[0.08]" : "border-white/10 bg-white/[0.035]"}`} onClick={() => setTheme(name)}>
                <div className="mb-3 flex gap-2">
                  <span className="h-6 w-6 rounded" style={{ background: accent }} />
                  <span className="h-6 w-6 rounded" style={{ background: secondary }} />
                </div>
                <div className="text-sm font-medium">{name}</div>
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Input placeholder="Custom accent hex" />
            <Input placeholder="Custom secondary hex" />
          </div>
        </section>
        <section className="glass rounded-lg p-4">
          <h2 className="mb-4 flex items-center gap-2 font-bold"><Shield size={17} /> Privacy Lock</h2>
          <div className="space-y-3">
            <Input placeholder="Set local PIN" type="password" />
            <Button className="w-full" onClick={() => {
              toast.success("Privacy lock enabled");
              lock();
            }}><Lock size={16} /> Enable biometric/PIN lock</Button>
            <Button className="w-full" onClick={toggleFocus}><Moon size={16} /> {focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}</Button>
          </div>
        </section>
        <section className="glass rounded-lg p-4">
          <h2 className="mb-3 flex items-center gap-2 font-bold"><Timer size={17} /> Onboarding Wizard</h2>
          <ol className="space-y-2 text-sm text-white/58">
            {["Name", "Accent color", "First workspace", "Import data", "Armin API key"].map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
          </ol>
        </section>
        <section className="glass rounded-lg p-4">
          <h2 className="mb-3 font-bold">Changelog</h2>
          <p className="text-sm leading-6 text-white/52">v0.1.0 scaffold: PWA shell, module previews, schema, Tauri, Capacitor, command palette, theme engine, and offline-first storage adapters.</p>
        </section>
        <section className="glass rounded-lg p-4">
          <h2 className="mb-3 font-bold">Lifetime Stats</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {["3 prompts", "31 tasks", "50.5 hours", "4 stash items", "8k words", "12 chats"].map((stat) => <div key={stat} className="rounded border border-white/10 bg-white/[0.035] p-3">{stat}</div>)}
          </div>
        </section>
      </div>
    </div>
  );
}
