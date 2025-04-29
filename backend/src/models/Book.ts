import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBook extends Document {
  titulo: string;
  autor: string;
  ano: number;
  paginas: number;
  tema: string;
  criadoEm: Date;
  quantidade: number; 
  idStore: Types.ObjectId;
}

const BookSchema: Schema = new Schema({
  titulo: { type: String, required: true, unique: true },
  autor: { type: String, required: true },
  ano: { type: Number, required: true },
  paginas: { type: Number, required: true },
  tema: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  quantidade: { type: Number, required: true }, 
  idStore: { type: Schema.Types.ObjectId, ref: 'Store', required: true }// E aqui também!
});

export default mongoose.model<IBook>('Book', BookSchema);
