import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { globalStylesWrapper } from "@/styles/global.style";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icon";
import { useRouter } from "expo-router";
import { getYear, format } from "date-fns";
import { set_user_profile } from "@/redux/slices/user_slice";

const SetupProfilePage = () => {
  const { colors, theme } = useAppSelector((state) => state.theme);
  const globalStyles = globalStylesWrapper(colors);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [name, setname] = useState("");
  const [error, seterror] = useState("");

  const currentMonth = format(new Date(), "MMM");
  const currentYear = getYear(new Date());

  console.log(currentMonth, currentYear);
  const submit_profile = () => {
    console.log("name", name);
    if (name === "") {
      seterror("Please enter your name");

      return;
    }
    if (name.length < 3) {
      seterror("Name must be at least 3 characters");

      return;
    }
    dispatch(
      set_user_profile({
        name: name,
        selected_month: currentMonth,
        selected_year: currentYear,
        creation_month: currentMonth,
        creation_year: currentYear,
      })
    );
    router.push("/(tabs)/home");
  };
  return (
    <View style={globalStyles.background}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Text
        style={{
          color: colors.text,
          fontFamily: font_family.font_bold,
          fontSize: 40,
          textAlign: "center",
          marginTop: 200,
        }}
      >
        Fiscora
      </Text>
      <TextInput
        placeholder="Enter name"
        placeholderTextColor={colors.light_gray}
        onChangeText={(text) => setname(text)}
        style={{
          color: colors.text,
          fontFamily: font_family.font_semibold,
          fontSize: 20,
          textAlign: "center",
          backgroundColor: colors.foreground,
          padding: 10,
          paddingVertical: 20,
          marginHorizontal: 20,
          marginVertical: 20,
          marginBottom: 10,
          borderRadius: 10,
        }}
      />
      {error && (
        <Text
          style={{
            color: "crimson",
            textAlign: "center",
            paddingVertical: 20,
            paddingTop: 0,
            fontFamily: font_family.font_medium,
            fontSize: 17,
          }}
        >
          {error}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={submit_profile}
        style={{
          alignSelf: "center",
          padding: 25,
          backgroundColor: colors.text,
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          borderRadius: 40,
          marginTop: 20,
        }}
      >
        <Image
          source={icons.entry_inside}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SetupProfilePage;
