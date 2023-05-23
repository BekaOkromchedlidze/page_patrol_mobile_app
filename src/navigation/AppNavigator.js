import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import AddEntryScreen from "../screens/AddEntryScreen";
import EditEntryScreen from "../screens/EditEntryScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Website Monitors" }}
        />
        <Stack.Screen
          name="AddEntry"
          component={AddEntryScreen}
          options={{ title: "Add Entry" }}
        />
        <Stack.Screen
          name="EditEntry"
          component={EditEntryScreen}
          options={{ title: "Edit Entry" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
