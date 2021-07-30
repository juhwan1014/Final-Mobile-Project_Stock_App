const express = require('express');
const app = express();
const mongoDatabase = require('./database');
const makeUsersRouter = require('./routes/usersRouter');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({
    database,
  });
  app.use('/api/users', usersRouter);
});

const port = 3000;

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
