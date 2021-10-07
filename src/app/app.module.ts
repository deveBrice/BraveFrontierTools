import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material-module/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchMainFilterComponentModule } from './search-main-filter/search-main-filter.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { UnitsListComponent } from './unitsList/unitsList.component';
import { UnitsDetailsComponent } from './unitsList/units-details/units-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ScrollLoaderDataDirective } from '../directive/scrollLoaderData.directive';

import { UnitsListService } from '../service/unitsList.service';
import { UnitDetailsService } from '../service/unitDetails.service';

import { DisplayPictureDirective } from './unitsList/display-picture.directive';
import { TabsFiltersComponent } from './tabs-filters/tabs-filters.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    UnitsListComponent,
    DisplayPictureDirective,
    SearchBarComponent,
    UnitsDetailsComponent,
    ScrollLoaderDataDirective,
    TabsFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SearchMainFilterComponentModule,
    InfiniteScrollModule
  ],
  providers: [UnitsListService, UnitDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
