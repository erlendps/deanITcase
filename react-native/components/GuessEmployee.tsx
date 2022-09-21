import {
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Text, View } from "./Themed";
import { Employee } from "../hooks/useFetchEmployees";
import { GuessInput } from "./GuessInput";
import { useEffect, useRef, useState } from "react";
import { isName } from "../hooks/names";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { AppButton } from "./AppButton";
import { TALK_FONT_SIZE } from "../constants/Layout";

export const GuessEmployee = (props: {
  employee: Employee;
  onCorrect: (scoreToAdd: number) => void;
  onWrong: () => void;
  onConsecutiveFail: (hint: string) => void;
  onReGuess: (guess: string) => void;
}) => {
  const [revealOrder, setRevealOrder] = useState([0]);
  const [hint, setHint] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hasGuessedCurrent, setHasGuessedCurrent] = useState(false)

  const name = () => props.employee.name.split(" ")[0].toLowerCase();
  
  useEffect(() => {
    setRevealOrder(
      [...Array(name().length).keys()].sort(() => Math.random() - 0.5)
    );
    setHint("_".repeat(name().length));
    setAttempts(0);
    setHasGuessedCurrent(false)
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
      setAttempts((attempts) => attempts + 1);
      setHint(name());
      setHasGuessedCurrent(true)
      return true;
    }
    // Wrong guess
    if (!isName(guess)) {
      onMessage(`${guess} is not a name!`);
      return false;
    }
    props.onWrong();
    // Wrong guess, but a valid name
    const index = revealOrder[attempts];
    setHint((hint) => {
      return hint.slice(0, index) + name()[index] + hint.slice(index + 1);
    });
    setAttempts((attempts) => attempts + 1);
    return true;
  };

  const onMessage = (msg: string) => {
    props.onConsecutiveFail(hint);
  };

  const onReGuess = (guess: string) => {
    props.onReGuess(guess);
  };

  const onNext = () => {
    props.onCorrect(calculateScore());
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
          colors={["transparent", Colors.dark.background]}
          locations={[0.6, 1]}
          style={{ flex: 1 }}
        />

        <GuessInput
          onInput={onInput}
          secret={name()}
          hint={hint}
          onMessage={onMessage}
          onReGuess={onReGuess}
        />
      </ImageBackground>

      {hasGuessedCurrent
      ? <View>
          <Text style={styles.winText}>{attempts} {attempts == 1 ? 'guess' : 'guesses'}</Text>
          <Text style={styles.winText}>+ {calculateScore()} points!</Text>
          {/* @ts-ignore */}
          <AppButton onPress={onNext} title="Next"/>
        </View>
      : <View></View>}
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
  winText: {
    padding: 8,
    textAlign: 'center',
    fontSize: TALK_FONT_SIZE,
  },
});
