var authState = false;
var username = '';

module.exports = {
    validate: (request) => {
        if (authState) {
            return {
                response: {
                    msg: 'Validation successfull',
                    username: username,
                    groups: [username, 'users', 'adm', 'sudo'],
                }
            };
        }
        return {
            status: 401,
            response: {
                msg: 'invalid authorization, please log in and try again',
            }
        };
    },
    login: (request) => {
        if (!(request.username) || !(request.password)
            || (request.username === 'invalid')
            || (request.password === 'invalid')) {
            authState = false;
            username = '';
            return {
                status: 401,
                response: {
                    msg: 'invalid username or password',
                }
            };
        }

        authState = true;
        username = request.username;
        return {
            response: {
                msg: 'Login successfull',
                groups: [username, 'users', 'adm', 'sudo'],
            }
        };
    },
    logout: (request) => {
        authState = false;
        username = '';
        return {
            response: {
                msg: 'Logout successfull',
            }
        };
    },
};
