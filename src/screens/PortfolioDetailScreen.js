import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { makeMarketBuy, makeMarketSell } from '../../network';
import AsyncStorage from '@react-native-community/async-storage';
import { getUser } from '../../network';
import { getSymbolPrice } from '../api/finnhubNetwork';
import { useIsFocused } from "@react-navigation/native";

import axios from 'axios';
import { FINNHUB_API } from '@env';


const PortfolioDetailScreen = ({ route }) => {
  const isFocused = useIsFocused();
  const [price, setPrice]= useState('');
  const [user, setUser] = useState('');
  const { symbol, numShares, avgPrice } = route.params;
  const [shares, setShares]= useState(numShares)
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState('');
  const[PL, setPL] = useState('')
  const [minusBtn, setMinusBtn] = useState(false)
  const [myCash, setMyCash] = useState('')
  const [graphData, setGraphData] = useState([2, 4, 6, 7, 9, 4])

  const graphAPI = async () => {
   
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=1615298999&to=1615302599&token=${FINNHUB_API}`
      );
      console.log('API RESPONSE:', response.data.c);
      setGraphData(response.data.c);
    } catch (err) {
      console.log(err);
    }
  }
  
  
  
 
  const line = {
    datasets: [
      {
        // data: graph != null ? graph.o.slice(0,30) : [2, 4, 6, 7, 9, 4],
        data: graphData,
        color: (opacity = 1) => `rgba(255, 86, 94, ${opacity})`,
      },
    ],
  };
  
  const onBuyOrSellButtonClicked = async () => {
    const uid = user.uid;
    if (type === 'Buy') {
      const updatedUser = await makeMarketBuy({ symbol, price, count, uid }); //send to db
      console.log('UPDATED USER FROM BUY SCREEN >>>', updatedUser);
      setMyCash((myCash - total).toFixed(2))
      setShares(shares+count)
      setModalVisible(!modalVisible);
      setCount(1);
      setTotal(price);
      
    } else if (type === 'Sell') {
      const updatedUser = await makeMarketSell({ symbol, price, count, uid });
      console.log('UPDATED USER FROM SELL SCREEN >>>', updatedUser);
      setMyCash((myCash - -total).toFixed(2))
      setShares(shares-count)
      setModalVisible(!modalVisible);
      setCount(1);
      setTotal(price);
    }
  };
  
  const addButtonClicked = () => {
    setMinusBtn(false)
    const newCount = count + 1;
    const newTotal = total + price;
    setCount(newCount);
    setTotal(newTotal);
  };
  const minusButtonClicked = () => {
    if (count>=2){
      const newCount = count - 1;
      const newTotal = total - price;
      setCount(newCount);
      setTotal(newTotal);
    }
    else{
      setMinusBtn(true)
    }
  };
  
  useEffect(() => {
    (async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          const uid = await AsyncStorage.getItem(keys[0]);
          const currentUser = await getUser(JSON.parse(uid))
          setUser(currentUser)
          setMyCash(currentUser.cash)
        }
      } catch (err) {
        console.log('Error Getting Data', err);
      }
    })();
    (async () => {
      const result = await getSymbolPrice(symbol);
      setPrice(result.c);
      setTotal(result.c);
      const newpl = ((result.c/avgPrice)*100)-100
      setPL(newpl.toFixed(2))
    })();
    (async () => {
     await graphAPI()
    })();
  }, [isFocused]);
  
  const DisplayUserCash = () => {
    if (type == 'Buy') {
      return (
      <View style={styles.TextView}>
        <Text style={styles.modalText}>Cash </Text>
        <Text style={styles.modalText}>
          ${(myCash - total).toFixed(2)}
          </Text>
          </View>
          );
        }
        if (type == 'Sell') {
          return (
          <View style={styles.TextView}>
            <Text style={styles.modalText}>Cash </Text>
            <Text style={styles.modalText}>
              ${(myCash - -total).toFixed(2)}
              </Text>
              </View>
              );
            }
          };
          
          return (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <Text style={styles.text}>{symbol}</Text>
                <View>
                  <Text style={styles.priceHeader}> ${Number(price).toFixed(2)} </Text>
                  <Text style={styles.plHeader}> ({PL}%)</Text>
                  </View>
                  </View>
                  <View>
                    <LineChart
                    data={line}
                    width={Dimensions.get('window').width - 80}
                    height={220}
                    yAxisLabel='$'
                    chartConfig={{
                      backgroundColor: 'rgba(255, 86, 94, .2)',
                      backgroundGradientFrom: 'rgba(255, 86, 94, 1)',
                      backgroundGradientTo: 'rgba(255, 86, 94, 1)',
                      backgroundGradientFromOpacity: .2,
                      backgroundGradientToOpacity: .2,
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    style={{
                      marginVertical: '5%',
                      borderRadius: 16,
                    }}
                    />
                    </View>
                    <View style={styles.portfolioContainer}>
                      <View style={styles.portfolioTextContainer}>
                        <Text style={styles.portfolioItem}>Shares:</Text>
                        <Text style={styles.portfoliotext}> {shares}</Text>
                        </View>
                        <View style={styles.portfolioTextContainer}>
                          <Text style={styles.portfolioItem}>Average Price:</Text>
                          <Text style={styles.portfoliotext}>{Number(avgPrice).toFixed(2)}</Text>
                          </View>
                          <View style={styles.portfolioTextContainer}>
                            <Text style={styles.portfolioItem}>Total Value: </Text>
                            <Text style={styles.portfoliotext}>{(numShares*price).toFixed(2)}</Text>
                            </View>
                            </View>
                            <View style={styles.cashContainer}>
                              <Text style={styles.Cashtext}>My Cash</Text>
                              <Text style={styles.Cashtext}>${Number(myCash).toFixed(2)}</Text>
                              </View>
                              <Modal
                              animationType='slide'
                               transparent={false}
                               opacity={0.5}
                               visible={modalVisible}
                               backdropOpacity={0.5}
                               onRequestClose={() => {
                                 setModalVisible(!modalVisible);
                                }}
                                >
                                  <View style={styles.centeredView}>
                                    <View style={styles.modalView} backdropOpacity={0.5}>
                                      <View style={styles.TextView}>
                                        <Text style={styles.modalText}>{type}</Text>
                                        <Text style={styles.modalText}>{Number(total).toFixed(2)}</Text>
                                        </View>
                                        <View style={styles.TextView}>
                                          <Text style={styles.modalText}>Qty</Text>
                                          <TouchableOpacity
                                          style={styles.qtyBtn}
                                          onPress={addButtonClicked}
                                          >
                                            <FontAwesome name='plus-circle' size={30} color='white' />
                                            </TouchableOpacity>
                                            <Text style={styles.modalText}>{count}</Text>
                                            <TouchableOpacity
                                            style={styles.qtyBtn}
                                            disabled={minusBtn}
                                            onPress={minusButtonClicked}
                                            >
                                              <FontAwesome name='minus-circle' size={30} color='white' />
                                              </TouchableOpacity>
                                              </View>
                                              {DisplayUserCash()}
                                              <View style={styles.sellBuyBtnContainer}>
                                                <TouchableOpacity
                                                style={[styles.buyBtn, styles.btn]}
                                                onPress={onBuyOrSellButtonClicked}
                                                >
                                                  <Text style={styles.textStyle}>{type}</Text>
                                                  </TouchableOpacity>
                                                  <TouchableOpacity
                                                  style={[styles.closeBtn, styles.btn]}
                                                  onPress={() => {
                                                    setModalVisible(!modalVisible);
                                                    setCount(1);
                                                    setTotal(price);
                                                  }}
                                                  >
                                                    <FontAwesome name='close' size={40} color='white' />
                                                    </TouchableOpacity>
                                                    </View>
                                                    </View>
                                                    </View>
                                                    </Modal>
                                                    <View style={styles.btnContainer}>
                                                      <Text style={styles.text}>Buy</Text>
                                                      <TouchableOpacity
                                                      style={[styles.buyBtn, styles.btn]}
                                                      onPress={() => {
                                                        setModalVisible(true);
                                                        setType('Buy');
                                                      }}
                                                      >
                                                        <FontAwesome name='arrow-down' size={40} color='white' />
                                                        </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.btnContainer}>
                                                          <Text style={styles.text}>Sell</Text>
                                                          <TouchableOpacity
                                                          style={[styles.sellBtn, styles.btn]}
                                                          onPress={() => {
                                                            setModalVisible(true);
                                                            setType('Sell');
                                                          }}
                                                          >
                                                            <FontAwesome name='arrow-up' size={40} color='white' />
                                                            </TouchableOpacity>
                                                            </View>
                                                            </View>
                                                            </ScrollView>
                                                            );
                                                          };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '10%',
    flexDirection: 'column',
    backgroundColor: '#22343C',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
  },
  Cashtext: {
    color: 'rgba(255, 197, 66, 1)',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
  },
  priceHeader: {
    color: '#3DD598',
    fontSize: 35,
  },
  plHeader:{
    color: '#FFC542',
    fontSize: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: '#30444E',
    borderRadius: 16,
    justifyContent: 'space-between',
    padding: '7%',
    marginVertical: '4%',
  },
  portfolioContainer:{
    backgroundColor: 'rgba(61, 213, 152, .2)',
    borderRadius: 16,
    padding: '7%',
    marginVertical: '4%',
    // alignItems:'center'
  },
  portfolioTextContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between'
  },

  cashContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4%',
    borderRadius: 16,
    padding: '7%',
    backgroundColor:'rgba(255, 197, 66, .2)'
  },

  portfolioItem:{
    fontSize: 25,
    color: 'rgba(61, 213, 152, 1)',
  },
  portfoliotext:{
    fontWeight: 'bold',
    fontSize: 25,
    color: 'rgba(61, 213, 152, 1)',
  },
  btn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 55,
    marginLeft: '10%',
  },
  buyBtn: {
    backgroundColor: '#FF565E',
  },
  sellBtn: {
    backgroundColor: '#FFC542',
  },
  closeBtn: {
    backgroundColor: '#3DD598',
  },
  qtyBtn: {
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#22343C',
  },
  modalView: {
    margin: 20,
    width: '80%',
    height: '60%',
    backgroundColor: '#30444E',
    borderRadius: 20,
    padding: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  TextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4%',
  },
  sellBuyBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
export default PortfolioDetailScreen;
