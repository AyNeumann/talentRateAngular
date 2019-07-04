(function (window) {

    window.__env = window.__env || {};

    // API url 
    window.__env.apiUrl = 'http://localhost:8080/';

    // KEYCLOAK url - Keycloak url for authentification
    window.__env.KcUrl = 'http://localhost:8888/auth';

    // KEYCLOAK realm - name of the realm which contains the security config for your app
    window.__env.KcRealm = 'talentraterealm';

    // KEYCLOAK clientId - name of client Id in the realm  
    window.__env.KcClientId = 'TalentRateAngular';

    // KEYCLOAK client secret - secret identifier 
    window.__env.KcSecretCredentials = 'd310055b-21da-4ec5-9942-5f89541a8eff';

}(this));
