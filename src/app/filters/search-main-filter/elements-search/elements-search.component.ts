import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

@Component({
  selector: 'app-elements-search',
  templateUrl: './elements-search.component.html',
  styleUrls: ['./elements-search.component.scss']
})

export class ElementsSearchComponent implements OnInit {

test = 0;
radioStatus = null;
elementsSearchResult: any[] = [];
keyApiName: string
elementDropDown = {chevronName: "expand_less", state: true};
elementsArray: any[] = [];
@Output() filterByElements = new EventEmitter<any>();
   
  constructor(
    private saveFilterManagerService: SaveFilterManagerService,
    private filterManagerService: FilterManagerService,
    private unitsListService: UnitsListService
    ) { }

  ngOnInit(): void {
   this.displayElementList()
  }

  elementsList: any[] = [
    {name: 'Feu', state: false, elementPicture: 'checkbox-custom-fire'},
    {name: 'Eau', state: false, elementPicture: 'checkbox-custom-water'},
    {name: 'Terre', state: false, elementPicture: 'checkbox-custom-earth'},
    {name: 'Foudre', state: false, elementPicture: 'checkbox-custom-thunder'},
    {name: 'Lumière', state: false, elementPicture: 'checkbox-custom-light'},
    {name: 'Ténèbres', state: false, elementPicture: 'checkbox-custom-dark'}
  ] 

 displayElementList = () => {
   this.elementsArray = this.elementsList
   const element = this.saveFilterManagerService.getFilter('element')

   if(element !== undefined) {
    
      this.elementsArray = element.elementArray
      console.log(element)
   }
    return this.elementsList;
  }


  selectedElement = () => {
   
   this.elementsArray.reduce((elementsList: any[], elementsObject: any) => {
     if(elementsObject.state) {
       elementsList.push(elementsObject.name);

       this.elementsSearchResult = elementsList   
     }

     return elementsList;
    }, [])
    
    this.filterManagerService.globaleFilter(
    {from: 'unitsList', type: 'checkbox', keyApi: 'element', filterName: 'element', newValue: this.elementsSearchResult}, 
    this.unitsListService.filterListActivated$
    )

    this.checkeStateElement(this.elementsArray) 
    let  elementObject = {
      elementArray: this.elementsArray
   }

    this.saveFilterManagerService.setFilter('element', elementObject)
  }

     // checked if all the value with state are false
     checkeStateElement = (arrayList: any[]) => {
      let checker = arr => arr.every(v => v.state === false);
  
      let checkerResult = checker(arrayList)
    
      if(checkerResult === true) {
        this.saveFilterManagerService.removeFilter('element');
       return this.filterManagerService.globaleFilter({from: 'unitsList', type: 'checkbox', keyApi: 'element', filterName: 'element', newValue: []}, this.unitsListService.filterListActivated$)
      }
    }

    dropDown = () => {
      this.elementDropDown.state =! this.elementDropDown.state
    
      if(this.elementDropDown.state === false) {
        this.elementDropDown.chevronName = "expand_more";
      } else {
        this.elementDropDown.chevronName = "expand_less";
      }
    }

}
