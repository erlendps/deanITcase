import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { useFetchEmployees } from "../hooks/useFetchEmployees";

export const ModalScreen = ({
  navigation,
  route: {},
}: RootStackScreenProps<"Game">) => {
  const goBack = () => navigation.goBack();
  const employeeResult = useFetchEmployees();
  
  const employee = employeeResult.employees ? employeeResult.employees[0] : {
    name: "undefined",
    gender: "undefined",
    image: "",
    originalUrl: ""
  }

  return (
    <View style={styles.container}>
      {/* employee picture*/}
      <Image
        style={styles.image}
        key={employee.name}
        source={{ uri: employee.image }}
        resizeMode="cover"
      />

      {/*correct letters module*/}
      {/*guess module - this is where you type in letters*/}
      <Text>Hello game!</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {

  }
});
