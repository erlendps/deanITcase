import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { AppButton } from "../components/AppButton";
import { RootStackScreenProps } from "../types";
import { FONT_SIZE } from "../constants/Layout";

export const GroupScreen = ({
  navigation, route
}: RootStackScreenProps<"GroupScreen">) => {

  const handlePress = (group: number) => {
    navigation.navigate('GameScreen', {group});
  }

  const groupNames = [
    'Sosiale',
    'Nerder',
    'Fantomer',
    'Entusiaster'
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Velg en gruppe</Text>
      {[...Array(4).keys()].map((group => 
      <View style={styles.buttonContainer}>
        <AppButton
          title={groupNames[group]}
          key={group}
          onPress={() => handlePress(group)}
        ></AppButton>
      </View>))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    minHeight: Dimensions.get("window").height,
  },
  buttonContainer: {
    padding: 10,
  },
  text: {
    fontSize: FONT_SIZE,
    padding: 20,
  }
});
