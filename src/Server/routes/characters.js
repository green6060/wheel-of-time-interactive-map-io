const express = require('express');
const router = express.Router();
const { getAllCharacters, getCharacter } = require('../controllers/characters/character');

router.get('/api/characters', getAllCharacters);

router.get(`/api/characters/:id`, getCharacter);

module.exports = router;