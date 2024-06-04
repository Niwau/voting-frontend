import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ScreenContainer } from "../../src/components/ScreenContainer";
import { useEffect, useState } from "react";
import { socket } from "../../src/api/api";
import { Room } from "../../src/types";
import { Header } from "../../src/components/Header";

export default function Page() {
  const { code } = useLocalSearchParams();

  const [room, setRoom] = useState<Room>({
    code: code as string,
    options: [],
    theme: "",
    users: [],
  });

  useEffect(() => {
    socket.emit("room:get", code as string);
    socket.on("room:update", (room: Room) => {
      setRoom(room);
    });
  }, []);

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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {},
});
