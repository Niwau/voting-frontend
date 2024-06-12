import { StyleSheet, View } from "react-native";

interface FooterProps {
  children: React.ReactNode;
}

export const Footer = ({ children }: FooterProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    gap: 8,
  },
});
