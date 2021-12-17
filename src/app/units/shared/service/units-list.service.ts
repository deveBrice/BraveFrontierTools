import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUnitsList } from '../interface/units-list/iUnits-list.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription, of } from 'rxjs'
import { LoadingDataManagerService } from '../../../../shared-global/service/loading-data-manager.service';

@Injectable({
  providedIn: 'root'
})

export class UnitsListService implements OnDestroy { 
    private readonly api = 'assets/api/units-list.json';
    unitsList$: Observable<Array<IUnitsList>>;
    behaviorSubjectUpdateUnitsList$: BehaviorSubject<Array<IUnitsList>>;
    subscription$: Subscription;
    //currentFilter = {array: []}
    filterListActivated$ = of({});



    constructor(private httpClient: HttpClient, private loadingDataManagerService: LoadingDataManagerService){
        this.behaviorSubjectUpdateUnitsList$ = <BehaviorSubject<Array<IUnitsList>>> new BehaviorSubject([]);
        this.unitsList$ = this.behaviorSubjectUpdateUnitsList$.asObservable()
        this.subscribeUnitsList()
        
    }

    getUnitsList = () => {
        return this.httpClient.get<Array<IUnitsList>>(this.api);
    }

    subscribeUnitsList = () => {
      this.subscription$ = this.getUnitsList().subscribe(
            unitsList => {
              const test = this.loadingDataManagerService.dataList(unitsList)
              return this.behaviorSubjectUpdateUnitsList$.next(test)
            }
        )
    }


    updateUnitsList = (unitsList$: Observable<any[]>) => {
   
      this.subscription$ = unitsList$.subscribe(
        unitsList => {
      
         return this.behaviorSubjectUpdateUnitsList$.next(unitsList)
        }
       )
       
    }


    ngOnDestroy(){
      this.subscription$.unsubscribe();
    }
}