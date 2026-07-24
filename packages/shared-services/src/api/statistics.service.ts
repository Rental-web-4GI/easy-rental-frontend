import { defaultClient as client } from './api-client';

export type PlatformStats = {
  users: { total: number; clients: number; orgOwners: number; freelances: number; staff: number };
  organizations: { total: number; companies: number; freelances: number; suspended: number };
  agencies: { total: number; averagePerCompany: number };
  vehicles: { total: number; published: number };
  rentals: { total: number; ongoing: number; completed: number; monthlyCompleted: number };
  revenue: { subscriptionsMonthlyMRR: number; subscriptionsActiveCount: number };
};

/**
 * Jackson est configuré en SNAKE_CASE globalement — le backend renvoie
 * `monthly_completed`, `subscriptions_monthly_mrr`, etc. On normalise
 * récursivement en camelCase pour que le composant frontend puisse lire
 * les champs sans avoir à connaître la convention backend.
 */
const snakeToCamel = (s: string): string =>
  s.replace(/([_-][a-z])/g, (m) => m[1].toUpperCase());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepCamelize = (input: any): any => {
  if (input == null || typeof input !== 'object') return input;
  if (Array.isArray(input)) return input.map(deepCamelize);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: Record<string, any> = {};
  for (const key of Object.keys(input)) {
    out[snakeToCamel(key)] = deepCamelize(input[key]);
  }
  return out;
};

export const statisticsService = {
  getPlatformStats: async () => {
    const res = await client.get<PlatformStats>('/api/admin/stats/platform');
    if (!res.ok || !res.data) return res;
    return { ...res, data: deepCamelize(res.data) as PlatformStats };
  },
};
