import {StyleSheet, TextInput, Text, View} from "react-native";

const FONT_SIZE = 24;

export const Score = (props: {score: number}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.score}>Your Score: {props.score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  score: {
    textAlign: "center",
    fontSize: FONT_SIZE,
    zIndex: 3,
    color: "#fff",
  },
});