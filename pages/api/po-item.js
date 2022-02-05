// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPOitem, fetchAllItems, deletePOitem, updatePOitem/* , deletePO, updatePO */ } from '../../server/controllers/poController';
import connectDB, { ncHandler } from '../../server/config/config'


const connectionDB = connectDB();

ncHandler.get(fetchAllItems);
ncHandler.delete(deletePOitem);
ncHandler.post(createPOitem);
ncHandler.patch(updatePOitem)
// ncHandler.delete(deletePO);

export default ncHandler;

