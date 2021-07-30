import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import base from '../styles/styles';
import QuoteListItem from '../components/QuoteListItem';
import { getSymbolPrice } from '../api/finnhubNetwork';
import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from '../../network';
import WatchlistItem from '../components/WatchlistItem';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [quote, setQuote] = useState({});
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  const [avatarTitle, setAvatarTitle] = useState('');
  const [watchlistUpdated, setWatchlistUpdated] = useState(false);

  const searchAPI = async () => {
    // GET QUOTE
    if (input) {
      const result = await getSymbolPrice(input);
      setQuote(result);
      setAvatarTitle(input);
    }
  };

  useEffect(() => {
    (async () => {
      setWatchlistUpdated(false);
      setQuote({});
      setInput('');
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
      console.log('Rendered');
    })();
  }, [watchlistUpdated, isFocused]);

  return (
    <View style={styles.container}>
      <SearchBar
        input={input}
        onInputChange={(newInput) => setInput(newInput.toUpperCase())}
        onInputSubmit={() => searchAPI()}
      />
      {Object.values(quote).length > 0 ? (
        <>
          <Text style={base.headingMd}>Search Result</Text>
          <QuoteListItem
            user={user}
            input={input}
            avatarTitle={avatarTitle}
            quote={quote}
            navigation={navigation}
            setWatchlistUpdated={setWatchlistUpdated}
          ></QuoteListItem>
        </>
      ) : (
        <>
          {user.watchlist && (
            <Text style={base.headingMd}>
              {user.watchlist.length > 0 && 'Watchlist Items'}
            </Text>
          )}
          <WatchlistItem
            user={user}
            navigation={navigation}
            setWatchlistUpdated={setWatchlistUpdated}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    flexDirection: 'column',
    backgroundColor: '#22343C',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default SearchScreen;
