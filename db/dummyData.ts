import { lists, tasks } from "@/db/schema";

import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import AsyncStorage from "expo-sqlite/kv-store";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  const value = AsyncStorage.getItemSync("db_initialized");

  if (value) return;

  await db.insert(lists).values([
    {
      name: "First List",
    },
    {
      name: "Second List",
    },
  ]);

  await db.insert(tasks).values([
    {
      title: "First Task",
      description: "First Task Description",
      list_id: 1,
    },
    {
      title: "Second Task",
      description: "Second Task Description",
      list_id: 1,
    },
    {
      title: "Third Task",
      description: "Third Task Description",
      list_id: 2,
    },
  ]);

  AsyncStorage.setItemSync("db_initialized", "true");
};
