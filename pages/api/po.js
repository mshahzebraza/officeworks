import connectDB from '../../server/db/config' // next-connect is makes the process of http requests easier.
import nextConnect from 'next-connect';
import { getNChandlerConfig } from '../../helpers/refactored/getNChandlerConfig';

import { createPO } from "../../server/controllers/po/create";
import { retrievePOs } from "../../server/controllers/po/retrieve";
import { updatePO } from "../../server/controllers/po/update";
import { deletePO } from "../../server/controllers/po/delete";

connectDB();
const handlerConfig = getNChandlerConfig();
const ncHandler = nextConnect(handlerConfig);

ncHandler.post(createPO);
ncHandler.get(retrievePOs);
ncHandler.patch(updatePO)
ncHandler.delete(deletePO);

export default ncHandler;
