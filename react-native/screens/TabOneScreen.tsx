import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Text } from "../components/Themed";
import { useFetchEmployees } from "../hooks/useFetchEmployees";

export default function TabOneScreen() {
  const employeeResult = useFetchEmployees();

  return (
    <ScrollView>
      {employeeResult.error ? (
        <Text style={styles.title}>{employeeResult.error}</Text>
      ) : employeeResult.loading ? (
        <Text style={styles.title}>{"Laster..."}</Text>
      ) : (
        employeeResult.employees?.map((employee, index) => {
          return (
            <Text style={styles.name} key={index}>
              {employee.Name}
            </Text>
          );
        })
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
    fontSize: 16,
    lineHeight: 30,
  },
});
