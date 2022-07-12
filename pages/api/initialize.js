import CatchAsyncErrors from '../../server/middlewares/CatchAsyncErrors';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';


import poModel from '../../server/models/poModel'
import projectModel from '../../server/models/projectModel';
import mwoModel from '../../server/models/mwoModel';
import transactionModel from '../../server/models/transactionModel';
import moduleModel from '../../server/models/moduleModel';


const fetchAppData = async (req, res) => {
    const poList = await poModel.find({})/* .populate('linkedModules') */.exec()
    const mwoList = await mwoModel.find({})
    const projectList = await projectModel.find({})
    const transactionList = await transactionModel.find({});
    const moduleList = await moduleModel.find({});

    // console.log('pos', poList);
    // console.log('mwos', mwoList);
    // console.log('projects', projectList);
    // console.log('transactions', transactionList);
    // console.log('modules', moduleList);

    res.status(200).json({
        success: true,
        data: { poList, mwoList, projectList, transactionList, moduleList }
    })
};




// Define Middlewares for "Error" & "No Match"
const handlerConfig = {
    onNoMatch: (req, res) => {
        invalidResponse(res, `Method ${req.method} not allowed`, 405)
    },
    onError: (err, req, res) => {
        invalidResponse(res, err.message, 500)
    }
}
// Establish connection to MongoDB

connectDB();
const ncHandler = nextConnect(handlerConfig);
ncHandler.get(fetchAppData)

export default ncHandler;

