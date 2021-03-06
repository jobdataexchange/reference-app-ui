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
import { InfoComponent } from './info/info.component';
import { EnvironmentApiClientConfiguration } from './shared/services/api-configuration.service';
import { ModalModule } from 'ngx-bootstrap';
import { ModalComponent } from './shared/components/modal/modal.component';
import { IntercomModule } from 'ng-intercom';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    InfoComponent
  ],
  imports: [
    ApiModule,
    BrowserAnimationsModule,
    BrowserModule,
    // make sure to import the HttpClientModule in the AppModule only,
    // see https://github.com/angular/angular/issues/20575
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot({
      closeButton: true,
      disableTimeOut: true,
      tapToDismiss: false
    }),
    ModalModule.forRoot(),
    IntercomModule.forRoot({
      appId: 'gdgtfd61',
      updateOnRouterChange: true
    }),
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
    { provide: Configuration, useClass: EnvironmentApiClientConfiguration }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
