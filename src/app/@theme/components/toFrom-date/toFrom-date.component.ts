import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { ValidationService } from '../../../@core/data/validation.service';


@Component({
  selector: 'ngx-to-from-date-selector',
  styleUrls: ['./to-from-date-selector.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  template: `
    <form class="form-inline col-md-3 float-left" [formGroup]='dashboardFormGroup' autocomplete="off" #formDirective="ngForm">
      <div class="col-md-5">
        <mat-form-field class='full-width'>
          <mat-hint>
            <span>MM/DD/YYYY</span>
          </mat-hint>
          <input matInput [matDatepicker]="pickerFrom" placeholder="From Date" (input)="validateDate($event)" (blur)="validateDate($event)"
            [max]="maxDate" formControlName='fromDate'>
          <mat-datepicker-toggle matSuffix [for]="pickerFrom" matTooltip="Toggle Calender"></mat-datepicker-toggle>
          <mat-datepicker (selectedChanged)="validateDate($event, 'From Date')" #pickerFrom></mat-datepicker>
          <mat-error *ngIf="dashboardFormGroup?.controls.fromDate.status === 'INVALID'">{{fromDateErrorMessage}}</mat-error>
        </mat-form-field>
        </div>
        <div class="col-md-5">
        <mat-form-field class='full-width'>
          <input matInput [matDatepicker]="pickerTo" placeholder="To Date" (blur)="validateDate($event)" (input)="validateDate($event)"
            [max]="maxDate" formControlName='toDate'>
          <mat-datepicker-toggle matSuffix [for]="pickerTo"></mat-datepicker-toggle>
          <mat-datepicker (selectedChanged)="validateDate($event, 'To Date')" #pickerTo></mat-datepicker>
          <mat-error *ngIf="dashboardFormGroup?.controls.toDate.status === 'INVALID'"> {{toDateErrorMessage}}</mat-error>
          <mat-hint>
            <span>MM/DD/YYYY</span>
          </mat-hint>
        </mat-form-field>
      </div>
    </form>
  `,
})
export class ToFromDateComponent implements OnInit {
    
  ngOnInit(): void {
    this.intializedashboardForm();
  }    

  constructor(private formBuilder: FormBuilder){}
  
  public fromDateErrorMessage = 'Please enter valid date.';
  public toDateErrorMessage = 'Please enter valid date.';
  public dashboardFormGroup: FormGroup;
  @Output() valueChange: any = new EventEmitter<any>();
  public toDateModel: any = new Date();
  public formDateModel: any = new Date();
  public maxDate = new Date();

  public intializedashboardForm() {
    this.dashboardFormGroup = this.formBuilder.group({
      fromDate: new FormControl(_moment([]), [ValidationService.DateValidator]),
      toDate: new FormControl(_moment([]), [ValidationService.DateValidator])
    });
    this.valueChange.emit(this.dashboardFormGroup);
  }

   
  private validateDate(event, field?: string): any {
    const toDateControl = this.dashboardFormGroup.controls['toDate'];
    const fromDateControl = this.dashboardFormGroup.controls['fromDate'];
    if (event.type === 'blur' || event.type === 'input') {
      let field = event.target.placeholder;
      let date = _moment(event.target.value);

      if (field === 'To Date') {
        let fromDate = fromDateControl.value;
        if (fromDateControl.status !== 'INVALID') {
          if (date > _moment(new Date())) {
            toDateControl.setErrors({ invalid: true });
            this.toDateErrorMessage = 'Date cannot be greater than todays date';
          } else if (date.format('MM/DD/YYYY') < fromDate.format('MM/DD/YYYY')) {
            toDateControl.setErrors({ invalid: true });
            this.toDateErrorMessage = 'To Date cannot be less than From Date';
          } else if (date.format('MM/DD/YYYY') === fromDate.format('MM/DD/YYYY')) {
            fromDateControl.setErrors(null);
            toDateControl.setErrors(null);
          } else if (fromDateControl.status !== 'INVALID' || date > fromDate) {
            if (fromDateControl.status !== 'INVALID') {
              fromDateControl.setErrors(null);
            } else if (date > fromDate) {
              toDateControl.setErrors(null);
              fromDateControl.setErrors(null);
            }
          } else if (toDateControl.status === 'INVALID') {
            this.toDateErrorMessage = 'Please enter valid date.'
          }
        } else if (fromDateControl.status === 'INVALID') {
          this.fromDateErrorMessage = 'Please enter valid date.'
        }

      } else if (field === 'From Date') {
        let toDate = toDateControl.value;
        if (toDateControl.status !== 'INVALID') {
          if (date > _moment(new Date())) {
            fromDateControl.setErrors({ invalid: true });
            this.fromDateErrorMessage = 'Date cannot be greater than todays date.';
          } else if (date.format('MM/DD/YYYY') > toDate.format('MM/DD/YYYY')) {
            fromDateControl.setErrors({ invalid: true });
            this.fromDateErrorMessage = 'From Date cannot be greater than To date.';
          } else if (date.format('MM/DD/YYYY') === toDate.format('MM/DD/YYYY')) {
            fromDateControl.setErrors(null);
            toDateControl.setErrors(null);
          } else if (toDateControl.status !== 'INVALID' || date < toDate) {
            if (toDateControl.status !== 'INVALID') {
              toDateControl.setErrors(null);
            } else if (date < toDate) {
              fromDateControl.setErrors(null);
              toDateControl.setErrors(null);
            }
          } else if (fromDateControl.status === 'INVALID') {
            this.fromDateErrorMessage = 'Please enter valid date.'
          }
        } else if (toDateControl.status === 'INVALID') {
          this.toDateErrorMessage = 'Please enter valid date.'
        }
      }
    } else if (event._isAMomentObject) {
      let date = event;
      if (field === 'To Date') {
        let fromDate = fromDateControl.value;
        if (date > _moment(new Date())) {
          toDateControl.setErrors({ invalid: true });
          this.toDateErrorMessage = 'Date cannot be greater than todays date';
        } else if (date < fromDate) {
          setTimeout(() => {
            toDateControl.setErrors({ invalid: true });
            this.toDateErrorMessage = 'To Date cannot be less than From Date';
          }, 100);
        } else if (date.format('MM/DD/YYYY') >= fromDate.format('MM/DD/YYYY')) {
          fromDateControl.setErrors(null);
          toDateControl.setErrors(null);
        } else if (fromDateControl.status !== 'INVALID' || date > fromDate) {
          if (fromDateControl.status !== 'INVALID') {
            fromDateControl.setErrors(null);
          } else if (date > fromDate) {
            toDateControl.setErrors(null);
            fromDateControl.setErrors(null);
          }
        }
      } else if (field === 'From Date') {
        let toDate = toDateControl.value;
        if (date > _moment(new Date())) {
          fromDateControl.setErrors({ invalid: true });
          this.fromDateErrorMessage = 'Date cannot be greater than todays date';
        } else if (date > toDate) {
          setTimeout(() => {
            fromDateControl.setErrors({ invalid: true, touched: true });
            this.fromDateErrorMessage = 'From Date cannot be greater than To Date';
          }, 100);
        } else if (date.format('MM/DD/YYYY') === toDate.format('MM/DD/YYYY')) {
          fromDateControl.setErrors(null);
          toDateControl.setErrors(null);
        } else if (toDateControl.status !== 'INVALID' || date < toDate) {
          if (toDateControl.status !== 'INVALID') {
            toDateControl.setErrors(null);
          } else if (date < toDate) {
            fromDateControl.setErrors(null);
            toDateControl.setErrors(null);
          }
        }
      }
    }

    if(this.dashboardFormGroup.controls['toDate'].valid && this.dashboardFormGroup.controls['fromDate'].valid) {
      this.valueChange.emit(this.dashboardFormGroup);
    }
  }
}
