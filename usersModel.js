const db = require('./dbconfig');

function getUsers() {
    return db('users')
}

function createUser(userDetails) {
    return db('users').insert(userDetails)
}

function deleteUser(id) {
    return db('users').where({ id }).del();
}

function findBy(filter) {
    return db('users').where(filter);
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    findBy,
}