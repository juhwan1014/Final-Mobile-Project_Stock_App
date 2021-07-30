import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import base from '../styles/styles';
import { getUser, signUp } from '../../network';
import AsyncStorage from '@react-native-community/async-storage';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  async function setAsyncItem(key, value) {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log('AsyncStorage#setItem Error:', err.message);
    }
  }

  const onRegisterPressed = async () => {
    if (!password || !email) {
      console.log('Please enter an email/password!');
      return;
    }

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const userInfo = response.user.providerData[0];

      // Sets user uid in async storage.
      await setAsyncItem('userId', userInfo.uid);

      const userFromDb = await signUp(userInfo.uid);

      // setUser(userInfo);
      console.log('userInfo from DB>>', userInfo);
      setEmail('');
      setPassword('');
      // navigate
      userFromDb
        ? navigation.navigate('HomeScreen', userFromDb)
        : console.log('error logging in');
    } catch (err) {
      const errorMessage = err.message;
      console.log('Error>>', errorMessage);
    }
  };

  return (
    <View style={base.container}>
      <View style={styles.box}>
        <MaterialCommunityIcons name='robber' size={50} color='white' />
      </View>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>to start working</Text>
      <View style={styles.inputView}>
        <View style={styles.userIconContainer}>
          <FontAwesome name='user' color='#FFC542' size={20} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          value={email}
          placeholderTextColor='#96A7AF'
          onChangeText={(email) => setEmail(email.toLowerCase())}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.lockIconContainer}>
          <FontAwesome name='lock' color='#FF575F' size={20} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          value={password}
          placeholderTextColor='#96A7AF'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          enablesReturnKeyAutomatically={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.backBtn}
        >
          <FontAwesome name='arrow-left' color='#3DD598' size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={onRegisterPressed}
        >
          <Text style={styles.registerBtnText}>Next</Text>
          <FontAwesome
            name='arrow-right'
            color='white'
            size={20}
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    borderRadius: 10,
    height: 60,
    width: '20%',
    backgroundColor: '#286053',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
  },
  registerBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
  registerBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 60,
    marginLeft: 12,
    backgroundColor: '#40DF9F',
  },
  textInput: {
    color: '#96A7AF',
    width: '90%',
    backgroundColor: '#30444E',
    height: '120%',
    borderRadius: 8,
    paddingLeft: 10,
  },
  userIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 197, 66, 0.3)',
    borderRadius: 8,
    marginRight: 15,
  },
  lockIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 87, 95, 0.3)',
    borderRadius: 8,
    marginRight: 15,
  },
  inputView: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 48,
  },
  subHeader: {
    color: '#96A7AF',
    fontSize: 24,
    marginBottom: 50,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#40DF9F',
  },
});
