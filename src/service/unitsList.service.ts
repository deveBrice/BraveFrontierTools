import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUnitsList } from '../interface/unitsList/iUnitsList.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription, of } from 'rxjs'
import { LoadingDataManagerService } from './loadingDataManager.service';

@Injectable()

export class UnitsListService implements OnDestroy { 
    api = 'assets/api/unitsList.json';
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