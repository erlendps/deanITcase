import {StyleSheet, TextInput, Text, View} from "react-native";

const FONT_SIZE = 48

export const Score = (props: {score: number}) => {
  return (
    <View>
      <Text>Your Score: {props.score}</Text>
    </View>
  )
}