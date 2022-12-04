import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Auth, DataStore} from 'aws-amplify';
import {User, Match} from '../models/';

import TinderCard from '../componets/tinderCard';

import AnimatedStack from '../componets/animatedStack';

function HomeScreen(props) {
  const [dbUsers, setDbUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [me, setMe] = useState(null);

  const onSwipLeft = () => {
    if (!currentUser || !me) {
      return;
    }
    console.warn('swip left', currentUser.name);
  };
  const onSwipRight = () => {
    if (!currentUser || !me) {
      return;
    }
    console.warn('swip right', currentUser.name);
    DataStore.save(
      new Match({
        user1ID: me.id,
        user2ID: currentUser.id,
        isMatch: false,
        user1: new User(me),
        User2: new User(currentUser),
      }),
    );
    console.warn('Match user', currentUser.name);
  };

  const fetchUser = async () => {
    try {
      DataStore.observeQuery(User).subscribe(({items}) => {
        setDbUsers(items);
      });
    } catch (error) {
      console.warn('get user error', error);
    }
  };

  const getAuthUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const subs = await DataStore.observeQuery(User, u =>
      u.sub.eq(authUser.attributes.sub),
    ).subscribe(({items}) => {
      if (items.length > 0) {
        setMe(items[0]);
      }
    });
    return () => subs.unsubscribe();
  };

  useEffect(() => {
    fetchUser();
    getAuthUser();
  }, []); // eslint-disable-line

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <AnimatedStack
        data={dbUsers}
        renderItem={({item}) => <TinderCard user={item} />}
        setCurrentUser={setCurrentUser}
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
