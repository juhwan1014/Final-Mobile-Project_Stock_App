import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import base from '../styles/styles';
import { getUser } from '../../network';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import WatchlistItem from '../components/WatchlistItem';
import { Text } from 'react-native';

export default function WatchScreen({ navigation }) {
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  const [watchlistUpdated, setWatchlistUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      setWatchlistUpdated(false);
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          const uid = await AsyncStorage.getItem(keys[0]);
          const currentUser = await getUser(JSON.parse(uid));
          setUser(currentUser);
        }
      } catch (err) {
        console.log('Error Getting Data', err);
      }
    })();
  }, [isFocused, watchlistUpdated]);

  return (
    <SafeAreaView style={base.container}>
      {user.watchlist && user.watchlist.length > 0 && (
        <Text style={base.headingMd}>Stock Watchlist</Text>
      )}
      <WatchlistItem
        user={user}
        navigation={navigation}
        setWatchlistUpdated={setWatchlistUpdated}
      />
    </SafeAreaView>
  );
}
