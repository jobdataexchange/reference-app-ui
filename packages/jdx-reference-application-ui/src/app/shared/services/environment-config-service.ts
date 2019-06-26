import { Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { environment } from '../../../environments/environment';
import { version } from '../../../../../../package.json';

export interface EnvironmentConfig {
  apiHost: string;
  version: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentConfigService {

  constructor(private windowService: WindowService) {}

  get environmentConfig(): EnvironmentConfig {
    const window = this.windowService.winRef as any;
    const runtimeEnvConfig: EnvironmentConfig = window.runtimeEnvironmentConfig;
    if (!runtimeEnvConfig) {
      throw new Error('runtimeEnvConfig not provided');
    }

    const apiHost = runtimeEnvConfig.apiHost || environment.defaultApiHost;

    return {
      apiHost,
      version
    };

  }

}
