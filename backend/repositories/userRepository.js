const Repository = require('./generalRepository'),
User = require('../schemas/userSchema');

class UserRepository extends Repository {
    constructor() {
        super();
        this.model = User;
    }
}

module.exports = new UserRepository();