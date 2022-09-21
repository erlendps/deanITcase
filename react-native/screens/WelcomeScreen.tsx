import { Dimensions, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { AppButton } from "../components/AppButton";
import { RootTabScreenProps } from "../types";

export const WelcomeScreen = ({
  navigation,
}: RootTabScreenProps<"Welcome">) => {

  const handlePress = () => {
    navigation.navigate('GameScreen');
  }
  return (
    <View style={styles.container}>
      <AppButton
        title={"Play Now!"}
        onPress={handlePress}
  ></AppButton>
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
});
