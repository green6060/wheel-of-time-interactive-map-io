const bcrypt = require('bcrypt');
const User = require('../../models/user')

//// CREATE
exports.createNewUser = (request, response, next) => {
    // First, we check to see if the user already exists, then save
    // the username / hashed password to the server

    bcrypt.hash(request.body.password, 10)
    .then((hash) => {
        const newUser = new User({email: request.body.email, storedPasswordHash: hash})
        newUser.save()
        .then((res) => {
            response.status(200).send({
                data: res
            })
        })
        .catch((err) => {
            response.status(err.statusCode).send({
                data: err
            })
            
        })
    }).catch((err) => {
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error)

        //// Send an error response
        response.status(424).send({
            data: err
        })
    })
}

//// READ
exports.comparePasswords = (request, response, next) => {
    //// Here, we will make a request to our database for the stored hash
    //// of the account in question. For now, we use a simple Javascript 
    //// class to store user information
    const storedPasswordHash = User.fetchUserHash(request.data.email)
    .then((res) => {
        compareHash(request.data.password, storedPasswordHash)
        .then((res) => {
            if (res === true) {
                response.status(200).send({
                    data: 'Login Successful!',
                })
            } else {
                response.status(401).send({
                    data: 'Login Unsuccessful - Passwords did not match'
                })
            }
        })
        .catch((error) => {
            //// Send data to our third-party error logging service. It will look something like:
            // Sentry.sendErrorMessage(error.error)

            //// Send an error response
            response.status(500).send({
                data: error.message
            })
        })
    })
    .catch((error) => {
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error.error)

        //// Send an error response
        response.status(404).send({
            data: error.message
        })
    })
}

//// UPDATE
exports.updatePassword = (request, response, next) => {
    //// Request object: {email: x, oldPassword: y, newPassword: z}

    User.fetchUserHash(request.data.email)
    .then((res) => {
        compareHash(request.data.oldPassword, res.data)
        .then((response) => {
            if (response === true) {
                User.updateUserPassword(request.data.email, request.data.newPassword)
                .then((res)=>{
                    response.status(200).send({
                        data: res.message
                    })
                })
                .catch((err)=>{
                    response.status(404).send({
                        data: err.message
                    })
                })
            } else {
                response.status(401).send({
                    data: 'Update Unsuccessful - Passwords did not match'
                })
            }
        })
        .catch((error) => {
            ////// Hash Comparison failed - third-party error
            //// Send data to our third-party error logging service. It will look something like:
            // Sentry.sendErrorMessage(error.error)

            //// Send an error response
            response.status(500).send({
                data: error.message
            })
        })
    })
    .catch((error) => {
        ////// Email doesn't exist
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error.error)

        //// Send an error response
        response.status(404).send({
            data: error.message
        })
    })
}

//// DESTROY
exports.deleteUser = (request, response, next) => {
    //// Request object: {email: x, password: y}
    const email = request.data.email
    const password = request.data.password
    User.fetchUserHash(email)
    .then((res) => {
        compareHash(password, res.data)
        .then((response) => {
            if (response === true) {
                User.deleteUser(email)
                .then((res) => {
                    response.status(200).send({
                        data: res.message
                    })
                })
                .catch((err) => {
                    response.status(404).send({
                        data: err.message
                    })
                })
            } else {
                response.status(401).send({
                    data: 'Delete Unsuccessful - Passwords did not match'
                })
            }
        })
        .catch((err) => {
            ////// Hash Comparison failed - third-party error
            //// Send data to our third-party error logging service. It will look something like:
            // Sentry.sendErrorMessage(error.error)

            //// Send an error response
            response.status(424).send({
                data: err.message
            })
        })
    })
    .catch((error) => {
        ////// Email doesn't exist
        //// Send data to our third-party error logging service. It will look something like:
        // Sentry.sendErrorMessage(error.error)

        //// Send an error response
        response.status(404).send({
            data: error.message
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