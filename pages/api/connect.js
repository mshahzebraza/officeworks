const mongoose = require('mongoose')



// Long Way of doing it
export async function handler(req, res) {
  try {

    // Step 01 : create a connection
    // Method 01
    const conn = mongoose.connect(
      // connection URI
      'mongodb://localhost:27017/OfficeWorks'
      // connection function
      , function () { console.log('connection established!') }
      // error function
      , function () { console.log('connection failed!') }
    )


    // Or Method 02
    /* const conn = await mongoose.createConnection(
      process.env.MONGO_URI
      , {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          bufferCommands: false,
          // dbName: 'OfficeWorks'
        }
      ) 
      console.log('Connection established!'); */


    // Step 02: Access and use the documents
    // use mongoose models to fetch data


    // Returning the api responses
    res.status(200).json({
      message: 'Check terminal log!',
      data: "data returned",
    })

    // Step 03: Close connection
    await conn.close() // works with createConnection only.

  } catch (error) {
    console.log('Connect API Error!');

  }
}
