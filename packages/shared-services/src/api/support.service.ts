import { defaultClient as client } from './api-client';

export type SupportConfig = {
  adminEmail: string;
  helpUrl: string;
  consoleUrl: string;
};

export type SupportThread = {
  id: string;
  visitorEmail: string;
  visitorName?: string;
  subject?: string;
  status: string;
  adminUnreadCount: number;
  lastMessageAt?: string | null;
  createdAt?: string | null;
};

export type SupportMessage = {
  id: string;
  threadId: string;
  senderRole: 'USER' | 'ADMIN' | string;
  body: string;
  createdAt?: string | null;
};

function str(value: unknown, fallback = ''): string {
  return value != null ? String(value) : fallback;
}

function normalizeThread(raw: Record<string, unknown>): SupportThread {
  return {
    id: str(raw.id),
    visitorEmail: str(raw.visitorEmail ?? raw.visitor_email),
    visitorName: str(raw.visitorName ?? raw.visitor_name) || undefined,
    subject: str(raw.subject) || undefined,
    status: str(raw.status, 'OPEN'),
    adminUnreadCount: Number(raw.adminUnreadCount ?? raw.admin_unread_count ?? 0),
    lastMessageAt: (raw.lastMessageAt ?? raw.last_message_at ?? null) as string | null,
    createdAt: (raw.createdAt ?? raw.created_at ?? null) as string | null,
  };
}

function normalizeMessage(raw: Record<string, unknown>): SupportMessage {
  return {
    id: str(raw.id),
    threadId: str(raw.threadId ?? raw.thread_id),
    senderRole: str(raw.senderRole ?? raw.sender_role, 'USER'),
    body: str(raw.body),
    createdAt: (raw.createdAt ?? raw.created_at ?? null) as string | null,
  };
}

export const supportService = {
  getConfig: async () => {
    const res = await client.get<Record<string, unknown>>('/api/support/config');
    if (!res.ok || !res.data) return res;
    const raw = res.data;
    return {
      ...res,
      data: {
        adminEmail: str(raw.adminEmail ?? raw.admin_email),
        helpUrl: str(raw.helpUrl ?? raw.help_url),
        consoleUrl: str(raw.consoleUrl ?? raw.console_url),
      } satisfies SupportConfig,
    };
  },

  sendMessage: async (payload: {
    threadId?: string;
    email: string;
    authorName?: string;
    body: string;
  }) => {
    const res = await client.post<Record<string, unknown>>('/api/support/messages', payload);
    if (!res.ok || !res.data) return res;
    return {
      ...res,
      data: {
        threadId: str(res.data.threadId ?? res.data.thread_id),
        confirmationMessage: str(
          res.data.confirmationMessage ?? res.data.confirmation_message,
          'Message envoyé.'
        ),
      },
    };
  },

  getThreadMessages: async (threadId: string) => {
    const res = await client.get<Record<string, unknown>[]>(`/api/support/threads/${threadId}/messages`);
    if (!res.ok || !Array.isArray(res.data)) return res;
    return { ...res, data: res.data.map((row) => normalizeMessage(row)) };
  },

  listThreads: async () => {
    const res = await client.get<Record<string, unknown>[]>('/api/support/threads');
    if (!res.ok || !Array.isArray(res.data)) return res;
    return { ...res, data: res.data.map((row) => normalizeThread(row)) };
  },

  replyToThread: (threadId: string, body: string) =>
    client.post<Record<string, unknown>>(`/api/support/threads/${threadId}/reply`, { body }),
};
