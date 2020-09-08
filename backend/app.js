const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: 'https://bongjoi-twitter.ga',
      credentials: true,
    }),
  );
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      domain: process.env.NODE_ENV === 'production' && '.bongjoi-twitter.ga',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello express!');
});

// Routes
app.use('/post', require('./routes/post'));
app.use('/posts', require('./routes/posts'));
app.use('/user', require('./routes/user'));
app.use('/hashtag', require('./routes/hashtag'));

app.listen(4000, () => {
  console.log('서버 실행중...');
});
