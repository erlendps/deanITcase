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
import { isName } from "../hooks/names";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors'

export const GuessEmployee = (props: {
  employee: Employee;
  onCorrect: (scoreToAdd: number) => void;
  onWrong: () => void;
  onConsecutiveFail: (hint: string) => void;
  onReguess: (guess: string) => void;
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
      // Correct guess
      setHint(name());
      props.onCorrect(calculateScore());
      return true
    }
    // Wrong guess
    if (!isName(guess)) {
      onMessage(`${guess} is not a name!`)
      return false
    }
    props.onWrong();
    // Wrong guess, but a valid name
    const index = revealOrder[attempts];
    setHint((hint) => {
      return hint.slice(0, index) + name()[index] + hint.slice(index + 1);
    });
    setAttempts((attempts) => attempts + 1);
    return false
  };

  const onMessage = (msg: string) => {
    setMessages((messages) => [msg, ...messages]);
    props.onConsecutiveFail(hint);
  };

  const onReguess = (guess: string) => {
    props.onReguess(guess);
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.image}
        key={name()}
        source={{ uri: props.employee.image }}
        resizeMode="cover"
      >
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', Colors.dark.background]}
          locations={[0.6, 1]}
          style={{flex: 1}}
        />
        
        <GuessInput
          onInput={onInput}
          secret={name()}
          hint={hint}
          onMessage={onMessage}
          onReguess={onReguess}
        />
      </ImageBackground>
      {/*<FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
        ></FlatList>*/}
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
    height: Dimensions.get("window").width, // TODO
  },
  message: {
    color: "green",
  },
});
