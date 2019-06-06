import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultService } from '../../../../../jdx-reference-application-api-client/generated-sources';
// import { DefaultService } from '../../../../../jdx-reference-application-api-client/generated-sources';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.css']
})
export class AddDescriptionComponent implements OnInit {
  // private _api: DefaultService
  constructor(
    private _fb: FormBuilder

  ) { }


  form: FormGroup;

  readonly JOB_DESCRIPTION_FIELD_NAME = 'job_description'

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      [this.JOB_DESCRIPTION_FIELD_NAME]: ["", Validators.required]
    });
  }

  onFileUpload(files: FileList) {
    if (files && files.length) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        console.log('fileReader.result ', fileReader.result)
        this.form.patchValue({ [this.JOB_DESCRIPTION_FIELD_NAME]: fileReader.result });
      };

      fileReader.readAsDataURL(files.item(0));
    }
  }

  submitForm() {
    console.log('submit = ',this.form.value)
  }

}
