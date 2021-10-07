import { Component, OnInit} from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { UnitsListService } from '../../service/unitsList.service';
import { IUnitsList } from '../../interface/unitsList/iUnitsList.interface';
import { LoadingDataManagerService } from 'src/service/loadingDataManager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-units-list',
  templateUrl: './unitsList.component.html',
  styleUrls: ['./unitsList.component.scss']
})

export class UnitsListComponent implements OnInit {

   unitsList$: Observable<IUnitsList[]>;
   initialUnitsList$: Observable<Array<IUnitsList>> = this.unitsListService.getUnitsList();
   behaviorSubjectUpdateUnitsList$: BehaviorSubject<Array<IUnitsList>>;
   
   unitsListResult$: Observable<IUnitsList[]>
   obj = {}
   chain:string = '';
   unitsListArray = [];

   currentFilterSelected: string;

   
  constructor(private unitsListService: UnitsListService, 
              private loadingDataManagerService: LoadingDataManagerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.displayUnitsList();
  }

  displayUnitsList = () => {
    
    this.unitsList$ = this.unitsListService.unitsList$;
  }

  onScroll = () => {
    this.loadingDataManagerService.loadMore()
  }

  getSelection = ($event) => {
    this.currentFilterSelected = $event;
  }

  selectedUnit = (unitsList: any) => {
    this.router.navigate(["/units-details", unitsList.id, unitsList.name.replace(" ", "-")])
  }
}
