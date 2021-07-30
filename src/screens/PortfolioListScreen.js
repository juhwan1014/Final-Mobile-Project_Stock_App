import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList, SafeAreaView, View, TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-elements';


const PortfolioListScreen = ({ route, navigation }) => {
  const userPortfolio = route.params;

  useEffect(() => {
    console.log('userPortfolio on portfolioList screen>>>>', userPortfolio);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Portfolio List</Text>
      <View style={styles.flatListContainer}>
      <FlatList
        data={userPortfolio}
        keyExtractor= {item => item.symbol}
        renderItem={({item}) =>{
          return <View style={styles.flatItem} flexDirection='row'>
            <Avatar
              rounded
              size="medium"
              title={item.symbol}
              titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
              backgroundColor="#FF565E"
              activeOpacity={0.7}
            />
            <Text style={styles.flatText}>Number of Shares: {item.numShares}</Text>

            <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => navigation.navigate('PortfolioDetailScreen', {avgPrice: item.avgPrice, numShares: item.numShares, symbol: item.symbol  })} 
            >
            <Text 
            style={styles.viewBtnText}
            
            >View</Text>
          </TouchableOpacity>
            </View>
        }}
        
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 40,
    backgroundColor: '#22343C',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
      },
  flatText:{
    color: 'white',
    fontSize: 20,
    paddingTop: 10,
    marginLeft: 10,
  },
  viewBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 30,
    backgroundColor: '#40DF9F',
    marginLeft: 10,
    marginTop:10,
  },
  viewBtnText: {
    fontWeight: 'bold',
    color: 'white',
  },
  flatListContainer: {
    padding: 10,
  },
  flatItem:{
    marginBottom: 10,
  }
});

export default PortfolioListScreen;
