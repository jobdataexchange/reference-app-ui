import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDescriptionComponent } from './add-description/add-description.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { FrameworksComponent } from './frameworks/frameworks.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ConfirmCompletionComponent } from './confirm-completion/confirm-completion.component';
import { EmploymentRelationshipComponent } from './employment-relationship/employment-relationship.component';
import { AdditionalRequirementsComponent } from './additional-requirements/additional-requirements.component';
import { CredentialRequirementsComponent } from './credential-requirements/credential-requirements.component';
import { CompensationInfoComponent } from './compensation-info/compensation-info.component';
import { PostingInfoComponent } from './posting-info/posting-info.component';

export enum JobRoutes {
  ADDITIONAL_REQUIREMENTS = 'additional-requirements',
  BASIC_INFO = 'basic-info',
  COMPETENCIES = 'competencies',
  COMPENSATION_INFO = 'compensation-info',
  CONFIRM_COMPLETION = 'confirm-completion',
  CREDENTIAL_REQUIREMENTS = 'credential-requirements',
  DESCRIPTION = 'add-description',
  EMPLOYMENT_RELATIONSHIP = 'employment-relationship',
  FRAMEWORKS = 'frameworks',
  POSTING_INFO = 'posting-info'
}

export function createRouteUrlByJobRoute(r: JobRoutes): string {
  return `job/${r}`;
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: JobRoutes.DESCRIPTION
  },

  {
    path: JobRoutes.DESCRIPTION,
    component: AddDescriptionComponent
  },

  {
    path: JobRoutes.BASIC_INFO,
    component: BasicInfoComponent
  },

  {
    path: JobRoutes.EMPLOYMENT_RELATIONSHIP,
    component: EmploymentRelationshipComponent
  },

  {
    path: JobRoutes.FRAMEWORKS,
    component: FrameworksComponent
  },

  {
    path: JobRoutes.COMPETENCIES,
    component: CompetenciesComponent
  },

  {
    path: JobRoutes.CREDENTIAL_REQUIREMENTS,
    component: CredentialRequirementsComponent
  },

  {
    path: JobRoutes.ADDITIONAL_REQUIREMENTS,
    component: AdditionalRequirementsComponent
  },

  {
    path: JobRoutes.COMPENSATION_INFO,
    component: CompensationInfoComponent
  },

  {
    path: JobRoutes.POSTING_INFO,
    component: PostingInfoComponent
  },

  {
    path: JobRoutes.CONFIRM_COMPLETION,
    component: ConfirmCompletionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
