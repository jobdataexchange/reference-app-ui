import { Component, OnInit } from '@angular/core';
import { BaseForm, FormFieldsBasicInfo } from '../base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectTypeDefault } from '../../shared/components/forms/select/select.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html'
})
export class BasicInfoComponent extends BaseForm implements OnInit {
  constructor(
    _fb: FormBuilder,
    _router: Router,
    _toastr: ToastrService,
  ) {
    super(_fb, _router, _toastr);
  }

  f = FormFieldsBasicInfo;

  industryCodes: selectTypeDefault[];
  occupationCategories: selectTypeDefault[];
  jobIdentifier = null;

  ngOnInit() {
    this.initForm();
    this.getIndustryCodes();
    this.getOccupationCategory();
    this.getJobIdentifier();
  }

  initForm() {
    this.form =
      this._fb.group(
        {
          [this.f.TITLE]: ['', Validators.required],
          [this.f.JOB_SUMMARY]: [''],
          [this.f.INDUSTRY]: [''],
          [this.f.INDUSTRY_CODE]: [''],
          [this.f.OCCUPATION_CATEGORY]: [''],
          [this.f.JOB_LOCATION]: ['', Validators.required],
          [this.f.JOB_LOCATION_TYPE]: [''],
          [this.f.EMPLOYMENT_UNIT]: [''],
          [this.f.JOB_IDENTIFIER]: [ this.jobIdentifier || ''],
          [this.f.EMPLOYER_IDENTIFIER]: [''],
        }
      );
  }

  // these may turn into true Getters once the real logic is in
  getIndustryCodes() {
    // TODO: real logic to get the Industry codes
    this.industryCodes = [
      {name: 'Option 1', value: 'option1'},
      {name: 'Option 2', value: 'option2'},
      {name: 'Option 3', value: 'option3'}
    ];
  }

  getOccupationCategory() {
    // TODO: real logic to get the Occupation Categories
    this.occupationCategories = [
      {name: 'Option 1', value: 'option1'},
      {name: 'Option 2', value: 'option2'},
      {name: 'Option 3', value: 'option3'}
    ];
  }

  // TODO: real logic to get Job Identifier
  getJobIdentifier() {
    this.jobIdentifier = 'xxx-xxxx-xxx';
  }



  protected back() {}

  protected next() {
    // TODO: add to the context object
    console.log('Basic Information form ', this.form.value);
  }

}
