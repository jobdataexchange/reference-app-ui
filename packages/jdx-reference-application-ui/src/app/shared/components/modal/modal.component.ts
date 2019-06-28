import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AnnotatedPreview } from '../../services/job.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef
  ) {}

  get description(): string[] {
    return this.annotatedPreview.rawPreview['preview'].paragraphs;
  }

  get matchedFields() {
    return this.annotatedPreview.previewMap[this.currentField];
  }

  annotatedPreview: AnnotatedPreview;

  currentField: string;

  ngOnInit() {}

  isMatch(index) {
    return this.matchedFields.some( i => i === index );
  }

}
