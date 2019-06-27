import { Injectable, OnDestroy } from '@angular/core';
import { DefaultService, PreviewResponse, Request } from '@jdx/jdx-reference-application-api-client';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService, LocalStorageTypes } from './local-storage.service';
import { FormFieldsBasicInfo } from '../../job/base-form.component';
import { createEmptyObjectFromEnum } from '../utils/enum-utils';
import { isNullOrUndefined } from 'util';

export type PipelineID = string;

export type JobSectionType = 'basicInfo';

export interface AnnotatedPreview {
  rawPreview: PreviewResponse | null;
  previewMap: {} | null;
}

export interface JobContext {
  pipelineID: PipelineID;
  basicInfo: {};
  annotatedPreview: AnnotatedPreview | null;
}

@Injectable({
  providedIn: 'root'
})
export class JobService implements OnDestroy {
  constructor(
    private _api: DefaultService,
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

  private _JobSub = new BehaviorSubject<JobContext>(null);

  ngOnDestroy() {
    this._JobSub.unsubscribe();
  }

  async newJob(id: PipelineID = null) {
    const job = {
      pipelineID: id,
      basicInfo: createEmptyObjectFromEnum(FormFieldsBasicInfo),
      annotatedPreview: isNullOrUndefined(id) ? null : await(this.updateJobPreview(id))
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

  private setJob(job: JobContext) {
    this.announceCurrentJob(job);
    this._localStorage.set(
      LocalStorageTypes.JOB,
      job
    );
  }

  private announceCurrentJob(job: JobContext) {
    this._JobSub.next(job);
    this._currentJobContext = job;
  }

  private createPreviewMap(p: PreviewResponse) {
    const ap = {};
    p['preview'].fields.forEach( f =>  {
      const tempFieldName = f.field.split('.')[1].toLowerCase();
      (ap[tempFieldName]) ? ap[tempFieldName].push(f.paragraph_number) : ap[tempFieldName] = [];
    });
    return ap;
  }

}

