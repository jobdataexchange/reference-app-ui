import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AnnotatedPreview, JobContext, JobService } from '../../../services/job.service';
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

  @Input() matchCount; // TODO: remove matchcount

  private preview: AnnotatedPreview;

  private _jobSub: Subscription = null;

  count = 0;

  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this._jobSub.unsubscribe();
  }

  initSubscriptions() {
    this._jobSub = this._jobService.job$.subscribe(j => {
      this.count = isNullOrUndefined(j.annotatedPreview.previewMap[this.wrappedField])
                   ? 0
                   : j.annotatedPreview.previewMap[this.wrappedField].length;

      this.preview = j.annotatedPreview;
    });
  }

}
