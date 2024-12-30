import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';


export default function WelcomeScreen() {
  return (

    <View style={styles.titleContainer}>
      <ThemedText style={styles.titleText} type="title">Welcome to Readme!</ThemedText>

      <Image
        style={styles.tinyLogo}
        source={require('@/assets/images/readme-logo-black.png')} />
      <Link href="/login" asChild>
        <Pressable>
          <Text style={styles.loginButton}>Login</Text>
        </Pressable>
      </Link>
    </View>


  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBlockStart: 250,
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontSize: 26
  },
  tinyLogo: {
    marginBlockStart: 25,
    height: 150,
    width: 200,
  },
  loginButton: {
    marginTop: 10,
    width: '200%',
    backgroundColor: '#34A853',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
