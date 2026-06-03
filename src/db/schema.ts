import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const workspaces = sqliteTable("workspaces", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export const prompts = sqliteTable("prompts", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),
  imageUrl: text("image_url"),
  useCount: integer("use_count").notNull().default(0),
  favorite: integer("favorite", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});

export const stashItems = sqliteTable("stash_items", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),
  encrypted: integer("encrypted", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  title: text("title").notNull(),
  dueDate: text("due_date"),
  priority: text("priority").notNull(),
  status: text("status").notNull(),
  recurRule: text("recur_rule"),
  parentId: text("parent_id")
});

export const progressLogs = sqliteTable("progress_logs", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  category: text("category").notNull(),
  hours: real("hours").notNull(),
  notes: text("notes"),
  loggedAt: integer("logged_at", { mode: "timestamp" }).notNull()
});

export const links = sqliteTable("links", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  favicon: text("favicon"),
  screenshot: text("screenshot"),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull()
});

export const ideas = sqliteTable("ideas", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  sketchData: text("sketch_data"),
  priority: text("priority").notNull(),
  status: text("status").notNull()
});

export const arminMessages = sqliteTable("armin_messages", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  toolCalls: text("tool_calls", { mode: "json" }).$type<unknown[]>(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export const integrations = sqliteTable("integrations", {
  id: text("id").primaryKey(),
  service: text("service").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  config: text("config", { mode: "json" }).$type<Record<string, unknown>>(),
  lastSyncAt: integer("last_sync_at", { mode: "timestamp" })
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value", { mode: "json" }).$type<unknown>().notNull()
});
