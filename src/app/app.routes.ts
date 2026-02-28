import { Routes } from '@angular/router';
import { ListaComponent } from './chamados/lista/lista';
import { FormComponent } from './chamados/form/form';

export const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'novo', component: FormComponent }
];