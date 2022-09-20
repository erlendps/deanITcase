import React, { useEffect, useState } from "react";
import {StyleSheet, TextInput, Text, View, FlatList} from "react-native";
import { isName } from "../hooks/names";
const FONT_SIZE = 48



export const GuessInput = (props: {onInput: (guess: string) => void, secret: string, hint: string}) => {

  const [text, setText] = useState('')
  const [prevGuesses, setPrevGuesses] = useState([''])
  const [messages, setMessages] = useState([''])

  useEffect(() => {
    setPrevGuesses([])
    setMessages([])
  }, [props.secret]);

  const onSubmit = () => {
    if (text.length != props.secret.length) return
    if (prevGuesses.includes(text)) {
      setMessages((messages) => [`${text} has already been guessed!`, ...messages])
      return
    }
    if (!isName(text)) {
      setMessages((messages) => [`${text} is not a name!`, ...messages])
      return
    }
    setText('')
    setPrevGuesses((prevGuesses) => [...prevGuesses, text])
    props.onInput(text);
  }

  const inputStyle = () => StyleSheet.flatten([styles.input, {width: (10 + 0.61 * FONT_SIZE) * props.secret.length + 20}])

  return (<View style={styles.view}>
    <TextInput autoComplete='off' value={text} style={inputStyle()} onChangeText={setText} onSubmitEditing={onSubmit} blurOnSubmit={false} maxLength={props.secret.length}/>
    <Text style={styles.placeholder}>{props.hint}</Text>
    <FlatList
      data={messages}
      renderItem={({item}) => <Text style={styles.message}>{item}</Text>}
    ></FlatList>
  </View>
  );
};

const styles = StyleSheet.create({
  input: {
    letterSpacing: 10,
    margin: 10,
    padding: 10,
    border: '1px solid black',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'row',
    fontSize: FONT_SIZE,
    fontFamily: 'courier', // changing font will break it
    width: 100,
  },
  message: {
    color: 'green' 
  },
  placeholder: {
    letterSpacing: 10,
    marginTop: -FONT_SIZE - 30 - 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 0,
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
