// lib/db.js
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL);

export { db };

export async function getUserById(userId) {
  try {
    console.log('Executing query: SELECT * FROM users WHERE id = $1', [userId]);
    const user = await db.one('SELECT * FROM users WHERE id = $1', [userId]);
    console.log('Query executed successfully');
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Function to fetch wishlist based on user ID from the database
export async function getWishlistByUserId(userId) {
  try {
    console.log('Executing query: SELECT * FROM wishlist WHERE user_id = $1', [userId]);
    const wishlist = await db.any('SELECT * FROM wishlist WHERE user_id = $1', [userId]);
    console.log('Query executed successfully');
    return wishlist;
  } catch (error) {
    console.error('Error fetching wishlist by user ID:', error);
    throw error;
  }
}

// Function to fetch movies based on movie IDs from the database
export async function getMoviesByUserId(movieIds) {
  try {
    // Check if the array of movieIds is not empty before constructing the SQL query
    if (movieIds.length === 0) {
      return []; // Return an empty array if there are no movieIds
    }

    const movies = await db.any('SELECT * FROM movies WHERE id IN ($1:csv)', [movieIds]);
    return movies;
  } catch (error) {
    console.error('Error fetching movies by movie IDs:', error);
    throw error;
  }
}