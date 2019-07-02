import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AnnotatedPreview, JobService } from '../../../services/job.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html'
})
export class FormWrapperComponent implements OnInit, OnDestroy {
  constructor(
    private _jobService: JobService
  ) {}

  @Input() classList;

  @Input() wrappedField: string;

  private _jobSub: Subscription = null;

  annotatedPreview: AnnotatedPreview;

  matches = 0;

  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService
      .job$.subscribe(j => {
        this.matches = this._jobService.previewMatchCountByPropertyName(this.wrappedField);
        this.annotatedPreview = j.annotatedPreview;
      });
  }

}
