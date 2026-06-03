import { ReactNode, useState } from "react";
import { Lock, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNexusStore } from "@/stores/useNexusStore";

export function AuthGate({ children }: { children: ReactNode }) {
  const { authReady, profileName, unlock, setupLocalAuth } = useNexusStore();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  if (authReady) return <>{children}</>;

  const isFirstRun = !profileName;

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_10%,rgba(124,58,237,.22),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(6,182,212,.16),transparent_28%),#0a0a0f] p-4 text-white">
      <section className="glass w-full max-w-md rounded-lg p-6 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md border border-violet-400/40 bg-violet-500/18 text-violet-100">
            {isFirstRun ? <Sparkles size={20} /> : <Lock size={20} />}
          </div>
          <div>
            <h1 className="text-xl font-black">{isFirstRun ? "Initialize Nexus" : "Unlock Nexus"}</h1>
            <p className="text-sm text-white/48">{isFirstRun ? "Create your private local profile." : `Welcome back${profileName ? `, ${profileName}` : ""}.`}</p>
          </div>
        </div>
        <div className="space-y-3">
          {isFirstRun && (
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-3 text-white/35" size={16} />
              <Input className="pl-9" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
          )}
          <Input placeholder="Local PIN" type="password" value={pin} onChange={(event) => setPin(event.target.value)} onKeyDown={(event) => {
            if (event.key === "Enter") {
              const ok = isFirstRun ? setupLocalAuth(name || "Nexus User", pin) : unlock(pin);
              if (!ok) setError(isFirstRun ? "Enter a PIN with at least 4 digits." : "PIN did not match.");
            }
          }} />
          {error && <p className="text-sm text-rose-200">{error}</p>}
          <Button
            className="w-full"
            variant="primary"
            onClick={() => {
              const ok = isFirstRun ? setupLocalAuth(name || "Nexus User", pin) : unlock(pin);
              if (!ok) setError(isFirstRun ? "Enter a PIN with at least 4 digits." : "PIN did not match.");
            }}
          >
            {isFirstRun ? "Create Local Profile" : "Unlock"}
          </Button>
        </div>
        <p className="mt-5 text-xs leading-5 text-white/38">This lock is local-first. Supabase sync can be enabled separately with your project anon key and database password environment variable.</p>
      </section>
    </div>
  );
}
