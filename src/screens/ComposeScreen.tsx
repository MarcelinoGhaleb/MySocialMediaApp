import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { postTweetSuccess } from '../slices/tweetSlice';
import { fetchUserPosts } from '../slices/profileSlice';

const MAX_CHARACTERS = 280;

const ComposeScreen = () => {
  const [tweetContent, setTweetContent] = useState('');
  const dispatch = useDispatch();

  const handleCompose = () => {
    if (tweetContent.trim() !== '') {
      if (tweetContent.length <= MAX_CHARACTERS) {
        dispatch(postTweetSuccess({
          id: Math.random(), content: tweetContent,
          userId: 0,
          text: undefined
        }));
        dispatch(fetchUserPosts());
        setTweetContent('');
      } else {
        Alert.alert('Error', `Maximum characters exceeded (${MAX_CHARACTERS} characters maximum)`);
      }
    } else {
      Alert.alert('Error', 'Tweet cannot be empty');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={tweetContent}
        onChangeText={setTweetContent}
        multiline
        maxLength={MAX_CHARACTERS}
      />
      <TouchableOpacity style={styles.postButton} onPress={handleCompose}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <Text style={styles.characterCount}>{tweetContent.length}/{MAX_CHARACTERS}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    maxHeight: 200,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 50,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  characterCount: {
    marginTop: 10,
    color: '#666',
  },
});

export default ComposeScreen;
