const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../config');

const hashPassword = (password) => {
    return crypto.createHash('md5')
        .update(password)
        .digest('hex');
};

function User(username, password, groups) {
    this.username = username;
    this.password = hashPassword(password);
    this.groups = groups;
    this.isLoggedIn = false;

    this.checkPassword = (password) => {
        return (this.password === hashPassword(password));
    };
}

const users = [
    new User('a', 'a', ['users', 'adm', 'sudo']),
];

const findUser = (username) => {
    return users.find((u) => u.username === username);
};

const authenticateUser = (username, password) => {
    const user = findUser(username);
    if (user) {
        if (user.checkPassword(password)) {
            user.isLoggedIn = true;
            return user;
        }
        user.isLoggedIn = false;
    }

    return null;
};

const createToken = (user) => {
    const payload = {
        username: user.username,
        groups: user.groups,
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '60m' });
};

const getTokenPayload = (token) => {
    try {
        if (token) {
            return jwt.verify(token, config.jwtSecret);
        }
    } catch (err) {
    }

    return null;
};

const getTokenFromHeaders = (headers) => {
    if (headers && headers.authorization) {
        const parts = headers.authorization.split(' ');
        if ((parts.length === 2) && (parts[0] === 'Bearer')) {
            return parts[1];
        }
    }

    return null;
};

const getUsernameFromHeaders = (headers) => {
    const payload = getTokenPayload(getTokenFromHeaders(headers));
    if (payload) {
        return payload.username;
    }

    return null;
};

const getUsername = (headers, cookies) => {
    const username = getUsernameFromHeaders(headers);
    if (username) {
        return username;
    }

    if (cookies.auth) {
        return cookies.auth.username;
    }

    return null;
};

const logoutUser = (username) => {
    const user = findUser(username);
    if (user) {
        user.isLoggedIn = false;
    }
};

module.exports = {
    authenticate: (request, response, next) => {
        const username = getUsername(request.headers, request.cookies);
        const user = findUser(username);
        if (user && user.isLoggedIn) {
            next();
        } else {
            response.status(401)
                .json({ msg: 'Access denied' });
        }
    },
    validate: (request, headers, cookies) => {
        const username = getUsername(headers, cookies);
        const user = findUser(username);
        if (user && user.isLoggedIn) {
            return {
                response: {
                    msg: 'Validation successfull',
                    username: user.username,
                    groups: user.groups,
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
        const user = authenticateUser(request.username, request.password);
        if (user) {
            return {
                cookieName: 'auth',
                cookie: {
                    username: user.username,
                },
                response: {
                    msg: 'Login successfull',
                    groups: user.groups,
                },
            };
        }

        return {
            status: 401,
            response: {
                msg: 'invalid username or password',
            }
        };
    },
    token: (request) => {
        const user = authenticateUser(request.username, request.password);
        if (user) {
            return {
                response: {
                    msg: 'Login successfull',
                    token: createToken(user),
                }
            };
        }

        return {
            status: 401,
            response: {
                msg: 'invalid username or password',
            }
        };
    },
    logout: (request, headers, cookies) => {
        const username = getUsername(headers, cookies);
        logoutUser(username);
        return {
            cookieName: 'auth',
            response: {
                msg: 'Logout successfull',
            }
        };
    },
};
