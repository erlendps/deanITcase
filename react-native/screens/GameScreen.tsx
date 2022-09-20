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

  useEffect(() => {
    setRandomEmployee()
  }, [employees])

  const setRandomEmployee = () => {
    if (!employees) return
    setEmployee(employees[Math.floor( Math.random()*employees.length)])
  }

  return employee ? <GuessEmployee employee={employee as Employee} onCorrect={setRandomEmployee}></GuessEmployee> 
  :<View></View>
};

const styles = StyleSheet.create({
});
