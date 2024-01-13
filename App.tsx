import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { app } from './Components/FirebaseConfig'
import Login from './Components/Login';
import Register from './Components/Register';
import Weather from './Components/Weather'

const Stack = createStackNavigator();

const App = () => {
  app
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Weather' component={Weather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Weather: undefined;
};

export default App;
