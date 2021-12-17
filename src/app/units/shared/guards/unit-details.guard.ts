import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnitsListService } from '../service/units-list.service';
import { IUnitsList } from '../interface/units-list/iUnits-list.interface';

@Injectable({
  providedIn: 'root'
})

export class UnitDetailsGuard implements CanActivate {
  
  constructor(private router: Router, private unitsListService: UnitsListService) {}
  
  public checkUrl = (unitsList$: Observable<IUnitsList[]>, unitName$: Observable<string>, id$: Observable<number>) => {
    
    combineLatest(unitsList$, unitName$, id$).pipe(
      map(([unitsList, unitName, id]) => {
       const checkeUrlResult = unitsList.map(res => res.name.replace(/[, ()]+/g, "-").trim()).indexOf(unitName)
         if(checkeUrlResult === -1 || isNaN(id)) {
          alert('Unité inconnu!!!')
          this.router.navigate(['/unitsList'])
          }
        }
      )
    ).subscribe()
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean | UrlTree> | Promise<boolean|UrlTree>|boolean|UrlTree {
    const id$ = of(+next.url[1].path);
    const unitName$ = of(next.url[2].path);
    const unitsList$ = this.unitsListService.getUnitsList()
    this.checkUrl(unitsList$, unitName$, id$)
    return true
  }
  
}
