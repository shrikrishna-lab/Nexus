import { create } from "zustand";
import { prompts, stashItems, tasks, themes, workspaces, type Prompt, type StashItem, type Task, type Workspace } from "@/data/seed";

type NexusState = {
  workspaces: Workspace[];
  prompts: Prompt[];
  stashItems: StashItem[];
  tasks: Task[];
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
};

export const useNexusStore = create<NexusState>((set) => ({
  workspaces,
  prompts,
  stashItems,
  tasks,
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
  addWorkspace: (workspace) => set((state) => ({ workspaces: [...state.workspaces, workspace] }))
}));
