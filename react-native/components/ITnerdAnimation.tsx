import {StyleSheet, Animated, TextInput, Text, View, Image, Easing} from "react-native";
import React, { useRef, useState } from "react";

export const ItNerd = () => {
  const rotAnim = useRef(new Animated.Value(90)).current;

  const doRotation = () => {
    Animated.timing(
      rotAnim,
      {
        toValue: 450,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start();
  }
  
  return (
    <Image
      style={styles.image}
      key='mannen'
      source={{ uri: 'https://www.itverket.no/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fndtelfg5%2Fproduction%2Fb098dd3463842fe47e9a6948566ed522ad147d33-361x500.webp%3Fw%3D361%26h%3D500&w=384&q=75' }}
      resizeMode="cover"
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    transform: [{ rotate: '90deg'}],
  }
});