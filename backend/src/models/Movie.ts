import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMovie extends Document {
  titulo: string;
  diretor: string;
  ano: number;
  genero: string;
  duracao: number; // em minutos
  criadoEm: Date;
  quantidade: number; // quantidade em estoque
  idStore: Types.ObjectId;
}

const MovieSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  diretor: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: String, required: true },
  duracao: { type: Number, required: true }, // duração em minutos
  criadoEm: { type: Date, default: Date.now },
  quantidade: { type: Number, required: true, min: 0 }, // estoque mínimo 0
  idStore: { type: Schema.Types.ObjectId, required: true, ref: 'Store' },
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
