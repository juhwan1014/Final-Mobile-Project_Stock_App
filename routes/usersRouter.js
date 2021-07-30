const express = require('express');

module.exports = function ({ database }) {
  const router = express.Router();

  //========= REGISTER USER ========== //
  router.post('/', async (req, res) => {
    const { uid } = req.body;
    console.log('reached router with uid>>', uid);

    try {
      const user = await database.insertUser(uid);
      res.send({ user });
    } catch (err) {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  //========= LOGIN USER ========== //
  // /api/users
  router.get('/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
      const user = await database.getUser(uid);
      res.send({ user });
    } catch (err) {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  //========= MARKET BUY ========== //
  // /api/users/:uid/buy

  router.post('/:uid/buy', async (req, res) => {
    const { uid } = req.params;
    const data = req.body;
    console.log('data in router>>>', data);
    try {
      const updatedUser = await database.makeMarketBuy({ uid, data });
      res.send({ updatedUser });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  //========= MARKET SELL ========== //
  // /api/users/:uid/sell

  router.put('/:uid/sell', async (req, res) => {
    const { uid } = req.params;
    const data = req.body;
    console.log('data in router>>>', data);
    try {
      const updatedUser = await database.makeMarketSell({ uid, data });
      res.send({ updatedUser });
    } catch {
      console.log(err);
      res.status(401).send({ Error: err.message });
    }
  });

  //========= ADD TO WATCHLIST ========== //
  // /api/users/watchlist/:uid/add

  router.put('/watchlist/:uid/add', async (req, res) => {
    const { uid, symbol, price } = req.body;
    try {
      const updatedUser = await database.addToWatchlist({ uid, symbol, price });
      res.send({ updatedUser });
    } catch (err) {
      console.log(err);
    }
  })

    //========= REMOVE FROM WATCHLIST ========== //
    // /api/users/watchlist/:uid/remove

    router.put('/watchlist/:uid/remove', async (req, res) => {
      const { uid, symbol, price } = req.body;
      try {
        const updatedUser = await database.removeFromWatchlist({ uid, symbol, price });
        res.send({ updatedUser });
      } catch (err) {
        console.log(err);
      }
    })

  // DESTROY

  return router;
};
