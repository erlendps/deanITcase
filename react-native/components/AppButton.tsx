import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";

export type ButtonProps = {
  onPress: () => void;
  title: string;
  buttonStyle?: object;
  textStyle?: object;
  ref?: any
};

export const AppButton = ({
  onPress,
  title,
  ref,
  buttonStyle = styles.playButton,
  textStyle = styles.textStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity ref={ref} onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playButton: {
    width: Dimensions.get("window").width * 0.6,
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 20,
  },
  textStyle: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    lineHeight: 32,
  }
});