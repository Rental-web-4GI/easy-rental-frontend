/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractApiErrorMessage } from './vehicle.mapper';

/** Maps agency rental form (camelCase) to API snake_case. */
export function toApiAgencyRentalPayload(data: Record<string, unknown>): Record<string, unknown> {
  const driverId = data.driverId ?? data.driver_id;
  const deposit = data.requestedDeposit ?? data.initialPaymentAmount ?? data.initial_payment_amount;
  return {
    client_name: data.clientName ?? data.client_name,
    client_phone: data.clientPhone ?? data.client_phone,
    client_email: data.clientEmail ?? data.client_email ?? null,
    cni_number: data.cniNumber ?? data.cni_number ?? null,
    vehicle_id: data.vehicleId ?? data.vehicle_id,
    driver_id: driverId || null,
    start_date: data.startDate ?? data.start_date,
    end_date: data.endDate ?? data.end_date,
    rental_type: data.rentalType ?? data.rental_type,
    initial_payment_amount: deposit != null ? Number(deposit) : null,
    payment_method: data.paymentMethod ?? data.payment_method ?? 'CASH',
  };
}

/** Normalizes rental list/detail records from API snake_case to camelCase. */
export function normalizeRentalRecord(raw: Record<string, unknown> | null | undefined): any {
  if (!raw) return raw;
  return {
    ...raw,
    id: raw.id,
    clientName: raw.clientName ?? raw.client_name,
    clientPhone: raw.clientPhone ?? raw.client_phone,
    clientEmail: raw.clientEmail ?? raw.client_email,
    cniNumber: raw.cniNumber ?? raw.cni_number,
    agencyId: raw.agencyId ?? raw.agency_id,
    vehicleId: raw.vehicleId ?? raw.vehicle_id,
    driverId: raw.driverId ?? raw.driver_id,
    startDate: raw.startDate ?? raw.start_date,
    endDate: raw.endDate ?? raw.end_date,
    rentalType: raw.rentalType ?? raw.rental_type,
    totalAmount: raw.totalAmount ?? raw.total_amount,
    amountPaid: raw.amountPaid ?? raw.amount_paid,
    commissionAmount: raw.commissionAmount ?? raw.commission_amount,
    depositAmount: raw.depositAmount ?? raw.deposit_amount,
    licencePlate: raw.licencePlate ?? raw.licence_plate,
    status: raw.status,
    createdAt: raw.createdAt ?? raw.created_at,
    updatedAt: raw.updatedAt ?? raw.updated_at,
  };
}

export function normalizeRentalList(data: unknown): any[] {
  if (!Array.isArray(data)) return [];
  return data.map((item) => normalizeRentalRecord(item as Record<string, unknown>));
}

export function toApiPaymentPayload(data: { amount: number; method: string }): Record<string, unknown> {
  return {
    amount: data.amount,
    method: data.method,
  };
}

export function normalizeRentalInitResponse(raw: Record<string, unknown> | null | undefined): any {
  if (!raw) return null;
  return {
    ...raw,
    rentalId: raw.rentalId ?? raw.rental_id,
    totalAmount: raw.totalAmount ?? raw.total_amount,
    depositAmount: raw.depositAmount ?? raw.deposit_amount,
    commissionAmount: raw.commissionAmount ?? raw.commission_amount,
    isAllowed: raw.isAllowed ?? raw.is_allowed,
  };
}

export function formatRentalApiError(data: unknown, fallback = 'Impossible de traiter la réservation.'): string {
  const message = extractApiErrorMessage(data, fallback);
  if (message === 'Access Denied') {
    return 'Accès refusé — permissions insuffisantes pour créer une réservation.';
  }
  if (message.includes('RESOURCE_ID') || message.includes('resource_id')) {
    return 'Erreur interne lors de la notification — réessayez après redémarrage du serveur.';
  }
  if (message.includes('executeMany') || message.includes('INSERT INTO notifications')) {
    return 'La réservation n\'a pas pu être finalisée (notification). Réessayez ou contactez le support.';
  }
  return message.length > 200 ? fallback : message;
}
