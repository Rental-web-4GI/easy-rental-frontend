import { defaultClient as client } from './api-client';
import { normalizeSubscription } from './subscription.mapper';

export const orgService = {
  getAllOrgs: () => client.get<any[]>('/api/org/all'),
  getOrgDetails: (id: string) => client.get<any>(`/api/org/${id}`),
  completeOnboarding: (data: any) => client.post<any>('/api/org/onboarding', data),
  updateOrg: (id: string, data: any) => client.put<any>(`/api/org/${id}`, data),
  upgradePlan: (id: string, plan: 'FREE' | 'PRO' | 'ENTERPRISE') => 
    client.put<any>(`/api/org/${id}/subscription/upgrade`, { newPlan: plan }),
  updateOrgMultipart: (id: string, formData: FormData) => 
    client.put<any>(`/api/org/${id}/multipart`, formData),
  getSubscription: async (id: string) => {
    const res = await client.get<Record<string, unknown>>(`/api/org/${id}/subscription`);
    if (!res.ok) {
      return res;
    }
    return { ...res, data: normalizeSubscription(res.data) };
  },
  getSubscriptionRemaining: (id: string) => client.get<any>(`/api/org/${id}/subscription/remaining`),
  getOrgsByPlan: (planId: string) => client.get<any[]>(`/api/org/plan/${planId}`),
};