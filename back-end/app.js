import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import postsRoutes from './routes/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(morgan('dev'));

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let _dbPromise = null;
function ensureDBConnected() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!_dbPromise) {
    _dbPromise = connectDB().catch((err) => {
      _dbPromise = null;
      throw err;
    });
  }
  return _dbPromise;
}

app.use(async (req, res, next) => {
  try {
    await ensureDBConnected();
    next();
  } catch {
    res.status(503).json({ error: 'Database unavailable.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/posts', postsRoutes);
app.use('/api/posts', postsRoutes);

const buildPath = join(__dirname, '..', 'front-end', 'build');
const FRONTEND_URL = process.env.FRONTEND_URL || '';

if (existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(join(buildPath, 'index.html'), (err) => {
      if (err) {
        res.status(503).json({
          error: 'Front-end build not found. Run `npm run build` inside front-end/ first.',
        });
      }
    });
  });
} else if (FRONTEND_URL) {
  app.get('/', (req, res) => res.redirect(FRONTEND_URL));
  app.get('*', (req, res) => res.redirect(FRONTEND_URL));
}

export default app;
