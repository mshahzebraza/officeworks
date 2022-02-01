import mongoose from 'mongoose';
// const mongoose = require('mongoose')

const connectDB = async () => {

  try {

    // Method 01
    const connection = await mongoose.connect(
      process.env.MONGO_URI
      , function () { console.log('connection established!') }
      , function () { console.log('connection failed!') }
    )

    // Method 02
    /* 
      const connection = await mongoose.createConnection(
        process.env.MONGO_URI // 'mongodb://localhost:27017/OfficeWorks',
        , { useNewUrlParser: true, useUnifiedTopology: true }
      )
      console.log(`Connected to MongoDB @ ${mongoose.connection.host}`);
     */

    return connection

  } catch (error) {
    console.log(`DB Error ${error}`);
  };
};

// module.exports = connectDB; // OR export default connectDb;
export default connectDB