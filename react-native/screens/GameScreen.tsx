import { StyleSheet, Dimensions } from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { useEffect, useState } from "react";
import { GuessEmployee } from "../components/GuessEmployee";
import { Score } from "../components/Score";
import { ItNerd } from "../components/ITnerdAnimation";
import { getFiveNames } from "../hooks/names";
import {
  consecutiveTexts,
  correctTexts,
  invalidTexts,
  wrongTexts,
} from "../constants/Text";
import { playAlarmSound, playApplause, playWhatsApp } from "../utils/Sounds";

export const GameScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"GameScreen">) => {
  const { employees } = useFetchEmployees();

  const [employee, setEmployee] = useState<Employee | null>(null);

  const [score, setScore] = useState(0);
  const employeesPerRound = 5;
  const [employeesLeft, setEmployeesLeft] = useState(employeesPerRound);
  const [failedOnThisEmp, setFailedOnThisEmp] = useState(0);
  const [consecutiveNotAName, setConsecutiveNotAName] = useState(0);
  const [itManText, setItManText] = useState("");
  const [timer, setTimer] = useState(0);
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    setRandomEmployee();
  }, [employees]);

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    setTimer((prev) => prev + 1000);
  };

  const setRandomEmployee = () => {
    if (!employees) return;
    if (employeesLeft <= 0) {
      let s = score;
      s += Math.max(10 * (180 - timer / 1000), 0);
      navigation.navigate("Welcome", { score: score, time: timer });
    }

    setEmployeesLeft((count) => count - 1);
    const index = (route.params.group ?? 0) * 16;
    const employeeGroup = employees.slice(index, index + 16);
    setEmployee(
      employeeGroup[Math.floor(Math.random() * employeeGroup.length)]
    );
  };

  const setNewScore = (scoreToAdd: number) => {
    setScore((score) => score + scoreToAdd);
  };

  const handleCorrect = (scoreToAdd: number) => {
    setNewScore(scoreToAdd);
    setFailedOnThisEmp(0);
    setConsecutiveNotAName(0);
    setItManText(correctTexts[Math.floor(Math.random() * correctTexts.length)]);
    setCombo((oldCombo) => oldCombo + 1);
    playWhatsApp();
  };

  const handleNext = () => {
    setRandomEmployee();
  };

  const handleWrong = () => {
    setFailedOnThisEmp(failedOnThisEmp + 1);
    setConsecutiveNotAName(0);
    setItManText(wrongTexts[Math.floor(Math.random() * wrongTexts.length)]);
    setCombo(0);
    playAlarmSound();
  };

  const handleConsecutiveFail = (hint: string) => {
    let newValue = consecutiveNotAName + 1;
    if (newValue % 3 === 0) {
      setFailedOnThisEmp(failedOnThisEmp + 1);
      let newText =
        consecutiveTexts[Math.floor(Math.random() * consecutiveTexts.length)];
      getFiveNames(employee?.name.split(" ")[0].length ?? 0, hint).forEach(
        (name) => {
          newText += name + ", ";
        }
      );
      setItManText(newText.slice(0, newText.length - 2));
    } else {
      setItManText(
        invalidTexts[Math.floor(Math.random() * invalidTexts.length)]
      );
    }
    setConsecutiveNotAName(newValue);
    setCombo(0);
    playApplause();
  };

  const handleReGuess = (guess: string) => {
    setItManText(`Du har jo allerede gjettet ${guess}, finn på noe nytt!`);
  };

  return employee ? (
    <View style={styles.container}>
      <Score score={score} time={timer / 1000} />
      <ItNerd failed={failedOnThisEmp} text={itManText} />
      <GuessEmployee
        employee={employee as Employee}
        employeesLeftString={`${
          employeesPerRound - employeesLeft
        }/${employeesPerRound}`}
        combo={combo}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        onConsecutiveFail={handleConsecutiveFail}
        onReGuess={handleReGuess}
        onNext={handleNext}
      ></GuessEmployee>
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
  },
});
