// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createModule, fetchModules, updateModule, deleteModule } from '../../../server/controllers/moduleController';
import connectDB from '../../../server/config/config'
import nextConnect from 'next-connect';

connectDB();
const ncHandler = nextConnect()

ncHandler.get(fetchModules);
ncHandler.delete(deleteModule);
ncHandler.post(createModule);
ncHandler.patch(updateModule)
// ncHandler.delete(deletePO);

export default ncHandler;

