
import { getDb } from '../db/connect.js';

// Retrieves all authors from the database
const getAllAuthors = async () => {
  const db = getDb();
  const collection = db.collection('authors');
  const authors = await collection.find({}).toArray();

  return authors;
};

// Retrieves a single author by ID from the database
const getAuthorById = async (id) => {
  const db = getDb();
  const collection = db.collection('authors');
  const author = await collection.findOne({ id });

  return author;
};

// Creates a new author in the database
const createAuthor = async (author) => {
  const db = getDb();
  const collection = db.collection('authors');
  await collection.insertOne(author);

  return author;
};

// Updates an existing author in the database
const updateAuthor = async (id, author) => {
  const db = getDb();
  const collection = db.collection('authors');
  await collection.updateOne({ id }, { $set: author });

  return { id, ...author };
};

// Deletes an author from the database
const deleteAuthor = async (id) => {
  const db = getDb();
  const collection = db.collection('authors');
  const result = await collection.deleteOne({ id });

  return result;
};

// Checks if an author has any books associated with them
const authorHasBooks = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const count = await collection.countDocuments({ authorId: id });

  return count > 0;
};

export {
    getAllAuthors, getAuthorById,
    createAuthor, updateAuthor,
    deleteAuthor, authorHasBooks
};