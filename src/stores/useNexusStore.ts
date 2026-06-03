import { create } from "zustand";
import { prompts, stashItems, tasks, themes, workspaces, type Prompt, type StashItem, type Task, type Workspace } from "@/data/seed";

export type ModuleId = "workspaces" | "prompts" | "commands" | "progress" | "stash" | "future" | "armin" | "connect";

type NexusState = {
  workspaces: Workspace[];
  prompts: Prompt[];
  stashItems: StashItem[];
  tasks: Task[];
  authReady: boolean;
  profileName: string;
  enabledModules: ModuleId[];
  activeWorkspaceId: string;
  sidebarCollapsed: boolean;
  commandOpen: boolean;
  arminOpen: boolean;
  arminThinking: boolean;
  focusMode: boolean;
  themeName: string;
  setActiveWorkspace: (id: string) => void;
  toggleSidebar: () => void;
  setCommandOpen: (open: boolean) => void;
  toggleArmin: () => void;
  setArminThinking: (thinking: boolean) => void;
  toggleFocus: () => void;
  setTheme: (name: string) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, patch: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
  toggleModule: (id: ModuleId) => void;
  setupLocalAuth: (name: string, pin: string, enabledModules?: ModuleId[], customWorkspaces?: Workspace[]) => boolean;
  unlock: (pin: string) => boolean;
  lock: () => void;
};

const storedProfileName = localStorage.getItem("nexus.profileName") || "";
const storedPin = localStorage.getItem("nexus.pin") || "";
const allModules: ModuleId[] = ["workspaces", "prompts", "commands", "progress", "stash", "future", "armin", "connect"];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveWorkspaces(next: Workspace[]) {
  localStorage.setItem("nexus.workspaces", JSON.stringify(next));
}

function saveModules(next: ModuleId[]) {
  localStorage.setItem("nexus.enabledModules", JSON.stringify(next));
}

export const useNexusStore = create<NexusState>((set) => ({
  workspaces: readJson("nexus.workspaces", workspaces),
  prompts,
  stashItems,
  tasks,
  authReady: !storedPin,
  profileName: storedProfileName,
  enabledModules: Array.from(new Set(["workspaces", ...readJson("nexus.enabledModules", allModules), "commands"])) as ModuleId[],
  activeWorkspaceId: "study",
  sidebarCollapsed: false,
  commandOpen: false,
  arminOpen: false,
  arminThinking: false,
  focusMode: false,
  themeName: themes[0][0],
  setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleArmin: () => set((state) => ({ arminOpen: !state.arminOpen, arminThinking: !state.arminOpen })),
  setArminThinking: (thinking) => set({ arminThinking: thinking }),
  toggleFocus: () => set((state) => ({ focusMode: !state.focusMode })),
  setTheme: (name) => {
    const theme = themes.find(([themeName]) => themeName === name);
    if (theme) {
      document.documentElement.style.setProperty("--accent", theme[1]);
      document.documentElement.style.setProperty("--accent-2", theme[2]);
    }
    set({ themeName: name });
  },
  addWorkspace: (workspace) => set((state) => {
    const next = [...state.workspaces, workspace];
    saveWorkspaces(next);
    return { workspaces: next, activeWorkspaceId: workspace.id };
  }),
  updateWorkspace: (id, patch) => set((state) => {
    const next = state.workspaces.map((workspace) => (workspace.id === id ? { ...workspace, ...patch } : workspace));
    saveWorkspaces(next);
    return { workspaces: next };
  }),
  deleteWorkspace: (id) => set((state) => {
    const next = state.workspaces.filter((workspace) => workspace.id !== id);
    saveWorkspaces(next);
    return { workspaces: next, activeWorkspaceId: next[0]?.id || "" };
  }),
  toggleModule: (id) => set((state) => {
    const next = state.enabledModules.includes(id) ? state.enabledModules.filter((moduleId) => moduleId !== id) : [...state.enabledModules, id];
    const safeNext: ModuleId[] = next.includes("workspaces") ? next : ["workspaces", ...next];
    saveModules(safeNext);
    return { enabledModules: safeNext };
  }),
  setupLocalAuth: (name, pin, enabledModules = allModules, customWorkspaces) => {
    if (pin.trim().length < 4) return false;
    localStorage.setItem("nexus.profileName", name.trim() || "Nexus User");
    localStorage.setItem("nexus.pin", pin);
    saveModules(enabledModules);
    if (customWorkspaces?.length) saveWorkspaces(customWorkspaces);
    set({ profileName: name.trim() || "Nexus User", enabledModules, workspaces: customWorkspaces?.length ? customWorkspaces : workspaces, activeWorkspaceId: (customWorkspaces?.[0] || workspaces[0]).id, authReady: true });
    return true;
  },
  unlock: (pin) => {
    const ok = pin === localStorage.getItem("nexus.pin");
    if (ok) set({ authReady: true });
    return ok;
  },
  lock: () => set({ authReady: false })
}));
