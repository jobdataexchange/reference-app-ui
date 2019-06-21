import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ApiModule, Configuration } from '@jdx/jdx-reference-application-api-client';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MockBackendInterceptor } from './shared/mock/mock-backend-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function apiConfigFactory() {
  const params = {
    // set configuration parameters here.
    basePath: 'https://jdx-api.brighthive.net',
    // accessToken: 'Foobar'
  };
  return new Configuration(params);
}


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    ApiModule.forRoot(apiConfigFactory),
    BrowserAnimationsModule,
    BrowserModule,
    // make sure to import the HttpClientModule in the AppModule only,
    // see https://github.com/angular/angular/issues/20575
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
