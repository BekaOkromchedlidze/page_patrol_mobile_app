import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-native-paper";
import { AuthProvider } from "./src/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PatrolHistoryScreen from "./src/screens/PatrolHistoryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login Page" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Patrol History"
              component={PatrolHistoryScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  );
}
