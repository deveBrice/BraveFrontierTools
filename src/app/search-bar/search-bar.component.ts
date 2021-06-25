import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterManagerService } from '../../service/filterManager.service';

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

  constructor(private fb: FormBuilder, private filterManagerService: FilterManagerService) {
    this.displaySearchBar();
   }
  
  ngOnInit(): void {
    this.searchApi();
  }


  displaySearchBar = () => {
    this.rForm = this.fb.group({
      "search":[ '',[Validators.required, Validators.maxLength(100)]]
    })

    const unitText = this.filterManagerService.getFilter('unitText')

    if(unitText !== undefined) {
     
       this.rForm = unitText.formGroup;
    }
  }
  
  searchApi = () => {
    const searchText$: Observable<string> = this.rForm.valueChanges.pipe(
      map(text => {
          
        return text.search 
      })
    )

    let unitTextObject = {
       formGroup: this.rForm
    }
    this.filterManagerService.setFilter('unitText', unitTextObject)

   searchText$.subscribe (
      searchText => this.resultSearchTextField$.emit({type: 'inputText', keyApi: 'name', filterName: 'name', newValue:searchText})
   )
  }
}
