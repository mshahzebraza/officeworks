// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createAssembly, deleteAssembly, fetchAssemblies, updateAssembly } from '../../server/controllers/projectController';
import connectDB, { ncHandler } from '../../server/config/config'
// next-connect is makes the process of http requests easier.


const connectionDB = connectDB();

ncHandler.get(fetchAssemblies);
ncHandler.delete(deleteAssembly);
ncHandler.post(createAssembly);
ncHandler.patch(updateAssembly)

export default ncHandler;
