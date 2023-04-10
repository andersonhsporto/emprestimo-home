import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../pages/home/home.component";
import {TableClientsComponent} from "../pages/table-clients/table-clients.component";
import {CreateUpdateClientComponent} from "../pages/create-update-client/create-update-client.component";


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'clientes/lista', component: TableClientsComponent
  },
  {
    path: 'clientes/cadastro', component: CreateUpdateClientComponent
  },
  {
    path: 'clientes/cadastro/:cpf', component: CreateUpdateClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
