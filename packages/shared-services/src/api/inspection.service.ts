import { defaultClient as client } from './api-client';

export type InspectionItem = {
  itemCode: string;
  status: string;
  note?: string | null;
};

export type Inspection = {
  id: string;
  rentalId: string;
  type: 'CHECK_IN' | 'CHECK_OUT' | string;
  odometer?: number | null;
  fuelLevel?: number | null;
  notes?: string | null;
  photoUrls: string[];
  performedBy?: string | null;
  performedAt?: string | null;
  items?: InspectionItem[] | null;
};

export type ItemDiff = {
  itemCode: string;
  statusBefore?: string | null;
  statusAfter?: string | null;
  noteAfter?: string | null;
  category: string;
};

export type InspectionComparison = {
  newDamages: ItemDiff[];
  preExisting: ItemDiff[];
  newMissing: ItemDiff[];
  fuelDelta?: number | null;
  kmTraveled?: number | null;
};

/** 12 codes de checklist par défaut (miroir de InspectionChecklistDefaults côté backend). */
export const DEFAULT_INSPECTION_ITEMS: string[] = [
  'TIRES', 'SPARE_TIRE', 'TRIANGLE_JACK', 'HEADLIGHTS', 'TURN_SIGNALS', 'BUMPERS',
  'DOORS', 'WINDOWS_MIRRORS', 'INTERIOR', 'AC', 'RADIO', 'DOCUMENTS',
];

/** Libellés FR des codes d'items. */
export const INSPECTION_ITEM_LABELS: Record<string, string> = {
  TIRES: 'Pneus',
  SPARE_TIRE: 'Roue de secours',
  TRIANGLE_JACK: 'Triangle + cric',
  HEADLIGHTS: 'Phares',
  TURN_SIGNALS: 'Clignotants',
  BUMPERS: 'Pare-chocs',
  DOORS: 'Portières',
  WINDOWS_MIRRORS: 'Vitres + rétroviseurs',
  INTERIOR: 'Intérieur',
  AC: 'Climatisation',
  RADIO: 'Autoradio',
  DOCUMENTS: 'Documents véhicule',
};

export const ITEM_STATUS_LABELS: Record<string, string> = {
  OK: 'Opérationnel',
  DAMAGED: 'Endommagé',
  BROKEN: 'Cassé',
  MISSING: 'Absent',
  NOT_APPLICABLE: 'N/A',
};

export const inspectionService = {
  listByRental: (rentalId: string) =>
    client.get<Inspection[]>(`/api/inspections/rentals/${rentalId}/all`),

  getById: (inspectionId: string) =>
    client.get<Inspection>(`/api/inspections/${inspectionId}`),

  compare: (rentalId: string) =>
    client.get<InspectionComparison>(`/api/inspections/rentals/${rentalId}/comparison`),
};
