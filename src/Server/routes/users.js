const express = require('express');
const { createNewUser, comparePasswords, updatePassword, deleteUser } = require('../controllers/users/user');

const router = express.Router;

//// CREATE
// Create new user
// ** Will fail 50% of the time at dummySubmitNewUser, to simulate successfull / failed database insertion
router.post('/api/user', createNewUser);

//// READ
// Verify Login
// ** Will almost always return false for now. Stored Hash is random **
router.get('/api/user', comparePasswords);

//// UPDATE
// Update user information
// ** Will almost always return false for now. Stored Hash is random **
router.put('/api/user', updatePassword)

//// DESTROY
// Delete user information
// ** Will almost always return false for now. Stored Hash is random **
router.delete('/api/user', deleteUser)
