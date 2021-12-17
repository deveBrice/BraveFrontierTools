import { Injectable, OnInit } from '@angular/core';
import { UnitsListService } from '../../app/units/shared/service/units-list.service';
import { Observable, BehaviorSubject, Subscription, observable, of, combineLatest, from, merge  } from 'rxjs';
import { filter, map, take, distinctUntilChanged } from 'rxjs/operators';
import { UnitDetailsService } from '../../app/units/shared/service/unit-details.service'
import { IUnitsList } from '../../app/units/shared/interface/units-list/iUnits-list.interface';
import { LoadingDataManagerService } from 'src/shared-global/service/loading-data-manager.service';

@Injectable({
  providedIn: 'root'
})



export class FilterManagerService {
    unitsList$: Observable<IUnitsList[]>;
    initialUnitsList$: Observable<Array<IUnitsList>> = this.unitsListService.getUnitsList();
    behaviorSubjectUpdateUnitsList$: BehaviorSubject<Array<IUnitsList>>;
    
    unitsListResult$: Observable<IUnitsList[]>
    obj = {}
    chain:string = '';
    unitsListArray = [];
    count: number = 0;
    text: string = '';

    constructor(private unitDetailsService: UnitDetailsService, 
                private unitsListService: UnitsListService,
                private loadingDataManagerService: LoadingDataManagerService
                ){}

  ngOnInit(){
    this.unitsListService.getUnitsList()
    .subscribe(res => {
      res.filter(a => {
       this.obj[a.id] = a
      })
    //  console.log(this.obj)
    })
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


   const unitDetails$ = this.unitDetailsService.getUnitDetails().pipe (
    map(res => {
     res.filter(a => {
       this.obj[a.id] = a
      })
      return this.obj
    })
  )

  let unitsFilter$: Observable<any> = combineLatest(this.initialUnitsList$, removeFilter$, unitDetails$, filterListActivated$).pipe(
      
    map(([initialUnitsList, removeFilter, unitDetails, filterListActivated]) => 
    
    initialUnitsList.filter (
      init => {
       
        if(Object.keys(removeFilter).length === 0) {
      
          return initialUnitsList
        }

         for(let rf in removeFilter) {
        
          let resultFilter = false;

          if(Array.isArray(removeFilter[rf])) {
       
              resultFilter = removeFilter[rf].includes(init[rf]);
          } 

        
          if(rf === 'name') {
            resultFilter = init[rf].includes(removeFilter[rf])
          }

          if(rf === 'gender') {
            const genderName = init[rf]['alt'].substring(5).replace(' ', '')
            resultFilter = removeFilter[rf].includes(genderName);  
          }
          
            if(rf === 'specialsAttacks' && unitDetails[init.id] !== undefined) {
              for(let details in unitDetails[init.id][rf]) {
                    this.loadingDataManagerService.loadMore()
                    resultFilter = removeFilter[rf].includes(details)
                    
                }
            }
             
           
              if(removeFilter[rf] === "name" || removeFilter[rf] === "numUnit") {
                
                  resultFilter = true;
              }

              if(rf === "direction") {
                resultFilter = true;
              }

        
           if(resultFilter === false) {
 
              return false
            
           }

         }
     
        return true
         
      })) 
  )

   unitsFilter$ = combineLatest(unitsFilter$, removeFilter$).pipe(
    map(([unitsFilter, removeFilter]) => {
        for(let rf in removeFilter) {
          if(removeFilter[rf] === "name") {
             this.text = 'alphabetique';
             unitsFilter.sort(function(a, b) {
               return a.name.localeCompare(b.name)
             })
          }
        }
        this.loadingDataManagerService.loadMore()
        return unitsFilter;
      } 
    )
  )

  unitsFilter$ = combineLatest(unitsFilter$, removeFilter$).pipe(
    map(([unitsFilter, removeFilter]) => {
        for(let rf in removeFilter) {
          if(removeFilter[rf] === "numUnit") {
            this.text = '';
             unitsFilter.sort(function(a, b) {
               return a.numUnit - b.numUnit
             })
          }
        }
        return unitsFilter;
      } 
    )
  )

  unitsFilter$ = combineLatest(unitsFilter$, removeFilter$).pipe(
    map(([unitsFilter, removeFilter]) => {
        for(let rf in removeFilter) {
          if(removeFilter[rf] === "descending") {
             unitsFilter.reverse(function(a, b) {
               return a.id - b.id
             })
          }
          if(removeFilter[rf] === "ascending" && this.text ==='') {
            unitsFilter.sort(function(c, d) {
              return c.id - d.id
            })
         }

         if(removeFilter[rf] === "ascending" && this.text !=='') {
          unitsFilter.sort(function(c, d) {
            return c.title > d.title ? -1 : 1;
          })
       }
        }
        return unitsFilter;
      } 
    )
  )

  unitsFilter$.subscribe(
    unitsFilter => {

      const test = this.loadingDataManagerService.dataList(unitsFilter)
      this.unitsListService.behaviorSubjectUpdateUnitsList$.next(test)
    
    }
  )
 }
}