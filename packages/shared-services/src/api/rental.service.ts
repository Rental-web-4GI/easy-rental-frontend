import { defaultClient as client } from './api-client';
import {
  formatRentalApiError,
  normalizeRentalInitResponse,
  normalizeRentalList,
  normalizeRentalRecord,
  toApiAgencyRentalPayload,
  toApiPaymentPayload,
} from './rental.mapper';

export const rentalService = {
  initiateRental: (data: any) => client.post<any>('/api/rentals/init', data),

  createAgencyRental: async (agencyId: string, data: Record<string, unknown>) => {
    const res = await client.post<Record<string, unknown>>(
      `/api/rentals/agency/${agencyId}/create`,
      toApiAgencyRentalPayload(data)
    );
    if (!res.ok) {
      return { ...res, data: { message: formatRentalApiError(res.data) } };
    }
    return { ...res, data: normalizeRentalInitResponse(res.data as Record<string, unknown>) };
  },

  payRental: async (id: string, data: { amount: number; method: 'MOMO' | 'OM' | 'CARD' | 'CASH' }) => {
    const res = await client.post<any>(`/api/rentals/${id}/pay`, toApiPaymentPayload(data));
    if (!res.ok) {
      return { ...res, data: { message: formatRentalApiError(res.data, 'Paiement impossible.') } };
    }
    return res;
  },
  
  startRental: (id: string) => client.put<any>(`/api/rentals/${id}/start`, {}),// For agency to confirm the start of the rental
  
  signalEnd: (id: string) => client.put<any>(`/api/rentals/${id}/end-signal`, {}),// For client to signal the end of the rental
  
  validateReturn: (id: string) => client.put<any>(`/api/rentals/${id}/validate-return`, {}), // For agency to confirm the return of the vehicle
  
  cancelRental: (id: string) => client.put<any>(`/api/rentals/${id}/cancel`, {}),// For client to cancel a reservation before it starts

  getRentalDetails: async (id: string) => {
    const res = await client.get<Record<string, unknown>>(`/api/rentals/${id}/details`);
    if (res.ok && res.data && typeof res.data === 'object') {
      const raw = res.data as Record<string, unknown>;
      const rental = raw.rental ?? raw;
      return { ...res, data: { ...raw, rental: normalizeRentalRecord(rental as Record<string, unknown>) } };
    }
    return res;
  },

  getOrgReservations: async (orgId: string) => {
    const res = await client.get<unknown[]>(`/api/rentals/org/${orgId}/reservations`);
    return res.ok ? { ...res, data: normalizeRentalList(res.data) } : res;
  },
  
  getOrgRentals: async (orgId: string) => {
    const res = await client.get<unknown[]>(`/api/rentals/org/${orgId}/rentals`);
    return res.ok ? { ...res, data: normalizeRentalList(res.data) } : res;
  },
  
  getAgencyReservations: async (agencyId: string) => {
    const res = await client.get<unknown[]>(`/api/rentals/agency/${agencyId}/reservations`);
    return res.ok ? { ...res, data: normalizeRentalList(res.data) } : res;
  },
  
  getAgencyRentals: async (agencyId: string) => {
    const res = await client.get<unknown[]>(`/api/rentals/agency/${agencyId}/rentals`);
    return res.ok ? { ...res, data: normalizeRentalList(res.data) } : res;
  },
  
  getClientActiveReservations: async () => {
    const res = await client.get<unknown[]>('/api/rentals/client/reservations/active');
    return res.ok ? { ...res, data: normalizeRentalList(res.data) } : res;
  },
  
  getClientRentalsHistory: async () => {
    const res = await client.get<unknown[]>('/api/rentals/client/rentals/history');
    return res.ok ? { ...res, data: normalizeRentalList(res.data) } : res;
  },

  getByAgency: async (agencyId: string) => {
    const res = await client.get<unknown[]>(`/api/rentals/agency/${agencyId}/rentals`);
    return res.ok ? { ...res, data: normalizeRentalList(res.data) } : res;
  },

  /** Reservations that became rentals or were cancelled — for history tab. */
  getAgencyReservationHistory: async (agencyId: string) => {
    const [resRes, rentRes] = await Promise.all([
      client.get<unknown[]>(`/api/rentals/agency/${agencyId}/reservations`),
      client.get<unknown[]>(`/api/rentals/agency/${agencyId}/rentals`),
    ]);
    const historyStatuses = new Set(['ONGOING', 'UNDER_REVIEW', 'COMPLETED', 'CANCELLED']);
    const cancelled = resRes.ok
      ? normalizeRentalList(resRes.data).filter((r) => r.status === 'CANCELLED')
      : [];
    const rentals = rentRes.ok
      ? normalizeRentalList(rentRes.data).filter((r) => historyStatuses.has(r.status))
      : [];
    const merged = [...rentals, ...cancelled];
    merged.sort((a, b) => {
      const da = new Date(a.createdAt ?? a.updatedAt ?? 0).getTime();
      const db = new Date(b.createdAt ?? b.updatedAt ?? 0).getTime();
      return db - da;
    });
    return { ok: resRes.ok || rentRes.ok, data: merged, status: resRes.status };
  },
};