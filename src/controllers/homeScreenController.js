import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { getSymbolPrice } from '../api/finnhubNetwork';

export const handleLogOut = async (navigation) => {
  try {
    await firebase.auth().signOut();
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      console.log(e);
      alert('Failed to clear the async storage.');
    }
    console.log('Logout successful');
    navigation.navigate('LoginScreen');
  } catch (error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Error>>', errorMessage);
  }
};

export const getUserPortfolio = async (user) => {
  console.log('🟠 getUserPortfolio pinged!');
  let portfolioPL = [];
  try {
    (async () => {
      await user.portfolio.forEach(async (item) => {
        //search API for item
        const quote = await getSymbolPrice(item.symbol);
        //calculate P/L using average price
        const profitOrLoss = quote.c - item.avgPrice;

        //create object and push to userPL array
        const portfolioItem = {
          symbol: item.symbol,
          numShares: item.numShares,
          avgPrice: item.avgPrice,
          currentPrice: quote.c,
          PL: profitOrLoss,
        };
        portfolioPL.push(portfolioItem);
      });
    })();

    console.log('Portfolio generated:', portfolioPL);
    return portfolioPL;
  } catch (e) {
    console.log('Error getting Portfolio:', e);
  }
};

export const formatMoney = (amt) => {
  const rounded = amt?.toFixed(2);
  const formatted = rounded?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatted;
};

export const getPortfolioStats = (portfolio) => {
  console.log('🔵 getPorfolioStats pinged!');
  let sumOfAllAvgPrice = 0;
  let sumOfAllCurrentPrice = 0;

  portfolio.forEach((item) => {
    sumOfAllCurrentPrice += item.currentPrice * item.numShares;
    sumOfAllAvgPrice += item.avgPrice * item.numShares;
  });

  console.log('sum of avg prices', sumOfAllAvgPrice);
  console.log('sum of current prices', sumOfAllCurrentPrice);

  const PLpercent = (
    (1 - sumOfAllAvgPrice / sumOfAllCurrentPrice) *
    100
  ).toFixed(2);

  const portfolioStats = {
    marketValue: formatMoney(sumOfAllCurrentPrice),
    totalPLpercent: PLpercent,
    totalPLdollars: formatMoney(sumOfAllCurrentPrice - sumOfAllAvgPrice),
  };

  console.log('portfolioStats Obj>>>>>', portfolioStats);
  return portfolioStats;
};
