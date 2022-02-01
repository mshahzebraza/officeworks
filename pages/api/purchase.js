import nc from 'next-connect';
import connectDB from '../../server/config/config'
import { fetchAll } from '../../server/controllers/poController';


export default async function handler(req, res) {
  try {

    const connection = await connectDB();

    switch (req.method) {
      case 'GET':
        fetchAll(req, res)
        break;

      default:
        break;
    }

    // Step 03: Close connection
    await connection.close() // works with createConnection only.

  } catch (error) {
    console.log('Connect API Error!');

  }
}
