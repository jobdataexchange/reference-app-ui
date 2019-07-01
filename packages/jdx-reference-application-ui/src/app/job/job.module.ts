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
import { EmploymentRelationshipComponent } from './employment-relationship/employment-relationship.component';
import { AdditionalRequirementsComponent } from './additional-requirements/additional-requirements.component';
import { CredentialRequirementsComponent } from './credential-requirements/credential-requirements.component';
import { CompensationInfoComponent } from './compensation-info/compensation-info.component';

@NgModule({
  declarations: [
    AddDescriptionComponent,
    FrameworksComponent,
    CompetenciesComponent,
    BasicInfoComponent,
    ConfirmCompletionComponent,
    EmploymentRelationshipComponent,
    AdditionalRequirementsComponent,
    CredentialRequirementsComponent,
    CompensationInfoComponent,
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
