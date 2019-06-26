import { Injectable } from '@angular/core';

import { Configuration } from '@jdx/jdx-reference-application-api-client';
import { EnvironmentConfigService } from './environment-config-service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentApiClientConfiguration extends Configuration {
  constructor(private environmentConfigService: EnvironmentConfigService) {
    super({basePath: environmentConfigService.environmentConfig.apiHost});
  }
}
