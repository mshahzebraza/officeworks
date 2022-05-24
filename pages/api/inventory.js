import {
     // fetchMWOs,
     // deleteMWO,
     // createMWO,
     updateInventory
} from '../../server/controllers/moduleController';

import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';

connectDB();
const ncHandler = nextConnect()


//    ncHandler.get(fetchMWOs);
//    ncHandler.delete(deleteMWO);
//    ncHandler.post(createMWO);
ncHandler.patch(updateInventory) // ?this will update the moduleModule but just the qty attribute of it

export default ncHandler;
