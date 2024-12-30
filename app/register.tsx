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


export default function TabTwoScreen() {
  const [userName, onChangeUserName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Validation Functions
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const handleCreateAccount = () => {
    let isValid = true;
    const errors = { userName: '', email: '', password: '', confirmPassword: '' };

    if (userName.trim() === '') {
      errors.userName = 'User Name is required.';
      isValid = false;
    }

    if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!validatePassword(password)) {
      errors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrorMessage(errors);

    if (isValid) {
      Alert.alert('Account Created', `Welcome, ${userName}!`);
    } else {
      Alert.alert('Validation Error', 'Please fix the errors before proceeding.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create Your Account</Text>
        <Text style={styles.subtitleText}>
          Join us and start your reading journey today!
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, isFocused === 'userName' && styles.inputFocused]}
          onChangeText={(text) => {
            onChangeUserName(text);
            setErrorMessage((prev) => ({ ...prev, userName: '' }));
          }}
          placeholder="User Name"
          value={userName}
          placeholderTextColor="#A9A9A9"
          onFocus={() => setIsFocused('userName')}
          onBlur={() => setIsFocused(null)}
        />
        {errorMessage.userName ? <Text style={styles.errorText}>{errorMessage.userName}</Text> : null}
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
        <TextInput
          style={[styles.input, isFocused === 'confirmPassword' && styles.inputFocused]}
          onChangeText={(text) => {
            onChangeConfirmPassword(text);
            setErrorMessage((prev) => ({ ...prev, confirmPassword: '' }));
          }}
          placeholder="Confirm Password"
          value={confirmPassword}
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          onFocus={() => setIsFocused('confirmPassword')}
          onBlur={() => setIsFocused(null)}
        />
        {errorMessage.confirmPassword ? (
          <Text style={styles.errorText}>{errorMessage.confirmPassword}</Text>
        ) : null}
        <TouchableOpacity style={styles.loginButton} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Link href="/login" asChild>
            <Pressable>
              <Text style={styles.loginLink} >Login</Text>
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
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: '#000',
  },
  loginLink: {
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
