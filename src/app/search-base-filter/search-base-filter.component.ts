import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { IUnitsList } from '../../interface/unitsList/iUnitsList.interface';

@Component({
  selector: 'app-search-base-filter',
  templateUrl: './search-base-filter.component.html',
  styleUrls: ['./search-base-filter.component.scss']
})
export class SearchBaseFilterComponent implements OnInit {
  @Input() advancedSearch$: Observable<Array<IUnitsList>>;
  @Input() newResultSearch$: Observable<Array<any>>;
  
  @Output() filterByOrderUpdate = new EventEmitter<any>();
  @Output() searchByLevel$ = new EventEmitter<Observable<Array<any>>>();
  @Output() filterByElementsUpdate = new EventEmitter<Observable<Array<any>>>();
  @Output() filterBySpecialAttackUpdate = new EventEmitter<Observable<Array<any>>>();

  constructor() { }

  ngOnInit(): void {
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
