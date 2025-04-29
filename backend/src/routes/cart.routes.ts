import { Router } from 'express';
import {
  adicionarAoCarrinho,
  listarCarrinhos,
  buscarCarrinhoPorId,
  atualizarCarrinho,
  deletarCarrinho,
  concluirCompra
} from '../controllers/cart.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Carrinhos
 *   description: CRUD carrinhos com livros e filmes
 */

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Criar um novo carrinho com livros e filmes
 *     tags: [Carrinhos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUser
 *               - idStore
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: ID do usuário
 *               idStore:
 *                 type: string
 *                 description: ID da loja
 *               books:
 *                 type: array
 *                 description: Lista de livros no carrinho
 *                 items:
 *                   type: object
 *                   properties:
 *                     idBook:
 *                       type: string
 *                       description: ID do livro
 *                     qtdBook:
 *                       type: integer
 *                       description: Quantidade do livro
 *               movies:
 *                 type: array
 *                 description: Lista de filmes no carrinho
 *                 items:
 *                   type: object
 *                   properties:
 *                     idMovie:
 *                       type: string
 *                       description: ID do filme
 *                     qtdMovie:
 *                       type: integer
 *                       description: Quantidade do filme
 *     responses:
 *       201:
 *         description: Carrinho criado com sucesso
 */
router.post('/', adicionarAoCarrinho);

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Listar todos os carrinhos
 *     tags: [Carrinhos]
 *     responses:
 *       200:
 *         description: Lista de carrinhos
 */
router.get('/', listarCarrinhos);

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Buscar um carrinho por ID
 *     tags: [Carrinhos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do carrinho
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho encontrado
 *       404:
 *         description: Carrinho não encontrado
 */
router.get('/:id', buscarCarrinhoPorId);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Atualizar um carrinho existente
 *     tags: [Carrinhos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do carrinho
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carrinho'
 *     responses:
 *       200:
 *         description: Carrinho atualizado com sucesso
 *       404:
 *         description: Carrinho não encontrado
 */
router.put('/:id', atualizarCarrinho);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Deletar um carrinho
 *     tags: [Carrinhos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do carrinho a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho deletado com sucesso
 *       404:
 *         description: Carrinho não encontrado
 */
router.delete('/:id', deletarCarrinho);

/**
 * @swagger
 * /carts/{id}/checkout:
 *   delete:
 *     summary: Finalizar a compra e atualizar o estoque
 *     tags: [Carrinhos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do carrinho a ser finalizado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compra finalizada com sucesso
 *       400:
 *         description: Falha na finalização da compra
 *       404:
 *         description: Carrinho não encontrado
 */
router.delete('/:id/checkout', concluirCompra);

export default router;
