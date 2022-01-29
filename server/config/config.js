// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const connectDb = async () => {
  // console.log(';sdad');
  try {
    // await mongoose.createConnection(process.env.MONGO_URI,
    await mongoose.createConnection('mongodb://localhost:27017/OfficeWorks'
      // ,
      // {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true, // Not Supported
      // useFindAndModify: false // Not Supported
      // }
    )
    console.log(`Connected to MongoDB @ ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`DB Error ${error}`);
  };
};

// export default connectDb;
module.exports = connectDb;