import { Component, OnInit} from '@angular/core';
import { Observable, BehaviorSubject, of} from 'rxjs';
import { UnitsListService } from '../units/shared/service/units-list.service';
import { IUnitsList } from '../units/shared/interface/units-list/iUnits-list.interface';
import { LoadingDataManagerService } from 'src/shared-global/service/loading-data-manager.service';
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
   fixedPicture: any = {
    swordIcon: 'assets/imgs/anime_fight_icon.png',
    altSwordIcon: 'anime fight icon',
    doubleSwordIcon: 'assets/imgs/arena_fight_icon.png',
    altDoubleSwordIcon: 'arena fight icon',
    dungeonField: 'assets/imgs/fields/dungeon_battle.jpg',
    altDungeonField: 'donjon nature',
    arenaField: 'assets/imgs/fields/arena.jpg',
    altArenaField: 'Arena'
   } 

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
