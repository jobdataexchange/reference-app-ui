import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsBasicInfo } from '../base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectTypeDefault } from '../../shared/components/forms/select/select.component';
import { ToastrService } from 'ngx-toastr';
import { JobRoutes } from '../job-routing.module';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';
import { naicsSelectOptions } from '../naicsValues';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html'
})
export class BasicInfoComponent extends BaseForm implements OnInit, OnDestroy {
  constructor(
    _api: DefaultService,
    _fb: FormBuilder,
    _jobService: JobService,
    _localStorage: LocalStorageService,
    _router: Router,
    _toastr: ToastrService
  ) {
    super(_api, _fb, _jobService, _localStorage, _router, _toastr);
  }

  f = FormFieldsBasicInfo;

  industryCodes: SelectTypeDefault[];

  jobIdentifier = null;

  occupationCategories: SelectTypeDefault[];

  private _jobSub: Subscription = null;

  readonly JOB_SECTION_TYPE = 'basicInfo';

  ngOnInit() {
    this.getIndustryCodes();
    this.getOccupationCategory();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$.subscribe(job => {
      this.jobIdentifier = job.pipelineID;
      this.initForm(job);
      this.form.patchValue({[this.f.JOB_IDENTIFIER]: this.jobIdentifier});
    });
  }

  private initForm(j: JobContext) {
    this.form =
      this._fb.group(
        {
          [this.f.TITLE]:               [j.basicInfo[this.f.TITLE], Validators.required],
          [this.f.JOB_SUMMARY]:         [j.basicInfo[this.f.JOB_SUMMARY]],
          [this.f.INDUSTRY]:            [j.basicInfo[this.f.INDUSTRY]],
          [this.f.INDUSTRY_CODE]:       [j.basicInfo[this.f.INDUSTRY_CODE]],
          [this.f.OCCUPATION_CODE]: [ j.basicInfo[this.f.OCCUPATION_CODE]],
          [this.f.JOB_LOCATION]:        [j.basicInfo[this.f.JOB_LOCATION], Validators.required],
          [this.f.JOB_LOCATION_TYPE]:   [j.basicInfo[this.f.JOB_LOCATION_TYPE]],
          [this.f.EMPLOYMENT_UNIT]:     [j.basicInfo[this.f.EMPLOYMENT_UNIT]],
          [this.f.EMPLOYER_IDENTIFIER]: [j.basicInfo[this.f.EMPLOYER_IDENTIFIER]],
          [this.f.JOB_IDENTIFIER]:      {value: [ [j.basicInfo[this.f.JOB_IDENTIFIER]] || this.jobIdentifier], disabled: true}
        }
      );
  }

  getIndustryCodes() {
    // TODO: real logic to get the Industry codes
    this.industryCodes = naicsSelectOptions;
  }

  getOccupationCategory() {
    // TODO: real logic to get the Occupation Categories
    this.occupationCategories = [
      {name: 'Option 1', value: 'option1'},
      {name: 'Option 2', value: 'option2'},
      {name: 'Option 3', value: 'option3'}
    ];
  }

  back() {
    this.navigateTo(JobRoutes.DESCRIPTION_PREVIEW);
  }

  next() {
    this.updateJobSection(this.form.value);
  }

  protected onSuccess() {
    this.navigateTo(JobRoutes.EMPLOYMENT_RELATIONSHIP);
  }


}
