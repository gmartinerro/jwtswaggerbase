const privateKey = require('fs').readFileSync('./jwtRS256.key', 'utf8');

const apiKey = require('jsonwebtoken').sign(
    {
        userId: '0',
        username: 'mock'
    },
    privateKey,
    { expiresIn: 300, algorithm: 'RS256' }
);
module.exports = apiKey;
