import React from "react";
import { StyleSheet, View } from "react-native";

interface ScreenContainerProps {
  children: React.ReactNode;
}

export const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    gap: 24,
  },
});
