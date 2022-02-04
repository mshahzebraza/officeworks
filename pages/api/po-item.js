// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPOitem, fetchAllItems, deleteItem/* , deletePO, updatePO */ } from '../../server/controllers/poController';
import connectDB, { ncHandler } from '../../server/config/config'


const connectionDB = connectDB();

ncHandler.get(fetchAllItems);
ncHandler.delete(deleteItem);
ncHandler.post(createPOitem);
ncHandler.patch(updatePOitem)
// ncHandler.delete(deletePO);

export default ncHandler;

