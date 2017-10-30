const config = require('./config');

module.exports = {
    apps: [{
        name: 'API',
        script: './backend/server.js',
        env: {
            db_user: config.db.user,
            db_password: config.db.password,
            db_url:config.db.url
        },
        watch: ['backend'],
        watchOptions: {
            followSymlinks: true,
            usePolling: true
        }
    }]
};
