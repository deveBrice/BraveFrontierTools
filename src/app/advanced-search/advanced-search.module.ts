import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitsListService } from '../../service/unitsList.service';
import { MaterialModule } from '../../shared/material-module/material.module';
import { FormsModule } from '@angular/forms';

import { AdvancedSearchComponent } from './advanced-search.component';
import { LevelSearchComponent } from './level-search/level-search.component';
import { ElementsSearchComponent } from './elements-search/elements-search.component';

@NgModule({
  declarations: [
    AdvancedSearchComponent,
    LevelSearchComponent,
    ElementsSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [UnitsListService],
  bootstrap: [AdvancedSearchComponent],
  exports:[AdvancedSearchComponent, LevelSearchComponent, ElementsSearchComponent]
})
export class AdvancedSearchModule { }
