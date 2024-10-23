import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciciosPage } from './exercicio.page'; // Confirme se o nome está correto

const routes: Routes = [
  {
    path: '',
    component: ExerciciosPage // Verifique se o nome está correto
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercicioPageRoutingModule {} // O nome da classe deve corresponder
