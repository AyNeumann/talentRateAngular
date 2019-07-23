# TalentRateClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Config

To configure your [Keycloak-Angular module](https://www.npmjs.com/package/keycloak-angular):
    Go to env.js and write the appropriate values.
    Here is an example with the default values:

    ```javascript
    // API url - back-end url
    window.__env.apiUrl = 'http://localhost:8080/';

    // KEYCLOAK url - Keycloak url for authentification
    window.__env.KcUrl = 'http://localhost:8888/auth';

    // KEYCLOAK realm - name of the realm which contains the security config for your app
    window.__env.KcRealm = 'talentraterealm';

    // KEYCLOAK clientId - name of client Id in the realm  
    window.__env.KcClientId = 'TalentRateAngular';
    ```

### Other useful docs:
 keycloak: https://www.keycloak.org/
