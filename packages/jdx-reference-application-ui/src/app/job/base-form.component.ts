import { FormBuilder, FormGroup } from '@angular/forms';
import { createRouteUrlByJobRoute, JobRoutes } from './job-routing.module';
import { Router } from '@angular/router';

export abstract class BaseForm {
  constructor(
    protected _fb: FormBuilder,
    protected _router: Router
    // public readonly injector: Injector
    // contextObject Service
  ) {}

  form: FormGroup;

  protected abstract next();
  protected abstract back();

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}

export enum FormFieldsBasicInfo {
  TITLE = 'title',
  JOB_SUMMARY = 'job-summary',
  INDUSTRY = 'industry',
  INDUSTRY_CODE = 'industry-code',
  OCCUPATION_CATEGORY = 'occupation-category',
  JOB_LOCATION = 'job-location',
  JOB_LOCATION_TYPE = 'job-location-type',
  EMPLOYMENT_UNIT = 'employment-unit',
  JOB_IDENTIFIER = 'job-identifier',
  EMPLOYER_IDENTIFIER = 'employer-identifier',
}

