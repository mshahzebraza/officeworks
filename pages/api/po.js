import connectDB from '../../server/db/config' // next-connect is makes the process of http requests easier.
import nextConnect from 'next-connect';
import { getNChandlerConfig } from '../../helpers/refactored/getNChandlerConfig';

import { createPO } from "../../server/controllers/po/create";
import { retrievePO } from "../../server/controllers/po/retrieve";
import { updatePO } from "../../server/controllers/po/update";
import { deletePO } from "../../server/controllers/po/delete";

connectDB();
const handlerConfig = getNChandlerConfig()
const ncHandler = nextConnect(handlerConfig);

// A single api path may have multiple handlers based on the type of request. As the code below shows:
// For readability, we have segregated the handler requests from te controller functions. The controller functions are the logic behind api calls and they are stored separately.
// Example: handler.post(controllerForSomeModel)

ncHandler.post(createPO);
ncHandler.get(retrievePO);
ncHandler.patch(updatePO)
ncHandler.delete(deletePO);


export default ncHandler;
