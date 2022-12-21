import { DocumentReference } from '@angular/fire/compat/firestore';

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
  creato_il: Date;
  data_pagamento: Date;
  descrizione: string;
  effettuato_da: DocumentReference;
  importo: number;
  note: string;
}
