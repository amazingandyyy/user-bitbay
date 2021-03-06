var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Post = require('../models/post');
var moment = require('moment');

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        res.status(err ? 400 : 200).send(err || users);
    });
});
router.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        res.status(err ? 400 : 200).send(err || posts);
    }).populate('user');
});

//   /api/users/register
router.post('/register', (req, res) => {
    console.log(req.body);
    User.register(req.body, err => {
        res.status(err ? 400 : 200).send(err);
    });
});
router.post('/:id/post', (req, res) => {
    var userId = req.params.id;
    var postObj = req.body;
    // console.log('postObj: ', req.body);
    // console.log('user: ', req.params);
    var deadline = moment();
    var deadlineM = deadline.valueOf(postObj.deadline);
    console.log('deadlineM: ', deadlineM);
    var postDetails = {
        user: userId,
        name: postObj.name,
        description: postObj.description,
        image: postObj.image,
        price: postObj.price,
        deadline: deadlineM
    }
    console.log('postDetails: ', postDetails);
    Post.post(postDetails, (err, postDetails)  => {
        res.status(err ? 400 : 200).send(err || postDetails);
    });
});
router.put('/:userId/like/:postId', (req, res) => {
    var userId = req.params.userId;
    var postId = req.params.postId;
    console.log('userId: ', userId);
    console.log('postId: ', postId);
    Post.liked(userId, postId, err => {
        res.status(err ? 400 : 200).send(err);
    });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    User.authenticate(req.body, (err, data) => {
        if (err) return res.status(400).send(err);
        res.cookie('accessToken', data.token).send(data.dbUser);
    });
});

router.delete('/logout', (req, res) => {
    res.clearCookie('accessToken').send();
});

// /api/users/profile
router.get('/profile/own', User.isLoggedIn, (req, res) => {
    console.log('req.user:', req.user);
    res.send(req.user);
})
router.put('/profile/own', User.isLoggedIn, (req, res) => {
    console.log('req.body: ', req.body);
    var userObj = req.body
    User.findByIdAndUpdate(userObj._id, userObj)
        .exec((err, user) => {
            res.status(err ? 400 : 200).send(err || user);
        });
})

router.get('/profile/:id', (req, res) => {
    // console.log('ddd');
    console.log('req: ', req.params);
    var userId = req.params.id;
    console.log(userId);
    User.findById(userId)
        .exec((err, user) => {
            res.status(err ? 400 : 200).send(err || user);
        });
})

module.exports = router;
