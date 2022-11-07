import connectDB from '../../server/db/config' // next-connect is makes the process of http requests easier.
import nextConnect from 'next-connect';
import { getNChandlerConfig } from '../../helpers/refactored/getNChandlerConfig';

import { createModule } from "../../server/controllers/module/create";
import { retrieveModules } from "../../server/controllers/module/retrieve";
import { updateModule } from "../../server/controllers/module/update";
import { deleteModule } from "../../server/controllers/module/delete";

connectDB();
const handlerConfig = getNChandlerConfig()
const ncHandler = nextConnect(handlerConfig);

// A single api path may have multiple handlers based on the type of request. As the code below shows:
// For readability, we have segregated the handler requests from te controller functions. The controller functions are the logic behind api calls and they are stored separately.
// Example: handler.post(controllerForSomeModel)

ncHandler.post(createModule);
ncHandler.get(retrieveModules);
ncHandler.patch(updateModule)
ncHandler.delete(deleteModule);


export default ncHandler;
