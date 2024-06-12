import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, TouchableRipple } from "react-native-paper";
import { ScreenContainer } from "../../src/components/ScreenContainer";
import { useEffect, useState } from "react";
import { socket } from "../../src/api/api";
import { Powerup, Room } from "../../src/types";
import { Header } from "../../src/components/Header";
import { Footer } from "../../src/components/Footer";
import { useJoinRoomState } from "../../src/store";
import { Option } from "../../src/components/Option";
import { Option as OptionType } from "../../src/types";

export default function Page() {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [isUsingPowerUp, setIsUsingPowerUp] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const { code } = useLocalSearchParams();
  const navigation = useNavigation();

  const [room, setRoom] = useState<Room>({
    code: code as string,
    options: [],
    theme: "",
    users: [],
    status: "waiting",
  });

  const powerup = useJoinRoomState((state) => state.powerup);

  useEffect(() => {
    socket.emit("room:get", code as string);

    socket.on("room:update", (room) => {
      setRoom(room);
    });

    navigation.addListener("beforeRemove", () => {
      socket.emit("room:leave", code as string);
    });
  }, []);

  const user = room.users.find((user) => user.socket === socket.id);
  const isRoomOwner = user?.isOwner;
  const started = room.status === "voting";

  const startVoting = () => {
    socket.emit("room:start", code as string);
  };

  const stopVoting = () => {
    socket.emit("room:stop", code as string);
  };

  const usePowerUp = () => {
    setIsUsingPowerUp((prev) => !prev);
  };

  const vote = () => {
    if (selectedOption) {
      socket.emit("vote", {
        code: code as string,
        option: selectedOption,
        powerup: isUsingPowerUp ? powerup : undefined,
      });
      setHasVoted(true);
    }
  };

  const totalVotes = room.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  const selectOption = (optionId: number) => {
    if (hasVoted) {
      return;
    }
    setSelectedOption(optionId);
  };

  const powerUpText =
    powerup === Powerup.DoubleVote ? "Voto Duplo" : "Revelar Votos";

  const getVoteInPercentage = (votes: number) => {
    return (votes / totalVotes) * 100 + "%";
  };

  const sortOptionsByVotes = (a: OptionType, b: OptionType) =>
    b.votes - a.votes;

  if (started && !isRoomOwner) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Header>
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              {room.theme}
            </Text>
          </Header>
          <View>
            {room.options.map((option, index) => (
              <Option
                votes={
                  isUsingPowerUp && powerup === Powerup.RevealVotes
                    ? option.votes
                    : undefined
                }
                key={index}
                label={option.value}
                isSelected={selectedOption === option.id}
                onPress={() => selectOption(option.id)}
              />
            ))}
          </View>
        </View>
        <Footer>
          <TouchableRipple onPress={usePowerUp}>
            <View style={styles.powerup}>
              <Text>{powerUpText}</Text>
              <Checkbox status={isUsingPowerUp ? "checked" : "unchecked"} />
            </View>
          </TouchableRipple>
          <Button
            mode="contained"
            onPress={vote}
            disabled={selectedOption == undefined || hasVoted}
          >
            Confirmar Voto
          </Button>
        </Footer>
      </ScreenContainer>
    );
  }

  if (started && isRoomOwner) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Header>
            <View style={styles.header}>
              <Text variant="titleMedium">{room.theme}</Text>
              <Text variant="titleLarge">
                {room.users.length - 1} Participantes
              </Text>
            </View>
          </Header>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text style={{ fontSize: 150 }}>{totalVotes}</Text>
            <Text variant="titleLarge">Votos Computados</Text>
          </View>
        </View>
        <Footer>
          <Button mode="contained" onPress={stopVoting}>
            Fechar Votação
          </Button>
        </Footer>
      </ScreenContainer>
    );
  }

  if (room.status == "stopped") {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Header>
            <View style={styles.header}>
              <Text variant="titleLarge">Votação Encerrada {totalVotes}</Text>
              <Text variant="titleMedium">{room.theme}</Text>
            </View>
          </Header>
          <View style={{ gap: 16 }}>
            {room.options.sort(sortOptionsByVotes).map((option, index) => (
              <View
                key={index}
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text variant={index == 0 ? "titleLarge" : "bodyLarge"}>
                  {option.value}
                </Text>
                <Text variant={index == 0 ? "titleLarge" : "bodyLarge"}>
                  {getVoteInPercentage(option.votes)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Footer>
          <Button mode="contained" onPress={() => router.replace("/")}>
            Voltar
          </Button>
        </Footer>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Header>
          <View style={styles.header}>
            <Text variant="titleLarge">Código: {code}</Text>
            <Text variant="titleMedium">{room.theme}</Text>
          </View>
        </Header>
        <View>
          <Text>Participantes ({room.users.length - 1})</Text>
          <View>
            {room.users
              .filter((user) => !user.isOwner)
              .map((user, index) => (
                <Text key={index}>{user.username}</Text>
              ))}
          </View>
        </View>
      </View>
      <Footer>
        <Button mode="contained" disabled={!isRoomOwner} onPress={startVoting}>
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
  header: {
    alignItems: "center",
    gap: 4,
  },
  powerup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
