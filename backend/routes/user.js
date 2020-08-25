const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post, Image, Comment } = require('../models');

const router = express.Router();

// GET /user
// 로그인 또는 비로그인 정보 가져오기
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followings
// 팔로잉 불러오기
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followers
// 팔로워 불러오기
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/:userId
// 특정 유저 조회
router.get('/:userId', async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/:userId/posts
// 해당 유저의 게시글들 가져오기
router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/login
// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      try {
        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: Post,
              attributes: ['id'],
            },
            {
              model: User,
              as: 'Followings',
              attributes: ['id'],
            },
            {
              model: User,
              as: 'Followers',
              attributes: ['id'],
            },
          ],
        });
        return res.status(200).json(fullUserWithoutPassword);
      } catch (error) {
        console.error(error);
        next(error);
      }
    });
  })(req, res, next);
});

// POST /user
// 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const existsUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existsUser) {
      return res.status(409).send('이미 사용중인 아이디 입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user/logout
// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(204).end();
});

// PATCH /user/nickname
// 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      },
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /user/:userId/follow
// 팔로우
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/:userId/follow
// 언팔로우
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follower/:userId
// 팔로워 삭제
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자 입니다.');
    }
    await user.removeFollowers(req.params.userId);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
