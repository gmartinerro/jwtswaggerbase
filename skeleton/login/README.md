
# Restify/JWT/Swagger (nodejs) skeleton project

JWT security system is used as API Key due to swagger 2.0 spec limitations (*in OpenAPI 3.0 the "Bearer" security scheme will be used*). The JWT must be inserted as the `API-Key` header:

    API-Key: iOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJ1cnMiOjEsInVzZXJu...

The JWT signing is made with the help of a pair of RSA256 keys. To *regenerate* them, please run the `keygen.sh` command or, alternatively,  `npm run keygen`.

## Login endpoint
The spirit of this module is to ease the development of an API service using a JWT token for authorization/authentication. With it, you can build a set of microservices based on the same JWT token that can be provided by a login service, so the login endpoint should  be only provided by that login service.

To help building it, this module includes a login endpoint, but the idea is to **remove it**, and keep it only in the login service. 

Login endpoint relies on the `getUser` method defined in the `userProvider` module. Two kinds of userProvider are included to illustrate how to build the module under `/api/services` (please check the source files for more info on how to write your own provider):

### mockUserProvider
 A simple, static userProvider that serves a user with "*mockusername*", "*mockpassword*" credentials.
 
### mysqlUserProvider: 
A provider that relies on a mysql database to check credentials validity.

The second Initially it checks the existence of the user executing this SQL sentence:

    SELECT * from rest WHERE username='${name}' AND password='${password}'

Hence a "rest" table must exists in the database configured in `/api/services/mysqlPool.js`:

    CREATE TABLE `rest` (
      `id` int(11) unsigned NOT NULL DEFAULT '0',
      `username` varchar(11) DEFAULT NULL,
      `password` varchar(11) NOT NULL DEFAULT ''
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


## The `hello` endpoint
The "hello world"  swagger endpoint example is also included to help the development of new endpoints. However, this module is a simple complement to swagger/restify/jwt modules, so following the instructions of any of them must be more than enough to build your API. 

## JWT Token
The JWT token can include any object you want, and you are free to take advantage of it in you API code to ease any business logic. The `getToken` method in the login controller file (`/api/controllers/login.js`) describes how to build a token, and it simply includes the mandatory fields (expiration, privateKey, algorithm) and a custom object with both username and userId fields. Feel free to change them to fit your needs.

*Note: Check out the swagger command options for running, verifyng, etc. and swagger docs.*

## Scripts:
        Run service:                    npm start
        Run for development:            npm dev
        Run tests:                      npm test
        Build keys:						npm run keygen


> Written with [StackEdit](https://stackedit.io/).
