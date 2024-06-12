import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

interface OptionProps {
  label: string;
  onPress: () => void;
  isSelected: boolean;
  votes?: number;
}

export const Option = ({ label, onPress, isSelected, votes }: OptionProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text>{label}</Text>
        <View style={styles.votes}>
          <Text>{votes}</Text>
          <RadioButton
            onPress={onPress}
            value="checked"
            status={isSelected ? "checked" : "unchecked"}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  votes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
