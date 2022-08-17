import React from "react";
import { Dimensions, FlatList, Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { RootTabScreenProps } from "../types";

const IMAGE_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const TabTwoScreen = ({ navigation }: RootTabScreenProps<"TabTwo">) => {
  const employeeResult = useFetchEmployees();

  const renderEmployee = ({ item }: { item: Employee }) => {
    return (
      <Image
        style={styles.image}
        key={item.Name}
        source={{ uri: item.Image }}
        resizeMode="cover"
      />
    );
  };

  const keyExtractor = (employee: Employee) => employee.Name;

  return (
    <View>
      {employeeResult.error ? (
        <Text style={styles.title}>{employeeResult.error}</Text>
      ) : employeeResult.loading ? (
        <Text style={styles.title}>{"Laster..."}</Text>
      ) : (
        <FlatList
          data={employeeResult.employees}
          horizontal={true}
          renderItem={renderEmployee}
          keyExtractor={keyExtractor}
          snapToInterval={IMAGE_WIDTH}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
