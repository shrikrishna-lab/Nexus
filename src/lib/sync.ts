import { createClient, type RealtimeChannel } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const syncEnabled = import.meta.env.VITE_SYNC_ENABLED === "true" && Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = syncEnabled
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: { eventsPerSecond: 10 }
      }
    })
  : null;

export type SyncTable =
  | "workspaces"
  | "prompts"
  | "prompt_versions"
  | "stash_items"
  | "tasks"
  | "progress_logs"
  | "links"
  | "ideas"
  | "armin_messages"
  | "integrations"
  | "settings";

export function subscribeToTable(table: SyncTable, callback: (payload: unknown) => void): RealtimeChannel | null {
  if (!supabase) return null;

  return supabase
    .channel(`public:${table}`)
    .on("postgres_changes", { event: "*", schema: "public", table }, callback)
    .subscribe();
}

export async function removeSyncChannel(channel: RealtimeChannel | null) {
  if (!supabase || !channel) return;
  await supabase.removeChannel(channel);
}

export async function getCurrentUserId() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function uploadNexusMedia(file: File, folder: string) {
  if (!supabase) throw new Error("Supabase sync is disabled");

  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Sign in before uploading media");

  const safeName = file.name.replace(/[^\w.-]+/g, "-");
  const path = `${userId}/${folder}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from("nexus-media").upload(path, file, { upsert: false });
  if (error) throw error;

  const { data } = await supabase.storage.from("nexus-media").createSignedUrl(path, 60 * 60 * 24 * 7);
  return { path, signedUrl: data?.signedUrl ?? null };
}

export async function insertSyncedRow<T extends Record<string, unknown>>(table: SyncTable, row: T) {
  if (!supabase) throw new Error("Supabase sync is disabled");

  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Sign in before syncing");

  const { data, error } = await supabase.from(table).insert({ ...row, user_id: userId }).select().single();
  if (error) throw error;
  return data;
}
