import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDescriptionComponent } from './add-description/add-description.component';
import { CompetenciesComponent } from './competencies/competencies.component';
import { FrameworksComponent } from './frameworks/frameworks.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ConfirmCompletionComponent } from './confirm-completion/confirm-completion.component';

export enum JobRoutes {
  DESCRIPTION = 'add-description',
  COMPETENCIES = 'competencies',
  FRAMEWORKS = 'frameworks',
  BASIC_INFO = 'basic-info',
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
    path: JobRoutes.COMPETENCIES,
    component: CompetenciesComponent
  },

  {
    path: JobRoutes.FRAMEWORKS,
    component: FrameworksComponent
  },

  {
    path: JobRoutes.BASIC_INFO,
    component: BasicInfoComponent
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
