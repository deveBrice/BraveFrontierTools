import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from '../../../shared-global/materials/materials.module';

import { SearchMainFilterComponent } from './search-main-filter.component';
import { LevelSearchComponent } from './level-search/level-search.component';
import { ElementsSearchComponent } from './elements-search/elements-search.component';
import { SpecialAttackSearchComponent } from './special-attack-search/special-attack-search.component';
import { OrderSearchComponent } from './order-search/order-search.component';

import { UnitsListService } from '../../units/shared/service/units-list.service';
import { SaveFilterManagerService } from '../../../shared-global/service/save-filter-manager.service';
import { LoadingDataManagerService } from '../../../shared-global/service/loading-data-manager.service';
import { FilterManagerService } from '../../../shared-global/service/filter-manager.service';
import { GenderFilterComponent } from './gender-filter/gender-filter.component';
import { DirectionFilterComponent } from './direction-filter/direction-filter.component';
import { UnitsSpecialFilterComponent } from './units-special-filter/units-special-filter.component';
import { ExclusivityFilterComponent } from './exclusivity-filter/exclusivity-filter.component';
import { CollaborationsFilterComponent } from './collaborations-filter/collaborations-filter.component';

@NgModule({
  declarations: [
    SearchMainFilterComponent,
    LevelSearchComponent,
    ElementsSearchComponent,
    SpecialAttackSearchComponent,
    OrderSearchComponent,
    GenderFilterComponent,
    DirectionFilterComponent,
    UnitsSpecialFilterComponent,
    ExclusivityFilterComponent,
    CollaborationsFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [SearchMainFilterComponent],
  exports:[SearchMainFilterComponent]
})
export class SearchMainFilterComponentModule { }
