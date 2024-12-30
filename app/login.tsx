import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function LoginScreen() {

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState({

    email: '',
    password: '',

  });

  // Validation Functions
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const handleCreateAccount = () => {
    let isValid = true;
    const errors = { email: '', password: '' };



    if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!validatePassword(password)) {
      errors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }



    setErrorMessage(errors);

    if (isValid) {
      Alert.alert('Log in success!');
    } else {
      Alert.alert('Validation Error', 'Please fix the errors before proceeding.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Log in</Text>
        <Text style={styles.subtitleText}>
          Welcome back! Log in to resume your reading journey.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, isFocused === 'email' && styles.inputFocused]}
          onChangeText={(text) => {
            onChangeEmail(text);
            setErrorMessage((prev) => ({ ...prev, email: '' }));
          }}
          placeholder="Email Address"
          value={email}
          placeholderTextColor="#A9A9A9"
          onFocus={() => setIsFocused('email')}
          onBlur={() => setIsFocused(null)}
        />
        {errorMessage.email ? <Text style={styles.errorText}>{errorMessage.email}</Text> : null}
        <TextInput
          style={[styles.input, isFocused === 'password' && styles.inputFocused]}
          onChangeText={(text) => {
            onChangePassword(text);
            setErrorMessage((prev) => ({ ...prev, password: '' }));
          }}
          placeholder="Password"
          value={password}
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          onFocus={() => setIsFocused('password')}
          onBlur={() => setIsFocused(null)}
        />
        {errorMessage.password ? <Text style={styles.errorText}>{errorMessage.password}</Text> : null}
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.loginButton} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.signupText}>
          Don't have an account?{' '}

          <Link href="/register" asChild>
            <Pressable>
              <Text style={styles.signupLink}>Sign up</Text>
            </Pressable>
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  titleContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#34A853',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  inputFocused: {
    borderColor: '#34A853',
  },
  loginButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#34A853',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: '#000',
  },
  signupLink: {
    marginTop: 15,
    color: '#34A853',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
});
