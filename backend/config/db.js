module.exports = {
	dbname: 'msfn',
	uri: `mongodb://${process.env.db_user}:${process.env.db_password}@${process.env.db_url}`,
	mocked_db: false,
	opts: {
		server: {
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
};