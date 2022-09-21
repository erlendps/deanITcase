import { StyleSheet, Text } from "react-native";
import { TALK_FONT_SIZE } from "../constants/Layout";
import Color from "../constants/Colors"

export const Score = (props: { score: number }) => {
  return (
      <Text style={styles.score}>current score: {props.score.toString()}</Text>
  );
};

const styles = StyleSheet.create({
  score: {
    textAlign: "center",
    fontSize: TALK_FONT_SIZE,
    color: Color.accent,
    paddingTop: 20,
    margin: 10,
  },
});
