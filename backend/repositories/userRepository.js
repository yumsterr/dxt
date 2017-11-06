const Repository = require('./generalRepository'),
User = require('../schemas/userSchema');

class UserRepository extends Repository {
    constructor() {
        super();
        this.model = User;
    }

    async add(data) {
    	const user = await this.get({
			filter: {
				email: data.email
			}
		});

    	if (user.length > 0) {
    		throw new Error('user already exists');
		} else {
    		return super.add(data);
		}
	}

	async update(id, data) {
    	const user = await this.getById(id);
    	if (user) {
			if (data.email) {
				const users = await this.getByEmail(data.email);
				if (users) {
					throw new Error('user with such email already exist');
				}
			}
			console.log(id);
			console.log(data);
    		return super.update(id, data);
		} else {
    		throw new Error('user not found');
		}
	}

	async getByEmail(email) {
    	const users = await this.get({
			filter: {
				email: email
			}
		});
    	return users.shift();
	}
}

module.exports = new UserRepository();
