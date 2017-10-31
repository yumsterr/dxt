const
	apiResponse = require('express-api-response'),
	userRepository = require('../../repositories/userRepository'),
	baseUrl = '/api/user/';

module.exports = function (app) {
	app.get(baseUrl + 'me', function (req, res, next) {
		userRepository.getById(req.session.passport.user)
			.then(data => {
				res.data = data;
				next();
			})
			.catch(err => {
				res.err = err;
				next();
			})
	}, apiResponse);

	app.get(baseUrl, function (req, res, next) {
		userRepository.get({})
			.then(data => {
				res.data = data;
				next();
			})
			.catch(err => {
				res.err = err;
				next();
			})
	}, apiResponse);

	app.get(baseUrl + ':id', function (req, res, next) {
		userRepository.getById(req.params.id)
			.then((data) => {
				res.data = data;
				next();
			})
			.catch((err) => {
				res.err = err;
				next();
			})
	}, apiResponse);

	app.post(baseUrl, function (req, res, next) {
		userRepository.add(req.body)
			.then(data => {
				res.data = data;
				next();
			})
			.catch(err => {
				res.err = err;
				next();
			})
	}, apiResponse);

	app.put(baseUrl + ':id', function (req, res, next) {
		userService.updateItem(req.params.id, req.body)
			.then(data => {
				res.data = data;
				next();
			})
			.catch(err => {
				res.err = err;
				next();
			})
	}, apiResponse);

	app.delete(baseUrl + ':id', function (req, res, next) {
		userRepository.deleteById(req.params.id)
			.then(data => {
				res.data = data;
				next();
			})
			.catch(err => {
				res.err = err;
				next();
			})
	}, apiResponse);
};
