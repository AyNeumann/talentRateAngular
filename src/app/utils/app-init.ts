import { KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    console.log(Promise);
  return (): Promise<any> => keycloak.init();
}
