import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsAdditionalRequirements } from '../base-form.component';
import { FormBuilder } from '@angular/forms';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';
import { JobRoutes } from '../job-routing.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-additional-requirements',
  templateUrl: './additional-requirements.component.html',
  styleUrls: ['./additional-requirements.component.css']
})
export class AdditionalRequirementsComponent extends BaseForm implements OnInit, OnDestroy {
  constructor(
    _api: DefaultService,
    _fb: FormBuilder,
    _jobService: JobService,
    _router: Router,
    _toastr: ToastrService
  ) {
    super(_fb, _jobService, _router, _toastr);
  }

  private _jobSub: Subscription = null;

  readonly JOB_SECTION_TYPE = 'additionalRequirements';

  f = FormFieldsAdditionalRequirements;

  ngOnInit() {
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

  back() {
    this.navigateTo(JobRoutes.CREDENTIAL_REQUIREMENTS);
  }

  next() {
    this.updateJobSection(this.form.value);
    this.navigateTo(JobRoutes.COMPENSATION_INFO);
  }

  private initForm(j: JobContext) {
    this.form =
      this._fb.group(
        {
          [this.f.APPLICATION_LOCATION_REQUIREMENT]: [j.additionalRequirements[this.f.APPLICATION_LOCATION_REQUIREMENT]],
          [this.f.CITIZENSHIP_REQUIREMENT]: [j.additionalRequirements[this.f.CITIZENSHIP_REQUIREMENT]],
          [this.f.PHYSICAL_REQUIREMENT]: [j.additionalRequirements[this.f.PHYSICAL_REQUIREMENT]],
          [this.f.SENSORY_REQUIREMENT]: [j.additionalRequirements[this.f.SENSORY_REQUIREMENT]],
          [this.f.SECURITY_CLEARANCE_REQUIREMENT]: [j.additionalRequirements[this.f.SECURITY_CLEARANCE_REQUIREMENT]],
          [this.f.SPECIAL_COMMITMENT]: [j.additionalRequirements[this.f.SPECIAL_COMMITMENT]],
        }
      );
  }

}
