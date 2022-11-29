import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

import TinderCard from '../componets/tinderCard';
import Users from '../assets/data/users.js';

import AnimatedStack from '../componets/animatedStack';

function HomeScreen(props) {
  const onSwipLeft = user => console.log('swip left', user.name);
  const onSwipRight = user => console.log('swip right', user.name);

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

export default HomeScreen;
