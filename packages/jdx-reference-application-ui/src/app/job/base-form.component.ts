import { FormBuilder, FormGroup } from '@angular/forms';
import { createRouteUrlByJobRoute, JobRoutes } from './job-routing.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobSectionType, JobService } from '../shared/services/job.service';

export abstract class BaseForm {
  protected constructor(
    protected _fb: FormBuilder,
    protected _jobService: JobService,
    protected _router: Router,
    protected _toastr: ToastrService
  ) {}

  form: FormGroup;

  readonly abstract JOB_SECTION_TYPE: JobSectionType;

  protected abstract back();

  protected abstract next();

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

  protected onError(e, title?: string) {
    console.log('[[ Error ]] ', e);
    this._toastr.error(e.message, title || 'Unexpected Error');
  }

  protected updateJobSection(data: {}) {
    try {
      this._jobService.updateJobSection(this.JOB_SECTION_TYPE, data);
    } catch (e) {
      this.onError(e);
    }
  }
}

export enum FormFieldsBasicInfo {
  TITLE = 'competency', // just for preview testing 'title',
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

export enum FormFieldsEmploymentRelationship {
  EMPLOYMENT_AGREEMENT = 'employment-agreement',
  JOB_TERM = 'job-term',
  JOB_SCHEDULE = 'job-schedule',
  WORK_HOURS = 'work-hours'
}

export enum FormFieldsCredentialRequirements {
  REQUIREMENTS = 'requirements'
}

export enum FormFieldsAdditionalRequirements {
  APPLICATION_LOCATION_REQUIREMENT = 'application-location-requirement',
  CITIZENSHIP_REQUIREMENT = 'citizenship-requirement',
  PHYSICAL_REQUIREMENT = 'physical-requirement',
  SENSORY_REQUIREMENT = 'sensory-requirement',
  SECURITY_CLEARANCE_REQUIREMENT = 'security-clearance-requirement',
  SPECIAL_COMMITMENT = 'special-commitment'
}

export enum FormFieldsCompensationInfo {
  CURRENCY = 'currency',
  MINIMUM = 'minimum',
  MAXIMUM = 'maximum',
  FREQUENCY = 'frequency',
  INCENTIVE_COMPENSATION = 'incentive-compensation'
}
