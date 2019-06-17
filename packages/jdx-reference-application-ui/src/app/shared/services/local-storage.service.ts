import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage;

  constructor(
    private ws: WindowService
  ) {
    this.localStorage = this.ws.winRef.localStorage;
  }

  set(key: LocalStorageTypes, data: any): void {
    this.localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: LocalStorageTypes) {
      return JSON.parse(this.localStorage.getItem(key));
  }

  has(key: LocalStorageTypes) {
    return this.localStorage.getItem(key) !== null;
  }
}

export enum LocalStorageTypes {
  PIPELINE_ID = 'pipelinId'
}
