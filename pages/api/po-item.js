// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createItem, fetchItems, deleteItem, updateItem } from '../../server/controllers/poController';
import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';

const ncHandler = nextConnect()

const connectionDB = connectDB();

ncHandler.get(fetchItems);
ncHandler.delete(deleteItem);
ncHandler.post(createItem);
ncHandler.patch(updateItem)
// ncHandler.delete(deletePO);

export default ncHandler;

