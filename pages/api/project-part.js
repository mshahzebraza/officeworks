// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
     fetchParts,
     deletePart,
     createPart,
     updatePart
} from '../../server/controllers/projectController';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';
// next-connect is makes the process of http requests easier.

connectDB();
const ncHandler = nextConnect();

ncHandler.get(fetchParts);
ncHandler.delete(deletePart);
ncHandler.post(createPart);
ncHandler.patch(updatePart)

export default ncHandler;
