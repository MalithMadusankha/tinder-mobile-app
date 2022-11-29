import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import MessageScreen from './src/screens/MessageScreen';

function App(props) {
  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <MessageScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
