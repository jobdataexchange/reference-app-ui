import { Injectable } from '@angular/core';
import { Response } from '@jdx/jdx-reference-application-api-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PipelineIdServiceService {
  constructor() { }

  private _currentPipelineId = null;

  get pipelineId$() {
    return this._pipelineIdSub.asObservable();
  }

  setPipelineId(id: string) {
    this.announceCurrentPipelineId(id);
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
