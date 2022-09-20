import { StyleSheet, Image, Dimensions } from "react-native";

import { Text, View } from "./Themed";
import { Employee } from "../hooks/useFetchEmployees";
import { GuessInput } from "./GuessInput";
import { useEffect, useState } from "react"
import { withTheme } from "@emotion/react";
import { padding } from "@mui/system";
const FONT_SIZE = 48;
export const GuessEmployee = (props: {employee: Employee, onCorrect: () => void}) => {
  const [revealOrder, setRevealOrder] = useState([0])
  const [hint, setHint] = useState('')
  const [attempts, setAttempts] = useState(0)

  const name = () => props.employee.name.split(" ")[0].toLowerCase();

  useEffect(() => {
    setRevealOrder(
      [...Array(name().length).keys()].sort(() => Math.random() - 0.5))
    setHint('_'.repeat(name().length))
    setAttempts(0);
  }, [props.employee])

  const calculateScore = () => {
    const guessLength = name().length - attempts;
    let score = guessLength * 100 + 300;
    score += name().length * 20;
    return score;
  }

  const onInput = (guess: string) => {
    if (guess.toLowerCase() == name()) {
      setHint(name());
      props.onCorrect();
    }
    const index = revealOrder[attempts]
    setHint((hint) => {
      return hint.slice(0, index) + name()[index] + hint.slice(index + 1)
    })
    setAttempts((attempts) => attempts + 1)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        key={name()}
        source={{ uri: props.employee.image }}
        resizeMode="cover"
      />
      <Text style={styles.hint}>{hint}</Text>

      <Text>Attempts: {attempts}</Text>
      
      <GuessInput onInput={onInput} secret={name()} hint={hint}> </GuessInput>
    </View>
  );
};

const HINT_PADDING = 10;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  hint: {
    letterSpacing: 10,
    padding: HINT_PADDING,
    marginTop: -1*FONT_SIZE - 2*HINT_PADDING,
    zIndex: 3,
    fontSize: FONT_SIZE,
    fontFamily: 'courier',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
});
