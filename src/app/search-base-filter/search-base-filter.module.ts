import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from '../../shared/material-module/material.module';

import { SearchBaseFilterComponent } from './search-base-filter.component';
import { LevelSearchComponent } from './level-search/level-search.component';
import { ElementsSearchComponent } from './elements-search/elements-search.component';
import { SpecialAttackSearchComponent } from './special-attack-search/special-attack-search.component';
import { OrderSearchComponent } from './order-search/order-search.component';

import { UnitsListService } from '../../service/unitsList.service';
import { SaveFilterManagerService } from '../../service/saveFilterManager.service';
import { LoadingDataManagerService } from '../../service/loadingDataManager.service';
import { FilterManagerService } from '../../service/filterManager.service';

@NgModule({
  declarations: [
    SearchBaseFilterComponent,
    LevelSearchComponent,
    ElementsSearchComponent,
    SpecialAttackSearchComponent,
    OrderSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UnitsListService, SaveFilterManagerService, LoadingDataManagerService, FilterManagerService],
  bootstrap: [SearchBaseFilterComponent],
  exports:[SearchBaseFilterComponent, LevelSearchComponent, ElementsSearchComponent]
})
export class AdvancedSearchModule { }
