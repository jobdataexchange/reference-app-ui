import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DefaultService,
  Framework,
  FrameworkRecommendationResponse,
  FrameworkSelectionRequest,
  Response,
  ScoredRecommendation
} from '@jdx/jdx-reference-application-api-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipelineIdServiceService } from '../../shared/pipeline-id-service.service';
import { Subscription } from 'rxjs';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-framework',
  templateUrl: './frameworks.component.html',
  styleUrls: ['./frameworks.component.css']
})
export class FrameworksComponent implements OnInit, OnDestroy {
  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder,
    private _pipelineIdService: PipelineIdServiceService,
    private _router: Router
  ) { }

  form: FormGroup;

  isSubmitting = false;

  frameworkRecommendations: ScoredRecommendation[] = [];

  readonly FRAMEWORK_FIELD_NAME = 'competency-framework';

  private _currentPipelineId = null;

  private _frameworkRecommendationSub: Subscription;

  private _pipelineIdSub: Subscription;

  ngOnInit() {
    this.initForm();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    if (this._pipelineIdSub) {this._pipelineIdSub.unsubscribe()}
    if (this._frameworkRecommendationSub) {this._frameworkRecommendationSub.unsubscribe()}
  }

  initForm() {
    this.form = this._fb.group({
      [ this.FRAMEWORK_FIELD_NAME ]: [ '', Validators.required ]
    });
  }

  initSubscriptions() {
    this._pipelineIdSub =
      this._pipelineIdService
        .pipelineId$
        .subscribe(
          id => {
            this._currentPipelineId = id;
            this.getFrameworkRecommendation(id)
          }
        )
  }

  submitForm() {
    this.isSubmitting = true;

    this._api
      .frameworkSelectionsPost(this.createFrameworkSelectionRequest())
      .toPromise()
      .then((r: Response) => this.onSuccess(r))
      .catch(e => this.onError(e))
      .finally(() => this.isSubmitting = false)
  }

  private createFrameworkSelectionRequest(): FrameworkSelectionRequest {
    return {
      pipelineID: this._currentPipelineId,
      frameworks: {
        competency: this.competencyFrameworksFromFieldValue()
      }
    };
  }

  private competencyFrameworksFromFieldValue(): Framework[] {
    const f = [];
    this.form.value[ this.FRAMEWORK_FIELD_NAME ].forEach(id => f.push({ frameworkId: id }));
    return f;
  }

  private getFrameworkRecommendation(id) {
    if (isNullOrUndefined(this._currentPipelineId)) {
      return this.navigateTo(JobRoutes.DESCRIPTION);
    }

    console.log('this._currentPipelineId ', this._currentPipelineId)
    this._frameworkRecommendationSub =
      this._api
        .frameworkRecommendationsPost({ pipelineID: this._currentPipelineId })
        .subscribe(
          (r: FrameworkRecommendationResponse) => this.frameworkRecommendations = r.frameworkRecommendations
        )
  }

  private onSuccess(r: Response) {
    console.log('<- uploadJobDescriptionFilePost ', r)
    if (this._pipelineIdService.isResponsePipelineIdCurrent(r)) {
      this.navigateTo(JobRoutes.COMPETENCIES)
    } else {
      // TODO: handle this case.
      console.log('[ERROR] Response PipelineId does not match current id')
    }

  }

  private onError(e) {
    // TODO: how are we handling errors?
    console.log('[[ Error ]] uploadJobDescriptionFilePost ', e)
  }

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route))
  }
}

