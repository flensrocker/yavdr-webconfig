function User(username, password, groups) {
    this.username = username;
    this.password = password;
    this.groups = groups;
}

var theUser = undefined;

module.exports = {
    authenticate: (request, response, next) => {
        if (theUser instanceof User) {
            next();
        } else {
            response.status(401)
                .json({ msg: 'Access denied' });
        }
    },
    validate: (request) => {
        if (theUser instanceof User) {
            return {
                response: {
                    msg: 'Validation successfull',
                    username: theUser.username,
                    groups: theUser.groups,
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
            || (request.username !== request.password)
            || (request.username === 'invalid')
            || (request.password === 'invalid')) {
            theUser = undefined;
            return {
                status: 401,
                response: {
                    msg: 'invalid username or password',
                }
            };
        }

        theUser = new User(request.username, request.password, ['users', 'adm', 'sudo']);
        return {
            response: {
                msg: 'Login successfull',
                groups: theUser.groups,
            }
        };
    },
    logout: (request) => {
        theUser = undefined;
        return {
            response: {
                msg: 'Logout successfull',
            }
        };
    },
};
