export interface Officer {
  id_ufficiale?: string;
  attivo: boolean;
  cognome: string;
  nome: string;
  ddq: boolean;
  email: string;
  grado: string;
  data_imbarco: Date;
  pt: string;
}
