import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from '../../network';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login({ navigation }) {
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

  const onLoginPressed = async () => {
    if (!password || !email) {
      console.log('Please enter an email/password!');
      return;
    }

    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const userInfo = response.user.providerData[0];
      const userFromDb = await getUser(userInfo.uid);
      //console.log('user from firebase', userInfo);
      //console.log('user from db', userFromDb);
      // Sets user uid in async storage.
      await setAsyncItem('userId', userInfo.uid);

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

  useEffect(() => {
    (async () => {
      try {
        // await AsyncStorage.clear()
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          const uid = await AsyncStorage.getItem(keys[0]);
          const currentUser = await getUser(JSON.parse(uid));
          navigation.navigate('HomeScreen', currentUser);
        }
      } catch (err) {
        console.log('Error Getting Data', err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <MaterialCommunityIcons name='robber' size={50} color='white' />
      </View>
      <Text style={styles.header}>RobDemGood</Text>
      <Text style={styles.subHeader}>Sign in to continue</Text>
      <View style={styles.inputView}>
        <View style={styles.userIconContainer}>
          <FontAwesome name='user' color='#FFC542' size={20} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          placeholderTextColor='#96A7AF'
          onChangeText={(email) => setEmail(email)}
          value={email}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.lockIconContainer}>
          <FontAwesome name='unlock' color='#FF575F' size={20} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          placeholderTextColor='#96A7AF'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
          autoCapitalize='none'
          enablesReturnKeyAutomatically={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={onLoginPressed}>
          <Text style={styles.loginBtnText}>Sign in</Text>
          <FontAwesome
            name='arrow-right'
            color='white'
            size={20}
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
          style={styles.registerBtn}
        >
          <Text style={styles.registerBtnText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '100%',
    flex: 1,
    padding: 40,
    backgroundColor: '#22343C',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  loginBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
  registerBtnText: {
    fontWeight: 'bold',
    color: '#3DD598',
  },
  loginBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 60,
    marginBottom: 40,
    backgroundColor: '#40DF9F',
  },
  registerBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 60,
    backgroundColor: '#286053',
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
