import { defaultClient as client } from './api-client';

export type ReviewPayload = {
  resourceId: string;
  resourceType: 'VEHICLE' | 'DRIVER';
  rating: number;
  comment?: string;
  authorName?: string;
};

export const reviewService = {
  addReview: (data: ReviewPayload) => client.post<any>('/api/reviews', data),

  getReviews: (type: 'VEHICLE' | 'DRIVER', id: string) =>
    client.get<any[]>(`/api/reviews/${type}/${id}`),
};
