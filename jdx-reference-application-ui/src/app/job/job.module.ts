import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { AddDescriptionComponent } from './add-description/add-description.component';
import { FrameworksComponent } from './frameworks/frameworks.component';
import { CompetenciesComponent } from './competencies/competencies.component';

@NgModule({
  declarations: [
    AddDescriptionComponent,
    FrameworksComponent,
    CompetenciesComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule
  ]
})
export class JobModule { }
