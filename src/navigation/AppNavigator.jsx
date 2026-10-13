//Lo quiero profe wilfredo
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentScreen from '../screens/StudentScreen';
import ApiScreen from '../screens/ApiScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Estudiante"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Estudiante" component={StudentScreen} />
        <Stack.Screen name="Menu" component={ApiScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
