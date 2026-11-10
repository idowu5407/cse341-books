// src/router.js
import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     description: Returns a list of all books stored in the database.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Successfully retrieved all books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: b1
 *                   author:
 *                     type: string
 *                     example: Chinua Achebe
 *                   title:
 *                     type: string
 *                     example: Things Fall Apart
 *                   publicationDate:
 *                     type: string
 *                     example: '1958-06-17'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/books', getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     description: Returns a specific book using its unique ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the book.
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       200:
 *         description: Book successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b1
 *                 author:
 *                   type: string
 *                   example: Chinua Achebe
 *                 title:
 *                   type: string
 *                   example: Things Fall Apart
 *                 publicationDate:
 *                   type: string
 *                   example: '1958-06-17'
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/books/:id', getBookByIdHandler);

export default router;