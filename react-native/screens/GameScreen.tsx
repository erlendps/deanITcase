import { StyleSheet, Dimensions } from "react-native";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { useEffect, useState } from "react"
import { GuessEmployee } from "../components/GuessEmployee";
import { Score } from "../components/Score";

export const GameScreen = ({
  navigation,
  route: {},
}: RootStackScreenProps<"GameScreen">) => {
  const { employees} = useFetchEmployees();

  const [employee, setEmployee] = useState<Employee>({
    name: "undefined",
    gender: "male",
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    originalUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  });

  const [score, setScore] = useState(0);

  useEffect(() => {
    setRandomEmployee()
  }, [employees])

  const setRandomEmployee = () => {
    if (!employees) return
    setEmployee(employees[Math.floor( Math.random()*employees.length)])
  }

  const setNewScore = (scoreToAdd: number) => {
    setScore(score + scoreToAdd);
  }

  const handleCorrect = (scoreToAdd: number) => {
    setNewScore(scoreToAdd);
    setRandomEmployee();
  }

  return employee ? (
    <View style={styles.container}>
      <Score score={score}/> 
      <GuessEmployee employee={employee} onCorrect={handleCorrect}/>
    </View>
  )
  : <View></View>
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
  }
});
