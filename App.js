import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome.js';
import LoginPage from './Screens/Loginscreen.js';
import SignupPage from './Screens/SignUp.js';
import HomeScreen from './Screens/Home.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name ='HomeScreen' component={HomeScreen}/>
        {/* Add screens for Login, SignUp, and About here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
