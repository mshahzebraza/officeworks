// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createProject, deleteProject, fetchProjects, updateProject } from '../../server/controllers/projectController';
import connectDB, { ncHandler } from '../../server/config/config'
// next-connect is makes the process of http requests easier.


const connectionDB = connectDB();

ncHandler.get(fetchProjects);
ncHandler.delete(deleteProject);
ncHandler.post(createProject); // creates project summary and 02x assemblies
ncHandler.patch(updateProject) // updates project summary
// handler.put(controllerForSomeModel) // for replace
export default ncHandler;
