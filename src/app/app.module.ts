import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { SortByPipe } from './sort-by.pipe';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule
  ],
  providers:[ProductService,CustomerService,{provide: LOCALE_ID, useValue: navigator.language}],
  bootstrap: [AppComponent]
})
export class AppModule { }
