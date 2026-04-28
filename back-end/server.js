import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3000;
let server;

async function startServer() {
  await connectDB();

  server = app.listen(PORT, () => {
    console.log(`PocketPlan server running on http://localhost:${PORT}`);
  });
}

startServer();

export const close = () => {
  if (server) return server.close();
};

export default server;