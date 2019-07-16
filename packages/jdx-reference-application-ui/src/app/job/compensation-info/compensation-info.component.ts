import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsCompensationInfo } from '../base-form.component';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { AnnotatedPreview, JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';
import { Subscription } from 'rxjs';
import { JobRoutes } from '../job-routing.module';
import { SelectTypeDefault } from '../../shared/components/forms/select/select.component';
import { isArray } from 'util';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-compensation-info',
  templateUrl: './compensation-info.component.html',
  styleUrls: ['./compensation-info.component.css']
})
export class CompensationInfoComponent extends BaseForm implements OnInit, OnDestroy {
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

  get jobBenefitsControls(): FormControl[] {
    return this.jobBenefitsArray.controls as FormControl[];
  }

  get jobBenefitsArray(): FormArray {
    return this.form.controls[ this.f.JOB_BENEFITS ] as FormArray;
  }

  readonly JOB_SECTION_TYPE = 'compensationInfo';

  DEFAULT_CURRENCY_OPTION = 'USD';

  DEFAULT_FREQUENCY_OPTION = 'Per Year';

  annotatedPreview: AnnotatedPreview;

  currencyOptions: SelectTypeDefault[];

  f = FormFieldsCompensationInfo;

  frequencyOptions: SelectTypeDefault[];

  jsonld;

  matches: 0;

  private _jobSub: Subscription = null;

  private _jobBenefits: string[];

  ngOnInit() {
    this.getCurrencyOptions();
    this.getFrequencyOptions();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  addBenefit() {
    this.jobBenefitsArray.push(this._fb.control(''));
  }

  removeBenefit(index) {
    this.jobBenefitsArray.removeAt(index);
  }

  getCurrencyOptions() {
    // TODO: real logic to get the options
    this.currencyOptions = [
      {name: this.DEFAULT_CURRENCY_OPTION, value: this.DEFAULT_CURRENCY_OPTION},
    ];
  }

  getFrequencyOptions() {
    // TODO: real logic to get the options
    this.frequencyOptions = [
      {name: this.DEFAULT_FREQUENCY_OPTION, value: this.DEFAULT_FREQUENCY_OPTION},
      {name: 'Per Hour', value: 'Per Hour'},
      {name: 'Per Day', value: 'Per Day'},
      {name: 'Per Week', value: 'Per Week'},
      {name: 'Per Month', value: 'Per Month'}
    ];
  }

  back() {
    this.navigateTo(JobRoutes.ADDITIONAL_REQUIREMENTS);
  }

  next() {
    // remove any empty benefits that the use may have added but failed to entered a value
    this.form.value[this.f.JOB_BENEFITS] = this.form.value[this.f.JOB_BENEFITS].filter( b => b);
    this.updateJobSection(this.form.value);
  }

  protected onSuccess() {
    this.navigateTo(JobRoutes.CONFIRM_DESCRIPTION);
  }

  private initSubscriptions() {
    this._jobSub = this._jobService.job$.subscribe(job => {
      this.annotatedPreview = job.annotatedPreview;
      this.matches = this._jobService.previewMatchCountByPropertyName([this.f.JOB_BENEFITS]);
      this.initForm(job);
    });
  }

  private initForm(j: JobContext) {
    this._jobBenefits = isArray(j.compensationInfo[this.f.JOB_BENEFITS])
                        ? j.compensationInfo[this.f.JOB_BENEFITS]
                        : this.getBenefitsArray();
    this.form =
      this._fb.group(
        {
          [this.f.CURRENCY]: [this.DEFAULT_CURRENCY_OPTION],
          [this.f.MINIMUM]: [j.compensationInfo[this.f.MINIMUM]],
          [this.f.MAXIMUM]: [j.compensationInfo[this.f.MAXIMUM]],
          [this.f.FREQUENCY]: [this.DEFAULT_FREQUENCY_OPTION],
          [this.f.INCENTIVE_COMPENSATION]: [j.compensationInfo[this.f.INCENTIVE_COMPENSATION]],
          [this.f.JOB_BENEFITS]: this._fb.array( this._jobBenefits)
        }
      );
  }

  private getBenefitsArray() {
    return [
      'Health Insurance',
      'Dental Insurance',
      'Vision Insurance',
      'Life Insurance',
      'PTO',
      '401(k)',
      'Gym membership',
      'Commuting/travel assistance',
      'Workplace perks such as recreation activities, food and coffee'
    ];
  }


}
