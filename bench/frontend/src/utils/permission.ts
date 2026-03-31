import { useAuthStore } from '@/store/auth';

export function hasPerm(perm?: string): boolean {
  if (!perm) return true;
  const perms = useAuthStore.getState().permissions;
  return perms.includes(perm);
}
