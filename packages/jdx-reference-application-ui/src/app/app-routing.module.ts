import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },

  {
    path: 'info',
    component: InfoComponent,
  },

  {
    path: 'job',
    loadChildren: './job/job.module#JobModule'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
