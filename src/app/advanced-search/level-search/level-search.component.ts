import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor() { }

  ngOnInit(): void {
  
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
    return this.levelList;
  }

  selectedLevel(level: any) {
     level.state = !level.state;
   
     this.levelList.reduce((levels: any[] = [], levelChange: any = {}) => {
 
      if(levelChange.state === true) {
        
         levels.push(levelChange.icon)
         
         this.levelListResult = levels
   
      }  
      return levels
    }, [])

    this.levelSearchResult$.emit({type: 'checkbox', keyApi: 'level', filterName: 'level', newValue: this.levelListResult})
    this.checkeStateLevel(this.levelList);
  }

   // checked if all the value with state are false
   checkeStateLevel = (arrayList: any[]) => {
    let checker = arr => arr.every(v => v.state === false);

    let checkerResult = checker(arrayList)
  
    if(checkerResult === true) {
      return this.levelSearchResult$.emit({type: 'checkbox', keyApi: 'level', filterName: 'level', newValue: []})
    }
  }
}
