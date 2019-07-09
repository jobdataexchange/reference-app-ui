import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormFieldsOrgInfo } from '../base-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../shared/services/job.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { createRouteUrlByJobRoute, JobRoutes } from '../job-routing.module';
import { LocalStorageService, LocalStorageTypes } from '../../shared/services/local-storage.service';


/**
 * NOTE: This component really shouldn't be part of the Job module. It should be moved to the Org module.
 * If any additional Org development is done consider moving this component.
 */

@Component({
  selector: 'app-org-info',
  templateUrl: './org-info.component.html'
})
export class OrgInfoComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _jobService: JobService,
    private _router: Router,
    private _locaStorage: LocalStorageService
) {}

  f = FormFieldsOrgInfo;

  form: FormGroup;

  private _currentOrg;

  private _localStorageSub: Subscription = null;

  ngOnInit() {
    this._currentOrg = this._locaStorage.has(LocalStorageTypes.OGR)
                       ? this._locaStorage.get(LocalStorageTypes.OGR)
                       : {};

    this.initForm(this._currentOrg);
  }

  next() {
    // This should be supported by an Org service and moved to the Org module in future development.
    this._jobService.updateOrgSection(this.form.value);
    this.navigateTo(JobRoutes.DESCRIPTION);
  }

  private navigateTo(route: JobRoutes) {
    this._router.navigateByUrl(createRouteUrlByJobRoute(route));
  }

  private initForm(o: FormFieldsOrgInfo) {
    this.form =
      this._fb.group(
        {
          [this.f.ORG_NAME]:                   [o[this.f.ORG_NAME], Validators.required],
          [this.f.HIRING_ORG_NAME_OVERVIEW]:   [o[this.f.HIRING_ORG_NAME_OVERVIEW]],
          [this.f.ORG_EMAIL]:                  [o[this.f.ORG_EMAIL]],
          [this.f.ORG_WEBSITE]:                [o[this.f.ORG_WEBSITE]],
          [this.f.HIRING_ORG_ADDRESS]:         [o[this.f.HIRING_ORG_ADDRESS]],
          [this.f.ORG_PHONE]:                  [o[this.f.ORG_PHONE]],

        }
      );
  }

}
