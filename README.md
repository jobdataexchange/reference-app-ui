
# JDX Reference Application

## Overview

This application serves to demonstrate the functionality provided by the Job Data Exchange (JDX) API.

## Structure

This repo contains three node packages. 

#### jdx-reference-application-ui

The primary reference application. This is an Angular application meant to be served statically.

#### jdx-reference-application-api-client

This package contains an OpenAPI spec document and the machinery required to generate a javascript
API client from it.

The OpenAPI spec is maintained in https://github.com/brighthive/jdx-api-swagger and must be manually
updated in this repo when it is updated there.

The generated API client is consumed by the jdx-reference-application-ui package via the
npm `install-local` tool.

#### jdx-reference-application-patternlibrary

This is a Fractal (https://fractal.build/) application designed to communicate the overall structure
and design of the reference application to stakeholders before having built the Angular application.

This is not directly used by the jdx-reference-application-ui package. It's used only as a reference
for writing view templates.

## Local Development

This project includes a `.nvmrc`, which can be used with Node Version Manager
(https://github.com/nvm-sh/nvm) to select the intended node version. All build / run operations are
encapsulated in scripts in `package.json` at the root of the project and within each sub-package.

Before beginning any development in this repo, run this at the project root:

    nvm use
    npm install
    

### API Client

Before running the Angular application for the first time, and after updating the OpenAPI spec
document, you'll need to generate the javascript API client:

    cd packages/jdx-reference-application-api-client
    npm run package
    
This will produce a javascript library that can be used to communicate with the JDX API.

### Angular Application

To run the Angular application locally: 

    cd packages/jdx-reference-application-ui
    npm run start

This installs the output of the `jdx-reference-application-api-client` package and runs a local
development server on port 4200. 

For local configuration overrides (e.g., point at different API), see the EnvironmentConfigService
in `packages/jdx-reference-application-ui/src/app/shared/services/environment-config-service.ts`.
Overrides can be specified at build time in `environments/environment*.ts` or at runtime in
`assets/runtime-environment-config.js`.

### Pattern Library

To run the pattern library locally:

    cd packages/jdx-reference-application-patternlibrary
    npm run start
    
This starts a local development server on port 3000.


## Build and Deploy

### Build the Angular Application

Scripts are included in the top level package.json for build operations. To build a new version
of the Angular application, from the project root:

    npm version <newversion> # (see https://docs.npmjs.com/cli/version)
    npm run package
    
The output is in `dist`.

### Deploy the Angular Application

To deploy, the contents of the `dist` directory should be statically served. This is not scripted
at this time. So far, the process has been:

- create a public AWS S3 bucket
- attach a cloudfront distribution
- configure cloudfront to serve `index.html` by default
- sync the contents of the `dist` directory to the S3 bucket, deleting any previous contents:

      cd dist && aws s3 sync . s3://my-bucket-name --delete

- if necessary, overwrite assets/runtime-environment-config.js after deploying code to provide
 environment-specific configuration

### Build the Pattern Library

Because this is not the primary artifact, it is not included in the top-level build script.

    cd packages/jdx-reference-application-patternlibrary
    npm run build

The output is in `packages/jdx-reference-application-patternlibrary/patternlibrary`

### Deploy the Pattern Library

See instructions for deploying the Angular application above. This is also a static web
application, so deployment instructions are similar. In this case, sync the contents of
`packages/jdx-reference-application-patternlibrary/patternlibrary` to a public web server.

