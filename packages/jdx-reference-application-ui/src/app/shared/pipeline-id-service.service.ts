import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PipelineIdServiceService {
  constructor() { }

  get pipelineIdSub$() {
    return this._pipelineIdSub.asObservable();
  }

  setPipelineId(id: string) {
    this.announceCurrentPipelineId(id);
  }

  private _pipelineIdSub = new BehaviorSubject<string>(null);

  private announceCurrentPipelineId(id: string) {
    this._pipelineIdSub.next(id);
  }

  ngOnDestroy() {
    this._pipelineIdSub.unsubscribe();
  }

}
