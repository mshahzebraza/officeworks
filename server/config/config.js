// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const connectDb = async () => {
  // console.log(';sdad');

  try {
    await mongoose.connect(
      process.env.MONGO_URI // 'mongodb://localhost:27017/OfficeWorks'
      /* 
      // may not be even needed
            ,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
      */
    )
    console.log(`Connected to MongoDB @ ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`DB Error ${error}`);
  };
};

// export default connectDb;
module.exports = connectDb;