import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IStore extends Document {
  nome: string;
  endereco: string;
  cep: string;
  telefone: string;
  criadoEm: Date;
  idUser: Types.ObjectId;
}

const StoreSchema: Schema = new Schema({
  nome: { type: String, required: true, unique: true },
  endereco: { type: String, required: true },
  cep: { type: String, required: true },
  telefone: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<IStore>('Store', StoreSchema);
