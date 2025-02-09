import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { dark, light } from "@/theme/colors";
import { set_theme } from "@/redux/slices/theme_slice";
import { persistor, store } from "@/redux/store";
import { useAppDispatch } from "@/hooks/redux_hooks";
import { fonts } from "@/data/fonts";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { database_name } from "../constants";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Separate component for the main app content
function MainApp({ loaded }: { loaded: boolean }) {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const expoDb = openDatabaseSync(database_name);
  const db = drizzle(expoDb);

  useDrizzleStudio(expoDb);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, dispatch]);

  // useEffect(() => {
  //   const initData = async () => {
  //     console.log("called");
  //     if (success && loaded) {
  //       console.log("called here");
  //       await addDummyData(db);
  //     }
  //   };

  //   initData();
  // }, [success, loaded]);

  useEffect(() => {
    if (loaded) {
      dispatch(
        set_theme({
          theme: colorScheme,
          colors: colorScheme === "dark" ? dark : light,
        })
      );
      SplashScreen.hideAsync();
    }
  }, [loaded, dispatch, colorScheme]);

  if (!loaded) {
    return null;
  }

  console.log(success, error);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="setup-profile"
        options={{ headerShown: false, animation: "simple_push" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts(fonts);

  return (
    <Suspense fallback={<ActivityIndicator size={"large"} />}>
      <SQLiteProvider
        databaseName={database_name}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainApp loaded={loaded} />
          </PersistGate>
        </Provider>
      </SQLiteProvider>
    </Suspense>
  );
}
