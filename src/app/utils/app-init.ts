import { KeycloakService } from 'keycloak-angular';
import { EnvService } from '../env.service';


export function initializer(keycloak: KeycloakService, env: EnvService): () => Promise<any> {
  try {
    return (): Promise<any> => keycloak.init({
      config: {
        url: env.KcUrl,
        realm: env.KcRealm,
        clientId: env.KcClientId
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
    });
  } catch (error) { console.log('initializer errors: ', error); }
}
