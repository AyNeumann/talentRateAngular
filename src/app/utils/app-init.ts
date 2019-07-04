import { KeycloakService } from 'keycloak-angular';
import { EnvService } from '../env.service';
import { Credentials } from 'node_modules/keycloak-angular/lib/core/interfaces/keycloak-config';



export function initializer(keycloak: KeycloakService, env: EnvService, credentials: Credentials): () => Promise<any> {
  const secret: Credentials = {
    secret: env.KcSecretCredentials
  };
  try {
    return (): Promise<any> => keycloak.init({
      config: {
        url: env.KcUrl,
        realm: env.KcRealm,
        clientId: env.KcClientId,
        credentials: secret
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
    });
  } catch (error) { console.log('initializer errors: ', error); }
}
