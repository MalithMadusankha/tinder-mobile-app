import '@azure/core-asynciterator-polyfill';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Auth, DataStore} from 'aws-amplify';
import {User} from '../models/';
import {Picker} from '@react-native-picker/picker';

import Colors from '../assets/colors/Colors';

const IMGAGE =
  'https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/29496524_310824936109227_7481169001918234624_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_eui2=AeEfQO0_1wKywDTiTAXLcq0__Im099XYDyr8ibT31dgPKjsjTVhXGSq0y5gvJC39rPSoarR7u_FTCuFhg8fsQYK-&_nc_ohc=72hNMi8xIXkAX89-OMD&_nc_ht=scontent.fcmb1-2.fna&oh=00_AfAhpo8ICyL4sPX068pLnfb4BD5nCoDq8T8q8T3A36OyYw&oe=63B040F7';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const isValid = () => {
    return name && gender && bio && lookingFor;
  };

  const handleSave = async () => {
    if (!isValid) {
      console.warn('Not Valid');
      return;
    }

    if (user) {
      console.warn('exisit user');

      await DataStore.save(
        User.copyOf(user, updated => {
          updated.name = name;
          updated.gender = gender;
          updated.bio = bio;
          updated.lookingFor = lookingFor;
        }),
      );
    } else {
      console.warn('new user');
      const authUser = await Auth.currentAuthenticatedUser();
      const newUser = new User({
        sub: authUser.attributes.sub,
        name,
        bio,
        gender,
        lookingFor,
        image: IMGAGE,
      });
      try {
        console.log(newUser);
        const res = await DataStore.save(newUser);
      } catch (error) {
        console.log('error s', error);
      }
    }
  };

  const setUserValue = u => {
    setName(u.name);
    setBio(u.bio);
    setGender(u.gender);
    setLookingFor(u.lookingFor);
  };

  useEffect(() => {
    const getUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const subs = await DataStore.observeQuery(User, u =>
        u.sub.eq(authUser.attributes.sub),
      ).subscribe(({items}) => {
        if (items.length > 0) {
          const dbUser = items[0];
          setUser(dbUser);
          setUserValue(dbUser);
        }
      });
      return () => subs.unsubscribe();
    };
    getUser();
  }, []); // eslint-disable-line

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Pressable onPress={() => Auth.signOut()}>
          <Text style={styles.signOut}>Sign Out</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles}>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles}>Bio</Text>
        <TextInput
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          style={styles.input}
        />
        <Text style={styles}>Gender</Text>
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Other" value="OTHER" />
        </Picker>
        <Text style={styles}>Looking For</Text>
        <Picker
          style={styles.picker}
          selectedValue={lookingFor}
          onValueChange={(itemValue, itemIndex) => setLookingFor(itemValue)}>
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Other" value="OTHER" />
        </Picker>
        <Pressable
          style={styles.save}
          color={Colors.BRAND}
          onPress={handleSave}>
          <Text style={styles.saveText}>SAVE</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  signOut: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.BRAND,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: Colors.WHITE,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.BRAND,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: Colors.BRAND,
    marginBottom: 20,
  },
  save: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Colors.BRAND,
  },
  saveText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
