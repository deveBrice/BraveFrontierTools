import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

@Component({
  selector: 'app-units-special-filter',
  templateUrl: './units-special-filter.component.html',
  styleUrls: ['./units-special-filter.component.scss']
})

export class UnitsSpecialFilterComponent implements OnInit {

  specialUnitsArray: any[] = [];
  specialUnitsFilterResult: any[] = [];
  specialUnitsDropDown = {chevronName: "expand_less", state: true};

  constructor(
      private fb: FormBuilder, 
      private saveFilterManagerService: SaveFilterManagerService,
      private filterManagerService: FilterManagerService,
      private unitsListService: UnitsListService
  ) {}

  ngOnInit(): void {
    this.displaySpecialUnitsFilter()
  }

  specialUnits: any[] = [
    {name: 'exclusivités', state: false, genderPicture: 'checkbox-custom-male'},
    {name: 'collaborations', state: false, genderPicture: 'checkbox-custom-female'},
  ] 

  displaySpecialUnitsFilter = () => {
    this.specialUnitsArray = this.specialUnits
    const specialUnits = this.saveFilterManagerService.getFilter('specialUnits')
 
    if(specialUnits !== undefined) {
     
       this.specialUnitsArray = specialUnits.specialUnitsArray
    }
     return this.specialUnits;
  }

  selectedSpecialUnit = () => {
    this.specialUnitsArray.reduce((specialUnits: any[], specialUnitsObject: any) => {
      if(specialUnitsObject.state) {
        specialUnits.push(specialUnitsObject.name);
  
        this.specialUnitsFilterResult = specialUnits   
      }
  
      return specialUnits;
     }, [])
  
      this.filterManagerService.globaleFilter(
        
      {from: 'unitList', type: 'checkbox', keyApi: 'specialUnits', filterName: 'specialUnits', newValue: this.specialUnitsFilterResult}, 
      this.unitsListService.filterListActivated$
      )
      
      this.specialUnitsStateElement(this.specialUnitsArray)
  
      let specialUnitsObject = {
        gendersArray: this.specialUnitsArray
     }
  
     this.saveFilterManagerService.setFilter('specialUnits', specialUnitsObject)
  }

  specialUnitsStateElement = (arrayList: any[]) => {
    let checker = arr => arr.every(v => v.state === false);
  
    let checkerResult = checker(arrayList)
  
    if(checkerResult === true) {
      this.saveFilterManagerService.removeFilter('specialUnits');
     return this.filterManagerService.globaleFilter({from: 'unitsList', type: 'checkbox', keyApi: 'specialUnits', filterName: 'specialUnits', newValue: []}, this.unitsListService.filterListActivated$)
    }
  }

  dropDown = () => {
    this.specialUnitsDropDown.state =! this.specialUnitsDropDown.state
    
    if(this.specialUnitsDropDown.state === false) {
      this.specialUnitsDropDown.chevronName = "expand_more";
    } else {
      this.specialUnitsDropDown.chevronName = "expand_less";
    }
  }

}
