const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./usersModel');  
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const server = express();

const sessionConfig = {
    name: 'notsession',
    secret: 'before enlightenment, chop wood carry water. after enlightenment, chop wood carry water',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require('./dbconfig'),
        tablename: 'users',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    })
}

server.use(express.json());

server.get('/api/users', async (req, res) => {
    const users = await Users.getUsers();
    res.json(users);
})

server.post('/api/register', async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password)
    const newUser = await Users.createUser({
        username: user.username,
        password: hash,
    })
    res.json({ message: "New user created successfully"})
})

server.post('/api/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!`});
            } else {
                res.status(401).json({ message: "Invalid credentials"});
            }
        })
        .catch(error => {
            res.status(500).json({ error: error, message: "You shall not pass!" })
        })
})

server.delete('/api/users/:id', async (req, res) => {
    await Users.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully"})
})

module.exports = server;