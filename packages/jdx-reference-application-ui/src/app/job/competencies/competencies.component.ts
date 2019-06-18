import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  DefaultService,
  MatchTableResponse,
  Substatements,
  SubstatementsMatches
} from '@jdx/jdx-reference-application-api-client';
import { Subscription } from 'rxjs';
import { PipelineIdServiceService } from '../../shared/pipeline-id-service.service';
import { switchMap } from 'rxjs/operators';

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

  get substatementControls() {
    return this.substatementsFormArray.controls
  }

  get substatementsFormArray() {
    return this.form.controls[ this.SUBSTATEMENT_FORM_ARRAY_NAME ] as FormArray;
  }

  form: FormGroup;
  substatementsArray: Substatements[]

  private _matchTableSub: Subscription;
  private _matchTableResponse: MatchTableResponse;

  readonly SUBSTATEMENT_FORM_ARRAY_NAME = 'substatementArray';

  readonly COMPETENCY = 'competency';
  readonly COMPETENCY_FORM_ARRAY_NAME = 'competencyArray';

  ngOnInit() {
    this.initForm();
    this.initSubscriptions();
  }

  ngOnDestroy() {
    if (this._matchTableSub) {this._matchTableSub.unsubscribe()}
  }

  addCompetency(competencyControl) {
    competencyControl.push(
      this._fb.group({
          [this.COMPETENCY]: this.createSubstatementsMatch()
        }

      )
    )
  }

  removeCompetency(control, index) {
    // TODO: report removed competency to backend
    control.removeAt(index)
  }

  submit() {
    console.log('FORM = ', this.form.value)
  }

  patchValue(control: FormControl, value) {
    // TODO: report new competency to backend
    control.patchValue({
      [this.COMPETENCY]: {name:value}
    })
  }

  private initForm() {
    this.form =
      this._fb.group(
        {
          [this.SUBSTATEMENT_FORM_ARRAY_NAME]: this._fb.array([])
        }
      );
  }

  private initSubscriptions() {
    this._matchTableSub =
      this._pipeLineIdService.pipelineId$
        .pipe(switchMap(id => this._api.matchTablePost( {pipelineID:id})))
        .subscribe(mt => {
          this._matchTableResponse = mt;
          this.setSubstatement(mt['match_table'])
        })
  }

  private setSubstatement(substatements:Substatements[]) {
    let control = this.substatementsFormArray;
    substatements
      .forEach(s => control.push(this._fb.group( this.createSubstatement(s))))
  }

  private createSubstatement(s: Substatements){
    return {
      'substatement': s.substatement,
      'substatementId': s.substatementId,
      [this.COMPETENCY_FORM_ARRAY_NAME]: this.setCompentencies(s.matches)
    }
  }

  private setCompentencies(compentencies: SubstatementsMatches[]) {
    let arr = new FormArray([])
    compentencies.forEach(c =>
      arr.push(this._fb.control({
        [this.COMPETENCY]: this.createSubstatementsMatch(c)
      }))
    );
    return arr;
  }

  private createSubstatementsMatch(c:SubstatementsMatches = {}){
    return {
      definedTermSet: c.definedTermSet || '',
      description: c.description || '',
      name: c.name || '',
      recommendationId: c.recommendationId || '',
      termCode: c.termCode || '',
    }
  }


}
