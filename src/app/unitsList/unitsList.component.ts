import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, observable, of, combineLatest, from, merge  } from 'rxjs';
import { elementAt, switchMap } from 'rxjs/operators';
import { UnitsListService } from '../../service/unitsList.service';
import { UnitDetailsService } from '../../service/unitDetails.service'
import { IUnitsList } from '../../interface/unitsList/iUnitsList.interface';
import { filter, map, take, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common'
import { LoadingDataManagerService } from 'src/service/loadingDataManager.service';

@Component({
  selector: 'app-units-list',
  templateUrl: './unitsList.component.html',
  styleUrls: ['./unitsList.component.scss']
})

export class UnitsListComponent implements OnInit, OnDestroy {

   unitsList$: Observable<IUnitsList[]>;
   initialUnitsList$: Observable<Array<IUnitsList>> = this.unitsListService.getUnitsList();
   behaviorSubjectUpdateUnitsList$: BehaviorSubject<Array<IUnitsList>>;
   
   unitsListResult$: Observable<IUnitsList[]>
   obj = {}
   chain:string = '';
   unitsListArray = [];

   
  constructor(private unitsListService: UnitsListService, 
              private router: Router, 
              private unitDetailsService: UnitDetailsService, 
              private loadingDataManagerService: LoadingDataManagerService) {
  }

  ngOnInit(): void {
    this.displayUnitsList();

    this.unitsListService.getUnitsList()
    .subscribe(res => {
      res.filter(a => {
       this.obj[a.id] = a
      })
    //  console.log(this.obj)
    })
    
   const unitDetails$ = this.unitDetailsService.getUnitDetails().pipe (
     map(res => {
      res.filter(a => {
        this.obj[a.id] = a
       })
       return this.obj
     })
   )

   const filterUnits$ = combineLatest(this.unitsListService.getUnitsList(), unitDetails$).pipe (
      map(([unitsList, unitDetails])=> {
        unitsList.filter(res => {
         const test = Object.keys(unitDetails[res.id])
           const result = test.map(res => res).indexOf("specialsAttacks")
        //   console.log(result)
            if(result !== -1) {
           //  console.log(unitDetails[res.id])
            }
     
        })
      })
   )

   filterUnits$.subscribe()

   /* .subscribe(res => {
      res.filter(a => {
       this.obj[a.id] = a
      })
 
    })*/
  }

  displayUnitsList = () => {
    
    this.unitsList$ = this.unitsListService.unitsList$;
  }



  onScroll = () => {
    this.loadingDataManagerService.loadMore()
     console.log("test")
  }






  searchByInputTextEvent = ($event: any) => {
    this.globaleFilter($event, this.unitsListService.filterListActivated$)
  }

  filterByOrderUpdate = ($event: any) => {
    this.globaleFilter($event, this.unitsListService.filterListActivated$)
  }

  searchByLevelEvent = ($event: any) => {
     this.globaleFilter($event, this.unitsListService.filterListActivated$)
  }


  searchByElementEvent = ($event) => {
      this.globaleFilter($event, this.unitsListService.filterListActivated$);
  }

  filterBySpecialAttackUpdate = ($event) => {
    this.globaleFilter($event, this.unitsListService.filterListActivated$);
  }

 sortByName = (object: any) => {
  this.unitsListArray.push(object)
            
  this.unitsListArray.sort(function(a,b){

    return a.name.localeCompare(b.name)
  })

   return this.unitsListArray;
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
          
  
             
            for(let details in unitDetails[init.id][rf]) {
          
              if(removeFilter[rf].includes(details)) {
                this.loadingDataManagerService.loadMore()
                searchUnitDetails = true;
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
       //  console.log(test)
      this.unitsListService.behaviorSubjectUpdateUnitsList$.next(test)
    
    }
  )
 }

 selectedUnit = (unitsList: any) => {
   this.router.navigate(["/units-details", unitsList.id, unitsList.name.replace(" ", "-")])
 }


ngOnDestroy() {
  //this.subscription$.unsubscribe();
}

}
