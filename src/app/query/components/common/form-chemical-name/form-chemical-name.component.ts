import { Component, OnInit } from '@angular/core';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-form-chemical-name',
  templateUrl: './form-chemical-name.component.html',
  styleUrls: ['../../../query.module.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FormChemicalNameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
