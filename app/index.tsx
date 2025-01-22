import { Task } from "@/db/schema";
import { useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as schema from "@/db/schema";

const IndexPage = () => {
  const { colors } = useAppSelector((state) => state.theme);
  const globalStyles = globalStylesWrapper(colors);
  const [data, setdata] = useState<Task[]>([]);

  console.log(data);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: schema });

  const load = async () => {
    const data = await drizzleDb.query.tasks.findMany();
    setdata(data);
  };

  const add_data_to_table = async () => {
    await drizzleDb.insert(schema.tasks).values({
      title: "Test",
      description: "Test",
      list_id: 1,
    });
    await load();
  };
  useEffect(() => {
    load();
  }, []);

  const remove_all_tasks_data = async () => {
    await drizzleDb.delete(schema.tasks).execute();
    await load();
  };
  return (
    <View style={globalStyles.background}>
      <Text>Hello</Text>
      {data.map((task) => (
        <Text key={task.id}>{task.title}</Text>
      ))}
      <Button onPress={add_data_to_table} title="Add data" />
      <Button onPress={remove_all_tasks_data} title="Remove all data" />
    </View>
  );
};

export default IndexPage;
