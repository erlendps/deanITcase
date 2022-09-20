import {StyleSheet, TextInput, Text, View, Image} from "react-native";
import { ItNerd } from './ITnerdAnimation';

const FONT_SIZE = 24;

export const Score = (props: {score: number}) => {
  return (
    <View>
      <Text style={styles.score}>Your Score: {props.score}</Text>
      <ItNerd />
    </View>
  )
}

const styles = StyleSheet.create({
  score: {
    textAlign: "center",
    fontSize: FONT_SIZE,
    zIndex: 3,
    color: "#fff",
    paddingTop: 5,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    transform: [{ rotate: '90deg'}],
  }
});