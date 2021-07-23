const { createProxyMiddleware } = require('http-proxy-middleware');

const host = process.env.REACT_APP_STAGING;

module.exports = app => {
    app.use(
        // place path inside createProxyMiddleware !!!
        // https://github.com/chimurai/http-proxy-middleware/issues/204
        createProxyMiddleware('/api/v2/ranger', {
            target: `wss://${host}`,
            changeOrigin: true,
            ws: true,
        })
    );

    app.use(
        createProxyMiddleware('/api', {
            target: `https://${host}`,
            changeOrigin: true,
        })
    );
};
