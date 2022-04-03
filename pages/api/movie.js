// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createMovie,
  // deleteMovie,
  fetchMovies,
  // updateMovie
} from '../../server/controllers/movieController';

import connectDB from '../../server/config/config' // next-connect is makes the process of http requests easier.
import nextConnect from 'next-connect';


connectDB();
const ncHandler = nextConnect();

ncHandler.get(fetchMovies);
// ncHandler.delete(deleteMovie);
ncHandler.post(createMovie);
// ncHandler.patch(updateMovie)


export default ncHandler;
