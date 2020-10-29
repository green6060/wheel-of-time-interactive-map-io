const users = []

module.exports = class User {
    constructor(userObject) {
        this.email = userObject.email
        this.storedPasswordHash = userObject.storedPasswordHash
    }

    doesUserExists() {
        return users.find(user => user.email === this.email) !== undefined
    }

    save(){
        const tryToSave = new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.doesUserExists === false){
                    users.push(this)
                    resolve({
                        body: true,
                        message: 'Account created Successfully!'
                    })
                } else {
                    reject({
                        body: false,
                        message: 'This email already exists!'
                    })
                }
            }, 300)
        })
        return tryToSave
    }

    static deleteUser = (email, password) =>  new Promise((resolve, reject) => {
        setTimeout(() => {
            const userId = users.findIndex((user) => user.email === email)
            if ( userId > -1 ) {
                // remove element at index userId
                users.splice(userId, 1);
                resolve({
                    body: true,
                    message: 'User successfully deleted'
                })
            } else {
                reject({
                    body: false,
                    message: 'The requested email does not exist'
                })
            }
        }, 300)
    })

    static updateUserPassword = (email, newPassword) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const userId = users.findIndex((user) => user.email === email)
            if ( userId > -1 ) {
                users[userId] = {email: email, storedPasswordHash: newPassword}
                resolve({
                    body: true,
                    message: 'Password successfully updated'
                })
            } else {
                reject({
                    body: false,
                    message: 'The requested email does not exist'
                })
            }
        }, 300)
    })

    static fetchAll = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            if(users.length > 0) {
                resolve({
                    body: users, 
                    message: 'Users successfully fetched'
                })
            } else {
                reject({
                    body: undefined, 
                    message: 'There are no users available'
                })
            }
        }, 300)
    })
    
    static fetchUser = (userEmail) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const searchedUser = users.find(user => user.email === userEmail)
            if(searchedUser !== undefined) {
                resolve({
                    body: searchedUser, 
                    message: 'User Successfully fetched'
                })
            } else {
                reject({
                    body: undefined, 
                    message: 'The requested user does not exist'
                })
            }
        }, 300)
    })

    static fetchUserHash = (userEmail) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const matchedUser = users.find(user => user.email === userEmail)
            if(matchedUser) {
                resolve({
                    body: matchedUser.storedPasswordHash, 
                    message: 'User hash successfully fetched'
                })
            } else {
                reject({
                    body: undefined,
                    message: 'The requested email does not exist'
                })
            } 
        }, 300)
    })
}