import React, { useEffect, useState } from "react";
import {StyleSheet, TextInput, Text, View} from "react-native";
import { isName } from "../hooks/names";
const FONT_SIZE = 40

export const GuessInput = (props: {onInput: (guess: string) => void, onMessage: (msg: string) => void, secret: string, hint: string}) => {

  const [text, setText] = useState('')
  const [prevGuesses, setPrevGuesses] = useState([''])

  useEffect(() => {
    setPrevGuesses([])
  }, [props.secret]);

  const onSubmit = () => {
    if (text.length != props.secret.length) return
    if (prevGuesses.includes(text)) {
      props.onMessage(`${text} has already been guessed!`)
      return
    }
    if (!isName(text)) {
      props.onMessage(`${text} is not a name!`)
      return
    }
    setPrevGuesses((prevGuesses) => [...prevGuesses, text])
    setText('')
    props.onInput(text);
  }

  const inputStyle = () => StyleSheet.flatten([styles.input, {width: (10 + 0.61 * FONT_SIZE) * props.secret.length + 20}])
  const placeholderStyle = () => StyleSheet.flatten([inputStyle(), styles.placeholder])

  return (
    <View style={styles.view}>
      <TextInput autoComplete='off' value={text} style={inputStyle()} onChangeText={setText} onSubmitEditing={onSubmit} blurOnSubmit={false} maxLength={props.secret.length}/>
      <Text style={placeholderStyle()}>{props.hint}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    letterSpacing: 10,
    position: 'absolute',
    bottom: 16,
    padding: 10,
    borderRadius: 10,
    fontSize: FONT_SIZE,
    fontFamily: 'space-mono',
  },
  placeholder: {
    color: 'rgba(0, 0, 0, 0.35)',
    zIndex: -3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  view : {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
