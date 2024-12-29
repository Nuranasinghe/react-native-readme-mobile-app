import { Image, StyleSheet, Platform, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
 

export default function HomeScreen() {
  return (

      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleText} type="title">Welcome to Readme!</ThemedText>
         
        <Image
        style={styles.tinyLogo}
        source={require('@/assets/images/readme-logo-black.png')}/>
      </View>
  
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBlockStart:250,
    alignItems: 'center',
  },
  titleText:{
    color:'black',
    fontSize:26
  },
  tinyLogo: {
    marginBlockStart:25,
    height: 150,
    width: 200,
    

  },
});
