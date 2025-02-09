import { IncomeCategory } from "@/db/schema";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as schema from "@/db/schema";
import MonthsListing from "@/components/MonthsListing";
import { set_user_profile } from "@/redux/slices/user_slice";

const HomePage = () => {
  const { colors } = useAppSelector((state) => state.theme);
  const { name, creation_month, creation_year, selected_month, selected_year } =
    useAppSelector((state) => state.user);
  const globalStyles = globalStylesWrapper(colors);
  const [data, setdata] = useState<IncomeCategory[]>([]);
  const dispatch = useAppDispatch();

  console.log(data);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: schema });

  const load = async () => {
    const data = await drizzleDb.query.income_category.findMany();
    setdata(data);
  };

  const add_data_to_table = async () => {
    await drizzleDb.insert(schema.income_category).values({
      name: "salary",
    });
    await load();
  };
  useEffect(() => {
    load();
  }, []);

  const remove_all_tasks_data = async () => {
    await drizzleDb.delete(schema.income_category).execute();
    await load();
  };
  return (
    <View style={globalStyles.background}>
      <MonthsListing onDateSelect={() => {}} />
      <Text>Hello</Text>
      <Text style={{ color: colors.text }}>
        {name} {creation_month} {creation_year} {selected_month} {selected_year}
      </Text>
      {data.map((task) => (
        <Text key={task.id} style={{ color: colors.text }}>
          {task.name}
        </Text>
      ))}
      <Button onPress={add_data_to_table} title="Add data" />
      <Button onPress={remove_all_tasks_data} title="Remove all data" />
      <Button
        onPress={() => {
          dispatch(
            set_user_profile({
              name: "Asim Jaipuri",
              selected_month: "Sept",
              selected_year: 2025,
              creation_month: "Oct",
              creation_year: 2024,
            })
          );
        }}
        title="Update Profile"
      />
    </View>
  );
};

export default HomePage;
