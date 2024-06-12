import { Stack } from "expo-router";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function Layout() {
  return (
    <PaperProvider>
      <View style={{ paddingTop: 32, flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="create-room/index" />
          <Stack.Screen name="room/[code]" />
          <Stack.Screen name="set-powerup/index" />
          <Stack.Screen name="set-username/index" />
        </Stack>
      </View>
    </PaperProvider>
  );
}
