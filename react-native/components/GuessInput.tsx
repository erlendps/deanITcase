import React, { useEffect } from "react";
import { useRef } from "react";
import {StyleSheet, TextInput, Text, View} from "react-native";
import { isName } from "../hooks/names";
const FONT_SIZE = 48



export const GuessInput = (props: {onInput: (guess: string) => void, secret: string, hint: string}) => {

  let inputRef = React.createRef<TextInput>();
  const checkText = (guess: string) => {
    if (guess.length == props.secret.length) {
      
      if (isName(guess)) {
        props.onInput(guess);
        // Clear TextInput
        inputRef.current!.clear();
      }
      
      
    }
  }

  useEffect(() => {
    inputRef.current!.setNativeProps({
      style: {width: (10 + 0.61 * FONT_SIZE) * props.secret.length + 20}
    })
  }, [props]);

  return (
    <View style={styles.view}>
      <TextInput ref={inputRef} style={styles.input} placeholder={"_".repeat(props.secret.length)} onChangeText={checkText} maxLength={props.secret.length}/>
      <Text style={styles.placeholder}>{props.hint}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    letterSpacing: 10,
    margin: 10,
    padding: 10,
    border: '1px solid black',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    fontSize: FONT_SIZE,
    fontFamily: 'courier', // changing font will break it
  },
  placeholder: {
    letterSpacing: 10,
    marginTop: -FONT_SIZE - 30,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    padding: 10,
    color: 'rgba(0, 0, 0, 0.35)',
    display: 'flex',
    flexDirection: 'row',
    fontSize: FONT_SIZE,
    fontFamily: 'courier', // changing font will break it
    zIndex: -3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  view : {
    marginTop: -FONT_SIZE - 30 - 5,
    margin: 0,
    padding: 0,
    display: 'flex',
  }
});
