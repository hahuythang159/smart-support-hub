import { createProxyMiddleware } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

const authProxy: RequestHandler = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:4000',
  changeOrigin: true,
  pathRewrite: (path) => {
    return '/auth' + path; // Add back /auth to the trimmed path
  },
});

export default authProxy;
