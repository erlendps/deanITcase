import { StyleSheet, Text } from "react-native";
import { FONT_SIZE } from "../constants/Layout";
import Color from "../constants/Colors"

export const Score = (props: { score: number }) => {
  return (
      <Text style={styles.score}>Score: {props.score.toString()}</Text>
  );
};

const styles = StyleSheet.create({
  score: {
    textAlign: "center",
    fontSize: FONT_SIZE,
    color: Color.accent,
    paddingTop: 5,
    margin: 10,
  },
});
