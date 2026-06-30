// FILE: packages/shared-services/src/api/index.ts
export { ApiClient, createApiClient } from './api-client';
export type { ApiConfig, ApiResponse, ApiError } from './api-client';

export { authService } from './auth.service';
export { orgService } from './org.service';
export { agencyService } from './agency.service';
export {
  formatGeofenceRadius,
  normalizeAgency,
  normalizeAgencyList,
  buildAgencyFormInitialData,
  resolveAgencyContact,
} from './agency.mapper';
export { staffService } from './staff.service';
export { vehicleService } from './vehicle.service';
export { buildVehicleFormInitialData } from './vehicle.mapper';
export { DEFAULT_VEHICLE_FUNCTIONALITIES } from './vehicle.mapper';
export { driverService } from './driver.service';
export { formatScheduleDate } from './driver.mapper';
export { notifService } from './notif.service';
export { formatNotificationDate, formatNotificationReason, isNotificationRead, normalizeNotificationList } from './notif.mapper';
export { dispatchNotificationsRefresh, NOTIFICATIONS_REFRESH_EVENT } from './notification-events';
export type { NotificationRefreshContext } from './notification-events';
export { extraService } from './extra.service';
export { rentalService } from './rental.service';
export { statsService } from './stats.service';
export { transactionService } from './transaction.service';
export { reviewService } from './review.service';
export { isOrganizationOnboarded, normalizeOrganization } from './org.mapper';
export { resolveMediaDisplayUrl, extractUploadedMediaUrl } from './media.mapper';