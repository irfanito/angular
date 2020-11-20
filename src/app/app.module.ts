import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {ProductComponent} from './product/product.component';
import {CustomerService} from './services/customer.service';
import {ProductService} from './services/product.service';
import {SortByPipe} from './sort-by.pipe';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductComponent,
    SortByPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService, CustomerService, {provide: LOCALE_ID, useValue: 'FR'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
