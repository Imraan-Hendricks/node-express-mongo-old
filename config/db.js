const mongoose = require('mongoose');

var connections = {
  main: null,
};

exports.connect = async () => {
  if (connections.main) return;

  try {
    let main = await mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      // user: '',
      // pass: '',
      dbName: process.env.DBNAME,
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
