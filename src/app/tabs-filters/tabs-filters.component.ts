import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-tabs-filters',
  templateUrl: './tabs-filters.component.html',
  styleUrls: ['./tabs-filters.component.scss']
})
export class TabsFiltersComponent implements OnInit {

  @Input() filters: Observable<any[]> = of([
    {name: 'Principale'},
    {name: 'Critiques'},
    {name: 'Base stats'},
    {name: 'Etincelles'},
    {name: 'Afflictions'},
    {name: 'Cristaux'},
    {name: 'Conversions'},
    {name: 'Elémentaires'},
    {name: 'Mitigations'},
  ])

  @Output() sendSelection = new EventEmitter()
  selectedIndex = 0;

  constructor() {}

  ngOnInit(): void {
    this.sendSelection.emit('Principale');
  }

  initTabSelected = (textLabel: string) => {
    this.sendSelection.emit(textLabel);
  }

  filterSelected = ($event: any) => {
    this.sendSelection.emit($event.tab.textLabel);
  }
}
