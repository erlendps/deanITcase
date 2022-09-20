import {StyleSheet, Text, View} from "react-native";
import { ItNerd } from './ITnerdAnimation';

const FONT_SIZE = 24;

export const Score = (props: {score: number}) => {
  return (
    <View>
      <Text style={styles.score}>Your Score: {props.score}</Text>
      <View style={styles.absolute}>
        <ItNerd />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    elevation: 25,
    top: 50,
  },
  score: {
    textAlign: "center",
    fontSize: FONT_SIZE,
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