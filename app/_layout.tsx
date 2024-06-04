import { Slot } from "expo-router";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function Layout() {
  return (
    <PaperProvider>
      <View style={{ paddingTop: 32, flex: 1 }}>
        <Slot />
      </View>
    </PaperProvider>
  );
}
