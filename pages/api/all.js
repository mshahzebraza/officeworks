import connectDB from '../../server/db/config' // next-connect is makes the process of http requests easier.
import nextConnect from 'next-connect';
import { getNChandlerConfig } from '../../helpers/refactored/getNChandlerConfig';

import { retrieveApp } from "../../server/controllers/module/retrieve";

connectDB();
const handlerConfig = getNChandlerConfig()
const ncHandler = nextConnect(handlerConfig);

// A single api path may have multiple handlers based on the type of request. As the code below shows:
// For readability, we have segregated the handler requests from te controller functions. The controller functions are the logic behind api calls and they are stored separately.
// Example: handler.post(controllerForSomeModel)

ncHandler.get(retrieveApp);


export default ncHandler;
