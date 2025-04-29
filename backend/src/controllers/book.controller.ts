import { Request, Response } from 'express';
import Book from '../models/Book';

export const createBook = async (req: Request, res: Response) => {
  const { titulo, autor, ano, paginas, tema , quantidade,idStore} = req.body;

  try {
    const existingBook = await Book.findOne({ titulo });
    if (existingBook) {
      return res.status(404).json({ message: 'Livro já existe' });
    }

    const newBook = await Book.create({ titulo, autor, ano, paginas, tema, quantidade, idStore });
    res.status(201).json({ message: 'Livro cadastrado com sucesso', id: newBook._id });
  } catch {
    res.status(500).json({ message: 'Erro ao cadastrar livro' });
  }
};

export const listarLivros = async (_req: Request, res: Response) => {
  try {
    const livros = await Book.find();
    res.status(200).json(livros);
  } catch {
    res.status(500).json({ message: 'Erro ao listar livros' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.status(200).json(book);
  } catch {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
};

export const updateBookPut = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updated = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Livro com ID inválido' });
    }

    res.status(200).json({ message: 'Livro atualizado com sucesso' });
  } catch {
    res.status(404).json({ message: 'Livro com ID inválido' });
  }
};

export const updateBookPatch = updateBookPut;

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Livro já excluído' });
    }

    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Livro excluído com sucesso' });
  } catch {
    res.status(400).json({ message: 'Livro com ID inválido' });
  }
};
