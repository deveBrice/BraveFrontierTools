import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveFilterManagerService } from '../../../../shared-global/service/save-filter-manager.service';
import { FilterManagerService } from '../../../../shared-global/service/filter-manager.service';
import { UnitsListService } from '../../../units/shared/service/units-list.service';

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

  constructor(
    private saveFilterManagerService: SaveFilterManagerService,
    private filterManagerService: FilterManagerService,
    private unitsListService: UnitsListService
    
    ) { }

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
    const rarety = this.saveFilterManagerService.getFilter('rarety')

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
    
    this.filterManagerService.globaleFilter({from: 'unitsList', type: 'checkbox', keyApi: 'level', filterName: 'level', newValue: this.levelListResult}, this.unitsListService.filterListActivated$)
    this.checkeStateLevel(this.levelArray);

   let  raretyObject = {
      raretyArray: this.levelArray
   }

    this.saveFilterManagerService.setFilter('rarety', raretyObject)
  }

   // checked if all the value with state are false
   checkeStateLevel = (arrayList: any[]) => {
    let checker = arr => arr.every(v => v.state === false);

    let checkerResult = checker(arrayList)
     
    if(checkerResult === true) {
      this.saveFilterManagerService.removeFilter('rarety');
      return this.filterManagerService.globaleFilter(
        {from: 'unitsList', type: 'checkbox', keyApi: 'level', filterName: 'level', newValue: []}, 
        this.unitsListService.filterListActivated$
        )
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
