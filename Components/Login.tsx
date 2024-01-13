import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, TextInput, Button } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../App'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

interface LoginScreenProps {
  navigation: LoginNavigationProp
}

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = getAuth()
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      alert('Login success')
      navigation.replace('Weather')
    })
    .catch((err) => {
      alert('Wrong email or password, please try again.')
    })
  }
  
  const NavigateReg = () =>{
    navigation.replace('Register')
  }

  return (
    <SafeAreaView>
      <Image style={styles.bgContainer} source={require('../assets/bg.jpg')} />
      <View style={styles.textsContainer}>
        <Image style={styles.imageContainer} source={require('../assets/logo.png')} />
      </View>
      <TextInput style={styles.inputContainer}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.inputContainer}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Don't have an account? Go register!" onPress={NavigateReg}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    height: 1100
  },
  textsContainer: {
    padding: 5,
    alignItems: 'center',
  },
  inputContainer: {
    padding: 5,
    margin: 3,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1
  },
  buttonsContainer: {
    padding: 5,
  },
  imageContainer: {
    width: 300,
    height: 300
  }
})

export default Login