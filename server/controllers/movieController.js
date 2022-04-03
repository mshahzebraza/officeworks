import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import MovieModel from '../models/movieModel'
import GenreModel from '../models/genreModel'
import { deepClone, asyncForEach } from '../../helpers/reusable'

// Get Movies Controller
export const fetchMovies = CatchAsyncErrors(async (req, res) => {
  const movieList = await MovieModel.find({}).populate('genres', 'name').exec();

  res.status(200).json({
    success: true,
    data: movieList
  })
});

// Add Movie Controller
export const createMovie = CatchAsyncErrors(async (req, res) => {
  const { movieData } = req.body;

  // set the genreList to an empty array. and fill it with the genreIds later
  const genreNameList = deepClone(movieData.genres);
  movieData.genres = []

  // ? using simple forEach doesn't work because it's not async. OR we can use a simple For loop
  // Replace genreNames with matching genreIds in movieData.genres (create new genre if not found)
  await asyncForEach(
    genreNameList,
    async (curGenreName) => {
      const matchGenre = await GenreModel.findOne(
        { name: curGenreName },
        '_id', // projection
      ).exec();

      if (matchGenre) {
        await movieData.genres.push(matchGenre._id);
      }
      else {
        const { _id: newGenreUUID } = await GenreModel.create({ name: curGenreName })
        await movieData.genres.push(newGenreUUID);
      }
    }
  );

  // create the movie
  const createdMovie = await MovieModel.create(movieData);

  // add the movie's Id to the matching genres' movies array
  asyncForEach(
    createdMovie.genres,
    async (curGenreId) => {
      const matchGenre = await GenreModel.findByIdAndUpdate(
        curGenreId,
        { $push: { movies: createdMovie._id } },
        { new: true, runValidators: true }
      ).exec();
      console.log('matchGenre', matchGenre);
    }
  );

  res.status(200).json({
    success: true,
    message: "createdMovie",
    data: createdMovie
  })
});


// Update Movie Controller
export const updateMovie = CatchAsyncErrors(async (req, res) => {
  const { movieUUID } = req.query;
  const { movieData } = req.body;

  // set the genreList to an empty array. and fill it with the genreIds later
  const genreList = deepClone(movieData).genres;
  movieData.genres = []


  // findByIdAndUpdate method
  const updatedMovie = await MovieModel.findByIdAndUpdate(
    movieUUID,
    movieData,
    { new: true, runValidators: true }
  )
  // add the _id of the updatedMovie to the relevant genre list
  const genre = await GenreModel.findOneAndUpdate(
    { name: movieData.genres },
    { $addToSet: { movies: updatedMovie._id } }, //? addToSet: don't add if already exists
    { new: true, runValidators: true, upsert: true } //? upsert: the genre may not exist yet
  );

  // return RESPONSE
  res.status(200).json({
    success: true,
    data: updatedMovie
  })
});

// Delete Movie Controller


