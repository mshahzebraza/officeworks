import { createMWO, deleteMWO, getAllMWOs, updateMWO } from '../../server/controllers/mwoController';
import connectDB, { ncHandler } from '../../server/config/config'

const connectionDB = connectDB();

ncHandler.get(getAllMWOs);
ncHandler.delete(deleteMWO);
ncHandler.post(createMWO);
ncHandler.patch(updateMWO)

export default ncHandler;
