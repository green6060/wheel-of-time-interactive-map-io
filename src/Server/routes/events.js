const express = require('express');

const router = express.Router
const { getAllEvents, getEvent } = require('./controllers/events/event');

router.get('/api/events', getAllEvents);

router.get(`/api/events/:id`, getEvent);

module.exports = router;
