import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from '../../shared/material-module/material.module';

import { SearchMainFilterComponent } from './search-main-filter.component';
import { LevelSearchComponent } from './level-search/level-search.component';
import { ElementsSearchComponent } from './elements-search/elements-search.component';
import { SpecialAttackSearchComponent } from './special-attack-search/special-attack-search.component';
import { OrderSearchComponent } from './order-search/order-search.component';

import { UnitsListService } from '../../service/unitsList.service';
import { SaveFilterManagerService } from '../../service/saveFilterManager.service';
import { LoadingDataManagerService } from '../../service/loadingDataManager.service';
import { FilterManagerService } from '../../service/filterManager.service';
import { GenderFilterComponent } from './gender-filter/gender-filter.component';
import { DirectionFilterComponent } from './direction-filter/direction-filter.component';

@NgModule({
  declarations: [
    SearchMainFilterComponent,
    LevelSearchComponent,
    ElementsSearchComponent,
    SpecialAttackSearchComponent,
    OrderSearchComponent,
    GenderFilterComponent,
    DirectionFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UnitsListService, SaveFilterManagerService, LoadingDataManagerService, FilterManagerService],
  bootstrap: [SearchMainFilterComponent],
  exports:[SearchMainFilterComponent]
})
export class SearchMainFilterComponentModule { }
