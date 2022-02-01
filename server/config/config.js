import mongoose from 'mongoose';
// const mongoose = require('mongoose')

const connectDb = async () => {

  try {
    const connectionDB = await mongoose.createConnection(
      process.env.MONGO_URI // 'mongodb://localhost:27017/OfficeWorks',
      , { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log(`Connected to MongoDB @ ${mongoose.connection.host}`);
    return connectionDB
  } catch (error) {
    console.log(`DB Error ${error}`);
  };
};

console.log('In Config');
module.exports = connectDb; // OR export default connectDb;