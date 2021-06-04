import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UnitDetailsService } from '../../../service/unitDetails.service';
import { combineLatest, Observable } from 'rxjs';
import { IUnitDtails } from '../../../interface/unitDetails/iUnitDetails.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-units-details',
  templateUrl: './units-details.component.html',
  styleUrls: ['./units-details.component.scss']
})
export class UnitsDetailsComponent implements OnInit {
  unitUriParameter: number;
  displayUnitDetailResult: Array<IUnitDtails> = [];
  displayUnitDetails$: Observable<any>;
  empty = "";
  toggle: boolean;
  toggleValueDetails: boolean;
  text = "Afficher";
  chevronName = "expand_more";
  specialAttackObject = {leaderSkill: "leaderSkill", braveBurst: "braveBurst"}

  details = {
    leaderSkill: {state: false, chevronName: "expand_more"},
    braveBurst: {state: false, chevronName: 'expand_more'}
  }

  constructor(private ar: ActivatedRoute, private unitDetailsService: UnitDetailsService, private location: Location) { 
    this.unitUriParameter = ar.snapshot.params['id']
    this.getUriParameter()
  }
  

  ngOnInit(): void {

  }
   
  //get id in url barre and and compare with unitDetails
  getUriParameter = () => {
    const unitsParam$ = this.ar.paramMap.pipe(
      map(res => {
        return +res['params'].id; 
      })
    )

    this.displayUnitDetails$ = combineLatest(this.unitDetailsService.getUnitDetails(), unitsParam$).pipe(
      map(([unitDetails, unitsParam]) => 
        unitDetails.filter(
          ud => {
            if(ud.id === unitsParam) {
              return ud
            }
          
          }
          
        )
    ))
  }
   
  //display or hidden the lore
  loreDisplay = () => {
    this.toggle =! this.toggle
    if(this.toggle === true) {
      this.text = "Masquer"
    } else {
      this.text = "Afficher"
    }
  }


  //display or hidden the details of speciale attack
  specialAttackDetails = (specialAttackName: any) => {
  
    for(let ds in this.details) {
        if(ds === specialAttackName) {
          this.details[ds].state =! this.details[ds].state
          if(this.details[ds].state === true) {
            this.details[ds].chevronName = "expand_less";
          } else {
            this.details[ds].chevronName = "expand_more";
          }
        }
    }
  }

  //go back from units list
  goBack = (): void => {
     this.location.back();
  }
}
