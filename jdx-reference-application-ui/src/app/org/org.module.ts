import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgRoutingModule } from './org-routing.module';
import { OrgInfoComponent } from './org-info/org-info.component';
import { LocationInfoComponent } from './location-info/location-info.component';

@NgModule({
  declarations: [OrgInfoComponent, LocationInfoComponent],
  imports: [
    CommonModule,
    OrgRoutingModule
  ]
})
export class OrgModule { }
