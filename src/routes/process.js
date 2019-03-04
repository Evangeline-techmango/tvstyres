const express = require('express');
const router = express.Router();

const userController = require('../controllers').user;

/*TVS static pages*/
router.get('/withWeighment',userController.withWeightment);
router.get('/weighBridgeProcess',userController.weighBridgeProcess);
router.get('/weighBridgeEmptyProcess',userController.weighBridgeEmptyProcess);
router.get('/unloadProcess',userController.unloadProcess);
router.get('/without_securityUnload',userController.securityUnload);
router.get('/without_storesUnload',userController.storesUnload);
router.get('/with_storesUnload',userController.wwstoresUnload);
router.get('/storeClearance',userController.storeClearance);
router.get('/withoutWeighment',userController.withoutWeightment);


module.exports =  router;
