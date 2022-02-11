// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPart, deletePart, fetchParts, updatePart } from '../../server/controllers/projectController';
import connectDB, { ncHandler } from '../../server/config/config'
// next-connect is makes the process of http requests easier.


const connectionDB = connectDB();

ncHandler.get(fetchParts);
ncHandler.delete(deletePart);
ncHandler.post(createPart);
ncHandler.patch(updatePart)

export default ncHandler;
