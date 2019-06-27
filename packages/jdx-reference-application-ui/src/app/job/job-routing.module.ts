import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDescriptionComponent } from './add-description/add-description.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { FrameworksComponent } from './frameworks/frameworks.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ConfirmCompletionComponent } from './confirm-completion/confirm-completion.component';
import { EmploymentRelationshipComponent } from './employment-relationship/employment-relationship.component';
import { AdditionalRequirementsComponent } from './additional-requirements/additional-requirements.component';
import { CredentialRequirementsComponent } from './credential-requirements/credential-requirements.component';

export enum JobRoutes {
  DESCRIPTION = 'add-description',
  BASIC_INFO = 'basic-info',
  EMPLOYMENT_RELATIONSHIP = 'employment-relationship',
  FRAMEWORKS = 'frameworks',
  COMPETENCIES = 'competencies',
  CREDENTIAL_REQUIREMENTS = 'credential-requirements',
  ADDITIONAL_REQUIREMENTS = 'additional-requirements',
  CONFIRM_COMPLETION = 'confirm-completion'
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
    path: JobRoutes.CONFIRM_COMPLETION,
    component: ConfirmCompletionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
