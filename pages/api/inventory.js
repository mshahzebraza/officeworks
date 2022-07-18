// import {
// fetchMWOs,
// deleteMWO,
// createMWO,
// updateInventory
// } from '../../server/controllers/moduleController';

import connectDB from '../../server/config/config/index'
import nextConnect from 'next-connect';
import { invalidResponse } from '../../helpers/reusable';

// Define Middlewares for "Error" & "No Match"
const handlerConfig = {
    onNoMatch: (req, res) => {
        invalidResponse(res, `Method ${req.method} not allowed`, 405)
    },
    onError: (err, req, res) => {
        invalidResponse(res, err.message, 500)
    }
}

connectDB();
const ncHandler = nextConnect(handlerConfig)


//    ncHandler.get(fetchMWOs);
//    ncHandler.delete(deleteMWO);
//    ncHandler.post(createMWO);
// ncHandler.patch(updateInventory) // ?this will update the moduleModule but just the qty attribute of it

export default ncHandler;
