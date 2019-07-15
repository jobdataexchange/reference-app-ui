import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsCredentialRequirements } from '../base-form.component';
import { FormBuilder } from '@angular/forms';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';
import { JobRoutes } from '../job-routing.module';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-credential-requirements',
  templateUrl: './credential-requirements.component.html',
  styleUrls: ['./credential-requirements.component.css']
})
export class CredentialRequirementsComponent extends BaseForm implements OnInit, OnDestroy {
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

  private _jobSub: Subscription = null;

  readonly JOB_SECTION_TYPE = 'credentialRequirements';

  f = FormFieldsCredentialRequirements;

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

 private initForm(j: JobContext) {
    this.form =
      this._fb.group(
        {
          [this.f.REQUIREMENTS]: [j.credentialRequirements[this.f.REQUIREMENTS]],
        }
      );
  }

  back() {
    this.navigateTo(JobRoutes.ASSESSMENT_INFO);
  }

  next() {
    this.updateJobSection(this.form.value);
  }

  protected onSuccess() {
    this.navigateTo(JobRoutes.ADDITIONAL_REQUIREMENTS);
  }

}
