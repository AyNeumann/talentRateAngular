import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl = '';

  // KEYCLOAK url
  public KcUrl = '';

  // KEYCLOAK realm
  public KcRealm = '';

  // KEYCLOAK realm
  public KcClientId = '';

  constructor() { }
}
