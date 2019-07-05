import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgRoutingModule } from './org-routing.module';
import { LocationInfoComponent } from './location-info/location-info.component';

@NgModule({
  declarations: [
    LocationInfoComponent
  ],
  imports: [
    CommonModule,
    OrgRoutingModule
  ]
})
export class OrgModule { }
