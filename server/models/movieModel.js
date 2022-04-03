// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const movieSchema = new Schema({
  name: String,
  year: Number,
  genres: [
    {
      type: ObjectId,
      ref: 'Genre'
    }
  ],
})


const model_Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default model_Movie;