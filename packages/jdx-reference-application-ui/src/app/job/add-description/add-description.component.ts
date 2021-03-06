import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultService, RawJobDescriptionResponse } from '@jdx/jdx-reference-application-api-client';
import { Router } from '@angular/router';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../../shared/services/job.service';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.css']
})
export class AddDescriptionComponent implements OnInit {
  constructor(
    private _api: DefaultService,
    private _fb: FormBuilder,
    private _jobService: JobService,
    private _router: Router,
    private _toastr: ToastrService,
  ) { }

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

  form: FormGroup;

  fileName;

  isSubmitting = false;

  selectableFileTypes = '.doc, .docx, .txt';

  readonly JOB_DESCRIPTION_FIELD_NAME = 'job_description';

  readonly JOB_DESCRIPTION_FILE_NAME = 'user-entered-content.txt';

  private _uploadedFile = null;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      [this.JOB_DESCRIPTION_FIELD_NAME]: ['', Validators.required]
    });
  }

  onFileUpload(files: FileList) {
    this.fileName = files[0].name;
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
      .finally(() => this.isSubmitting = false);
  }

  back() {
    this.navigateTo(JobRoutes.ORG_INFO);
  }

  next() {
    this.navigateTo(JobRoutes.DESCRIPTION_PREVIEW);
  }

  navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

  private onSuccess(r: RawJobDescriptionResponse) {
    this._jobService.newJob(r.pipelineID);
    this.next();
  }

  private onError(e) {
    console.log('[[ Error ]] uploadJobDescriptionFilePost ', e);
    this._toastr.error(e.message, 'Error Posting Job Description');
  }

}
