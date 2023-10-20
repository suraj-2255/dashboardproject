const express = require('express')
const router = express.Router()
const logger = require('../middleware/logger')
const multer = require('multer')
const userValidation = require('../middleware/valiDation')
const authMiddleware = require('../middleware/auth')

const { userCreate, userDataGet, userExpUpdate, userLogin, userInfoUpdate, userDelete } = require('../Controller/userController')
const { forgetPassword, resetPassword } = require('../Controller/forgetPassword')
const { cardsDataHandler } = require('../Controller/dashboardController')
const { monthGET } = require('../Controller/monthController')
const { userGETData } = require('../Controller/monthControllerSec')
const { userListCreate, userListGet, userListUpdate, userListDelete } = require('../Controller/projectListController')
const { crateChartData, chartDataGET } = require('../Controller/dashChartController')
const { foundData } = require('../Controller/fourRoController')
const { product } = require('../Controller/productController')

router.use(logger)
// USER REGISTER PAGE
router.post('/user', userValidation, userCreate);
router.get('/userDataGet', userDataGet)
router.post('/userLogin', userLogin)
router.put('/user/userUpdate', authMiddleware, userExpUpdate)
router.put('/user/updateInfo', authMiddleware, userInfoUpdate)
router.delete('/user/delete', authMiddleware, userDelete)
// FORGET PASSWORD ROUTES

router.post('/user/forgetPassword', forgetPassword)
router.post('/user/resetPassword', resetPassword)

//first row
router.get("/cardsDataHandler", authMiddleware, cardsDataHandler)

// second row first chart
router.get('/monthGET', authMiddleware, monthGET)//month get api
// second row ka seond chart 
router.get('/userGETData', userGETData)

// third row employee list third row
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/userListCreate',upload.fields([{ name: 'cust', maxCount: 1 }, { name: "team", maxCount: 4 }]), userListCreate)
router.get('/userListGet', authMiddleware, userListGet)
router.put('/userListUpdate', authMiddleware, userListUpdate)
router.delete('/userListDelete', authMiddleware, userListDelete)

//fourth row first chart
router.post('/crateChartData', authMiddleware, crateChartData)// chart1 
router.get('/chartDataGET', authMiddleware, chartDataGET)//chart1 

//fourth row data
router.get('/foundData', foundData)

//fifth row
router.get('/product', product)


module.exports = router


