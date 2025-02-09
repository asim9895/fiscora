import { Easing, Image, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { Slot, Tabs } from "expo-router";
import { AppRootState } from "@/redux/store";
import { Colors } from "@/theme/colors";
import { useSelector } from "react-redux";
import { font_family } from "@/theme/font_family";
import { icons } from "@/data/icon";

const TabsLayout = () => {
  const { colors }: { colors: Colors } = useSelector(
    (state: AppRootState) => state.theme
  );
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.light_gray,
          headerShown: false,
          tabBarShowLabel: true,
          animation: "none",
          tabBarLabelStyle: {
            fontFamily: font_family.font_medium,
            fontSize: 11,
          },
          lazy: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: colors.background,
            borderTopWidth: 0.7,
            borderColor: colors.foreground,
            height: Platform.OS === "ios" ? 85 : 70,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={focused ? icons.home_filled : icons.home_outlined}
                style={{ width: 23, height: 23, marginBottom: 5 }}
                tintColor={focused ? colors.text : colors.light_gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? icons.search_filled : icons.search_outlined}
                style={{ width: 23, height: 23, marginBottom: 5 }}
                tintColor={focused ? colors.text : colors.light_gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            tabBarLabel: "Analytics",
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused ? icons.analytics_filled : icons.analytics_outlined
                }
                style={{ width: 23, height: 23, marginBottom: 5 }}
                tintColor={focused ? colors.text : colors.light_gray}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? icons.profile_filled : icons.profile_outlined}
                style={{ width: 23, height: 23, marginBottom: 5 }}
                tintColor={focused ? colors.text : colors.light_gray}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
