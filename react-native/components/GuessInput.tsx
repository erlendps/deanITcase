import React, { useEffect, useState } from "react";
import {StyleSheet, TextInput, Text, View} from "react-native";
import { FONT_SIZE } from "../constants/Layout";

export const GuessInput = (props: {onInput: (guess: string) => boolean, onMessage: (msg: string) => void, secret: string, hint: string}) => {

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
    setPrevGuesses((prevGuesses) => [...prevGuesses, text])
    if (props.onInput(text)) {
      setText('')
    }
  }

  const inputStyle = () => StyleSheet.flatten([styles.input, {width: (10 + 0.61 * FONT_SIZE) * props.secret.length + 20}])
  const placeholderStyle = () => StyleSheet.flatten([inputStyle(), styles.placeholder])

  return (
    <View style={styles.view}>
      <Text ellipsizeMode="clip" allowFontScaling={false} numberOfLines={1} style={placeholderStyle()}>{props.hint}</Text>
      <TextInput allowFontScaling={false} keyboardType="visible-password" underlineColorAndroid="rgba(0,0,0,0)" autoComplete='off' value={text} style={inputStyle()} onChangeText={setText} onSubmitEditing={onSubmit} blurOnSubmit={false} maxLength={props.secret.length}/>
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
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0)',
  },
  placeholder: {
    color: 'rgba(0, 0, 0, 0.35)',
    elevation: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'visible',
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
