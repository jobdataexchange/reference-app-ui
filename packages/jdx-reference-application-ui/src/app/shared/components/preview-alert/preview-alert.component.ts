import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalComponent } from '../../../job/modal/modal.component';
import { AnnotatedPreview } from '../../services/job.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-preview-alert',
  templateUrl: './preview-alert.component.html'
})
export class PreviewAlertComponent {
  constructor(
    private modalService: BsModalService
  ) {}

  @Input() matches;

  @Input() preview: AnnotatedPreview;

  @Input() currentField: string;

  bsModalRef: BsModalRef | null;

  openModal() {
    const initialState = {
      preview: this.preview,
      currentField: this.currentField
    };

    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
