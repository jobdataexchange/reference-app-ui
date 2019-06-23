import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultService, RawJobDescriptionResponse } from '@jdx/jdx-reference-application-api-client';
import { PipelineIdServiceService } from '../../shared/pipeline-id-service.service';
import { Router } from '@angular/router';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.css']
})
export class AddDescriptionComponent implements OnInit {
  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder,
    private _pipelineIdService: PipelineIdServiceService,
    private _router: Router
  ) { }

  form: FormGroup;

  isSubmitting = false;

  selectableFileTypes = '.docx, .txt';

  readonly JOB_DESCRIPTION_FIELD_NAME = 'job_description';

  readonly JOB_DESCRIPTION_FILE_NAME = 'user-entered-content.txt';

  private _uploadedFile = null;

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      [this.JOB_DESCRIPTION_FIELD_NAME]: ['', Validators.required]
    });
  }

  onFileUpload(files: FileList) {
    this._uploadedFile = null;
    if (files && files.length) {
      this._uploadedFile = files[0];
    }
  }

  patchJobDescription(value) {
    this.form.patchValue({ [this.JOB_DESCRIPTION_FIELD_NAME]: value});
  }

  submitForm() {
    this.isSubmitting = true;

    this._api.uploadJobDescriptionFilePost(this.uploadFile)
      .toPromise()
      .then((r: RawJobDescriptionResponse) => this.onSuccess(r))
      .catch( e => this.onError(e))
      .finally(() => this.isSubmitting = false)
  }

  private setPipelineId(id) {
    this._pipelineIdService.setPipelineId(id)
  }

  private get uploadFile() {
    if (this._uploadedFile) {
      return this._uploadedFile;
    }

    const userEnteredText = this.form.controls[this.JOB_DESCRIPTION_FIELD_NAME].value;
    if (userEnteredText) {
      return new File(
        [this.form.controls[this.JOB_DESCRIPTION_FIELD_NAME].value],
        this.JOB_DESCRIPTION_FILE_NAME,
        {type: 'text/plain'}
      );
    }
  }

  private onSuccess(r: RawJobDescriptionResponse){
    console.log('<- uploadJobDescriptionFilePost ', r)
    this.setPipelineId(r.pipelineID);
    this.navigateTo(JobRoutes.BASIC_INFO);
  }

  navigateTo(route:JobRoutes){
    this._router.navigateByUrl(createRouteUrlByJobRoute(route))
  }

  private onError(e){
    // TODO: how are we handling errors?
    console.log('[[ Error ]] uploadJobDescriptionFilePost ', e)
  }



}
