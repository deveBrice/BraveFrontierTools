import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared-global/materials/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchMainFilterComponentModule } from './filters/search-main-filter/search-main-filter.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from '../shared-global/navigation/navigation.component';
import { UnitsListComponent } from './units/units-list/unitsList.component';
import { UnitsDetailsComponent } from './units/units-details/units-details.component';
import { SearchBarComponent } from './filters/search-bar/search-bar.component';
import { ScrollLoaderDataDirective } from '../directive/scrollLoaderData.directive';

import { DisplayPictureDirective } from './units/units-list/display-picture.directive';
import { TabsFiltersComponent } from './filters/tabs-filters/tabs-filters.component';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
