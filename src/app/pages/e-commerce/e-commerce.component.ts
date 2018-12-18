import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  providers: []
})
export class ECommerceComponent implements OnInit {

  panelOpenState = false;

  matDropdownList: any = [
    {
      label: 'Above Potential Tat',
      isMultiSelect: true,
      placeholder: 'Select Client',
      placeholderLabel: 'Select Client',
      optionList: [
        { name: 'Above Potential Tat', id: 32 },
        { name: 'Completed', id: 5 },
        { name: 'Backlog', id: 62 },
        { name: 'Pending', id: 12 },
        { name: 'Potential Tat', id: 92 },
        { name: 'Received', id: 72 }
      ],
      checkOption: true,
      enableSearch: true
    },
    {
      label: 'Completed',
      isMultiSelect: false,
      placeholder: 'Select Speciality',
      placeholderLabel: 'Select Speciality',
      optionList: [
        { name: 'Above Potential Tat', id: 32 },
        { name: 'Completed', id: 5 },
        { name: 'Backlog', id: 62 },
        { name: 'Pending', id: 12 },
        { name: 'Potential Tat', id: 92 },
        { name: 'Received', id: 72 }
      ],
      checkOption: false,
      enableSearch: true
    },
    {
      label: 'Backlog',
      isMultiSelect: true,
      placeholder: 'Select Location',
      placeholderLabel: 'Select Location',
      optionList: [
        { name: 'Above Potential Tat', id: 32 },
        { name: 'Completed', id: 5 },
        { name: 'Backlog', id: 62 },
        { name: 'Pending', id: 12 },
        { name: 'Potential Tat', id: 92 },
        { name: 'Received', id: 72 }
      ],
      checkOption: true,
      enableSearch: true
    },
    {
      label: 'Backlog',
      isMultiSelect: true,
      placeholder: 'Select Location',
      placeholderLabel: 'Select Location',
      optionList: [
        { name: 'Above Potential Tat', id: 32 },
        { name: 'Completed', id: 5 },
        { name: 'Backlog', id: 62 },
        { name: 'Pending', id: 12 },
        { name: 'Potential Tat', id: 92 },
        { name: 'Received', id: 72 }
      ],
      checkOption: true,
      enableSearch: true
    },
    {
      label: 'Backlog',
      isMultiSelect: true,
      placeholder: 'Select Location',
      placeholderLabel: 'Select Location',
      optionList: [
        { name: 'Above Potential Tat', id: 32 },
        { name: 'Completed', id: 5 },
        { name: 'Backlog', id: 62 },
        { name: 'Pending', id: 12 },
        { name: 'Potential Tat', id: 92 },
        { name: 'Received', id: 72 }
      ],
      checkOption: true,
      enableSearch: true
    }
    
  ]

  dougnutChartsLabels: any = [
    { label: 'Above Potential Tat', value: 32 },
    { label: 'Completed', value: 5 },
    { label: 'Backlog', value: 62 },
    { label: 'Pending', value: 12 },
    { label: 'Potential Tat', value: 92 },
    { label: 'Received', value: 72 }
  ];



  ngOnInit(): void {
  }

  ngOnChanges(event) {
  }

  valueChange(event) {
    console.log(event)
  }

  constructor() { }
}
