const express = require('express');
const db = require('./models');

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/post', require('./routes/post'));
app.use('/user', require('./routes/user'));

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
