import { ScreenContainer } from "../../src/components/ScreenContainer";
import { Header } from "../../src/components/Header";
import { Button, Text } from "react-native-paper";
import { PowerCard, PowerCardProps } from "../../src/components/PowerCard";
import { ScrollView, StyleSheet } from "react-native";
import { useJoinRoomState } from "../../src/store";
import { Powerup } from "../../src/types";
import { Footer } from "../../src/components/Footer";
import { joinRoomRequest } from "../../src/api/api";
import { router } from "expo-router";

export default function Page() {
  const powerup = useJoinRoomState((state) => state.powerup);
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
    joinRoomRequest({
      powerup,
      code,
      username,
    });
    router.push(`/room/${code}`);
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
    flex: 1,
    paddingBottom: 48,
    gap: 16,
    flexDirection: "row",
  },
});
