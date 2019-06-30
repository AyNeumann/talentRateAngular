import { KeycloakService } from 'keycloak-angular';



export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init({
    config: {
      url: 'http://localhost:8888/auth',
      realm: 'talentraterealm',
      clientId: 'TalentRateAngular'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    },
    enableBearerInterceptor: true,
  });
}
