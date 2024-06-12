import { ScreenContainer } from "../../src/components/ScreenContainer";
import { Header } from "../../src/components/Header";
import { Button, Text } from "react-native-paper";
import { PowerCard, PowerCardProps } from "../../src/components/PowerCard";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { useJoinRoomState } from "../../src/store";
import { Powerup } from "../../src/types";
import { Footer } from "../../src/components/Footer";
import { router } from "expo-router";
import { socket } from "../../src/api/api";

export default function Page() {
  const powerup = useJoinRoomState((state) => state.powerup) as Powerup;
  const setPowerup = useJoinRoomState((state) => state.setPowerup);

  const code = useJoinRoomState((state) => state.code);
  const username = useJoinRoomState((state) => state.username);

  const powerups: PowerCardProps[] = [
    {
      title: "Voto Duplo",
      description: "Seu voto vale por dois",
      icon: "chevron-double-up",
      onPress: () => setPowerup(Powerup.DoubleVote),
      isSelected: powerup === Powerup.DoubleVote,
    },
    {
      title: "Revelar Votos",
      description: "Todos os votos são revelados",
      icon: "eye",
      onPress: () => setPowerup(Powerup.RevealVotes),
      isSelected: powerup === Powerup.RevealVotes,
    },
  ];

  const onContinue = () => {
    socket.emit("room:join", { code, username, powerup }, (response) => {
      if (!response.success) {
        Alert.alert("Erro", response.message);
        return;
      }
      router.replace(`/room/${code}`);
    });
  };

  return (
    <ScreenContainer>
      <Header>
        <Text variant="titleLarge">Selecione um PowerUp</Text>
      </Header>
      <ScrollView style={styles.main} horizontal>
        {powerups.map((powerup, index) => (
          <PowerCard key={index} {...powerup} />
        ))}
      </ScrollView>
      <Footer>
        <Button mode="contained" disabled={!powerup} onPress={onContinue}>
          Continuar
        </Button>
      </Footer>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "70%",
    gap: 16,
    flexDirection: "row",
  },
});
