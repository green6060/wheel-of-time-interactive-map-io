const express = require('express');
const router = express.Router();
const { createNewUser, comparePasswords, updatePassword, deleteUser } = require('../controllers/users/user');

//// CREATE
// Create new user
router.post('/api/user', createNewUser);

//// READ
// Verify Login
router.get('/api/user', comparePasswords);

//// UPDATE
// Update user information
router.put('/api/user', updatePassword)

//// DESTROY
// Delete user information
router.delete('/api/user', deleteUser)

module.exports = router;
