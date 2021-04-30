  globaleFilter2 = (newFilter: any) => {

    const registerFilter$ = this.filtreActivated$.pipe (
     map(fa => {
      const checkedFilterExist = fa.map((check) => check.filterName).indexOf(newFilter.filterName); 
        if(checkedFilterExist === - 1) {
              fa.push(newFilter);
          } else {
            fa.splice(checkedFilterExist, 1);
            fa.push(newFilter);
          }
          return fa;
        }) 
    );

   const removeFilter$: Observable<any[]> = registerFilter$.pipe (
    map(res => {
       const indexPositionFilter = res.map((r) => r.filterName).indexOf(newFilter.filterName)
       if(newFilter.newValue === " " || newFilter.newValue.length === 0) {
        res.splice(indexPositionFilter, 1)
       }
     //  console.log(res)
        return res;
    })
   );
   
   const transformObject$: Observable<any> = removeFilter$.pipe (
     
     map(res => res.filter((fa) => {
       console.log(res)
    
       if(Array.isArray(fa.newValue) === true) {
        this.convertInObject = {};
         for(let f of fa.newValue) {
     
        
           if(this.convertInObject[fa.name] !== f) {
            
           return this.convertInObject[fa.name] = f
    
        
           }
         }
       }
      
      
      
     }
  
     ))
   )

   transformObject$.subscribe(
    transformObject => console.log(transformObject)
   )

 /* let test$ = combineLatest(this.unitsList$, removeFilter$).pipe(
     map(([unitsList, removeFilter]) => 
     
     unitsList.filter (

       init => {
               removeFilter.filter (
                 res => {
                  
                  //this.test2 = res.newValue.indexOf(init[res.keyApi]) !== -1;
                 console.log(init)
                 this.test2 = init[res.keyApi].indexOf(res.newValue) !== -1 
                 res.newValue   
              })

              return this.test2
              //console.log(init['name'])
           
          }
        )
      )
   )
   test$.subscribe (
    test => console.log(test)
   )*/


  /* transformObject$.subscribe(
    transformObject => console.log(transformObject)
   )*/
 
  /* const filteringUnitsList$: Observable<any[]> = removeFilter$.pipe (
     switchMap(fa =>  {
       return this.initialUnitsList$ = this.initialUnitsList$.pipe (
         map((res) => res.filter((item: any, index) => {
       
           
          for(let f of fa) {
          
          return item[f.keyApi].indexOf(f.newValue)
          }
         
     
         }))
         
       )
     })
   )
   filteringUnitsList$.subscribe (
     test => this.unitsListService.behaviorSubjectUpdateUnitsList$.next(test)
   )*/




   /*filteringUnitsList$.subscribe (

    filteringUnitsList => {
      if(this.filterList.length !== 0) {
         console.log(filteringUnitsList)
         return filteringUnitsList
      } else {
       return this.allUnitsList
      }
    }
   )*/
 }
