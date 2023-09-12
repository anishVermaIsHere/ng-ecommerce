import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { FooterComponent } from './core/layout/components/footer/footer.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { HomeComponent } from './core/components/home/home.component';
import { CarouselComponent } from './core/components/home/carousel/carousel.component';
import { CartComponent } from './core/components/cart/cart.component';
import { CartitemComponent } from './core/components/cart/cartitem/cartitem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Page404Component } from './core/components/page404/page404.component';
import { SearchresultComponent } from './core/components/searchresult/searchresult.component';
import { SearchComponent } from './core/layout/components/header/search/search.component';
import { AuthinterceptorService } from './shared/services/auth/authinterceptor.service';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CarouselComponent,
    CartComponent,
    CartitemComponent,
    Page404Component,
    SearchresultComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthinterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
