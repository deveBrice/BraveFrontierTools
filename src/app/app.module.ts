import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material-module/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdvancedSearchModule } from './advanced-search/advanced-search.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { UnitsComponent } from './units/units.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { UnitsListService } from '../service/unitsList.service';

import { DisplayPictureDirective } from './units/display-picture.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    UnitsComponent,
    DisplayPictureDirective,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AdvancedSearchModule
  ],
  providers: [UnitsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
