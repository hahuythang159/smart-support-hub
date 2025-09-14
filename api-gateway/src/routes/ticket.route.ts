import { createProxyMiddleware } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

const ticketProxy: RequestHandler = createProxyMiddleware({
  target: process.env.TICKET_SERVICE_URL || 'http://localhost:4001',
  changeOrigin: true,
  pathRewrite: (path) => {
    return '/ticket' + path; // Add back /auth to the trimmed path
  },
});

export default ticketProxy;
