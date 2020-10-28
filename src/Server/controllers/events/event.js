const events = require('../../json/events.json');

exports.getAllEvents = (request, response, next) => {
	response.status(200).send({
        body: events,
    })
}

exports.getEvent = (request, response, next) => {
    response.status(200).send({
        body: events.events[request.params.id]
    })
}
