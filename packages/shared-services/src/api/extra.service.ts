import { defaultClient as client } from './api-client';
import { extractUploadedMediaUrl, resolveMediaDisplayUrl } from './media.mapper';
import { normalizeSubscriptionPlan } from './subscription.mapper';

export const extraService = {
  getPlans: async () => {
    const res = await client.get<Record<string, unknown>[]>('/api/subscriptions/plans');
    if (!res.ok || !Array.isArray(res.data)) {
      return res;
    }
    return { ...res, data: res.data.map((plan) => normalizeSubscriptionPlan(plan)) };
  },
  updatePlanQuotas: (id: string, data: any) => client.put<any>(`/api/subscriptions/plans/${id}`, data),
  getPermissions: () => client.get<any[]>('/api/permissions'),
  uploadMedia: async (formData: FormData) => {
    const res = await client.post<Record<string, unknown>>('/api/media/upload', formData);
    const url = extractUploadedMediaUrl(res.data);
    if (!res.ok || !url) {
      const message = (res.data as { message?: string } | null)?.message;
      return {
        ...res,
        ok: false,
        data: { message: message || 'Échec de l\'upload du fichier' },
      };
    }
    return { ...res, data: { url: resolveMediaDisplayUrl(url) } };
  },
};