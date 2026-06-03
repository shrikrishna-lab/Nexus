import { useEffect } from "react";
import { removeSyncChannel, subscribeToTable, type SyncTable } from "@/lib/sync";

export function useRealtimeTable(table: SyncTable, onChange: (payload: unknown) => void) {
  useEffect(() => {
    const channel = subscribeToTable(table, onChange);
    return () => {
      void removeSyncChannel(channel);
    };
  }, [onChange, table]);
}
