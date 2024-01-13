import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, TextInput, Button } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../App'

type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>

interface RegisterScreenProps {
  navigation: RegisterNavigationProp
}

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = getAuth()
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
        alert('Create Success.')
        navigation.replace('Logi')
    })
    .catch((err) => {
        alert(err.message)
    })
  }

  const NavigateLogin = () =>{
    navigation.replace('Login')
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
        <Button title="Register" onPress={handleRegister} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Already have an account? Go login!" onPress={NavigateLogin}/>
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
    alignItems: 'center'
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

export default Register