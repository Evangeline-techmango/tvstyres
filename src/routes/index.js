var express = require('express');
var passport = require('passport');
require('../config/passport')(passport);
var router = express.Router();

const userController = require('../controllers').user;
const profileController = require('../controllers').profile;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.ejs', { title: 'Express' });
});

router.get('/api/user',userController.list);
router.get('/api/user/:id',userController.getById);
router.post('/api/signup',passport.authenticate('jwt',{session:false}),userController.add);
router.post('/api/login',userController.login);
router.put('/api/user/:id',userController.update);
router.delete('/api/user/:id',userController.delete);
router.get('/profile',userController.about);
router.get('/tables',userController.grid);
router.post('/addCountry',userController.insertCountry);
router.get('/allCountries',userController.getCountry);



router.get('/login',userController.signin);
router.get('/signup',userController.signup);


getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


module.exports = router;
