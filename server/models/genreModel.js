// import { Mongoose as mongoose } from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const genreSchema = new Schema({
  name: String,
  movies: [
    {
      type: ObjectId,
      ref: 'Movie'
    }
  ]
})



// Search "Mongoose Models" for a Model name 'poModel' and create one if not present already.
const model_genre = mongoose.models.Genre || mongoose.model('Genre', genreSchema);
export default model_genre;