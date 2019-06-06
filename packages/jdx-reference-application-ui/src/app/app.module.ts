import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ApiModule, Configuration } from '@jdx/jdx-reference-application-api-client';
import { HttpClientModule } from '@angular/common/http';

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
    BrowserModule,
    // make sure to import the HttpClientModule in the AppModule only,
    // see https://github.com/angular/angular/issues/20575
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
