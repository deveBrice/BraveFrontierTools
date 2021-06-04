import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUnitDtails } from '../interface/unitDetails/iUnitDetails.interface';

@Injectable()


export class UnitDetailsService {
    apiUnitDetails = 'assets/api/unitDetails.json'


    private moreDetailsState: any[] = [
        {name: 'leaderSkill', state: false, chevronPosition: ""},
        {name: 'braveBurst', state: false, chevronPosition: 'expand_less'}
    ]

    moreDetailsArray = () => {
        return this.moreDetailsState
    }
         
        
    
    constructor(private httpClient: HttpClient) {}

    getUnitDetails = () => {
        return this.httpClient.get<Array<IUnitDtails>>(this.apiUnitDetails);
    }

   
}