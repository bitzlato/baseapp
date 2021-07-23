const { createProxyMiddleware } = require('http-proxy-middleware');

const host = process.env.REACT_APP_STAGING;

module.exports = app => {
    app.use(
        '/api/v2/ranger',
        createProxyMiddleware({
            target: `wss://${host}`,
            changeOrigin: true,
            ws: true,
        })
    );

    app.use(
        '/api',
        createProxyMiddleware({
            target: `https://${host}`,
            changeOrigin: true,
        })
    );
};
