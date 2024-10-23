import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedDate: string = '';
  isDatePickerOpen: boolean = false;

  // Definimos o tipo do array weekDays
  weekDays: { label: string, value: number }[] = [
    { label: 'Dom', value: 1 },
    { label: 'Seg', value: 2 },
    { label: 'Ter', value: 3 },
    { label: 'Qua', value: 4 },
    { label: 'Qui', value: 5 },
    { label: 'Sex', value: 6 },
    { label: 'Sáb', value: 7 },
  ];

  constructor() {}

  // Definimos o tipo do parâmetro 'day' como o mesmo tipo usado no array weekDays
  selectDay(day: { label: string, value: number }): void {
    console.log('Dia selecionado:', day);
  }

  onAdd() {
    console.log('Adicionando nova entrada');
  }

}
