import { StyleSheet, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { useEffect, useState } from "react"
import { GuessEmployee } from "../components/GuessEmployee";

export const GameScreen = ({
  navigation,
  route: {},
}: RootStackScreenProps<"GameScreen">) => {
  const { employees} = useFetchEmployees();

  const [employee, setEmployee] = useState({
    name: "undefined",
    gender: "undefined",
    image: "",
    originalUrl: ""
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

  const handleCorrect = () => {
    setNewScore(100);
    setRandomEmployee();
  }

  return employee ? <GuessEmployee employee={employee as Employee} onCorrect={handleCorrect}></GuessEmployee> 
  :<View></View>
};

const styles = StyleSheet.create({
});
