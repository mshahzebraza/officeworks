// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    fetchParts,
    deletePart,
    createPart,
    updatePart
} from '../../server/controllers/projectController/index';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';
// next-connect is makes the process of http requests easier.
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
const ncHandler = nextConnect(handlerConfig);

ncHandler.get(fetchParts);
ncHandler.delete(deletePart);
ncHandler.post(createPart);
ncHandler.patch(updatePart)

export default ncHandler;
