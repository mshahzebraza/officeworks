import connectDB from '../../server/db/config' // next-connect is makes the process of http requests easier.
import nextConnect from 'next-connect';
import { getNChandlerConfig } from '../../helpers/refactored/getNChandlerConfig';

import { createMWO } from "../../server/controllers/mwo/create";
import { retrieveMWOs } from "../../server/controllers/mwo/retrieve";
import { updateMWO } from "../../server/controllers/mwo/update";
import { deleteMWO } from "../../server/controllers/mwo/delete";

connectDB();
const handlerConfig = getNChandlerConfig()
const ncHandler = nextConnect(handlerConfig);

ncHandler.post(createMWO);
ncHandler.get(retrieveMWOs);
ncHandler.patch(updateMWO)
ncHandler.delete(deleteMWO);

export default ncHandler;
