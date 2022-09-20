import { Button, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { AppButton } from "../components/AppButton";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { RootTabScreenProps } from "../types";

export const WelcomeScreen = ({
  navigation,
}: RootTabScreenProps<"Welcome">) => {
  return (
    <View style={styles.container}>
      <AppButton
        title={"Play Now!"}
        onPress={() => {}}
        buttonStyle={styles.playButton}
        textStyle={styles.textStyle}
      ></AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  playButton: {
    width: "60%",
    backgroundColor: "#f07200",
    padding: "1rem",
    borderRadius: 20,
  },
  textStyle: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    lineHeight: 32,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    minHeight: "100vh",
  },
});
