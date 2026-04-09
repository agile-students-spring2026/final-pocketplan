import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`PocketPlan server running on http://localhost:${PORT}`);
});

export const close = () => server.close();
export default server;
