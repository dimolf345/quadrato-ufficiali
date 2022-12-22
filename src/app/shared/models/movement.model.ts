import {
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Officer } from './officer.model';
import * as admin from 'firebase-admin';

export interface Movement {
  id_movimento?: string;
  categoria:
    | 'caffè'
    | 'vino'
    | 'regali'
    | 'gamella'
    | 'birre'
    | 'amari'
    | 'altro';
  creato_il: admin.firestore.Timestamp;
  data_pagamento: admin.firestore.Timestamp;
  descrizione: string;
  effettuato_da: DocumentReference<Officer> | Promise<DocumentData | undefined>;
  importo: number;
  note: string;
}
