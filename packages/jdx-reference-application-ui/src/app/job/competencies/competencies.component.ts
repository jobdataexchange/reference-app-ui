import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {
  DefaultService,
  MatchTableRequest,
  MatchTableResponse,
  Substatements,
  SubstatementsMatches
} from '@jdx/jdx-reference-application-api-client';
import {Subscription} from 'rxjs';
import {PipelineIdServiceService} from '../../shared/pipeline-id-service.service';
import {switchMap} from 'rxjs/operators';
import {createRouteUrlByJobRoute, JobRoutes} from '../job-routing.module';
import {Router} from '@angular/router';

export enum CompetencySelectOptions {
  NONE = 'NONE',
  OTHER = 'OTHER'
}
export type CompetencySelectOption = keyof typeof CompetencySelectOptions;

export interface AnnotatedSubstatement extends Substatements {
  AnnotatedName: string;
  AnnotatedDescription: string;
  selectedCompetencyOption?: CompetencySelectOption;
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
    private _pipeLineIdService: PipelineIdServiceService,
    private _router: Router,
  ) {}

  competencySelectOptions = CompetencySelectOptions;

  get substatementControls() {
    return this.substatementsFormArray.controls;
  }

  get substatementsFormArray() {
    return this.form.controls[ this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME ] as FormArray;
  }

  form: FormGroup;

  substatementsArray: Substatements[];

  private _matchTableSub: Subscription;

  private _matchTableResponse: MatchTableResponse;

  private _pipelineID;

  readonly ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME = 'annotatedSubstatementArray';

  readonly COMPETENCY = 'competency';

  readonly COMPETENCY_FORM_ARRAY_NAME = 'competencyArray';

  ngOnInit() {
    this.initForm();
    this.initSubscriptions();
  }

  ngOnDestroy() {
    if (this._matchTableSub) {this._matchTableSub.unsubscribe(); }
  }

  // addCompetency(competencyControl) {
  //   competencyControl.push(
  //     this._fb.group({
  //         [this.COMPETENCY]: this.createCompetencyFromSubstatementsMatch()
  //       }
  //
  //     )
  //   )
  // }

  // removeCompetency(control, index) {
  //   // TODO: report removed competency to backend
  //   control.removeAt(index)
  // }

  submit() {
    console.log('Submit');
  }

  // patchValue(control: FormControl, value) {
  //   // TODO: report new competency to backend
  //   control.patchValue({
  //     [this.COMPETENCY]: {name: value}
  //   });
  // }

  private initForm() {
      this.form =
        this._fb.group(
          { [this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME]: this._fb.array([]) }
        );
  }

  private initSubscriptions() {
    this._matchTableSub =
      this._pipeLineIdService.pipelineId$
        .pipe(
          switchMap(id => {
            this._pipelineID = id;
            return this._api.matchTablePost(
              this.createMatchTableRequest(id)
            );
          })
        )
        .subscribe(mt => {
          console.log('<- _api.matchTablePost ', mt);
          this._matchTableResponse = mt;
          this.createAnnotatedSubstatementsArray(mt.matchTable);
        });
  }


  private createAnnotatedSubstatementsArray(substatements: Substatements[]) {
    const control = this.substatementsFormArray;
    substatements
      .forEach(s =>
        control.push(
          this._fb.group( this.createAnnotatedSubstatement(s))
        )
      );
  }

  private createAnnotatedSubstatement(s: Substatements): AnnotatedSubstatement {
    return {
      substatement: s.substatement,
      substatementID: s.substatementID,
      AnnotatedName: '',
      AnnotatedDescription: '',
      selectedCompetencyOption: null,
      [this.COMPETENCY_FORM_ARRAY_NAME]: this.setCompetencies(s.matches)
    };
  }

  private setCompetencies(compentencies: SubstatementsMatches[]) {
    const arr = new FormArray([]);
    compentencies.forEach(compentency =>
      arr.push(
        this._fb.control(
        {[this.COMPETENCY]: compentency}
        )
      )
    );
    return arr;
  }


  createMatchTableRequest(id: string, threshold: number = null): MatchTableRequest {
    const result = {};
    Object.assign(result,
      {pipelineID: id}
    );

    if (threshold) {
      Object.assign(result,
        {threshold}
      );
    }
    return result;
  }

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

  back() {
    this.navigateTo(JobRoutes.FRAMEWORKS);
  }
}
