// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
     createPO,
     deletePO,
     fetchPOs,
     updatePO
} from '../../server/controllers/poController';

import connectDB from '../../server/config/config' // next-connect is makes the process of http requests easier.
import nextConnect from 'next-connect';

connectDB();
const ncHandler = nextConnect();

// A single api path may have multiple handlers based on the type of request. As the code below shows:
// For readability, we have segregated the handler requests from te controller functions. The controller functions are the logic behind api calls and they are stored separately.
// Example: handler.post(controllerForSomeModel)

ncHandler.get(fetchPOs);
ncHandler.delete(deletePO);
ncHandler.post(createPO);
ncHandler.patch(updatePO)


export default ncHandler;
// export default ncHandler;
