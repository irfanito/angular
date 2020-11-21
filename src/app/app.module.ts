import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {BasketComponent} from './basket/basket.component';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {ProductComponent} from './product/product.component';
import {CustomerService} from './services/customer.service';
import {ProductService} from './services/product.service';
import {SortByPipe} from './sort-by.pipe';

registerLocaleData(localeFr);

const routes: Routes = [
  {
    path: ''
    , component: HomeComponent
  },
  {
    path: 'basket'
    , component: BasketComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductComponent,
    SortByPipe,
    HomeComponent,
    BasketComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService, CustomerService, {provide: LOCALE_ID, useValue: 'FR'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
