import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsOrgInfo } from '../base-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { JobRoutes } from '../job-routing.module';

@Component({
  selector: 'app-org-info',
  templateUrl: './org-info.component.html'
})
export class OrgInfoComponent extends BaseForm implements OnInit, OnDestroy {
  constructor(
    _fb: FormBuilder,
    _jobService: JobService,
    _router: Router,
    _toastr: ToastrService
) {
    super(_fb, _jobService, _router, _toastr);
  }

  f = FormFieldsOrgInfo;


  private _jobSub: Subscription = null;

  readonly JOB_SECTION_TYPE = 'basicInfo';

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

  back() {}

  next() {
    this.updateJobSection(this.form.value);
    this.navigateTo(JobRoutes.DESCRIPTION);
  }

  private initForm(j: JobContext) {
    this.form =
      this._fb.group(
        {
          [this.f.ORG_NAME]:                   [j.orgInfo[this.f.ORG_NAME], Validators.required],
          [this.f.HIRING_ORG_NAME_OVERVIEW]:   [j.orgInfo[this.f.HIRING_ORG_NAME_OVERVIEW]],
          [this.f.ORG_EMAIL]:                  [j.orgInfo[this.f.ORG_EMAIL]],
          [this.f.ORG_WEBSITE]:                [j.orgInfo[this.f.ORG_WEBSITE]],
          [this.f.HIRING_ORG_ADDRESS]:         [j.orgInfo[this.f.HIRING_ORG_ADDRESS]],
          [this.f.ORG_PHONE]:                  [j.orgInfo[this.f.ORG_PHONE]],

        }
      );
  }

}
