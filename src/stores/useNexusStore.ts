import { create } from "zustand";
import { prompts, stashItems, tasks, themes, workspaces, type Prompt, type StashItem, type Task, type Workspace } from "@/data/seed";

type NexusState = {
  workspaces: Workspace[];
  prompts: Prompt[];
  stashItems: StashItem[];
  tasks: Task[];
  authReady: boolean;
  profileName: string;
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
  setupLocalAuth: (name: string, pin: string) => boolean;
  unlock: (pin: string) => boolean;
  lock: () => void;
};

const storedProfileName = localStorage.getItem("nexus.profileName") || "";
const storedPin = localStorage.getItem("nexus.pin") || "";

export const useNexusStore = create<NexusState>((set) => ({
  workspaces,
  prompts,
  stashItems,
  tasks,
  authReady: !storedPin,
  profileName: storedProfileName,
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
  addWorkspace: (workspace) => set((state) => ({ workspaces: [...state.workspaces, workspace] })),
  setupLocalAuth: (name, pin) => {
    if (pin.trim().length < 4) return false;
    localStorage.setItem("nexus.profileName", name.trim() || "Nexus User");
    localStorage.setItem("nexus.pin", pin);
    set({ profileName: name.trim() || "Nexus User", authReady: true });
    return true;
  },
  unlock: (pin) => {
    const ok = pin === localStorage.getItem("nexus.pin");
    if (ok) set({ authReady: true });
    return ok;
  },
  lock: () => set({ authReady: false })
}));
