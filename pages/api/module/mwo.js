// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { createModule, fetchModules, updateModule, deleteModule } from '../../../server/controllers/moduleController';
import connectDB from '../../../server/config/config'
import nextConnect from 'next-connect';

connectDB();
const ncHandler = nextConnect()

ncHandler.get(async (req, res) => {
  const { x } = req.query;
  return res.status(200).json({
    data: 'POitem_Form.js',
    x
  });
}
);
// ncHandler.delete(deleteModule);
// ncHandler.post(createModule);
// ncHandler.patch(updateModule)
// ncHandler.delete(deletePO);

export default ncHandler;

