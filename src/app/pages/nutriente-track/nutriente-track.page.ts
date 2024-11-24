import { Component } from '@angular/core';
import { NutrienteService } from '../../service/services/nutriente.service';

@Component({
  selector: 'app-nutriente-track',
  templateUrl: './nutriente-track.page.html',
  styleUrls: ['./nutriente-track.page.scss'],
})
export class NutrienteTrackPage {
  searchQuery: string = '';
  alimentos: any[] = [];

  constructor(private nutrienteService: NutrienteService) {}

  // Buscar alimentos quando o usuário digitar
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.alimentos = [];
      return;
    }

    this.nutrienteService.getAlimentoByName(this.searchQuery).subscribe(
      (result) => {
        this.alimentos = result;
      },
      (error) => {
        console.error('Erro ao carregar dados', error);
      }
    );
  }
}
