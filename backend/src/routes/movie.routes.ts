import { Router } from 'express';
import {
  createMovie,
  listarFilmes,
  getMovieById,
  updateMoviePut,
  updateMoviePatch,
  deleteMovie
} from '../controllers/movie.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: CRUD de Filmes
 */

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Cadastrar um novo filme
 *     tags: [Filmes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, diretor, ano, genero, duracao, quantidade, idStore]
 *             properties:
 *               titulo:
 *                 type: string
 *               diretor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               genero:
 *                 type: string
 *               duracao:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *               idStore:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filme cadastrado com sucesso
 */
router.post('/', createMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Listar todos os filmes
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes
 */
router.get('/', listarFilmes);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Buscar filme por ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Filme encontrado
 *       404:
 *         description: Filme não encontrado
 */
router.get('/:id', getMovieById);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Atualizar filme (completo)
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, diretor, ano, genero, duracao, quantidade, idStore]
 *             properties:
 *               titulo:
 *                 type: string
 *               diretor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               genero:
 *                 type: string
 *               duracao:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *               idStore:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filme atualizado
 *       404:
 *         description: Filme não encontrado
 */
router.put('/:id', updateMoviePut);

/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Atualizar filme (parcial)
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
*             type: object
 *             required: [titulo, diretor, ano, genero, duracao, quantidade, idStore]
 *             properties:
 *               titulo:
 *                 type: string
 *               diretor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               genero:
 *                 type: string
 *               duracao:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *               idStore:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filme atualizado parcialmente
 *       404:
 *         description: Filme não encontrado
 */
router.patch('/:id', updateMoviePatch);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Deletar filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Filme deletado
 *       404:
 *         description: Filme não encontrado
 */
router.delete('/:id', deleteMovie);

export default router;
