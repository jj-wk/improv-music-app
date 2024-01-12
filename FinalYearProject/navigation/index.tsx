import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChordProgressionsScreen from '../screens/ChordProgressionsScreen';
import MyProgressionScreen from '../screens/MyProgressionScreen';
import ScalesScreen from '../screens/ScalesScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="MyProgression"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: "#9DD6FF",
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
            fontStyle: 'italic',
          },
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderRadius: 30,
            position: 'absolute',
          },
      }}>
      <BottomTab.Screen
        name="ChordProgressions"
        component={ChordProgressionsScreen}
        options={{
          title: 'Chord Progressions',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} name="folder-music" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyProgression"
        component={MyProgressionScreen}
        options={({ navigation }: RootTabScreenProps<'MyProgression'>) => ({
          title: 'My Progression',
          tabBarIcon: ({ color }) => <MaterialIcons size={30} style={{ marginBottom: -3 }} name="queue-music" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="question-circle-o"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Scales"
        component={ScalesScreen}
        options={{
          title: 'Scales',
          tabBarIcon: ({ color }) => <MaterialIcons size={30} style={{ marginBottom: -3 }} name="music-note" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
