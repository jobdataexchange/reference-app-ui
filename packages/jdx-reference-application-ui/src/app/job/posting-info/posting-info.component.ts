import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsPostingInfo } from '../base-form.component';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobRoutes } from '../job-routing.module';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';

@Component({
  selector: 'app-posting-info',
  templateUrl: './posting-info.component.html',
  styleUrls: ['./posting-info.component.css']
})
export class PostingInfoComponent extends BaseForm implements OnInit, OnDestroy {
  constructor(
    _api: DefaultService,
    _fb: FormBuilder,
    _jobService: JobService,
    _router: Router,
    _toastr: ToastrService
  ) {
    super(_fb, _jobService, _router, _toastr);
  }

  readonly JOB_SECTION_TYPE = 'postingInfo';

  f = FormFieldsPostingInfo;

  private _jobSub: Subscription = null;


  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$.subscribe(job => this.initForm(job));
  }

  back() {
    this.navigateTo(JobRoutes.CONFIRM_DESCRIPTION);
  }

  next() {
    this.updateJobSection(this.form.value);
    this.navigateTo(JobRoutes.CONFIRM_COMPLETION);
  }

  private initForm(j: JobContext) {
    this.form =
      this._fb.group(
        {
          [this.f.DATE_POSTED]: [j.postingInfo[this.f.DATE_POSTED]],
          [this.f.VALID_THROUGH]: [ j.postingInfo[this.f.VALID_THROUGH]],
          [this.f.JOB_OPENINGS]: [j.postingInfo[this.f.JOB_OPENINGS]]
        }
      );
  }

}
