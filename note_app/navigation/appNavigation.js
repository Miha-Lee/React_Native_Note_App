import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EditorScreen from '../screens/EditorScreen';
import SingleNoteScreen from '../screens/SingleNoteScreen';
import EditSingleNoteScreen from '../screens/EditSingleNoteScreen';
import SearchNoteScreen from '../screens/SearchNoteScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Editor"
          options={{headerShown: false}}
          component={EditorScreen}
        />
        <Stack.Screen
          name="Single_Note"
          options={{headerShown: false}}
          component={SingleNoteScreen}
        />
        <Stack.Screen
          name="Edit_Single_Note"
          options={{headerShown: false}}
          component={EditSingleNoteScreen}
        />
        <Stack.Screen
          name="Search_Note"
          options={{headerShown: false}}
          component={SearchNoteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
