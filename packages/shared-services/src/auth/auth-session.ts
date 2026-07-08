const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_EXPIRES_KEY = 'auth_token_exp';

type JwtPayload = {
  exp?: number;
  sub?: string;
};

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, '='));
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenExpiryMs(token: string): number | null {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return null;
  return payload.exp * 1000;
}

export function isTokenExpired(token: string, skewMs = 30_000): boolean {
  const exp = getTokenExpiryMs(token);
  if (!exp) return false;
  return Date.now() >= exp - skewMs;
}

export function persistAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  const exp = getTokenExpiryMs(token);
  if (exp) {
    localStorage.setItem(AUTH_EXPIRES_KEY, String(exp));
  } else {
    localStorage.removeItem(AUTH_EXPIRES_KEY);
  }
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EXPIRES_KEY);
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  if (isTokenExpired(token)) {
    clearAuthSession();
    return null;
  }
  return token;
}

export function initAuthSessionWatcher(onExpired: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const check = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && isTokenExpired(token)) {
      clearAuthSession();
      onExpired();
    }
  };

  check();
  const intervalId = window.setInterval(check, 60_000);
  window.addEventListener('focus', check);

  return () => {
    window.clearInterval(intervalId);
    window.removeEventListener('focus', check);
  };
}

export function markFirstUsageDone(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('easyrental_first_usage_done', '1');
}

export function hasCompletedFirstUsage(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('easyrental_first_usage_done') === '1';
}

export function hasDismissedFeedbackPrompt(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('easyrental_feedback_prompt_dismissed') === '1';
}

export function dismissFeedbackPrompt(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('easyrental_feedback_prompt_dismissed', '1');
}
