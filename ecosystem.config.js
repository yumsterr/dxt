module.exports = {
  apps : [
    {
      name      : 'API',
      script    : './backend/server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      watch: ['backend'],
      watchOptions: {
        followSymlinks: true,
        usePolling: true
      }
    }
  ]
};
