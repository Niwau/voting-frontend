import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useJoinRoomState } from "../../src/store";
import { ScreenContainer } from "../../src/components/ScreenContainer";
import { Footer } from "../../src/components/Footer";
import { router } from "expo-router";
import { verifyUsernameRequest } from "../../src/api/api";

export default function Page() {
  const code = useJoinRoomState((state) => state.code);
  const username = useJoinRoomState((state) => state.username);
  const setUsername = useJoinRoomState((state) => state.setUsername);

  const onContinue = () => {
    if (username.length === 0) {
      return;
    }
    verifyUsernameRequest(username, code)
      .then(() => {
        Alert.alert("Nome já está em uso", "Escolha outro nome");
      })
      .catch(() => {
        router.push("set-powerup");
      });
  };

  return (
    <ScreenContainer>
      <View style={styles.main}>
        <TextInput onChangeText={setUsername} mode="outlined" label="Nome" />
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
    justifyContent: "flex-end",
  },
});
