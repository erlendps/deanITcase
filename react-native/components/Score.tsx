import { StyleSheet, Text } from "react-native";
import { FONT_SIZE } from "../constants/Layout";

export const Score = (props: { score: number }) => {
  return (
      <Text style={styles.score}>Score: {props.score}</Text>
  );
};

const styles = StyleSheet.create({
  score: {
    textAlign: "center",
    fontSize: FONT_SIZE,
    color: "#fff",
    paddingTop: 5,
    margin: 10,
  },
});
