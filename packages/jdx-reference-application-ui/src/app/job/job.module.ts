import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AddDescriptionComponent } from './add-description/add-description.component';
import { FrameworksComponent } from './frameworks/frameworks.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmCompletionComponent } from './confirm-completion/confirm-completion.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AddDescriptionComponent,
    FrameworksComponent,
    CompetenciesComponent,
    BasicInfoComponent,
    ConfirmCompletionComponent,
    ModalComponent
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class JobModule { }
