import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import base from '../styles/styles';
import { StyleSheet, Text, View } from 'react-native';
import UserModal from '../components/UserModal';
import {
  Foundation,
  FontAwesome5,
  Feather,
  FontAwesome,
} from '@expo/vector-icons';
import {
  handleLogOut,
  getUserPortfolio,
  formatMoney,
  getPortfolioStats,
} from '../controllers/homeScreenController';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState({});

  const data = [
    {
      name: 'AAPL',
      population: 35,
      color: '#3DD598',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'TSLA',
      population: 40,
      color: '#FF575F',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
    {
      name: 'IBM',
      population: 10,
      color: '#FFC542',
      legendFontColor: 'white',
      legendFontSize: 15,
    },
  ];

  useEffect(() => {
    (async () => {
      const portfolioPL = await getUserPortfolio(user);
      setUserPortfolio(portfolioPL);
      // const stats = getPortfolioStats(userPortfolio);
      // setPortfolioStats(stats);
    })();
  }, []);

  useEffect(() => {
    const stats = getPortfolioStats(userPortfolio);
    setPortfolioStats(stats);
  }, []);

  return (
    <>
      <UserModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        handleLogOut={handleLogOut}
        user={user}
        navigation={navigation}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.userIconContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.userIcon}
            >
              <FontAwesome name='user' color='white' size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={base.headingLg}>Your Portfolio</Text>
          </View>
          {/* ========== SUMMARY ========= */}
          <View style={styles.summaryContainer}>
            {/* <View style={styles.summaryGraph}></View> */}
            <View>
              <Text style={base.headingSm}>Summary</Text>
            </View>
            <PieChart
              data={data}
              width={Dimensions.get('window').width * 0.8}
              height={150}
              chartConfig={{
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              center={[0, 0]}
              absolute
            />
          </View>
          {/* ========== P&L  ========= */}
          <View style={styles.pmContainer}>
            <View style={styles.PL}>
              <Text style={{ color: 'white', marginBottom: '10%' }}>
                <Foundation name='graph-trend' size={24} color='white' /> Profit
                &amp; Loss
              </Text>
              <Text style={styles.headingSm}>P &amp; L Day</Text>
              <Text style={styles.whiteText}>
                ${portfolioStats.totalPLdollars} CAD
              </Text>
              <View style={styles.percentContainer}>
                <Text style={styles.percentText}>
                  {portfolioStats.totalPLpercent > 1 ? (
                    <Feather name='arrow-up-circle' size={24} color='white' />
                  ) : (
                    <Feather
                      name='arrow-down-circle'
                      size={24}
                      color='#FF575F'
                    />
                  )}{' '}
                  {portfolioStats.totalPLpercent}%
                </Text>
              </View>
            </View>
            {/* ========== MARKET ========= */}
            <View style={styles.marketValue}>
              <Text style={{ color: 'white', marginBottom: '10%' }}>
                <FontAwesome5 name='money-check-alt' size={16} color='white' />{' '}
                Total Equity
              </Text>
              <Text style={styles.headingSm}>Market Value</Text>
              <Text style={styles.whiteText}>
                ${portfolioStats.marketValue} CAD
              </Text>
              <Text style={styles.headingSm}>Cash</Text>
              <Text style={styles.whiteText}>${formatMoney(user?.cash)}</Text>
            </View>
          </View>
          {/* ========== See Portfolio ========= */}

          <View style={styles.portfolioContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PortfolioListScreen', userPortfolio);
              }}
            >
              <Text style={base.headingSm}>See Portfolio Items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
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
    minHeight: '100%',
  },
  scrollView: {
    margin: 0,
    padding: 0,
    width: '100%',
    paddingVertical: 0,
  },
  userIconContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  summaryContainer: {
    width: '100%',
    padding: 5,
    backgroundColor: '#30444E',
    borderRadius: 30,
    // height: '30%',
    marginBottom: 15,
  },
  summaryGraph: {
    backgroundColor: '#FF575F',
    height: '100%',
    width: '35%',
    borderRadius: 50,
  },
  pmContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  PL: {
    backgroundColor: '#3DD598',
    height: '100%',
    width: '45%',
    padding: 20,
    borderRadius: 15,
  },
  percentContainer: {
    height: '35%',
    flex: 1,
    justifyContent: 'center',
  },
  percentText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 18,
  },
  marketValue: {
    backgroundColor: '#FFC542',
    height: '100%',
    width: '45%',
    padding: 20,
    borderRadius: 15,
  },
  headingSm: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
    margin: '5%',
  },
  portfolioContainer: {
    width: '100%',
    padding: 4,
    flexDirection: 'row',
    backgroundColor: '#96A7AF',
    borderRadius: 30,
    height: '8%',
    marginBottom: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
  whiteText: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
});

export default HomeScreen;
