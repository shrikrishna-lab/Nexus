export type NexusCommand = {
  command: string;
  title: string;
  description: string;
  module: string;
  example: string;
};

export const nexusCommands: NexusCommand[] = [
  { command: "/workspace", title: "Open Workspace", description: "Jump into a workspace room and show its prompts, stash, and tasks.", module: "Workspaces", example: "/workspace Study" },
  { command: "/new-workspace", title: "Create Workspace", description: "Start a new personalized room with name, color, and description.", module: "Workspaces", example: "/new-workspace GTA RP" },
  { command: "/prompt", title: "Find Prompt", description: "Search your prompt gallery and open the variable fill panel.", module: "Prompts", example: "/prompt Socratic Tutor" },
  { command: "/copy-prompt", title: "Copy Prompt", description: "Copy a saved prompt after replacing variables.", module: "Prompts", example: "/copy-prompt p1 topic=React language=English" },
  { command: "/stash", title: "Search Stash", description: "Find snippets, commands, media, vault entries, or RP references.", module: "Stash", example: "/stash radio codes" },
  { command: "/quick-add", title: "Quick Add", description: "Paste text, code, URL, or a command and let Nexus classify it.", module: "Stash", example: "/quick-add npm run build" },
  { command: "/task", title: "Create Task", description: "Create a task in the active workspace with priority and due date.", module: "Future", example: "/task P1 ship sync today" },
  { command: "/progress", title: "Log Progress", description: "Log study, project, habit, or fitness time.", module: "Progress", example: "/progress study 2h React Query" },
  { command: "/idea", title: "Capture Idea", description: "Drop an idea into the Future Board with a priority flag.", module: "Future", example: "/idea P2 MCP launcher UI" },
  { command: "/armin", title: "Ask Armin", description: "Ask the assistant with active workspace context.", module: "Armin", example: "/armin summarize my week" },
  { command: "/sync", title: "Sync Status", description: "Open Supabase sync status and connection setup.", module: "Connect", example: "/sync status" },
  { command: "/backup", title: "Export Backup", description: "Prepare an encrypted .nexus backup for restore on another device.", module: "Settings", example: "/backup encrypted" }
];
