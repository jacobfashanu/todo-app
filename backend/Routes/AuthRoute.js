const { Signup, Login, userProfile, updateProfile } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification, userProfile);
router.patch('/', userVerification, updateProfile);


module.exports = router