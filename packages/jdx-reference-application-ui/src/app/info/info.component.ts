import { Component, OnInit } from '@angular/core';
import { EnvironmentConfigService } from '../shared/services/environment-config-service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  version: string;
  apiHost: string;

  constructor(private _environmentConfigService: EnvironmentConfigService) { }

  ngOnInit() {
    this.version = this._environmentConfigService.environmentConfig.version;
    this.apiHost = this._environmentConfigService.environmentConfig.apiHost;
  }

}
