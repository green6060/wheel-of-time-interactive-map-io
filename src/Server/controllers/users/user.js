const generateHash = require('random-hash');
const bcrypt = require('bcrypt');
const User = require('../../models/user')

//// CREATE
exports.createNewUser = (request, response, next) => {
    // First, we check to see if the user already exists, then save
    // the username / hashed password to the server
    createHash(request.body.newPassword)
    .then((hash) => {
        const newUser = new User(request.body.email, hash)
        newUser.save()
        .then((res) => {
            response.status(200).send({
                body: res.message,
            })
        })
        .catch((err) => {
            response.status(401).send({
                body: err.message,
            })
        })
    })
    .catch((error) => {
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error)

        //// Send an error response
        response.status(424).send({
            body: 'There was an error hashing your password'
        })
    })
}

//// READ
exports.comparePasswords = (request, response, next) => {
    //// Here, we will make a request to our database for the stored hash
    //// of the account in question. For now, we use a simple Javascript 
    //// class to store user information
    User.fetchUserHash(request.body.email)
    .then((res) => {
        compareHash(request.body.password, res.storedPasswordHash)
        .then((res) => {
            if (res === true) {
                response.status(200).send({
                    body: 'Login Successful!',
                })
            } else {
                response.status(401).send({
                    body: 'Login Unsuccessful - Passwords did not match'
                })
            }
        })
        .catch((error) => {
            //// Send data to our third-party error logging service. It will look something like:
            // Sentry.sendErrorMessage(error.error)

            //// Send an error response
            response.status(500).send({
                body: error.message
            })
        })
    })
    .catch((error) => {
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error.error)

        //// Send an error response
        response.status(404).send({
            body: error.message
        })
    })
}

//// UPDATE
exports.updatePassword = (request, response, next) => {
    //// Request object: {email: x, oldPassword: y, newPassword: z}

    User.fetchUserHash(request.body.email)
    .then((res) => {
        compareHash(request.body.oldPassword, res.body)
        .then((response) => {
            if (response === true) {
                User.updateUserPassword(request.body.email, request.body.newPassword)
                .then((res)=>{
                    response.status(200).send({
                        body: res.message
                    })
                })
                .catch((err)=>{
                    response.status(404).send({
                        body: err.message
                    })
                })
            } else {
                response.status(401).send({
                    body: 'Update Unsuccessful - Passwords did not match'
                })
            }
        })
        .catch((error) => {
            ////// Hash Comparison failed - third-party error
            //// Send data to our third-party error logging service. It will look something like:
            // Sentry.sendErrorMessage(error.error)

            //// Send an error response
            response.status(500).send({
                body: error.message
            })
        })
    })
    .catch((error) => {
        ////// Email doesn't exist
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error.error)

        //// Send an error response
        response.status(404).send({
            body: error.message
        })
    })
}

//// DESTROY
exports.deleteUser = (request, response, next) => {
    //// Request object: {email: x, password: y}
    const email = request.body.email
    const password = request.body.password
    User.fetchUserHash(email)
    .then((res) => {
        compareHash(password, res.body)
        .then((response) => {
            if (response === true) {
                User.deleteUser(email)
                .then((res) => {
                    response.status(200).send({
                        body: res.message
                    })
                })
                .catch((err) => {
                    response.status(404).send({
                        body: err.message
                    })
                })
            } else {
                response.status(401).send({
                    body: 'Delete Unsuccessful - Passwords did not match'
                })
            }
        })
        .catch((err) => {
            ////// Hash Comparison failed - third-party error
            //// Send data to our third-party error logging service. It will look something like:
            // Sentry.sendErrorMessage(error.error)

            //// Send an error response
            response.status(424).send({
                body: err.message
            })
        })
    })
    .catch((error) => {
        ////// Email doesn't exist
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error.error)

        //// Send an error response
        response.status(404).send({
            body: error.message
        })
    })
}

const createHash = (password) => {
    const saltRounds = 10
    bcrypt.hash(password, saltRounds)
    .then((hash) => {
        return hash
    })
    .catch((error) => {
        throw new Error({
            // We will provide a user friendly error message
            message: 'There was an error processing your request. A notification has been sent to our development team!',
            // We will shield the user from error info directly from the third-party hashing service, and instead
            // save it in some kind of third-party error logging service, like Sentry
            error: error
        })
    })
}

const compareHash = (password, hash) => {
    bcrypt.compare(password, hash)
    .then((result) => {
        return result
    })
    .catch((error) => {
        throw new Error({
            // We will provide a user friendly error message
            message: 'There was an error processing your request. A notification has been sent to our development team!',
            // We will shield the user from error info directly from the third-party hashing service, and instead
            // save it in some kind of third-party error logging service, like Sentry
            error: error
        })
    })
}