// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createPOitem, fetchAllItems, deleteItem/* , deletePO, updatePO */ } from '../../server/controllers/poController';
import connectDB, { ncHandler } from '../../server/config/config'


const connectionDB = connectDB();

ncHandler.get(fetchAllItems);
ncHandler.delete(deleteItem);
// ncHandler.post(createPOitem);
// ncHandler.delete(deletePO);
// ncHandler.patch(updatePO)

export default ncHandler;

