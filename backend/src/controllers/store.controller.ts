import { Request, Response } from 'express';
import Store from '../models/Store';

export const cadastrarLoja = async (req: Request, res: Response) => {
  const { nome, endereco, cep, telefone, idUser } = req.body;

  try {
    const lojaExistente = await Store.findOne({ nome });
    if (lojaExistente) {
      return res.status(400).json({ mensagem: 'Loja já existe' });
    }

    const novaLoja = await Store.create({ nome, endereco, cep, telefone, idUser });
    res.status(201).json({ mensagem: 'Loja cadastrada com sucesso', id: novaLoja._id });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar loja', erro: error });
  }
};

export const listarLojas = async (_req: Request, res: Response) => {
  const lojas = await Store.find();
  res.json(lojas);
};

export const buscarLojaPorId = async (req: Request, res: Response) => {
  const loja = await Store.findById(req.params.id);
  if (!loja) {
    return res.status(404).json({ mensagem: 'Loja não encontrada' });
  }
  res.json(loja);
};

export const atualizarLoja = async (req: Request, res: Response) => {
  const loja = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!loja) {
    return res.status(404).json({ mensagem: 'Loja não encontrada' });
  }
  res.json({ mensagem: 'Loja atualizada com sucesso' });
};

export const atualizarParcialLoja = atualizarLoja;

export const deletarLoja = async (req: Request, res: Response) => {
  const loja = await Store.findById(req.params.id);
  if (!loja) {
    return res.status(404).json({ mensagem: 'Loja já excluída' });
  }

  await Store.findByIdAndDelete(req.params.id);
  res.json({ mensagem: 'Loja excluída com sucesso' });
};
