const generateHash = require('random-hash');
const bcrypt = require('bcrypt');

//// CREATE
exports.createNewUser = (request, response, next) => {
    //// First, we check to see if the user already exists
    // Will succeed with no existing user 40% of the time, succeed with exisiting user 30% of the time,
    // and fail altogether 30%, to simulate successful / failed database insertion
    // checkIfUserExistsQuery(req.body.username, req.body.newPassword)
    dummyCheckIfUserExists()
    .then((response) => {
        if(response.result === true) {
            response.status(401).send({
                body: response.message,
            })
        } else {
            //// Here, we hash the user's password then upon successful hash, store
            //// the username and password to the database
            const password = request.body.password
            createHash(password)
                .then((hash) => {
                    const username = request.body.username
                    // Insert new user to database
                    // Will fail 50% of the time, to simulate successfull / failed database insertion
                    // createNewUserQuery(username, hash)
                    dummySubmitNewUser()
                    .then((response) => {
                        response.status(201).send({
                            body: response.message
                        })
                    })
                    .catch((error) => {
                        //// Send data to our third-party error logging service. It will look something like:
                        // Sentry.sendErrorMessage(error.error)

                        //// Pass the user's error message up the promise chain
                        throw new Error(error.message)
                    })
                })
                .catch((error) => {
                    response.status(500).send({
                        body: error
                    })
                })
        }
    })
    .catch((error) => {
        response.status(500).send({
            body: error.message
        })
    })
}

//// READ
exports.comparePasswords = (request, response, next) => {
    //// Here, we will make a request to our database for the stored hash
    //// of the account in question. For now, we use a random hash.
    // const storedHash = retrieveUserHashQuery(request.body.username, request.body.password)
    const storedHash = generateHash()

    compareHash(request.body.password, storedHash)
    .then((response) => {
        if (response === true) {
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
}

//// UPDATE
exports.updatePassword = (request, response, next) => {
    //// Request object: {username: x, oldPassword: y, newPassword: z}

    //// Compare oldPassword to stored hash. For now, storedHash is random
    // const storedHash = retrieveUserHashQuery(request.body.username, request.body.password)
    const storedHash = generateHash()

    compareHash(request.body.oldPassword, storedHash)
    .then((response) => {
        if (response === true) {
            // Update new user in database
            // Will fail 50% of the time, to simulate successful / failed database insertion
            // updateUserQuery(req.body.username, req.body.newPassword)
            dummyUpdateUser()
        } else {
            response.status(401).send({
                body: 'Update Unsuccessful - Passwords did not match'
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
}

//// DESTROY
exports.deleteUser = (request, response, next) => {
    //// Request object: {username: x, password: y}

    //// Compare password to stored hash. For now, storedHash is random
    // const storedHash = retrieveUserHashQuery(request.body.username, request.body.password)
    const storedHash = generateHash()

    compareHash(request.body.password, storedHash)
    .then((response) => {
        if (response === true) {
            // Delete user in database
            // Will fail 50% of the time, to simulate successful / failed database deletion
            // deleteUserQuery(username, newPassword)
            dummyDeleteUser()
        } else {
            response.status(401).send({
                body: 'Delete Unsuccessful - Passwords did not match.'
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

const dummyCheckIfUserExists = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random() < 0.3) {
            resolve({
                result: true, 
                message: 'This username is already in use'
            })
        } else if(Math.random() < 0.6) {
            reject({
                result: undefined,
                message: 'There was a problem server side...'
            })
        } else {
            resolve({
                result: false, 
                message: undefined
            })
        }
    }, 3000)
})

const dummySubmitNewUser = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random() < 0.5) {
            resolve({message: 'Account Successfully Created!'})
        } else {
            reject({message: 'There was a problem server side...'})
        }
    }, 3000)
})

const dummyUpdateUser = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random() < 0.5) {
            resolve({message: 'Account Successfully Updated!'})
        } else {
            reject({message: 'There was a problem server side...'})
        }
    }, 3000)
})

const dummyDeleteUser = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(Math.random() < 0.5) {
            resolve({message: 'Account Successfully Deleted!'})
        } else {
            reject({message: 'There was a problem server side...'})
        }
    }, 3000)
})