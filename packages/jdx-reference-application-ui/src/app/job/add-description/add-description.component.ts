import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultService } from '@jdx/jdx-reference-application-api-client';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.css']
})
export class AddDescriptionComponent implements OnInit {
  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder
  ) { }

  form: FormGroup;

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
    this._api.uploadJobDescriptionFilePost(this.fileFromFieldControlValue())
      .toPromise()
      .then(r => console.log('<- uploadJobDescriptionFilePost ', r));
  }

  private fileFromFieldControlValue() {
    const f = new File(
      [this.form.controls[this.JOB_DESCRIPTION_FIELD_NAME].value],
      this._filename,
      {type: 'text/plain'});

    console.log('-> uploadJobDescriptionFilePost ', f);

    return f;
  }

}
