export class Objson {
  json: any;
}

export interface Objson{
    value: string; // Contiene la frase
  icon_url: string;
  id: string; // Identificador la frase aleatoria
  url: string; // URL que contiene el ID y permite recuperar la frase
}
