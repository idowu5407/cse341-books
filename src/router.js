// src/router.js
import express from 'express';
import { getBooksHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBooksHandler);
router.get('/books/:id', getBooksHandler);

export default router;