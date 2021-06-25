import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators'; 
import { FilterManagerService } from '../../../service/filterManager.service';

@Component({
  selector: 'app-special-attack-search',
  templateUrl: './special-attack-search.component.html',
  styleUrls: ['./special-attack-search.component.scss']
})

export class SpecialAttackSearchComponent implements OnInit {

  specialAttackForm: FormGroup;
  formArray: any [] = [];
  keyApiName: string;
  @Output() filterBySpecialAttack = new EventEmitter<any>()
  specialAttackDropDown = {chevronName: "expand_less", state: true};

  constructor(private fb: FormBuilder, private filterManagerService: FilterManagerService) { 
    this.displaySpecialAttackForm()
  }

  ngOnInit(): void {
    this.selectedSpecialAttack()
  }

  displaySpecialAttackForm = () => {
    this.specialAttackForm = this.fb.group ({
      LS: [false],
      BB: [false]
    })

    const specialAttack = this.filterManagerService.getFilter('specialAttack')

    if(specialAttack !== undefined) {
     
       this.specialAttackForm = specialAttack.formGroup;
    }
  }


selectedSpecialAttack = () => {
  
   const specialAttack$ = this.specialAttackForm.valueChanges.pipe(
      map((res) => {
       this.formArray = [];
       this.formArray.push(res)
        this.formArray.reduce((specialAttackList: any[], specialAttackObject: {}) => {

         for(let sao in specialAttackObject) {
        
           if(specialAttackObject[sao]) {
             specialAttackList.push(sao.toLowerCase() + 'Informations')
             this.filterBySpecialAttack.emit({from: 'unitDetails', type: 'checkbox', keyApi: 'specialsAttacks', filterName: 'specialsAttacks', newValue: specialAttackList})
           } 
         }
        }, [])
        
        this.checkeStateElement(res) 
          let specialAttackObject = {
              formGroup: this.specialAttackForm
          }
          this.filterManagerService.setFilter('specialAttack', specialAttackObject)
      })
    )
  
    specialAttack$.subscribe()
  }

   // checked if all the value with state are false
   checkeStateElement = (ObjectList: any[]) => {
    const arrayList = Object.values(ObjectList)
    let checker = arr => arr.every(v => v === false);
    let checkerResult = checker(arrayList)
   
    if(checkerResult === true) {
      this.filterManagerService.removeFilter('specialAttack');
     return this.filterBySpecialAttack.emit({from: 'unitDetails', type: 'checkbox', keyApi: 'specialsAttacks', filterName: 'specialsAttacks', newValue: []})
    }
  }

  dropDown = () => {
    this.specialAttackDropDown.state =! this.specialAttackDropDown.state
    
      if(this.specialAttackDropDown.state === false) {
        this.specialAttackDropDown.chevronName = "expand_more";
      } else {
        this.specialAttackDropDown.chevronName = "expand_less";
      }
  }

}
