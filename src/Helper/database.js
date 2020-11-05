const mongodb = require('mongodb')
const Client = mongodb.MongoClient

let _db;

const mongoConnect = callback => {
    Client.connect('mongodb+srv://Dallas:KqQwfWbM12yvJAyU@cluster0.rc7sl.mongodb.net/wheelOfTime?retryWrites=true&w=majority')
    .then(client => {
        _db = client.db();
        callback()
    })
    .catch((error) => {
        throw new Error(error)
    })
}

const getDb = () => {
    if(_db){
        return _db
    }
    throw new Error('No Database Found!')
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb;