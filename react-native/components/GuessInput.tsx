import React, { useEffect, useRef, useState } from "react";
import {StyleSheet, TextInput, Text, View, Keyboard} from "react-native";
import { FONT_SIZE } from "../constants/Layout";

export const GuessInput = (props: {onInput: (guess: string) => boolean, onMessage: (msg: string) => void, secret: string, hint: string, onReGuess: (guess: string) => void}) => {

  const [text, setText] = useState('')
  const [prevGuesses, setPrevGuesses] = useState([''])
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    setPrevGuesses([])
    inputRef.current?.focus()
  }, [props.secret]);

  const onSubmit = () => {
    if (text.length != props.secret.length) return
    if (prevGuesses.includes(text)) {
      props.onMessage(`${text} has already been guessed!`)
      props.onReGuess(text);
      return
    }
    setPrevGuesses((prevGuesses) => [...prevGuesses, text])
    if (props.onInput(text)) {
      setText('')
    }
  }

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const inputStyle = () => StyleSheet.flatten([styles.input, {width: (10 + 0.61 * FONT_SIZE) * props.secret.length + 20, bottom: isKeyboardVisible ? 80 : 10}])
  const placeholderStyle = () => StyleSheet.flatten([inputStyle(), styles.placeholder])

  return (
    <View style={styles.view}>
      <Text ellipsizeMode="clip" allowFontScaling={false} numberOfLines={1} style={placeholderStyle()}>{props.hint}</Text>
      <TextInput ref={inputRef} allowFontScaling={false} keyboardType="visible-password" underlineColorAndroid="rgba(0,0,0,0)" autoComplete='off' value={text} style={inputStyle()} onChangeText={setText} onSubmitEditing={onSubmit} blurOnSubmit={false} maxLength={props.secret.length}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    letterSpacing: 8,
    position: 'absolute',
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
