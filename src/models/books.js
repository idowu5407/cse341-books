// src/models/books.js
import { getDb } from '../db/connect.js';

// Retrieves all books from the database
const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();
  return books;
};

// Retrieves a single book by ID from the database
const getBookById = async (bookId) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ id: bookId });
  return book;
};

// Check whether an author exists
const authorExists = async (authorId) => {
  const db = getDb();
  const collection = db.collection('authors');

  const author = await collection.findOne({
    id: authorId
  });

  return author !== null;
};

// Create a book
const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');

  await collection.insertOne(book);

  return book;
};

// Update a book
const updateBook = async (id, book) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.updateOne(
    { id: id },
    { $set: book }
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return await collection.findOne({ id: id });
};

// Delete a book
const deleteBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.deleteOne({
    id: id
  });

  return result.deletedCount > 0;
};

export {
  getAllBooks, getBookById,
  authorExists, createBook,
  updateBook, deleteBook
};
