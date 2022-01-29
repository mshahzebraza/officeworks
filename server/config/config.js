import mongoose from 'mongoose';

const connectDb = async () => {

  try {
    await mongoose.connect(
      process.env.MONGO_URI // 'mongodb://localhost:27017/OfficeWorks',
      , { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log(`Connected to MongoDB @ ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`DB Error ${error}`);
  };
};

module.exports = connectDb; // OR export default connectDb;