import { defaultClient as client } from './api-client';

export type PlatformStats = {
  users: { total: number; clients: number; orgOwners: number; freelances: number; staff: number };
  organizations: { total: number; companies: number; freelances: number; suspended: number };
  agencies: { total: number; averagePerCompany: number };
  vehicles: { total: number; published: number };
  rentals: { total: number; ongoing: number; completed: number; monthlyCompleted: number };
  revenue: { subscriptionsMonthlyMRR: number; subscriptionsActiveCount: number };
};

export const statisticsService = {
  getPlatformStats: () => client.get<PlatformStats>('/api/admin/stats/platform'),
};
