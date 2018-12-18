import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class MatDropdownService {

  multiselectDDInit(List, optionDD, searchModel, _onDestroy) {
    optionDD? List.next(optionDD.slice()): '';
    searchModel.valueChanges
    .pipe(takeUntil(_onDestroy))
    .subscribe(() => {
        this.filterBanksMulti(optionDD, searchModel, List);
    });
  }


  filterBanksMulti(optionList, selectFormControlModel, filteredOptionSubject) {
    if (!optionList) {
      return;
    }
    // get the search keyword
    let search = selectFormControlModel.value;
    if (!search) {
      filteredOptionSubject.next(optionList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter the banks
    filteredOptionSubject.next(
      optionList.filter(
        bank => bank.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}

export interface MultiSelectModel {
  id: string;
  name: string;
}
