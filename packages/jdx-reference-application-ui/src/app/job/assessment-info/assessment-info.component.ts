import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsAssessmentInfo } from '../base-form.component';
import { FormBuilder } from '@angular/forms';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { JobRoutes } from '../job-routing.module';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';


@Component({
  selector: 'app-assessment-info',
  templateUrl: './assessment-info.component.html',
  styleUrls: ['./assessment-info.component.css']
})
export class AssessmentInfoComponent extends BaseForm implements OnInit, OnDestroy {
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

  readonly JOB_SECTION_TYPE = 'assessmentInfo';

  f = FormFieldsAssessmentInfo;

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
          [this.f.ASSESSMENT]: j.assessmentInfo[this.f.ASSESSMENT],
        }
      );
  }

  back() {
    this.navigateTo(JobRoutes.FRAMEWORKS);
  }

  next() {
    this.updateJobSection(this.form.value);
    this.navigateTo(JobRoutes.COMPETENCIES);
  }


}
