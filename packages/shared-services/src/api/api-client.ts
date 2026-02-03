export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

/**
 * Client API de base pour effectuer des requêtes HTTP.
 * Gère automatiquement l'injection du jeton Authorization via localStorage ou setAuthToken.
 */
export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: { baseUrl: string }) {
    this.baseUrl = config.baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Injecte manuellement un jeton dans les headers de l'instance
   */
  setAuthToken(token: string): void {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Supprime le jeton des headers de l'instance
   */
  clearAuthToken(): void {
    if (this.headers['Authorization']) {
      delete this.headers['Authorization'];
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    // 1. On récupère le token soit dans les headers de l'instance, soit dans le localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const requestHeaders: Record<string, string> = { ...this.headers };

    if (data instanceof FormData) {
      delete requestHeaders['Content-Type'];
    }

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: data ? JSON.stringify(data) : undefined,
      });

      // Gestion du cas "No Content" (ex: DELETE ou PUT sans retour)
      if (response.status === 204) {
        return { data: {} as T, status: 204, ok: true };
      }

      const responseData = await response.json().catch(() => null);

      return {
        data: responseData,
        status: response.status,
        ok: response.ok,
      };
    } catch (error) {
      console.error(`[API Error] ${method} ${endpoint}:`, error);
      return {
        data: null as any,
        status: 0,
        ok: false,
      };
    }
  }

  // --- Méthodes HTTP ---

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint);
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data);
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data);
  }

  async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }
}

/**
 * Instance par défaut
 * Correction : On utilise le chemin du proxy Next.js au lieu de l'URL directe
 */
export const defaultClient = new ApiClient({
  // En développement, on passe par le proxy local pour éviter CORS
  // En production, on peut utiliser une variable d'environnement
  baseUrl: typeof window !== 'undefined' // is browser or server
    ? '/organisation/api-rental' // Utilise le rewrite de Next.js
    : 'https://apirental5gi-v2.onrender.com'
});

/**
 * Fonction utilitaire pour créer de nouvelles instances si nécessaire
 */
export function createApiClient(baseUrl: string): ApiClient {
  return new ApiClient({ baseUrl });
}