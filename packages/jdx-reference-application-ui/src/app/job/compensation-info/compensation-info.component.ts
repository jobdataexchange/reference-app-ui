import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsCompensationInfo } from '../base-form.component';
import { FormBuilder } from '@angular/forms';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';
import { Subscription } from 'rxjs';
import { JobRoutes } from '../job-routing.module';
import { SelectTypeDefault } from '../../shared/components/forms/select/select.component';

@Component({
  selector: 'app-compensation-info',
  templateUrl: './compensation-info.component.html',
  styleUrls: ['./compensation-info.component.css']
})
export class CompensationInfoComponent extends BaseForm implements OnInit, OnDestroy {

  readonly JOB_SECTION_TYPE = 'compensationInfo';

  DEFAULT_CURRENCY_OPTION = 'USD';
  DEFAULT_FREQUENCY_OPTION = 'Year';

  f = FormFieldsCompensationInfo;

  private _jobSub: Subscription = null;

  currencyOptions: SelectTypeDefault[];

  frequencyOptions: SelectTypeDefault[];

  constructor(_api: DefaultService,
              _fb: FormBuilder,
              _pipelineIdService: JobService,
              _router: Router,
              _toastr: ToastrService,) {
    super(_fb, _pipelineIdService, _router, _toastr);
  }

  ngOnInit() {
    this.getCurrencyOptions();
    this.getFrequencyOptions();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$.subscribe(job => {
      this.initForm(job);
    });
  }

  private initForm(j: JobContext) {
    this.form =
      this._fb.group(
        {
          [this.f.CURRENCY]: [this.DEFAULT_CURRENCY_OPTION],
          [this.f.MINIMUM]: [j.compensationInfo[this.f.MINIMUM]],
          [this.f.MAXIMUM]: [j.compensationInfo[this.f.MAXIMUM]],
          [this.f.FREQUENCY]: [this.DEFAULT_FREQUENCY_OPTION],
          [this.f.INCENTIVE_COMPENSATION]: [j.compensationInfo[this.f.INCENTIVE_COMPENSATION]],
        }
      );
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
      {name: 'Hour', value: 'Hour'},
    ];
  }

  back() {
    this.navigateTo(JobRoutes.ADDITIONAL_REQUIREMENTS);
  }

  next() {
    this.updateJobSection(this.form.value);
    this.navigateTo(JobRoutes.CONFIRM_COMPLETION);
  }



}
