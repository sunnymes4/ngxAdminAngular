import { Component, OnInit, Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatDropdownService, MultiSelectModel } from './mat-dropdown.service';

@Component({
  selector: 'ngx-mat-dropdown',
  providers: [MatDropdownService],
  template: `
    <mat-form-field class="full-width">
      <mat-select class="span-text"  [formControl]="formSelectModel" placeholder="{{placeholder}}" [multiple]="isMultiSelect" #multiSelect="ngForm"
        (change)="onChangeDD($event, multiSelect)" [required]="required">
        <ngx-mat-select-search [formControl]="formSearchModel" placeholderLabel="{{placeholderLabel}}" *ngIf="enableSearch"></ngx-mat-select-search>

        <mat-option (click)="selectAll(true, multiSelect, formOptionDD)" class="mat-option-0" #matCheck >Check All</mat-option>
        <mat-option (click)="selectAll(false, multiSelect, formOptionDD)" class="mat-option-1" #matUnCheck > Uncheck All</mat-option>
        <mat-option *ngFor="let formOptionDD of formOptionList | async" [value]="formOptionDD">
          {{formOptionDD.name}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <span *ngIf="formSelectModel.value?.length > 1" class="additional-selection">
      (+{{formSelectModel.value.length - 1}} {{formSelectModel.value?.length === 2 ? 'other' : 'others'}})
    </span>
  `,
  styleUrls: ['./mat-dropdown.component.scss']
})
export class MatDropdownComponent implements OnInit {

  private formSelectModel: FormControl = new FormControl();
  private formSearchModel: FormControl = new FormControl();
  private formOptionList: ReplaySubject<MultiSelectModel[]> = new ReplaySubject<MultiSelectModel[]>(1);
  private formOptionDD: MultiSelectModel[] = [];  
  private _onDestroy = new Subject<void>();

  @Output() selectedModelData = new EventEmitter();
  @ViewChild('matCheck') matCheck;
  @ViewChild('matUnCheck') matUnCheck;
  @Input() required;
  @Input() placeholder;
  @Input() optionList;
  @Input() placeholderLabel: string;
  @Input() isMultiSelect: boolean;
  @Input() checkOption: boolean;
  @Input() enableSearch: boolean;

  constructor(
    private _matDropdownSearch: MatDropdownService,
  ) { }

  ngOnInit() {
    this.applyCSS();
  }

  ngOnChanges() {    
    if(this.optionList && this.optionList.length > 0){
      this.getDDList();
    }    
  }

  applyCSS() {
    this.matUnCheck._element.nativeElement.firstElementChild.style.fontSize = '16px';
    this.matUnCheck._element.nativeElement.firstElementChild.style.fontWeight = 'bold';
    this.matUnCheck._element.nativeElement.firstElementChild.style.marginTop = '3px';
    this.matCheck._element.nativeElement.firstElementChild.style.fontSize = '16px';
    this.matCheck._element.nativeElement.firstElementChild.style.fontWeight = 'bold';
    this.matCheck._element.nativeElement.firstElementChild.style.marginTop = '3px';
    if(this.checkOption === false){
      this.matCheck._element.nativeElement.style.display = 'none';
      this.matUnCheck._element.nativeElement.style.display = 'none';
    }
    else{
      this.matUnCheck._element.nativeElement.style.display = 'none';
    } 
  }

  
  getDDList() {  
    
    this.formOptionDD = this.optionList;
    this._matDropdownSearch.multiselectDDInit(this.formOptionList, this.formOptionDD, this.formSearchModel, this._onDestroy);    
  }

  selectAll(checkAll, select, values) {
    if (select.value.length == 1) {
      this.formSelectModel.setValue(values);
      this.selectedModelData.emit(this.formSelectModel.value);
      this.matCheck._element.nativeElement.style.display = 'none';
      this.matUnCheck._element.nativeElement.style.display = 'block';
    }
    else {
      this.formSelectModel.setValue([]);
      this.selectedModelData.emit(this.formSelectModel.value);
      this.matUnCheck._element.nativeElement.style.display = 'none';
      this.matCheck._element.nativeElement.style.display = 'block';
    }
  }

  onChangeDD(event) {
    let param = event.value === undefined ? "" : event.value;
    this.selectedModelData.emit(param);  
  }

}
