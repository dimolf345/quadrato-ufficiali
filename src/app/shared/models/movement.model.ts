import { DocumentReference } from '@angular/fire/compat/firestore';
import { Officer } from './officer.model';
import * as admin from 'firebase-admin';

export interface Movement {
  id_movimento?: string;
  categoria: typeof CATEGORIES[number];
  creato_il: admin.firestore.Timestamp | Date;
  data_pagamento: admin.firestore.Timestamp | Date;
  descrizione: string;
  effettuato_da: DocumentReference<Officer>;
  importo: number;
  note: string;
}

export const CATEGORIES = [
  'caffè',
  'vino',
  'regali',
  'gamella',
  'birre',
  'amari',
  'altro',
];
