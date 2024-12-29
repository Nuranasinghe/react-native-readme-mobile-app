import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure to install this library
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Define navigation types
type RootStackParamList = {
  Login: undefined;
  Home: { username: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });

  // Validation functions
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const handleLogin = () => {
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
      navigation.navigate('Home', { username: email });
    } else {
      Alert.alert('Validation Error', 'Please fix the errors before proceeding.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
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
              setEmail(text);
              setErrorMessage((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="Email Address"
            value={email}
            placeholderTextColor="#A9A9A9"
            onFocus={() => setIsFocused('email')}
            onBlur={() => setIsFocused(null)}
          />
          {errorMessage.email ? (
            <Text style={styles.errorText}>{errorMessage.email}</Text>
          ) : null}
          <TextInput
            style={[styles.input, isFocused === 'password' && styles.inputFocused]}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage((prev) => ({ ...prev, password: '' }));
            }}
            placeholder="Password"
            value={password}
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            onFocus={() => setIsFocused('password')}
            onBlur={() => setIsFocused(null)}
          />
          {errorMessage.password ? (
            <Text style={styles.errorText}>{errorMessage.password}</Text>
          ) : null}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => {
                window.location.href = 'http://localhost:8081/register';
              }}
            >
              Sign up
            </Text>
          </Text>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => Alert.alert('Google Login pressed')}
        >
          <Ionicons
            name="logo-google"
            size={20}
            color="#34A853"
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
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
    marginTop: 8,
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
    color: '#34A853',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  googleButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#34A853',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  googleButtonText: {
    color: '#34A853',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  googleIcon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
});

export default LoginScreen;
