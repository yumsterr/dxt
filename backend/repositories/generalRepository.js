const ObjectId = require('mongoose').Types.ObjectId;

class Repository {
	constructor() {}

	add(data) {
		const model = this.model;
		const newItem = new model(data);
		return newItem.save();
	}

	deleteById(id) {
		const query = this.model.update({
			_id: id
		}, {
			isRemoved: true
		});
		return query.exec();
	}

	getById(id) {
		const query = this.model.findOne({
			_id: id
		});
		return query.exec();
	}

	update(id, body) {
		let query = this.model.update({
			_id: id
		}, body);
		return query.exec();
	}

	get(params) {
		if (params.sort === undefined) {
			params.sort = null;
		}
		if (params.limit === undefined) {
			params.limit = null;
		}
		if (params.offset === undefined) {
			params.offset = null;
		}
		if (params.fields === undefined) {
			params.fields = null;
		}
		if (params.populate === undefined) {
			params.populate = null;
		}
		let model = this.model;

		let query = model.find(params.filter)
			.sort(params.sort)
			.limit(params.limit)
			.skip(params.offset)
			.select(params.fields);
		if (params.populate) {
			query.populate(params.populate);
		}
		return query.exec();
	}

	static makeObjectId(string) {
		return ObjectId(string);
	}
}

module.exports = Repository;
