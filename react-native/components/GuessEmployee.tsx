import { StyleSheet, Image, Dimensions } from "react-native";

import { Text, View } from "./Themed";
import { Employee } from "../hooks/useFetchEmployees";
import { GuessInput } from "./GuessInput";
import { useEffect, useState } from "react"

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

  const onInput = (guess: string) => {
    if (guess.toLowerCase() == name()) {
      setHint(name())
      props.onCorrect()
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
      <Text>Attempts: {attempts}</Text>
      <Text style={styles.hint}>{hint}</Text>
      <GuessInput onInput={onInput} secret={name()}></GuessInput>
    </View>
  );
};

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
    letterSpacing: 3,
    padding: 10
  }
});
