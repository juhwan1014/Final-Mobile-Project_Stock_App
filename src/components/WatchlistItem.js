import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { removeFromWatchlist } from '../../network';
import { SafeAreaView } from 'react-native';
import base from '../styles/styles';

export default function WatchlistItem({
  navigation,
  user,
  setWatchlistUpdated,
}) {
  async function removeQuote(uid, symbol, price) {
    const response = await removeFromWatchlist({ uid, symbol, price });
    setWatchlistUpdated(true);
    console.log('Response From QLI:', response);
  }

  return (
    <SafeAreaView>
      {user.watchlist && user.watchlist.length > 0 ? (
        <FlatList
          data={user.watchlist}
          renderItem={({ item }) => {
            return (
              <View style={styles.listContainer}>
                <View style={styles.avatarTextContainer}>
                  <Avatar
                    rounded
                    size='medium'
                    title={item.symbol}
                    titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
                    backgroundColor='#FF565E'
                    activeOpacity={0.7}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.symbolText}>${item.price}</Text>
                  </View>
                </View>
                <View style={styles.btnView}>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() =>
                      removeQuote(user.uid, item.symbol, item.price)
                    }
                  >
                    <Text style={styles.viewBtnText}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() =>
                      navigation.navigate('BuySellScreen', {
                        symbol: item.symbol,
                        price: item.price,
                      })
                    }
                  >
                    <Text style={styles.viewBtnText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={base.headingMd}>Watchlist Is Empty</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnView: {
    display: 'flex',
    flexDirection: 'row',
  },
  listContainer: {
    height: 60,
    width: '100%',
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#B8C2C0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatarTextContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: '5%',
    justifyContent: 'center',
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
  },
  viewBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 30,
    backgroundColor: '#40DF9F',
    marginLeft: 10,
  },
  removeBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 30,
    backgroundColor: '#40DF9F',
  },
  viewBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
