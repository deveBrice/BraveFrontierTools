import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitsListComponent } from './units/units-list/unitsList.component';
import { UnitsDetailsComponent } from './units/units-details/units-details.component';
import { HomeComponent } from './home/home.component';
import { UnitDetailsGuard } from './units/shared/guards/unit-details.guard';

const routes: Routes = [
  /*{path: '', pathMatch: 'full', redirectTo: ''},*/
  {component: HomeComponent, path: ''},
  {component: UnitsListComponent, path: 'unitsList'},
  {component: UnitsDetailsComponent, path: 'units-details/:id/:name', canActivate: [UnitDetailsGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
