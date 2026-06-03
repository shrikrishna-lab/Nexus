import Dexie, { Table } from "dexie";

export type LocalRecord = {
  id: string;
  table: string;
  payload: unknown;
  updatedAt: number;
};

export class NexusIndexedDb extends Dexie {
  records!: Table<LocalRecord, string>;

  constructor() {
    super("nexus");
    this.version(1).stores({
      records: "id, table, updatedAt"
    });
  }
}

export const indexedDb = new NexusIndexedDb();
