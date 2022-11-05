



import mongoose from 'mongoose';
// const mongoose = require('mongoose')
import CatchAsyncErrors from '../middlewares/CatchAsyncErrors';

const connectDB = CatchAsyncErrors(async () => {

    // Method 01
    // Establish connection
    mongoose.connect(
        process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        // , function () { console.log('Success: connected to MongoDB') }
        // , function () { console.log('Error connecting to MongoDB') }
    )

    // Check Connection
    const db = mongoose.connection;
    db.once('open', () => {
        console.log('Success: connected to MongoDB:', mongoose.connection.host, process.env.MONGO_URI)
    })
    db.on('error', (err) => {
        console.log('Error connecting to MongoDB', err)
    })


    // Method 02
    /* 
      mongoose.createConnection(
        process.env.MONGO_URI // 'mongodb://localhost:27017/OfficeWorks',
        , { useNewUrlParser: true, useUnifiedTopology: true }
      )
      console.log(`Connected to MongoDB @ ${mongoose.connection.host}`);
    
      // mongoose successful connection message
      mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + process.env.MONGO_URI)
        console.log('Success: connected to MongoDB');
      })
    
      // If the connection throws an error 
      mongoose.connection.on('error', function (err) {
        console.log('MongoDB connection error: ' + err)
        console.log('Error connecting to MongoDB');
        process.exit(-1)
      })
     */

});

// module.exports = connectDB; // OR export default connectDb;
export default connectDB