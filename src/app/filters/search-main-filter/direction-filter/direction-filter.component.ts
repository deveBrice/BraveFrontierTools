import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

@Component({
  selector: 'app-direction-filter',
  templateUrl: './direction-filter.component.html',
  styleUrls: ['./direction-filter.component.scss']
})
export class DirectionFilterComponent implements OnInit {
  
  directionForm: FormGroup;
  directionDropDown = {chevronName: "expand_less", state: true};

  constructor(private fb: FormBuilder, 
    private saveFilterManagerService: SaveFilterManagerService,
    private filterManagerService: FilterManagerService,
    private unitsListService: UnitsListService
    ) { }

  ngOnInit(): void {
    this.displayDirectionForm();
  }

  displayDirectionForm = () => {
     this.directionForm = this.fb.group({
       direction:['ascending', Validators.required]
     })

     let directionFormObject = {
      formGroup: this.directionForm
   }
   
   
 const direction = this.saveFilterManagerService.setSaveFilterList('directionForm', directionFormObject)
   if(direction !== 'saved') {
    this.directionForm = direction.formGroup
   }
  }

  directionChange = (directionName: any) => {
    this.filterManagerService.globaleFilter(
      {from: 'unitList', type: 'radio', keyApi: directionName.value, filterName: 'direction', newValue: directionName.value}, 
      this.unitsListService.filterListActivated$
    )
  }

  dropDown = () => {
    this.directionDropDown.state =! this.directionDropDown.state
    
    if(this.directionDropDown.state === false) {
      this.directionDropDown.chevronName = "expand_more";
    } else {
      this.directionDropDown.chevronName = "expand_less";
    }
  }

}
