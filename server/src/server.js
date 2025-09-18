// src/server.js
const app = require('./app');
const { port, nodeEnv } = require('./config/env');

app.listen(port, () => {
  console.log(`Server running in ${nodeEnv} mode on port ${port}`);
});