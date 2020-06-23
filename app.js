const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './config/.env' });

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
