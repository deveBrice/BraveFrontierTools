import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators'; 

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

  constructor(private fb: FormBuilder) { 
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
     return this.filterBySpecialAttack.emit({from: 'unitDetails', type: 'checkbox', keyApi: 'specialsAttacks', filterName: 'specialsAttacks', newValue: []})
    }
  }

}
