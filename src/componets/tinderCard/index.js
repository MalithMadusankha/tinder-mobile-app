import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

function index(props) {
  const {image, name, bio} = props.user;
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: image,
        }}>
        <View style={styles.cardInner}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    width: '95%',
    height: '85%',
    borderRadius: 10,
    backgroundColor: '#fefefe',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardInner: {
    padding: 10,
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 18,
    color: 'white',
    lineHeight: 25,
  },
});

export default index;
