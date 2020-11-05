const { getDb } = require("../../Helper/database")

module.exports = class User {
    constructor(userObject) {
        this.email = userObject.email
        this.storedPasswordHash = userObject.storedPasswordHash
    }



    save () {
        return new Promise((resolve, reject) => {
            const db = getDb()
            db.collection('users').findOne({"email": this.email})
            .then(res => {
                console.log('success')
                res === null ? 
                    db.collection('users')
                    .insertOne(this)
                    .then(
                        resolve({
                            body: true,
                            statusCode: 200,
                            message: 'Account created Successfully!'
                        })
                    )
                    .catch(
                        reject({
                            body: false,
                            statusCode: 500,
                            message: 'There was a problem inserting the user into our database...'
                        })
                    )
                    :
                    reject({
                        body: false,
                        statusCode: 401,
                        message: 'This email already exists!'
                    })
            })
            .catch(err => {
                reject({
                    body: false,
                    statusCode: 500,
                    message: 'There was a problem searching for the user in our database...'
                })
            })
        })
    }

    // static deleteUser = (email, password) =>  new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         const userId = users.findIndex((user) => user.email === email)
    //         if ( userId > -1 ) {
    //             // remove element at index userId
    //             users.splice(userId, 1);
    //             resolve({
    //                 body: true,
    //                 message: 'User successfully deleted'
    //             })
    //         } else {
    //             reject({
    //                 body: false,
    //                 message: 'The requested email does not exist'
    //             })
    //         }
    //     }, 300)
    // })

    // static updateUserPassword = (email, newPassword) => new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         const userId = users.findIndex((user) => user.email === email)
    //         if ( userId > -1 ) {
    //             users[userId] = {email: email, storedPasswordHash: newPassword}
    //             resolve({
    //                 body: true,
    //                 message: 'Password successfully updated'
    //             })
    //         } else {
    //             reject({
    //                 body: false,
    //                 message: 'The requested email does not exist'
    //             })
    //         }
    //     }, 300)
    // })

    // static fetchAll = () => new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         if(users.length > 0) {
    //             resolve({
    //                 body: users, 
    //                 message: 'Users successfully fetched'
    //             })
    //         } else {
    //             reject({
    //                 body: undefined, 
    //                 message: 'There are no users available'
    //             })
    //         }
    //     }, 300)
    // })
    
    // static fetchUser = (userEmail) => new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         const searchedUser = users.find(user => user.email === userEmail)
    //         if(searchedUser !== undefined) {
    //             resolve({
    //                 body: searchedUser, 
    //                 message: 'User Successfully fetched'
    //             })
    //         } else {
    //             reject({
    //                 body: undefined, 
    //                 message: 'The requested user does not exist'
    //             })
    //         }
    //     }, 300)
    // })

    // static fetchUserHash = (userEmail) => new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         const matchedUser = users.find(user => user.email === userEmail)
    //         if(matchedUser) {
    //             resolve({
    //                 body: matchedUser.storedPasswordHash, 
    //                 message: 'User hash successfully fetched'
    //             })
    //         } else {
    //             reject({
    //                 body: undefined,
    //                 message: 'The requested email does not exist'
    //             })
    //         } 
    //     }, 300)
    // })
}