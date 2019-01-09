'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
const errors = require('restify-errors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = restify.createServer();

/////
const privateKey = fs.readFileSync('./jwtRS256.key', 'utf8');
const publicKey = fs.readFileSync('./jwtRS256.key.pub', 'utf8');

app.pre(restify.plugins.pre.userAgentConnection());
/////

module.exports = app; // for testing

var config = {
    appRoot: __dirname, // required config
    swaggerSecurityHandlers: {
        JWT: function(req, res, apiKey, next) {
            try {
                jwt.verify(apiKey, publicKey);
                next();
            } catch (err) {
                next(new errors.UnauthorizedError());
            }
        }
    }
};

SwaggerRestify.create(config, function(err, swaggerRestify) {
    if (err) {
        throw err;
    }

    swaggerRestify.register(app);

    var port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerRestify.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }
});
