import { createMWO, deleteMWO, fetchMWOs, updateMWO } from '../../server/controllers/mwoController';
import connectDB, { ncHandler } from '../../server/config/config'

const connectionDB = connectDB();

ncHandler.get(fetchMWOs);
ncHandler.delete(deleteMWO);
ncHandler.post(createMWO);
ncHandler.patch(updateMWO)

export default ncHandler;
