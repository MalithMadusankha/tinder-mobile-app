import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

import TinderCard from './src/componets/tinderCard';
import Users from './src/assets/data/users.js';

import AnimatedStack from './src/componets/animatedStack';

function App(props) {
  const onSwipLeft = user => console.warn('swip left', user.name);
  const onSwipRight = user => console.warn('swip right', user.name);

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <AnimatedStack
        data={Users}
        renderItem={({item}) => <TinderCard user={item} />}
        onSwipLeft={onSwipLeft}
        onSwipRight={onSwipRight}
      />
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
