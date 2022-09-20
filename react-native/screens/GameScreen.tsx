import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { GuessInput } from "../components/GuessInput";
import { useEffect, useState } from "react"

export const GameScreen = ({
  navigation,
  route: {},
}: RootStackScreenProps<"Game">) => {
  const { employees, loading } = useFetchEmployees();
  const [revealOrder, setRevealOrder] = useState([0])
  const [hint, setHint] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [employee, setEmployee] = useState({
    name: "undefined",
    gender: "undefined",
    image: "",
    originalUrl: ""
  });

  const name = () => employee.name.split(" ")[0];

  useEffect(() => {
    if (!employees) return
    const empl = employees[0]
    setEmployee(empl)
    
    console.log(`The secret is ${empl.name}, with length ${empl.name.length} to be revealed order: ${revealOrder}`)
  }, [employees])

  useEffect(() => {
    setRevealOrder(
      [...Array(name().length).keys()].sort(() => Math.random() - 0.5))
    setHint('_'.repeat(name().length))
  }, [employee])

  
  const onInput = (guess: string) => {
    if (loading) return

    if (guess == name()) {
      setHint(name()) // You win
    }
    const index = revealOrder[attempts]
    setHint((hint) => {
      return hint.slice(0, index) + name()[index] + hint.slice(index + 1)
    })
    setAttempts((attempts) => attempts + 1)
  }

  return loading ? <View></View> : (
    <View style={styles.container}>
      <Image
        style={styles.image}
        key={name()}
        source={{ uri: employee.image }}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  hint: {
    letterSpacing: 3,
    padding: 10
  }
});
