import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AnnotatedPreview, JobService } from '../../../services/job.service';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

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

  @Input() matchCount: number; // TODO: remove matchcount

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
        this.matches = isNullOrUndefined(j.annotatedPreview.previewMap[this.wrappedField])
                     ? 0
                     : j.annotatedPreview.previewMap[this.wrappedField].length;

        this.annotatedPreview = j.annotatedPreview;
      });
  }

}
