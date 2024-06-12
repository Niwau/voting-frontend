import { Icon, Text, TouchableRipple, MD3Colors } from "react-native-paper";
import { StyleSheet, View, useWindowDimensions } from "react-native";

export interface PowerCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  isSelected?: boolean;
}

export const PowerCard = ({
  title,
  description,
  icon,
  onPress,
  isSelected = false,
}: PowerCardProps) => {
  const dimensions = useWindowDimensions();

  const backgroundColor = isSelected ? MD3Colors.primary40 : "#fff";
  const otherColors = isSelected ? "#fff" : MD3Colors.primary40;

  return (
    <TouchableRipple
      rippleColor="rgba(255, 255, 255, 0.32)"
      onPress={onPress}
      style={{
        ...styles.container,
        width: dimensions.width - 50,
        backgroundColor: backgroundColor,
      }}
    >
      <View style={styles.main}>
        <Text style={{ color: otherColors }}>{title}</Text>
        <Icon source={icon} size={128} color={otherColors} />
        <Text style={{ color: otherColors }}>{description}</Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    borderRadius: 8,
    borderColor: "#000",
    borderWidth: 1,
    marginRight: 8,
  },
  main: {
    alignItems: "center",
    gap: 16,
    justifyContent: "space-between",
    flex: 1,
    padding: 16,
  },
});
