
import {
    fetchProjects,
    deleteProject,
    createProject,
    updateProject
} from '../../server/controllers/projectController/index';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';


// Define Middlewares for "Error" & "No Match"
const handlerConfig = {
    onNoMatch: (req, res) => {
        invalidResponse(res, `Method ${req.method} not allowed`, 405)
    },
    onError: (err, req, res) => {
        invalidResponse(res, err.message, 500)
    }
}

connectDB();
const ncHandler = nextConnect(handlerConfig);

ncHandler.get(fetchProjects);
ncHandler.delete(deleteProject);
ncHandler.post(createProject); // creates project summary and 02x assemblies
ncHandler.patch(updateProject) // updates project summary

export default ncHandler;
