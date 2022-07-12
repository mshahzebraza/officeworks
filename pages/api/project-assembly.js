// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createAssembly, deleteAssembly, fetchAssemblies, updateAssembly } from '../../server/controllers/projectController/index';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';


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

ncHandler.get(fetchAssemblies);
ncHandler.delete(deleteAssembly);
ncHandler.post(createAssembly);
ncHandler.patch(updateAssembly)

export default ncHandler;
