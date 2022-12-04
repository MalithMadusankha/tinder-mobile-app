import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Amplify} from 'aws-amplify';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import awsconfig from './src/aws-exports';

import HomeScreen from './src/screens/HomeScreen';
import MessageScreen from './src/screens/MessageScreen';
import {withAuthenticator} from 'aws-amplify-react-native';
import ProfileScreen from './src/screens/ProfileScreen';
import Colors from './src/assets/colors/Colors';

Amplify.configure(awsconfig);

function App(props) {
  const [activeScreen, setActiveScreen] = useState('HOME');
  const color = Colors.LIGHT_GRAY;
  const activeColor = Colors.BRAND;
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

          <FontAwesome
            name="user"
            size={30}
            onPress={() => setActiveScreen('PROFILE')}
            color={activeScreen === 'PROFILE' ? activeColor : color}
          />
        </View>
        {activeScreen === 'HOME' && <HomeScreen />}
        {activeScreen === 'CHAT' && <MessageScreen />}
        {activeScreen === 'PROFILE' && <ProfileScreen />}
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

export default withAuthenticator(App);
