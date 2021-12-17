import { Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-search-main-filter',
  templateUrl: './search-main-filter.component.html',
  styleUrls: ['./search-main-filter.component.scss']
})

export class SearchMainFilterComponent implements OnInit, OnChanges {

  @Input() currentFilterSelected: string;
  filterName: string
  
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterName = changes.currentFilterSelected.currentValue
  }
}