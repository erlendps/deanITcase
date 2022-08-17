import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { useFetchEmployees } from "../hooks/useFetchEmployees";

export default function TabTwoScreen() {
  const employeeResult = useFetchEmployees();

  return (
    <ScrollView>
      {employeeResult.error ? (
        <Text style={styles.title}>{employeeResult.error}</Text>
      ) : employeeResult.loading ? (
        <Text style={styles.title}>{"Laster..."}</Text>
      ) : (
        <View style={styles.name}>
          {employeeResult.employees?.map((employee, index) => {
            return <Text key={index}>{employee.Name}</Text>;
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    flex: 1,
  },
});
