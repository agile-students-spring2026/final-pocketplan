import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const buildPath = join(__dirname, '..', 'front-end', 'build');
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

export default app;
