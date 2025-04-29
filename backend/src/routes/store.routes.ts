import { Router } from 'express';
import {
  cadastrarLoja,
  listarLojas,
  buscarLojaPorId,
  atualizarLoja,
  atualizarParcialLoja,
  deletarLoja,
} from '../controllers/store.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Lojas
 *   description: CRUD de Lojas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Loja:
 *       type: object
 *       required:
 *         - nome
 *         - endereco
 *         - cep
 *         - telefone
 *         - idUser
 *       properties:
 *         nome:
 *           type: string
 *         endereco:
 *           type: string
 *         cep:
 *           type: string
 *         telefone:
 *           type: string
 *         idUser:
 *           type: string
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Cadastra uma nova loja
 *     tags: [Lojas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loja'
 *     responses:
 *       201:
 *         description: Loja cadastrada com sucesso
 *       404:
 *         description: Loja já existe
 *       500:
 *         description: Erro ao cadastrar loja
 */
router.post('/', cadastrarLoja);

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Lista todas as lojas
 *     tags: [Lojas]
 *     responses:
 *       200:
 *         description: Lista de lojas
 */
router.get('/', listarLojas);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Busca uma loja por ID
 *     tags: [Lojas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loja encontrada
 *       404:
 *         description: Loja não encontrada
 */
router.get('/:id', buscarLojaPorId);

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     summary: Atualiza uma loja por ID
 *     tags: [Lojas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Loja'
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 */
router.put('/:id', atualizarLoja);

/**
 * @swagger
 * /stores/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma loja
 *     tags: [Lojas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Loja'
 *     responses:
 *       200:
 *         description: Loja atualizada parcialmente
 */
router.patch('/:id', atualizarParcialLoja);

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     summary: Deleta uma loja
 *     tags: [Lojas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loja deletada com sucesso
 */
router.delete('/:id', deletarLoja);

export default router;
