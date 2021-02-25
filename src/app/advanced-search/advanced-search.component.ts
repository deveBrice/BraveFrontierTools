import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { IUnitsList } from '../../interface/unitsList/iUnitsList.interface';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Input() advancedSearch$: Observable<Array<IUnitsList>>;
  @Output() searchByLevel$ = new EventEmitter<Observable<Array<any>>>();
  @Input() newResultSearch$: Observable<Array<any>>;

  constructor() { }

  ngOnInit(): void {
  }

  levelSearchResultEvent($event: Observable<Array<any>>) {
    this.searchByLevel$.emit($event);
  }

}
