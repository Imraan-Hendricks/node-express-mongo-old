const mongoose = require('mongoose');
const { DBUSER, DBPASSWORD, DBNAME, MONGO_URI } = require('./env');

var connections = {
  main: null,
};

exports.connect = async () => {
  if (connections.main) return console.log('DB connection already established');

  try {
    let main = await mongoose.createConnection(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      user: DBUSER,
      pass: DBPASSWORD,
      dbName: DBNAME,
    });

    connections.main = main;
    console.log(`MongoDb Connected: ${main.host}`);
  } catch (err) {
    console.log(`DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

exports.getConnections = () => connections;

exports.closeConnections = async () => {
  try {
    await connections.main.close();
    connections.main = null;
    console.log('DB connections closed');
  } catch {
    console.log('Failed to close DB connections');
  }
};
