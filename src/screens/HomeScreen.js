import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.icons}>
        <View style={styles.button}>
          <FontAwesome name="undo" size={30} color="#FBD88B" />
        </View>
        <View style={styles.button}>
          <Entypo name="cross" size={30} color="#F76C6B" />
        </View>
        <View style={styles.button}>
          <FontAwesome name="star" size={30} color="#3AB4CC" />
        </View>
        <View style={styles.button}>
          <FontAwesome name="heart" size={30} color="#4FCC94" />
        </View>
        <View style={styles.button}>
          <Ionicons name="flash" size={30} color="#A65CD2" />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});

export default HomeScreen;
