import { Router } from 'express';
import {
  createBook,
  listarLivros,
  getBookById,
  updateBookPut,
  updateBookPatch,
  deleteBook,
} from '../controllers/book.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: CRUD de Livros
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cadastrar um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, autor, ano, paginas, tema, idStore]
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do livro
 *               autor:
 *                 type: string
 *                 description: Autor do livro
 *               ano:
 *                 type: integer
 *                 description: Ano de publicação
 *               paginas:
 *                 type: integer
 *                 description: Número de páginas
 *               tema:
 *                 type: string
 *                 description: Tema do livro
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade em estoque
 *               idStore:
 *                 type: string
 *                 description: ID da loja
 *     responses:
 *       201:
 *         description: Livro cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Listar todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   autor:
 *                     type: string
 *                   ano:
 *                     type: integer
 *                   paginas:
 *                     type: integer
 *                   tema:
 *                     type: string
 *       401:
 *         description: Não autorizado
 */
router.get('/', listarLivros);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Buscar livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualizar livro (completo)
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               paginas:
 *                 type: integer
 *               tema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', updateBookPut);

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Atualizar livro (parcial)
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               paginas:
 *                 type: integer
 *               tema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro parcialmente atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.patch('/:id', updateBookPatch);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Deletar livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', deleteBook);

export default router;