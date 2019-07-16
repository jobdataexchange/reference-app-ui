import { FormBuilder, FormGroup } from '@angular/forms';
import { createRouteUrlByJobRoute, JobRoutes } from './job-routing.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobContext, JobSectionType, JobService } from '../shared/services/job.service';
import {
  DefaultService,
  JobDescriptionContextRequest,
  JobDescriptionContextResponse
} from '@jdx/jdx-reference-application-api-client';
import { LocalStorageService, LocalStorageTypes } from '../shared/services/local-storage.service';

export abstract class BaseForm {
  protected constructor(
    protected _api: DefaultService,
    protected _fb: FormBuilder,
    protected _jobService: JobService,
    protected _localStorage: LocalStorageService,
    protected _router: Router,
    protected _toastr: ToastrService,
  ) {}

  form: FormGroup;

  readonly abstract JOB_SECTION_TYPE: JobSectionType;

  protected abstract back();

  protected abstract next();

  protected abstract onSuccess();

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

  protected onError(e, title?: string) {
    console.log('[[ Error ]] ', e);
    this._toastr.error(e.message, title || 'Unexpected Error');
  }

  protected updateJobSection(data: {}) {
    console.log('updateJobSection :: JOB_SECTION_TYPE , data',this.JOB_SECTION_TYPE, data);
    try {
      this._jobService.updateJobSection(this.JOB_SECTION_TYPE, data);
      this.postContext();
    } catch (e) {
      this.onError(e);
    }
  }

  private postContext() {
    const context = this.createJobDescriptionContextRequest(
      this._localStorage.get(LocalStorageTypes.JOB)
    );

    console.log('-> uploadJobDescriptionContextPost', context)
    this._api.uploadJobDescriptionContextPost(context)
      .toPromise()
      .then((r: JobDescriptionContextResponse) => {
        console.log('<- uploadJobDescriptionContextPost', r);
        this.onSuccess();
      })
      .catch( e => this.onError(e));
  }

  private createJobDescriptionContextRequest(job: JobContext): JobDescriptionContextRequest {
    const {
      annotatedPreview,
      pipelineID,
      version,
      ...cleanedJob
    } = job;

    let j = {};

// flattened to field name and value e.g { "industry": "Tech" }
    Object.keys(cleanedJob).forEach( k => {
      j = {
        ...j,
        ...job[k]
      };
    });

    return {
      pipelineID: this._localStorage.get(LocalStorageTypes.JOB)['pipelineID'],
      ...this._localStorage.get(LocalStorageTypes.OGR),
      ...j
    };

  }

}

export enum FormFieldsAssessmentInfo {
  ASSESSMENT= 'assessment'
}

export enum FormFieldsAdditionalRequirements {
  APPLICATION_LOCATION_REQUIREMENT = 'applicationLocationRequirement',
  CITIZENSHIP_REQUIREMENT = 'citizenshipRequirement',
  PHYSICAL_REQUIREMENT = 'physicalRequirement',
  SENSORY_REQUIREMENT = 'sensoryRequirement',
  SECURITY_CLEARANCE_REQUIREMENT = 'securityClearanceRequirement',
  SPECIAL_COMMITMENT = 'specialCommitment'
}

export enum FormFieldsBasicInfo {
  TITLE = 'jobTitle',
  JOB_SUMMARY = 'jobSummary',
  INDUSTRY = 'primaryEconomicActivity',
  INDUSTRY_CODE = 'industryCode',
  OCCUPATION_CODE = 'occupationCode',
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

