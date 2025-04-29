import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Book from '../models/Book';
import Movie from '../models/Movie';

export const adicionarAoCarrinho = async (req: Request, res: Response) => {
  try {
    const { idUser, idStore, books, movies } = req.body;

    if (!idUser || !idStore) {
      return res.status(400).json({ message: 'idUser e idStore são obrigatórios' });
    }

    const novoCarrinho = new Cart({
      idUser,
      idStore,
      books,
      movies
    });

    await novoCarrinho.save();

    res.status(201).json({
      id: novoCarrinho._id,
      message: 'Carrinho criado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao adicionar item ao carrinho',
      error: error instanceof Error ? error.message : error
    });
  }
};

export const listarCarrinhos = async (_req: Request, res: Response) => {
  try {
    const carrinhos = await Cart.find();
    res.status(200).json(carrinhos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar carrinhos', error });
  }
};

export const buscarCarrinhoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carrinho = await Cart.findById(id);

    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    res.status(200).json(carrinho);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carrinho', error });
  }
};

export const atualizarCarrinho = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { idMovie, quantidade } = req.body;

    const carrinhoAtualizado = await Cart.findByIdAndUpdate(
      id,
      { idMovie, quantidade },
      { new: true }
    );

    if (!carrinhoAtualizado) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    res.status(200).json(carrinhoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar carrinho', error });
  }
};

export const deletarCarrinho = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carrinho = await Cart.findByIdAndDelete(id);

    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    res.status(200).json({ message: 'Carrinho excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar carrinho', error });
  }
};

export const concluirCompra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carrinho = await Cart.findById(id);

    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    // Atualizar a quantidade dos livros
    for (const item of carrinho.books) {
      const livro = await Book.findById(item.idBook);
      if (livro) {
        livro.quantidade = Math.max(0, (livro.quantidade || 0) - item.qtdBook);
        await livro.save();
      } else {
        console.warn(`Livro com ID ${item.idBook} não encontrado`);
      }
    }

    // Atualizar a quantidade dos filmes
    for (const item of carrinho.movies) {
      console.log('🔍 Verificando filme no carrinho:', item);

      if (!item.idMovie || !item.qtdMovie) {
        console.warn('❌ Filme com dados incompletos:', item);
        continue;
      }

      const filme = await Movie.findById(item.idMovie);

      if (filme) {
        filme.quantidade = Math.max(0, (filme.quantidade || 0) - item.qtdMovie);
        await filme.save();
      } else {
        console.warn(`❌ Filme com ID ${item.idMovie} não encontrado`);
      }
    }

    // Excluir o carrinho após atualizar os estoques
    await Cart.findByIdAndDelete(id);

    res.status(200).json({ message: 'Compra concluída com sucesso e carrinho removido' });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao concluir compra',
      error: error instanceof Error ? error.message : error
    });
  }
};