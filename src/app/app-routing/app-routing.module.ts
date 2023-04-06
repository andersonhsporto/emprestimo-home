import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../pages/home/home.component";
import {ListClientsComponent} from "../pages/list-clients/list-clients.component";
import {CreateClientComponent} from "../pages/create-update-client/create-client.component";


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'clientes/lista', component: ListClientsComponent
  },
  {
    path: 'clientes/cadastro', component: CreateClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
