import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useJoinRoomState } from "../../src/store";
import { ScreenContainer } from "../../src/components/ScreenContainer";
import { Footer } from "../../src/components/Footer";
import { router } from "expo-router";

export default function Page() {
  const username = useJoinRoomState((state) => state.username);
  const setUsername = useJoinRoomState((state) => state.setUsername);

  const onContinue = () => {
    if (username.length === 0) {
      return;
    }
    router.replace("set-powerup");
  };

  return (
    <ScreenContainer>
      <View style={styles.main}>
        <TextInput
          onChangeText={setUsername}
          value={username}
          mode="outlined"
          label="Nome"
        />
      </View>
      <Footer>
        <Button mode="contained" onPress={onContinue}>
          Continuar
        </Button>
      </Footer>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
