const characters = require('../../json/events.json')

exports.getAllCharacters = (request, response, next) => {
	response.status(200).send({
        body: characters,
    })
}

exports.getCharacter = (request, response, next) => {
    response.status(200).send({
        body: characters.characters[request.params.id]
    })
}