// https://github.com/orgs/vercel/discussions/424
// ? File Structure according to below
// Mongoose: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
// MongoDB: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.js
import mongoose from 'mongoose';

const mongoDB_connection_string = process.env.MONGODB_URI
if (!mongoDB_connection_string) throw new Error("❓Please define your MONGODB_URI environment variable inside .env.local")

/**
 * Global is used here to maintain a cache connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let dbCache = global.mongoose;
if (!dbCache) dbCache = global.mongoose = { conn: null, promise: null }

// let mongoClientCache;
export default async function connectDB() {

    // Check if a connection is already established
    if (dbCache.conn) {
        console.log('♻🔁=> App is using existing database connection');
        return dbCache.conn
    }
    console.log('🍾🆕=> App needs a new database connection');

    // Check if a connection request is already in process. (avoid multiple connection request before rejection of first one)
    if (!dbCache.promise) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // bufferCommands:false,
        }

        dbCache.promise = await mongoose.connect(mongoDB_connection_string, options).then((mongoose) => {
            return mongoose
        })
    }

    try {
        // The `mongoose.connect()` promise resolves to mongoose instance. This instance is now ready to use
        dbCache.conn = await dbCache.promise

        const defaultConnection = mongoose.connection;
        console.log('✅ MongoDB host: ', defaultConnection.host)

        // On first connection
        defaultConnection.once('open', onFirstConnectionSuccess)
        // Check Connection after the first connection
        defaultConnection.on('connection', onConnectionSuccess);
        // Handle the errors after the first connection is established
        defaultConnection.on('error', onConnectionError)



    } catch (e) {
        dbCache.promise = null
        onFirstConnectionError(e)
    }

    // Mongoose instance is returned
    return dbCache.conn
};

// Success & Error Handlers
function onFirstConnectionError(error) {
    console.error('❌❌❌ New connection could not establish with MongoDB.', error)
}
function onConnectionError(err) {
    console.log('👎👎👎Error connecting to MongoDB', err)
}
function onFirstConnectionSuccess() {
    console.log('✅ Success! First connection established Success: ')
}
function onConnectionSuccess(stream) {
    console.log('connection\'s stream argument: ', stream);
    console.log('🤝Someone connected to MongoDB!');
}
