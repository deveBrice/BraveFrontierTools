import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  rForm: FormGroup

  @Input() searchTextField$: Observable<Array<any>>; 
  @Output() resultSearchTextField$ = new EventEmitter<any>();
  @Input() newResultSearch$: Observable<Array<any>>;
  searchApi$: Observable<Array<any>>;

  constructor(private fb: FormBuilder) {
    this.displaySearchBar();
   }
  
  ngOnInit(): void {
    this.searchApi();
  }


  displaySearchBar = () => {
    this.rForm = this.fb.group({
      "search":[ '',[Validators.required, Validators.maxLength(100)]]
    })
  }
  
  searchApi = () => {

    const searchText$: Observable<string> = this.rForm.valueChanges.pipe(
      map(text => {
       
        return text.search 
      })
    )

   searchText$.subscribe (
    searchText => this.resultSearchTextField$.emit({type: 'inputText', keyApi: 'name', filterName: 'name', newValue:searchText})
   )
  }
}
