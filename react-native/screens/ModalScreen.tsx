import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export const ModalScreen = ({
  navigation,
  route: {
    params: { employee },
  },
}: RootStackScreenProps<"Modal">) => {
  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text>{employee.name}</Text>

      <Button title="Tilbake" onPress={goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
