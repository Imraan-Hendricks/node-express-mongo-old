const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(5000, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${5000}`);
});
