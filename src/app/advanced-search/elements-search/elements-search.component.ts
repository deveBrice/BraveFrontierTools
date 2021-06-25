import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterManagerService } from '../../../service/filterManager.service';

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
   
  constructor(private filterManagerService: FilterManagerService) { }

  ngOnInit(): void {
   this.displayElementList()
  }

  elementsList: any[] = [
    {name: 'Feu', state: false, elementPicture: 'checkbox-custom-fire'},
    {name: 'Eau', state: false, elementPicture: 'checkbox-custom-water'},
    {name: 'Terre', state: false, elementPicture: 'checkbox-custom-earth'},
    {name: 'Foudre', state: false, elementPicture: 'checkbox-custom-lightning'},
    {name: 'Lumière', state: false, elementPicture: 'checkbox-custom-light'},
    {name: 'Ténèbre', state: false, elementPicture: 'checkbox-custom-dark'}
  ] 

 displayElementList = () => {
   this.elementsArray = this.elementsList
   const element = this.filterManagerService.getFilter('element')

   if(element !== undefined) {
    
      this.elementsArray = element.elementArray
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
    this.filterByElements.emit({from: 'unitsList', type: 'checkbox', keyApi: 'element', filterName: 'element', newValue: this.elementsSearchResult})

    this.checkeStateElement(this.elementsArray) 
    let  elementObject = {
      elementArray: this.elementsArray
   }

    this.filterManagerService.setFilter('element', elementObject)
  }

     // checked if all the value with state are false
     checkeStateElement = (arrayList: any[]) => {
      let checker = arr => arr.every(v => v.state === false);
  
      let checkerResult = checker(arrayList)
    
      if(checkerResult === true) {
        this.filterManagerService.removeFilter('element');
       return this.filterByElements.emit({from: 'unitsList', type: 'checkbox', keyApi: 'element', filterName: 'element', newValue: []})
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
