import { StyleSheet, Image, Dimensions } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { useEffect, useState } from "react";
import { GuessEmployee } from "../components/GuessEmployee";
import { Score } from "../components/Score";
import { ItNerd } from "../components/ITnerdAnimation";

export const GameScreen = ({
  navigation,
  route: {},
}: RootStackScreenProps<"GameScreen">) => {
  const { employees } = useFetchEmployees();

  const [employee, setEmployee] = useState({
    name: "undefined",
    gender: "undefined",
    image: "",
    originalUrl: "",
  });

  const [score, setScore] = useState(0);
  const [failedOnThisEmp, setFailedOnThisEmp] = useState(0);
  const [consecutiveNotAName, setConsecutiveNotAName] = useState(0);

  useEffect(() => {
    setRandomEmployee();
  }, [employees]);

  const setRandomEmployee = () => {
    if (!employees) return;
    setEmployee(employees[Math.floor(Math.random() * employees.length)]);
  };

  const setNewScore = (scoreToAdd: number) => {
    setScore(score + scoreToAdd);
  };

  const handleCorrect = (scoreToAdd: number) => {
    setNewScore(scoreToAdd);
    setFailedOnThisEmp(0);
    setConsecutiveNotAName(0);
    setRandomEmployee();
  };

  const handleWrong = () => {
    setFailedOnThisEmp(failedOnThisEmp + 1);
    setConsecutiveNotAName(0);
  };

  const handleConsecutiveFail = () => {
    setConsecutiveNotAName(consecutiveNotAName + 1);
    if (consecutiveNotAName === 5) {
      setFailedOnThisEmp(failedOnThisEmp + 1);
    }
  };

  return employee ? (
    <View style={styles.container}>
      <Score score={score} />
      <ItNerd failed={failedOnThisEmp} />
      <GuessEmployee
        employee={employee as Employee}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        onConsecutiveFail={handleConsecutiveFail}
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
