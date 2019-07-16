import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobContext, JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormFieldsBasicInfo } from '../base-form.component';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { LocalStorageService, LocalStorageTypes } from '../../shared/services/local-storage.service';
import { DefaultService, GenerateJobSchemaPlusResponse } from '@jdx/jdx-reference-application-api-client';
import { flatMap } from 'rxjs/operators';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit, OnDestroy {

  constructor(
    private _api: DefaultService,
    private _localStorage: LocalStorageService,
    private _jobService: JobService,
    private _router: Router
  ) { }

  jobTitle: string;
  jobSchemaPlusResponse: GenerateJobSchemaPlusResponse;

  private _jobSub: Subscription = null;
  private _resultSub: Subscription = null;

  download() {
    const blob = new Blob([this.jobSchemaPlusResponse.jobSchemaPlusFile], { type: 'application/json' });
    saveAs(blob, 'jobSchemaPlus.json');
  }

  /**
   * API may return a string or an array of strings for a given field.
   * Normalize this into an array of strings for the template to iterate over.
   */
  getParagraphsForFieldName(fieldName: string): string[] {
    const rawValue = this.jobSchemaPlusResponse.humanReadable.data[fieldName];
    return (rawValue instanceof Array) ? rawValue : [rawValue];
  }

  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
    this._resultSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$
      .subscribe( j => {
        this.jobTitle = j.basicInfo[FormFieldsBasicInfo.TITLE];
      });
    this._resultSub = this._jobService.job$.pipe(
      flatMap(j => this._api.generateJobSchemaPlusPost({pipelineID: j.pipelineID}))
    ).subscribe(response => this.jobSchemaPlusResponse = response);
  }

  createNewJob() {
    this.navigateTo(JobRoutes.DESCRIPTION);
  }

  private navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}
