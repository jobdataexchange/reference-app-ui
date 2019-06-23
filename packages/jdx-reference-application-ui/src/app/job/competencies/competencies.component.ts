import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  DefaultService,
  MatchTableRequest,
  MatchTableResponse,
  Substatements,
  SubstatementsMatches,
  UserActionRequest
} from '@jdx/jdx-reference-application-api-client';
import { Subscription } from 'rxjs';
import { PipelineIdServiceService } from '../../shared/pipeline-id-service.service';
import { map, switchMap } from 'rxjs/operators';
import { Accept, Replace } from '../../../../../jdx-reference-application-api-client/generated-sources';

export enum CompetencySelectOptions {
  NONE = 'NONE',
  OTHER = 'OTHER'
}
export type CompetencySelectOption = keyof typeof CompetencySelectOptions;

export interface AnnotatedSubstatement extends Substatements{
  AnnotatedName: string;
  AnnotatedDescription: string;
  selectedCompetencyOption?: CompetencySelectOption;
  competencyArray: FormArray
}

@Component({
  selector: 'app-competencies',
  templateUrl: './competencies.component.html'
})
export class CompetenciesComponent implements OnInit, OnDestroy {
  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder,
    private _pipeLineIdService: PipelineIdServiceService
  ) {}

  competencySelectOptions = CompetencySelectOptions;

  get substatementControls() {
    return this.substatementsFormArray.controls;
  }

  get substatementsFormArray() {
    return this.form.controls[ this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME ] as FormArray;
  }
  set substatementsFormArray(substatementsFormArray: FormGroup[]) {
    this.form.setControl(this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME, this._fb.array(substatementsFormArray));
  }

  form: FormGroup;

  substatementsArray: Substatements[];

  private _matchTableSub: Subscription;

  private _matchTableResponse: MatchTableResponse;

  private _pipelineID;

  readonly ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME = 'annotatedSubstatementArray';
  readonly THRESHOLD_FIELD = 'threshold';

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
    console.log('Submit')
  }

  // patchValue(control: FormControl, value) {
  //   // TODO: report new competency to backend
  //   control.patchValue({
  //     [this.COMPETENCY]: {name: value}
  //   });
  // }

  private initForm() {
      this.form =
        this._fb.group({
          [this.THRESHOLD_FIELD]: 0.45,
          [this.ANNOTATED_SUBSTATEMENT_FORM_ARRAY_NAME]: this._fb.array([])
        });
  }

  private initSubscriptions() {
    this._matchTableSub =
      this._pipeLineIdService.pipelineId$
        .pipe(
          switchMap(id => {
            this._pipelineID = id;
            return this._api.matchTablePost(
              this.createMatchTableRequest(id, this.threshold)
            );
          })
        )
        .subscribe(mt => {
          console.log('<- _api.matchTablePost ',mt)
          this._matchTableResponse = mt;
          this.createAnnotatedSubstatementsArray(mt.matchTable);
        });
  }

  get threshold() {
    console.log('threshold', this.form.get(this.THRESHOLD_FIELD).value);
    return parseFloat(this.form.get(this.THRESHOLD_FIELD).value);
  }

  updateThreshold() {
    return this._api.matchTablePost(
      this.createMatchTableRequest(this._pipelineID, this.threshold)
    )
    .subscribe(mt => {
      console.log('<- _api.matchTablePost ',mt)
      this._matchTableResponse = mt;
      this.createAnnotatedSubstatementsArray(mt.matchTable);
    });
  }


  private createAnnotatedSubstatementsArray(substatements: Substatements[]) {
    this.substatementsFormArray = substatements.map(s => this._fb.group( this.createAnnotatedSubstatement(s)));
  }

  private createAnnotatedSubstatement(s: Substatements): AnnotatedSubstatement{
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


  createMatchTableRequest(id:string, threshold:number = null): MatchTableRequest{
    const result = {}
    Object.assign(result,
      {pipelineID: id}
    );

    console.log(threshold);
    if(threshold){
      Object.assign(result,
        {threshold: threshold}
      )
    }
    return result;
  }


}
