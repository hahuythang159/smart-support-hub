import { createProxyMiddleware } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

const usersProxy: RequestHandler = createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: (path) => {
        return '/users' + path;
    },
});

export default usersProxy;
