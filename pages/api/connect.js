// import poModel from '../../server/models/poModel'

// import mongoose from 'mongoose';
const mongoose = require('mongoose')

export default async function handler(req, res) {

  // create a connection (Successful)
  const db = await mongoose.connect(
    'mongodb://localhost:27017/OfficeWorks',
    () => console.log('connected to mongodb'),
    (error) => console.log(error)
  )

  // Access the collection (work in progress)
  const records = await poModel.find({ refType: 'CST' })

  // send api response
  res.status(200).json({
    message: 'Check terminal log!',
    data: records
  })
  // close connection
  // db.close()

}
