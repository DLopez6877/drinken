import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DrinkDetailsComponent } from './drink-details/drink-details.component';
import { EditDrinkComponent } from './edit-drink/edit-drink.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { routing } from './app.routing';
import { ApiService } from './services/api.service';
import { AddDrinkComponent } from './add-drink/add-drink.component';

@NgModule({
  declarations: [
    AppComponent,
    DrinkDetailsComponent,
    EditDrinkComponent,
    WelcomeComponent,
    AddDrinkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
