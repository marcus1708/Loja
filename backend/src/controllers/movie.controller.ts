import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const createMovie = async (req: Request, res: Response) => {
  try {
    const {
      titulo,
      diretor,
      ano,
      genero,
      duracao,
      quantidade,
      idStore,
    } = req.body;

    // Validação básica
    if (
      !titulo ||
      !diretor ||
      !ano ||
      !genero ||
      !duracao ||
      quantidade == null ||
      !idStore
    ) {
      return res.status(400).json({
        erro: 'Campos obrigatórios faltando. Verifique os dados enviados.',
      });
    }

    const novoFilme = await Movie.create({
      titulo,
      diretor,
      ano,
      genero,
      duracao,
      quantidade,
      idStore,
    });

    const { id } = novoFilme;

    res.status(201).json({
      mensagem: 'Filme cadastrado com sucesso',
      id: id, // Retorna apenas o _id
    });
  } catch (error) {
    res.status(400).json({
      erro: 'Erro ao criar filme',
      detalhes: error instanceof Error ? error.message : error,
    });
  }
};

export const listarFilmes = async (_req: Request, res: Response) => {
  try {
    const filmes = await Movie.find();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao listar filmes',
      detalhes: error instanceof Error ? error.message : error,
    });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const filme = await Movie.findById(req.params.id);
    if (!filme) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.status(200).json(filme);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao buscar filme',
      detalhes: error instanceof Error ? error.message : error,
    });
  }
};

export const updateMoviePut = async (req: Request, res: Response) => {
  try {
    // Verificando se o ID fornecido é válido
    const movieId = req.params.id;
    if (!movieId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ erro: 'ID de filme inválido' });
    }

    // Tentando atualizar o filme com o ID fornecido
    const atualizado = await Movie.findByIdAndUpdate(
      movieId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!atualizado) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.status(200).json(atualizado);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao atualizar filme',
      detalhes: error instanceof Error ? error.message : error,
    });
  }
};


export const updateMoviePatch = async (req: Request, res: Response) => {
  try {
    const atualizado = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!atualizado) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.status(200).json(atualizado);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao atualizar parcialmente o filme',
      detalhes: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const deletado = await Movie.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.status(200).json({ mensagem: 'Filme excluído com sucesso' });
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao deletar filme',
      detalhes: error instanceof Error ? error.message : error,
    });
  }
};
