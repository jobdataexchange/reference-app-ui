import { Injectable, OnDestroy } from '@angular/core';
import { Response } from '@jdx/jdx-reference-application-api-client';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService, LocalStorageTypes } from './local-storage.service';
import { FormFieldsBasicInfo, FormFieldsEmploymentRelationship } from '../../job/base-form.component';
import { createEmptyObjectFromEnum } from '../utils/enum-utils';

export type PipelineID = string;

export type JobSectionType = 'basicInfo' | 'employmentRelationship';

export interface JobContext {
  pipelineID: PipelineID;
  basicInfo: {};
  employmentRelationship: {};
}

@Injectable({
  providedIn: 'root'
})
export class JobService implements OnDestroy {
  constructor(
    private _localStorage: LocalStorageService,
  ) {
    if (this._localStorage.has(LocalStorageTypes.JOB)) {
      this.announceCurrentJob(this._localStorage.get(LocalStorageTypes.JOB));
    }
    else {
      this.newJob();
    }
  }

  get job$() {
    return this._JobSub.asObservable();
  }

  private _currentJobContext: JobContext;

  private _currentPipelineId: PipelineID;

  private _JobSub = new BehaviorSubject<JobContext>(null);

  ngOnDestroy() {
    this._JobSub.unsubscribe();
  }

  newJob(id: PipelineID = null) {
    const job = {
      pipelineID: id,
      basicInfo: createEmptyObjectFromEnum(FormFieldsBasicInfo),
      employmentRelationship: createEmptyObjectFromEnum(FormFieldsEmploymentRelationship)
    };
    this.setJob(job);
  }

  updateJobSection(section: JobSectionType, data: {}) {

    console.log('this is the section');
    console.log(section);

    if (!this._currentJobContext[section]) {
      throw new Error(`Job section '${section}' can not be found on JobContext`);
    }
    this._currentJobContext[section] = data;
    this.setJob(this._currentJobContext);
  }

  isResponsePipelineIdCurrent(r: Response) {
    return r.pipelineID === this._currentPipelineId;
  }

  private setJob(job: JobContext) {
    this.announceCurrentJob(job);
    this._localStorage.set(
      LocalStorageTypes.JOB,
      job
    );
  }

  private announceCurrentJob(job: JobContext) {
    this._currentJobContext = job;
    this._JobSub.next(job);
    this._currentPipelineId = job.pipelineID || null;
  }

}

