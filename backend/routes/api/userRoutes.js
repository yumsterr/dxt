const
	apiResponse = require('express-api-response'),
	userRepository = require('../../repositories/userRepository'),
	baseUrl = '/api/user/';

module.exports = function (app) {
	app.get(baseUrl + 'me', async function (req, res, next) {
		try {
			res.data = await userRepository.getById(req.session.passport.user);
		} catch (e) {
			res.err = e;
		}
		next();
	}, apiResponse);

	app.get(baseUrl, async function (req, res, next) {
		try {
			res.data = await userRepository.get({});
		} catch (e) {
			res.err = e;
		}
		next();
	}, apiResponse);

	app.get(baseUrl + ':id', async function (req, res, next) {
		try {
			res.data = await userRepository.getById(req.params.id);
		} catch (e) {
			res.err = e;
		}
		next();
	}, apiResponse);

	app.post(baseUrl, async function (req, res, next) {
		try {
			res.data = await userRepository.add(req.body);;
		} catch (e) {
			res.err = e;
		}
		next();
	}, apiResponse);

	app.put(baseUrl + ':id', async function (req, res, next) {
		try {
			res.data = await userRepository.update(req.params.id, req.body);
			console.log(res.data);
		} catch (e) {
			res.err = e;
		}
		console.log(res.data);
		next();
	}, apiResponse);

	app.delete(baseUrl + ':id', async function (req, res, next) {
		try {
			res.data = await userRepository.deleteById(req.params.id, req.body);
		} catch (e) {
			res.err = e;
		}
		next();
	}, apiResponse);
};
