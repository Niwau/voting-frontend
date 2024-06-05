import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ScreenContainer } from "../../src/components/ScreenContainer";
import { useEffect, useState } from "react";
import { socket } from "../../src/api/api";
import { Room } from "../../src/types";
import { Header } from "../../src/components/Header";
import { Footer } from "../../src/components/Footer";

export default function Page() {
  const { code } = useLocalSearchParams();
  const navigation = useNavigation();

  const [room, setRoom] = useState<Room>({
    code: code as string,
    options: [],
    theme: "",
    users: [],
    owner: "",
  });

  useEffect(() => {
    socket.emit("room:get", code as string);
    socket.on("room:update", (room) => {
      setRoom(room);
    });
    navigation.addListener("beforeRemove", () => {
      socket.emit("room:leave", code as string);
    });
  }, []);

  const isRoomOwner = room.owner === socket.id;

  return (
    <ScreenContainer>
      <Header>
        <Text variant="titleLarge">Código: {code}</Text>
      </Header>
      <View style={styles.main}>
        <Text>Participantes ({room.users.length})</Text>
        <View>
          {room.users.map((user, index) => (
            <Text key={index}>{user.username}</Text>
          ))}
        </View>
      </View>
      <Footer>
        <Button mode="contained">
          {isRoomOwner ? "Iniciar" : "Aguardando início"}
        </Button>
      </Footer>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {},
});
