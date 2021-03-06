import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  DefaultService,
  MatchTableResponse,
  Response,
  Substatements,
  SubstatementsMatches,
  UserActionRequest
} from '@jdx/jdx-reference-application-api-client';
import { Observable, Subscription } from 'rxjs';
import { JobService, PipelineID } from '../../shared/services/job.service';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';

export enum CompetencySelectOptions {
  NONE = 'NONE',
  OTHER = 'OTHER'
}

export enum StateEnum {
  LOADED = 'loaded',
  LOADING = 'loading',
  EMPTY =  'empty'
}

export interface AnnotatedSubstatement extends Substatements {
  annotatedName: string;
  annotatedDescription: string;
  selectedCompetencyOption: string;
  competencyArray: FormArray;
}

@Component({
  selector: 'app-competencies',
  templateUrl: './competencies.component.html'
})
export class CompetenciesComponent implements OnInit, OnDestroy {
  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder,
    private _pipeLineIdService: JobService,
    private _router: Router,
    private _toastr: ToastrService,
  ) {}

  get state(): StateEnum {
    if  (this._isLoading) {
      return StateEnum.LOADING;
    }
    else {
      return StateEnum.LOADED && this.substatementsFormArray.length
             ? StateEnum.LOADED
             : StateEnum.EMPTY;
    }
  }

  get substatementControls() {
    return this.substatementsFormArray.controls;
  }

  get substatementsFormArray(): FormArray {
    return this.form.controls[ this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME ] as FormArray;
  }

  set substatementsFormArray(substatementsFormArray: FormArray) {
    this.form.setControl(this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME, substatementsFormArray);
  }

  readonly ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME = 'annotatedSubstatementArray';

  readonly COMPETENCY = 'competency';

  readonly COMPETENCY_FORM_ARRAY_NAME = 'competencyArray';

  stateEnum = StateEnum;

  competencySelectOptions = CompetencySelectOptions;

  form: FormGroup;

  private _isLoading: boolean;

  private _matchTableSub: Subscription;

  private _matchTableResponse: MatchTableResponse;

  private _pipelineID: PipelineID;

  ngOnInit() {
    this.initForm();
    this.initSubscriptions();
  }

  ngOnDestroy() {
    if (this._matchTableSub) {this._matchTableSub.unsubscribe(); }
  }

  submitForm() {
    const userActionRequest: UserActionRequest = {
      pipelineID: this._pipelineID,
      matchTableSelections: this.form.value[this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME]
        .map( (annotatedSubstatement: AnnotatedSubstatement) => {
          if (annotatedSubstatement.selectedCompetencyOption === CompetencySelectOptions.OTHER) {
            return {
              substatementID: annotatedSubstatement.substatementID,
              replace: {
                name: annotatedSubstatement.annotatedName
              }
            };
          }
          else if (annotatedSubstatement.selectedCompetencyOption === CompetencySelectOptions.NONE) {
            return {
              substatementID: annotatedSubstatement.substatementID,
            };
          }
          else {
            return {
              substatementID: annotatedSubstatement.substatementID,
              accept: {
                recommendationID: annotatedSubstatement.selectedCompetencyOption
              }
            };
          }
        })
    };

    console.log('-> compentencies form value', this.form.value);
    console.log('-> api.userActionsPost', userActionRequest);

    this._api.userActionsPost(userActionRequest)
      .toPromise()
      .then((r: Response) => this.onSuccess(r))
      .catch( e => this.onError(e))
      .finally();
  }

  next() {
    this.navigateTo(JobRoutes.ASSESSMENT_INFO);
  }

  back() {
    this.navigateTo(JobRoutes.FRAMEWORKS);
  }

  private onSuccess(r: Response) {
    console.log('<- api.userActionsPost', r);
    this.next();
  }

  private onError(e) {
    console.log('[[ Error ]] api.userActionsPost', e);
    this._toastr.error(e.message, 'Error Submitting Competency Selections ');
  }

  private initForm() {
    this.form =
      this._fb.group({
        [this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME]: this._fb.array([])
      });
  }
  private fetchMatchTable(): Observable<MatchTableResponse> | null {

    if (isNullOrUndefined(this._pipelineID)) {
      this._toastr.error('No PipelineID found. Starting over!', null, {disableTimeOut: false});
      this.navigateTo(JobRoutes.DESCRIPTION);
      return null;
    }

    return this._api.matchTablePost(
      JobService.createMatchTableRequest(this._pipelineID)
    )
      .pipe(
        map(this.filterOutDuplicateRecommendations)
      );
  }

  /*
  TODO: The API just shouldn't return duplicates. Remove this.
   */
  private filterOutDuplicateRecommendations(response: MatchTableResponse): MatchTableResponse {
    response.matchTable.forEach(substatements => {
      const seen = new Set();
      substatements.matches = substatements.matches.filter(match => {
        const isDuplicate = seen.has(match.recommendationID);
        if (!isDuplicate) {
          seen.add(match.recommendationID);
        }
        return !isDuplicate;
      });
    });
    return response;
  }

  private initSubscriptions() {
    this._isLoading = true;
    this._matchTableSub =
      this._pipeLineIdService.job$
        .pipe(
          switchMap(job => {
            this._pipelineID = job.pipelineID;
            return this.fetchMatchTable();
          })
        )
        .subscribe(mt => {
          console.log('<- _api.matchTablePost ', mt);
          this._matchTableResponse = mt;
          this.createAnnotatedSubstatementsArray(mt.matchTable);
          this._isLoading = false;
        });
  }

  private createAnnotatedSubstatementsArray(substatements: Substatements[]) {
    this.substatementsFormArray = this._fb.array(substatements.map(
      s => this._fb.group( this.createAnnotatedSubstatement(s))));

  }

  private createAnnotatedSubstatement(s: Substatements): AnnotatedSubstatement {
    return {
      substatement: s.substatement,
      substatementID: s.substatementID,
      annotatedName: '',
      annotatedDescription: '',
      selectedCompetencyOption: isNullOrUndefined(s.matches[0]) ? CompetencySelectOptions.NONE : s.matches[0].recommendationID,
      [this.COMPETENCY_FORM_ARRAY_NAME]: this.setCompetencies(s.matches)
    };
  }

  private setCompetencies(compentencies: SubstatementsMatches[]) {
    const arr = new FormArray([]);

    const createControl = (compentency) => {
      return this._fb.control({ [ this.COMPETENCY ]: compentency });
    };

    if (!!compentencies.length) {
      compentencies.forEach(c => arr.push(createControl(c)));
    }
    else {
        arr.push(createControl( CompetencySelectOptions.NONE));
    }

    return arr;
  }

  private navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

}
