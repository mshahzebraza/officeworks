// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPO, deletePO, fetchAll, updatePO } from '../../server/controllers/poController';
import connectDB, { ncHandler } from '../../server/config/config'
import nc from 'next-connect';

// next-connect is makes the process of http requests easier.
// 1. Eliminates the need of making server
/* Alternative Code
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
 */


const connectionDB = connectDB();
// A single api path may have multiple handlers based on the type of request. As the code below shows:
// For readability, we have segregated the handler requests from te controller functions. The controller functions are the logic behind api calls and they are stored separately.
// Example: handler.post(controllerForSomeModel)

ncHandler.get(fetchAll);
ncHandler.post(createPO);
ncHandler.delete(deletePO);
ncHandler.patch(updatePO)
// handler.put(controllerForSomeModel) // for replace
export default ncHandler;



// This code is a handler+controller.
/* 
export default function handler(req, res) {

  res.status(200).json('success')
}
 */