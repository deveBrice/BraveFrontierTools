import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveFilterManagerService } from '../../../service/saveFilterManager.service';
import { FilterManagerService } from '../../../service/filterManager.service';
import { UnitsListService } from '../../../service/unitsList.service';

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss']
})

export class GenderFilterComponent implements OnInit {
  
  genderForm: FormGroup;
  orderDropDown = {chevronName: "expand_less", state: true};

  constructor(
      private fb: FormBuilder, 
      private saveFilterManagerService: SaveFilterManagerService,
      private filterManagerService: FilterManagerService,
      private unitsListService: UnitsListService
    ) {}

  ngOnInit(): void {
    this.displayGenderFilter()
  }

  displayGenderFilter = () => {
    this.genderForm = this.fb.group({
      gender: ['allGenders', Validators.required]
    })

    let genderFormObject = {
      formGroup: this.genderForm
   }
   
   
 const gender = this.saveFilterManagerService.setSaveFilterList('genderForm', genderFormObject)
   if(gender !== 'saved') {
    this.genderForm = gender.formGroup
   }
 }

 genderChange = (genderName: any) => {
    this.filterManagerService.globaleFilter(
    {from: 'unitList', type: 'radio', keyApi: genderName.value, filterName: 'gender', newValue: genderName.value}, 
    this.unitsListService.filterListActivated$
    )
}
  

  dropDown = () => {
    this.orderDropDown.state =! this.orderDropDown.state
    
    if(this.orderDropDown.state === false) {
      this.orderDropDown.chevronName = "expand_more";
    } else {
      this.orderDropDown.chevronName = "expand_less";
    }
  }

}
