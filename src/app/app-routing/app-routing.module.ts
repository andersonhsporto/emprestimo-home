import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../pages/home/home.component";
import {ListClientsComponent} from "../pages/list-clients/list-clients.component";


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'clientes' , component: ListClientsComponent
  },
  {
    path: 'clientes/cadastro', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
