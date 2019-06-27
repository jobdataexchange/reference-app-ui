import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AnnotatedPreview } from '../../shared/services/job.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef
  ) {}

  get description(): string[] {
    return this.preview.rawPreview['preview'].paragraphs;
  }

  get matchedFields() {
    return this.preview.previewMap[this.currentField];
  }

  preview: AnnotatedPreview;
  currentField: string;

  ngOnInit() {}

  isMatch(index) {
    return this.matchedFields.some( i => i === index );

  }

}
