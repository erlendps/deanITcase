import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import { Text, View } from "./Themed";
import { Employee } from "../hooks/useFetchEmployees";
import { GuessInput } from "./GuessInput";
import { useEffect, useState } from "react";

export const GuessEmployee = (props: {
  employee: Employee;
  onCorrect: (scoreToAdd: number) => void;
  onWrong: () => void;
  onConsecutiveFail: () => void;
}) => {
  const [revealOrder, setRevealOrder] = useState([0]);
  const [hint, setHint] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [messages, setMessages] = useState([""]);

  const name = () => props.employee.name.split(" ")[0].toLowerCase();

  useEffect(() => {
    setRevealOrder(
      [...Array(name().length).keys()].sort(() => Math.random() - 0.5)
    );
    setHint("_".repeat(name().length));
    setAttempts(0);
    setMessages([]);
  }, [props.employee]);

  const calculateScore = () => {
    const guessLength = name().length - attempts;
    let score = guessLength * 100 + 300;
    score += name().length * 20;
    return score;
  };

  const onInput = (guess: string) => {
    if (guess.toLowerCase() == name()) {
      setHint(name());
      props.onCorrect(calculateScore());
    }
    const index = revealOrder[attempts];
    setHint((hint) => {
      return hint.slice(0, index) + name()[index] + hint.slice(index + 1);
    });
    props.onWrong();
    setAttempts((attempts) => attempts + 1);
  };

  const onMessage = (msg: string) => {
    setMessages((messages) => [msg, ...messages]);
    props.onConsecutiveFail();
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.image}
        key={name()}
        source={{ uri: props.employee.image }}
        resizeMode="cover"
      >
        <GuessInput
          onInput={onInput}
          secret={name()}
          hint={hint}
          onMessage={onMessage}
        />
      </ImageBackground>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    width: Dimensions.get("window").width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262626",
  },
  image: {
    elevation: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  message: {
    color: "green",
  },
});
