'use strict';

const jwt = require('jsonwebtoken');
const errors = require('restify-errors');
const fs = require('fs');
const getUser = require('../services/mockUserProvider');

const privateKey = fs.readFileSync('./jwtRS256.key', 'utf8');

const getToken = user => {
    return jwt.sign(
        {
            userId: user.id,
            username: user.username
        },
        privateKey,
        { expiresIn: 3600, algorithm: 'RS256' }
    );
};

const login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        throw new errors.BadRequestError('Error. Please provide username and password');
    }

    getUser(req.body.username, req.body.password)
        .then(user => {
            return res.send(200, { access_token: getToken(user) });
        })
        .catch(e => {
            return next(new errors.UnauthorizedError('User not found'));
        });
};

module.exports = { login };
