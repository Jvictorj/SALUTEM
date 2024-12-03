import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefeicaoService {
  private refeicoes: any = {};

  constructor() {}

  addAlimento(refeicao: string, alimento: any) {
    if (!this.refeicoes[refeicao]) {
      this.refeicoes[refeicao] = []; // Cria a refeição se não existir
    }
    this.refeicoes[refeicao].push(alimento);
  }

  getAlimentosPorRefeicao(refeicao: string) {
    return this.refeicoes[refeicao] || []; // Retorna a refeição ou um array vazio se não existir
  }
}
