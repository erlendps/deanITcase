import { StyleSheet, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { useEffect, useState } from "react"
import { GuessEmployee } from "../components/GuessEmployee";

export const GameScreen = ({
  navigation,
  route: {},
}: RootStackScreenProps<"Game">) => {
  const { employees} = useFetchEmployees();

  const [employee, setEmployee] = useState({
    name: "undefined",
    gender: "undefined",
    image: "",
    originalUrl: ""
  });

  useEffect(() => {
    setRandomEmployee()
  }, [employees])

  const setRandomEmployee = () => {
    if (!employees) return
    setEmployee(employees[Math.floor( Math.random()*employees.length)])
  }

  return employee ? <View></View> : (
    <GuessEmployee employee={employee} onCorrect={setRandomEmployee}></GuessEmployee>
  );
};

const styles = StyleSheet.create({
});
