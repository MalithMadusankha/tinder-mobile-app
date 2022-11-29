import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Users from '../assets/data/users';

const MessageScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>New Matches</Text>
        <View style={styles.users}>
          {Users.map((user, index) => (
            <View key={index} style={styles.user}>
              <Image
                style={styles.image}
                source={{
                  uri: user.image,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
  },
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F63A6E',
  },
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  user: {
    width: 100,
    height: 100,
    margin: 10,
    padding: 2,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#F63A6E',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
