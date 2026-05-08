import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import BookingScreen from '../screens/BookingScreen'
import ProfileScreen from '../screens/ProfileScreen'

export type RootStackParamList = {
  Home: undefined
  Booking: { serviceId?: string } | undefined
  Profile: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
