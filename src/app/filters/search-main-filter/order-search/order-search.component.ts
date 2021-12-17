import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})

export class OrderSearchComponent implements OnInit {
  
  orderForm: FormGroup;
  
  @Output() filterByOrder = new EventEmitter<any>()
  orderDropDown = {chevronName: "expand_less", state: true};
 
  constructor(
    private fb: FormBuilder, 
    private saveFilterManagerService: SaveFilterManagerService,
    private filterManagerService: FilterManagerService,
    private unitsListService: UnitsListService
    ) { }
  

  ngOnInit(): void {
    this.displayOrderForm()
  }


   
  displayOrderForm = () => {
    
    this.orderForm = this.fb.group({
      order: ['numUnit', Validators.required]
    })


   let orderFormObject = {
       formGroup: this.orderForm
    }
    
    
  const order = this.saveFilterManagerService.setSaveFilterList('orderForm', orderFormObject)
    if(order !== 'saved') {
     this.orderForm = order.formGroup
    }
  }

  orderChange = (orderName: any) => {
     this.filterManagerService.globaleFilter(
       {from: 'unitList', type: 'radio', keyApi: orderName.value, filterName: 'order', newValue: orderName.value}, 
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
