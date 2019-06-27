import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseForm, FormFieldsEmploymentRelationship } from '../base-form.component';
import { FormBuilder } from '@angular/forms';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';
import { JobRoutes } from '../job-routing.module';
import { SelectTypeDefault } from '../../shared/components/forms/select/select.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employment-relationship',
  templateUrl: './employment-relationship.component.html',
  styleUrls: ['./employment-relationship.component.css']
})
export class EmploymentRelationshipComponent extends BaseForm implements OnInit, OnDestroy {

  readonly JOB_SECTION_TYPE = 'employmentRelationship';

  f = FormFieldsEmploymentRelationship;

  employmentAgreementOptions: SelectTypeDefault[];
  jobTermOptions: SelectTypeDefault[];
  jobScheduleOptions: SelectTypeDefault[];
  workHoursOptions: SelectTypeDefault[];

  private _jobSub: Subscription = null;

  constructor(_api: DefaultService,
              _fb: FormBuilder,
              _pipelineIdService: JobService,
              _router: Router,
              _toastr: ToastrService ) {
    super(_fb, _pipelineIdService, _router, _toastr);
  }

  ngOnInit() {
    this.getEmploymentAgreementOptions();
    this.getJobTermOptions();
    this.getJobScheduleOptions();
    this.getWorkHoursOptions();
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
          [this.f.EMPLOYMENT_AGREEMENT]: [j.employmentRelationship[this.f.EMPLOYMENT_AGREEMENT]],
          [this.f.JOB_TERM]: [j.employmentRelationship[this.f.JOB_TERM]],
          [this.f.JOB_SCHEDULE]: [j.employmentRelationship[this.f.JOB_SCHEDULE]],
          [this.f.WORK_HOURS]: [j.employmentRelationship[this.f.WORK_HOURS]],
        }
      );
  }

  getEmploymentAgreementOptions() {
    // TODO: real logic to get the Options
    this.employmentAgreementOptions = [
      {name: 'Employee', value: 'Employee'},
      {name: 'Employee eligible for overtime', value: 'Employee eligible for overtime'},
      {name: 'Employee not eligible for overtime', value: 'Employee not eligible for overtime'},
      {name: 'Collectively-bargained employee', value: 'Collectively-bargained employee'},
      {name: 'Contract', value: 'Contract'},
      {name: 'Contract-to-hire', value: 'Contract-to-hire'},
      {name: 'Internship', value: 'Internship'},
      {name: 'Externship', value: 'Externship'},
      {name: 'Apprenticeship', value: 'Apprenticeship'},
      {name: 'Student volunteer', value: 'Student volunteer'}
    ];
  }

  getJobTermOptions() {
    // TODO: real logic to get the Options
    this.jobTermOptions = [
      {name: 'Temporary', value: 'Temporary'},
      {name: 'Regular', value: 'Regular'},
      {name: 'Seasonal', value: 'Seasonal'}
    ];
  }

  getJobScheduleOptions() {
    // TODO: real logic to get the Options
    this.jobScheduleOptions = [
      {name: 'Full-time', value: 'Full-time'},
      {name: 'Part-time', value: 'Part-time'},
      {name: 'Flextime', value: 'Flextime'},
      {name: 'Hourly', value: 'Hourly'},
      {name: 'Shared-time', value: 'Shared-time'}
    ];
  }

  getWorkHoursOptions() {
    // TODO: real logic to get the Options
    this.workHoursOptions = [
      {name: 'Normal work hours', value: 'Normal work hours'},
      {name: 'Changing work hours', value: 'Changing work hours'},
      {name: 'Flexible work hours (set your own schedule)', value: 'Flexible work hours (set your own schedule)'}
    ];
  }

  protected back() {
    this.navigateTo(JobRoutes.BASIC_INFO);
  }

  protected next() {
    this.updateJobSection(this.form.value);
    this.navigateTo(JobRoutes.FRAMEWORKS);
  }
}
