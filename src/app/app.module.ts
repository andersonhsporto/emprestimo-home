import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {ListClientsComponent} from './pages/list-clients/list-clients.component';
import {HttpClientModule} from "@angular/common/http";
import {CpfPipe} from './service/pipe/cpf/cpf.pipe';
import {TelephonePipe} from './service/pipe/telephone/telephone.pipe';
import {CreateClientComponent} from './pages/create-update-client/create-client.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListClientsComponent,
    CreateClientComponent,
    CpfPipe,
    TelephonePipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        RouterOutlet,
        RouterLinkActive,
        RouterLink,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
