// FILE: packages/shared-services/src/api/auth.service.ts
import { defaultClient as client } from './api-client';
import { isOrganizationOnboarded, normalizeOrganization } from './org.mapper';

export type LoginResult =
  | { ok: true; token: string }
  | { ok: false; error: string }
  | { mfaRequired: true; mfaToken: string; mfaChannel?: string };

export const authService = {
  getUserMe: () => client.get<any>('/auth/me'),
  getOrgUserMe: async () => {
    const res = await client.get<Record<string, unknown>>('/api/org/auth/me');
    if (!res.ok || !res.data) {
      return res;
    }
    const raw = res.data;
    const rawOrg = raw.organization as Record<string, unknown> | null | undefined;
    const organization = normalizeOrganization(rawOrg);
    return {
      ...res,
      data: {
        user: raw.user,
        organization,
        isOnboarded: isOrganizationOnboarded(organization),
      },
    };
  },
  login: async (data: { email: string; password: string }): Promise<LoginResult> => {
    const res = await client.post<any>('/auth/login', data);
    const dataObj = res.data as Record<string, unknown> | null;
    const mfaRequired =
      dataObj?.mfa_required === true || dataObj?.mfaRequired === true || res.status === 202;
    const mfaToken = (dataObj?.mfa_token ?? dataObj?.mfaToken) as string | undefined;
    if (mfaRequired && mfaToken) {
      return {
        mfaRequired: true,
        mfaToken,
        mfaChannel: (dataObj?.mfa_channel ?? dataObj?.mfaChannel) as string | undefined,
      };
    }
    const token = (dataObj?.token) as string | undefined;
    if (res.ok && token) {
      return { ok: true, token };
    }
    const message = (dataObj?.message ?? dataObj?.error) as string | undefined;
    if (res.status === 0) {
      return { ok: false, error: 'Serveur indisponible. Démarrez le backend (port 8081) et Docker postgres/redis.' };
    }
    if (res.status === 502 || res.status === 504) {
      return { ok: false, error: 'Backend injoignable (proxy). Vérifiez que le port 8081 répond.' };
    }
    if (message?.includes('timed out') || message?.includes('timeout') || message?.includes('KERNEL_TIMEOUT')) {
      return {
        ok: false,
        error: 'Connexion au kernel trop lente. Réessayez dans quelques secondes (réseau vers kernel-core.yowyob.com).',
      };
    }
    if (message === 'An internal error occurred' || res.status === 500) {
      return {
        ok: false,
        error: 'Erreur serveur au login. Vérifiez que Docker postgres/redis tournent et réessayez (le kernel peut être lent).',
      };
    }
    return { ok: false, error: message || 'Identifiants invalides' };
  },
  confirmMfa: async (mfaToken: string, code: string): Promise<LoginResult> => {
    const res = await client.post<any>('/auth/login/mfa/confirm', { mfaToken, code });
    if (res.ok && res.data?.token) {
      return { ok: true, token: res.data.token };
    }
    return { ok: false, error: res.data?.message || 'Code MFA invalide' };
  },
  registerOrg: (data: any) => client.post<any>('/auth/register/organizationOwner', data),
  registerClient: (data: any) => client.post<any>('/auth/register/client', data),
  refresh: () => client.post<any>('/auth/refresh', {}),
  setToken: (token: string) => client.setAuthToken(token),
  updateProfile: (data: any) => client.put<any>('/api/users/profile', data),
  updatePassword: (data: any) => client.put<any>('/api/users/password', data),
};