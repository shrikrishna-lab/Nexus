export type Workspace = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  pinned?: boolean;
};

export type Prompt = {
  id: string;
  workspaceId: string;
  title: string;
  body: string;
  tags: string[];
  imageUrl: string;
  useCount: number;
  favorite: boolean;
  updatedAt: string;
  versions: { id: string; label: string; body: string }[];
};

export type StashItem = {
  id: string;
  workspaceId: string;
  type: "text" | "code" | "image" | "command" | "api-key" | "file";
  title: string;
  content: string;
  tags: string[];
  encrypted?: boolean;
};

export type Task = {
  id: string;
  workspaceId: string;
  title: string;
  status: "To Do" | "In Progress" | "Done" | "Blocked";
  priority: "P1" | "P2" | "P3" | "P4";
  dueDate?: string;
};

export type Idea = {
  id: string;
  workspaceId: string;
  title: string;
  body: string;
  status: "idea" | "building" | "launched";
  priority: "P1" | "P2" | "P3" | "P4";
};

export const workspaces: Workspace[] = [
  { id: "study", name: "Study", icon: "BookOpen", color: "#7c3aed", description: "React, algorithms, notes, and tracked learning.", pinned: true },
  { id: "projects", name: "Projects", icon: "Rocket", color: "#06b6d4", description: "Apps, experiments, milestones, and release notes.", pinned: true },
  { id: "gta", name: "GTA RP", icon: "Radio", color: "#f59e0b", description: "Characters, scripts, cooldowns, keybinds, and server lore." },
  { id: "personal", name: "Personal", icon: "Sparkles", color: "#10b981", description: "Habits, fitness, ideas, and private vault entries." }
];

export const prompts: Prompt[] = [
  {
    id: "p1",
    workspaceId: "study",
    title: "Socratic Tutor",
    body: "Teach me {{topic}} in {{language}}. Ask one question at a time, wait for my answer, then correct gaps gently.",
    tags: ["study", "teaching", "claude"],
    imageUrl: "linear-gradient(135deg, rgba(124,58,237,.9), rgba(6,182,212,.55))",
    useCount: 42,
    favorite: true,
    updatedAt: "Today",
    versions: [
      { id: "v1", label: "Initial", body: "Teach me {{topic}} step by step." },
      { id: "v2", label: "Current", body: "Teach me {{topic}} in {{language}}. Ask one question at a time, wait for my answer, then correct gaps gently." }
    ]
  },
  {
    id: "p2",
    workspaceId: "projects",
    title: "Feature Spec Builder",
    body: "Turn this rough idea into a shippable spec: {{idea}}. Include user stories, data model, risks, and MVP scope.",
    tags: ["product", "planning"],
    imageUrl: "linear-gradient(135deg, rgba(6,182,212,.86), rgba(16,185,129,.42))",
    useCount: 27,
    favorite: false,
    updatedAt: "Yesterday",
    versions: [{ id: "v1", label: "Current", body: "Turn this rough idea into a shippable spec: {{idea}}. Include user stories, data model, risks, and MVP scope." }]
  },
  {
    id: "p3",
    workspaceId: "gta",
    title: "RP Scene Improver",
    body: "Rewrite this RP scene with stronger stakes and natural dialogue. Character: {{character}}. Scene: {{scene}}",
    tags: ["gta-rp", "writing"],
    imageUrl: "linear-gradient(135deg, rgba(245,158,11,.82), rgba(244,63,94,.45))",
    useCount: 18,
    favorite: true,
    updatedAt: "Mon",
    versions: [{ id: "v1", label: "Current", body: "Rewrite this RP scene with stronger stakes and natural dialogue. Character: {{character}}. Scene: {{scene}}" }]
  }
];

export const stashItems: StashItem[] = [
  { id: "s1", workspaceId: "projects", type: "code", title: "Tauri MCP Launcher Command", content: "cargo tauri dev --features mcp-launcher", tags: ["tauri", "command"] },
  { id: "s2", workspaceId: "gta", type: "text", title: "Radio Code 10-76", content: "10-76 means en route. Keep responses short, clear, and IC.", tags: ["radio", "gta-rp"] },
  { id: "s3", workspaceId: "personal", type: "api-key", title: "Anthropic API Key Slot", content: "Encrypted value hidden until PIN unlock", tags: ["anthropic", "secure"], encrypted: true },
  { id: "s4", workspaceId: "study", type: "command", title: "React Query Install", content: "npm i @tanstack/react-query", tags: ["react", "setup"] }
];

export const tasks: Task[] = [
  { id: "t1", workspaceId: "projects", title: "Ship Nexus PWA shell", status: "In Progress", priority: "P1", dueDate: "2026-06-07" },
  { id: "t2", workspaceId: "study", title: "Log 8 hours of React patterns", status: "To Do", priority: "P2", dueDate: "2026-06-09" },
  { id: "t3", workspaceId: "personal", title: "Evening walk streak", status: "Done", priority: "P3" },
  { id: "t4", workspaceId: "gta", title: "Update gang info sheet", status: "Blocked", priority: "P2" }
];

export const progressLogs = [
  { day: "Mon", study: 2.5, projects: 4, fitness: 0.5 },
  { day: "Tue", study: 3, projects: 2, fitness: 1 },
  { day: "Wed", study: 1.5, projects: 5, fitness: 0 },
  { day: "Thu", study: 4, projects: 1, fitness: 1.2 },
  { day: "Fri", study: 2, projects: 4.5, fitness: 0.8 },
  { day: "Sat", study: 5, projects: 3, fitness: 1 },
  { day: "Sun", study: 1, projects: 2, fitness: 1.5 }
];

export const ideas: Idea[] = [
  { id: "i1", workspaceId: "projects", title: "MCP Config Manager", body: "Store server command, args, env vars, and copy JSON blocks.", status: "building", priority: "P1" },
  { id: "i2", workspaceId: "personal", title: "Focus Room", body: "A minimal Pomodoro mode that hides everything except one active card.", status: "idea", priority: "P2" },
  { id: "i3", workspaceId: "gta", title: "Cooldown Timeline", body: "Scrollable RP event timeline with automatic cooldown timers.", status: "idea", priority: "P3" }
];

export const integrations = [
  { id: "github", service: "GitHub", status: "connected", detail: "3 repos, 5 open PRs", interval: "15m" },
  { id: "notion", service: "Notion", status: "syncing", detail: "Reading workspace pages", interval: "30m" },
  { id: "calendar", service: "Google Calendar", status: "error", detail: "Token refresh needed", interval: "10m" },
  { id: "spotify", service: "Spotify", status: "connected", detail: "Now playing ready", interval: "Live" },
  { id: "discord", service: "Discord", status: "offline", detail: "No local token stored", interval: "Manual" },
  { id: "webhooks", service: "Custom Webhooks", status: "connected", detail: "2 endpoints", interval: "Event" }
];

export const themes = [
  ["Dark Violet", "#7c3aed", "#06b6d4"],
  ["Midnight Blue", "#2563eb", "#22d3ee"],
  ["Forest", "#16a34a", "#84cc16"],
  ["Sunset", "#f43f5e", "#f59e0b"],
  ["Arctic", "#38bdf8", "#a78bfa"],
  ["Neon", "#d946ef", "#22c55e"],
  ["Paper", "#334155", "#0f766e"],
  ["Amoled Black", "#8b5cf6", "#14b8a6"]
] as const;
