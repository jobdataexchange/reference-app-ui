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

export enum FormFieldsAssessmentInfo {
  ASSESSMENT= 'assessment'
}

export enum FormFieldsAdditionalRequirements {
  APPLICATION_LOCATION_REQUIREMENT = 'applicantLocationRequirement',
  CITIZENSHIP_REQUIREMENT = 'citizenshipRequirement',
  PHYSICAL_REQUIREMENT = 'physicalRequirement',
  SENSORY_REQUIREMENT = 'sensoryRequirement',
  SECURITY_CLEARANCE_REQUIREMENT = 'securityClearanceRequirement',
  SPECIAL_COMMITMENT = 'specialCommitment'
}

export enum FormFieldsBasicInfo {
  TITLE = 'title', // just for preview testing 'title',
  JOB_SUMMARY = 'jobSummary',
  INDUSTRY = 'primaryEconomicActivity',
  INDUSTRY_CODE = 'industryCategory',
  OCCUPATION_CATEGORY = 'occupationCategory',
  JOB_LOCATION = 'jobLocation',
  JOB_LOCATION_TYPE = 'jobLocationType',
  EMPLOYMENT_UNIT = 'employmentUnit',
  JOB_IDENTIFIER = 'jobIdentifier',
  EMPLOYER_IDENTIFIER = 'employerIdentifier',
}

export enum FormFieldsCredentialRequirements {
  REQUIREMENTS = 'requirements'
}

export enum FormFieldsCompensationInfo {
  CURRENCY = 'salaryCurrency',
  MINIMUM = 'salaryMinimum',
  MAXIMUM = 'salaryMaximum',
  FREQUENCY = 'salaryFrequency',
  INCENTIVE_COMPENSATION = 'incentiveCompensation',
  JOB_BENEFITS = 'jobBenefits'
}

export enum FormFieldsEmploymentRelationship {
  EMPLOYMENT_AGREEMENT = 'employmentAgreement',
  JOB_TERM = 'jobTerm',
  JOB_SCHEDULE = 'jobSchedule',
  WORK_HOURS = 'workHours'
}

export enum FormFieldsOrgInfo {
  ORG_NAME = 'employerName',
  HIRING_ORG_OVERVIEW = 'employerOverview',
  ORG_EMAIL = 'employerEmail',
  ORG_WEBSITE = 'employerWebsite',
  HIRING_ORG_ADDRESS = 'employerAddress',
  ORG_PHONE = 'employerPhone',
}

export enum FormFieldsPostingInfo {
  DATE_POSTED = 'datePosted',
  VALID_THROUGH = 'validThrough',
  JOB_OPENINGS = 'jobOpenings',
}

