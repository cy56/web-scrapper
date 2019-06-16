const db = require('../config/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = db.user;

const CODE_PERFECT = 0;
const CODE_USER_NOT_EXISTS = 1;
const CODE_PASSWORD_NOT_MATCH = 2;
const CODE_USER_CREATE_FAILED = 3;
const CODE_SYSTEM_ERROR = 9;

//Login API
exports.login = async (req, res) => {
    try {
        errors = verifyLogin(req);

        if (errors.length > 1) {
            return res.status(403).json(errors);
        }

        let user = await getUser(req);

        if(user.code === CODE_USER_NOT_EXISTS) {
            return res.status(404).json(user);
        }

        if(user.code === CODE_PASSWORD_NOT_MATCH) {
            return res.status(401).json(user);
        }

        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json({ code: CODE_SYSTEM_ERROR, message: err.message });
    }
};

verifyLogin = (params) => {
    let { email, password } = params.body;
    let errors = [];

    if (!email || !password) {
        errors.push({ message: 'Please fill in all fields' });
    }

    return errors;
}

getUser = async (params) => {
    const { email, password } = params.body;

    user = await model.getUser({ email });

    if (!user) {
        return { code: CODE_USER_NOT_EXISTS, message: 'User does not exists' };
    }

    if (!verifyPassword(password, user.password)) {
        return { code: CODE_PASSWORD_NOT_MATCH, message: 'password does not match' };
    }

    return getToken(user);
};

getToken = (result) => {
    let token = jwt.sign(result, process.env.SECRET_KEY);
    let { id, firstname, lastname, email } = result;
    return { code: CODE_PERFECT, token, user: { id, firstname, lastname, email } };
};

verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

//Register API
exports.register = async (req, res) => {
    try {
        errors = verifyRegister(req);

        if (errors.length > 1) {
            return res.status(403).send(errors);
        }

        // Encrypt Password
        let hash = hashPassword(req.body.password);

        // Create User
        let user = await createUser(req, hash);

        if (user.code === CODE_USER_CREATE_FAILED) {
            return res.status(403).json(user);
        }

        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json({ code: CODE_SYSTEM_ERROR, message: err.message });
    }
};

verifyRegister = (params) => {
    let { firstname, lastname, email, password } = params.body;
    let errors = [];

    if (!firstname || !lastname || !email || !password) {
        errors.push({ message: 'Please fill in all fields' });
    }

    return errors;
}

createUser = async (params, password) => {
    const { firstname, lastname, email } = params.body;
    user = await model.createUser({ firstname, lastname, email, password });

    if (!user) {
        return { code: CODE_USER_CREATE_FAILED, message: 'User create failed' };
    }

    return getToken(user);
};

hashPassword = (password) => {
    return bcrypt.hashSync(password);
}