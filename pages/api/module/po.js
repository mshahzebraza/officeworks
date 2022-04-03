// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPOmodule, fetchPOmodules, updatePOmodule, deletePOmodule } from '../../../server/controllers/poModuleController';
import connectDB from '../../../server/config/config'
import nextConnect from 'next-connect';

connectDB();
const ncHandler = nextConnect()

ncHandler.get(fetchPOmodules);
ncHandler.delete(deletePOmodule);
ncHandler.post(createPOmodule);
ncHandler.patch(updatePOmodule)

export default ncHandler;

