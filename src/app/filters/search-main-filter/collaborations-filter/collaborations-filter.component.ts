import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

@Component({
  selector: 'app-collaborations-filter',
  templateUrl: './collaborations-filter.component.html',
  styleUrls: ['./collaborations-filter.component.scss']
})

export class CollaborationsFilterComponent implements OnInit {

  collaborationArray: any[] = [];
  collaborationFilterResult: any[] = [];
  collaborationDropDown = {chevronName: "expand_less", state: true};

  constructor(
    private fb: FormBuilder, 
      private saveFilterManagerService: SaveFilterManagerService,
      private filterManagerService: FilterManagerService,
      private unitsListService: UnitsListService
  ) { }

  ngOnInit(): void {
    this.displayCollaborationFilter()
  }

  collaborationList: any[] = [
    {name: 'Emperor SaGa', state: false, genderPicture: 'checkbox-custom-eu'},
    {name: 'Deemo', state: false, genderPicture: 'checkbox-custom-global'},
    {name: 'Alchemist code', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Fairy Tail', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Final Fantasy Brave Exvius', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Guilty Gear', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'King of Fighter', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'My Hero Academia', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Samouraï Champloo', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Secret of Mana', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Tokyo Ghoul', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Trigun', state: false, genderPicture: 'checkbox-custom-jp'},
    {name: 'Vocaloïd', state: false, genderPicture: 'checkbox-custom-jp'},
  ] 

  displayCollaborationFilter = () => {
    this.collaborationArray = this.collaborationList
    const collaboration = this.saveFilterManagerService.getFilter('collaboration')
 
    if(collaboration !== undefined) {
     
       this.collaborationArray = collaboration.collaborationArray
    }
     return this.collaborationList;
  }

  selectedCollaboration = () => {
    this.collaborationArray.reduce((collaborationArray: any[], collaborationObject: any) => {
      if(collaborationObject.state) {
        collaborationArray.push(collaborationObject.name);
  
        this.collaborationFilterResult = collaborationArray   
      }
  
      return collaborationArray;
     }, [])
  
      this.filterManagerService.globaleFilter(
        
      {from: 'unitList', type: 'checkbox', keyApi: 'collaboration', filterName: 'collaboration', newValue: this.collaborationFilterResult}, 
      this.unitsListService.filterListActivated$
      )
      
      this.collaborationState(this.collaborationArray)
  
      let collaborationObject = {
        collaborationArray: this.collaborationArray
     }
  
     this.saveFilterManagerService.setFilter('collaboration', collaborationObject)
  }

  collaborationState = (arrayList: any[]) => {
    let checker = arr => arr.every(v => v.state === false);
  
    let checkerResult = checker(arrayList)
  
    if(checkerResult === true) {
      this.saveFilterManagerService.removeFilter('collaboration');
     return this.filterManagerService.globaleFilter({from: 'unitsList', type: 'checkbox', keyApi: 'collaboration', filterName: 'collaboration', newValue: []}, this.unitsListService.filterListActivated$)
    }
  }

  dropDown = () => {
    this.collaborationDropDown.state =! this.collaborationDropDown.state
    
    if(this.collaborationDropDown.state === false) {
      this.collaborationDropDown.chevronName = "expand_more";
    } else {
      this.collaborationDropDown.chevronName = "expand_less";
    }
  }


}
