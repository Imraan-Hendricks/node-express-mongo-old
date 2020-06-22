const express = require('express');

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${5000}`);
});
