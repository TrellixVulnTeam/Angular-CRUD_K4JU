import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component'; 
import { ClientesComponent } from './views/clientes/clientes.component';
import { CustomerRegisterComponent } from './components/customer/customer-register/customer-register.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { DeleteComponent } from './components/customer/delete/delete.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'clientes', component: ClientesComponent
  },
  {
    path: 'clientes/cadastro', component: CustomerRegisterComponent
  },
  {
    path: 'clientes/update/:id', component: CustomerUpdateComponent
  },
  {
    path: 'clientes/delete/:id', component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
