import { Injectable } from '@angular/core';
import { Response } from '@jdx/jdx-reference-application-api-client';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService, LocalStorageTypes } from './services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PipelineIdServiceService {
  constructor(
    private _localStorage: LocalStorageService
  ) {
    this.setPipelineId(
      this._localStorage.get(
        LocalStorageTypes.PIPELINE_ID) || null
    );
  }

  private _currentPipelineId = null;

  get pipelineId$() {
    return this._pipelineIdSub.asObservable();
  }

  setPipelineId(id: string) {
    this.announceCurrentPipelineId(id);
    this._localStorage.set(
      LocalStorageTypes.PIPELINE_ID,
      id
    );
  }

  isResponsePipelineIdCurrent(r: Response) {
    return r.pipelineID === this._currentPipelineId
  }

  private _pipelineIdSub = new BehaviorSubject<string>(null);

  private announceCurrentPipelineId(id: string) {
    this._pipelineIdSub.next(id);
    this._currentPipelineId = id;
  }

  ngOnDestroy() {
    this._pipelineIdSub.unsubscribe();
  }

}
