import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUnitDtails } from '../interface/unit-details/iUnit-details.interface';

@Injectable({
    providedIn: 'root'
  })
  


export class UnitDetailsService {
    private readonly apiUnitDetails = 'assets/api/unit-details.json';
    private moreDetailsState: any[] = [
        {name: 'leaderSkill', state: false, chevronPosition: ""},
        {name: 'braveBurst', state: false, chevronPosition: 'expand_less'}
    ]

    constructor(private httpClient: HttpClient) {}

    moreDetailsArray = () => {
        return this.moreDetailsState
    }
         
    getUnitDetails = () => {
        return this.httpClient.get<Array<IUnitDtails>>(this.apiUnitDetails);
    }

   
}