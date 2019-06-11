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
  fileToUpload: any;

  selectableFileTypes = '.docx, .txt'

  readonly JOB_DESCRIPTION_FIELD_NAME = 'job_description'

  // TODO: Do we need to pass a filename uploadJobDescriptionFilePost? If so what is the default name for manually entered text
  private _filename = 'foo.txt';

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
      // const fileReader = new FileReader();
      // fileReader.onload = () => this.patchJobDescription(fileReader.result)
      // fileReader.readAsText(files.item(0));
      this.fileToUpload = files[0];
    }
  }

  patchJobDescription(value) {
    console.log('patch', value);
    this.form.patchValue({ [this.JOB_DESCRIPTION_FIELD_NAME]: value});
  }

  submitForm() {
    this._api.uploadJobDescriptionFilePost(
      this.blobFromFieldControlValue()
      // this.fileToUpload
    )
      .toPromise().then(response => console.log(response));
  }

  private blobFromFieldControlValue() {
    return new File([this.form.controls[this.JOB_DESCRIPTION_FIELD_NAME].value], 'some.txt', {type: 'text/plain'});
  }

}
