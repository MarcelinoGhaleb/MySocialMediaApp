import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const UnAuthStackNavigator = createNativeStackNavigator();

const UnAuthSatck = () => {
  return (
    <UnAuthStackNavigator.Navigator>
      <UnAuthStackNavigator.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </UnAuthStackNavigator.Navigator>
  );
};

export default UnAuthSatck;