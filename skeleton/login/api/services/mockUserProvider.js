/*
    Since the login API method expects a promise returned by the "getUser"
    method, every user providing method should be written as an async function
    even if the method can be run synchronously.
    
    The getUser function should return the user object, or throw an
    exception in case of error (like wrong credentials)

    The login API endpoint catches the exception ands raises an
    UnauthorizedError exception, to return a 401 HTTP code.
*/
const getUserSimple = async (username, password) => {
    if (username === 'mockuser' && password === 'mockpassword') return { id: 1, username: 'gmartin' };
    throw new Exception();
};

/*
    The UserProvider module should return an async function for 
    the login API endpoint.
*/
module.exports = getUserSimple;
