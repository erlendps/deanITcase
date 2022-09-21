import { Dimensions, StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import { AppButton } from "../components/AppButton";
import { RootStackScreenProps } from "../types";
import { TALK_FONT_SIZE } from "../constants/Layout";
import { useEffect, useState } from "react";
import Colors from "../constants/Colors";

export const WelcomeScreen = ({
  navigation, route
}: RootStackScreenProps<"Welcome">) => {

  const handlePress = () => {
    navigation.navigate('GroupScreen', {});
  }

  const [highscores, setHighscores] = useState<number[]>([]);
  const addToHighScoreList = (newScore: number) => {
    const hs = [...highscores];
    hs.push(newScore);
    hs.sort((a, b) => Number(b) - Number(a));
    setHighscores(hs);
  }

  const [lastTime, setLastTime] = useState<number>(-1);
  
  useEffect(() => {
    if (route.params?.score) addToHighScoreList(route.params.score);
    if (route.params?.time) setLastTime(route.params.time / 1000);
  }, [route.params])

  const textStyle = (v: number) => StyleSheet.flatten([styles.text, {color: v == route.params?.score ? Colors.accent : 'white'}])

  return (
    <View style={styles.container}>
      <AppButton
        title={highscores.length ? "Spill igjen!" : "Spill!"}
        onPress={handlePress}
      ></AppButton>
      <View style={styles.highscore}>
        {lastTime > 0 ? <Text style={styles.text}>Du fullførte på {lastTime} sekunder (+{Math.max(10*(180-lastTime), 0)} poeng)</Text> : <></>}
        
        <Text style={styles.textBold}>Poengtavle</Text>

        {highscores.length ? highscores.slice(0, Math.min(5, highscores.length)).map(
          (v, i) => <Text style={textStyle(v)}>{(i+1).toString() + ". " + v.toString()}</Text>
          ) : <Text style={styles.text}>Avventer spilling.</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    minHeight: Dimensions.get("window").height,
  },
  text : {
    fontSize: TALK_FONT_SIZE,
    fontFamily: 'space-mono',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'normal',
  },
  textBold : {
    fontSize: TALK_FONT_SIZE,
    fontFamily: 'space-mono',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  highscore : {
    margin: 20
  }
});
