/* 
  Purpose of file:
  This file was created only to demonstrate the complexity of code when we don't use next-connect
*/


import nc from 'next-connect';
import connectDB from '../../server/config/config'
import { fetchAll } from '../../server/controllers/poController';

// Diff 01 : An Async function would be needed to wrap code without next-connect 
export default async function handler(req, res) {
  try {

    const connection = await connectDB();

    // Diff 01 : Request Method must be filtered manually
    switch (req.method) {
      case 'GET':
        fetchAll(req, res)
        break;

      default:
        break;
    }

    await connection.close() // works with createConnection only.

  } catch (error) {
    console.log('Connect API Error!');

  }
}
