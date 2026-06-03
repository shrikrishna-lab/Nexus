import { ReactNode, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Archive, BarChart3, Bot, Boxes, ChevronLeft, Command, Database, Flame, Home, Menu, Moon, Plus, Search, Settings, Shield, Sparkles, Wifi } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/Button";
import { CommandPalette } from "@/app/CommandPalette";
import { useNexusStore } from "@/stores/useNexusStore";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/workspaces", label: "Workspaces", icon: Home },
  { to: "/prompts", label: "Prompts", icon: Sparkles },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/stash", label: "Stash", icon: Archive },
  { to: "/future", label: "Future", icon: Flame },
  { to: "/armin", label: "Armin", icon: Bot },
  { to: "/connect", label: "Connect", icon: Wifi }
];

export function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace,
    sidebarCollapsed,
    toggleSidebar,
    commandOpen,
    setCommandOpen,
    arminThinking,
    toggleArmin,
    focusMode
  } = useNexusStore();

  useHotkeys("mod+k", (event) => {
    event.preventDefault();
    setCommandOpen(true);
  });
  useHotkeys("mod+shift+a", (event) => {
    event.preventDefault();
    toggleArmin();
    navigate("/armin");
  });
  useHotkeys("mod+1,mod+2,mod+3,mod+4,mod+5,mod+6,mod+7", (event) => {
    event.preventDefault();
    const index = Number(event.key) - 1;
    navigate(nav[index]?.to || "/workspaces");
  });
  useHotkeys("mod+n", (event) => {
    event.preventDefault();
    setCommandOpen(true);
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,.16),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(6,182,212,.10),transparent_28%),#0a0a0f] text-white">
      {arminThinking && <div aria-hidden className="pointer-events-none fixed inset-0 z-50 animate-ambient" />}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <div className="flex h-screen">
        <aside
          className={cn(
            "hidden shrink-0 border-r border-white/10 bg-black/20 p-3 backdrop-blur-2xl transition-all duration-200 md:block",
            sidebarCollapsed ? "w-16" : "w-60",
            focusMode && "-ml-60 opacity-0"
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <Link to="/workspaces" className="focus-ring flex items-center gap-3 rounded-md">
              <div className="grid h-10 w-10 place-items-center rounded-md border border-violet-400/40 bg-violet-500/18 text-lg font-black shadow-glow">N</div>
              {!sidebarCollapsed && (
                <div>
                  <div className="text-sm font-bold tracking-wide">Nexus</div>
                  <div className="text-xs text-white/45">private OS</div>
                </div>
              )}
            </Link>
            {!sidebarCollapsed && (
              <Button aria-label="Collapse sidebar" size="icon" variant="ghost" onClick={toggleSidebar}>
                <ChevronLeft size={18} />
              </Button>
            )}
          </div>
          {sidebarCollapsed && (
            <Button aria-label="Expand sidebar" size="icon" variant="ghost" className="mb-4" onClick={toggleSidebar}>
              <Menu size={18} />
            </Button>
          )}
          <nav className="space-y-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "focus-ring flex h-10 items-center gap-3 rounded-md px-3 text-sm text-white/64 transition hover:bg-white/[0.07] hover:text-white",
                    isActive && "border border-white/10 bg-white/[0.08] text-white shadow-glow",
                    sidebarCollapsed && "justify-center px-0"
                  )
                }
              >
                <item.icon size={18} />
                {!sidebarCollapsed && item.label}
              </NavLink>
            ))}
          </nav>
          {!sidebarCollapsed && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/34">
                Workspaces <Plus size={14} />
              </div>
              <div className="space-y-1">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    aria-label={`Switch to ${workspace.name}`}
                    className={cn("focus-ring flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-white/62 hover:bg-white/[0.06]", activeWorkspaceId === workspace.id && "bg-white/[0.07] text-white")}
                    onClick={() => setActiveWorkspace(workspace.id)}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: workspace.color }} />
                    <span className="truncate">{workspace.name}</span>
                    {workspace.pinned && <Shield className="ml-auto text-white/35" size={13} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-black/10 px-4 backdrop-blur-2xl">
            <Button aria-label="Open navigation" size="icon" variant="ghost" className="md:hidden">
              <Menu size={18} />
            </Button>
            <button
              className="focus-ring glass flex h-10 min-w-0 flex-1 items-center gap-3 rounded-md px-3 text-left text-sm text-white/42"
              onClick={() => setCommandOpen(true)}
            >
              <Search size={17} />
              <span className="truncate">Search everything or run a command</span>
              <kbd className="ml-auto hidden rounded border border-white/10 px-2 py-0.5 text-xs text-white/40 sm:block">Cmd K</kbd>
            </button>
            <select
              aria-label="Workspace switcher"
              className="focus-ring hidden h-10 rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm text-white md:block"
              value={activeWorkspaceId}
              onChange={(event) => setActiveWorkspace(event.target.value)}
            >
              {workspaces.map((workspace) => (
                <option key={workspace.id} value={workspace.id} className="bg-[#0a0a0f]">
                  {workspace.name}
                </option>
              ))}
            </select>
            <Button aria-label="Toggle Armin" size="icon" variant="primary" onClick={toggleArmin}>
              <Bot size={18} />
            </Button>
            <Button aria-label="Settings" size="icon" variant="panel" onClick={() => navigate("/settings")}>
              <Settings size={18} />
            </Button>
          </header>
          <main className="min-h-0 flex-1 overflow-y-auto p-4 pb-24 md:p-6">{children}</main>
          <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/10 bg-[#0a0a0f]/94 p-2 backdrop-blur-2xl md:hidden">
            {nav.slice(0, 5).map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("flex flex-col items-center gap-1 rounded-md py-2 text-[11px] text-white/48", isActive && "bg-white/[0.08] text-white")}>
                <item.icon size={17} />
                {item.label.split(" ")[0]}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
