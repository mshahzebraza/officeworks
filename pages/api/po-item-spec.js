// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updatePOitemSpec } from '../../server/controllers/poController';
import connectDB, { ncHandler } from '../../server/config/config'


const connectionDB = connectDB();

// ncHandler.get(fetchAllItems);
// ncHandler.delete(deletePOitem);
// ncHandler.post(createPOitem);
ncHandler.patch(updatePOitemSpec)
// ncHandler.delete(deletePO);

export default ncHandler;

