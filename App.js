import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';

import HomeScreen from './src/screens/HomeScreen';
import MessageScreen from './src/screens/MessageScreen';

Amplify.configure(awsconfig);

function App(props) {
  const [activeScreen, setActiveScreen] = useState('HOME');
  const color = '#b5b5b5';
  const activeColor = '#F76C6B';
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.pageContainer}>
        <View style={styles.topNavigation}>
          <Pressable onPress={() => setActiveScreen('HOME')}>
            <Fontisto
              name="tinder"
              size={30}
              color={activeScreen === 'HOME' ? activeColor : color}
            />
          </Pressable>

          <MaterialCommunityIcons
            name="star-four-points"
            size={30}
            color={color}
          />
          <Pressable onPress={() => setActiveScreen('CHAT')}>
            <Ionicons
              name="ios-chatbubbles"
              size={30}
              color={activeScreen === 'CHAT' ? activeColor : color}
            />
          </Pressable>

          <FontAwesome name="user" size={30} color={color} />
        </View>
        {activeScreen === 'HOME' && <HomeScreen />}
        {activeScreen === 'CHAT' && <MessageScreen />}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
});

export default App;
