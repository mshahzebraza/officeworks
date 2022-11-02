import {
    fetchMWOs,
    deleteMWO,
    createMWO,
    updateMWO
} from '../../server/controllers/mwoController/index';

import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';
import { invalidResponse } from '../../helpers/invalidResponse';




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


ncHandler.get(fetchMWOs);
ncHandler.delete(deleteMWO);
ncHandler.post(createMWO);
ncHandler.patch(updateMWO)

export default ncHandler;
