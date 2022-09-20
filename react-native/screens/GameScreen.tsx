import { StyleSheet, Dimensions } from "react-native";
import { View } from "../components/Themed";
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

  const [employee, setEmployee] = useState<Employee>({
    name: "undefined",
    gender: "female",
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    originalUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
