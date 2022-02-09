import CatchAsyncErrors from '../../server/middlewares/CatchAsyncErrors';
import connectDB, { ncHandler } from '../../server/config/config'

import poModel from '../../server/models/poModel'
import projectModel from '../../server/models/projectModel';
import mwoModel from '../../server/models/mwoModel';
import transactionModel from '../../server/models/transactionModel';


const fetchAppData = async (req, res) => {
  try {
    const poList = await poModel.find({})
    const mwoList = await mwoModel.find({})
    const projectList = await projectModel.find({})
    const transactionList = await transactionModel.find({});

    // console.log('pos', poList[0]);
    res.status(200).json({
      success: true,
      data: { poList, mwoList, projectList, transactionList }
    })

  } catch (error) {
    console.log(error);
  }
};

// Establish connection to MongoDB

connectDB();


ncHandler.get(fetchAppData)

export default ncHandler;

