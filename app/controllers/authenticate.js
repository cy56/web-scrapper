const db = require('../config/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = db.user;

const CODE_PERFECT = 0;
const CODE_USER_NOT_EXISTS = 1;
const CODE_PASSWORD_NOT_MATCH = 2;
const CODE_USER_CREATE_FAILED = 3;
const CODE_BAD_REQUEST = 4;
const CODE_SYSTEM_ERROR = 9;

class Authenticate {

    constructor(request) {
        this.request = request;
    }

    async login() {
        try {
            let { email, password } = this.request.body;
            
            if(!email || !password) {
                return { status: 400, message: this.getMessage(CODE_BAD_REQUEST) };
            }

            return await this.verifyUser({ email, password });

        } catch(err) {
           return { status: 500, message: this.getMessage(CODE_SYSTEM_ERROR) };
        }
    }

    async register() {
        try {
           let { firstname, lastname, email, password } = this.request.body;

            if (!firstname || !lastname || !email || !password ) { 
                return { status: 400, message: this.getMessage(CODE_BAD_REQUEST) };
            }

            // Encrypt Password
            let hash = this.hashPassword(password);
            
            return await this.createUser({ firstname, lastname, email, password: hash });

        } catch (err) {
            console.log(err.message);
            return { status: 500, message: this.getMessage(CODE_SYSTEM_ERROR) };
        }
    }

    async verifyUser(params = { email:null, password:null }) {
        let { email, password } = params;

        let user = await model.getUser({ email });

        if (!user) {
            return { status: 404, message: this.getMessage(CODE_USER_NOT_EXISTS) };
        }
        
        if (!this.verifyPassword(password, user.password)) {
            return { status: 401, message: this.getMessage(CODE_PASSWORD_NOT_MATCH) };
        }

        return await this.getToken(user);
    }

    async createUser(object = { firstname: null, lastname: null, email: null, password: null } ) {
        let user = await model.createUser(object);

        if (!user) {
            return { status: 403, message: this.getMessage(CODE_USER_CREATE_FAILED) };
        }

        return this.getToken(user);
    };

    getToken (result) {
        let user = result.dataValues || result;
        let token = jwt.sign(user, process.env.SECRET_KEY);
        let { id, firstname, lastname, email } = user;
        return { status: 200, message: { code: CODE_PERFECT, token, user: { id, firstname, lastname, email } }};
    };

    verifyPassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

    hashPassword(password) {
        return bcrypt.hashSync(password);
    }

    getMessage(status) {
        let message = null;
        switch (status) {
            case 0: message = 'success'; break;
            case 1: message = 'user does not exists'; break;
            case 2: message = 'password does not match'; break;
            case 3: message = 'User create failed'; break;
            case 4: message = 'missing parameter(s)'; break;
            case 9: message = 'System Error'; break;
        }
        return { code: status, msg: message };
    }
}

//Login API
exports.login = async (req, res) => {
    const auth = new Authenticate(req);
    const response = await auth.login();

    return res.status(response.status).json(response.message);
};

//Register API
exports.register = async (req, res) => {
    const auth = new Authenticate(req);
    const response = await auth.register();

    return res.status(response.status).json(response.message);
};