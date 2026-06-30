export type NormalizedSubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  maxVehicles: number;
  maxDrivers: number;
  maxAgencies: number;
  maxUsers: number;
  hasGeofencing: boolean;
  hasChat: boolean;
};

export type NormalizedSubscription = {
  planName: string;
  description: string;
  price: number;
  durationDays: number;
  maxVehicles: number;
  maxAgencies: number;
  expiresAt: string | null;
  isExpired: boolean;
};

function num(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Maps API snake_case subscription plan payloads to camelCase for UI. */
export function normalizeSubscriptionPlan(raw: Record<string, unknown>): NormalizedSubscriptionPlan {
  return {
    id: String(raw.id ?? ''),
    name: String(raw.name ?? ''),
    description: String(raw.description ?? ''),
    price: num(raw.price),
    durationDays: num(raw.durationDays ?? raw.duration_days),
    maxVehicles: num(raw.maxVehicles ?? raw.max_vehicles),
    maxDrivers: num(raw.maxDrivers ?? raw.max_drivers),
    maxAgencies: num(raw.maxAgencies ?? raw.max_agencies),
    maxUsers: num(raw.maxUsers ?? raw.max_users),
    hasGeofencing: Boolean(raw.hasGeofencing ?? raw.has_geofencing),
    hasChat: Boolean(raw.hasChat ?? raw.has_chat),
  };
}

/** Maps API snake_case org subscription status to camelCase for UI. */
export function normalizeSubscription(raw: Record<string, unknown> | null): NormalizedSubscription | null {
  if (!raw) return null;
  const expiresAt = (raw.expiresAt ?? raw.expires_at) as string | null | undefined;
  return {
    planName: String(raw.planName ?? raw.plan_name ?? ''),
    description: String(raw.description ?? ''),
    price: num(raw.price),
    durationDays: num(raw.durationDays ?? raw.duration_days),
    maxVehicles: num(raw.maxVehicles ?? raw.max_vehicles),
    maxAgencies: num(raw.maxAgencies ?? raw.max_agencies, 1),
    expiresAt: expiresAt ?? null,
    isExpired: Boolean(raw.isExpired ?? raw.is_expired),
  };
}
