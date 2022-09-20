import React, { useEffect, useState } from "react";
import {StyleSheet, TextInput, Text, View, FlatList} from "react-native";
import { isName } from "../hooks/names";
const FONT_SIZE = 48
export const GuessInput = (props: {onInput: (guess: string) => void, secret: string}) => {

  const [text, setText] = useState('')
  const [prevGuesses, setPrevGuesses] = useState([''])
  const [messages, setMessages] = useState([''])

  useEffect(() => {
    setPrevGuesses([])
  }, [props.secret]);

  useEffect(() => {
    if (text.length != props.secret.length) return
    setText('')
    if (prevGuesses.includes(text)) {
      setMessages((messages) => [`${text} has already been guessed!`, ...messages])
      return
    }
    if (!isName(text)) return
    setPrevGuesses((prevGuesses) => [...prevGuesses, text])
    props.onInput(text);
  }, [text])

  return (<View>
    <TextInput value={text} style={styles.input} placeholder="write ur guess" onChangeText={setText} maxLength={props.secret.length}/>
    <FlatList
      data={messages}
      renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
    ></FlatList>
  </View>
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
    width: 100,
  },
  text: {
    color: 'green' 
  }
});
