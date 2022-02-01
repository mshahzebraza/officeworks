// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from '../../server/config/config'
import nc from 'next-connect';
import { fetchAll } from '../../server/controllers/poController';
import { fetchPO, poController } from '../../server/controllers/poController';
// this is supposed to make the process of making server requests easier.
// The alternative approach is shown in 'api/purchase' file

const handler = nc();

const connectionDB = connectDb();
// A single api path may have multiple handlers based on the type of request. As the code below shows:
// For readability, we have segregated the handler requests from te controller functions. The controller functions are the logic behind api calls and they are stored separately.
// Example: handler.post(controllerForSomeModel)

handler.get(fetchPO)
// handler.patch(controllerForSomeModel)
// handler.put(controllerForSomeModel)
// handler.delete(controllerForSomeModel)
export default handler;



// This code is a handler+controller.
/* 
export default function handler(req, res) {

  res.status(200).json('success')
}
 */