import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Array de dias da semana
  weekDays = [
    { value: 'domingo', label: 'Domingo' },
    { value: 'segunda', label: 'Segunda-feira' },
    { value: 'terca', label: 'Terça-feira' },
    { value: 'quarta', label: 'Quarta-feira' },
    { value: 'quinta', label: 'Quinta-feira' },
    { value: 'sexta', label: 'Sexta-feira' },
    { value: 'sabado', label: 'Sábado' },
  ];

  // Variável que armazena o dia selecionado
  selectedDay: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Aqui pegamos o dia atual do sistema e configuramos o selectedDay
    const today = new Date();
    const currentDay = today.getDay(); // getDay() retorna de 0 (domingo) a 6 (sábado)

    // Agora vamos setar o dia atual corretamente
    this.selectedDay = this.weekDays[currentDay].value;
  }

  // Função de Seleção de Dia (se necessário para mudanças manuais)
  selectDay(day: any) {
    console.log('Dia selecionado:', day);
    this.selectedDay = day.value; // Altera o valor de selectedDay com o dia clicado
  }

  // Funções de navegação para as novas páginas
  goToExercicio() {
    this.router.navigate(['/exercicio']);
  }

  // Função para redirecionar para a página Nutriente Track
  goToNutriente() {
    this.router.navigate(['/nutriente-track']);
  }

  // Função de adicionar refeição
  onAdd() {
    console.log('Adicionar refeição');
  }
}
