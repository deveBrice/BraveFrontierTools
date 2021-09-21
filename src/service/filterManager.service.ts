import { Injectable, OnInit } from '@angular/core';
import { UnitsListService } from './unitsList.service';
import { Observable, BehaviorSubject, Subscription, observable, of, combineLatest, from, merge  } from 'rxjs';
import { filter, map, take, distinctUntilChanged } from 'rxjs/operators';
import { UnitDetailsService } from '../service/unitDetails.service'
import { IUnitsList } from '../interface/unitsList/iUnitsList.interface';
import { LoadingDataManagerService } from 'src/service/loadingDataManager.service';

@Injectable()


export class FilterManagerService {
    unitsList$: Observable<IUnitsList[]>;
    initialUnitsList$: Observable<Array<IUnitsList>> = this.unitsListService.getUnitsList();
    behaviorSubjectUpdateUnitsList$: BehaviorSubject<Array<IUnitsList>>;
    
    unitsListResult$: Observable<IUnitsList[]>
    obj = {}
    chain:string = '';
    unitsListArray = [];

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


 
  let unitsFilter$: Observable<any> = combineLatest(this.initialUnitsList$, removeFilter$, unitDetails$).pipe(
      
    map(([initialUnitsList, removeFilter, unitDetails]) => 
    
    initialUnitsList.filter (
      init => {
       
        if(Object.keys(removeFilter).length === 0) {
      
          return initialUnitsList
        }

         for(let rf in removeFilter) {
          let checkboxFilter = false;
          let searchUnitName = false;
          let searchUnitDetails = false;
          let alphabetical = false;
          let numero = false;
          
      
          if(Array.isArray(removeFilter[rf])) {
             if(removeFilter[rf].includes(init[rf])){
                checkboxFilter = true;
             } 
          } 

          
          if(rf === 'name') {
            searchUnitName = init[rf].includes(removeFilter[rf])
            
          }
          
            if(rf === 'specialsAttacks' && unitDetails[init.id] !== undefined) {
              for(let details in unitDetails[init.id][rf]) {
                 if(removeFilter[rf].includes(details)) {
                        this.loadingDataManagerService.loadMore()
                        searchUnitDetails = true;
                    }
                }
            }
             
           
              if(removeFilter[rf] === "name") {
                  alphabetical = true
              }

   
          
              if(removeFilter[rf] === "numUnit") {
                  numero = true
               }
        
           if(checkboxFilter === false && searchUnitName === false && searchUnitDetails === false && alphabetical === false && numero === false) {
      
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
             unitsFilter.sort(function(a, b) {
               return a.numUnit - b.numUnit
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