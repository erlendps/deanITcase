import React, { useEffect } from "react";
import { useRef } from "react";
import {StyleSheet, TextInput, Text, View} from "react-native";
const FONT_SIZE = 32
export const GuessInput = (props: {onInput: (guess: string) => void, secret: string}) => {

  let inputRef = React.createRef<TextInput>();
  const checkText = (guess: string) => {
    if (guess.length == props.secret.length) {
      props.onInput(guess);
      
      // Clear TextInput
      inputRef.current!.clear();
    }
  }

  useEffect(() => {
    inputRef.current!.setNativeProps({
      style: {width: 0.61 * FONT_SIZE * props.secret.length}
    })
  }, [props]);

  return (
    <TextInput ref={inputRef} style={styles.input} placeholder="write ur guess" onChangeText={checkText} maxLength={props.secret.length}/>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    border: '1px solid black',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    fontSize: FONT_SIZE,
    fontFamily: 'courier', // changing font will break it
  }
});
