const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'robDemGood';
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = async function () {
  await client.connect();

  const db = client.db(dbName);
  const Users = db.collection('users');

  //========= REGISTER USER ========== //

  async function insertUser(uid) {
    const user = await Users.findOne({ uid: uid });
    if (user) {
      throw Error('User already exists. Please try again.');
    }
    const newUser = await Users.insertOne({
      uid: uid,
      dateJoined: Date.now(),
      cash: 50000,
      watchlist: [],
      marketBuys: [],
      marketSells: [],
      portfolio: [],
    });
    console.log('new user in db.js', newUser.ops[0]);

    return newUser.ops[0];
  }

  //========= LOGIN USER ========== //
  async function getUser(uid) {
    const foundUser = await Users.findOne({ uid: uid });
    console.log('Found User:', foundUser);

    if (!foundUser) {
      throw Error('No user found!');
    }
    return foundUser;
  }

  //========= WATCHLIST ========== //
  async function addToWatchlist({ uid, symbol, price }) {
    const foundUser = await Users.findOne({ uid });
    const userWatchlist = foundUser.watchlist;

    if (!userWatchlist.some((stock) => stock.symbol === symbol)) {
      try {
        Users.updateOne({ uid }, { $push: { watchlist: { symbol, price } } });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Stock is already being watched!');
    }
  }

  async function removeFromWatchlist({ uid, symbol, price }) {
    try {
      Users.updateOne({ uid }, { $pull: { watchlist: { symbol, price } } });
    } catch (err) {
      console.log(err);
    }
  }

  //========= MARKET BUY ========== //
  async function getAveragePrice(user, symbol) {}

  async function makeMarketBuy({ uid, data }) {
    const { symbol, quotePrice, numShares } = data;

    try {
      //find user in db
      const user = await Users.findOne({ uid: uid });

      //check to see if enough funds
      const price = quotePrice * numShares;
      if (price > user.cash) {
        throw Error('Insufficient Funds');
      } else {
        user.cash -= price;
      }

      //add record to user's marketBuys array
      const transaction = {
        symbol,
        quotePrice,
        numShares,
        datePurchased: Date.now(),
      };
      user.marketBuys.push(transaction);

      //update user's portfolio (if symbol is not in portfolio,
      //add it; else update quantity of symbol in portfolio )
      let existingStock = null;

      if (user.portfolio.length > 0) {
        existingStock = user.portfolio.find((p) => {
          return p.symbol === symbol;
        });

        if (!existingStock) {
          user.portfolio.push({ symbol, numShares, avgPrice: quotePrice });
          console.log('adding new portfolio item!');
        } else {
          console.log('updating previous portfolio item!');
          user.portfolio.forEach((p) => {
            if (p.symbol === symbol) {
              p.numShares += numShares;
              //update average price
              const prevBuys = user.marketBuys.filter(
                (buy) => buy.symbol === symbol
              );
              console.log('prevBuys>>', prevBuys);
              let totalSpent = 0;
              prevBuys.forEach((buy) => {
                totalSpent += buy.numShares * buy.quotePrice;
              });
              console.log('totalSpent>>', totalSpent);
              p.avgPrice = totalSpent / p.numShares;
              console.log('updated average price', p.avgPrice);
              return;
            } else return;
          });
        }
      } else {
        console.log('no items in portfolio, adding one now!');
        user.portfolio.push({ symbol, numShares });
      }

      //Update user in database
      const updatedUser = await Users.findOneAndReplace({ uid: uid }, user, {
        returnOriginal: false,
      });
      console.log('UPDATED USER IN DB >>>', updatedUser.value);
      return updatedUser.value;
    } catch (e) {
      console.log('Error>>', e);
    }
  }

  //========= MARKET SELL ========== //
  async function makeMarketSell({ uid, data }) {
    const { symbol, quotePrice, numShares } = data;

    try {
      //find user in db
      const user = await Users.findOne({ uid: uid });

      //check to see user owns enough stocks
      let existingShares = null;

      existingShares = user.portfolio.find((s) => {
        return s.symbol === symbol;
      });

      if (!existingShares) {
        throw Error('You do not own this stock');
      }

      if (existingShares.numShares < numShares) {
        throw Error('Insufficient shares for this transaction');
      }
      //add to cash
      const price = numShares * quotePrice;
      user.cash += price;

      //add record to user's marketSells array
      const transaction = {
        symbol,
        quotePrice,
        numShares,
        dateSold: Date.now(),
      };
      user.marketSells.push(transaction);

      //update user's portfolio (if numShares for a symbol === 0, remove from portfolio )

      if (existingShares.numShares === numShares) {
        const updatedPortfolio = user.portfolio.filter((p) => {
          return p.symbol !== symbol;
        });
        user.portfolio = updatedPortfolio;
        console.log('Deleting item from portfolio!');
      } else {
        user.portfolio.forEach((p) => {
          if (p.symbol === symbol) {
            p.numShares -= numShares;
            console.log('Subtracting from shares owned!');
            return;
          }
        });
      }

      //Update user in database
      const updatedUser = await Users.findOneAndReplace({ uid: uid }, user, {
        returnOriginal: false,
      });
      console.log('UPDATED USER IN DATABASE>>', updatedUser);

      return updatedUser;
    } catch (e) {
      console.log('Error >>', e);
    }
  }

  return {
    insertUser,
    getUser,
    makeMarketBuy,
    makeMarketSell,
    addToWatchlist,
    removeFromWatchlist,
  };
};
