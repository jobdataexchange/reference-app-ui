import { Injectable } from '@angular/core';
import { DefaultService, PreviewResponse, Request } from '@jdx/jdx-reference-application-api-client';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService, LocalStorageTypes } from './local-storage.service';
import {
  FormFieldsAdditionalRequirements,
  FormFieldsBasicInfo,
  FormFieldsCompensationInfo,
  FormFieldsCredentialRequirements,
  FormFieldsEmploymentRelationship,
  FormFieldsPostingInfo
} from '../../job/base-form.component';
import { createEmptyObjectFromEnum } from '../utils/enum-utils';
import { isNullOrUndefined } from 'util';
import { EnvironmentConfigService } from './environment-config-service';

export type PipelineID = string;

export type JobSectionType =
  'additionalRequirements' |
  'basicInfo'              |
  'credentialRequirements' |
  'compensationInfo'       |
  'employmentRelationship' |
  'postingInfo'            ;

export interface AnnotatedPreview {
  previewMap: {} | null;
  rawPreview: PreviewResponse | null;
}

export interface JobContext {
  additionalRequirements: {};
  annotatedPreview: AnnotatedPreview | null;
  basicInfo: {};
  compensationInfo: {};
  credentialRequirements: {};
  employmentRelationship: {};
  postingInfo: {};
  pipelineID: PipelineID;
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(
    private _api: DefaultService,
    private _envConfig: EnvironmentConfigService,
    private _localStorage: LocalStorageService,
  ) {
    if ( this._localStorage.has(LocalStorageTypes.JOB) &&
         this._localStorage.get(LocalStorageTypes.JOB).version === this._envConfig.environmentConfig.version
    ) {
      this.announceCurrentJob(this._localStorage.get(LocalStorageTypes.JOB));
    }
    else {
      this.newJob();
    }
  }

  private _currentJobContext: JobContext;

  private _jobSub = new BehaviorSubject<JobContext>(null);

  job$ = this._jobSub.asObservable();

  async newJob(id: PipelineID = null) {
    const job = {
      pipelineID: id,
      version: this._envConfig.environmentConfig.version,
      basicInfo: createEmptyObjectFromEnum(FormFieldsBasicInfo),
      employmentRelationship: createEmptyObjectFromEnum(FormFieldsEmploymentRelationship),
      credentialRequirements: createEmptyObjectFromEnum(FormFieldsCredentialRequirements),
      additionalRequirements: createEmptyObjectFromEnum(FormFieldsAdditionalRequirements),
      compensationInfo: createEmptyObjectFromEnum(FormFieldsCompensationInfo),
      postingInfo: createEmptyObjectFromEnum(FormFieldsPostingInfo),
      annotatedPreview: isNullOrUndefined(id) ? null : await(this.updateJobPreview(id)),
    };
    this.setJob(job);
  }

  updateJobSection(section: JobSectionType, data: {}) {
    if (!this._currentJobContext[section]) {
      throw new Error(`Job section '${section}' can not be found on JobContext`);
    }
    this._currentJobContext[section] = data;
    this.setJob(this._currentJobContext);
  }

  updateJobPreview(id: PipelineID): Promise<any> {
    return this._api
      .previewPost(this.createRequestObject(id))
      .toPromise()
      .then(p => {
        return {
          rawPreview: p,
          previewMap: this.createPreviewMap(p)
        };
      });
  }

  isResponsePipelineIdCurrent(r: Request) {
    return r.pipelineID === this._currentJobContext.pipelineID;
  }

  createRequestObject(id: PipelineID): Request {
    return { pipelineID: id};
  }

  previewMatchCountByPropertyName(p) {
    return isNullOrUndefined(this._currentJobContext.annotatedPreview) ||
           isNullOrUndefined(this._currentJobContext.annotatedPreview.previewMap[p])
           ? 0
           : this._currentJobContext.annotatedPreview.previewMap[p].length;
  }

  private setJob(job: JobContext) {
    this.announceCurrentJob(job);
    this._localStorage.set(
      LocalStorageTypes.JOB,
      job
    );
  }

  private announceCurrentJob(job: JobContext) {
    this._jobSub.next(job);
    this._currentJobContext = job;
  }

  private createPreviewMap(p: PreviewResponse) {
    const ap = {};
    p['preview'].fields.forEach( f =>  {
      const tempFieldName = f.field;
      (ap[tempFieldName]) ? ap[tempFieldName].push(f.paragraph_number) : ap[tempFieldName] = [];
    });
    return ap;
  }

}

