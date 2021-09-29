import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Observable } from 'rxjs';
import { IUnitsList } from '../../interface/unitsList/iUnitsList.interface';

@Component({
  selector: 'app-search-main-filter',
  templateUrl: './search-main-filter.component.html',
  styleUrls: ['./search-main-filter.component.scss']
})
export class SearchMainFilterComponent implements OnInit, OnChanges {

  @Input() currentFilterSelected: string;
  filterName: string
  
  @Input() advancedSearch$: Observable<Array<IUnitsList>>;
  @Input() newResultSearch$: Observable<Array<any>>;
  
  @Output() filterByOrderUpdate = new EventEmitter<any>();
  @Output() searchByLevel$ = new EventEmitter<Observable<Array<any>>>();
  @Output() filterByElementsUpdate = new EventEmitter<Observable<Array<any>>>();
  @Output() filterBySpecialAttackUpdate = new EventEmitter<Observable<Array<any>>>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterName = changes.currentFilterSelected.currentValue
  }

  filterByOrder = ($event) => {
    this.filterByOrderUpdate.emit($event)
  }

  levelSearchResultEvent($event: Observable<Array<any>>) {
    this.searchByLevel$.emit($event);
  }

  filterByElementsEvent = ($event) => {
    this.filterByElementsUpdate.emit($event)
  } 

  filterBySpecialAttack = ($event) => {
    this.filterBySpecialAttackUpdate.emit($event);
  }

}
