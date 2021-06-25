import { Injectable } from "@angular/core";

@Injectable()

export class FilterManagerService {

    public filterManagerObject: any = {}

    setSaveFilterList = (filterName: string, filterObject: any) => {
        const checkedFilterExist = Object.keys(this.filterManagerObject).map((check) => check).indexOf(filterName)
        if(checkedFilterExist === -1) {
            this.filterManagerObject[filterName] = filterObject
            return 'saved'
        } else {
            for(let fmo in this.filterManagerObject) {
                if(fmo === filterName) {
                    return this.filterManagerObject[fmo];
                }
            }
        }
    }

    setFilter = (filterName: string, filterObject: any) => {
        const checkedFilterExist = Object.keys(this.filterManagerObject).map((check) => check).indexOf(filterName)
        if(checkedFilterExist === -1) {
            this.filterManagerObject[filterName] = filterObject
            return 'saved'
        }
    }

    getFilter = (filterName: string) => {
        for(let fmo in this.filterManagerObject) {
            if(fmo === filterName) {
                return this.filterManagerObject[fmo];
            } 
        }
    }
    
    removeFilter = (filterName: string) => {
        const checkedFilterExist = Object.keys(this.filterManagerObject).map((check) => check).indexOf(filterName)
        if(checkedFilterExist !== -1) {
            delete this.filterManagerObject[filterName]
        }
    }
}