import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss']
})

export class GenderFilterComponent implements OnInit {
  
  genderDropDown = {chevronName: "expand_less", state: true};
  gendersArray: any[] = [];
  gendersSearchResult: any[] = [];

  constructor(
      private fb: FormBuilder, 
      private saveFilterManagerService: SaveFilterManagerService,
      private filterManagerService: FilterManagerService,
      private unitsListService: UnitsListService
    ) {}

  ngOnInit(): void {
    this.displayGenderFilter()
  }

  genderList: any[] = [
    {name: 'male', state: false, genderPicture: 'checkbox-custom-male'},
    {name: 'femelle', state: false, genderPicture: 'checkbox-custom-female'},
    {name: 'sans genre', state: false, genderPicture: 'checkbox-custom-genderLess'},
  ] 

  displayGenderFilter = () => {
    this.gendersArray = this.genderList
    const genders = this.saveFilterManagerService.getFilter('gender')
 
    if(genders !== undefined) {
     
       this.gendersArray = genders.gendersArray
    }
     return this.genderList;
 }

 selectedGender = () => {
  this.gendersArray.reduce((gendersList: any[], gendersObject: any) => {
    if(gendersObject.state) {
      gendersList.push(gendersObject.name);

      this.gendersSearchResult = gendersList   
    }

    return gendersList;
   }, [])

    this.filterManagerService.globaleFilter(
      
    {from: 'unitList', type: 'checkbox', keyApi: 'gender', filterName: 'gender', newValue: this.gendersSearchResult}, 
    this.unitsListService.filterListActivated$
    )
    
    this.genderStateElement(this.gendersArray)

    let genderObject = {
      gendersArray: this.gendersArray
   }

   this.saveFilterManagerService.setFilter('gender', genderObject)
}

 // checked if all the value with state are false
 genderStateElement = (arrayList: any[]) => {
  let checker = arr => arr.every(v => v.state === false);

  let checkerResult = checker(arrayList)

  if(checkerResult === true) {
    this.saveFilterManagerService.removeFilter('gender');
   return this.filterManagerService.globaleFilter({from: 'unitsList', type: 'checkbox', keyApi: 'gender', filterName: 'gender', newValue: []}, this.unitsListService.filterListActivated$)
  }
}
  

  dropDown = () => {
    this.genderDropDown.state =! this.genderDropDown.state
    
    if(this.genderDropDown.state === false) {
      this.genderDropDown.chevronName = "expand_more";
    } else {
      this.genderDropDown.chevronName = "expand_less";
    }
  }

}
