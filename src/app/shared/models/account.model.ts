export interface Account {
  saldo: number;
  ultima_modifica: {
    data_modifica: Date;
    effettuata_da: string;
  };
  ultimi_movimenti: [];
}
