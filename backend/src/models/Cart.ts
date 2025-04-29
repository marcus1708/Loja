import mongoose, { Document, Schema } from 'mongoose';

interface LivroCarrinho {
  idBook: mongoose.Types.ObjectId;
  qtdBook: number;
}

interface FilmeCarrinho {
  idMovie: mongoose.Types.ObjectId;
  qtdMovie: number;
}

export interface ICart extends Document {
  idUser: mongoose.Types.ObjectId;
  idStore: mongoose.Types.ObjectId;
  books: LivroCarrinho[];
  movies: FilmeCarrinho[];
  criadoEm: Date;
}

const LivroCarrinhoSchema = new Schema<LivroCarrinho>(
  {
    idBook: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    qtdBook: { type: Number, required: true },
  },
  { _id: false }
);

const FilmeCarrinhoSchema = new Schema<FilmeCarrinho>(
  {
    idMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    qtdMovie: { type: Number, required: true },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idStore: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  books: { type: [LivroCarrinhoSchema], default: [] },
  movies: { type: [FilmeCarrinhoSchema], default: [] },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model<ICart>('Cart', CartSchema);
