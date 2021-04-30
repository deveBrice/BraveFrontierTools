import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-elements-search',
  templateUrl: './elements-search.component.html',
  styleUrls: ['./elements-search.component.scss']
})
export class ElementsSearchComponent implements OnInit {
test = 0;
radioStatus = null;
elementsSearchResult: any[];
@Output() filterByElements = new EventEmitter<any>();
   
  constructor() { }

  ngOnInit(): void {

  }

  elementsList: any[] = [
    {name: 'Feu', state: false, elementPicture: 'checkbox-custom-fire'},
    {name: 'Eau', state: false, elementPicture: 'checkbox-custom-water'},
    {name: 'Terre', state: false, elementPicture: 'checkbox-custom-earth'},
    {name: 'Foudre', state: false, elementPicture: 'checkbox-custom-lightning'},
    {name: 'Lumière', state: false, elementPicture: 'checkbox-custom-light'},
    {name: 'Ténèbre', state: false, elementPicture: 'checkbox-custom-dark'}
  ] 

 get displayElementList (): any[] {
    return this.elementsList;
  }


  selectedElement = () => {
   
   this.displayElementList.reduce((elementsList: any[], elementsObject: any) => {
     if(elementsObject.state) {
       elementsList.push(elementsObject.name);
       this.elementsSearchResult = elementsList   
     }

     return elementsList;
    }, [])
    this.filterByElements.emit({type: 'checkbox', keyApi: 'element', filterName: 'element', newValue: this.elementsSearchResult})

    this.checkeStateElement(this.elementsList) 
  }

     // checked if all the value with state are false
     checkeStateElement = (arrayList: any[]) => {
      let checker = arr => arr.every(v => v.state === false);
  
      let checkerResult = checker(arrayList)
    
      if(checkerResult === true) {
  
       return this.filterByElements.emit({type: 'checkbox', keyApi: 'element', filterName: 'element', newValue: []})
      }
    }

}
