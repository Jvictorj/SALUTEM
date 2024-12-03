import { Component } from '@angular/core';
import { RefeicaoService } from '../../services/refeicao.service';

@Component({
  selector: 'app-refeicao',
  templateUrl: './refeicao.page.html',
  styleUrls: ['./refeicao.page.scss'],
})
export class RefeicaoPage {
  refeicoes: string[] = []; // Lista das refeições criadas
  alimentosPorRefeicao: any = {}; // Alimentos de cada refeição

  constructor(private refeicaoService: RefeicaoService) {}

  ngOnInit() {
    this.refeicoes = Object.keys(this.refeicaoService['refeicoes']);
    this.refeicoes.forEach((refeicao) => {
      this.alimentosPorRefeicao[refeicao] = this.refeicaoService.getAlimentosPorRefeicao(refeicao);
    });
  }
}
