import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, observable, of, combineLatest, from, merge  } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UnitsListService } from '../../service/unitsList.service';
import { IUnitsList } from '../../interface/unitsList/iUnitsList.interface';
import { filter, map, take, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})


export class UnitsComponent implements OnInit, OnDestroy {
  
   unitsList$: Observable<IUnitsList[]>;
   initialUnitsList$: Observable<Array<IUnitsList>> = this.unitsListService.getUnitsList();
   behaviorSubjectUpdateUnitsList$: BehaviorSubject<Array<IUnitsList>>;
   filterListActivated$ = of({});
   unitsListResult$: Observable<IUnitsList[]>

  constructor(private unitsListService: UnitsListService) {}

  ngOnInit(): void {
    this.displayUnitsList();
  }

  displayUnitsList = () => {

    this.unitsList$ = this.unitsListService.unitsList$;
    
  }


  searchByInputTextEvent = ($event: any) => {
    this.globaleFilter($event, this.filterListActivated$)
  }


  searchByLevelEvent = ($event: any) => {
     this.globaleFilter($event, this.filterListActivated$)
  }


  searchByElementEvent = ($event) => {
      this.globaleFilter($event, this.filterListActivated$);
  }

  //Combine all the filters and return one new unitsList containing the filter applicable
  globaleFilter = (newFilter: any, filterListActivated$: Observable<any>) => {
    
    
    //add a new filter different from those already saved 
    //if the filter exist already, he put back the value of filter to update 
    const registerFilter$ = filterListActivated$.pipe (
     map(fa => {
      const checkedFilterExist = Object.keys(fa).map((check) => check).indexOf(newFilter.filterName)
       if(checkedFilterExist === -1) {
         fa[newFilter.filterName] = newFilter.newValue;

       } else {
        delete fa[fa.filterName];
        fa[newFilter.filterName] = newFilter.newValue;
       }
           return fa
        }) 
        
    );
  
    //remove the filter current of the filter list if he is emptty
   const removeFilter$: Observable<any> = registerFilter$.pipe (
    map(res => {
       if(res[newFilter.filterName] === "" || res[newFilter.filterName].length === 0) {
        delete res[newFilter.filterName]
       }
        return res;
    })
   );


  const unitsFilter$: Observable<any> = combineLatest(this.initialUnitsList$, removeFilter$).pipe(
    map(([initialUnitsList, removeFilter]) => 
    initialUnitsList.filter (
      init => {
       
        if(Object.keys(removeFilter).length === 0) {
          return initialUnitsList;
        }

         for(let rf in removeFilter) {
          let checkboxFilter = false;
          let searchUnitName = false;

          if(Array.isArray(removeFilter[rf]) === true) {
             if(removeFilter[rf].includes(init[rf])){
                checkboxFilter = true;
             }
           
          }
       
          if(rf === 'name') {
            searchUnitName = init[rf].includes(removeFilter[rf])
          }
        
           if(checkboxFilter === false && searchUnitName === false) {
    
              return false
            
           }

         }
      
        return true
         
      })) 
  )

  unitsFilter$.subscribe(
    unitsFilter => {
       this.unitsListService.behaviorSubjectUpdateUnitsList$.next(unitsFilter)
    }
  )
 }


ngOnDestroy() {
  //this.subscription$.unsubscribe();
}

}
