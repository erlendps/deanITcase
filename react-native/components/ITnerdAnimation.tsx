import {
  StyleSheet,
  Animated,
  Text,
  View,
  Easing,
  Dimensions,
  ScrollView
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { TALK_FONT_SIZE } from "../constants/Layout";

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
      outputRange: ["0deg", "360deg"],
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
          width: 110,
          height: 110,
          marginLeft: 18,
          transform: [{ rotate: spin ? spin : "90deg" }],
        }}
        key="mannen"
        source={{
          uri: "https://www.itverket.no/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fndtelfg5%2Fproduction%2Fb098dd3463842fe47e9a6948566ed522ad147d33-361x500.webp%3Fw%3D361%26h%3D500&w=384&q=75",
        }}
        resizeMode="cover"
        />
        
        
        <View style={styles.speech}>
          <ScrollView contentContainerStyle={styles.scroller}>
            <Text style={styles.speechText}>{props.text ? props.text : "JEG ELSKER GJETTELEKEN!"}</Text>
          </ScrollView>
        </View>
        
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  speech: {
    width: Dimensions.get("window").width - 160 ,
    height: 100,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginLeft: 20,
    marginRight: 30,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroller : {
    flexGrow: 1,
    justifyContent: 'center',
  },
  speechText: {
    padding: 10,
    textAlign: 'center',
    fontSize: TALK_FONT_SIZE,
  }
});
