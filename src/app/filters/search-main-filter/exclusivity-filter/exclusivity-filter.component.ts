import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

@Component({
  selector: 'app-exclusivity-filter',
  templateUrl: './exclusivity-filter.component.html',
  styleUrls: ['./exclusivity-filter.component.scss']
})

export class ExclusivityFilterComponent implements OnInit {

  exclusivityArray: any[] = [];
  exclusivityFilterResult: any[] = [];
  exclusivityDropDown = {chevronName: "expand_less", state: true};

  constructor(
    private fb: FormBuilder, 
      private saveFilterManagerService: SaveFilterManagerService,
      private filterManagerService: FilterManagerService,
      private unitsListService: UnitsListService
  ) { }

  ngOnInit(): void {
    this.displayExclusivityFilter()
  }

  exclusivityList: any[] = [
    {name: 'EU', state: false, genderPicture: 'checkbox-custom-eu'},
    {name: 'Global', state: false, genderPicture: 'checkbox-custom-global'},
    {name: 'JP', state: false, genderPicture: 'checkbox-custom-jp'},
  ] 

  displayExclusivityFilter = () => {
    this.exclusivityArray = this.exclusivityList
    const exclusivityList = this.saveFilterManagerService.getFilter('exclusivity')
 
    if(exclusivityList !== undefined) {
     
       this.exclusivityArray = exclusivityList.exclusivityArray
    }
     return this.exclusivityList;
  }

  selectedExclusivity = () => {
    this.exclusivityArray.reduce((exclusivityArray: any[], exclusivityObject: any) => {
      if(exclusivityObject.state) {
        exclusivityArray.push(exclusivityObject.name);
  
        this.exclusivityFilterResult = exclusivityArray   
      }
  
      return exclusivityArray;
     }, [])
  
      this.filterManagerService.globaleFilter(
        
      {from: 'unitList', type: 'checkbox', keyApi: 'exclusivity', filterName: 'exclusivity', newValue: this.exclusivityFilterResult}, 
      this.unitsListService.filterListActivated$
      )
      
      this.exclusivityState(this.exclusivityArray)
  
      let exclusivityObject = {
        exclusivityArray: this.exclusivityArray
     }
  
     this.saveFilterManagerService.setFilter('exclusivity', exclusivityObject)
  }

  exclusivityState = (arrayList: any[]) => {
    let checker = arr => arr.every(v => v.state === false);
  
    let checkerResult = checker(arrayList)
  
    if(checkerResult === true) {
      this.saveFilterManagerService.removeFilter('exclusivity');
     return this.filterManagerService.globaleFilter({from: 'unitsList', type: 'checkbox', keyApi: 'exclusivity', filterName: 'exclusivity', newValue: []}, this.unitsListService.filterListActivated$)
    }
  }

  dropDown = () => {
    this.exclusivityDropDown.state =! this.exclusivityDropDown.state
    
    if(this.exclusivityDropDown.state === false) {
      this.exclusivityDropDown.chevronName = "expand_more";
    } else {
      this.exclusivityDropDown.chevronName = "expand_less";
    }
  }

}
