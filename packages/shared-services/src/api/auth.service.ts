import { defaultClient as client } from './api-client';

/**
 * Service d'authentification centralisé
 * Utilise le proxy configuré pour éviter les blocages CORS sur Render
 */
export const authService = {
  /**
   * Connexion universelle
   * @param data { email, password }
   */
  login: (data: any) => client.post<any>('/auth/login', data),

  /**
   * Inscription d'un propriétaire d'organisation (Manager)
   * Paramètres requis par le backend :
   * { firstname, lastname, email, password, orgName }
   */
  registerOrg: (data: any) => client.post<any>('/auth/register/organizationOwner', data),

  /**
   * Inscription d'un client standard
   * { firstname, lastname, email, password }
   */
  registerClient: (data: any) => client.post<any>('/auth/register/client', data),

  /**
   * Rafraîchir le token de session
   */
  refresh: () => client.post<any>('/auth/refresh', {}),

  /**
   * Méthode utilitaire pour injecter le token manuellement si nécessaire
   * (Bien que l'ApiClient le récupère déjà dans le localStorage à chaque requête)
   */
  setToken: (token: string) => client.setAuthToken(token)
};