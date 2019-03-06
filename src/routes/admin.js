const express = require('express');
const router = express.Router();

const adminController = require('../controllers').admin;
const userController = require('../controllers').user;

router.post('/RoleList',adminController.create);
router.get('/DeleteRole',adminController.delete);
router.get('/list',adminController.list);
router.get('/dashboard',userController.dashboard);
router.get('/userList',userController.userList);

module.exports = router;