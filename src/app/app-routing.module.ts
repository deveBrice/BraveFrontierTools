import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitsListComponent } from './unitsList/unitsList.component';
import { UnitsDetailsComponent } from './unitsList/units-details/units-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  /*{path: '', pathMatch: 'full', redirectTo: ''},*/
  {component: HomeComponent, path: ''},
  {component: UnitsListComponent, path: 'unitsList'},
  {component: UnitsDetailsComponent, path: 'units-details/:id/:name'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
