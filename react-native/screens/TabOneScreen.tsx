import React from "react";
import { Button, Image, Linking, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const employeeResult = useFetchEmployees();

  return (
    <ScrollView>
      {employeeResult.error ? (
        <Text style={styles.title}>{employeeResult.error}</Text>
      ) : employeeResult.loading ? (
        <Text style={styles.title}>{"Laster..."}</Text>
      ) : (
        <View style={styles.imageContainer}>
          {employeeResult.employees?.map((employee, index) => {
            return (
              <Image
                style={styles.image}
                key={index}
                source={{ uri: employee.Image }}
              />
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 130,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
