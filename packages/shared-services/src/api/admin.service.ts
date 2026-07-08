import { extraService } from './extra.service';
import { orgService } from './org.service';
import { reviewService } from './review.service';
import { supportService } from './support.service';

export const adminService = {
  getAllOrganizations: () => orgService.getAllOrgs(),
  getPlans: () => extraService.getPlans(),
  createPlan: extraService.createPlan,
  updatePlan: extraService.updatePlanQuotas,
  assignPlan: (orgId: string, planName: string) => orgService.assignPlan(orgId, planName),
  getSupportThreads: () => supportService.listThreads(),
  getSupportMessages: (threadId: string) => supportService.getThreadMessages(threadId),
  replyToSupportThread: (threadId: string, body: string) => supportService.replyToThread(threadId, body),
  getReviews: () => reviewService.listAllForAdmin(),
  getReviewModerationStats: () => reviewService.getModerationStats(),
  setReviewPublished: (id: string, published: boolean) => reviewService.setPublished(id, published),
};
