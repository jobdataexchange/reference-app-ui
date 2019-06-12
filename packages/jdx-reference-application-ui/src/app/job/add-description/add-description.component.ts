import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultService, RawJobDescriptionResponse } from '@jdx/jdx-reference-application-api-client';
import { PipelineIdServiceService } from '../../shared/pipeline-id-service.service';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.css']
})
export class AddDescriptionComponent implements OnInit {
  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder,
    private _pipelineIdService: PipelineIdServiceService
  ) { }

  form: FormGroup;

  isSubmitting = false;

  selectableFileTypes = '.docx, .txt';

  readonly JOB_DESCRIPTION_FIELD_NAME = 'job_description';

  readonly JOB_DESCRIPTION_FILE_NAME = 'user-entered-content.txt';

  private _filename = this.JOB_DESCRIPTION_FILE_NAME;

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      [this.JOB_DESCRIPTION_FIELD_NAME]: ['', Validators.required]
    });
  }

  onFileUpload(files: FileList) {
    if (files && files.length) {
      this._filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.onload = () => this.patchJobDescription(fileReader.result);
      fileReader.readAsText(files.item(0));
    }
  }

  patchJobDescription(value) {
    this.form.patchValue({ [this.JOB_DESCRIPTION_FIELD_NAME]: value});
  }

  submitForm() {
    this.isSubmitting = true;

    this._api.uploadJobDescriptionFilePost(this.fileFromFieldControlValue())
      .toPromise()
      .then((r: RawJobDescriptionResponse) => this.onSuccess(r))
      .catch( e => this.onError(e))
      .finally(() => this.isSubmitting = false)
  }

  private setPipelineId(id) {
    this._pipelineIdService.setPipelineId(id)
  }

  private fileFromFieldControlValue() {
    const f = new File(
      [this.form.controls[this.JOB_DESCRIPTION_FIELD_NAME].value],
      this._filename,
      {type: 'text/plain'}
    );

    console.log('-> uploadJobDescriptionFilePost ', f);
    return f;
  }

  private onSuccess(r: RawJobDescriptionResponse){
    console.log('<- uploadJobDescriptionFilePost ', r)
    this.setPipelineId(r.pipelineID);
  }

  private onError(e){
    // TODO: how are we handling errors?
    console.log('[[ Error ]] uploadJobDescriptionFilePost ', e)
  }

}
