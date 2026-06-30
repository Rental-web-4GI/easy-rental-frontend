import { defaultClient as client } from './api-client';
import { normalizeAgency, normalizeAgencyList, toApiAgencyPayload } from './agency.mapper';

export const agencyService = {
  getAllAgencies: async () => {
    const res = await client.get<unknown[]>('/api/agencies/all');
    return res.ok ? { ...res, data: normalizeAgencyList(res.data) } : res;
  },

  getAgencies: async (orgId: string) => {
    const res = await client.get<unknown[]>(`/api/agencies/org/${orgId}`);
    return res.ok ? { ...res, data: normalizeAgencyList(res.data) } : res;
  },

  createAgency: (orgId: string, data: Record<string, unknown>) =>
    client.post<Record<string, unknown>>(`/api/agencies/org/${orgId}`, toApiAgencyPayload(data)),

  getAgencyDetails: async (id: string) => {
    const res = await client.get<Record<string, unknown>>(`/api/agencies/${id}/details`);
    if (res.ok && res.data) {
      return { ...res, data: normalizeAgency(res.data) };
    }
    return res;
  },

  updateAgency: (id: string, data: Record<string, unknown>) =>
    client.put<Record<string, unknown>>(`/api/agencies/${id}`, toApiAgencyPayload(data)),

  deleteAgency: (id: string) => client.delete(`/api/agencies/${id}`),

  getAgencySearchResults: (query: string, city: string) =>
    client.get<unknown[]>(`/api/agencies/search?keyword=${query}&city=${city}`),
};
