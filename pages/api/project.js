import {
  fetchProjects,
  deleteProject,
  createProject,
  updateProject
} from '../../server/controllers/projectController';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';



connectDB();
const ncHandler = nextConnect();

ncHandler.get(fetchProjects);
ncHandler.delete(deleteProject);
ncHandler.post(createProject); // creates project summary and 02x assemblies
ncHandler.patch(updateProject) // updates project summary

export default ncHandler;
