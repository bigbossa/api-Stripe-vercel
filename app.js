const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT']
}));
app.use(express.json());

const routes = require('./routes/server');
app.use('/server', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express Serverless!' });
});

module.exports = app;
module.exports.handler = serverless(app);
// สำหรับ local dev ให้ใช้ app.listen (Vercel จะไม่ใช้)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
