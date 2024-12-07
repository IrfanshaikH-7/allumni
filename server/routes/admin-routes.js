// routes/admin-routes.js
const express = require('express');
const { adminLogin, getAllUsers } = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/login', adminLogin); // Admin login
router.get('/users', authMiddleware, getAllUsers); // Protected route to get all users

module.exports = router;