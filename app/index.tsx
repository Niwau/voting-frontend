import { router } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Footer } from "../src/components/Footer";
import { ScreenContainer } from "../src/components/ScreenContainer";
import { useJoinRoomState } from "../src/store";
import { verifyRoomRequest } from "../src/api/api";

export default function App() {
  const code = useJoinRoomState((state) => state.code);
  const setCode = useJoinRoomState((state) => state.setCode);

  const createRoom = () => {
    router.push("/create-room");
  };

  const joinRoom = () => {
    if (code.length === 0) {
      return;
    }
    verifyRoomRequest(code)
      .then(() => {
        router.push("set-username");
      })
      .catch(() => {
        Alert.alert(
          "Sala não encontrada",
          "Verifique o código e tente novamente"
        );
      });
  };

  return (
    <ScreenContainer>
      <View style={styles.main}>
        <TextInput onChangeText={setCode} mode="outlined" label="Código" />
      </View>
      <Footer>
        <Button onPress={createRoom}>Criar Sala</Button>
        <Button mode="contained" onPress={joinRoom}>
          Entrar
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
