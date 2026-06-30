/** Normalizes media upload API response (snake_case or camelCase). */
export function extractUploadedMediaUrl(raw: Record<string, unknown> | null | undefined): string | null {
  if (!raw) return null;
  const url = (raw.url ?? raw.file_url ?? raw.fileUrl) as string | undefined;
  return url && url.length > 0 ? url : null;
}

/** Rewrites backend upload URL to the current MFE proxy when running on localhost. */
export function resolveMediaDisplayUrl(url: string): string {
  if (typeof window === 'undefined') return url;
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.pathname.startsWith('/uploads/')) {
      const path = window.location.pathname;
      if (path.startsWith('/organisation')) return `/organisation/api-rental${parsed.pathname}`;
      if (path.startsWith('/agency')) return `/agency/api-rental${parsed.pathname}`;
      if (path.startsWith('/client')) return `/client/api-rental${parsed.pathname}`;
    }
  } catch {
    if (url.startsWith('/uploads/')) {
      const path = window.location.pathname;
      if (path.startsWith('/organisation')) return `/organisation/api-rental${url}`;
      if (path.startsWith('/agency')) return `/agency/api-rental${url}`;
      if (path.startsWith('/client')) return `/client/api-rental${url}`;
    }
  }
  return url;
}
