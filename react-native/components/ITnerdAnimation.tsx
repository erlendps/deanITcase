import {
  StyleSheet,
  Animated,
  TextInput,
  Text,
  View,
  Image,
  Easing,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

export const ItNerd = (props: { failed: number; text?: string }) => {
  const rotAnim = useRef(new Animated.Value(0)).current;
  const [spin, setSpin] = useState<Animated.AnimatedInterpolation>();

  const doRotate = () => {
    Animated.timing(rotAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotAnim.setValue(0);
    });
    const newSpin = rotAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["90deg", "450deg"],
    });
    setSpin(newSpin);
  };

  useEffect(() => {
    doRotate();
  }, [props.failed]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: 100,
          height: 100,
          transform: [{ rotate: spin ? spin : "90deg" }],
        }}
        key="mannen"
        source={{
          uri: "https://www.itverket.no/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fndtelfg5%2Fproduction%2Fb098dd3463842fe47e9a6948566ed522ad147d33-361x500.webp%3Fw%3D361%26h%3D500&w=384&q=75",
        }}
        resizeMode="cover"
      />
      <View>
        <Text>{props.text ? props.text : ""}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    width: 150,
    height: 100,
  },
});
