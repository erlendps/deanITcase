import { StyleSheet, Text, View } from "react-native";
import { TALK_FONT_SIZE } from "../constants/Layout";
import Color from "../constants/Colors"

export const Score = (props: { score: number, time: number }) => {

  return (
    <View style={styles.score}>
      <View style={styles.timer}><Text style={styles.text}>{props.time.toString()}s</Text></View>
      <Text style={styles.text}>Deane poeng: {props.score.toString()}</Text>
    </View>
  );
};

'1'
const styles = StyleSheet.create({
  score: {
    textAlign: "center",
    paddingTop: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: TALK_FONT_SIZE,
    color: Color.accent,
    fontFamily: 'space-mono',
  },
  timer: {
    // backgroundColor: 'rgba(255, 255, 255, 0.85)',
    // width: 60,
    // height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 40,
    marginRight: 20,
  }

});
