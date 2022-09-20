import { StyleSheet, TouchableOpacity, Text } from "react-native";

export type ButtonProps = {
  onPress: () => void;
  title: string;
  buttonStyle: object;
  textStyle: object;
};

export const AppButton = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
