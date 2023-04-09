import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {TableClientsComponent} from './pages/table-clients/table-clients.component';
import {HttpClientModule} from "@angular/common/http";
import {CpfPipe} from './service/pipe/cpf/cpf.pipe';
import {TelephonePipe} from './service/pipe/telephone/telephone.pipe';
import {CreateClientComponent} from './pages/create-update-client/create-client.component';
import {ReactiveFormsModule} from "@angular/forms";
import localePt from '@angular/common/locales/pt';
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgxCurrencyModule} from "ngx-currency";
import {FieldErrorComponent} from './components/field-error/field-error.component';
import {FooterComponent} from './components/footer/footer.component';

registerLocaleData(localePt, 'pt');
export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TableClientsComponent,
    CreateClientComponent,
    CpfPipe,
    TelephonePipe,
    FieldErrorComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgOptimizedImage
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
