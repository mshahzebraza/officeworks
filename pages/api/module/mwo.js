// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createMWOmodule, fetchMWOmodules, updateMWOmodule, deleteMWOmodule } from '../../../server/controllers/mwoModuleController';
import connectDB from '../../../server/config/config'
import nextConnect from 'next-connect';

connectDB();
const ncHandler = nextConnect()

// TODO: These functions are not yet created
ncHandler.get(fetchMWOmodules);
ncHandler.delete(deleteMWOmodule);
ncHandler.post(createMWOmodule);
ncHandler.patch(updateMWOmodule)

export default ncHandler;

