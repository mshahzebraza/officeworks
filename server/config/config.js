import mongoose from 'mongoose';
// const mongoose = require('mongoose')
import nc from 'next-connect';
import CatchAsyncErrors from '../middlewares/CatchAsyncErrors';
export const ncHandler = nc();

const connectDB = CatchAsyncErrors(async () => {

  // try {

  // Method 01
  const connection = await mongoose.connect(
    process.env.MONGO_URI
    // , function () { console.log('Success: connected to MongoDB') }
    // , function () { console.log('Error connecting to MongoDB') }
  )

  // Method 02
  /* 
    const connection = await mongoose.createConnection(
      process.env.MONGO_URI // 'mongodb://localhost:27017/OfficeWorks',
      , { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log(`Connected to MongoDB @ ${mongoose.connection.host}`);
  
    connection.on('connected', function () {
      console.log('Success: connected to MongoDB');
    })
    connection.on('error', function () {
      console.log('Error connecting to MongoDB');
      process.exit(1)
    }) 
    */


  return connection

  // } catch (error) {
  //   console.log(`DB Error ${error}`);
  // };
});

// module.exports = connectDB; // OR export default connectDb;
export default connectDB