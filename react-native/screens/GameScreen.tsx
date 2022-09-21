import { StyleSheet, Dimensions } from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { useEffect, useState } from "react";
import { GuessEmployee } from "../components/GuessEmployee";
import { Score } from "../components/Score";
import { ItNerd } from "../components/ITnerdAnimation";
import { getFiveNames } from "../hooks/names";
import {consecutiveTexts, correctTexts, invalidTexts, wrongTexts} from "../constants/Text"

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
  const [employeesLeft, setEmployeesLeft] = useState(4);
  const [failedOnThisEmp, setFailedOnThisEmp] = useState(0);
  const [consecutiveNotAName, setConsecutiveNotAName] = useState(0);
  const [itManText, setItManText] = useState("");

  useEffect(() => {
    setRandomEmployee();
  }, [employees]);

  const setRandomEmployee = () => {
    if (!employees) return;
    if (employeesLeft <= 1) navigation.navigate('Welcome')
    setEmployeesLeft((count) => count - 1)
    setEmployee(employees[Math.floor(Math.random() * employees.length)]);
  };

  const setNewScore = (scoreToAdd: number) => {
    setScore((score) => score + scoreToAdd);
  };

  const handleCorrect = (scoreToAdd: number) => {
    setNewScore(scoreToAdd);
    setFailedOnThisEmp(0);
    setConsecutiveNotAName(0);
    setRandomEmployee();
    setItManText(correctTexts[Math.floor(Math.random()*correctTexts.length)]);
  };

  const handleWrong = () => {
    setFailedOnThisEmp(failedOnThisEmp + 1);
    setConsecutiveNotAName(0);
    setItManText(wrongTexts[Math.floor(Math.random()*wrongTexts.length)]);
  };

  const handleConsecutiveFail = (hint: string) => {
    let newValue = consecutiveNotAName + 1
    if (newValue % 5 === 0) {
      setFailedOnThisEmp(failedOnThisEmp + 1);
      let newText = consecutiveTexts[Math.floor(Math.random()*consecutiveTexts.length)] 
      getFiveNames(employee.name.split(" ")[0].length, hint).forEach(name => {
        newText += name + ", ";
      })
      setItManText(newText.slice(0, newText.length - 2));
    } else {
      setItManText(invalidTexts[Math.floor(Math.random()*invalidTexts.length)])
    }
    setConsecutiveNotAName(newValue);
  };

  const handleReGuess = (guess: string) => {
    setItManText(`Du har jo allerede gjettet ${guess}, finn på noe nytt!`);
  }

  return employee ? (
    <View style={styles.container}>
      <Score score={score} />
      <ItNerd failed={failedOnThisEmp} text={itManText}/>
      <GuessEmployee
        employee={employee as Employee}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        onConsecutiveFail={handleConsecutiveFail}
        onReGuess={handleReGuess}
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
