// src/controllers/books.js
import { getAllBooks } from '../models/books.js';

import {
  getAllBooks, getBookById, 
  authorExists, createBook,
  updateBook, deleteBook
 } from '../models/books.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Create a new book
const createBookHandler = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body ?? {};

    // Validate required fields
    if (
      typeof id !== 'string' || !id.trim() ||
      typeof authorId !== 'string' || !authorId.trim() ||
      typeof title !== 'string' || !title.trim() ||
      typeof publicationDate !== 'string' || !publicationDate.trim()
    ) {
      return res.status(400).json({
        message: 'All fields are required: id, authorId, title, publicationDate'
      });
    }

    // Check for duplicate book ID
    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'A book with this ID already exists'
      });
    }

    // Check whether the author exists
    const validAuthor = await authorExists(authorId);

    if (!validAuthor) {
      return res.status(400).json({
        message: 'Author does not exist'
      });
    }

    const newBook = {
      id: id.trim(),
      authorId: authorId.trim(),
      title: title.trim(),
      publicationDate: publicationDate.trim()
    };

    const createdBook = await createBook(newBook);

    return res.status(201).json(createdBook);
  } catch (error) {
    console.error('POST /books failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Update an existing book
const updateBookHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    // Check whether the book exists
    const existingBook = await getBookById(requestedId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    const { authorId, title, publicationDate } = req.body ?? {};

    // Validate required fields
    if (
      typeof authorId !== 'string' || !authorId.trim() ||
      typeof title !== 'string' || !title.trim() ||
      typeof publicationDate !== 'string' || !publicationDate.trim()
    ) {
      return res.status(400).json({
        message: 'All fields are required: authorId, title, publicationDate'
      });
    }

    // Check whether the author exists
    const validAuthor = await authorExists(authorId);

    if (!validAuthor) {
      return res.status(400).json({
        message: 'Author does not exist'
      });
    }

    const updatedBook = await updateBook(requestedId, {
      authorId: authorId.trim(),
      title: title.trim(),
      publicationDate: publicationDate.trim()
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('PUT /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Delete an existing book
const deleteBookHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const deleted = await deleteBook(requestedId);

    if (!deleted) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('DELETE /books/:id failed:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};


export {
  getBooksHandler, getBookByIdHandler,
  createBookHandler, updateBookHandler,
  deleteBookHandler
};
export { getBooksHandler };
