import {StyleSheet, TextInput, Text, View, Image} from "react-native";

const FONT_SIZE = 24;

export const Score = (props: {score: number}) => {
  return (
    <View>
      <Text style={styles.score}>Your Score: {props.score}</Text>
      <Image
        style={styles.image}
        key='mannen'
        source={{ uri: 'https://www.itverket.no/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fndtelfg5%2Fproduction%2Fb098dd3463842fe47e9a6948566ed522ad147d33-361x500.webp%3Fw%3D361%26h%3D500&w=384&q=75' }}
        resizeMode="cover"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  score: {
    textAlign: "center",
    fontSize: FONT_SIZE,
    zIndex: 3,
    color: "#fff",
    paddingTop: 5,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    transform: [{ rotate: '90deg'}],
  }
});