import { defaultClient as client } from './api-client';

export const rentalService = {
  initiateRental: (data: {
    vehicleId: string;
    driverId?: string;
    startDate: string;
    endDate: string;
    rentalType: string;
    clientPhone: string;
  }) => client.post<any>('/api/rentals/init', data),

  payRental: (id: string, data: { 
    amount: number; 
    method: 'MOMO' | 'OM' | 'CARD' | 'CASH' 
  }) => client.post<any>(`/api/rentals/${id}/pay`, data),

  getByAgency: (agencyId: string) => 
    client.get<any[]>(`/api/rentals/agency/${agencyId}`),

  startRental: (id: string) => 
    client.put<any>(`/api/rentals/${id}/start`, {}),

  signalEnd: (id: string) => 
    client.put<any>(`/api/rentals/${id}/end-signal`, {}),

  validateReturn: (id: string) => 
    client.put<any>(`/api/rentals/${id}/validate-return`, {})
};