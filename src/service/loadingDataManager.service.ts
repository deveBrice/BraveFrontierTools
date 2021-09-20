import { Injectable } from '@angular/core';
import { UnitsListService } from './unitsList.service';

@Injectable()


export class LoadingDataManagerService {

   dataResult: Array<any> = [];
   loaderDataFlag = false;
   i = 0;

   unitsList: any[] = [];
   constructor(){}

   dataList = (data: any[]) => {
    this.i = 0;
    this.dataResult = []
    data.filter((res, i) => {
   
      if(this.i < 100) {
       
   
        if(this.i === i) {
        
          this.dataResult.push(res)
        }
      } else {
        
      }
      this.i += 1;
     })
     this.unitsList = data;
  
     return this.dataResult
  }

  loadMore = () => {
    this.i = 0;
    setTimeout(() => {
    while(this.i < 100) {
        let unitsListLength = this.dataResult.length;
        this.unitsList.filter((res, i) => {   
            if(unitsListLength === i) {
              this.dataResult.push(res)
            }
        });
        this.i += 1;
      }
  }, 500);
  
  }
}