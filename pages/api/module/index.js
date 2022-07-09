// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createModule, fetchModules, updateModule, deleteModule } from '../../../server/controllers/moduleController/index';
import connectDB from '../../../server/config/config'
import nextConnect from 'next-connect';
import { invalidResponse } from '../../../helpers/reusable';




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

ncHandler.get(fetchModules);
ncHandler.delete(deleteModule);
ncHandler.post(createModule);
ncHandler.patch(updateModule)

export default ncHandler;
