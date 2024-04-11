import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing, Modal, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/authStore';
const LoginScreen = () => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [passHidden, setPassHidden] = useState(true);
  
  const { setAuthToken } = useAuthStore();
  const navigation = useNavigation();

  const onLogin = async () => {
    try {
      setLoading(true);
      
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      const { username: extractedUsername, password: extractedPassword } = response.data;

      setUsername(extractedUsername);
      setPassword(extractedPassword);

      setAuthToken(response.data.token);
      navigation.navigate('MainTabNavigator');
    } catch (err) {
      console.log(err);
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => {
    setPassHidden(prev => !prev);
  };

  const isLoginDisabled = !username || !password;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <View style={styles.inputField}>
          <TextInput
            onChangeText={setUsername}
            value={username}
            style={styles.inputText}
            placeholder="Enter username here"
            placeholderTextColor="#cdcdcd"
          />
        </View>
        <Text style={styles.label}>Password:</Text>
        <View style={[styles.inputField, styles.passwordField]}>
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry={passHidden}
            style={styles.inputText}
            placeholder="Enter password here"
            placeholderTextColor="#cdcdcd"
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <Text style={styles.toggleVisibility}>{passHidden ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onLogin} disabled={isLoginDisabled}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={errorModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Invalid username or password. Close this alert and try again.</Text>
            <TouchableOpacity onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  passwordField: {
    position: 'relative',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    height: 40,
  },
  toggleVisibility: {
    position: 'absolute',
    right: 0,
    top: 12,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
  },
  modalCloseText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default LoginScreen;
