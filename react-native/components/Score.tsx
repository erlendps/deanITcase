import { StyleSheet, Text, View } from "react-native";

const FONT_SIZE = 24;

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
