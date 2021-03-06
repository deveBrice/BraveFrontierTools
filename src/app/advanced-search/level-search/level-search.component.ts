import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterManagerService } from '../../../service/filterManager.service';

@Component({
  selector: 'app-level-search',
  templateUrl: './level-search.component.html',
  styleUrls: ['./level-search.component.scss']
})

export class LevelSearchComponent implements OnInit {

  @Input() levelsearch$: Observable<Array<any>>;
  @Output() levelSearchResult$ = new EventEmitter<any>();
  @Input() newSearch$: Observable<Array<any>>;
  updateArray = [];
  levelListResult: any[] = []
  checkedLevel: boolean;
  filterName: string;
  raretyDropDown = {chevronName: "expand_less", state: true};
  levelArray: any[] = []
  rarety: any = '';

  constructor(private filterManagerService: FilterManagerService) { }

  ngOnInit(): void {

    this.displayLevelList();
  }

  levelList: any[] = [
    {name: '1 étoile', state: false, icon: "★"},
    {name: '2 étoiles', state: false, icon: "★★"},
    {name: '3 étoiles', state: false, icon: "★★★"},
    {name: '4 étoiles', state: false, icon: "★★★★"},
    {name: '5 étoiles', state: false, icon: "★★★★★"},
    {name: '6 étoiles', state: false, icon: "★★★★★★"},
    {name: '7 étoiles', state: false, icon: "★★★★★★★"},
    {name: 'Omni', state: false, icon: "★★★★★★★★"}
  ] 



  displayLevelList(): any[] {
    this.levelArray = this.levelList
    const rarety = this.filterManagerService.getFilter('rarety')

   if(rarety !== undefined) {
    
      this.levelArray = rarety.raretyArray
   }

    return this.levelArray;
  }



  selectedLevel(level: any) {
     level.state = !level.state;

     this.levelArray.reduce((levels: any[] = [], levelChange: any = {}) => {
 
      if(levelChange.state === true) {
        
         levels.push(levelChange.icon)
         
         this.levelListResult = levels
   
      }  
      return levels
    }, [])
    
    this.levelSearchResult$.emit({from: 'unitsList', type: 'checkbox', keyApi: 'level', filterName: 'level', newValue: this.levelListResult})
    this.checkeStateLevel(this.levelArray);

   let  raretyObject = {
      raretyArray: this.levelArray
   }

    this.filterManagerService.setFilter('rarety', raretyObject)
  }

   // checked if all the value with state are false
   checkeStateLevel = (arrayList: any[]) => {
    let checker = arr => arr.every(v => v.state === false);

    let checkerResult = checker(arrayList)
     
    if(checkerResult === true) {
      this.filterManagerService.removeFilter('rarety');
      return this.levelSearchResult$.emit({from: 'unitsList', type: 'checkbox', keyApi: 'level', filterName: 'level', newValue: []})
    }
  }

  dropDown = () => {
    this.raretyDropDown.state =! this.raretyDropDown.state
    
    if(this.raretyDropDown.state === false) {
      this.raretyDropDown.chevronName = "expand_more";
    } else {
      this.raretyDropDown.chevronName = "expand_less";
    }
  }
}
