// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateSpecification } from '../../server/controllers/poController';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';

const ncHandler = nextConnect()

const connectionDB = connectDB();
// ncHandler.get(fetchAllItems);
// ncHandler.delete(deletePOitem);
// ncHandler.post(createPOitem);
ncHandler.patch(updateSpecification)
// ncHandler.delete(deletePO);

export default ncHandler;

