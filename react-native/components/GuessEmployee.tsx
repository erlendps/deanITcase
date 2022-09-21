import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { Text, View } from "./Themed";
import { Employee } from "../hooks/useFetchEmployees";
import { GuessInput } from "./GuessInput";
import { useEffect, useRef, useState } from "react";
import { isName } from "../hooks/names";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { AppButton } from "./AppButton";
import { FONT_SIZE, TALK_FONT_SIZE } from "../constants/Layout";

export const GuessEmployee = (props: {
  employee: Employee;
  employeesLeftString: string;
  combo: number;
  onCorrect: (scoreToAdd: number) => void;
  onWrong: () => void;
  onConsecutiveFail: (hint: string) => void;
  onReGuess: (guess: string) => void;
  onNext: () => void;
}) => {
  const [revealOrder, setRevealOrder] = useState([0]);
  const [hint, setHint] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  const name = () => props.employee.name.split(" ")[0].toLowerCase();

  useEffect(() => {
    setHint("_".repeat(name().length));
    setAttempts(0);
    setHintCount(0);
    setRevealOrder(
      [...Array(name().length).keys()].sort(() => Math.random() - 0.5)
    );
  }, [props.employee]);

  useEffect(() => {
    if (props.combo < 2 || props.combo > 3) return;

    // flash combo
    setShowCombo(true);

    Animated.loop(
      Animated.timing(animValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      { iterations: 10 }
    ).start(() => {
      setShowCombo(false);
    });
  }, [props.combo]);

  useEffect(() => {
    if (hintCount == 0 && revealOrder.length > 0 && hint.length > 0) {
      addToHint();
    }
  }, [revealOrder, hintCount, hint]);

  const calculateScore = () => {
    const guessLength = name().length - hintCount;
    let score = guessLength * 100 + 300;
    score += name().length * 20;
    return (props.combo == 0 ? 1 : props.combo) * score;
  };

  const addToHint = () => {
    let _hintCount = hintCount;
    let _hint = hint;
    for (let i = 0; i < Math.ceil((name().length - _hintCount - 1) / 4); i++) {
      if (_hintCount >= revealOrder.length) break;
      const index = revealOrder[_hintCount];
      _hint = _hint.slice(0, index) + name()[index] + _hint.slice(index + 1);
      _hintCount += 1;
    }
    setHintCount(() => _hintCount);
    setHint(() => _hint);
  };

  const onInput = (guess: string) => {
    if (guess.length !== name().length) return false;
    if (guess.toLowerCase() == name()) {
      // Correct guess
      setAttempts((attempts) => attempts + 1);
      setHint(name());
      props.onCorrect(calculateScore());
      return true;
    }
    // Wrong guess
    if (!isName(guess)) {
      onMessage(`${guess} er ikke et navn!`);
      return false;
    }
    props.onWrong();
    // Wrong guess, but a valid name
    addToHint();
    setAttempts((attempts) => attempts + 1);
    return true;
  };

  const onMessage = (msg: string) => {
    props.onConsecutiveFail(hint);
  };

  const onReGuess = (guess: string) => {
    props.onReGuess(guess);
  };

  const hasGuessedCurrent = () => hint === name();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        key={name()}
        source={{ uri: props.employee.image }}
        resizeMode="cover"
      >
        <Text style={styles.employeesLeft}>{props.employeesLeftString}</Text>
        <Animated.Text
          style={{
            opacity: animValue,
            color: Colors.accent,
            fontSize: FONT_SIZE,
            textShadowColor: "black",
            textShadowRadius: 5,
            position: "absolute",
            left: Dimensions.get("window").width / 2 - FONT_SIZE * 3,
            top: Dimensions.get("window").width / 2 - FONT_SIZE,
            fontFamily: "space-mono",
          }}
        >
          {showCombo ? props.combo + "X COMBO!!" : ""}
        </Animated.Text>
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

      {hasGuessedCurrent() ? (
        <View>
          <Text style={styles.winText}>{attempts} gjett</Text>
          <Text style={styles.winText}>+ {calculateScore()} poeng!</Text>
          <AppButton onPress={props.onNext} title="Neste" />
        </View>
      ) : (
        <View></View>
      )}
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
    textAlign: "center",
    fontSize: TALK_FONT_SIZE,
  },
  employeesLeft: {
    color: Colors.accent,
    textShadowColor: "black",
    textShadowRadius: 5,
    position: "absolute",
    right: 0,
    margin: 10,
    fontFamily: "space-mono",
    fontSize: FONT_SIZE,
  },
});
