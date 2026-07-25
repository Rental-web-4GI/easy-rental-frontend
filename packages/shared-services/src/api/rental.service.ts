import { defaultClient as client } from './api-client';
import {
  formatRentalApiError,
  normalizeRentalDetails,
  normalizeRentalInitResponse,
  normalizeRentalList,
  normalizeRentalRecord,
  toApiAgencyRentalPayload,
  toApiPaymentPayload,
  toApiRentalInitPayload,
} from './rental.mapper';

export const rentalService = {
  initiateRental: async (data: Record<string, unknown>) => {
    const res = await client.post<Record<string, unknown>>(
      '/api/rentals/init',
      toApiRentalInitPayload(data)
    );
    if (!res.ok) {
      return { ...res, data: { message: formatRentalApiError(res.data) } };
    }
    return { ...res, data: normalizeRentalInitResponse(res.data) };
  },

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
  
  startRental: (id: string) => client.put<any>(`/api/rentals/${id}/start`, {}),// deprecated — use checkIn (R2)

  signalEnd: (id: string) => client.put<any>(`/api/rentals/${id}/end-signal`, {}),// legacy signal-end (no body)

  validateReturn: (id: string) => client.put<any>(`/api/rentals/${id}/validate-return`, {}), // legacy validate (no caution)

  cancelRental: (id: string) => client.put<any>(`/api/rentals/${id}/cancel`, {}),// For client to cancel a reservation before it starts

  // ===== R2 — cycle location complet (inspections + caution) =====

  /** Agence : check-in (remise des clés) avec inspection CHECK_IN + km départ. */
  checkIn: async (id: string, payload: {
    startOdometer?: number | null;
    inspection: {
      odometer?: number | null;
      fuelLevel?: number | null;
      notes?: string | null;
      photoUrls: string[];
      items?: Array<{ itemCode: string; status: string; note?: string | null }> | null;
    };
  }) => {
    const res = await client.post<any>(`/api/rentals/${id}/check-in`, {
      startOdometer: payload.startOdometer ?? null,
      inspection: {
        type: 'CHECK_IN',
        odometer: payload.inspection.odometer ?? null,
        fuelLevel: payload.inspection.fuelLevel ?? null,
        notes: payload.inspection.notes ?? null,
        photoUrls: payload.inspection.photoUrls,
        items: payload.inspection.items ?? null,
      },
    });
    if (!res.ok) return { ...res, data: { message: formatRentalApiError(res.data, 'Check-in impossible.') } };
    return { ...res, data: normalizeRentalDetails(res.data as Record<string, unknown>) };
  },

  /** Client/Agence : signaler la fin de la location (R2, retourne le détail). */
  signalEndR2: async (id: string) => {
    const res = await client.post<any>(`/api/rentals/${id}/signal-end`, {});
    if (!res.ok) return { ...res, data: { message: formatRentalApiError(res.data, 'Signalement impossible.') } };
    return { ...res, data: normalizeRentalDetails(res.data as Record<string, unknown>) };
  },

  /** Agence : check-out (retour du véhicule) avec inspection CHECK_OUT + km retour. */
  checkOut: async (id: string, payload: {
    endOdometer?: number | null;
    inspection: {
      odometer?: number | null;
      fuelLevel?: number | null;
      notes?: string | null;
      photoUrls: string[];
      items?: Array<{ itemCode: string; status: string; note?: string | null }> | null;
    };
  }) => {
    const res = await client.post<any>(`/api/rentals/${id}/check-out`, {
      endOdometer: payload.endOdometer ?? null,
      inspection: {
        type: 'CHECK_OUT',
        odometer: payload.inspection.odometer ?? null,
        fuelLevel: payload.inspection.fuelLevel ?? null,
        notes: payload.inspection.notes ?? null,
        photoUrls: payload.inspection.photoUrls,
        items: payload.inspection.items ?? null,
      },
    });
    if (!res.ok) return { ...res, data: { message: formatRentalApiError(res.data, 'Check-out impossible.') } };
    return { ...res, data: normalizeRentalDetails(res.data as Record<string, unknown>) };
  },

  /** Agence : règlement du retour — retenue caution (+ motif) et clôture. */
  settleReturn: async (id: string, payload: { cautionDeduction: number; retentionReason?: string | null }) => {
    const res = await client.put<any>(`/api/rentals/${id}/settle-return`, {
      cautionDeduction: payload.cautionDeduction,
      retentionReason: payload.retentionReason ?? null,
    });
    if (!res.ok) return { ...res, data: { message: formatRentalApiError(res.data, 'Règlement impossible.') } };
    return { ...res, data: normalizeRentalDetails(res.data as Record<string, unknown>) };
  },

  getRentalDetails: async (id: string) => {
    const res = await client.get<Record<string, unknown>>(`/api/rentals/${id}/details`);
    if (res.ok && res.data && typeof res.data === 'object') {
      return { ...res, data: normalizeRentalDetails(res.data as Record<string, unknown>) };
    }
    return {
      ...res,
      ok: false,
      data: { message: 'Dossier introuvable ou véhicule associé supprimé.' },
    };
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