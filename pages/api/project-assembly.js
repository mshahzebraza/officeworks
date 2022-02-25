// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createAssembly, deleteAssembly, fetchAssemblies, updateAssembly } from '../../server/controllers/projectController';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';



connectDB();
const ncHandler = nextConnect();

ncHandler.get(fetchAssemblies);
ncHandler.delete(deleteAssembly);
ncHandler.post(createAssembly);
ncHandler.patch(updateAssembly)

export default ncHandler;
